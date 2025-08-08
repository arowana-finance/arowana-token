/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    formatEther,
    parseEther,
    ZeroAddress,
    type BaseContract,
    type ContractTransactionResponse,
} from 'ethers';
import { Provider, ProxySigner } from 'ethers-opt';
import { Logger } from 'logger-chain';
import { ContractTransactionReceipt, MaxUint256, TransactionResponse, TransactionReceipt } from 'ethers';
import { ArbHelper } from '../src/arb.js';
import {
    ArbGatewaySettle,
    ArbGatewaySettle__factory,
    ERC20Mock,
    ERC20Mock__factory,
    InitializableProxy__factory,
} from '../typechain-types/index.js';
import { bridgeArwArb } from '../src/arw.js';

const SEPOLIA_RPC = 'https://0xrpc.io/sep';
const SEPOLIA_ARB_RPC = 'https://sepolia-rollup.arbitrum.io/rpc';

const MNEMONIC = process.env.MNEMONIC || 'test test test test test test test test test test test junk';
const BRIDGE_AMOUNT = 12.3;
const FUND_AMOUNT = 100;

const parentProvider = new Provider(SEPOLIA_RPC);
const childProvider = new Provider(SEPOLIA_ARB_RPC);

const parentSigner = ProxySigner.fromMnemonic(MNEMONIC, parentProvider);
const childSigner = ProxySigner.fromMnemonic(MNEMONIC, childProvider);

const arbHelper = new ArbHelper({ parentProvider, childProvider });

const logger = new Logger();

async function logDeploy(contractName: string, contract: BaseContract) {
    logger.debug(
        'Deploy',
        `${contractName}: ${contract.target} (hash: ${(await contract.deploymentTransaction()?.wait())?.hash})`,
    );
}

async function logTx(
    txName: string,
    tx: Promise<TransactionResponse | ContractTransactionResponse>,
): Promise<TransactionReceipt | ContractTransactionReceipt | null> {
    const resp = await (await tx).wait();

    logger.debug('Tx', `${txName} (hash: ${resp?.hash})`);

    return resp;
}

async function deployTokens() {
    const L1Token = await new ERC20Mock__factory(parentSigner).deploy(
        'L1 Token',
        'L1',
        18n,
        parseEther('100000000'),
    );
    await logDeploy('L1: Deploy Token', L1Token);

    const L2Token = await new ERC20Mock__factory(childSigner).deploy(
        'L2 Token',
        'L2',
        18n,
        parseEther('100000000'),
    );
    await logDeploy('L2: Deploy Token', L2Token);

    return {
        L1Token,
        L2Token,
    };
}

async function getTokens() {
    return {
        L1Token: ERC20Mock__factory.connect('0x351cAa9045D65107b9d311D922D15887cfd634E4', parentSigner),
        L2Token: ERC20Mock__factory.connect('0x747952A59292a9B3862F3C59664B95e8B461eF45', childSigner),
    };
}

async function deployGateways(L1Token: ERC20Mock, L2Token: ERC20Mock) {
    const {
        ethBridge: { inbox: inboxAddress },
    } = await arbHelper.arbNetworkConfig;

    const L1GatewayImpl = await new ArbGatewaySettle__factory(parentSigner).deploy();
    await logDeploy('L1: Deploy Gateway Impl', L1GatewayImpl);

    const L1GatewayProxy = await new InitializableProxy__factory(parentSigner).deploy();
    await logDeploy('L1: Deploy Gateway Proxy', L1GatewayProxy);

    const L2GatewayImpl = await new ArbGatewaySettle__factory(childSigner).deploy();
    await logDeploy('L2: Deploy Gateway Impl', L2GatewayImpl);

    const L2GatewayProxy = await new InitializableProxy__factory(childSigner).deploy();
    await logDeploy('L2: Deploy Gateway Proxy', L2GatewayProxy);

    const L1Gateway = ArbGatewaySettle__factory.connect(L1GatewayProxy.target as string, parentSigner);

    const L2Gateway = ArbGatewaySettle__factory.connect(L2GatewayProxy.target as string, childSigner);

    await logTx(
        'L1: Initialize Gateway',
        L1GatewayProxy.initializeProxy(
            parentSigner.address,
            L1GatewayImpl.target,
            (
                await L1Gateway.initializeGatewaySettle.populateTransaction(
                    parentSigner.address,
                    inboxAddress,
                    L2Gateway.target,
                    [{ home: L1Token.target, other: L2Token.target }],
                    true,
                )
            ).data,
        ),
    );

    await logTx(
        'L2: Initialize Gateway',
        L2GatewayProxy.initializeProxy(
            childSigner.address,
            L2GatewayImpl.target,
            (
                await L2Gateway.initializeGatewaySettle.populateTransaction(
                    childSigner.address,
                    ZeroAddress,
                    L1Gateway.target,
                    [{ home: L2Token.target, other: L1Token.target }],
                    true,
                )
            ).data,
        ),
    );

    await logTx('L2: Fund Gateway', L2Token.transfer(L2Gateway.target, parseEther(String(FUND_AMOUNT))));

    return {
        L1Gateway,
        L2Gateway,
        L1GatewayImpl,
        L2GatewayImpl,
    };
}

async function sendCross(
    L1Token: ERC20Mock,
    L2Token: ERC20Mock,
    L1Gateway: ArbGatewaySettle,
    L2Gateway: ArbGatewaySettle,
) {
    const from = parentSigner.address;
    const to = childSigner.address;
    const value = BRIDGE_AMOUNT;
    const msg = 'Hello Arbitrum';

    const [balance, approval] = await Promise.all([
        L1Token.balanceOf(from),
        L1Token.allowance(from, L1Gateway.target),
    ]);

    if (balance < parseEther(String(value))) {
        logger.error(`Insufficient L1 Token balance, wants ${value} have ${formatEther(balance)}`);
        return;
    }

    if (approval < parseEther(String(value))) {
        await logTx('L1: Approve L1Gateway', L1Token.approve(L1Gateway.target, MaxUint256));
    }

    const bridgeTxParams = await bridgeArwArb({
        arbHelper,
        L1Token,
        L2Token,
        L1Gateway,
        L2Gateway,
        from,
        to,
        value,
        msg,
    });

    console.log({ bridgeTxParams });

    const bridgeTxReceipt = await logTx('L1: Bridge Token', parentSigner.sendTransaction(bridgeTxParams));

    const message = (await arbHelper.parseParentToChildMessage(bridgeTxReceipt))[0];

    console.log({ message });

    // Wait for 20 minutes for transaction to arrive
    const creationReceipt = await childProvider.waitForTransaction(
        message.creationId,
        undefined,
        1200 * 1000,
    );

    console.log({ creationReceipt });

    logger.debug(`L2: Token Balance: ${formatEther(await L2Token.balanceOf(childSigner.address))}`);
}

async function deploy() {
    // const { L1Token, L2Token } = await getTokens();

    const { L1Token, L2Token } = await deployTokens();

    const { L1Gateway, L2Gateway, L1GatewayImpl, L2GatewayImpl } = await deployGateways(L1Token, L2Token);

    await sendCross(L1Token, L2Token, L1Gateway, L2Gateway);

    console.log({
        L1Token: L1Token.target,
        L2Token: L2Token.target,
        L1Gateway: L1Gateway.target,
        L2Gateway: L2Gateway.target,
        L1GatewayImpl: L1GatewayImpl.target,
        L2GatewayImpl: L2GatewayImpl.target,
    });
}

deploy();
