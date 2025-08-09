import {
    Provider,
    TransactionReceipt,
    TransactionRequest,
    AbiCoder,
    ZeroAddress,
    concat,
    dataLength,
    encodeRlp,
    keccak256,
    parseEther,
} from 'ethers';
import { toFixedHex } from 'ethers-opt';
import { IBridge__factory, IInbox__factory, NodeInterface__factory } from '../typechain-types/index.js';
import { addressFromBigInt, bnToHex } from './utils.js';

export interface ArbNetworkConfig {
    chainId: number;
    name: string;
    parentChainId: number;
    ethBridge: {
        bridge: string;
        inbox: string;
        sequencerInbox: string;
        outbox: string;
        rollup: string;
    };
    gasLimitMultiplier: number;
    gasPriceBidMultiplier: number;
    baseFeeMultiplier: number;
    submissionFeeMultiplier: number;
}

export const arbNetworks: Record<number, ArbNetworkConfig> = {
    42161: {
        chainId: 42161,
        name: 'Arbitrum One',
        parentChainId: 1,
        ethBridge: {
            bridge: '0x8315177aB297bA92A06054cE80a67Ed4DBd7ed3a',
            inbox: '0x4Dbd4fc535Ac27206064B68FfCf827b0A60BAB3f',
            sequencerInbox: '0x1c479675ad559DC151F6Ec7ed3FbF8ceE79582B6',
            outbox: '0x0B9857ae2D4A3DBe74ffE1d7DF045bb7F96E4840',
            rollup: '0x4DCeB440657f21083db8aDd07665f8ddBe1DCfc0',
        },
        gasLimitMultiplier: 1.5,
        gasPriceBidMultiplier: 10,
        baseFeeMultiplier: 25,
        submissionFeeMultiplier: 3,
    },
    421614: {
        chainId: 421614,
        name: 'Arbitrum Rollup Sepolia Testnet',
        parentChainId: 11155111,
        ethBridge: {
            bridge: '0x38f918D0E9F1b721EDaA41302E399fa1B79333a9',
            inbox: '0xaAe29B0366299461418F5324a79Afc425BE5ae21',
            sequencerInbox: '0x6c97864CE4bEf387dE0b3310A44230f7E3F1be0D',
            outbox: '0x65f07C7D521164a4d5DaC6eB8Fac8DA067A3B78F',
            rollup: '0xd80810638dbDF9081b72C1B33c65375e807281C8',
        },
        gasLimitMultiplier: 1.5,
        gasPriceBidMultiplier: 10,
        baseFeeMultiplier: 25,
        submissionFeeMultiplier: 3,
    },
};

export const NODE_INTERFACE_ADDRESS = '0x00000000000000000000000000000000000000C8';

export const ARB_RETRYABLE_TX = '0x000000000000000000000000000000000000006E';

export async function getArbNetwork(arbHelper: ArbHelper) {
    const { parentProvider, childProvider } = arbHelper;

    const [parentChainId, childChainId] = await Promise.all([
        parentProvider.getNetwork().then((n) => Number(n.chainId)),
        childProvider.getNetwork().then((n) => Number(n.chainId)),
    ]);

    if (arbNetworks[childChainId]?.parentChainId === parentChainId) {
        return arbNetworks[childChainId];
    }

    throw new Error('Arbitrum network config not found for given parent / child provider');
}

export interface RetryableMessageData {
    destAddress: string;
    l2CallValue: bigint;
    l1Value: bigint;
    maxSubmissionFee: bigint;
    excessFeeRefundAddress: string;
    callValueRefundAddress: string;
    gasLimit: bigint;
    maxFeePerGas: bigint;
    data: string;
}

export interface RetryableMessage {
    chainId: number;
    // creation txid on arbitrum l2 (also can track full redeem event with this params)
    // see ParentToChildMessageReader -> getSuccessfulRedeem()
    creationId: string;
    sender: string;
    messageNumber: bigint;
    parentBaseFee: bigint;
    messageData: RetryableMessageData;
}

export function submitRetryableMessageDataParser(eventData: string): RetryableMessageData {
    const parsed = AbiCoder.defaultAbiCoder().decode(
        [
            'uint256', // dest
            'uint256', // l2 call balue
            'uint256', // msg val
            'uint256', // max submission
            'uint256', // excess fee refund addr
            'uint256', // call value refund addr
            'uint256', // max gas
            'uint256', // gas price bid
            'uint256', // data length
        ],
        eventData,
    ) as bigint[];

    const destAddress = addressFromBigInt(parsed[0]);
    const l2CallValue = parsed[1];
    const l1Value = parsed[2];
    const maxSubmissionFee = parsed[3];
    const excessFeeRefundAddress = addressFromBigInt(parsed[4]);
    const callValueRefundAddress = addressFromBigInt(parsed[5]);
    const gasLimit = parsed[6];
    const maxFeePerGas = parsed[7];
    const callDataLength = parsed[8];
    const data = '0x' + eventData.substring(eventData.length - Number(callDataLength) * 2).toLowerCase();

    return {
        destAddress,
        l2CallValue,
        l1Value,
        maxSubmissionFee: maxSubmissionFee,
        excessFeeRefundAddress,
        callValueRefundAddress,
        gasLimit,
        maxFeePerGas,
        data,
    };
}

// Get creation arbitrum txid
// ( should track settlement tx later, arbitrum creates two tx for one parent -> child request )
export function getRetryableCreationId({
    chainId,
    sender,
    messageNumber,
    parentBaseFee,
    messageData,
}: RetryableMessage) {
    return keccak256(
        concat([
            '0x69',
            encodeRlp([
                bnToHex(chainId),
                toFixedHex(messageNumber, 32),
                sender,
                bnToHex(parentBaseFee),

                bnToHex(messageData.l1Value),
                bnToHex(messageData.maxFeePerGas),
                bnToHex(messageData.gasLimit),
                messageData.destAddress === ZeroAddress ? '0x' : messageData.destAddress,
                bnToHex(messageData.l2CallValue),
                messageData.callValueRefundAddress,
                bnToHex(messageData.maxSubmissionFee),
                messageData.excessFeeRefundAddress,
                messageData.data,
            ]),
        ]),
    );
}

export interface L2TransactionRequest extends TransactionRequest {
    l2CallValue?: bigint;
    excessFeeRefundAddress?: string;
    callValueRefundAddress?: string;
}

export class ArbHelper {
    // L1 provider
    parentProvider: Provider;
    // L2 provider
    childProvider: Provider;

    arbNetworkConfig: Promise<ArbNetworkConfig>;

    constructor({ parentProvider, childProvider }: { parentProvider: Provider; childProvider: Provider }) {
        this.parentProvider = parentProvider;
        this.childProvider = childProvider;

        this.arbNetworkConfig = getArbNetwork(this);
    }

    // estimateAll func
    async estimateParentToChildFees({
        from,
        to,
        l2CallValue = 0n,
        excessFeeRefundAddress,
        callValueRefundAddress,
        data,
    }: L2TransactionRequest) {
        const {
            ethBridge: { inbox: inboxAddress },
            gasLimitMultiplier,
            gasPriceBidMultiplier,
            baseFeeMultiplier,
            submissionFeeMultiplier,
        } = await this.arbNetworkConfig;

        const inbox = IInbox__factory.connect(inboxAddress, this.parentProvider);
        const nodeInterface = NodeInterface__factory.connect(NODE_INTERFACE_ADDRESS, this.childProvider);

        const [parentBaseFee, childBaseFee] = await Promise.all([
            this.parentProvider.getBlock('latest').then((b) => b?.baseFeePerGas as bigint),
            this.childProvider.getFeeData().then((f) => f.maxFeePerGas as bigint),
        ]);

        const callDataSize = dataLength(data || '0x');

        const gasPriceBid = childBaseFee * BigInt(gasPriceBidMultiplier);

        const maxFeePerGas = childBaseFee * BigInt(baseFeeMultiplier);

        const [maxSubmissionCost, gasLimit] = await Promise.all([
            inbox
                .calculateRetryableSubmissionFee(callDataSize, parentBaseFee)
                .then((f) => f * BigInt(submissionFeeMultiplier)),
            nodeInterface.estimateRetryableTicket
                .estimateGas(
                    from as string,
                    parseEther('1') + l2CallValue,
                    to || (from as string),
                    l2CallValue,
                    excessFeeRefundAddress || (from as string),
                    callValueRefundAddress || (from as string),
                    data || '0x',
                )
                .then((g) => Math.floor(Number(g) * gasLimitMultiplier)),
        ]);

        const deposit = BigInt(gasLimit) * maxFeePerGas + maxSubmissionCost + l2CallValue;

        return {
            gasLimit,
            gasPriceBid,
            maxSubmissionCost,
            maxFeePerGas,
            deposit,
        };
    }

    /**
     * Parse Cross-chain transaction info from parent chain transaction receipts
     * (Does not validate on child chain due to complexity and possible failures with eth_getLogs)
     * (It is recommended to have dedicated transfer nonce because parsing arbitrum bridge txs sucks)
     * (This function may break on ArbOs upgrade, use it with caution!)
     */
    async parseParentToChildMessage(txReceipt: TransactionReceipt | null) {
        const {
            chainId,
            ethBridge: { bridge: bridgeAddress, inbox: inboxAddress },
        } = await this.arbNetworkConfig;

        const bridge = IBridge__factory.connect(bridgeAddress, this.parentProvider);

        const inbox = IInbox__factory.connect(inboxAddress, this.parentProvider);

        const bridgeLogs = (txReceipt?.logs || [])
            .map((log) => {
                if (log.address !== bridgeAddress) {
                    return;
                }

                const parsedLog = bridge.interface.parseLog(log);

                if (parsedLog?.name !== 'MessageDelivered') {
                    return;
                }

                const { messageIndex, sender, baseFeeL1 } = parsedLog.args;

                return {
                    messageIndex,
                    sender,
                    baseFeeL1,
                };
            })
            .filter((l) => l) as { messageIndex: bigint; sender: string; baseFeeL1: bigint }[];

        const messages = (txReceipt?.logs || [])
            .map((log) => {
                if (log.address !== inboxAddress) {
                    return;
                }

                const parsedLog = inbox.interface.parseLog(log);

                if (parsedLog?.name !== 'InboxMessageDelivered') {
                    return;
                }

                const { data, messageNum } = parsedLog.args;

                const bridgeLog = bridgeLogs.find((l) => l.messageIndex === messageNum);

                if (!bridgeLog) {
                    return;
                }

                const messageData = submitRetryableMessageDataParser(data);

                const messageObj: RetryableMessage = {
                    chainId,
                    creationId: '',
                    sender: bridgeLog.sender,
                    messageNumber: messageNum as bigint,
                    parentBaseFee: bridgeLog.baseFeeL1,
                    messageData,
                };

                messageObj.creationId = getRetryableCreationId(messageObj);

                return messageObj;
            })
            .filter((l) => l) as RetryableMessage[];

        return messages;
    }
}
