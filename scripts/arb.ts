/* eslint-disable @typescript-eslint/no-unused-vars */
import { ZeroAddress, type BaseContract, type ContractTransactionResponse } from 'ethers';
import { Provider, ProxySigner } from 'ethers-opt';
import { Logger } from 'logger-chain';
import { ContractTransactionReceipt } from 'ethers';
import { ArbHelper } from '../src/arb.js';
import { GreeterChild__factory, GreeterParent__factory } from '../typechain-types/index.js';

const SEPOLIA_RPC = 'https://0xrpc.io/sep';
const SEPOLIA_ARB_RPC = 'https://sepolia-rollup.arbitrum.io/rpc';

const MNEMONIC = process.env.MNEMONIC || 'test test test test test test test test test test test junk';

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
    tx: Promise<ContractTransactionResponse>,
): Promise<ContractTransactionReceipt | null> {
    const resp = await (await tx).wait();

    logger.debug('Tx', `${txName} (hash: ${resp?.hash})`);

    return resp;
}

async function deployGreeters() {
    const {
        ethBridge: { inbox: inboxAddress },
    } = await arbHelper.arbNetworkConfig;

    // 1. deploy contracts
    const greeterParent = await new GreeterParent__factory(parentSigner).deploy(
        'Hello',
        ZeroAddress,
        inboxAddress,
    );
    await logDeploy('L1: Greeter', greeterParent);

    const greeterChild = await new GreeterChild__factory(childSigner).deploy('Hello', greeterParent.target);
    await logDeploy('L2: Greeter', greeterChild);

    await logTx('L1: Update L2 target', greeterParent.updateChildTarget(greeterChild.target));

    console.log({
        greeterParent: greeterParent.target,
        greeterChild: greeterChild.target,
    });

    return { greeterParent, greeterChild };
}

async function getGreeters() {
    return {
        greeterParent: GreeterParent__factory.connect('0x', parentSigner),
        greeterChild: GreeterChild__factory.connect('0x', childSigner),
    };
}

async function test2() {
    const { greeterParent, greeterChild } = await getGreeters();

    console.log(await greeterParent.greet());
    console.log(await greeterChild.greet());
}

async function deploy() {
    // 1. deploy contracts
    const { greeterParent, greeterChild } = await deployGreeters();

    // 2. set greeting from parent to child
    const newGreeting = 'Hello from Ethereum';
    const data = greeterParent.interface.encodeFunctionData('setGreeting', [newGreeting]);

    const parentToChildMessageGasParams = await arbHelper.estimateParentToChildFees({
        from: greeterParent.target,
        to: greeterChild.target,
        l2CallValue: 0n,
        excessFeeRefundAddress: childSigner.address,
        callValueRefundAddress: childSigner.address,
        data,
    });

    console.log({ parentToChildMessageGasParams });

    const setGreetingTxReceipt = await logTx(
        'L1: Call greeting',
        greeterParent.setGreetingInChild(
            newGreeting,
            parentToChildMessageGasParams.maxSubmissionCost,
            parentToChildMessageGasParams.gasLimit,
            parentToChildMessageGasParams.gasPriceBid,
            {
                value: parentToChildMessageGasParams.deposit,
                gasLimit: 500000,
            },
        ),
    );

    const message = (await arbHelper.parseParentToChildMessage(setGreetingTxReceipt))[0];

    console.log({ message });

    // Wait for 20 minutes for transaction to arrive
    const creationReceipt = await childProvider.waitForTransaction(
        message.creationId,
        undefined,
        1200 * 1000,
    );

    console.log({ creationReceipt });

    console.log(await greeterChild.greet());
}

deploy();
