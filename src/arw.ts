import { formatUnits, getAddress, parseUnits, type BaseContract, type ContractTransaction } from 'ethers';
import { type SignerWithAddress } from 'ethers-opt';
import { ArbGateway, ArbGatewaySettle, ERC20Mock } from '../typechain-types/index.js';
import { type ArbHelper } from './arb.js';

export async function getTokenInfo(token: unknown, user?: SignerWithAddress | string) {
    const Token = token as ERC20Mock;
    const userAddress = (user as SignerWithAddress)?.address || (user as string | undefined);

    const [name, symbol, decimals, totalSupply, balance] = await Promise.all([
        Token.name(),
        Token.symbol(),
        Token.decimals(),
        Token.totalSupply(),
        userAddress ? Token.balanceOf(userAddress) : 0n,
    ]);

    const _decimals = Number(decimals);

    return {
        name,
        symbol,
        decimals: _decimals,
        totalSupply: Number(formatUnits(totalSupply, _decimals)),
        balance: Number(formatUnits(balance, _decimals)),
    };
}

export async function getArwBalance(L1Token: unknown, L2Token: unknown, user?: SignerWithAddress | string) {
    const l1Token = L1Token as ERC20Mock;
    const l2Token = L2Token as ERC20Mock;

    const userAddress = (user as SignerWithAddress)?.address || (user as string | undefined);

    const [l1Decimals, l1Supply, l1Balance, l2Decimals, l2Supply, l2Balance] = await Promise.all([
        l1Token.decimals(),
        l1Token.totalSupply(),
        userAddress ? l1Token.balanceOf(userAddress) : 0n,
        l2Token.decimals(),
        l2Token.totalSupply(),
        userAddress ? l2Token.balanceOf(userAddress) : 0n,
    ]);

    return {
        l1Supply: Number(formatUnits(l1Supply, l1Decimals)),
        l1Balance: Number(formatUnits(l1Balance, l1Decimals)),
        l2Supply: Number(formatUnits(l2Supply, l2Decimals)),
        l2Balance: Number(formatUnits(l2Balance, l2Decimals)),
    };
}

export async function getParentToChildMessageGasParams({
    arbHelper,
    L1Token,
    L2Token,
    L1Gateway,
    L2Gateway,
    from,
    to,
    value,
    data,
    msg,
}: {
    arbHelper: ArbHelper;
    L1Token: ERC20Mock;
    L2Token: ERC20Mock;
    L1Gateway: ArbGateway | ArbGatewaySettle;
    L2Gateway: ArbGateway | ArbGatewaySettle;
    from: string;
    to?: string;
    value: number;
    data?: string;
    msg?: string;
}) {
    const [nonce, l1Decimals] = await Promise.all([
        L1Gateway.nonce().then((n) => Number(n)),
        L1Token.decimals().then((d) => Number(d)),
    ]);

    const _from = getAddress(from);
    const _to = getAddress(to || from);
    const _value = parseUnits(String(value), l1Decimals);
    const _msg = !msg ? undefined : L2Gateway.interface.encodeFunctionData('bridgeMsg', [nonce, msg]);
    const _data = data || _msg || '0x';

    const msgData = L2Gateway.interface.encodeFunctionData('bridgeFrom', [
        l1Decimals,
        L2Token.target,
        _from,
        _to,
        _value,
        _data,
        nonce,
    ]);

    const params = await arbHelper.estimateParentToChildFees({
        from: L1Gateway.target,
        to: L2Gateway.target,
        l2CallValue: 0n,
        excessFeeRefundAddress: _to,
        callValueRefundAddress: _to,
        data: msgData,
    });

    return {
        from: _from,
        to: _to,
        value: _value,
        data: _data,
        msgData,
        params,
    };
}

export async function bridgeArwArb({
    arbHelper,
    L1Token,
    L2Token,
    L1Gateway,
    L2Gateway,
    from,
    to,
    value,
    data,
    msg,
}: {
    arbHelper: ArbHelper;
    L1Token: unknown;
    L2Token: unknown;
    L1Gateway: ArbGateway | ArbGatewaySettle;
    L2Gateway: ArbGateway | ArbGatewaySettle;
    from: string;
    to?: string;
    value: number;
    data?: string;
    msg?: string;
}): Promise<ContractTransaction> {
    const {
        to: _to,
        value: _value,
        data: _data,
        params,
    } = await getParentToChildMessageGasParams({
        arbHelper,
        L1Token: L1Token as ERC20Mock,
        L2Token: L2Token as ERC20Mock,
        L1Gateway,
        L2Gateway,
        from,
        to,
        value,
        data,
        msg,
    });

    return L1Gateway.bridgeTo.populateTransaction(
        (L1Token as BaseContract).target,
        _to,
        _value,
        _data,
        params.maxSubmissionCost,
        params.gasLimit,
        params.gasPriceBid,
        {
            value: params.deposit,
            gasLimit: 500000,
        },
    );
}
