import { AddressLike, BaseContract, BigNumberish, BytesLike, ContractDeployTransaction, ContractFactory, ContractMethod, ContractRunner, ContractTransaction, ContractTransactionResponse, DeferredTopicFilter, EventFragment, EventLog, FunctionFragment, Interface, Listener, LogDescription, Provider, Result, Signer, TransactionReceipt, TransactionRequest, Typed } from 'ethers';
import { SignerWithAddress } from 'ethers-opt';

export interface TypedDeferredTopicFilter<_TCEvent extends TypedContractEvent> extends DeferredTopicFilter {
}
export interface TypedContractEvent<InputTuple extends Array<any> = any, OutputTuple extends Array<any> = any, OutputObject = any> {
	(...args: Partial<InputTuple>): TypedDeferredTopicFilter<TypedContractEvent<InputTuple, OutputTuple, OutputObject>>;
	name: string;
	fragment: EventFragment;
	getFragment(...args: Partial<InputTuple>): EventFragment;
}
export type __TypechainAOutputTuple<T> = T extends TypedContractEvent<infer _U, infer W> ? W : never;
export type __TypechainOutputObject<T> = T extends TypedContractEvent<infer _U, infer _W, infer V> ? V : never;
export interface TypedEventLog<TCEvent extends TypedContractEvent> extends Omit<EventLog, "args"> {
	args: __TypechainAOutputTuple<TCEvent> & __TypechainOutputObject<TCEvent>;
}
export interface TypedLogDescription<TCEvent extends TypedContractEvent> extends Omit<LogDescription, "args"> {
	args: __TypechainAOutputTuple<TCEvent> & __TypechainOutputObject<TCEvent>;
}
export type TypedListener<TCEvent extends TypedContractEvent> = (...listenerArg: [
	...__TypechainAOutputTuple<TCEvent>,
	TypedEventLog<TCEvent>,
	...undefined[]
]) => void;
export type StateMutability = "nonpayable" | "payable" | "view";
export type BaseOverrides = Omit<TransactionRequest, "to" | "data">;
export type NonPayableOverrides = Omit<BaseOverrides, "value" | "blockTag" | "enableCcipRead">;
export type PayableOverrides = Omit<BaseOverrides, "blockTag" | "enableCcipRead">;
export type ViewOverrides = Omit<TransactionRequest, "to" | "data">;
export type Overrides<S extends StateMutability> = S extends "nonpayable" ? NonPayableOverrides : S extends "payable" ? PayableOverrides : ViewOverrides;
export type PostfixOverrides<A extends Array<any>, S extends StateMutability> = A | [
	...A,
	Overrides<S>
];
export type ContractMethodArgs<A extends Array<any>, S extends StateMutability> = PostfixOverrides<{
	[I in keyof A]-?: A[I] | Typed;
}, S>;
export type DefaultReturnType<R> = R extends Array<any> ? R[0] : R;
export interface TypedContractMethod<A extends Array<any> = Array<any>, R = any, S extends StateMutability = "payable"> {
	(...args: ContractMethodArgs<A, S>): S extends "view" ? Promise<DefaultReturnType<R>> : Promise<ContractTransactionResponse>;
	name: string;
	fragment: FunctionFragment;
	getFragment(...args: ContractMethodArgs<A, S>): FunctionFragment;
	populateTransaction(...args: ContractMethodArgs<A, S>): Promise<ContractTransaction>;
	staticCall(...args: ContractMethodArgs<A, "view">): Promise<DefaultReturnType<R>>;
	send(...args: ContractMethodArgs<A, S>): Promise<ContractTransactionResponse>;
	estimateGas(...args: ContractMethodArgs<A, S>): Promise<bigint>;
	staticCallResult(...args: ContractMethodArgs<A, "view">): Promise<R>;
}
export interface AbsOutboxInterface extends Interface {
	getFunction(nameOrSignature: "OUTBOX_VERSION" | "bridge" | "calculateItemHash" | "calculateMerkleRoot" | "executeTransaction" | "executeTransactionSimulation" | "initialize" | "isSpent" | "l2ToL1BatchNum" | "l2ToL1Block" | "l2ToL1EthBlock" | "l2ToL1OutputId" | "l2ToL1Sender" | "l2ToL1Timestamp" | "postUpgradeInit" | "rollup" | "roots" | "spent" | "updateRollupAddress" | "updateSendRoot"): FunctionFragment;
	getEvent(nameOrSignatureOrTopic: "OutBoxTransactionExecuted" | "SendRootUpdated"): EventFragment;
	encodeFunctionData(functionFragment: "OUTBOX_VERSION", values?: undefined): string;
	encodeFunctionData(functionFragment: "bridge", values?: undefined): string;
	encodeFunctionData(functionFragment: "calculateItemHash", values: [
		AddressLike,
		AddressLike,
		BigNumberish,
		BigNumberish,
		BigNumberish,
		BigNumberish,
		BytesLike
	]): string;
	encodeFunctionData(functionFragment: "calculateMerkleRoot", values: [
		BytesLike[],
		BigNumberish,
		BytesLike
	]): string;
	encodeFunctionData(functionFragment: "executeTransaction", values: [
		BytesLike[],
		BigNumberish,
		AddressLike,
		AddressLike,
		BigNumberish,
		BigNumberish,
		BigNumberish,
		BigNumberish,
		BytesLike
	]): string;
	encodeFunctionData(functionFragment: "executeTransactionSimulation", values: [
		BigNumberish,
		AddressLike,
		AddressLike,
		BigNumberish,
		BigNumberish,
		BigNumberish,
		BigNumberish,
		BytesLike
	]): string;
	encodeFunctionData(functionFragment: "initialize", values: [
		AddressLike
	]): string;
	encodeFunctionData(functionFragment: "isSpent", values: [
		BigNumberish
	]): string;
	encodeFunctionData(functionFragment: "l2ToL1BatchNum", values?: undefined): string;
	encodeFunctionData(functionFragment: "l2ToL1Block", values?: undefined): string;
	encodeFunctionData(functionFragment: "l2ToL1EthBlock", values?: undefined): string;
	encodeFunctionData(functionFragment: "l2ToL1OutputId", values?: undefined): string;
	encodeFunctionData(functionFragment: "l2ToL1Sender", values?: undefined): string;
	encodeFunctionData(functionFragment: "l2ToL1Timestamp", values?: undefined): string;
	encodeFunctionData(functionFragment: "postUpgradeInit", values?: undefined): string;
	encodeFunctionData(functionFragment: "rollup", values?: undefined): string;
	encodeFunctionData(functionFragment: "roots", values: [
		BytesLike
	]): string;
	encodeFunctionData(functionFragment: "spent", values: [
		BigNumberish
	]): string;
	encodeFunctionData(functionFragment: "updateRollupAddress", values?: undefined): string;
	encodeFunctionData(functionFragment: "updateSendRoot", values: [
		BytesLike,
		BytesLike
	]): string;
	decodeFunctionResult(functionFragment: "OUTBOX_VERSION", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "bridge", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "calculateItemHash", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "calculateMerkleRoot", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "executeTransaction", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "executeTransactionSimulation", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "initialize", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "isSpent", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "l2ToL1BatchNum", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "l2ToL1Block", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "l2ToL1EthBlock", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "l2ToL1OutputId", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "l2ToL1Sender", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "l2ToL1Timestamp", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "postUpgradeInit", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "rollup", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "roots", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "spent", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "updateRollupAddress", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "updateSendRoot", data: BytesLike): Result;
}
declare namespace OutBoxTransactionExecutedEvent {
	type InputTuple = [
		to: AddressLike,
		l2Sender: AddressLike,
		zero: BigNumberish,
		transactionIndex: BigNumberish
	];
	type OutputTuple = [
		to: string,
		l2Sender: string,
		zero: bigint,
		transactionIndex: bigint
	];
	interface OutputObject {
		to: string;
		l2Sender: string;
		zero: bigint;
		transactionIndex: bigint;
	}
	type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
	type Filter = TypedDeferredTopicFilter<Event>;
	type Log = TypedEventLog<Event>;
	type LogDescription = TypedLogDescription<Event>;
}
declare namespace SendRootUpdatedEvent {
	type InputTuple = [
		outputRoot: BytesLike,
		l2BlockHash: BytesLike
	];
	type OutputTuple = [
		outputRoot: string,
		l2BlockHash: string
	];
	interface OutputObject {
		outputRoot: string;
		l2BlockHash: string;
	}
	type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
	type Filter = TypedDeferredTopicFilter<Event>;
	type Log = TypedEventLog<Event>;
	type LogDescription = TypedLogDescription<Event>;
}
export interface AbsOutbox extends BaseContract {
	connect(runner?: ContractRunner | null): AbsOutbox;
	waitForDeployment(): Promise<this>;
	interface: AbsOutboxInterface;
	queryFilter<TCEvent extends TypedContractEvent>(event: TCEvent, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
	queryFilter<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
	on<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
	on<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
	once<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
	once<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
	listeners<TCEvent extends TypedContractEvent>(event: TCEvent): Promise<Array<TypedListener<TCEvent>>>;
	listeners(eventName?: string): Promise<Array<Listener>>;
	removeAllListeners<TCEvent extends TypedContractEvent>(event?: TCEvent): Promise<this>;
	OUTBOX_VERSION: TypedContractMethod<[
	], [
		bigint
	], "view">;
	bridge: TypedContractMethod<[
	], [
		string
	], "view">;
	calculateItemHash: TypedContractMethod<[
		l2Sender: AddressLike,
		to: AddressLike,
		l2Block: BigNumberish,
		l1Block: BigNumberish,
		l2Timestamp: BigNumberish,
		value: BigNumberish,
		data: BytesLike
	], [
		string
	], "view">;
	calculateMerkleRoot: TypedContractMethod<[
		proof: BytesLike[],
		path: BigNumberish,
		item: BytesLike
	], [
		string
	], "view">;
	executeTransaction: TypedContractMethod<[
		proof: BytesLike[],
		index: BigNumberish,
		l2Sender: AddressLike,
		to: AddressLike,
		l2Block: BigNumberish,
		l1Block: BigNumberish,
		l2Timestamp: BigNumberish,
		value: BigNumberish,
		data: BytesLike
	], [
		void
	], "nonpayable">;
	executeTransactionSimulation: TypedContractMethod<[
		index: BigNumberish,
		l2Sender: AddressLike,
		to: AddressLike,
		l2Block: BigNumberish,
		l1Block: BigNumberish,
		l2Timestamp: BigNumberish,
		value: BigNumberish,
		data: BytesLike
	], [
		void
	], "nonpayable">;
	initialize: TypedContractMethod<[
		_bridge: AddressLike
	], [
		void
	], "nonpayable">;
	isSpent: TypedContractMethod<[
		index: BigNumberish
	], [
		boolean
	], "view">;
	l2ToL1BatchNum: TypedContractMethod<[
	], [
		bigint
	], "view">;
	l2ToL1Block: TypedContractMethod<[
	], [
		bigint
	], "view">;
	l2ToL1EthBlock: TypedContractMethod<[
	], [
		bigint
	], "view">;
	l2ToL1OutputId: TypedContractMethod<[
	], [
		string
	], "view">;
	l2ToL1Sender: TypedContractMethod<[
	], [
		string
	], "view">;
	l2ToL1Timestamp: TypedContractMethod<[
	], [
		bigint
	], "view">;
	postUpgradeInit: TypedContractMethod<[
	], [
		void
	], "nonpayable">;
	rollup: TypedContractMethod<[
	], [
		string
	], "view">;
	roots: TypedContractMethod<[
		arg0: BytesLike
	], [
		string
	], "view">;
	spent: TypedContractMethod<[
		arg0: BigNumberish
	], [
		string
	], "view">;
	updateRollupAddress: TypedContractMethod<[
	], [
		void
	], "nonpayable">;
	updateSendRoot: TypedContractMethod<[
		root: BytesLike,
		l2BlockHash: BytesLike
	], [
		void
	], "nonpayable">;
	getFunction<T extends ContractMethod = ContractMethod>(key: string | FunctionFragment): T;
	getFunction(nameOrSignature: "OUTBOX_VERSION"): TypedContractMethod<[
	], [
		bigint
	], "view">;
	getFunction(nameOrSignature: "bridge"): TypedContractMethod<[
	], [
		string
	], "view">;
	getFunction(nameOrSignature: "calculateItemHash"): TypedContractMethod<[
		l2Sender: AddressLike,
		to: AddressLike,
		l2Block: BigNumberish,
		l1Block: BigNumberish,
		l2Timestamp: BigNumberish,
		value: BigNumberish,
		data: BytesLike
	], [
		string
	], "view">;
	getFunction(nameOrSignature: "calculateMerkleRoot"): TypedContractMethod<[
		proof: BytesLike[],
		path: BigNumberish,
		item: BytesLike
	], [
		string
	], "view">;
	getFunction(nameOrSignature: "executeTransaction"): TypedContractMethod<[
		proof: BytesLike[],
		index: BigNumberish,
		l2Sender: AddressLike,
		to: AddressLike,
		l2Block: BigNumberish,
		l1Block: BigNumberish,
		l2Timestamp: BigNumberish,
		value: BigNumberish,
		data: BytesLike
	], [
		void
	], "nonpayable">;
	getFunction(nameOrSignature: "executeTransactionSimulation"): TypedContractMethod<[
		index: BigNumberish,
		l2Sender: AddressLike,
		to: AddressLike,
		l2Block: BigNumberish,
		l1Block: BigNumberish,
		l2Timestamp: BigNumberish,
		value: BigNumberish,
		data: BytesLike
	], [
		void
	], "nonpayable">;
	getFunction(nameOrSignature: "initialize"): TypedContractMethod<[
		_bridge: AddressLike
	], [
		void
	], "nonpayable">;
	getFunction(nameOrSignature: "isSpent"): TypedContractMethod<[
		index: BigNumberish
	], [
		boolean
	], "view">;
	getFunction(nameOrSignature: "l2ToL1BatchNum"): TypedContractMethod<[
	], [
		bigint
	], "view">;
	getFunction(nameOrSignature: "l2ToL1Block"): TypedContractMethod<[
	], [
		bigint
	], "view">;
	getFunction(nameOrSignature: "l2ToL1EthBlock"): TypedContractMethod<[
	], [
		bigint
	], "view">;
	getFunction(nameOrSignature: "l2ToL1OutputId"): TypedContractMethod<[
	], [
		string
	], "view">;
	getFunction(nameOrSignature: "l2ToL1Sender"): TypedContractMethod<[
	], [
		string
	], "view">;
	getFunction(nameOrSignature: "l2ToL1Timestamp"): TypedContractMethod<[
	], [
		bigint
	], "view">;
	getFunction(nameOrSignature: "postUpgradeInit"): TypedContractMethod<[
	], [
		void
	], "nonpayable">;
	getFunction(nameOrSignature: "rollup"): TypedContractMethod<[
	], [
		string
	], "view">;
	getFunction(nameOrSignature: "roots"): TypedContractMethod<[
		arg0: BytesLike
	], [
		string
	], "view">;
	getFunction(nameOrSignature: "spent"): TypedContractMethod<[
		arg0: BigNumberish
	], [
		string
	], "view">;
	getFunction(nameOrSignature: "updateRollupAddress"): TypedContractMethod<[
	], [
		void
	], "nonpayable">;
	getFunction(nameOrSignature: "updateSendRoot"): TypedContractMethod<[
		root: BytesLike,
		l2BlockHash: BytesLike
	], [
		void
	], "nonpayable">;
	getEvent(key: "OutBoxTransactionExecuted"): TypedContractEvent<OutBoxTransactionExecutedEvent.InputTuple, OutBoxTransactionExecutedEvent.OutputTuple, OutBoxTransactionExecutedEvent.OutputObject>;
	getEvent(key: "SendRootUpdated"): TypedContractEvent<SendRootUpdatedEvent.InputTuple, SendRootUpdatedEvent.OutputTuple, SendRootUpdatedEvent.OutputObject>;
	filters: {
		"OutBoxTransactionExecuted(address,address,uint256,uint256)": TypedContractEvent<OutBoxTransactionExecutedEvent.InputTuple, OutBoxTransactionExecutedEvent.OutputTuple, OutBoxTransactionExecutedEvent.OutputObject>;
		OutBoxTransactionExecuted: TypedContractEvent<OutBoxTransactionExecutedEvent.InputTuple, OutBoxTransactionExecutedEvent.OutputTuple, OutBoxTransactionExecutedEvent.OutputObject>;
		"SendRootUpdated(bytes32,bytes32)": TypedContractEvent<SendRootUpdatedEvent.InputTuple, SendRootUpdatedEvent.OutputTuple, SendRootUpdatedEvent.OutputObject>;
		SendRootUpdated: TypedContractEvent<SendRootUpdatedEvent.InputTuple, SendRootUpdatedEvent.OutputTuple, SendRootUpdatedEvent.OutputObject>;
	};
}
export interface IBridgeInterface extends Interface {
	getFunction(nameOrSignature: "activeOutbox" | "allowedDelayedInboxList" | "allowedDelayedInboxes" | "allowedOutboxList" | "allowedOutboxes" | "delayedInboxAccs" | "delayedMessageCount" | "enqueueSequencerMessage" | "executeCall" | "rollup" | "sequencerInbox" | "sequencerInboxAccs" | "sequencerMessageCount" | "sequencerReportedSubMessageCount" | "setDelayedInbox" | "setOutbox" | "setSequencerInbox" | "submitBatchSpendingReport" | "updateRollupAddress"): FunctionFragment;
	getEvent(nameOrSignatureOrTopic: "BridgeCallTriggered" | "InboxToggle" | "MessageDelivered" | "OutboxToggle" | "RollupUpdated" | "SequencerInboxUpdated"): EventFragment;
	encodeFunctionData(functionFragment: "activeOutbox", values?: undefined): string;
	encodeFunctionData(functionFragment: "allowedDelayedInboxList", values: [
		BigNumberish
	]): string;
	encodeFunctionData(functionFragment: "allowedDelayedInboxes", values: [
		AddressLike
	]): string;
	encodeFunctionData(functionFragment: "allowedOutboxList", values: [
		BigNumberish
	]): string;
	encodeFunctionData(functionFragment: "allowedOutboxes", values: [
		AddressLike
	]): string;
	encodeFunctionData(functionFragment: "delayedInboxAccs", values: [
		BigNumberish
	]): string;
	encodeFunctionData(functionFragment: "delayedMessageCount", values?: undefined): string;
	encodeFunctionData(functionFragment: "enqueueSequencerMessage", values: [
		BytesLike,
		BigNumberish,
		BigNumberish,
		BigNumberish
	]): string;
	encodeFunctionData(functionFragment: "executeCall", values: [
		AddressLike,
		BigNumberish,
		BytesLike
	]): string;
	encodeFunctionData(functionFragment: "rollup", values?: undefined): string;
	encodeFunctionData(functionFragment: "sequencerInbox", values?: undefined): string;
	encodeFunctionData(functionFragment: "sequencerInboxAccs", values: [
		BigNumberish
	]): string;
	encodeFunctionData(functionFragment: "sequencerMessageCount", values?: undefined): string;
	encodeFunctionData(functionFragment: "sequencerReportedSubMessageCount", values?: undefined): string;
	encodeFunctionData(functionFragment: "setDelayedInbox", values: [
		AddressLike,
		boolean
	]): string;
	encodeFunctionData(functionFragment: "setOutbox", values: [
		AddressLike,
		boolean
	]): string;
	encodeFunctionData(functionFragment: "setSequencerInbox", values: [
		AddressLike
	]): string;
	encodeFunctionData(functionFragment: "submitBatchSpendingReport", values: [
		AddressLike,
		BytesLike
	]): string;
	encodeFunctionData(functionFragment: "updateRollupAddress", values: [
		AddressLike
	]): string;
	decodeFunctionResult(functionFragment: "activeOutbox", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "allowedDelayedInboxList", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "allowedDelayedInboxes", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "allowedOutboxList", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "allowedOutboxes", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "delayedInboxAccs", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "delayedMessageCount", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "enqueueSequencerMessage", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "executeCall", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "rollup", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "sequencerInbox", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "sequencerInboxAccs", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "sequencerMessageCount", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "sequencerReportedSubMessageCount", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "setDelayedInbox", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "setOutbox", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "setSequencerInbox", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "submitBatchSpendingReport", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "updateRollupAddress", data: BytesLike): Result;
}
declare namespace BridgeCallTriggeredEvent {
	type InputTuple = [
		outbox: AddressLike,
		to: AddressLike,
		value: BigNumberish,
		data: BytesLike
	];
	type OutputTuple = [
		outbox: string,
		to: string,
		value: bigint,
		data: string
	];
	interface OutputObject {
		outbox: string;
		to: string;
		value: bigint;
		data: string;
	}
	type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
	type Filter = TypedDeferredTopicFilter<Event>;
	type Log = TypedEventLog<Event>;
	type LogDescription = TypedLogDescription<Event>;
}
declare namespace InboxToggleEvent {
	type InputTuple = [
		inbox: AddressLike,
		enabled: boolean
	];
	type OutputTuple = [
		inbox: string,
		enabled: boolean
	];
	interface OutputObject {
		inbox: string;
		enabled: boolean;
	}
	type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
	type Filter = TypedDeferredTopicFilter<Event>;
	type Log = TypedEventLog<Event>;
	type LogDescription = TypedLogDescription<Event>;
}
declare namespace MessageDeliveredEvent {
	type InputTuple = [
		messageIndex: BigNumberish,
		beforeInboxAcc: BytesLike,
		inbox: AddressLike,
		kind: BigNumberish,
		sender: AddressLike,
		messageDataHash: BytesLike,
		baseFeeL1: BigNumberish,
		timestamp: BigNumberish
	];
	type OutputTuple = [
		messageIndex: bigint,
		beforeInboxAcc: string,
		inbox: string,
		kind: bigint,
		sender: string,
		messageDataHash: string,
		baseFeeL1: bigint,
		timestamp: bigint
	];
	interface OutputObject {
		messageIndex: bigint;
		beforeInboxAcc: string;
		inbox: string;
		kind: bigint;
		sender: string;
		messageDataHash: string;
		baseFeeL1: bigint;
		timestamp: bigint;
	}
	type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
	type Filter = TypedDeferredTopicFilter<Event>;
	type Log = TypedEventLog<Event>;
	type LogDescription = TypedLogDescription<Event>;
}
declare namespace OutboxToggleEvent {
	type InputTuple = [
		outbox: AddressLike,
		enabled: boolean
	];
	type OutputTuple = [
		outbox: string,
		enabled: boolean
	];
	interface OutputObject {
		outbox: string;
		enabled: boolean;
	}
	type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
	type Filter = TypedDeferredTopicFilter<Event>;
	type Log = TypedEventLog<Event>;
	type LogDescription = TypedLogDescription<Event>;
}
declare namespace RollupUpdatedEvent {
	type InputTuple = [
		rollup: AddressLike
	];
	type OutputTuple = [
		rollup: string
	];
	interface OutputObject {
		rollup: string;
	}
	type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
	type Filter = TypedDeferredTopicFilter<Event>;
	type Log = TypedEventLog<Event>;
	type LogDescription = TypedLogDescription<Event>;
}
declare namespace SequencerInboxUpdatedEvent {
	type InputTuple = [
		newSequencerInbox: AddressLike
	];
	type OutputTuple = [
		newSequencerInbox: string
	];
	interface OutputObject {
		newSequencerInbox: string;
	}
	type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
	type Filter = TypedDeferredTopicFilter<Event>;
	type Log = TypedEventLog<Event>;
	type LogDescription = TypedLogDescription<Event>;
}
export interface IBridge extends BaseContract {
	connect(runner?: ContractRunner | null): IBridge;
	waitForDeployment(): Promise<this>;
	interface: IBridgeInterface;
	queryFilter<TCEvent extends TypedContractEvent>(event: TCEvent, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
	queryFilter<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
	on<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
	on<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
	once<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
	once<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
	listeners<TCEvent extends TypedContractEvent>(event: TCEvent): Promise<Array<TypedListener<TCEvent>>>;
	listeners(eventName?: string): Promise<Array<Listener>>;
	removeAllListeners<TCEvent extends TypedContractEvent>(event?: TCEvent): Promise<this>;
	activeOutbox: TypedContractMethod<[
	], [
		string
	], "view">;
	allowedDelayedInboxList: TypedContractMethod<[
		arg0: BigNumberish
	], [
		string
	], "nonpayable">;
	allowedDelayedInboxes: TypedContractMethod<[
		inbox: AddressLike
	], [
		boolean
	], "view">;
	allowedOutboxList: TypedContractMethod<[
		arg0: BigNumberish
	], [
		string
	], "nonpayable">;
	allowedOutboxes: TypedContractMethod<[
		outbox: AddressLike
	], [
		boolean
	], "view">;
	delayedInboxAccs: TypedContractMethod<[
		arg0: BigNumberish
	], [
		string
	], "view">;
	delayedMessageCount: TypedContractMethod<[
	], [
		bigint
	], "view">;
	enqueueSequencerMessage: TypedContractMethod<[
		dataHash: BytesLike,
		afterDelayedMessagesRead: BigNumberish,
		prevMessageCount: BigNumberish,
		newMessageCount: BigNumberish
	], [
		[
			bigint,
			string,
			string,
			string
		] & {
			seqMessageIndex: bigint;
			beforeAcc: string;
			delayedAcc: string;
			acc: string;
		}
	], "nonpayable">;
	executeCall: TypedContractMethod<[
		to: AddressLike,
		value: BigNumberish,
		data: BytesLike
	], [
		[
			boolean,
			string
		] & {
			success: boolean;
			returnData: string;
		}
	], "nonpayable">;
	rollup: TypedContractMethod<[
	], [
		string
	], "view">;
	sequencerInbox: TypedContractMethod<[
	], [
		string
	], "view">;
	sequencerInboxAccs: TypedContractMethod<[
		arg0: BigNumberish
	], [
		string
	], "view">;
	sequencerMessageCount: TypedContractMethod<[
	], [
		bigint
	], "view">;
	sequencerReportedSubMessageCount: TypedContractMethod<[
	], [
		bigint
	], "view">;
	setDelayedInbox: TypedContractMethod<[
		inbox: AddressLike,
		enabled: boolean
	], [
		void
	], "nonpayable">;
	setOutbox: TypedContractMethod<[
		inbox: AddressLike,
		enabled: boolean
	], [
		void
	], "nonpayable">;
	setSequencerInbox: TypedContractMethod<[
		_sequencerInbox: AddressLike
	], [
		void
	], "nonpayable">;
	submitBatchSpendingReport: TypedContractMethod<[
		batchPoster: AddressLike,
		dataHash: BytesLike
	], [
		bigint
	], "nonpayable">;
	updateRollupAddress: TypedContractMethod<[
		_rollup: AddressLike
	], [
		void
	], "nonpayable">;
	getFunction<T extends ContractMethod = ContractMethod>(key: string | FunctionFragment): T;
	getFunction(nameOrSignature: "activeOutbox"): TypedContractMethod<[
	], [
		string
	], "view">;
	getFunction(nameOrSignature: "allowedDelayedInboxList"): TypedContractMethod<[
		arg0: BigNumberish
	], [
		string
	], "nonpayable">;
	getFunction(nameOrSignature: "allowedDelayedInboxes"): TypedContractMethod<[
		inbox: AddressLike
	], [
		boolean
	], "view">;
	getFunction(nameOrSignature: "allowedOutboxList"): TypedContractMethod<[
		arg0: BigNumberish
	], [
		string
	], "nonpayable">;
	getFunction(nameOrSignature: "allowedOutboxes"): TypedContractMethod<[
		outbox: AddressLike
	], [
		boolean
	], "view">;
	getFunction(nameOrSignature: "delayedInboxAccs"): TypedContractMethod<[
		arg0: BigNumberish
	], [
		string
	], "view">;
	getFunction(nameOrSignature: "delayedMessageCount"): TypedContractMethod<[
	], [
		bigint
	], "view">;
	getFunction(nameOrSignature: "enqueueSequencerMessage"): TypedContractMethod<[
		dataHash: BytesLike,
		afterDelayedMessagesRead: BigNumberish,
		prevMessageCount: BigNumberish,
		newMessageCount: BigNumberish
	], [
		[
			bigint,
			string,
			string,
			string
		] & {
			seqMessageIndex: bigint;
			beforeAcc: string;
			delayedAcc: string;
			acc: string;
		}
	], "nonpayable">;
	getFunction(nameOrSignature: "executeCall"): TypedContractMethod<[
		to: AddressLike,
		value: BigNumberish,
		data: BytesLike
	], [
		[
			boolean,
			string
		] & {
			success: boolean;
			returnData: string;
		}
	], "nonpayable">;
	getFunction(nameOrSignature: "rollup"): TypedContractMethod<[
	], [
		string
	], "view">;
	getFunction(nameOrSignature: "sequencerInbox"): TypedContractMethod<[
	], [
		string
	], "view">;
	getFunction(nameOrSignature: "sequencerInboxAccs"): TypedContractMethod<[
		arg0: BigNumberish
	], [
		string
	], "view">;
	getFunction(nameOrSignature: "sequencerMessageCount"): TypedContractMethod<[
	], [
		bigint
	], "view">;
	getFunction(nameOrSignature: "sequencerReportedSubMessageCount"): TypedContractMethod<[
	], [
		bigint
	], "view">;
	getFunction(nameOrSignature: "setDelayedInbox"): TypedContractMethod<[
		inbox: AddressLike,
		enabled: boolean
	], [
		void
	], "nonpayable">;
	getFunction(nameOrSignature: "setOutbox"): TypedContractMethod<[
		inbox: AddressLike,
		enabled: boolean
	], [
		void
	], "nonpayable">;
	getFunction(nameOrSignature: "setSequencerInbox"): TypedContractMethod<[
		_sequencerInbox: AddressLike
	], [
		void
	], "nonpayable">;
	getFunction(nameOrSignature: "submitBatchSpendingReport"): TypedContractMethod<[
		batchPoster: AddressLike,
		dataHash: BytesLike
	], [
		bigint
	], "nonpayable">;
	getFunction(nameOrSignature: "updateRollupAddress"): TypedContractMethod<[
		_rollup: AddressLike
	], [
		void
	], "nonpayable">;
	getEvent(key: "BridgeCallTriggered"): TypedContractEvent<BridgeCallTriggeredEvent.InputTuple, BridgeCallTriggeredEvent.OutputTuple, BridgeCallTriggeredEvent.OutputObject>;
	getEvent(key: "InboxToggle"): TypedContractEvent<InboxToggleEvent.InputTuple, InboxToggleEvent.OutputTuple, InboxToggleEvent.OutputObject>;
	getEvent(key: "MessageDelivered"): TypedContractEvent<MessageDeliveredEvent.InputTuple, MessageDeliveredEvent.OutputTuple, MessageDeliveredEvent.OutputObject>;
	getEvent(key: "OutboxToggle"): TypedContractEvent<OutboxToggleEvent.InputTuple, OutboxToggleEvent.OutputTuple, OutboxToggleEvent.OutputObject>;
	getEvent(key: "RollupUpdated"): TypedContractEvent<RollupUpdatedEvent.InputTuple, RollupUpdatedEvent.OutputTuple, RollupUpdatedEvent.OutputObject>;
	getEvent(key: "SequencerInboxUpdated"): TypedContractEvent<SequencerInboxUpdatedEvent.InputTuple, SequencerInboxUpdatedEvent.OutputTuple, SequencerInboxUpdatedEvent.OutputObject>;
	filters: {
		"BridgeCallTriggered(address,address,uint256,bytes)": TypedContractEvent<BridgeCallTriggeredEvent.InputTuple, BridgeCallTriggeredEvent.OutputTuple, BridgeCallTriggeredEvent.OutputObject>;
		BridgeCallTriggered: TypedContractEvent<BridgeCallTriggeredEvent.InputTuple, BridgeCallTriggeredEvent.OutputTuple, BridgeCallTriggeredEvent.OutputObject>;
		"InboxToggle(address,bool)": TypedContractEvent<InboxToggleEvent.InputTuple, InboxToggleEvent.OutputTuple, InboxToggleEvent.OutputObject>;
		InboxToggle: TypedContractEvent<InboxToggleEvent.InputTuple, InboxToggleEvent.OutputTuple, InboxToggleEvent.OutputObject>;
		"MessageDelivered(uint256,bytes32,address,uint8,address,bytes32,uint256,uint64)": TypedContractEvent<MessageDeliveredEvent.InputTuple, MessageDeliveredEvent.OutputTuple, MessageDeliveredEvent.OutputObject>;
		MessageDelivered: TypedContractEvent<MessageDeliveredEvent.InputTuple, MessageDeliveredEvent.OutputTuple, MessageDeliveredEvent.OutputObject>;
		"OutboxToggle(address,bool)": TypedContractEvent<OutboxToggleEvent.InputTuple, OutboxToggleEvent.OutputTuple, OutboxToggleEvent.OutputObject>;
		OutboxToggle: TypedContractEvent<OutboxToggleEvent.InputTuple, OutboxToggleEvent.OutputTuple, OutboxToggleEvent.OutputObject>;
		"RollupUpdated(address)": TypedContractEvent<RollupUpdatedEvent.InputTuple, RollupUpdatedEvent.OutputTuple, RollupUpdatedEvent.OutputObject>;
		RollupUpdated: TypedContractEvent<RollupUpdatedEvent.InputTuple, RollupUpdatedEvent.OutputTuple, RollupUpdatedEvent.OutputObject>;
		"SequencerInboxUpdated(address)": TypedContractEvent<SequencerInboxUpdatedEvent.InputTuple, SequencerInboxUpdatedEvent.OutputTuple, SequencerInboxUpdatedEvent.OutputObject>;
		SequencerInboxUpdated: TypedContractEvent<SequencerInboxUpdatedEvent.InputTuple, SequencerInboxUpdatedEvent.OutputTuple, SequencerInboxUpdatedEvent.OutputObject>;
	};
}
export interface IDelayedMessageProviderInterface extends Interface {
	getEvent(nameOrSignatureOrTopic: "InboxMessageDelivered" | "InboxMessageDeliveredFromOrigin"): EventFragment;
}
declare namespace InboxMessageDeliveredEvent {
	type InputTuple = [
		messageNum: BigNumberish,
		data: BytesLike
	];
	type OutputTuple = [
		messageNum: bigint,
		data: string
	];
	interface OutputObject {
		messageNum: bigint;
		data: string;
	}
	type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
	type Filter = TypedDeferredTopicFilter<Event>;
	type Log = TypedEventLog<Event>;
	type LogDescription = TypedLogDescription<Event>;
}
declare namespace InboxMessageDeliveredFromOriginEvent {
	type InputTuple = [
		messageNum: BigNumberish
	];
	type OutputTuple = [
		messageNum: bigint
	];
	interface OutputObject {
		messageNum: bigint;
	}
	type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
	type Filter = TypedDeferredTopicFilter<Event>;
	type Log = TypedEventLog<Event>;
	type LogDescription = TypedLogDescription<Event>;
}
export interface IDelayedMessageProvider extends BaseContract {
	connect(runner?: ContractRunner | null): IDelayedMessageProvider;
	waitForDeployment(): Promise<this>;
	interface: IDelayedMessageProviderInterface;
	queryFilter<TCEvent extends TypedContractEvent>(event: TCEvent, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
	queryFilter<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
	on<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
	on<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
	once<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
	once<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
	listeners<TCEvent extends TypedContractEvent>(event: TCEvent): Promise<Array<TypedListener<TCEvent>>>;
	listeners(eventName?: string): Promise<Array<Listener>>;
	removeAllListeners<TCEvent extends TypedContractEvent>(event?: TCEvent): Promise<this>;
	getFunction<T extends ContractMethod = ContractMethod>(key: string | FunctionFragment): T;
	getEvent(key: "InboxMessageDelivered"): TypedContractEvent<InboxMessageDeliveredEvent.InputTuple, InboxMessageDeliveredEvent.OutputTuple, InboxMessageDeliveredEvent.OutputObject>;
	getEvent(key: "InboxMessageDeliveredFromOrigin"): TypedContractEvent<InboxMessageDeliveredFromOriginEvent.InputTuple, InboxMessageDeliveredFromOriginEvent.OutputTuple, InboxMessageDeliveredFromOriginEvent.OutputObject>;
	filters: {
		"InboxMessageDelivered(uint256,bytes)": TypedContractEvent<InboxMessageDeliveredEvent.InputTuple, InboxMessageDeliveredEvent.OutputTuple, InboxMessageDeliveredEvent.OutputObject>;
		InboxMessageDelivered: TypedContractEvent<InboxMessageDeliveredEvent.InputTuple, InboxMessageDeliveredEvent.OutputTuple, InboxMessageDeliveredEvent.OutputObject>;
		"InboxMessageDeliveredFromOrigin(uint256)": TypedContractEvent<InboxMessageDeliveredFromOriginEvent.InputTuple, InboxMessageDeliveredFromOriginEvent.OutputTuple, InboxMessageDeliveredFromOriginEvent.OutputObject>;
		InboxMessageDeliveredFromOrigin: TypedContractEvent<InboxMessageDeliveredFromOriginEvent.InputTuple, InboxMessageDeliveredFromOriginEvent.OutputTuple, InboxMessageDeliveredFromOriginEvent.OutputObject>;
	};
}
export interface IInboxInterface extends Interface {
	getFunction(nameOrSignature: "allowListEnabled" | "bridge" | "calculateRetryableSubmissionFee" | "createRetryableTicket" | "depositEth" | "getProxyAdmin" | "initialize" | "isAllowed" | "maxDataSize" | "pause" | "postUpgradeInit" | "sendContractTransaction" | "sendL1FundedContractTransaction" | "sendL1FundedUnsignedTransaction" | "sendL1FundedUnsignedTransactionToFork" | "sendL2Message" | "sendL2MessageFromOrigin" | "sendUnsignedTransaction" | "sendUnsignedTransactionToFork" | "sendWithdrawEthToFork" | "sequencerInbox" | "setAllowList" | "setAllowListEnabled" | "unpause" | "unsafeCreateRetryableTicket"): FunctionFragment;
	getEvent(nameOrSignatureOrTopic: "InboxMessageDelivered" | "InboxMessageDeliveredFromOrigin"): EventFragment;
	encodeFunctionData(functionFragment: "allowListEnabled", values?: undefined): string;
	encodeFunctionData(functionFragment: "bridge", values?: undefined): string;
	encodeFunctionData(functionFragment: "calculateRetryableSubmissionFee", values: [
		BigNumberish,
		BigNumberish
	]): string;
	encodeFunctionData(functionFragment: "createRetryableTicket", values: [
		AddressLike,
		BigNumberish,
		BigNumberish,
		AddressLike,
		AddressLike,
		BigNumberish,
		BigNumberish,
		BytesLike
	]): string;
	encodeFunctionData(functionFragment: "depositEth", values?: undefined): string;
	encodeFunctionData(functionFragment: "getProxyAdmin", values?: undefined): string;
	encodeFunctionData(functionFragment: "initialize", values: [
		AddressLike,
		AddressLike
	]): string;
	encodeFunctionData(functionFragment: "isAllowed", values: [
		AddressLike
	]): string;
	encodeFunctionData(functionFragment: "maxDataSize", values?: undefined): string;
	encodeFunctionData(functionFragment: "pause", values?: undefined): string;
	encodeFunctionData(functionFragment: "postUpgradeInit", values: [
		AddressLike
	]): string;
	encodeFunctionData(functionFragment: "sendContractTransaction", values: [
		BigNumberish,
		BigNumberish,
		AddressLike,
		BigNumberish,
		BytesLike
	]): string;
	encodeFunctionData(functionFragment: "sendL1FundedContractTransaction", values: [
		BigNumberish,
		BigNumberish,
		AddressLike,
		BytesLike
	]): string;
	encodeFunctionData(functionFragment: "sendL1FundedUnsignedTransaction", values: [
		BigNumberish,
		BigNumberish,
		BigNumberish,
		AddressLike,
		BytesLike
	]): string;
	encodeFunctionData(functionFragment: "sendL1FundedUnsignedTransactionToFork", values: [
		BigNumberish,
		BigNumberish,
		BigNumberish,
		AddressLike,
		BytesLike
	]): string;
	encodeFunctionData(functionFragment: "sendL2Message", values: [
		BytesLike
	]): string;
	encodeFunctionData(functionFragment: "sendL2MessageFromOrigin", values: [
		BytesLike
	]): string;
	encodeFunctionData(functionFragment: "sendUnsignedTransaction", values: [
		BigNumberish,
		BigNumberish,
		BigNumberish,
		AddressLike,
		BigNumberish,
		BytesLike
	]): string;
	encodeFunctionData(functionFragment: "sendUnsignedTransactionToFork", values: [
		BigNumberish,
		BigNumberish,
		BigNumberish,
		AddressLike,
		BigNumberish,
		BytesLike
	]): string;
	encodeFunctionData(functionFragment: "sendWithdrawEthToFork", values: [
		BigNumberish,
		BigNumberish,
		BigNumberish,
		BigNumberish,
		AddressLike
	]): string;
	encodeFunctionData(functionFragment: "sequencerInbox", values?: undefined): string;
	encodeFunctionData(functionFragment: "setAllowList", values: [
		AddressLike[],
		boolean[]
	]): string;
	encodeFunctionData(functionFragment: "setAllowListEnabled", values: [
		boolean
	]): string;
	encodeFunctionData(functionFragment: "unpause", values?: undefined): string;
	encodeFunctionData(functionFragment: "unsafeCreateRetryableTicket", values: [
		AddressLike,
		BigNumberish,
		BigNumberish,
		AddressLike,
		AddressLike,
		BigNumberish,
		BigNumberish,
		BytesLike
	]): string;
	decodeFunctionResult(functionFragment: "allowListEnabled", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "bridge", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "calculateRetryableSubmissionFee", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "createRetryableTicket", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "depositEth", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "getProxyAdmin", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "initialize", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "isAllowed", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "maxDataSize", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "pause", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "postUpgradeInit", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "sendContractTransaction", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "sendL1FundedContractTransaction", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "sendL1FundedUnsignedTransaction", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "sendL1FundedUnsignedTransactionToFork", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "sendL2Message", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "sendL2MessageFromOrigin", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "sendUnsignedTransaction", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "sendUnsignedTransactionToFork", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "sendWithdrawEthToFork", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "sequencerInbox", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "setAllowList", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "setAllowListEnabled", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "unpause", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "unsafeCreateRetryableTicket", data: BytesLike): Result;
}
declare namespace InboxMessageDeliveredEvent$1 {
	type InputTuple = [
		messageNum: BigNumberish,
		data: BytesLike
	];
	type OutputTuple = [
		messageNum: bigint,
		data: string
	];
	interface OutputObject {
		messageNum: bigint;
		data: string;
	}
	type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
	type Filter = TypedDeferredTopicFilter<Event>;
	type Log = TypedEventLog<Event>;
	type LogDescription = TypedLogDescription<Event>;
}
declare namespace InboxMessageDeliveredFromOriginEvent$1 {
	type InputTuple = [
		messageNum: BigNumberish
	];
	type OutputTuple = [
		messageNum: bigint
	];
	interface OutputObject {
		messageNum: bigint;
	}
	type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
	type Filter = TypedDeferredTopicFilter<Event>;
	type Log = TypedEventLog<Event>;
	type LogDescription = TypedLogDescription<Event>;
}
export interface IInbox extends BaseContract {
	connect(runner?: ContractRunner | null): IInbox;
	waitForDeployment(): Promise<this>;
	interface: IInboxInterface;
	queryFilter<TCEvent extends TypedContractEvent>(event: TCEvent, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
	queryFilter<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
	on<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
	on<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
	once<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
	once<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
	listeners<TCEvent extends TypedContractEvent>(event: TCEvent): Promise<Array<TypedListener<TCEvent>>>;
	listeners(eventName?: string): Promise<Array<Listener>>;
	removeAllListeners<TCEvent extends TypedContractEvent>(event?: TCEvent): Promise<this>;
	allowListEnabled: TypedContractMethod<[
	], [
		boolean
	], "view">;
	bridge: TypedContractMethod<[
	], [
		string
	], "view">;
	calculateRetryableSubmissionFee: TypedContractMethod<[
		dataLength: BigNumberish,
		baseFee: BigNumberish
	], [
		bigint
	], "view">;
	createRetryableTicket: TypedContractMethod<[
		to: AddressLike,
		l2CallValue: BigNumberish,
		maxSubmissionCost: BigNumberish,
		excessFeeRefundAddress: AddressLike,
		callValueRefundAddress: AddressLike,
		gasLimit: BigNumberish,
		maxFeePerGas: BigNumberish,
		data: BytesLike
	], [
		bigint
	], "payable">;
	depositEth: TypedContractMethod<[
	], [
		bigint
	], "payable">;
	getProxyAdmin: TypedContractMethod<[
	], [
		string
	], "view">;
	initialize: TypedContractMethod<[
		_bridge: AddressLike,
		_sequencerInbox: AddressLike
	], [
		void
	], "nonpayable">;
	isAllowed: TypedContractMethod<[
		user: AddressLike
	], [
		boolean
	], "view">;
	maxDataSize: TypedContractMethod<[
	], [
		bigint
	], "view">;
	pause: TypedContractMethod<[
	], [
		void
	], "nonpayable">;
	postUpgradeInit: TypedContractMethod<[
		_bridge: AddressLike
	], [
		void
	], "nonpayable">;
	sendContractTransaction: TypedContractMethod<[
		gasLimit: BigNumberish,
		maxFeePerGas: BigNumberish,
		to: AddressLike,
		value: BigNumberish,
		data: BytesLike
	], [
		bigint
	], "nonpayable">;
	sendL1FundedContractTransaction: TypedContractMethod<[
		gasLimit: BigNumberish,
		maxFeePerGas: BigNumberish,
		to: AddressLike,
		data: BytesLike
	], [
		bigint
	], "payable">;
	sendL1FundedUnsignedTransaction: TypedContractMethod<[
		gasLimit: BigNumberish,
		maxFeePerGas: BigNumberish,
		nonce: BigNumberish,
		to: AddressLike,
		data: BytesLike
	], [
		bigint
	], "payable">;
	sendL1FundedUnsignedTransactionToFork: TypedContractMethod<[
		gasLimit: BigNumberish,
		maxFeePerGas: BigNumberish,
		nonce: BigNumberish,
		to: AddressLike,
		data: BytesLike
	], [
		bigint
	], "payable">;
	sendL2Message: TypedContractMethod<[
		messageData: BytesLike
	], [
		bigint
	], "nonpayable">;
	sendL2MessageFromOrigin: TypedContractMethod<[
		messageData: BytesLike
	], [
		bigint
	], "nonpayable">;
	sendUnsignedTransaction: TypedContractMethod<[
		gasLimit: BigNumberish,
		maxFeePerGas: BigNumberish,
		nonce: BigNumberish,
		to: AddressLike,
		value: BigNumberish,
		data: BytesLike
	], [
		bigint
	], "nonpayable">;
	sendUnsignedTransactionToFork: TypedContractMethod<[
		gasLimit: BigNumberish,
		maxFeePerGas: BigNumberish,
		nonce: BigNumberish,
		to: AddressLike,
		value: BigNumberish,
		data: BytesLike
	], [
		bigint
	], "nonpayable">;
	sendWithdrawEthToFork: TypedContractMethod<[
		gasLimit: BigNumberish,
		maxFeePerGas: BigNumberish,
		nonce: BigNumberish,
		value: BigNumberish,
		withdrawTo: AddressLike
	], [
		bigint
	], "nonpayable">;
	sequencerInbox: TypedContractMethod<[
	], [
		string
	], "view">;
	setAllowList: TypedContractMethod<[
		user: AddressLike[],
		val: boolean[]
	], [
		void
	], "nonpayable">;
	setAllowListEnabled: TypedContractMethod<[
		_allowListEnabled: boolean
	], [
		void
	], "nonpayable">;
	unpause: TypedContractMethod<[
	], [
		void
	], "nonpayable">;
	unsafeCreateRetryableTicket: TypedContractMethod<[
		to: AddressLike,
		l2CallValue: BigNumberish,
		maxSubmissionCost: BigNumberish,
		excessFeeRefundAddress: AddressLike,
		callValueRefundAddress: AddressLike,
		gasLimit: BigNumberish,
		maxFeePerGas: BigNumberish,
		data: BytesLike
	], [
		bigint
	], "payable">;
	getFunction<T extends ContractMethod = ContractMethod>(key: string | FunctionFragment): T;
	getFunction(nameOrSignature: "allowListEnabled"): TypedContractMethod<[
	], [
		boolean
	], "view">;
	getFunction(nameOrSignature: "bridge"): TypedContractMethod<[
	], [
		string
	], "view">;
	getFunction(nameOrSignature: "calculateRetryableSubmissionFee"): TypedContractMethod<[
		dataLength: BigNumberish,
		baseFee: BigNumberish
	], [
		bigint
	], "view">;
	getFunction(nameOrSignature: "createRetryableTicket"): TypedContractMethod<[
		to: AddressLike,
		l2CallValue: BigNumberish,
		maxSubmissionCost: BigNumberish,
		excessFeeRefundAddress: AddressLike,
		callValueRefundAddress: AddressLike,
		gasLimit: BigNumberish,
		maxFeePerGas: BigNumberish,
		data: BytesLike
	], [
		bigint
	], "payable">;
	getFunction(nameOrSignature: "depositEth"): TypedContractMethod<[
	], [
		bigint
	], "payable">;
	getFunction(nameOrSignature: "getProxyAdmin"): TypedContractMethod<[
	], [
		string
	], "view">;
	getFunction(nameOrSignature: "initialize"): TypedContractMethod<[
		_bridge: AddressLike,
		_sequencerInbox: AddressLike
	], [
		void
	], "nonpayable">;
	getFunction(nameOrSignature: "isAllowed"): TypedContractMethod<[
		user: AddressLike
	], [
		boolean
	], "view">;
	getFunction(nameOrSignature: "maxDataSize"): TypedContractMethod<[
	], [
		bigint
	], "view">;
	getFunction(nameOrSignature: "pause"): TypedContractMethod<[
	], [
		void
	], "nonpayable">;
	getFunction(nameOrSignature: "postUpgradeInit"): TypedContractMethod<[
		_bridge: AddressLike
	], [
		void
	], "nonpayable">;
	getFunction(nameOrSignature: "sendContractTransaction"): TypedContractMethod<[
		gasLimit: BigNumberish,
		maxFeePerGas: BigNumberish,
		to: AddressLike,
		value: BigNumberish,
		data: BytesLike
	], [
		bigint
	], "nonpayable">;
	getFunction(nameOrSignature: "sendL1FundedContractTransaction"): TypedContractMethod<[
		gasLimit: BigNumberish,
		maxFeePerGas: BigNumberish,
		to: AddressLike,
		data: BytesLike
	], [
		bigint
	], "payable">;
	getFunction(nameOrSignature: "sendL1FundedUnsignedTransaction"): TypedContractMethod<[
		gasLimit: BigNumberish,
		maxFeePerGas: BigNumberish,
		nonce: BigNumberish,
		to: AddressLike,
		data: BytesLike
	], [
		bigint
	], "payable">;
	getFunction(nameOrSignature: "sendL1FundedUnsignedTransactionToFork"): TypedContractMethod<[
		gasLimit: BigNumberish,
		maxFeePerGas: BigNumberish,
		nonce: BigNumberish,
		to: AddressLike,
		data: BytesLike
	], [
		bigint
	], "payable">;
	getFunction(nameOrSignature: "sendL2Message"): TypedContractMethod<[
		messageData: BytesLike
	], [
		bigint
	], "nonpayable">;
	getFunction(nameOrSignature: "sendL2MessageFromOrigin"): TypedContractMethod<[
		messageData: BytesLike
	], [
		bigint
	], "nonpayable">;
	getFunction(nameOrSignature: "sendUnsignedTransaction"): TypedContractMethod<[
		gasLimit: BigNumberish,
		maxFeePerGas: BigNumberish,
		nonce: BigNumberish,
		to: AddressLike,
		value: BigNumberish,
		data: BytesLike
	], [
		bigint
	], "nonpayable">;
	getFunction(nameOrSignature: "sendUnsignedTransactionToFork"): TypedContractMethod<[
		gasLimit: BigNumberish,
		maxFeePerGas: BigNumberish,
		nonce: BigNumberish,
		to: AddressLike,
		value: BigNumberish,
		data: BytesLike
	], [
		bigint
	], "nonpayable">;
	getFunction(nameOrSignature: "sendWithdrawEthToFork"): TypedContractMethod<[
		gasLimit: BigNumberish,
		maxFeePerGas: BigNumberish,
		nonce: BigNumberish,
		value: BigNumberish,
		withdrawTo: AddressLike
	], [
		bigint
	], "nonpayable">;
	getFunction(nameOrSignature: "sequencerInbox"): TypedContractMethod<[
	], [
		string
	], "view">;
	getFunction(nameOrSignature: "setAllowList"): TypedContractMethod<[
		user: AddressLike[],
		val: boolean[]
	], [
		void
	], "nonpayable">;
	getFunction(nameOrSignature: "setAllowListEnabled"): TypedContractMethod<[
		_allowListEnabled: boolean
	], [
		void
	], "nonpayable">;
	getFunction(nameOrSignature: "unpause"): TypedContractMethod<[
	], [
		void
	], "nonpayable">;
	getFunction(nameOrSignature: "unsafeCreateRetryableTicket"): TypedContractMethod<[
		to: AddressLike,
		l2CallValue: BigNumberish,
		maxSubmissionCost: BigNumberish,
		excessFeeRefundAddress: AddressLike,
		callValueRefundAddress: AddressLike,
		gasLimit: BigNumberish,
		maxFeePerGas: BigNumberish,
		data: BytesLike
	], [
		bigint
	], "payable">;
	getEvent(key: "InboxMessageDelivered"): TypedContractEvent<InboxMessageDeliveredEvent$1.InputTuple, InboxMessageDeliveredEvent$1.OutputTuple, InboxMessageDeliveredEvent$1.OutputObject>;
	getEvent(key: "InboxMessageDeliveredFromOrigin"): TypedContractEvent<InboxMessageDeliveredFromOriginEvent$1.InputTuple, InboxMessageDeliveredFromOriginEvent$1.OutputTuple, InboxMessageDeliveredFromOriginEvent$1.OutputObject>;
	filters: {
		"InboxMessageDelivered(uint256,bytes)": TypedContractEvent<InboxMessageDeliveredEvent$1.InputTuple, InboxMessageDeliveredEvent$1.OutputTuple, InboxMessageDeliveredEvent$1.OutputObject>;
		InboxMessageDelivered: TypedContractEvent<InboxMessageDeliveredEvent$1.InputTuple, InboxMessageDeliveredEvent$1.OutputTuple, InboxMessageDeliveredEvent$1.OutputObject>;
		"InboxMessageDeliveredFromOrigin(uint256)": TypedContractEvent<InboxMessageDeliveredFromOriginEvent$1.InputTuple, InboxMessageDeliveredFromOriginEvent$1.OutputTuple, InboxMessageDeliveredFromOriginEvent$1.OutputObject>;
		InboxMessageDeliveredFromOrigin: TypedContractEvent<InboxMessageDeliveredFromOriginEvent$1.InputTuple, InboxMessageDeliveredFromOriginEvent$1.OutputTuple, InboxMessageDeliveredFromOriginEvent$1.OutputObject>;
	};
}
export interface IInboxBaseInterface extends Interface {
	getFunction(nameOrSignature: "allowListEnabled" | "bridge" | "calculateRetryableSubmissionFee" | "getProxyAdmin" | "initialize" | "isAllowed" | "maxDataSize" | "pause" | "sendContractTransaction" | "sendL2Message" | "sendL2MessageFromOrigin" | "sendUnsignedTransaction" | "sequencerInbox" | "setAllowList" | "setAllowListEnabled" | "unpause"): FunctionFragment;
	getEvent(nameOrSignatureOrTopic: "InboxMessageDelivered" | "InboxMessageDeliveredFromOrigin"): EventFragment;
	encodeFunctionData(functionFragment: "allowListEnabled", values?: undefined): string;
	encodeFunctionData(functionFragment: "bridge", values?: undefined): string;
	encodeFunctionData(functionFragment: "calculateRetryableSubmissionFee", values: [
		BigNumberish,
		BigNumberish
	]): string;
	encodeFunctionData(functionFragment: "getProxyAdmin", values?: undefined): string;
	encodeFunctionData(functionFragment: "initialize", values: [
		AddressLike,
		AddressLike
	]): string;
	encodeFunctionData(functionFragment: "isAllowed", values: [
		AddressLike
	]): string;
	encodeFunctionData(functionFragment: "maxDataSize", values?: undefined): string;
	encodeFunctionData(functionFragment: "pause", values?: undefined): string;
	encodeFunctionData(functionFragment: "sendContractTransaction", values: [
		BigNumberish,
		BigNumberish,
		AddressLike,
		BigNumberish,
		BytesLike
	]): string;
	encodeFunctionData(functionFragment: "sendL2Message", values: [
		BytesLike
	]): string;
	encodeFunctionData(functionFragment: "sendL2MessageFromOrigin", values: [
		BytesLike
	]): string;
	encodeFunctionData(functionFragment: "sendUnsignedTransaction", values: [
		BigNumberish,
		BigNumberish,
		BigNumberish,
		AddressLike,
		BigNumberish,
		BytesLike
	]): string;
	encodeFunctionData(functionFragment: "sequencerInbox", values?: undefined): string;
	encodeFunctionData(functionFragment: "setAllowList", values: [
		AddressLike[],
		boolean[]
	]): string;
	encodeFunctionData(functionFragment: "setAllowListEnabled", values: [
		boolean
	]): string;
	encodeFunctionData(functionFragment: "unpause", values?: undefined): string;
	decodeFunctionResult(functionFragment: "allowListEnabled", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "bridge", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "calculateRetryableSubmissionFee", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "getProxyAdmin", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "initialize", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "isAllowed", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "maxDataSize", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "pause", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "sendContractTransaction", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "sendL2Message", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "sendL2MessageFromOrigin", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "sendUnsignedTransaction", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "sequencerInbox", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "setAllowList", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "setAllowListEnabled", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "unpause", data: BytesLike): Result;
}
declare namespace InboxMessageDeliveredEvent$2 {
	type InputTuple = [
		messageNum: BigNumberish,
		data: BytesLike
	];
	type OutputTuple = [
		messageNum: bigint,
		data: string
	];
	interface OutputObject {
		messageNum: bigint;
		data: string;
	}
	type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
	type Filter = TypedDeferredTopicFilter<Event>;
	type Log = TypedEventLog<Event>;
	type LogDescription = TypedLogDescription<Event>;
}
declare namespace InboxMessageDeliveredFromOriginEvent$2 {
	type InputTuple = [
		messageNum: BigNumberish
	];
	type OutputTuple = [
		messageNum: bigint
	];
	interface OutputObject {
		messageNum: bigint;
	}
	type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
	type Filter = TypedDeferredTopicFilter<Event>;
	type Log = TypedEventLog<Event>;
	type LogDescription = TypedLogDescription<Event>;
}
export interface IInboxBase extends BaseContract {
	connect(runner?: ContractRunner | null): IInboxBase;
	waitForDeployment(): Promise<this>;
	interface: IInboxBaseInterface;
	queryFilter<TCEvent extends TypedContractEvent>(event: TCEvent, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
	queryFilter<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
	on<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
	on<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
	once<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
	once<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
	listeners<TCEvent extends TypedContractEvent>(event: TCEvent): Promise<Array<TypedListener<TCEvent>>>;
	listeners(eventName?: string): Promise<Array<Listener>>;
	removeAllListeners<TCEvent extends TypedContractEvent>(event?: TCEvent): Promise<this>;
	allowListEnabled: TypedContractMethod<[
	], [
		boolean
	], "view">;
	bridge: TypedContractMethod<[
	], [
		string
	], "view">;
	calculateRetryableSubmissionFee: TypedContractMethod<[
		dataLength: BigNumberish,
		baseFee: BigNumberish
	], [
		bigint
	], "view">;
	getProxyAdmin: TypedContractMethod<[
	], [
		string
	], "view">;
	initialize: TypedContractMethod<[
		_bridge: AddressLike,
		_sequencerInbox: AddressLike
	], [
		void
	], "nonpayable">;
	isAllowed: TypedContractMethod<[
		user: AddressLike
	], [
		boolean
	], "view">;
	maxDataSize: TypedContractMethod<[
	], [
		bigint
	], "view">;
	pause: TypedContractMethod<[
	], [
		void
	], "nonpayable">;
	sendContractTransaction: TypedContractMethod<[
		gasLimit: BigNumberish,
		maxFeePerGas: BigNumberish,
		to: AddressLike,
		value: BigNumberish,
		data: BytesLike
	], [
		bigint
	], "nonpayable">;
	sendL2Message: TypedContractMethod<[
		messageData: BytesLike
	], [
		bigint
	], "nonpayable">;
	sendL2MessageFromOrigin: TypedContractMethod<[
		messageData: BytesLike
	], [
		bigint
	], "nonpayable">;
	sendUnsignedTransaction: TypedContractMethod<[
		gasLimit: BigNumberish,
		maxFeePerGas: BigNumberish,
		nonce: BigNumberish,
		to: AddressLike,
		value: BigNumberish,
		data: BytesLike
	], [
		bigint
	], "nonpayable">;
	sequencerInbox: TypedContractMethod<[
	], [
		string
	], "view">;
	setAllowList: TypedContractMethod<[
		user: AddressLike[],
		val: boolean[]
	], [
		void
	], "nonpayable">;
	setAllowListEnabled: TypedContractMethod<[
		_allowListEnabled: boolean
	], [
		void
	], "nonpayable">;
	unpause: TypedContractMethod<[
	], [
		void
	], "nonpayable">;
	getFunction<T extends ContractMethod = ContractMethod>(key: string | FunctionFragment): T;
	getFunction(nameOrSignature: "allowListEnabled"): TypedContractMethod<[
	], [
		boolean
	], "view">;
	getFunction(nameOrSignature: "bridge"): TypedContractMethod<[
	], [
		string
	], "view">;
	getFunction(nameOrSignature: "calculateRetryableSubmissionFee"): TypedContractMethod<[
		dataLength: BigNumberish,
		baseFee: BigNumberish
	], [
		bigint
	], "view">;
	getFunction(nameOrSignature: "getProxyAdmin"): TypedContractMethod<[
	], [
		string
	], "view">;
	getFunction(nameOrSignature: "initialize"): TypedContractMethod<[
		_bridge: AddressLike,
		_sequencerInbox: AddressLike
	], [
		void
	], "nonpayable">;
	getFunction(nameOrSignature: "isAllowed"): TypedContractMethod<[
		user: AddressLike
	], [
		boolean
	], "view">;
	getFunction(nameOrSignature: "maxDataSize"): TypedContractMethod<[
	], [
		bigint
	], "view">;
	getFunction(nameOrSignature: "pause"): TypedContractMethod<[
	], [
		void
	], "nonpayable">;
	getFunction(nameOrSignature: "sendContractTransaction"): TypedContractMethod<[
		gasLimit: BigNumberish,
		maxFeePerGas: BigNumberish,
		to: AddressLike,
		value: BigNumberish,
		data: BytesLike
	], [
		bigint
	], "nonpayable">;
	getFunction(nameOrSignature: "sendL2Message"): TypedContractMethod<[
		messageData: BytesLike
	], [
		bigint
	], "nonpayable">;
	getFunction(nameOrSignature: "sendL2MessageFromOrigin"): TypedContractMethod<[
		messageData: BytesLike
	], [
		bigint
	], "nonpayable">;
	getFunction(nameOrSignature: "sendUnsignedTransaction"): TypedContractMethod<[
		gasLimit: BigNumberish,
		maxFeePerGas: BigNumberish,
		nonce: BigNumberish,
		to: AddressLike,
		value: BigNumberish,
		data: BytesLike
	], [
		bigint
	], "nonpayable">;
	getFunction(nameOrSignature: "sequencerInbox"): TypedContractMethod<[
	], [
		string
	], "view">;
	getFunction(nameOrSignature: "setAllowList"): TypedContractMethod<[
		user: AddressLike[],
		val: boolean[]
	], [
		void
	], "nonpayable">;
	getFunction(nameOrSignature: "setAllowListEnabled"): TypedContractMethod<[
		_allowListEnabled: boolean
	], [
		void
	], "nonpayable">;
	getFunction(nameOrSignature: "unpause"): TypedContractMethod<[
	], [
		void
	], "nonpayable">;
	getEvent(key: "InboxMessageDelivered"): TypedContractEvent<InboxMessageDeliveredEvent$2.InputTuple, InboxMessageDeliveredEvent$2.OutputTuple, InboxMessageDeliveredEvent$2.OutputObject>;
	getEvent(key: "InboxMessageDeliveredFromOrigin"): TypedContractEvent<InboxMessageDeliveredFromOriginEvent$2.InputTuple, InboxMessageDeliveredFromOriginEvent$2.OutputTuple, InboxMessageDeliveredFromOriginEvent$2.OutputObject>;
	filters: {
		"InboxMessageDelivered(uint256,bytes)": TypedContractEvent<InboxMessageDeliveredEvent$2.InputTuple, InboxMessageDeliveredEvent$2.OutputTuple, InboxMessageDeliveredEvent$2.OutputObject>;
		InboxMessageDelivered: TypedContractEvent<InboxMessageDeliveredEvent$2.InputTuple, InboxMessageDeliveredEvent$2.OutputTuple, InboxMessageDeliveredEvent$2.OutputObject>;
		"InboxMessageDeliveredFromOrigin(uint256)": TypedContractEvent<InboxMessageDeliveredFromOriginEvent$2.InputTuple, InboxMessageDeliveredFromOriginEvent$2.OutputTuple, InboxMessageDeliveredFromOriginEvent$2.OutputObject>;
		InboxMessageDeliveredFromOrigin: TypedContractEvent<InboxMessageDeliveredFromOriginEvent$2.InputTuple, InboxMessageDeliveredFromOriginEvent$2.OutputTuple, InboxMessageDeliveredFromOriginEvent$2.OutputObject>;
	};
}
export interface IOutboxInterface extends Interface {
	getFunction(nameOrSignature: "OUTBOX_VERSION" | "bridge" | "calculateItemHash" | "calculateMerkleRoot" | "executeTransaction" | "executeTransactionSimulation" | "initialize" | "isSpent" | "l2ToL1Block" | "l2ToL1EthBlock" | "l2ToL1OutputId" | "l2ToL1Sender" | "l2ToL1Timestamp" | "postUpgradeInit" | "rollup" | "roots" | "spent" | "updateRollupAddress" | "updateSendRoot"): FunctionFragment;
	getEvent(nameOrSignatureOrTopic: "OutBoxTransactionExecuted" | "SendRootUpdated"): EventFragment;
	encodeFunctionData(functionFragment: "OUTBOX_VERSION", values?: undefined): string;
	encodeFunctionData(functionFragment: "bridge", values?: undefined): string;
	encodeFunctionData(functionFragment: "calculateItemHash", values: [
		AddressLike,
		AddressLike,
		BigNumberish,
		BigNumberish,
		BigNumberish,
		BigNumberish,
		BytesLike
	]): string;
	encodeFunctionData(functionFragment: "calculateMerkleRoot", values: [
		BytesLike[],
		BigNumberish,
		BytesLike
	]): string;
	encodeFunctionData(functionFragment: "executeTransaction", values: [
		BytesLike[],
		BigNumberish,
		AddressLike,
		AddressLike,
		BigNumberish,
		BigNumberish,
		BigNumberish,
		BigNumberish,
		BytesLike
	]): string;
	encodeFunctionData(functionFragment: "executeTransactionSimulation", values: [
		BigNumberish,
		AddressLike,
		AddressLike,
		BigNumberish,
		BigNumberish,
		BigNumberish,
		BigNumberish,
		BytesLike
	]): string;
	encodeFunctionData(functionFragment: "initialize", values: [
		AddressLike
	]): string;
	encodeFunctionData(functionFragment: "isSpent", values: [
		BigNumberish
	]): string;
	encodeFunctionData(functionFragment: "l2ToL1Block", values?: undefined): string;
	encodeFunctionData(functionFragment: "l2ToL1EthBlock", values?: undefined): string;
	encodeFunctionData(functionFragment: "l2ToL1OutputId", values?: undefined): string;
	encodeFunctionData(functionFragment: "l2ToL1Sender", values?: undefined): string;
	encodeFunctionData(functionFragment: "l2ToL1Timestamp", values?: undefined): string;
	encodeFunctionData(functionFragment: "postUpgradeInit", values?: undefined): string;
	encodeFunctionData(functionFragment: "rollup", values?: undefined): string;
	encodeFunctionData(functionFragment: "roots", values: [
		BytesLike
	]): string;
	encodeFunctionData(functionFragment: "spent", values: [
		BigNumberish
	]): string;
	encodeFunctionData(functionFragment: "updateRollupAddress", values?: undefined): string;
	encodeFunctionData(functionFragment: "updateSendRoot", values: [
		BytesLike,
		BytesLike
	]): string;
	decodeFunctionResult(functionFragment: "OUTBOX_VERSION", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "bridge", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "calculateItemHash", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "calculateMerkleRoot", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "executeTransaction", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "executeTransactionSimulation", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "initialize", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "isSpent", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "l2ToL1Block", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "l2ToL1EthBlock", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "l2ToL1OutputId", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "l2ToL1Sender", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "l2ToL1Timestamp", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "postUpgradeInit", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "rollup", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "roots", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "spent", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "updateRollupAddress", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "updateSendRoot", data: BytesLike): Result;
}
declare namespace OutBoxTransactionExecutedEvent$1 {
	type InputTuple = [
		to: AddressLike,
		l2Sender: AddressLike,
		zero: BigNumberish,
		transactionIndex: BigNumberish
	];
	type OutputTuple = [
		to: string,
		l2Sender: string,
		zero: bigint,
		transactionIndex: bigint
	];
	interface OutputObject {
		to: string;
		l2Sender: string;
		zero: bigint;
		transactionIndex: bigint;
	}
	type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
	type Filter = TypedDeferredTopicFilter<Event>;
	type Log = TypedEventLog<Event>;
	type LogDescription = TypedLogDescription<Event>;
}
declare namespace SendRootUpdatedEvent$1 {
	type InputTuple = [
		outputRoot: BytesLike,
		l2BlockHash: BytesLike
	];
	type OutputTuple = [
		outputRoot: string,
		l2BlockHash: string
	];
	interface OutputObject {
		outputRoot: string;
		l2BlockHash: string;
	}
	type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
	type Filter = TypedDeferredTopicFilter<Event>;
	type Log = TypedEventLog<Event>;
	type LogDescription = TypedLogDescription<Event>;
}
export interface IOutbox extends BaseContract {
	connect(runner?: ContractRunner | null): IOutbox;
	waitForDeployment(): Promise<this>;
	interface: IOutboxInterface;
	queryFilter<TCEvent extends TypedContractEvent>(event: TCEvent, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
	queryFilter<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
	on<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
	on<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
	once<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
	once<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
	listeners<TCEvent extends TypedContractEvent>(event: TCEvent): Promise<Array<TypedListener<TCEvent>>>;
	listeners(eventName?: string): Promise<Array<Listener>>;
	removeAllListeners<TCEvent extends TypedContractEvent>(event?: TCEvent): Promise<this>;
	OUTBOX_VERSION: TypedContractMethod<[
	], [
		bigint
	], "view">;
	bridge: TypedContractMethod<[
	], [
		string
	], "view">;
	calculateItemHash: TypedContractMethod<[
		l2Sender: AddressLike,
		to: AddressLike,
		l2Block: BigNumberish,
		l1Block: BigNumberish,
		l2Timestamp: BigNumberish,
		value: BigNumberish,
		data: BytesLike
	], [
		string
	], "view">;
	calculateMerkleRoot: TypedContractMethod<[
		proof: BytesLike[],
		path: BigNumberish,
		item: BytesLike
	], [
		string
	], "view">;
	executeTransaction: TypedContractMethod<[
		proof: BytesLike[],
		index: BigNumberish,
		l2Sender: AddressLike,
		to: AddressLike,
		l2Block: BigNumberish,
		l1Block: BigNumberish,
		l2Timestamp: BigNumberish,
		value: BigNumberish,
		data: BytesLike
	], [
		void
	], "nonpayable">;
	executeTransactionSimulation: TypedContractMethod<[
		index: BigNumberish,
		l2Sender: AddressLike,
		to: AddressLike,
		l2Block: BigNumberish,
		l1Block: BigNumberish,
		l2Timestamp: BigNumberish,
		value: BigNumberish,
		data: BytesLike
	], [
		void
	], "nonpayable">;
	initialize: TypedContractMethod<[
		_bridge: AddressLike
	], [
		void
	], "nonpayable">;
	isSpent: TypedContractMethod<[
		index: BigNumberish
	], [
		boolean
	], "view">;
	l2ToL1Block: TypedContractMethod<[
	], [
		bigint
	], "view">;
	l2ToL1EthBlock: TypedContractMethod<[
	], [
		bigint
	], "view">;
	l2ToL1OutputId: TypedContractMethod<[
	], [
		string
	], "view">;
	l2ToL1Sender: TypedContractMethod<[
	], [
		string
	], "view">;
	l2ToL1Timestamp: TypedContractMethod<[
	], [
		bigint
	], "view">;
	postUpgradeInit: TypedContractMethod<[
	], [
		void
	], "nonpayable">;
	rollup: TypedContractMethod<[
	], [
		string
	], "view">;
	roots: TypedContractMethod<[
		arg0: BytesLike
	], [
		string
	], "view">;
	spent: TypedContractMethod<[
		arg0: BigNumberish
	], [
		string
	], "view">;
	updateRollupAddress: TypedContractMethod<[
	], [
		void
	], "nonpayable">;
	updateSendRoot: TypedContractMethod<[
		sendRoot: BytesLike,
		l2BlockHash: BytesLike
	], [
		void
	], "nonpayable">;
	getFunction<T extends ContractMethod = ContractMethod>(key: string | FunctionFragment): T;
	getFunction(nameOrSignature: "OUTBOX_VERSION"): TypedContractMethod<[
	], [
		bigint
	], "view">;
	getFunction(nameOrSignature: "bridge"): TypedContractMethod<[
	], [
		string
	], "view">;
	getFunction(nameOrSignature: "calculateItemHash"): TypedContractMethod<[
		l2Sender: AddressLike,
		to: AddressLike,
		l2Block: BigNumberish,
		l1Block: BigNumberish,
		l2Timestamp: BigNumberish,
		value: BigNumberish,
		data: BytesLike
	], [
		string
	], "view">;
	getFunction(nameOrSignature: "calculateMerkleRoot"): TypedContractMethod<[
		proof: BytesLike[],
		path: BigNumberish,
		item: BytesLike
	], [
		string
	], "view">;
	getFunction(nameOrSignature: "executeTransaction"): TypedContractMethod<[
		proof: BytesLike[],
		index: BigNumberish,
		l2Sender: AddressLike,
		to: AddressLike,
		l2Block: BigNumberish,
		l1Block: BigNumberish,
		l2Timestamp: BigNumberish,
		value: BigNumberish,
		data: BytesLike
	], [
		void
	], "nonpayable">;
	getFunction(nameOrSignature: "executeTransactionSimulation"): TypedContractMethod<[
		index: BigNumberish,
		l2Sender: AddressLike,
		to: AddressLike,
		l2Block: BigNumberish,
		l1Block: BigNumberish,
		l2Timestamp: BigNumberish,
		value: BigNumberish,
		data: BytesLike
	], [
		void
	], "nonpayable">;
	getFunction(nameOrSignature: "initialize"): TypedContractMethod<[
		_bridge: AddressLike
	], [
		void
	], "nonpayable">;
	getFunction(nameOrSignature: "isSpent"): TypedContractMethod<[
		index: BigNumberish
	], [
		boolean
	], "view">;
	getFunction(nameOrSignature: "l2ToL1Block"): TypedContractMethod<[
	], [
		bigint
	], "view">;
	getFunction(nameOrSignature: "l2ToL1EthBlock"): TypedContractMethod<[
	], [
		bigint
	], "view">;
	getFunction(nameOrSignature: "l2ToL1OutputId"): TypedContractMethod<[
	], [
		string
	], "view">;
	getFunction(nameOrSignature: "l2ToL1Sender"): TypedContractMethod<[
	], [
		string
	], "view">;
	getFunction(nameOrSignature: "l2ToL1Timestamp"): TypedContractMethod<[
	], [
		bigint
	], "view">;
	getFunction(nameOrSignature: "postUpgradeInit"): TypedContractMethod<[
	], [
		void
	], "nonpayable">;
	getFunction(nameOrSignature: "rollup"): TypedContractMethod<[
	], [
		string
	], "view">;
	getFunction(nameOrSignature: "roots"): TypedContractMethod<[
		arg0: BytesLike
	], [
		string
	], "view">;
	getFunction(nameOrSignature: "spent"): TypedContractMethod<[
		arg0: BigNumberish
	], [
		string
	], "view">;
	getFunction(nameOrSignature: "updateRollupAddress"): TypedContractMethod<[
	], [
		void
	], "nonpayable">;
	getFunction(nameOrSignature: "updateSendRoot"): TypedContractMethod<[
		sendRoot: BytesLike,
		l2BlockHash: BytesLike
	], [
		void
	], "nonpayable">;
	getEvent(key: "OutBoxTransactionExecuted"): TypedContractEvent<OutBoxTransactionExecutedEvent$1.InputTuple, OutBoxTransactionExecutedEvent$1.OutputTuple, OutBoxTransactionExecutedEvent$1.OutputObject>;
	getEvent(key: "SendRootUpdated"): TypedContractEvent<SendRootUpdatedEvent$1.InputTuple, SendRootUpdatedEvent$1.OutputTuple, SendRootUpdatedEvent$1.OutputObject>;
	filters: {
		"OutBoxTransactionExecuted(address,address,uint256,uint256)": TypedContractEvent<OutBoxTransactionExecutedEvent$1.InputTuple, OutBoxTransactionExecutedEvent$1.OutputTuple, OutBoxTransactionExecutedEvent$1.OutputObject>;
		OutBoxTransactionExecuted: TypedContractEvent<OutBoxTransactionExecutedEvent$1.InputTuple, OutBoxTransactionExecutedEvent$1.OutputTuple, OutBoxTransactionExecutedEvent$1.OutputObject>;
		"SendRootUpdated(bytes32,bytes32)": TypedContractEvent<SendRootUpdatedEvent$1.InputTuple, SendRootUpdatedEvent$1.OutputTuple, SendRootUpdatedEvent$1.OutputObject>;
		SendRootUpdated: TypedContractEvent<SendRootUpdatedEvent$1.InputTuple, SendRootUpdatedEvent$1.OutputTuple, SendRootUpdatedEvent$1.OutputObject>;
	};
}
export interface IOwnableInterface extends Interface {
	getFunction(nameOrSignature: "owner"): FunctionFragment;
	encodeFunctionData(functionFragment: "owner", values?: undefined): string;
	decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
}
export interface IOwnable extends BaseContract {
	connect(runner?: ContractRunner | null): IOwnable;
	waitForDeployment(): Promise<this>;
	interface: IOwnableInterface;
	queryFilter<TCEvent extends TypedContractEvent>(event: TCEvent, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
	queryFilter<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
	on<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
	on<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
	once<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
	once<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
	listeners<TCEvent extends TypedContractEvent>(event: TCEvent): Promise<Array<TypedListener<TCEvent>>>;
	listeners(eventName?: string): Promise<Array<Listener>>;
	removeAllListeners<TCEvent extends TypedContractEvent>(event?: TCEvent): Promise<this>;
	owner: TypedContractMethod<[
	], [
		string
	], "view">;
	getFunction<T extends ContractMethod = ContractMethod>(key: string | FunctionFragment): T;
	getFunction(nameOrSignature: "owner"): TypedContractMethod<[
	], [
		string
	], "view">;
	filters: {};
}
export interface IFeeTokenPricerInterface extends Interface {
	getFunction(nameOrSignature: "getExchangeRate"): FunctionFragment;
	encodeFunctionData(functionFragment: "getExchangeRate", values?: undefined): string;
	decodeFunctionResult(functionFragment: "getExchangeRate", data: BytesLike): Result;
}
export interface IFeeTokenPricer extends BaseContract {
	connect(runner?: ContractRunner | null): IFeeTokenPricer;
	waitForDeployment(): Promise<this>;
	interface: IFeeTokenPricerInterface;
	queryFilter<TCEvent extends TypedContractEvent>(event: TCEvent, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
	queryFilter<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
	on<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
	on<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
	once<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
	once<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
	listeners<TCEvent extends TypedContractEvent>(event: TCEvent): Promise<Array<TypedListener<TCEvent>>>;
	listeners(eventName?: string): Promise<Array<Listener>>;
	removeAllListeners<TCEvent extends TypedContractEvent>(event?: TCEvent): Promise<this>;
	getExchangeRate: TypedContractMethod<[
	], [
		bigint
	], "nonpayable">;
	getFunction<T extends ContractMethod = ContractMethod>(key: string | FunctionFragment): T;
	getFunction(nameOrSignature: "getExchangeRate"): TypedContractMethod<[
	], [
		bigint
	], "nonpayable">;
	filters: {};
}
export type BufferConfigStruct = {
	threshold: BigNumberish;
	max: BigNumberish;
	replenishRateInBasis: BigNumberish;
};
export type BufferConfigStructOutput = [
	threshold: bigint,
	max: bigint,
	replenishRateInBasis: bigint
] & {
	threshold: bigint;
	max: bigint;
	replenishRateInBasis: bigint;
};
export type DelayProofStruct = {
	beforeDelayedAcc: BytesLike;
	delayedMessage: Messages.MessageStruct;
};
export declare namespace ISequencerInbox {
	type MaxTimeVariationStruct = {
		delayBlocks: BigNumberish;
		futureBlocks: BigNumberish;
		delaySeconds: BigNumberish;
		futureSeconds: BigNumberish;
	};
	type MaxTimeVariationStructOutput = [
		delayBlocks: bigint,
		futureBlocks: bigint,
		delaySeconds: bigint,
		futureSeconds: bigint
	] & {
		delayBlocks: bigint;
		futureBlocks: bigint;
		delaySeconds: bigint;
		futureSeconds: bigint;
	};
}
declare namespace IBridge$1 {
	type TimeBoundsStruct = {
		minTimestamp: BigNumberish;
		maxTimestamp: BigNumberish;
		minBlockNumber: BigNumberish;
		maxBlockNumber: BigNumberish;
	};
	type TimeBoundsStructOutput = [
		minTimestamp: bigint,
		maxTimestamp: bigint,
		minBlockNumber: bigint,
		maxBlockNumber: bigint
	] & {
		minTimestamp: bigint;
		maxTimestamp: bigint;
		minBlockNumber: bigint;
		maxBlockNumber: bigint;
	};
}
declare namespace Messages {
	type MessageStruct = {
		kind: BigNumberish;
		sender: AddressLike;
		blockNumber: BigNumberish;
		timestamp: BigNumberish;
		inboxSeqNum: BigNumberish;
		baseFeeL1: BigNumberish;
		messageDataHash: BytesLike;
	};
	type MessageStructOutput = [
		kind: bigint,
		sender: string,
		blockNumber: bigint,
		timestamp: bigint,
		inboxSeqNum: bigint,
		baseFeeL1: bigint,
		messageDataHash: string
	] & {
		kind: bigint;
		sender: string;
		blockNumber: bigint;
		timestamp: bigint;
		inboxSeqNum: bigint;
		baseFeeL1: bigint;
		messageDataHash: string;
	};
}
export interface ISequencerInboxInterface extends Interface {
	getFunction(nameOrSignature: "BROTLI_MESSAGE_HEADER_FLAG" | "DAS_MESSAGE_HEADER_FLAG" | "DATA_AUTHENTICATED_FLAG" | "DATA_BLOB_HEADER_FLAG" | "HEADER_LENGTH" | "TREE_DAS_MESSAGE_HEADER_FLAG" | "ZERO_HEAVY_MESSAGE_HEADER_FLAG" | "addSequencerL2Batch" | "addSequencerL2BatchDelayProof" | "addSequencerL2BatchFromBlobs" | "addSequencerL2BatchFromBlobsDelayProof" | "addSequencerL2BatchFromOrigin(uint256,bytes,uint256,address)" | "addSequencerL2BatchFromOrigin(uint256,bytes,uint256,address,uint256,uint256)" | "addSequencerL2BatchFromOriginDelayProof" | "batchCount" | "batchPosterManager" | "bridge" | "dasKeySetInfo" | "feeTokenPricer" | "forceInclusion" | "forceInclusionDeadline" | "getKeysetCreationBlock" | "inboxAccs" | "initialize" | "invalidateKeysetHash" | "isBatchPoster" | "isDelayBufferable" | "isSequencer" | "isValidKeysetHash" | "maxDataSize" | "maxTimeVariation" | "removeDelayAfterFork" | "rollup" | "setBatchPosterManager" | "setFeeTokenPricer" | "setIsBatchPoster" | "setIsSequencer" | "setMaxTimeVariation" | "setValidKeyset" | "totalDelayedMessagesRead" | "updateRollupAddress"): FunctionFragment;
	getEvent(nameOrSignatureOrTopic: "BatchPosterManagerSet" | "BatchPosterSet" | "BufferConfigSet" | "FeeTokenPricerSet" | "InboxMessageDelivered" | "InboxMessageDeliveredFromOrigin" | "InvalidateKeyset" | "MaxTimeVariationSet" | "OwnerFunctionCalled" | "SequencerBatchData" | "SequencerBatchDelivered" | "SequencerSet" | "SetValidKeyset"): EventFragment;
	encodeFunctionData(functionFragment: "BROTLI_MESSAGE_HEADER_FLAG", values?: undefined): string;
	encodeFunctionData(functionFragment: "DAS_MESSAGE_HEADER_FLAG", values?: undefined): string;
	encodeFunctionData(functionFragment: "DATA_AUTHENTICATED_FLAG", values?: undefined): string;
	encodeFunctionData(functionFragment: "DATA_BLOB_HEADER_FLAG", values?: undefined): string;
	encodeFunctionData(functionFragment: "HEADER_LENGTH", values?: undefined): string;
	encodeFunctionData(functionFragment: "TREE_DAS_MESSAGE_HEADER_FLAG", values?: undefined): string;
	encodeFunctionData(functionFragment: "ZERO_HEAVY_MESSAGE_HEADER_FLAG", values?: undefined): string;
	encodeFunctionData(functionFragment: "addSequencerL2Batch", values: [
		BigNumberish,
		BytesLike,
		BigNumberish,
		AddressLike,
		BigNumberish,
		BigNumberish
	]): string;
	encodeFunctionData(functionFragment: "addSequencerL2BatchDelayProof", values: [
		BigNumberish,
		BytesLike,
		BigNumberish,
		AddressLike,
		BigNumberish,
		BigNumberish,
		DelayProofStruct
	]): string;
	encodeFunctionData(functionFragment: "addSequencerL2BatchFromBlobs", values: [
		BigNumberish,
		BigNumberish,
		AddressLike,
		BigNumberish,
		BigNumberish
	]): string;
	encodeFunctionData(functionFragment: "addSequencerL2BatchFromBlobsDelayProof", values: [
		BigNumberish,
		BigNumberish,
		AddressLike,
		BigNumberish,
		BigNumberish,
		DelayProofStruct
	]): string;
	encodeFunctionData(functionFragment: "addSequencerL2BatchFromOrigin(uint256,bytes,uint256,address)", values: [
		BigNumberish,
		BytesLike,
		BigNumberish,
		AddressLike
	]): string;
	encodeFunctionData(functionFragment: "addSequencerL2BatchFromOrigin(uint256,bytes,uint256,address,uint256,uint256)", values: [
		BigNumberish,
		BytesLike,
		BigNumberish,
		AddressLike,
		BigNumberish,
		BigNumberish
	]): string;
	encodeFunctionData(functionFragment: "addSequencerL2BatchFromOriginDelayProof", values: [
		BigNumberish,
		BytesLike,
		BigNumberish,
		AddressLike,
		BigNumberish,
		BigNumberish,
		DelayProofStruct
	]): string;
	encodeFunctionData(functionFragment: "batchCount", values?: undefined): string;
	encodeFunctionData(functionFragment: "batchPosterManager", values?: undefined): string;
	encodeFunctionData(functionFragment: "bridge", values?: undefined): string;
	encodeFunctionData(functionFragment: "dasKeySetInfo", values: [
		BytesLike
	]): string;
	encodeFunctionData(functionFragment: "feeTokenPricer", values?: undefined): string;
	encodeFunctionData(functionFragment: "forceInclusion", values: [
		BigNumberish,
		BigNumberish,
		[
			BigNumberish,
			BigNumberish
		],
		BigNumberish,
		AddressLike,
		BytesLike
	]): string;
	encodeFunctionData(functionFragment: "forceInclusionDeadline", values: [
		BigNumberish
	]): string;
	encodeFunctionData(functionFragment: "getKeysetCreationBlock", values: [
		BytesLike
	]): string;
	encodeFunctionData(functionFragment: "inboxAccs", values: [
		BigNumberish
	]): string;
	encodeFunctionData(functionFragment: "initialize", values: [
		AddressLike,
		ISequencerInbox.MaxTimeVariationStruct,
		BufferConfigStruct,
		AddressLike
	]): string;
	encodeFunctionData(functionFragment: "invalidateKeysetHash", values: [
		BytesLike
	]): string;
	encodeFunctionData(functionFragment: "isBatchPoster", values: [
		AddressLike
	]): string;
	encodeFunctionData(functionFragment: "isDelayBufferable", values?: undefined): string;
	encodeFunctionData(functionFragment: "isSequencer", values: [
		AddressLike
	]): string;
	encodeFunctionData(functionFragment: "isValidKeysetHash", values: [
		BytesLike
	]): string;
	encodeFunctionData(functionFragment: "maxDataSize", values?: undefined): string;
	encodeFunctionData(functionFragment: "maxTimeVariation", values?: undefined): string;
	encodeFunctionData(functionFragment: "removeDelayAfterFork", values?: undefined): string;
	encodeFunctionData(functionFragment: "rollup", values?: undefined): string;
	encodeFunctionData(functionFragment: "setBatchPosterManager", values: [
		AddressLike
	]): string;
	encodeFunctionData(functionFragment: "setFeeTokenPricer", values: [
		AddressLike
	]): string;
	encodeFunctionData(functionFragment: "setIsBatchPoster", values: [
		AddressLike,
		boolean
	]): string;
	encodeFunctionData(functionFragment: "setIsSequencer", values: [
		AddressLike,
		boolean
	]): string;
	encodeFunctionData(functionFragment: "setMaxTimeVariation", values: [
		ISequencerInbox.MaxTimeVariationStruct
	]): string;
	encodeFunctionData(functionFragment: "setValidKeyset", values: [
		BytesLike
	]): string;
	encodeFunctionData(functionFragment: "totalDelayedMessagesRead", values?: undefined): string;
	encodeFunctionData(functionFragment: "updateRollupAddress", values?: undefined): string;
	decodeFunctionResult(functionFragment: "BROTLI_MESSAGE_HEADER_FLAG", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "DAS_MESSAGE_HEADER_FLAG", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "DATA_AUTHENTICATED_FLAG", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "DATA_BLOB_HEADER_FLAG", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "HEADER_LENGTH", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "TREE_DAS_MESSAGE_HEADER_FLAG", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "ZERO_HEAVY_MESSAGE_HEADER_FLAG", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "addSequencerL2Batch", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "addSequencerL2BatchDelayProof", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "addSequencerL2BatchFromBlobs", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "addSequencerL2BatchFromBlobsDelayProof", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "addSequencerL2BatchFromOrigin(uint256,bytes,uint256,address)", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "addSequencerL2BatchFromOrigin(uint256,bytes,uint256,address,uint256,uint256)", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "addSequencerL2BatchFromOriginDelayProof", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "batchCount", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "batchPosterManager", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "bridge", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "dasKeySetInfo", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "feeTokenPricer", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "forceInclusion", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "forceInclusionDeadline", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "getKeysetCreationBlock", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "inboxAccs", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "initialize", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "invalidateKeysetHash", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "isBatchPoster", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "isDelayBufferable", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "isSequencer", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "isValidKeysetHash", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "maxDataSize", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "maxTimeVariation", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "removeDelayAfterFork", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "rollup", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "setBatchPosterManager", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "setFeeTokenPricer", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "setIsBatchPoster", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "setIsSequencer", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "setMaxTimeVariation", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "setValidKeyset", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "totalDelayedMessagesRead", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "updateRollupAddress", data: BytesLike): Result;
}
declare namespace BatchPosterManagerSetEvent {
	type InputTuple = [
		newBatchPosterManager: AddressLike
	];
	type OutputTuple = [
		newBatchPosterManager: string
	];
	interface OutputObject {
		newBatchPosterManager: string;
	}
	type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
	type Filter = TypedDeferredTopicFilter<Event>;
	type Log = TypedEventLog<Event>;
	type LogDescription = TypedLogDescription<Event>;
}
declare namespace BatchPosterSetEvent {
	type InputTuple = [
		batchPoster: AddressLike,
		isBatchPoster: boolean
	];
	type OutputTuple = [
		batchPoster: string,
		isBatchPoster: boolean
	];
	interface OutputObject {
		batchPoster: string;
		isBatchPoster: boolean;
	}
	type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
	type Filter = TypedDeferredTopicFilter<Event>;
	type Log = TypedEventLog<Event>;
	type LogDescription = TypedLogDescription<Event>;
}
declare namespace BufferConfigSetEvent {
	type InputTuple = [
		bufferConfig: BufferConfigStruct
	];
	type OutputTuple = [
		bufferConfig: BufferConfigStructOutput
	];
	interface OutputObject {
		bufferConfig: BufferConfigStructOutput;
	}
	type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
	type Filter = TypedDeferredTopicFilter<Event>;
	type Log = TypedEventLog<Event>;
	type LogDescription = TypedLogDescription<Event>;
}
declare namespace FeeTokenPricerSetEvent {
	type InputTuple = [
		feeTokenPricer: AddressLike
	];
	type OutputTuple = [
		feeTokenPricer: string
	];
	interface OutputObject {
		feeTokenPricer: string;
	}
	type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
	type Filter = TypedDeferredTopicFilter<Event>;
	type Log = TypedEventLog<Event>;
	type LogDescription = TypedLogDescription<Event>;
}
declare namespace InboxMessageDeliveredEvent$3 {
	type InputTuple = [
		messageNum: BigNumberish,
		data: BytesLike
	];
	type OutputTuple = [
		messageNum: bigint,
		data: string
	];
	interface OutputObject {
		messageNum: bigint;
		data: string;
	}
	type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
	type Filter = TypedDeferredTopicFilter<Event>;
	type Log = TypedEventLog<Event>;
	type LogDescription = TypedLogDescription<Event>;
}
declare namespace InboxMessageDeliveredFromOriginEvent$3 {
	type InputTuple = [
		messageNum: BigNumberish
	];
	type OutputTuple = [
		messageNum: bigint
	];
	interface OutputObject {
		messageNum: bigint;
	}
	type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
	type Filter = TypedDeferredTopicFilter<Event>;
	type Log = TypedEventLog<Event>;
	type LogDescription = TypedLogDescription<Event>;
}
declare namespace InvalidateKeysetEvent {
	type InputTuple = [
		keysetHash: BytesLike
	];
	type OutputTuple = [
		keysetHash: string
	];
	interface OutputObject {
		keysetHash: string;
	}
	type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
	type Filter = TypedDeferredTopicFilter<Event>;
	type Log = TypedEventLog<Event>;
	type LogDescription = TypedLogDescription<Event>;
}
declare namespace MaxTimeVariationSetEvent {
	type InputTuple = [
		maxTimeVariation: ISequencerInbox.MaxTimeVariationStruct
	];
	type OutputTuple = [
		maxTimeVariation: ISequencerInbox.MaxTimeVariationStructOutput
	];
	interface OutputObject {
		maxTimeVariation: ISequencerInbox.MaxTimeVariationStructOutput;
	}
	type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
	type Filter = TypedDeferredTopicFilter<Event>;
	type Log = TypedEventLog<Event>;
	type LogDescription = TypedLogDescription<Event>;
}
declare namespace OwnerFunctionCalledEvent {
	type InputTuple = [
		id: BigNumberish
	];
	type OutputTuple = [
		id: bigint
	];
	interface OutputObject {
		id: bigint;
	}
	type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
	type Filter = TypedDeferredTopicFilter<Event>;
	type Log = TypedEventLog<Event>;
	type LogDescription = TypedLogDescription<Event>;
}
declare namespace SequencerBatchDataEvent {
	type InputTuple = [
		batchSequenceNumber: BigNumberish,
		data: BytesLike
	];
	type OutputTuple = [
		batchSequenceNumber: bigint,
		data: string
	];
	interface OutputObject {
		batchSequenceNumber: bigint;
		data: string;
	}
	type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
	type Filter = TypedDeferredTopicFilter<Event>;
	type Log = TypedEventLog<Event>;
	type LogDescription = TypedLogDescription<Event>;
}
declare namespace SequencerBatchDeliveredEvent {
	type InputTuple = [
		batchSequenceNumber: BigNumberish,
		beforeAcc: BytesLike,
		afterAcc: BytesLike,
		delayedAcc: BytesLike,
		afterDelayedMessagesRead: BigNumberish,
		timeBounds: IBridge$1.TimeBoundsStruct,
		dataLocation: BigNumberish
	];
	type OutputTuple = [
		batchSequenceNumber: bigint,
		beforeAcc: string,
		afterAcc: string,
		delayedAcc: string,
		afterDelayedMessagesRead: bigint,
		timeBounds: IBridge$1.TimeBoundsStructOutput,
		dataLocation: bigint
	];
	interface OutputObject {
		batchSequenceNumber: bigint;
		beforeAcc: string;
		afterAcc: string;
		delayedAcc: string;
		afterDelayedMessagesRead: bigint;
		timeBounds: IBridge$1.TimeBoundsStructOutput;
		dataLocation: bigint;
	}
	type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
	type Filter = TypedDeferredTopicFilter<Event>;
	type Log = TypedEventLog<Event>;
	type LogDescription = TypedLogDescription<Event>;
}
declare namespace SequencerSetEvent {
	type InputTuple = [
		addr: AddressLike,
		isSequencer: boolean
	];
	type OutputTuple = [
		addr: string,
		isSequencer: boolean
	];
	interface OutputObject {
		addr: string;
		isSequencer: boolean;
	}
	type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
	type Filter = TypedDeferredTopicFilter<Event>;
	type Log = TypedEventLog<Event>;
	type LogDescription = TypedLogDescription<Event>;
}
declare namespace SetValidKeysetEvent {
	type InputTuple = [
		keysetHash: BytesLike,
		keysetBytes: BytesLike
	];
	type OutputTuple = [
		keysetHash: string,
		keysetBytes: string
	];
	interface OutputObject {
		keysetHash: string;
		keysetBytes: string;
	}
	type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
	type Filter = TypedDeferredTopicFilter<Event>;
	type Log = TypedEventLog<Event>;
	type LogDescription = TypedLogDescription<Event>;
}
export interface ISequencerInbox extends BaseContract {
	connect(runner?: ContractRunner | null): ISequencerInbox;
	waitForDeployment(): Promise<this>;
	interface: ISequencerInboxInterface;
	queryFilter<TCEvent extends TypedContractEvent>(event: TCEvent, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
	queryFilter<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
	on<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
	on<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
	once<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
	once<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
	listeners<TCEvent extends TypedContractEvent>(event: TCEvent): Promise<Array<TypedListener<TCEvent>>>;
	listeners(eventName?: string): Promise<Array<Listener>>;
	removeAllListeners<TCEvent extends TypedContractEvent>(event?: TCEvent): Promise<this>;
	BROTLI_MESSAGE_HEADER_FLAG: TypedContractMethod<[
	], [
		string
	], "view">;
	DAS_MESSAGE_HEADER_FLAG: TypedContractMethod<[
	], [
		string
	], "view">;
	DATA_AUTHENTICATED_FLAG: TypedContractMethod<[
	], [
		string
	], "view">;
	DATA_BLOB_HEADER_FLAG: TypedContractMethod<[
	], [
		string
	], "view">;
	HEADER_LENGTH: TypedContractMethod<[
	], [
		bigint
	], "view">;
	TREE_DAS_MESSAGE_HEADER_FLAG: TypedContractMethod<[
	], [
		string
	], "view">;
	ZERO_HEAVY_MESSAGE_HEADER_FLAG: TypedContractMethod<[
	], [
		string
	], "view">;
	addSequencerL2Batch: TypedContractMethod<[
		sequenceNumber: BigNumberish,
		data: BytesLike,
		afterDelayedMessagesRead: BigNumberish,
		gasRefunder: AddressLike,
		prevMessageCount: BigNumberish,
		newMessageCount: BigNumberish
	], [
		void
	], "nonpayable">;
	addSequencerL2BatchDelayProof: TypedContractMethod<[
		sequenceNumber: BigNumberish,
		data: BytesLike,
		afterDelayedMessagesRead: BigNumberish,
		gasRefunder: AddressLike,
		prevMessageCount: BigNumberish,
		newMessageCount: BigNumberish,
		delayProof: DelayProofStruct
	], [
		void
	], "nonpayable">;
	addSequencerL2BatchFromBlobs: TypedContractMethod<[
		sequenceNumber: BigNumberish,
		afterDelayedMessagesRead: BigNumberish,
		gasRefunder: AddressLike,
		prevMessageCount: BigNumberish,
		newMessageCount: BigNumberish
	], [
		void
	], "nonpayable">;
	addSequencerL2BatchFromBlobsDelayProof: TypedContractMethod<[
		sequenceNumber: BigNumberish,
		afterDelayedMessagesRead: BigNumberish,
		gasRefunder: AddressLike,
		prevMessageCount: BigNumberish,
		newMessageCount: BigNumberish,
		delayProof: DelayProofStruct
	], [
		void
	], "nonpayable">;
	"addSequencerL2BatchFromOrigin(uint256,bytes,uint256,address)": TypedContractMethod<[
		sequenceNumber: BigNumberish,
		data: BytesLike,
		afterDelayedMessagesRead: BigNumberish,
		gasRefunder: AddressLike
	], [
		void
	], "nonpayable">;
	"addSequencerL2BatchFromOrigin(uint256,bytes,uint256,address,uint256,uint256)": TypedContractMethod<[
		sequenceNumber: BigNumberish,
		data: BytesLike,
		afterDelayedMessagesRead: BigNumberish,
		gasRefunder: AddressLike,
		prevMessageCount: BigNumberish,
		newMessageCount: BigNumberish
	], [
		void
	], "nonpayable">;
	addSequencerL2BatchFromOriginDelayProof: TypedContractMethod<[
		sequenceNumber: BigNumberish,
		data: BytesLike,
		afterDelayedMessagesRead: BigNumberish,
		gasRefunder: AddressLike,
		prevMessageCount: BigNumberish,
		newMessageCount: BigNumberish,
		delayProof: DelayProofStruct
	], [
		void
	], "nonpayable">;
	batchCount: TypedContractMethod<[
	], [
		bigint
	], "view">;
	batchPosterManager: TypedContractMethod<[
	], [
		string
	], "view">;
	bridge: TypedContractMethod<[
	], [
		string
	], "view">;
	dasKeySetInfo: TypedContractMethod<[
		arg0: BytesLike
	], [
		[
			boolean,
			bigint
		]
	], "view">;
	feeTokenPricer: TypedContractMethod<[
	], [
		string
	], "view">;
	forceInclusion: TypedContractMethod<[
		_totalDelayedMessagesRead: BigNumberish,
		kind: BigNumberish,
		l1BlockAndTime: [
			BigNumberish,
			BigNumberish
		],
		baseFeeL1: BigNumberish,
		sender: AddressLike,
		messageDataHash: BytesLike
	], [
		void
	], "nonpayable">;
	forceInclusionDeadline: TypedContractMethod<[
		blockNumber: BigNumberish
	], [
		bigint
	], "view">;
	getKeysetCreationBlock: TypedContractMethod<[
		ksHash: BytesLike
	], [
		bigint
	], "view">;
	inboxAccs: TypedContractMethod<[
		index: BigNumberish
	], [
		string
	], "view">;
	initialize: TypedContractMethod<[
		bridge_: AddressLike,
		maxTimeVariation_: ISequencerInbox.MaxTimeVariationStruct,
		bufferConfig_: BufferConfigStruct,
		feeTokenPricer_: AddressLike
	], [
		void
	], "nonpayable">;
	invalidateKeysetHash: TypedContractMethod<[
		ksHash: BytesLike
	], [
		void
	], "nonpayable">;
	isBatchPoster: TypedContractMethod<[
		arg0: AddressLike
	], [
		boolean
	], "view">;
	isDelayBufferable: TypedContractMethod<[
	], [
		boolean
	], "view">;
	isSequencer: TypedContractMethod<[
		arg0: AddressLike
	], [
		boolean
	], "view">;
	isValidKeysetHash: TypedContractMethod<[
		ksHash: BytesLike
	], [
		boolean
	], "view">;
	maxDataSize: TypedContractMethod<[
	], [
		bigint
	], "view">;
	maxTimeVariation: TypedContractMethod<[
	], [
		[
			bigint,
			bigint,
			bigint,
			bigint
		] & {
			delayBlocks: bigint;
			futureBlocks: bigint;
			delaySeconds: bigint;
			futureSeconds: bigint;
		}
	], "view">;
	removeDelayAfterFork: TypedContractMethod<[
	], [
		void
	], "nonpayable">;
	rollup: TypedContractMethod<[
	], [
		string
	], "view">;
	setBatchPosterManager: TypedContractMethod<[
		newBatchPosterManager: AddressLike
	], [
		void
	], "nonpayable">;
	setFeeTokenPricer: TypedContractMethod<[
		newFeeTokenPricer: AddressLike
	], [
		void
	], "nonpayable">;
	setIsBatchPoster: TypedContractMethod<[
		addr: AddressLike,
		isBatchPoster_: boolean
	], [
		void
	], "nonpayable">;
	setIsSequencer: TypedContractMethod<[
		addr: AddressLike,
		isSequencer_: boolean
	], [
		void
	], "nonpayable">;
	setMaxTimeVariation: TypedContractMethod<[
		maxTimeVariation_: ISequencerInbox.MaxTimeVariationStruct
	], [
		void
	], "nonpayable">;
	setValidKeyset: TypedContractMethod<[
		keysetBytes: BytesLike
	], [
		void
	], "nonpayable">;
	totalDelayedMessagesRead: TypedContractMethod<[
	], [
		bigint
	], "view">;
	updateRollupAddress: TypedContractMethod<[
	], [
		void
	], "nonpayable">;
	getFunction<T extends ContractMethod = ContractMethod>(key: string | FunctionFragment): T;
	getFunction(nameOrSignature: "BROTLI_MESSAGE_HEADER_FLAG"): TypedContractMethod<[
	], [
		string
	], "view">;
	getFunction(nameOrSignature: "DAS_MESSAGE_HEADER_FLAG"): TypedContractMethod<[
	], [
		string
	], "view">;
	getFunction(nameOrSignature: "DATA_AUTHENTICATED_FLAG"): TypedContractMethod<[
	], [
		string
	], "view">;
	getFunction(nameOrSignature: "DATA_BLOB_HEADER_FLAG"): TypedContractMethod<[
	], [
		string
	], "view">;
	getFunction(nameOrSignature: "HEADER_LENGTH"): TypedContractMethod<[
	], [
		bigint
	], "view">;
	getFunction(nameOrSignature: "TREE_DAS_MESSAGE_HEADER_FLAG"): TypedContractMethod<[
	], [
		string
	], "view">;
	getFunction(nameOrSignature: "ZERO_HEAVY_MESSAGE_HEADER_FLAG"): TypedContractMethod<[
	], [
		string
	], "view">;
	getFunction(nameOrSignature: "addSequencerL2Batch"): TypedContractMethod<[
		sequenceNumber: BigNumberish,
		data: BytesLike,
		afterDelayedMessagesRead: BigNumberish,
		gasRefunder: AddressLike,
		prevMessageCount: BigNumberish,
		newMessageCount: BigNumberish
	], [
		void
	], "nonpayable">;
	getFunction(nameOrSignature: "addSequencerL2BatchDelayProof"): TypedContractMethod<[
		sequenceNumber: BigNumberish,
		data: BytesLike,
		afterDelayedMessagesRead: BigNumberish,
		gasRefunder: AddressLike,
		prevMessageCount: BigNumberish,
		newMessageCount: BigNumberish,
		delayProof: DelayProofStruct
	], [
		void
	], "nonpayable">;
	getFunction(nameOrSignature: "addSequencerL2BatchFromBlobs"): TypedContractMethod<[
		sequenceNumber: BigNumberish,
		afterDelayedMessagesRead: BigNumberish,
		gasRefunder: AddressLike,
		prevMessageCount: BigNumberish,
		newMessageCount: BigNumberish
	], [
		void
	], "nonpayable">;
	getFunction(nameOrSignature: "addSequencerL2BatchFromBlobsDelayProof"): TypedContractMethod<[
		sequenceNumber: BigNumberish,
		afterDelayedMessagesRead: BigNumberish,
		gasRefunder: AddressLike,
		prevMessageCount: BigNumberish,
		newMessageCount: BigNumberish,
		delayProof: DelayProofStruct
	], [
		void
	], "nonpayable">;
	getFunction(nameOrSignature: "addSequencerL2BatchFromOrigin(uint256,bytes,uint256,address)"): TypedContractMethod<[
		sequenceNumber: BigNumberish,
		data: BytesLike,
		afterDelayedMessagesRead: BigNumberish,
		gasRefunder: AddressLike
	], [
		void
	], "nonpayable">;
	getFunction(nameOrSignature: "addSequencerL2BatchFromOrigin(uint256,bytes,uint256,address,uint256,uint256)"): TypedContractMethod<[
		sequenceNumber: BigNumberish,
		data: BytesLike,
		afterDelayedMessagesRead: BigNumberish,
		gasRefunder: AddressLike,
		prevMessageCount: BigNumberish,
		newMessageCount: BigNumberish
	], [
		void
	], "nonpayable">;
	getFunction(nameOrSignature: "addSequencerL2BatchFromOriginDelayProof"): TypedContractMethod<[
		sequenceNumber: BigNumberish,
		data: BytesLike,
		afterDelayedMessagesRead: BigNumberish,
		gasRefunder: AddressLike,
		prevMessageCount: BigNumberish,
		newMessageCount: BigNumberish,
		delayProof: DelayProofStruct
	], [
		void
	], "nonpayable">;
	getFunction(nameOrSignature: "batchCount"): TypedContractMethod<[
	], [
		bigint
	], "view">;
	getFunction(nameOrSignature: "batchPosterManager"): TypedContractMethod<[
	], [
		string
	], "view">;
	getFunction(nameOrSignature: "bridge"): TypedContractMethod<[
	], [
		string
	], "view">;
	getFunction(nameOrSignature: "dasKeySetInfo"): TypedContractMethod<[
		arg0: BytesLike
	], [
		[
			boolean,
			bigint
		]
	], "view">;
	getFunction(nameOrSignature: "feeTokenPricer"): TypedContractMethod<[
	], [
		string
	], "view">;
	getFunction(nameOrSignature: "forceInclusion"): TypedContractMethod<[
		_totalDelayedMessagesRead: BigNumberish,
		kind: BigNumberish,
		l1BlockAndTime: [
			BigNumberish,
			BigNumberish
		],
		baseFeeL1: BigNumberish,
		sender: AddressLike,
		messageDataHash: BytesLike
	], [
		void
	], "nonpayable">;
	getFunction(nameOrSignature: "forceInclusionDeadline"): TypedContractMethod<[
		blockNumber: BigNumberish
	], [
		bigint
	], "view">;
	getFunction(nameOrSignature: "getKeysetCreationBlock"): TypedContractMethod<[
		ksHash: BytesLike
	], [
		bigint
	], "view">;
	getFunction(nameOrSignature: "inboxAccs"): TypedContractMethod<[
		index: BigNumberish
	], [
		string
	], "view">;
	getFunction(nameOrSignature: "initialize"): TypedContractMethod<[
		bridge_: AddressLike,
		maxTimeVariation_: ISequencerInbox.MaxTimeVariationStruct,
		bufferConfig_: BufferConfigStruct,
		feeTokenPricer_: AddressLike
	], [
		void
	], "nonpayable">;
	getFunction(nameOrSignature: "invalidateKeysetHash"): TypedContractMethod<[
		ksHash: BytesLike
	], [
		void
	], "nonpayable">;
	getFunction(nameOrSignature: "isBatchPoster"): TypedContractMethod<[
		arg0: AddressLike
	], [
		boolean
	], "view">;
	getFunction(nameOrSignature: "isDelayBufferable"): TypedContractMethod<[
	], [
		boolean
	], "view">;
	getFunction(nameOrSignature: "isSequencer"): TypedContractMethod<[
		arg0: AddressLike
	], [
		boolean
	], "view">;
	getFunction(nameOrSignature: "isValidKeysetHash"): TypedContractMethod<[
		ksHash: BytesLike
	], [
		boolean
	], "view">;
	getFunction(nameOrSignature: "maxDataSize"): TypedContractMethod<[
	], [
		bigint
	], "view">;
	getFunction(nameOrSignature: "maxTimeVariation"): TypedContractMethod<[
	], [
		[
			bigint,
			bigint,
			bigint,
			bigint
		] & {
			delayBlocks: bigint;
			futureBlocks: bigint;
			delaySeconds: bigint;
			futureSeconds: bigint;
		}
	], "view">;
	getFunction(nameOrSignature: "removeDelayAfterFork"): TypedContractMethod<[
	], [
		void
	], "nonpayable">;
	getFunction(nameOrSignature: "rollup"): TypedContractMethod<[
	], [
		string
	], "view">;
	getFunction(nameOrSignature: "setBatchPosterManager"): TypedContractMethod<[
		newBatchPosterManager: AddressLike
	], [
		void
	], "nonpayable">;
	getFunction(nameOrSignature: "setFeeTokenPricer"): TypedContractMethod<[
		newFeeTokenPricer: AddressLike
	], [
		void
	], "nonpayable">;
	getFunction(nameOrSignature: "setIsBatchPoster"): TypedContractMethod<[
		addr: AddressLike,
		isBatchPoster_: boolean
	], [
		void
	], "nonpayable">;
	getFunction(nameOrSignature: "setIsSequencer"): TypedContractMethod<[
		addr: AddressLike,
		isSequencer_: boolean
	], [
		void
	], "nonpayable">;
	getFunction(nameOrSignature: "setMaxTimeVariation"): TypedContractMethod<[
		maxTimeVariation_: ISequencerInbox.MaxTimeVariationStruct
	], [
		void
	], "nonpayable">;
	getFunction(nameOrSignature: "setValidKeyset"): TypedContractMethod<[
		keysetBytes: BytesLike
	], [
		void
	], "nonpayable">;
	getFunction(nameOrSignature: "totalDelayedMessagesRead"): TypedContractMethod<[
	], [
		bigint
	], "view">;
	getFunction(nameOrSignature: "updateRollupAddress"): TypedContractMethod<[
	], [
		void
	], "nonpayable">;
	getEvent(key: "BatchPosterManagerSet"): TypedContractEvent<BatchPosterManagerSetEvent.InputTuple, BatchPosterManagerSetEvent.OutputTuple, BatchPosterManagerSetEvent.OutputObject>;
	getEvent(key: "BatchPosterSet"): TypedContractEvent<BatchPosterSetEvent.InputTuple, BatchPosterSetEvent.OutputTuple, BatchPosterSetEvent.OutputObject>;
	getEvent(key: "BufferConfigSet"): TypedContractEvent<BufferConfigSetEvent.InputTuple, BufferConfigSetEvent.OutputTuple, BufferConfigSetEvent.OutputObject>;
	getEvent(key: "FeeTokenPricerSet"): TypedContractEvent<FeeTokenPricerSetEvent.InputTuple, FeeTokenPricerSetEvent.OutputTuple, FeeTokenPricerSetEvent.OutputObject>;
	getEvent(key: "InboxMessageDelivered"): TypedContractEvent<InboxMessageDeliveredEvent$3.InputTuple, InboxMessageDeliveredEvent$3.OutputTuple, InboxMessageDeliveredEvent$3.OutputObject>;
	getEvent(key: "InboxMessageDeliveredFromOrigin"): TypedContractEvent<InboxMessageDeliveredFromOriginEvent$3.InputTuple, InboxMessageDeliveredFromOriginEvent$3.OutputTuple, InboxMessageDeliveredFromOriginEvent$3.OutputObject>;
	getEvent(key: "InvalidateKeyset"): TypedContractEvent<InvalidateKeysetEvent.InputTuple, InvalidateKeysetEvent.OutputTuple, InvalidateKeysetEvent.OutputObject>;
	getEvent(key: "MaxTimeVariationSet"): TypedContractEvent<MaxTimeVariationSetEvent.InputTuple, MaxTimeVariationSetEvent.OutputTuple, MaxTimeVariationSetEvent.OutputObject>;
	getEvent(key: "OwnerFunctionCalled"): TypedContractEvent<OwnerFunctionCalledEvent.InputTuple, OwnerFunctionCalledEvent.OutputTuple, OwnerFunctionCalledEvent.OutputObject>;
	getEvent(key: "SequencerBatchData"): TypedContractEvent<SequencerBatchDataEvent.InputTuple, SequencerBatchDataEvent.OutputTuple, SequencerBatchDataEvent.OutputObject>;
	getEvent(key: "SequencerBatchDelivered"): TypedContractEvent<SequencerBatchDeliveredEvent.InputTuple, SequencerBatchDeliveredEvent.OutputTuple, SequencerBatchDeliveredEvent.OutputObject>;
	getEvent(key: "SequencerSet"): TypedContractEvent<SequencerSetEvent.InputTuple, SequencerSetEvent.OutputTuple, SequencerSetEvent.OutputObject>;
	getEvent(key: "SetValidKeyset"): TypedContractEvent<SetValidKeysetEvent.InputTuple, SetValidKeysetEvent.OutputTuple, SetValidKeysetEvent.OutputObject>;
	filters: {
		"BatchPosterManagerSet(address)": TypedContractEvent<BatchPosterManagerSetEvent.InputTuple, BatchPosterManagerSetEvent.OutputTuple, BatchPosterManagerSetEvent.OutputObject>;
		BatchPosterManagerSet: TypedContractEvent<BatchPosterManagerSetEvent.InputTuple, BatchPosterManagerSetEvent.OutputTuple, BatchPosterManagerSetEvent.OutputObject>;
		"BatchPosterSet(address,bool)": TypedContractEvent<BatchPosterSetEvent.InputTuple, BatchPosterSetEvent.OutputTuple, BatchPosterSetEvent.OutputObject>;
		BatchPosterSet: TypedContractEvent<BatchPosterSetEvent.InputTuple, BatchPosterSetEvent.OutputTuple, BatchPosterSetEvent.OutputObject>;
		"BufferConfigSet(tuple)": TypedContractEvent<BufferConfigSetEvent.InputTuple, BufferConfigSetEvent.OutputTuple, BufferConfigSetEvent.OutputObject>;
		BufferConfigSet: TypedContractEvent<BufferConfigSetEvent.InputTuple, BufferConfigSetEvent.OutputTuple, BufferConfigSetEvent.OutputObject>;
		"FeeTokenPricerSet(address)": TypedContractEvent<FeeTokenPricerSetEvent.InputTuple, FeeTokenPricerSetEvent.OutputTuple, FeeTokenPricerSetEvent.OutputObject>;
		FeeTokenPricerSet: TypedContractEvent<FeeTokenPricerSetEvent.InputTuple, FeeTokenPricerSetEvent.OutputTuple, FeeTokenPricerSetEvent.OutputObject>;
		"InboxMessageDelivered(uint256,bytes)": TypedContractEvent<InboxMessageDeliveredEvent$3.InputTuple, InboxMessageDeliveredEvent$3.OutputTuple, InboxMessageDeliveredEvent$3.OutputObject>;
		InboxMessageDelivered: TypedContractEvent<InboxMessageDeliveredEvent$3.InputTuple, InboxMessageDeliveredEvent$3.OutputTuple, InboxMessageDeliveredEvent$3.OutputObject>;
		"InboxMessageDeliveredFromOrigin(uint256)": TypedContractEvent<InboxMessageDeliveredFromOriginEvent$3.InputTuple, InboxMessageDeliveredFromOriginEvent$3.OutputTuple, InboxMessageDeliveredFromOriginEvent$3.OutputObject>;
		InboxMessageDeliveredFromOrigin: TypedContractEvent<InboxMessageDeliveredFromOriginEvent$3.InputTuple, InboxMessageDeliveredFromOriginEvent$3.OutputTuple, InboxMessageDeliveredFromOriginEvent$3.OutputObject>;
		"InvalidateKeyset(bytes32)": TypedContractEvent<InvalidateKeysetEvent.InputTuple, InvalidateKeysetEvent.OutputTuple, InvalidateKeysetEvent.OutputObject>;
		InvalidateKeyset: TypedContractEvent<InvalidateKeysetEvent.InputTuple, InvalidateKeysetEvent.OutputTuple, InvalidateKeysetEvent.OutputObject>;
		"MaxTimeVariationSet(tuple)": TypedContractEvent<MaxTimeVariationSetEvent.InputTuple, MaxTimeVariationSetEvent.OutputTuple, MaxTimeVariationSetEvent.OutputObject>;
		MaxTimeVariationSet: TypedContractEvent<MaxTimeVariationSetEvent.InputTuple, MaxTimeVariationSetEvent.OutputTuple, MaxTimeVariationSetEvent.OutputObject>;
		"OwnerFunctionCalled(uint256)": TypedContractEvent<OwnerFunctionCalledEvent.InputTuple, OwnerFunctionCalledEvent.OutputTuple, OwnerFunctionCalledEvent.OutputObject>;
		OwnerFunctionCalled: TypedContractEvent<OwnerFunctionCalledEvent.InputTuple, OwnerFunctionCalledEvent.OutputTuple, OwnerFunctionCalledEvent.OutputObject>;
		"SequencerBatchData(uint256,bytes)": TypedContractEvent<SequencerBatchDataEvent.InputTuple, SequencerBatchDataEvent.OutputTuple, SequencerBatchDataEvent.OutputObject>;
		SequencerBatchData: TypedContractEvent<SequencerBatchDataEvent.InputTuple, SequencerBatchDataEvent.OutputTuple, SequencerBatchDataEvent.OutputObject>;
		"SequencerBatchDelivered(uint256,bytes32,bytes32,bytes32,uint256,tuple,uint8)": TypedContractEvent<SequencerBatchDeliveredEvent.InputTuple, SequencerBatchDeliveredEvent.OutputTuple, SequencerBatchDeliveredEvent.OutputObject>;
		SequencerBatchDelivered: TypedContractEvent<SequencerBatchDeliveredEvent.InputTuple, SequencerBatchDeliveredEvent.OutputTuple, SequencerBatchDeliveredEvent.OutputObject>;
		"SequencerSet(address,bool)": TypedContractEvent<SequencerSetEvent.InputTuple, SequencerSetEvent.OutputTuple, SequencerSetEvent.OutputObject>;
		SequencerSet: TypedContractEvent<SequencerSetEvent.InputTuple, SequencerSetEvent.OutputTuple, SequencerSetEvent.OutputObject>;
		"SetValidKeyset(bytes32,bytes)": TypedContractEvent<SetValidKeysetEvent.InputTuple, SetValidKeysetEvent.OutputTuple, SetValidKeysetEvent.OutputObject>;
		SetValidKeyset: TypedContractEvent<SetValidKeysetEvent.InputTuple, SetValidKeysetEvent.OutputTuple, SetValidKeysetEvent.OutputObject>;
	};
}
export interface OutboxInterface extends Interface {
	getFunction(nameOrSignature: "OUTBOX_VERSION" | "bridge" | "calculateItemHash" | "calculateMerkleRoot" | "executeTransaction" | "executeTransactionSimulation" | "initialize" | "isSpent" | "l2ToL1BatchNum" | "l2ToL1Block" | "l2ToL1EthBlock" | "l2ToL1OutputId" | "l2ToL1Sender" | "l2ToL1Timestamp" | "postUpgradeInit" | "rollup" | "roots" | "spent" | "updateRollupAddress" | "updateSendRoot"): FunctionFragment;
	getEvent(nameOrSignatureOrTopic: "OutBoxTransactionExecuted" | "SendRootUpdated"): EventFragment;
	encodeFunctionData(functionFragment: "OUTBOX_VERSION", values?: undefined): string;
	encodeFunctionData(functionFragment: "bridge", values?: undefined): string;
	encodeFunctionData(functionFragment: "calculateItemHash", values: [
		AddressLike,
		AddressLike,
		BigNumberish,
		BigNumberish,
		BigNumberish,
		BigNumberish,
		BytesLike
	]): string;
	encodeFunctionData(functionFragment: "calculateMerkleRoot", values: [
		BytesLike[],
		BigNumberish,
		BytesLike
	]): string;
	encodeFunctionData(functionFragment: "executeTransaction", values: [
		BytesLike[],
		BigNumberish,
		AddressLike,
		AddressLike,
		BigNumberish,
		BigNumberish,
		BigNumberish,
		BigNumberish,
		BytesLike
	]): string;
	encodeFunctionData(functionFragment: "executeTransactionSimulation", values: [
		BigNumberish,
		AddressLike,
		AddressLike,
		BigNumberish,
		BigNumberish,
		BigNumberish,
		BigNumberish,
		BytesLike
	]): string;
	encodeFunctionData(functionFragment: "initialize", values: [
		AddressLike
	]): string;
	encodeFunctionData(functionFragment: "isSpent", values: [
		BigNumberish
	]): string;
	encodeFunctionData(functionFragment: "l2ToL1BatchNum", values?: undefined): string;
	encodeFunctionData(functionFragment: "l2ToL1Block", values?: undefined): string;
	encodeFunctionData(functionFragment: "l2ToL1EthBlock", values?: undefined): string;
	encodeFunctionData(functionFragment: "l2ToL1OutputId", values?: undefined): string;
	encodeFunctionData(functionFragment: "l2ToL1Sender", values?: undefined): string;
	encodeFunctionData(functionFragment: "l2ToL1Timestamp", values?: undefined): string;
	encodeFunctionData(functionFragment: "postUpgradeInit", values?: undefined): string;
	encodeFunctionData(functionFragment: "rollup", values?: undefined): string;
	encodeFunctionData(functionFragment: "roots", values: [
		BytesLike
	]): string;
	encodeFunctionData(functionFragment: "spent", values: [
		BigNumberish
	]): string;
	encodeFunctionData(functionFragment: "updateRollupAddress", values?: undefined): string;
	encodeFunctionData(functionFragment: "updateSendRoot", values: [
		BytesLike,
		BytesLike
	]): string;
	decodeFunctionResult(functionFragment: "OUTBOX_VERSION", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "bridge", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "calculateItemHash", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "calculateMerkleRoot", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "executeTransaction", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "executeTransactionSimulation", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "initialize", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "isSpent", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "l2ToL1BatchNum", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "l2ToL1Block", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "l2ToL1EthBlock", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "l2ToL1OutputId", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "l2ToL1Sender", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "l2ToL1Timestamp", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "postUpgradeInit", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "rollup", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "roots", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "spent", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "updateRollupAddress", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "updateSendRoot", data: BytesLike): Result;
}
declare namespace OutBoxTransactionExecutedEvent$2 {
	type InputTuple = [
		to: AddressLike,
		l2Sender: AddressLike,
		zero: BigNumberish,
		transactionIndex: BigNumberish
	];
	type OutputTuple = [
		to: string,
		l2Sender: string,
		zero: bigint,
		transactionIndex: bigint
	];
	interface OutputObject {
		to: string;
		l2Sender: string;
		zero: bigint;
		transactionIndex: bigint;
	}
	type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
	type Filter = TypedDeferredTopicFilter<Event>;
	type Log = TypedEventLog<Event>;
	type LogDescription = TypedLogDescription<Event>;
}
declare namespace SendRootUpdatedEvent$2 {
	type InputTuple = [
		outputRoot: BytesLike,
		l2BlockHash: BytesLike
	];
	type OutputTuple = [
		outputRoot: string,
		l2BlockHash: string
	];
	interface OutputObject {
		outputRoot: string;
		l2BlockHash: string;
	}
	type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
	type Filter = TypedDeferredTopicFilter<Event>;
	type Log = TypedEventLog<Event>;
	type LogDescription = TypedLogDescription<Event>;
}
export interface Outbox extends BaseContract {
	connect(runner?: ContractRunner | null): Outbox;
	waitForDeployment(): Promise<this>;
	interface: OutboxInterface;
	queryFilter<TCEvent extends TypedContractEvent>(event: TCEvent, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
	queryFilter<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
	on<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
	on<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
	once<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
	once<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
	listeners<TCEvent extends TypedContractEvent>(event: TCEvent): Promise<Array<TypedListener<TCEvent>>>;
	listeners(eventName?: string): Promise<Array<Listener>>;
	removeAllListeners<TCEvent extends TypedContractEvent>(event?: TCEvent): Promise<this>;
	OUTBOX_VERSION: TypedContractMethod<[
	], [
		bigint
	], "view">;
	bridge: TypedContractMethod<[
	], [
		string
	], "view">;
	calculateItemHash: TypedContractMethod<[
		l2Sender: AddressLike,
		to: AddressLike,
		l2Block: BigNumberish,
		l1Block: BigNumberish,
		l2Timestamp: BigNumberish,
		value: BigNumberish,
		data: BytesLike
	], [
		string
	], "view">;
	calculateMerkleRoot: TypedContractMethod<[
		proof: BytesLike[],
		path: BigNumberish,
		item: BytesLike
	], [
		string
	], "view">;
	executeTransaction: TypedContractMethod<[
		proof: BytesLike[],
		index: BigNumberish,
		l2Sender: AddressLike,
		to: AddressLike,
		l2Block: BigNumberish,
		l1Block: BigNumberish,
		l2Timestamp: BigNumberish,
		value: BigNumberish,
		data: BytesLike
	], [
		void
	], "nonpayable">;
	executeTransactionSimulation: TypedContractMethod<[
		index: BigNumberish,
		l2Sender: AddressLike,
		to: AddressLike,
		l2Block: BigNumberish,
		l1Block: BigNumberish,
		l2Timestamp: BigNumberish,
		value: BigNumberish,
		data: BytesLike
	], [
		void
	], "nonpayable">;
	initialize: TypedContractMethod<[
		_bridge: AddressLike
	], [
		void
	], "nonpayable">;
	isSpent: TypedContractMethod<[
		index: BigNumberish
	], [
		boolean
	], "view">;
	l2ToL1BatchNum: TypedContractMethod<[
	], [
		bigint
	], "view">;
	l2ToL1Block: TypedContractMethod<[
	], [
		bigint
	], "view">;
	l2ToL1EthBlock: TypedContractMethod<[
	], [
		bigint
	], "view">;
	l2ToL1OutputId: TypedContractMethod<[
	], [
		string
	], "view">;
	l2ToL1Sender: TypedContractMethod<[
	], [
		string
	], "view">;
	l2ToL1Timestamp: TypedContractMethod<[
	], [
		bigint
	], "view">;
	postUpgradeInit: TypedContractMethod<[
	], [
		void
	], "nonpayable">;
	rollup: TypedContractMethod<[
	], [
		string
	], "view">;
	roots: TypedContractMethod<[
		arg0: BytesLike
	], [
		string
	], "view">;
	spent: TypedContractMethod<[
		arg0: BigNumberish
	], [
		string
	], "view">;
	updateRollupAddress: TypedContractMethod<[
	], [
		void
	], "nonpayable">;
	updateSendRoot: TypedContractMethod<[
		root: BytesLike,
		l2BlockHash: BytesLike
	], [
		void
	], "nonpayable">;
	getFunction<T extends ContractMethod = ContractMethod>(key: string | FunctionFragment): T;
	getFunction(nameOrSignature: "OUTBOX_VERSION"): TypedContractMethod<[
	], [
		bigint
	], "view">;
	getFunction(nameOrSignature: "bridge"): TypedContractMethod<[
	], [
		string
	], "view">;
	getFunction(nameOrSignature: "calculateItemHash"): TypedContractMethod<[
		l2Sender: AddressLike,
		to: AddressLike,
		l2Block: BigNumberish,
		l1Block: BigNumberish,
		l2Timestamp: BigNumberish,
		value: BigNumberish,
		data: BytesLike
	], [
		string
	], "view">;
	getFunction(nameOrSignature: "calculateMerkleRoot"): TypedContractMethod<[
		proof: BytesLike[],
		path: BigNumberish,
		item: BytesLike
	], [
		string
	], "view">;
	getFunction(nameOrSignature: "executeTransaction"): TypedContractMethod<[
		proof: BytesLike[],
		index: BigNumberish,
		l2Sender: AddressLike,
		to: AddressLike,
		l2Block: BigNumberish,
		l1Block: BigNumberish,
		l2Timestamp: BigNumberish,
		value: BigNumberish,
		data: BytesLike
	], [
		void
	], "nonpayable">;
	getFunction(nameOrSignature: "executeTransactionSimulation"): TypedContractMethod<[
		index: BigNumberish,
		l2Sender: AddressLike,
		to: AddressLike,
		l2Block: BigNumberish,
		l1Block: BigNumberish,
		l2Timestamp: BigNumberish,
		value: BigNumberish,
		data: BytesLike
	], [
		void
	], "nonpayable">;
	getFunction(nameOrSignature: "initialize"): TypedContractMethod<[
		_bridge: AddressLike
	], [
		void
	], "nonpayable">;
	getFunction(nameOrSignature: "isSpent"): TypedContractMethod<[
		index: BigNumberish
	], [
		boolean
	], "view">;
	getFunction(nameOrSignature: "l2ToL1BatchNum"): TypedContractMethod<[
	], [
		bigint
	], "view">;
	getFunction(nameOrSignature: "l2ToL1Block"): TypedContractMethod<[
	], [
		bigint
	], "view">;
	getFunction(nameOrSignature: "l2ToL1EthBlock"): TypedContractMethod<[
	], [
		bigint
	], "view">;
	getFunction(nameOrSignature: "l2ToL1OutputId"): TypedContractMethod<[
	], [
		string
	], "view">;
	getFunction(nameOrSignature: "l2ToL1Sender"): TypedContractMethod<[
	], [
		string
	], "view">;
	getFunction(nameOrSignature: "l2ToL1Timestamp"): TypedContractMethod<[
	], [
		bigint
	], "view">;
	getFunction(nameOrSignature: "postUpgradeInit"): TypedContractMethod<[
	], [
		void
	], "nonpayable">;
	getFunction(nameOrSignature: "rollup"): TypedContractMethod<[
	], [
		string
	], "view">;
	getFunction(nameOrSignature: "roots"): TypedContractMethod<[
		arg0: BytesLike
	], [
		string
	], "view">;
	getFunction(nameOrSignature: "spent"): TypedContractMethod<[
		arg0: BigNumberish
	], [
		string
	], "view">;
	getFunction(nameOrSignature: "updateRollupAddress"): TypedContractMethod<[
	], [
		void
	], "nonpayable">;
	getFunction(nameOrSignature: "updateSendRoot"): TypedContractMethod<[
		root: BytesLike,
		l2BlockHash: BytesLike
	], [
		void
	], "nonpayable">;
	getEvent(key: "OutBoxTransactionExecuted"): TypedContractEvent<OutBoxTransactionExecutedEvent$2.InputTuple, OutBoxTransactionExecutedEvent$2.OutputTuple, OutBoxTransactionExecutedEvent$2.OutputObject>;
	getEvent(key: "SendRootUpdated"): TypedContractEvent<SendRootUpdatedEvent$2.InputTuple, SendRootUpdatedEvent$2.OutputTuple, SendRootUpdatedEvent$2.OutputObject>;
	filters: {
		"OutBoxTransactionExecuted(address,address,uint256,uint256)": TypedContractEvent<OutBoxTransactionExecutedEvent$2.InputTuple, OutBoxTransactionExecutedEvent$2.OutputTuple, OutBoxTransactionExecutedEvent$2.OutputObject>;
		OutBoxTransactionExecuted: TypedContractEvent<OutBoxTransactionExecutedEvent$2.InputTuple, OutBoxTransactionExecutedEvent$2.OutputTuple, OutBoxTransactionExecutedEvent$2.OutputObject>;
		"SendRootUpdated(bytes32,bytes32)": TypedContractEvent<SendRootUpdatedEvent$2.InputTuple, SendRootUpdatedEvent$2.OutputTuple, SendRootUpdatedEvent$2.OutputObject>;
		SendRootUpdated: TypedContractEvent<SendRootUpdatedEvent$2.InputTuple, SendRootUpdatedEvent$2.OutputTuple, SendRootUpdatedEvent$2.OutputObject>;
	};
}
export interface IGasRefunderInterface extends Interface {
	getFunction(nameOrSignature: "onGasSpent"): FunctionFragment;
	encodeFunctionData(functionFragment: "onGasSpent", values: [
		AddressLike,
		BigNumberish,
		BigNumberish
	]): string;
	decodeFunctionResult(functionFragment: "onGasSpent", data: BytesLike): Result;
}
export interface IGasRefunder extends BaseContract {
	connect(runner?: ContractRunner | null): IGasRefunder;
	waitForDeployment(): Promise<this>;
	interface: IGasRefunderInterface;
	queryFilter<TCEvent extends TypedContractEvent>(event: TCEvent, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
	queryFilter<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
	on<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
	on<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
	once<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
	once<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
	listeners<TCEvent extends TypedContractEvent>(event: TCEvent): Promise<Array<TypedListener<TCEvent>>>;
	listeners(eventName?: string): Promise<Array<Listener>>;
	removeAllListeners<TCEvent extends TypedContractEvent>(event?: TCEvent): Promise<this>;
	onGasSpent: TypedContractMethod<[
		spender: AddressLike,
		gasUsed: BigNumberish,
		calldataSize: BigNumberish
	], [
		boolean
	], "nonpayable">;
	getFunction<T extends ContractMethod = ContractMethod>(key: string | FunctionFragment): T;
	getFunction(nameOrSignature: "onGasSpent"): TypedContractMethod<[
		spender: AddressLike,
		gasUsed: BigNumberish,
		calldataSize: BigNumberish
	], [
		boolean
	], "nonpayable">;
	filters: {};
}
export interface NodeInterfaceInterface extends Interface {
	getFunction(nameOrSignature: "blockL1Num" | "constructOutboxProof" | "estimateRetryableTicket" | "findBatchContainingBlock" | "gasEstimateComponents" | "gasEstimateL1Component" | "getL1Confirmations" | "l2BlockRangeForL1" | "legacyLookupMessageBatchProof" | "nitroGenesisBlock"): FunctionFragment;
	encodeFunctionData(functionFragment: "blockL1Num", values: [
		BigNumberish
	]): string;
	encodeFunctionData(functionFragment: "constructOutboxProof", values: [
		BigNumberish,
		BigNumberish
	]): string;
	encodeFunctionData(functionFragment: "estimateRetryableTicket", values: [
		AddressLike,
		BigNumberish,
		AddressLike,
		BigNumberish,
		AddressLike,
		AddressLike,
		BytesLike
	]): string;
	encodeFunctionData(functionFragment: "findBatchContainingBlock", values: [
		BigNumberish
	]): string;
	encodeFunctionData(functionFragment: "gasEstimateComponents", values: [
		AddressLike,
		boolean,
		BytesLike
	]): string;
	encodeFunctionData(functionFragment: "gasEstimateL1Component", values: [
		AddressLike,
		boolean,
		BytesLike
	]): string;
	encodeFunctionData(functionFragment: "getL1Confirmations", values: [
		BytesLike
	]): string;
	encodeFunctionData(functionFragment: "l2BlockRangeForL1", values: [
		BigNumberish
	]): string;
	encodeFunctionData(functionFragment: "legacyLookupMessageBatchProof", values: [
		BigNumberish,
		BigNumberish
	]): string;
	encodeFunctionData(functionFragment: "nitroGenesisBlock", values?: undefined): string;
	decodeFunctionResult(functionFragment: "blockL1Num", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "constructOutboxProof", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "estimateRetryableTicket", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "findBatchContainingBlock", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "gasEstimateComponents", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "gasEstimateL1Component", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "getL1Confirmations", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "l2BlockRangeForL1", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "legacyLookupMessageBatchProof", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "nitroGenesisBlock", data: BytesLike): Result;
}
export interface NodeInterface extends BaseContract {
	connect(runner?: ContractRunner | null): NodeInterface;
	waitForDeployment(): Promise<this>;
	interface: NodeInterfaceInterface;
	queryFilter<TCEvent extends TypedContractEvent>(event: TCEvent, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
	queryFilter<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
	on<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
	on<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
	once<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
	once<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
	listeners<TCEvent extends TypedContractEvent>(event: TCEvent): Promise<Array<TypedListener<TCEvent>>>;
	listeners(eventName?: string): Promise<Array<Listener>>;
	removeAllListeners<TCEvent extends TypedContractEvent>(event?: TCEvent): Promise<this>;
	blockL1Num: TypedContractMethod<[
		l2BlockNum: BigNumberish
	], [
		bigint
	], "view">;
	constructOutboxProof: TypedContractMethod<[
		size: BigNumberish,
		leaf: BigNumberish
	], [
		[
			string,
			string,
			string[]
		] & {
			send: string;
			root: string;
			proof: string[];
		}
	], "view">;
	estimateRetryableTicket: TypedContractMethod<[
		sender: AddressLike,
		deposit: BigNumberish,
		to: AddressLike,
		l2CallValue: BigNumberish,
		excessFeeRefundAddress: AddressLike,
		callValueRefundAddress: AddressLike,
		data: BytesLike
	], [
		void
	], "nonpayable">;
	findBatchContainingBlock: TypedContractMethod<[
		blockNum: BigNumberish
	], [
		bigint
	], "view">;
	gasEstimateComponents: TypedContractMethod<[
		to: AddressLike,
		contractCreation: boolean,
		data: BytesLike
	], [
		[
			bigint,
			bigint,
			bigint,
			bigint
		] & {
			gasEstimate: bigint;
			gasEstimateForL1: bigint;
			baseFee: bigint;
			l1BaseFeeEstimate: bigint;
		}
	], "payable">;
	gasEstimateL1Component: TypedContractMethod<[
		to: AddressLike,
		contractCreation: boolean,
		data: BytesLike
	], [
		[
			bigint,
			bigint,
			bigint
		] & {
			gasEstimateForL1: bigint;
			baseFee: bigint;
			l1BaseFeeEstimate: bigint;
		}
	], "payable">;
	getL1Confirmations: TypedContractMethod<[
		blockHash: BytesLike
	], [
		bigint
	], "view">;
	l2BlockRangeForL1: TypedContractMethod<[
		blockNum: BigNumberish
	], [
		[
			bigint,
			bigint
		] & {
			firstBlock: bigint;
			lastBlock: bigint;
		}
	], "view">;
	legacyLookupMessageBatchProof: TypedContractMethod<[
		batchNum: BigNumberish,
		index: BigNumberish
	], [
		[
			string[],
			bigint,
			string,
			string,
			bigint,
			bigint,
			bigint,
			bigint,
			string
		] & {
			proof: string[];
			path: bigint;
			l2Sender: string;
			l1Dest: string;
			l2Block: bigint;
			l1Block: bigint;
			timestamp: bigint;
			amount: bigint;
			calldataForL1: string;
		}
	], "view">;
	nitroGenesisBlock: TypedContractMethod<[
	], [
		bigint
	], "view">;
	getFunction<T extends ContractMethod = ContractMethod>(key: string | FunctionFragment): T;
	getFunction(nameOrSignature: "blockL1Num"): TypedContractMethod<[
		l2BlockNum: BigNumberish
	], [
		bigint
	], "view">;
	getFunction(nameOrSignature: "constructOutboxProof"): TypedContractMethod<[
		size: BigNumberish,
		leaf: BigNumberish
	], [
		[
			string,
			string,
			string[]
		] & {
			send: string;
			root: string;
			proof: string[];
		}
	], "view">;
	getFunction(nameOrSignature: "estimateRetryableTicket"): TypedContractMethod<[
		sender: AddressLike,
		deposit: BigNumberish,
		to: AddressLike,
		l2CallValue: BigNumberish,
		excessFeeRefundAddress: AddressLike,
		callValueRefundAddress: AddressLike,
		data: BytesLike
	], [
		void
	], "nonpayable">;
	getFunction(nameOrSignature: "findBatchContainingBlock"): TypedContractMethod<[
		blockNum: BigNumberish
	], [
		bigint
	], "view">;
	getFunction(nameOrSignature: "gasEstimateComponents"): TypedContractMethod<[
		to: AddressLike,
		contractCreation: boolean,
		data: BytesLike
	], [
		[
			bigint,
			bigint,
			bigint,
			bigint
		] & {
			gasEstimate: bigint;
			gasEstimateForL1: bigint;
			baseFee: bigint;
			l1BaseFeeEstimate: bigint;
		}
	], "payable">;
	getFunction(nameOrSignature: "gasEstimateL1Component"): TypedContractMethod<[
		to: AddressLike,
		contractCreation: boolean,
		data: BytesLike
	], [
		[
			bigint,
			bigint,
			bigint
		] & {
			gasEstimateForL1: bigint;
			baseFee: bigint;
			l1BaseFeeEstimate: bigint;
		}
	], "payable">;
	getFunction(nameOrSignature: "getL1Confirmations"): TypedContractMethod<[
		blockHash: BytesLike
	], [
		bigint
	], "view">;
	getFunction(nameOrSignature: "l2BlockRangeForL1"): TypedContractMethod<[
		blockNum: BigNumberish
	], [
		[
			bigint,
			bigint
		] & {
			firstBlock: bigint;
			lastBlock: bigint;
		}
	], "view">;
	getFunction(nameOrSignature: "legacyLookupMessageBatchProof"): TypedContractMethod<[
		batchNum: BigNumberish,
		index: BigNumberish
	], [
		[
			string[],
			bigint,
			string,
			string,
			bigint,
			bigint,
			bigint,
			bigint,
			string
		] & {
			proof: string[];
			path: bigint;
			l2Sender: string;
			l1Dest: string;
			l2Block: bigint;
			l1Block: bigint;
			timestamp: bigint;
			amount: bigint;
			calldataForL1: string;
		}
	], "view">;
	getFunction(nameOrSignature: "nitroGenesisBlock"): TypedContractMethod<[
	], [
		bigint
	], "view">;
	filters: {};
}
export interface ArbSysInterface extends Interface {
	getFunction(nameOrSignature: "arbBlockHash" | "arbBlockNumber" | "arbChainID" | "arbOSVersion" | "getStorageGasAvailable" | "isTopLevelCall" | "mapL1SenderContractAddressToL2Alias" | "myCallersAddressWithoutAliasing" | "sendMerkleTreeState" | "sendTxToL1" | "wasMyCallersAddressAliased" | "withdrawEth"): FunctionFragment;
	getEvent(nameOrSignatureOrTopic: "L2ToL1Transaction" | "L2ToL1Tx" | "SendMerkleUpdate"): EventFragment;
	encodeFunctionData(functionFragment: "arbBlockHash", values: [
		BigNumberish
	]): string;
	encodeFunctionData(functionFragment: "arbBlockNumber", values?: undefined): string;
	encodeFunctionData(functionFragment: "arbChainID", values?: undefined): string;
	encodeFunctionData(functionFragment: "arbOSVersion", values?: undefined): string;
	encodeFunctionData(functionFragment: "getStorageGasAvailable", values?: undefined): string;
	encodeFunctionData(functionFragment: "isTopLevelCall", values?: undefined): string;
	encodeFunctionData(functionFragment: "mapL1SenderContractAddressToL2Alias", values: [
		AddressLike,
		AddressLike
	]): string;
	encodeFunctionData(functionFragment: "myCallersAddressWithoutAliasing", values?: undefined): string;
	encodeFunctionData(functionFragment: "sendMerkleTreeState", values?: undefined): string;
	encodeFunctionData(functionFragment: "sendTxToL1", values: [
		AddressLike,
		BytesLike
	]): string;
	encodeFunctionData(functionFragment: "wasMyCallersAddressAliased", values?: undefined): string;
	encodeFunctionData(functionFragment: "withdrawEth", values: [
		AddressLike
	]): string;
	decodeFunctionResult(functionFragment: "arbBlockHash", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "arbBlockNumber", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "arbChainID", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "arbOSVersion", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "getStorageGasAvailable", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "isTopLevelCall", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "mapL1SenderContractAddressToL2Alias", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "myCallersAddressWithoutAliasing", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "sendMerkleTreeState", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "sendTxToL1", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "wasMyCallersAddressAliased", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "withdrawEth", data: BytesLike): Result;
}
declare namespace L2ToL1TransactionEvent {
	type InputTuple = [
		caller: AddressLike,
		destination: AddressLike,
		uniqueId: BigNumberish,
		batchNumber: BigNumberish,
		indexInBatch: BigNumberish,
		arbBlockNum: BigNumberish,
		ethBlockNum: BigNumberish,
		timestamp: BigNumberish,
		callvalue: BigNumberish,
		data: BytesLike
	];
	type OutputTuple = [
		caller: string,
		destination: string,
		uniqueId: bigint,
		batchNumber: bigint,
		indexInBatch: bigint,
		arbBlockNum: bigint,
		ethBlockNum: bigint,
		timestamp: bigint,
		callvalue: bigint,
		data: string
	];
	interface OutputObject {
		caller: string;
		destination: string;
		uniqueId: bigint;
		batchNumber: bigint;
		indexInBatch: bigint;
		arbBlockNum: bigint;
		ethBlockNum: bigint;
		timestamp: bigint;
		callvalue: bigint;
		data: string;
	}
	type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
	type Filter = TypedDeferredTopicFilter<Event>;
	type Log = TypedEventLog<Event>;
	type LogDescription = TypedLogDescription<Event>;
}
declare namespace L2ToL1TxEvent {
	type InputTuple = [
		caller: AddressLike,
		destination: AddressLike,
		hash: BigNumberish,
		position: BigNumberish,
		arbBlockNum: BigNumberish,
		ethBlockNum: BigNumberish,
		timestamp: BigNumberish,
		callvalue: BigNumberish,
		data: BytesLike
	];
	type OutputTuple = [
		caller: string,
		destination: string,
		hash: bigint,
		position: bigint,
		arbBlockNum: bigint,
		ethBlockNum: bigint,
		timestamp: bigint,
		callvalue: bigint,
		data: string
	];
	interface OutputObject {
		caller: string;
		destination: string;
		hash: bigint;
		position: bigint;
		arbBlockNum: bigint;
		ethBlockNum: bigint;
		timestamp: bigint;
		callvalue: bigint;
		data: string;
	}
	type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
	type Filter = TypedDeferredTopicFilter<Event>;
	type Log = TypedEventLog<Event>;
	type LogDescription = TypedLogDescription<Event>;
}
declare namespace SendMerkleUpdateEvent {
	type InputTuple = [
		reserved: BigNumberish,
		hash: BytesLike,
		position: BigNumberish
	];
	type OutputTuple = [
		reserved: bigint,
		hash: string,
		position: bigint
	];
	interface OutputObject {
		reserved: bigint;
		hash: string;
		position: bigint;
	}
	type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
	type Filter = TypedDeferredTopicFilter<Event>;
	type Log = TypedEventLog<Event>;
	type LogDescription = TypedLogDescription<Event>;
}
export interface ArbSys extends BaseContract {
	connect(runner?: ContractRunner | null): ArbSys;
	waitForDeployment(): Promise<this>;
	interface: ArbSysInterface;
	queryFilter<TCEvent extends TypedContractEvent>(event: TCEvent, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
	queryFilter<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
	on<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
	on<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
	once<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
	once<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
	listeners<TCEvent extends TypedContractEvent>(event: TCEvent): Promise<Array<TypedListener<TCEvent>>>;
	listeners(eventName?: string): Promise<Array<Listener>>;
	removeAllListeners<TCEvent extends TypedContractEvent>(event?: TCEvent): Promise<this>;
	arbBlockHash: TypedContractMethod<[
		arbBlockNum: BigNumberish
	], [
		string
	], "view">;
	arbBlockNumber: TypedContractMethod<[
	], [
		bigint
	], "view">;
	arbChainID: TypedContractMethod<[
	], [
		bigint
	], "view">;
	arbOSVersion: TypedContractMethod<[
	], [
		bigint
	], "view">;
	getStorageGasAvailable: TypedContractMethod<[
	], [
		bigint
	], "view">;
	isTopLevelCall: TypedContractMethod<[
	], [
		boolean
	], "view">;
	mapL1SenderContractAddressToL2Alias: TypedContractMethod<[
		sender: AddressLike,
		unused: AddressLike
	], [
		string
	], "view">;
	myCallersAddressWithoutAliasing: TypedContractMethod<[
	], [
		string
	], "view">;
	sendMerkleTreeState: TypedContractMethod<[
	], [
		[
			bigint,
			string,
			string[]
		] & {
			size: bigint;
			root: string;
			partials: string[];
		}
	], "view">;
	sendTxToL1: TypedContractMethod<[
		destination: AddressLike,
		data: BytesLike
	], [
		bigint
	], "payable">;
	wasMyCallersAddressAliased: TypedContractMethod<[
	], [
		boolean
	], "view">;
	withdrawEth: TypedContractMethod<[
		destination: AddressLike
	], [
		bigint
	], "payable">;
	getFunction<T extends ContractMethod = ContractMethod>(key: string | FunctionFragment): T;
	getFunction(nameOrSignature: "arbBlockHash"): TypedContractMethod<[
		arbBlockNum: BigNumberish
	], [
		string
	], "view">;
	getFunction(nameOrSignature: "arbBlockNumber"): TypedContractMethod<[
	], [
		bigint
	], "view">;
	getFunction(nameOrSignature: "arbChainID"): TypedContractMethod<[
	], [
		bigint
	], "view">;
	getFunction(nameOrSignature: "arbOSVersion"): TypedContractMethod<[
	], [
		bigint
	], "view">;
	getFunction(nameOrSignature: "getStorageGasAvailable"): TypedContractMethod<[
	], [
		bigint
	], "view">;
	getFunction(nameOrSignature: "isTopLevelCall"): TypedContractMethod<[
	], [
		boolean
	], "view">;
	getFunction(nameOrSignature: "mapL1SenderContractAddressToL2Alias"): TypedContractMethod<[
		sender: AddressLike,
		unused: AddressLike
	], [
		string
	], "view">;
	getFunction(nameOrSignature: "myCallersAddressWithoutAliasing"): TypedContractMethod<[
	], [
		string
	], "view">;
	getFunction(nameOrSignature: "sendMerkleTreeState"): TypedContractMethod<[
	], [
		[
			bigint,
			string,
			string[]
		] & {
			size: bigint;
			root: string;
			partials: string[];
		}
	], "view">;
	getFunction(nameOrSignature: "sendTxToL1"): TypedContractMethod<[
		destination: AddressLike,
		data: BytesLike
	], [
		bigint
	], "payable">;
	getFunction(nameOrSignature: "wasMyCallersAddressAliased"): TypedContractMethod<[
	], [
		boolean
	], "view">;
	getFunction(nameOrSignature: "withdrawEth"): TypedContractMethod<[
		destination: AddressLike
	], [
		bigint
	], "payable">;
	getEvent(key: "L2ToL1Transaction"): TypedContractEvent<L2ToL1TransactionEvent.InputTuple, L2ToL1TransactionEvent.OutputTuple, L2ToL1TransactionEvent.OutputObject>;
	getEvent(key: "L2ToL1Tx"): TypedContractEvent<L2ToL1TxEvent.InputTuple, L2ToL1TxEvent.OutputTuple, L2ToL1TxEvent.OutputObject>;
	getEvent(key: "SendMerkleUpdate"): TypedContractEvent<SendMerkleUpdateEvent.InputTuple, SendMerkleUpdateEvent.OutputTuple, SendMerkleUpdateEvent.OutputObject>;
	filters: {
		"L2ToL1Transaction(address,address,uint256,uint256,uint256,uint256,uint256,uint256,uint256,bytes)": TypedContractEvent<L2ToL1TransactionEvent.InputTuple, L2ToL1TransactionEvent.OutputTuple, L2ToL1TransactionEvent.OutputObject>;
		L2ToL1Transaction: TypedContractEvent<L2ToL1TransactionEvent.InputTuple, L2ToL1TransactionEvent.OutputTuple, L2ToL1TransactionEvent.OutputObject>;
		"L2ToL1Tx(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes)": TypedContractEvent<L2ToL1TxEvent.InputTuple, L2ToL1TxEvent.OutputTuple, L2ToL1TxEvent.OutputObject>;
		L2ToL1Tx: TypedContractEvent<L2ToL1TxEvent.InputTuple, L2ToL1TxEvent.OutputTuple, L2ToL1TxEvent.OutputObject>;
		"SendMerkleUpdate(uint256,bytes32,uint256)": TypedContractEvent<SendMerkleUpdateEvent.InputTuple, SendMerkleUpdateEvent.OutputTuple, SendMerkleUpdateEvent.OutputObject>;
		SendMerkleUpdate: TypedContractEvent<SendMerkleUpdateEvent.InputTuple, SendMerkleUpdateEvent.OutputTuple, SendMerkleUpdateEvent.OutputObject>;
	};
}
export interface OwnableInterface extends Interface {
	getFunction(nameOrSignature: "owner" | "renounceOwnership" | "transferOwnership"): FunctionFragment;
	getEvent(nameOrSignatureOrTopic: "OwnershipTransferred"): EventFragment;
	encodeFunctionData(functionFragment: "owner", values?: undefined): string;
	encodeFunctionData(functionFragment: "renounceOwnership", values?: undefined): string;
	encodeFunctionData(functionFragment: "transferOwnership", values: [
		AddressLike
	]): string;
	decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "renounceOwnership", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "transferOwnership", data: BytesLike): Result;
}
declare namespace OwnershipTransferredEvent {
	type InputTuple = [
		previousOwner: AddressLike,
		newOwner: AddressLike
	];
	type OutputTuple = [
		previousOwner: string,
		newOwner: string
	];
	interface OutputObject {
		previousOwner: string;
		newOwner: string;
	}
	type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
	type Filter = TypedDeferredTopicFilter<Event>;
	type Log = TypedEventLog<Event>;
	type LogDescription = TypedLogDescription<Event>;
}
export interface Ownable extends BaseContract {
	connect(runner?: ContractRunner | null): Ownable;
	waitForDeployment(): Promise<this>;
	interface: OwnableInterface;
	queryFilter<TCEvent extends TypedContractEvent>(event: TCEvent, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
	queryFilter<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
	on<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
	on<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
	once<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
	once<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
	listeners<TCEvent extends TypedContractEvent>(event: TCEvent): Promise<Array<TypedListener<TCEvent>>>;
	listeners(eventName?: string): Promise<Array<Listener>>;
	removeAllListeners<TCEvent extends TypedContractEvent>(event?: TCEvent): Promise<this>;
	owner: TypedContractMethod<[
	], [
		string
	], "view">;
	renounceOwnership: TypedContractMethod<[
	], [
		void
	], "nonpayable">;
	transferOwnership: TypedContractMethod<[
		newOwner: AddressLike
	], [
		void
	], "nonpayable">;
	getFunction<T extends ContractMethod = ContractMethod>(key: string | FunctionFragment): T;
	getFunction(nameOrSignature: "owner"): TypedContractMethod<[
	], [
		string
	], "view">;
	getFunction(nameOrSignature: "renounceOwnership"): TypedContractMethod<[
	], [
		void
	], "nonpayable">;
	getFunction(nameOrSignature: "transferOwnership"): TypedContractMethod<[
		newOwner: AddressLike
	], [
		void
	], "nonpayable">;
	getEvent(key: "OwnershipTransferred"): TypedContractEvent<OwnershipTransferredEvent.InputTuple, OwnershipTransferredEvent.OutputTuple, OwnershipTransferredEvent.OutputObject>;
	filters: {
		"OwnershipTransferred(address,address)": TypedContractEvent<OwnershipTransferredEvent.InputTuple, OwnershipTransferredEvent.OutputTuple, OwnershipTransferredEvent.OutputObject>;
		OwnershipTransferred: TypedContractEvent<OwnershipTransferredEvent.InputTuple, OwnershipTransferredEvent.OutputTuple, OwnershipTransferredEvent.OutputObject>;
	};
}
export interface IERC1363Interface extends Interface {
	getFunction(nameOrSignature: "allowance" | "approve" | "approveAndCall(address,uint256)" | "approveAndCall(address,uint256,bytes)" | "balanceOf" | "supportsInterface" | "totalSupply" | "transfer" | "transferAndCall(address,uint256)" | "transferAndCall(address,uint256,bytes)" | "transferFrom" | "transferFromAndCall(address,address,uint256,bytes)" | "transferFromAndCall(address,address,uint256)"): FunctionFragment;
	getEvent(nameOrSignatureOrTopic: "Approval" | "Transfer"): EventFragment;
	encodeFunctionData(functionFragment: "allowance", values: [
		AddressLike,
		AddressLike
	]): string;
	encodeFunctionData(functionFragment: "approve", values: [
		AddressLike,
		BigNumberish
	]): string;
	encodeFunctionData(functionFragment: "approveAndCall(address,uint256)", values: [
		AddressLike,
		BigNumberish
	]): string;
	encodeFunctionData(functionFragment: "approveAndCall(address,uint256,bytes)", values: [
		AddressLike,
		BigNumberish,
		BytesLike
	]): string;
	encodeFunctionData(functionFragment: "balanceOf", values: [
		AddressLike
	]): string;
	encodeFunctionData(functionFragment: "supportsInterface", values: [
		BytesLike
	]): string;
	encodeFunctionData(functionFragment: "totalSupply", values?: undefined): string;
	encodeFunctionData(functionFragment: "transfer", values: [
		AddressLike,
		BigNumberish
	]): string;
	encodeFunctionData(functionFragment: "transferAndCall(address,uint256)", values: [
		AddressLike,
		BigNumberish
	]): string;
	encodeFunctionData(functionFragment: "transferAndCall(address,uint256,bytes)", values: [
		AddressLike,
		BigNumberish,
		BytesLike
	]): string;
	encodeFunctionData(functionFragment: "transferFrom", values: [
		AddressLike,
		AddressLike,
		BigNumberish
	]): string;
	encodeFunctionData(functionFragment: "transferFromAndCall(address,address,uint256,bytes)", values: [
		AddressLike,
		AddressLike,
		BigNumberish,
		BytesLike
	]): string;
	encodeFunctionData(functionFragment: "transferFromAndCall(address,address,uint256)", values: [
		AddressLike,
		AddressLike,
		BigNumberish
	]): string;
	decodeFunctionResult(functionFragment: "allowance", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "approve", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "approveAndCall(address,uint256)", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "approveAndCall(address,uint256,bytes)", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "balanceOf", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "supportsInterface", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "totalSupply", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "transfer", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "transferAndCall(address,uint256)", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "transferAndCall(address,uint256,bytes)", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "transferFrom", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "transferFromAndCall(address,address,uint256,bytes)", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "transferFromAndCall(address,address,uint256)", data: BytesLike): Result;
}
declare namespace ApprovalEvent {
	type InputTuple = [
		owner: AddressLike,
		spender: AddressLike,
		value: BigNumberish
	];
	type OutputTuple = [
		owner: string,
		spender: string,
		value: bigint
	];
	interface OutputObject {
		owner: string;
		spender: string;
		value: bigint;
	}
	type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
	type Filter = TypedDeferredTopicFilter<Event>;
	type Log = TypedEventLog<Event>;
	type LogDescription = TypedLogDescription<Event>;
}
declare namespace TransferEvent {
	type InputTuple = [
		from: AddressLike,
		to: AddressLike,
		value: BigNumberish
	];
	type OutputTuple = [
		from: string,
		to: string,
		value: bigint
	];
	interface OutputObject {
		from: string;
		to: string;
		value: bigint;
	}
	type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
	type Filter = TypedDeferredTopicFilter<Event>;
	type Log = TypedEventLog<Event>;
	type LogDescription = TypedLogDescription<Event>;
}
export interface IERC1363 extends BaseContract {
	connect(runner?: ContractRunner | null): IERC1363;
	waitForDeployment(): Promise<this>;
	interface: IERC1363Interface;
	queryFilter<TCEvent extends TypedContractEvent>(event: TCEvent, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
	queryFilter<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
	on<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
	on<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
	once<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
	once<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
	listeners<TCEvent extends TypedContractEvent>(event: TCEvent): Promise<Array<TypedListener<TCEvent>>>;
	listeners(eventName?: string): Promise<Array<Listener>>;
	removeAllListeners<TCEvent extends TypedContractEvent>(event?: TCEvent): Promise<this>;
	allowance: TypedContractMethod<[
		owner: AddressLike,
		spender: AddressLike
	], [
		bigint
	], "view">;
	approve: TypedContractMethod<[
		spender: AddressLike,
		value: BigNumberish
	], [
		boolean
	], "nonpayable">;
	"approveAndCall(address,uint256)": TypedContractMethod<[
		spender: AddressLike,
		value: BigNumberish
	], [
		boolean
	], "nonpayable">;
	"approveAndCall(address,uint256,bytes)": TypedContractMethod<[
		spender: AddressLike,
		value: BigNumberish,
		data: BytesLike
	], [
		boolean
	], "nonpayable">;
	balanceOf: TypedContractMethod<[
		account: AddressLike
	], [
		bigint
	], "view">;
	supportsInterface: TypedContractMethod<[
		interfaceId: BytesLike
	], [
		boolean
	], "view">;
	totalSupply: TypedContractMethod<[
	], [
		bigint
	], "view">;
	transfer: TypedContractMethod<[
		to: AddressLike,
		value: BigNumberish
	], [
		boolean
	], "nonpayable">;
	"transferAndCall(address,uint256)": TypedContractMethod<[
		to: AddressLike,
		value: BigNumberish
	], [
		boolean
	], "nonpayable">;
	"transferAndCall(address,uint256,bytes)": TypedContractMethod<[
		to: AddressLike,
		value: BigNumberish,
		data: BytesLike
	], [
		boolean
	], "nonpayable">;
	transferFrom: TypedContractMethod<[
		from: AddressLike,
		to: AddressLike,
		value: BigNumberish
	], [
		boolean
	], "nonpayable">;
	"transferFromAndCall(address,address,uint256,bytes)": TypedContractMethod<[
		from: AddressLike,
		to: AddressLike,
		value: BigNumberish,
		data: BytesLike
	], [
		boolean
	], "nonpayable">;
	"transferFromAndCall(address,address,uint256)": TypedContractMethod<[
		from: AddressLike,
		to: AddressLike,
		value: BigNumberish
	], [
		boolean
	], "nonpayable">;
	getFunction<T extends ContractMethod = ContractMethod>(key: string | FunctionFragment): T;
	getFunction(nameOrSignature: "allowance"): TypedContractMethod<[
		owner: AddressLike,
		spender: AddressLike
	], [
		bigint
	], "view">;
	getFunction(nameOrSignature: "approve"): TypedContractMethod<[
		spender: AddressLike,
		value: BigNumberish
	], [
		boolean
	], "nonpayable">;
	getFunction(nameOrSignature: "approveAndCall(address,uint256)"): TypedContractMethod<[
		spender: AddressLike,
		value: BigNumberish
	], [
		boolean
	], "nonpayable">;
	getFunction(nameOrSignature: "approveAndCall(address,uint256,bytes)"): TypedContractMethod<[
		spender: AddressLike,
		value: BigNumberish,
		data: BytesLike
	], [
		boolean
	], "nonpayable">;
	getFunction(nameOrSignature: "balanceOf"): TypedContractMethod<[
		account: AddressLike
	], [
		bigint
	], "view">;
	getFunction(nameOrSignature: "supportsInterface"): TypedContractMethod<[
		interfaceId: BytesLike
	], [
		boolean
	], "view">;
	getFunction(nameOrSignature: "totalSupply"): TypedContractMethod<[
	], [
		bigint
	], "view">;
	getFunction(nameOrSignature: "transfer"): TypedContractMethod<[
		to: AddressLike,
		value: BigNumberish
	], [
		boolean
	], "nonpayable">;
	getFunction(nameOrSignature: "transferAndCall(address,uint256)"): TypedContractMethod<[
		to: AddressLike,
		value: BigNumberish
	], [
		boolean
	], "nonpayable">;
	getFunction(nameOrSignature: "transferAndCall(address,uint256,bytes)"): TypedContractMethod<[
		to: AddressLike,
		value: BigNumberish,
		data: BytesLike
	], [
		boolean
	], "nonpayable">;
	getFunction(nameOrSignature: "transferFrom"): TypedContractMethod<[
		from: AddressLike,
		to: AddressLike,
		value: BigNumberish
	], [
		boolean
	], "nonpayable">;
	getFunction(nameOrSignature: "transferFromAndCall(address,address,uint256,bytes)"): TypedContractMethod<[
		from: AddressLike,
		to: AddressLike,
		value: BigNumberish,
		data: BytesLike
	], [
		boolean
	], "nonpayable">;
	getFunction(nameOrSignature: "transferFromAndCall(address,address,uint256)"): TypedContractMethod<[
		from: AddressLike,
		to: AddressLike,
		value: BigNumberish
	], [
		boolean
	], "nonpayable">;
	getEvent(key: "Approval"): TypedContractEvent<ApprovalEvent.InputTuple, ApprovalEvent.OutputTuple, ApprovalEvent.OutputObject>;
	getEvent(key: "Transfer"): TypedContractEvent<TransferEvent.InputTuple, TransferEvent.OutputTuple, TransferEvent.OutputObject>;
	filters: {
		"Approval(address,address,uint256)": TypedContractEvent<ApprovalEvent.InputTuple, ApprovalEvent.OutputTuple, ApprovalEvent.OutputObject>;
		Approval: TypedContractEvent<ApprovalEvent.InputTuple, ApprovalEvent.OutputTuple, ApprovalEvent.OutputObject>;
		"Transfer(address,address,uint256)": TypedContractEvent<TransferEvent.InputTuple, TransferEvent.OutputTuple, TransferEvent.OutputObject>;
		Transfer: TypedContractEvent<TransferEvent.InputTuple, TransferEvent.OutputTuple, TransferEvent.OutputObject>;
	};
}
export interface IERC1967Interface extends Interface {
	getEvent(nameOrSignatureOrTopic: "AdminChanged" | "BeaconUpgraded" | "Upgraded"): EventFragment;
}
declare namespace AdminChangedEvent {
	type InputTuple = [
		previousAdmin: AddressLike,
		newAdmin: AddressLike
	];
	type OutputTuple = [
		previousAdmin: string,
		newAdmin: string
	];
	interface OutputObject {
		previousAdmin: string;
		newAdmin: string;
	}
	type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
	type Filter = TypedDeferredTopicFilter<Event>;
	type Log = TypedEventLog<Event>;
	type LogDescription = TypedLogDescription<Event>;
}
declare namespace BeaconUpgradedEvent {
	type InputTuple = [
		beacon: AddressLike
	];
	type OutputTuple = [
		beacon: string
	];
	interface OutputObject {
		beacon: string;
	}
	type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
	type Filter = TypedDeferredTopicFilter<Event>;
	type Log = TypedEventLog<Event>;
	type LogDescription = TypedLogDescription<Event>;
}
declare namespace UpgradedEvent {
	type InputTuple = [
		implementation: AddressLike
	];
	type OutputTuple = [
		implementation: string
	];
	interface OutputObject {
		implementation: string;
	}
	type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
	type Filter = TypedDeferredTopicFilter<Event>;
	type Log = TypedEventLog<Event>;
	type LogDescription = TypedLogDescription<Event>;
}
export interface IERC1967 extends BaseContract {
	connect(runner?: ContractRunner | null): IERC1967;
	waitForDeployment(): Promise<this>;
	interface: IERC1967Interface;
	queryFilter<TCEvent extends TypedContractEvent>(event: TCEvent, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
	queryFilter<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
	on<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
	on<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
	once<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
	once<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
	listeners<TCEvent extends TypedContractEvent>(event: TCEvent): Promise<Array<TypedListener<TCEvent>>>;
	listeners(eventName?: string): Promise<Array<Listener>>;
	removeAllListeners<TCEvent extends TypedContractEvent>(event?: TCEvent): Promise<this>;
	getFunction<T extends ContractMethod = ContractMethod>(key: string | FunctionFragment): T;
	getEvent(key: "AdminChanged"): TypedContractEvent<AdminChangedEvent.InputTuple, AdminChangedEvent.OutputTuple, AdminChangedEvent.OutputObject>;
	getEvent(key: "BeaconUpgraded"): TypedContractEvent<BeaconUpgradedEvent.InputTuple, BeaconUpgradedEvent.OutputTuple, BeaconUpgradedEvent.OutputObject>;
	getEvent(key: "Upgraded"): TypedContractEvent<UpgradedEvent.InputTuple, UpgradedEvent.OutputTuple, UpgradedEvent.OutputObject>;
	filters: {
		"AdminChanged(address,address)": TypedContractEvent<AdminChangedEvent.InputTuple, AdminChangedEvent.OutputTuple, AdminChangedEvent.OutputObject>;
		AdminChanged: TypedContractEvent<AdminChangedEvent.InputTuple, AdminChangedEvent.OutputTuple, AdminChangedEvent.OutputObject>;
		"BeaconUpgraded(address)": TypedContractEvent<BeaconUpgradedEvent.InputTuple, BeaconUpgradedEvent.OutputTuple, BeaconUpgradedEvent.OutputObject>;
		BeaconUpgraded: TypedContractEvent<BeaconUpgradedEvent.InputTuple, BeaconUpgradedEvent.OutputTuple, BeaconUpgradedEvent.OutputObject>;
		"Upgraded(address)": TypedContractEvent<UpgradedEvent.InputTuple, UpgradedEvent.OutputTuple, UpgradedEvent.OutputObject>;
		Upgraded: TypedContractEvent<UpgradedEvent.InputTuple, UpgradedEvent.OutputTuple, UpgradedEvent.OutputObject>;
	};
}
export interface IERC5267Interface extends Interface {
	getFunction(nameOrSignature: "eip712Domain"): FunctionFragment;
	getEvent(nameOrSignatureOrTopic: "EIP712DomainChanged"): EventFragment;
	encodeFunctionData(functionFragment: "eip712Domain", values?: undefined): string;
	decodeFunctionResult(functionFragment: "eip712Domain", data: BytesLike): Result;
}
declare namespace EIP712DomainChangedEvent {
	type InputTuple = [
	];
	type OutputTuple = [
	];
	interface OutputObject {
	}
	type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
	type Filter = TypedDeferredTopicFilter<Event>;
	type Log = TypedEventLog<Event>;
	type LogDescription = TypedLogDescription<Event>;
}
export interface IERC5267 extends BaseContract {
	connect(runner?: ContractRunner | null): IERC5267;
	waitForDeployment(): Promise<this>;
	interface: IERC5267Interface;
	queryFilter<TCEvent extends TypedContractEvent>(event: TCEvent, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
	queryFilter<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
	on<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
	on<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
	once<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
	once<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
	listeners<TCEvent extends TypedContractEvent>(event: TCEvent): Promise<Array<TypedListener<TCEvent>>>;
	listeners(eventName?: string): Promise<Array<Listener>>;
	removeAllListeners<TCEvent extends TypedContractEvent>(event?: TCEvent): Promise<this>;
	eip712Domain: TypedContractMethod<[
	], [
		[
			string,
			string,
			string,
			bigint,
			string,
			string,
			bigint[]
		] & {
			fields: string;
			name: string;
			version: string;
			chainId: bigint;
			verifyingContract: string;
			salt: string;
			extensions: bigint[];
		}
	], "view">;
	getFunction<T extends ContractMethod = ContractMethod>(key: string | FunctionFragment): T;
	getFunction(nameOrSignature: "eip712Domain"): TypedContractMethod<[
	], [
		[
			string,
			string,
			string,
			bigint,
			string,
			string,
			bigint[]
		] & {
			fields: string;
			name: string;
			version: string;
			chainId: bigint;
			verifyingContract: string;
			salt: string;
			extensions: bigint[];
		}
	], "view">;
	getEvent(key: "EIP712DomainChanged"): TypedContractEvent<EIP712DomainChangedEvent.InputTuple, EIP712DomainChangedEvent.OutputTuple, EIP712DomainChangedEvent.OutputObject>;
	filters: {
		"EIP712DomainChanged()": TypedContractEvent<EIP712DomainChangedEvent.InputTuple, EIP712DomainChangedEvent.OutputTuple, EIP712DomainChangedEvent.OutputObject>;
		EIP712DomainChanged: TypedContractEvent<EIP712DomainChangedEvent.InputTuple, EIP712DomainChangedEvent.OutputTuple, EIP712DomainChangedEvent.OutputObject>;
	};
}
export interface IERC1155ErrorsInterface extends Interface {
}
export interface IERC1155Errors extends BaseContract {
	connect(runner?: ContractRunner | null): IERC1155Errors;
	waitForDeployment(): Promise<this>;
	interface: IERC1155ErrorsInterface;
	queryFilter<TCEvent extends TypedContractEvent>(event: TCEvent, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
	queryFilter<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
	on<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
	on<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
	once<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
	once<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
	listeners<TCEvent extends TypedContractEvent>(event: TCEvent): Promise<Array<TypedListener<TCEvent>>>;
	listeners(eventName?: string): Promise<Array<Listener>>;
	removeAllListeners<TCEvent extends TypedContractEvent>(event?: TCEvent): Promise<this>;
	getFunction<T extends ContractMethod = ContractMethod>(key: string | FunctionFragment): T;
	filters: {};
}
export interface IERC20ErrorsInterface extends Interface {
}
export interface IERC20Errors extends BaseContract {
	connect(runner?: ContractRunner | null): IERC20Errors;
	waitForDeployment(): Promise<this>;
	interface: IERC20ErrorsInterface;
	queryFilter<TCEvent extends TypedContractEvent>(event: TCEvent, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
	queryFilter<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
	on<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
	on<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
	once<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
	once<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
	listeners<TCEvent extends TypedContractEvent>(event: TCEvent): Promise<Array<TypedListener<TCEvent>>>;
	listeners(eventName?: string): Promise<Array<Listener>>;
	removeAllListeners<TCEvent extends TypedContractEvent>(event?: TCEvent): Promise<this>;
	getFunction<T extends ContractMethod = ContractMethod>(key: string | FunctionFragment): T;
	filters: {};
}
export interface IERC721ErrorsInterface extends Interface {
}
export interface IERC721Errors extends BaseContract {
	connect(runner?: ContractRunner | null): IERC721Errors;
	waitForDeployment(): Promise<this>;
	interface: IERC721ErrorsInterface;
	queryFilter<TCEvent extends TypedContractEvent>(event: TCEvent, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
	queryFilter<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
	on<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
	on<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
	once<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
	once<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
	listeners<TCEvent extends TypedContractEvent>(event: TCEvent): Promise<Array<TypedListener<TCEvent>>>;
	listeners(eventName?: string): Promise<Array<Listener>>;
	removeAllListeners<TCEvent extends TypedContractEvent>(event?: TCEvent): Promise<this>;
	getFunction<T extends ContractMethod = ContractMethod>(key: string | FunctionFragment): T;
	filters: {};
}
export interface ERC1967UtilsInterface extends Interface {
}
export interface ERC1967Utils extends BaseContract {
	connect(runner?: ContractRunner | null): ERC1967Utils;
	waitForDeployment(): Promise<this>;
	interface: ERC1967UtilsInterface;
	queryFilter<TCEvent extends TypedContractEvent>(event: TCEvent, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
	queryFilter<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
	on<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
	on<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
	once<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
	once<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
	listeners<TCEvent extends TypedContractEvent>(event: TCEvent): Promise<Array<TypedListener<TCEvent>>>;
	listeners(eventName?: string): Promise<Array<Listener>>;
	removeAllListeners<TCEvent extends TypedContractEvent>(event?: TCEvent): Promise<this>;
	getFunction<T extends ContractMethod = ContractMethod>(key: string | FunctionFragment): T;
	filters: {};
}
export interface ProxyInterface extends Interface {
}
interface Proxy$1 extends BaseContract {
	connect(runner?: ContractRunner | null): Proxy$1;
	waitForDeployment(): Promise<this>;
	interface: ProxyInterface;
	queryFilter<TCEvent extends TypedContractEvent>(event: TCEvent, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
	queryFilter<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
	on<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
	on<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
	once<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
	once<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
	listeners<TCEvent extends TypedContractEvent>(event: TCEvent): Promise<Array<TypedListener<TCEvent>>>;
	listeners(eventName?: string): Promise<Array<Listener>>;
	removeAllListeners<TCEvent extends TypedContractEvent>(event?: TCEvent): Promise<this>;
	getFunction<T extends ContractMethod = ContractMethod>(key: string | FunctionFragment): T;
	filters: {};
}
export interface IBeaconInterface extends Interface {
	getFunction(nameOrSignature: "implementation"): FunctionFragment;
	encodeFunctionData(functionFragment: "implementation", values?: undefined): string;
	decodeFunctionResult(functionFragment: "implementation", data: BytesLike): Result;
}
export interface IBeacon extends BaseContract {
	connect(runner?: ContractRunner | null): IBeacon;
	waitForDeployment(): Promise<this>;
	interface: IBeaconInterface;
	queryFilter<TCEvent extends TypedContractEvent>(event: TCEvent, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
	queryFilter<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
	on<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
	on<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
	once<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
	once<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
	listeners<TCEvent extends TypedContractEvent>(event: TCEvent): Promise<Array<TypedListener<TCEvent>>>;
	listeners(eventName?: string): Promise<Array<Listener>>;
	removeAllListeners<TCEvent extends TypedContractEvent>(event?: TCEvent): Promise<this>;
	implementation: TypedContractMethod<[
	], [
		string
	], "view">;
	getFunction<T extends ContractMethod = ContractMethod>(key: string | FunctionFragment): T;
	getFunction(nameOrSignature: "implementation"): TypedContractMethod<[
	], [
		string
	], "view">;
	filters: {};
}
export interface ERC20Interface extends Interface {
	getFunction(nameOrSignature: "allowance" | "approve" | "balanceOf" | "decimals" | "name" | "symbol" | "totalSupply" | "transfer" | "transferFrom"): FunctionFragment;
	getEvent(nameOrSignatureOrTopic: "Approval" | "Transfer"): EventFragment;
	encodeFunctionData(functionFragment: "allowance", values: [
		AddressLike,
		AddressLike
	]): string;
	encodeFunctionData(functionFragment: "approve", values: [
		AddressLike,
		BigNumberish
	]): string;
	encodeFunctionData(functionFragment: "balanceOf", values: [
		AddressLike
	]): string;
	encodeFunctionData(functionFragment: "decimals", values?: undefined): string;
	encodeFunctionData(functionFragment: "name", values?: undefined): string;
	encodeFunctionData(functionFragment: "symbol", values?: undefined): string;
	encodeFunctionData(functionFragment: "totalSupply", values?: undefined): string;
	encodeFunctionData(functionFragment: "transfer", values: [
		AddressLike,
		BigNumberish
	]): string;
	encodeFunctionData(functionFragment: "transferFrom", values: [
		AddressLike,
		AddressLike,
		BigNumberish
	]): string;
	decodeFunctionResult(functionFragment: "allowance", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "approve", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "balanceOf", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "decimals", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "name", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "symbol", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "totalSupply", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "transfer", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "transferFrom", data: BytesLike): Result;
}
declare namespace ApprovalEvent$1 {
	type InputTuple = [
		owner: AddressLike,
		spender: AddressLike,
		value: BigNumberish
	];
	type OutputTuple = [
		owner: string,
		spender: string,
		value: bigint
	];
	interface OutputObject {
		owner: string;
		spender: string;
		value: bigint;
	}
	type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
	type Filter = TypedDeferredTopicFilter<Event>;
	type Log = TypedEventLog<Event>;
	type LogDescription = TypedLogDescription<Event>;
}
declare namespace TransferEvent$1 {
	type InputTuple = [
		from: AddressLike,
		to: AddressLike,
		value: BigNumberish
	];
	type OutputTuple = [
		from: string,
		to: string,
		value: bigint
	];
	interface OutputObject {
		from: string;
		to: string;
		value: bigint;
	}
	type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
	type Filter = TypedDeferredTopicFilter<Event>;
	type Log = TypedEventLog<Event>;
	type LogDescription = TypedLogDescription<Event>;
}
export interface ERC20 extends BaseContract {
	connect(runner?: ContractRunner | null): ERC20;
	waitForDeployment(): Promise<this>;
	interface: ERC20Interface;
	queryFilter<TCEvent extends TypedContractEvent>(event: TCEvent, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
	queryFilter<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
	on<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
	on<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
	once<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
	once<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
	listeners<TCEvent extends TypedContractEvent>(event: TCEvent): Promise<Array<TypedListener<TCEvent>>>;
	listeners(eventName?: string): Promise<Array<Listener>>;
	removeAllListeners<TCEvent extends TypedContractEvent>(event?: TCEvent): Promise<this>;
	allowance: TypedContractMethod<[
		owner: AddressLike,
		spender: AddressLike
	], [
		bigint
	], "view">;
	approve: TypedContractMethod<[
		spender: AddressLike,
		value: BigNumberish
	], [
		boolean
	], "nonpayable">;
	balanceOf: TypedContractMethod<[
		account: AddressLike
	], [
		bigint
	], "view">;
	decimals: TypedContractMethod<[
	], [
		bigint
	], "view">;
	name: TypedContractMethod<[
	], [
		string
	], "view">;
	symbol: TypedContractMethod<[
	], [
		string
	], "view">;
	totalSupply: TypedContractMethod<[
	], [
		bigint
	], "view">;
	transfer: TypedContractMethod<[
		to: AddressLike,
		value: BigNumberish
	], [
		boolean
	], "nonpayable">;
	transferFrom: TypedContractMethod<[
		from: AddressLike,
		to: AddressLike,
		value: BigNumberish
	], [
		boolean
	], "nonpayable">;
	getFunction<T extends ContractMethod = ContractMethod>(key: string | FunctionFragment): T;
	getFunction(nameOrSignature: "allowance"): TypedContractMethod<[
		owner: AddressLike,
		spender: AddressLike
	], [
		bigint
	], "view">;
	getFunction(nameOrSignature: "approve"): TypedContractMethod<[
		spender: AddressLike,
		value: BigNumberish
	], [
		boolean
	], "nonpayable">;
	getFunction(nameOrSignature: "balanceOf"): TypedContractMethod<[
		account: AddressLike
	], [
		bigint
	], "view">;
	getFunction(nameOrSignature: "decimals"): TypedContractMethod<[
	], [
		bigint
	], "view">;
	getFunction(nameOrSignature: "name"): TypedContractMethod<[
	], [
		string
	], "view">;
	getFunction(nameOrSignature: "symbol"): TypedContractMethod<[
	], [
		string
	], "view">;
	getFunction(nameOrSignature: "totalSupply"): TypedContractMethod<[
	], [
		bigint
	], "view">;
	getFunction(nameOrSignature: "transfer"): TypedContractMethod<[
		to: AddressLike,
		value: BigNumberish
	], [
		boolean
	], "nonpayable">;
	getFunction(nameOrSignature: "transferFrom"): TypedContractMethod<[
		from: AddressLike,
		to: AddressLike,
		value: BigNumberish
	], [
		boolean
	], "nonpayable">;
	getEvent(key: "Approval"): TypedContractEvent<ApprovalEvent$1.InputTuple, ApprovalEvent$1.OutputTuple, ApprovalEvent$1.OutputObject>;
	getEvent(key: "Transfer"): TypedContractEvent<TransferEvent$1.InputTuple, TransferEvent$1.OutputTuple, TransferEvent$1.OutputObject>;
	filters: {
		"Approval(address,address,uint256)": TypedContractEvent<ApprovalEvent$1.InputTuple, ApprovalEvent$1.OutputTuple, ApprovalEvent$1.OutputObject>;
		Approval: TypedContractEvent<ApprovalEvent$1.InputTuple, ApprovalEvent$1.OutputTuple, ApprovalEvent$1.OutputObject>;
		"Transfer(address,address,uint256)": TypedContractEvent<TransferEvent$1.InputTuple, TransferEvent$1.OutputTuple, TransferEvent$1.OutputObject>;
		Transfer: TypedContractEvent<TransferEvent$1.InputTuple, TransferEvent$1.OutputTuple, TransferEvent$1.OutputObject>;
	};
}
export interface IERC20Interface extends Interface {
	getFunction(nameOrSignature: "allowance" | "approve" | "balanceOf" | "totalSupply" | "transfer" | "transferFrom"): FunctionFragment;
	getEvent(nameOrSignatureOrTopic: "Approval" | "Transfer"): EventFragment;
	encodeFunctionData(functionFragment: "allowance", values: [
		AddressLike,
		AddressLike
	]): string;
	encodeFunctionData(functionFragment: "approve", values: [
		AddressLike,
		BigNumberish
	]): string;
	encodeFunctionData(functionFragment: "balanceOf", values: [
		AddressLike
	]): string;
	encodeFunctionData(functionFragment: "totalSupply", values?: undefined): string;
	encodeFunctionData(functionFragment: "transfer", values: [
		AddressLike,
		BigNumberish
	]): string;
	encodeFunctionData(functionFragment: "transferFrom", values: [
		AddressLike,
		AddressLike,
		BigNumberish
	]): string;
	decodeFunctionResult(functionFragment: "allowance", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "approve", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "balanceOf", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "totalSupply", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "transfer", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "transferFrom", data: BytesLike): Result;
}
declare namespace ApprovalEvent$2 {
	type InputTuple = [
		owner: AddressLike,
		spender: AddressLike,
		value: BigNumberish
	];
	type OutputTuple = [
		owner: string,
		spender: string,
		value: bigint
	];
	interface OutputObject {
		owner: string;
		spender: string;
		value: bigint;
	}
	type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
	type Filter = TypedDeferredTopicFilter<Event>;
	type Log = TypedEventLog<Event>;
	type LogDescription = TypedLogDescription<Event>;
}
declare namespace TransferEvent$2 {
	type InputTuple = [
		from: AddressLike,
		to: AddressLike,
		value: BigNumberish
	];
	type OutputTuple = [
		from: string,
		to: string,
		value: bigint
	];
	interface OutputObject {
		from: string;
		to: string;
		value: bigint;
	}
	type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
	type Filter = TypedDeferredTopicFilter<Event>;
	type Log = TypedEventLog<Event>;
	type LogDescription = TypedLogDescription<Event>;
}
export interface IERC20 extends BaseContract {
	connect(runner?: ContractRunner | null): IERC20;
	waitForDeployment(): Promise<this>;
	interface: IERC20Interface;
	queryFilter<TCEvent extends TypedContractEvent>(event: TCEvent, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
	queryFilter<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
	on<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
	on<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
	once<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
	once<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
	listeners<TCEvent extends TypedContractEvent>(event: TCEvent): Promise<Array<TypedListener<TCEvent>>>;
	listeners(eventName?: string): Promise<Array<Listener>>;
	removeAllListeners<TCEvent extends TypedContractEvent>(event?: TCEvent): Promise<this>;
	allowance: TypedContractMethod<[
		owner: AddressLike,
		spender: AddressLike
	], [
		bigint
	], "view">;
	approve: TypedContractMethod<[
		spender: AddressLike,
		value: BigNumberish
	], [
		boolean
	], "nonpayable">;
	balanceOf: TypedContractMethod<[
		account: AddressLike
	], [
		bigint
	], "view">;
	totalSupply: TypedContractMethod<[
	], [
		bigint
	], "view">;
	transfer: TypedContractMethod<[
		to: AddressLike,
		value: BigNumberish
	], [
		boolean
	], "nonpayable">;
	transferFrom: TypedContractMethod<[
		from: AddressLike,
		to: AddressLike,
		value: BigNumberish
	], [
		boolean
	], "nonpayable">;
	getFunction<T extends ContractMethod = ContractMethod>(key: string | FunctionFragment): T;
	getFunction(nameOrSignature: "allowance"): TypedContractMethod<[
		owner: AddressLike,
		spender: AddressLike
	], [
		bigint
	], "view">;
	getFunction(nameOrSignature: "approve"): TypedContractMethod<[
		spender: AddressLike,
		value: BigNumberish
	], [
		boolean
	], "nonpayable">;
	getFunction(nameOrSignature: "balanceOf"): TypedContractMethod<[
		account: AddressLike
	], [
		bigint
	], "view">;
	getFunction(nameOrSignature: "totalSupply"): TypedContractMethod<[
	], [
		bigint
	], "view">;
	getFunction(nameOrSignature: "transfer"): TypedContractMethod<[
		to: AddressLike,
		value: BigNumberish
	], [
		boolean
	], "nonpayable">;
	getFunction(nameOrSignature: "transferFrom"): TypedContractMethod<[
		from: AddressLike,
		to: AddressLike,
		value: BigNumberish
	], [
		boolean
	], "nonpayable">;
	getEvent(key: "Approval"): TypedContractEvent<ApprovalEvent$2.InputTuple, ApprovalEvent$2.OutputTuple, ApprovalEvent$2.OutputObject>;
	getEvent(key: "Transfer"): TypedContractEvent<TransferEvent$2.InputTuple, TransferEvent$2.OutputTuple, TransferEvent$2.OutputObject>;
	filters: {
		"Approval(address,address,uint256)": TypedContractEvent<ApprovalEvent$2.InputTuple, ApprovalEvent$2.OutputTuple, ApprovalEvent$2.OutputObject>;
		Approval: TypedContractEvent<ApprovalEvent$2.InputTuple, ApprovalEvent$2.OutputTuple, ApprovalEvent$2.OutputObject>;
		"Transfer(address,address,uint256)": TypedContractEvent<TransferEvent$2.InputTuple, TransferEvent$2.OutputTuple, TransferEvent$2.OutputObject>;
		Transfer: TypedContractEvent<TransferEvent$2.InputTuple, TransferEvent$2.OutputTuple, TransferEvent$2.OutputObject>;
	};
}
export interface ERC20BurnableInterface extends Interface {
	getFunction(nameOrSignature: "allowance" | "approve" | "balanceOf" | "burn" | "burnFrom" | "decimals" | "name" | "symbol" | "totalSupply" | "transfer" | "transferFrom"): FunctionFragment;
	getEvent(nameOrSignatureOrTopic: "Approval" | "Transfer"): EventFragment;
	encodeFunctionData(functionFragment: "allowance", values: [
		AddressLike,
		AddressLike
	]): string;
	encodeFunctionData(functionFragment: "approve", values: [
		AddressLike,
		BigNumberish
	]): string;
	encodeFunctionData(functionFragment: "balanceOf", values: [
		AddressLike
	]): string;
	encodeFunctionData(functionFragment: "burn", values: [
		BigNumberish
	]): string;
	encodeFunctionData(functionFragment: "burnFrom", values: [
		AddressLike,
		BigNumberish
	]): string;
	encodeFunctionData(functionFragment: "decimals", values?: undefined): string;
	encodeFunctionData(functionFragment: "name", values?: undefined): string;
	encodeFunctionData(functionFragment: "symbol", values?: undefined): string;
	encodeFunctionData(functionFragment: "totalSupply", values?: undefined): string;
	encodeFunctionData(functionFragment: "transfer", values: [
		AddressLike,
		BigNumberish
	]): string;
	encodeFunctionData(functionFragment: "transferFrom", values: [
		AddressLike,
		AddressLike,
		BigNumberish
	]): string;
	decodeFunctionResult(functionFragment: "allowance", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "approve", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "balanceOf", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "burn", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "burnFrom", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "decimals", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "name", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "symbol", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "totalSupply", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "transfer", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "transferFrom", data: BytesLike): Result;
}
declare namespace ApprovalEvent$3 {
	type InputTuple = [
		owner: AddressLike,
		spender: AddressLike,
		value: BigNumberish
	];
	type OutputTuple = [
		owner: string,
		spender: string,
		value: bigint
	];
	interface OutputObject {
		owner: string;
		spender: string;
		value: bigint;
	}
	type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
	type Filter = TypedDeferredTopicFilter<Event>;
	type Log = TypedEventLog<Event>;
	type LogDescription = TypedLogDescription<Event>;
}
declare namespace TransferEvent$3 {
	type InputTuple = [
		from: AddressLike,
		to: AddressLike,
		value: BigNumberish
	];
	type OutputTuple = [
		from: string,
		to: string,
		value: bigint
	];
	interface OutputObject {
		from: string;
		to: string;
		value: bigint;
	}
	type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
	type Filter = TypedDeferredTopicFilter<Event>;
	type Log = TypedEventLog<Event>;
	type LogDescription = TypedLogDescription<Event>;
}
export interface ERC20Burnable extends BaseContract {
	connect(runner?: ContractRunner | null): ERC20Burnable;
	waitForDeployment(): Promise<this>;
	interface: ERC20BurnableInterface;
	queryFilter<TCEvent extends TypedContractEvent>(event: TCEvent, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
	queryFilter<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
	on<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
	on<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
	once<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
	once<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
	listeners<TCEvent extends TypedContractEvent>(event: TCEvent): Promise<Array<TypedListener<TCEvent>>>;
	listeners(eventName?: string): Promise<Array<Listener>>;
	removeAllListeners<TCEvent extends TypedContractEvent>(event?: TCEvent): Promise<this>;
	allowance: TypedContractMethod<[
		owner: AddressLike,
		spender: AddressLike
	], [
		bigint
	], "view">;
	approve: TypedContractMethod<[
		spender: AddressLike,
		value: BigNumberish
	], [
		boolean
	], "nonpayable">;
	balanceOf: TypedContractMethod<[
		account: AddressLike
	], [
		bigint
	], "view">;
	burn: TypedContractMethod<[
		value: BigNumberish
	], [
		void
	], "nonpayable">;
	burnFrom: TypedContractMethod<[
		account: AddressLike,
		value: BigNumberish
	], [
		void
	], "nonpayable">;
	decimals: TypedContractMethod<[
	], [
		bigint
	], "view">;
	name: TypedContractMethod<[
	], [
		string
	], "view">;
	symbol: TypedContractMethod<[
	], [
		string
	], "view">;
	totalSupply: TypedContractMethod<[
	], [
		bigint
	], "view">;
	transfer: TypedContractMethod<[
		to: AddressLike,
		value: BigNumberish
	], [
		boolean
	], "nonpayable">;
	transferFrom: TypedContractMethod<[
		from: AddressLike,
		to: AddressLike,
		value: BigNumberish
	], [
		boolean
	], "nonpayable">;
	getFunction<T extends ContractMethod = ContractMethod>(key: string | FunctionFragment): T;
	getFunction(nameOrSignature: "allowance"): TypedContractMethod<[
		owner: AddressLike,
		spender: AddressLike
	], [
		bigint
	], "view">;
	getFunction(nameOrSignature: "approve"): TypedContractMethod<[
		spender: AddressLike,
		value: BigNumberish
	], [
		boolean
	], "nonpayable">;
	getFunction(nameOrSignature: "balanceOf"): TypedContractMethod<[
		account: AddressLike
	], [
		bigint
	], "view">;
	getFunction(nameOrSignature: "burn"): TypedContractMethod<[
		value: BigNumberish
	], [
		void
	], "nonpayable">;
	getFunction(nameOrSignature: "burnFrom"): TypedContractMethod<[
		account: AddressLike,
		value: BigNumberish
	], [
		void
	], "nonpayable">;
	getFunction(nameOrSignature: "decimals"): TypedContractMethod<[
	], [
		bigint
	], "view">;
	getFunction(nameOrSignature: "name"): TypedContractMethod<[
	], [
		string
	], "view">;
	getFunction(nameOrSignature: "symbol"): TypedContractMethod<[
	], [
		string
	], "view">;
	getFunction(nameOrSignature: "totalSupply"): TypedContractMethod<[
	], [
		bigint
	], "view">;
	getFunction(nameOrSignature: "transfer"): TypedContractMethod<[
		to: AddressLike,
		value: BigNumberish
	], [
		boolean
	], "nonpayable">;
	getFunction(nameOrSignature: "transferFrom"): TypedContractMethod<[
		from: AddressLike,
		to: AddressLike,
		value: BigNumberish
	], [
		boolean
	], "nonpayable">;
	getEvent(key: "Approval"): TypedContractEvent<ApprovalEvent$3.InputTuple, ApprovalEvent$3.OutputTuple, ApprovalEvent$3.OutputObject>;
	getEvent(key: "Transfer"): TypedContractEvent<TransferEvent$3.InputTuple, TransferEvent$3.OutputTuple, TransferEvent$3.OutputObject>;
	filters: {
		"Approval(address,address,uint256)": TypedContractEvent<ApprovalEvent$3.InputTuple, ApprovalEvent$3.OutputTuple, ApprovalEvent$3.OutputObject>;
		Approval: TypedContractEvent<ApprovalEvent$3.InputTuple, ApprovalEvent$3.OutputTuple, ApprovalEvent$3.OutputObject>;
		"Transfer(address,address,uint256)": TypedContractEvent<TransferEvent$3.InputTuple, TransferEvent$3.OutputTuple, TransferEvent$3.OutputObject>;
		Transfer: TypedContractEvent<TransferEvent$3.InputTuple, TransferEvent$3.OutputTuple, TransferEvent$3.OutputObject>;
	};
}
export interface ERC20PermitInterface extends Interface {
	getFunction(nameOrSignature: "DOMAIN_SEPARATOR" | "allowance" | "approve" | "balanceOf" | "decimals" | "eip712Domain" | "name" | "nonces" | "permit" | "symbol" | "totalSupply" | "transfer" | "transferFrom"): FunctionFragment;
	getEvent(nameOrSignatureOrTopic: "Approval" | "EIP712DomainChanged" | "Transfer"): EventFragment;
	encodeFunctionData(functionFragment: "DOMAIN_SEPARATOR", values?: undefined): string;
	encodeFunctionData(functionFragment: "allowance", values: [
		AddressLike,
		AddressLike
	]): string;
	encodeFunctionData(functionFragment: "approve", values: [
		AddressLike,
		BigNumberish
	]): string;
	encodeFunctionData(functionFragment: "balanceOf", values: [
		AddressLike
	]): string;
	encodeFunctionData(functionFragment: "decimals", values?: undefined): string;
	encodeFunctionData(functionFragment: "eip712Domain", values?: undefined): string;
	encodeFunctionData(functionFragment: "name", values?: undefined): string;
	encodeFunctionData(functionFragment: "nonces", values: [
		AddressLike
	]): string;
	encodeFunctionData(functionFragment: "permit", values: [
		AddressLike,
		AddressLike,
		BigNumberish,
		BigNumberish,
		BigNumberish,
		BytesLike,
		BytesLike
	]): string;
	encodeFunctionData(functionFragment: "symbol", values?: undefined): string;
	encodeFunctionData(functionFragment: "totalSupply", values?: undefined): string;
	encodeFunctionData(functionFragment: "transfer", values: [
		AddressLike,
		BigNumberish
	]): string;
	encodeFunctionData(functionFragment: "transferFrom", values: [
		AddressLike,
		AddressLike,
		BigNumberish
	]): string;
	decodeFunctionResult(functionFragment: "DOMAIN_SEPARATOR", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "allowance", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "approve", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "balanceOf", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "decimals", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "eip712Domain", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "name", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "nonces", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "permit", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "symbol", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "totalSupply", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "transfer", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "transferFrom", data: BytesLike): Result;
}
declare namespace ApprovalEvent$4 {
	type InputTuple = [
		owner: AddressLike,
		spender: AddressLike,
		value: BigNumberish
	];
	type OutputTuple = [
		owner: string,
		spender: string,
		value: bigint
	];
	interface OutputObject {
		owner: string;
		spender: string;
		value: bigint;
	}
	type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
	type Filter = TypedDeferredTopicFilter<Event>;
	type Log = TypedEventLog<Event>;
	type LogDescription = TypedLogDescription<Event>;
}
declare namespace EIP712DomainChangedEvent$1 {
	type InputTuple = [
	];
	type OutputTuple = [
	];
	interface OutputObject {
	}
	type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
	type Filter = TypedDeferredTopicFilter<Event>;
	type Log = TypedEventLog<Event>;
	type LogDescription = TypedLogDescription<Event>;
}
declare namespace TransferEvent$4 {
	type InputTuple = [
		from: AddressLike,
		to: AddressLike,
		value: BigNumberish
	];
	type OutputTuple = [
		from: string,
		to: string,
		value: bigint
	];
	interface OutputObject {
		from: string;
		to: string;
		value: bigint;
	}
	type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
	type Filter = TypedDeferredTopicFilter<Event>;
	type Log = TypedEventLog<Event>;
	type LogDescription = TypedLogDescription<Event>;
}
export interface ERC20Permit extends BaseContract {
	connect(runner?: ContractRunner | null): ERC20Permit;
	waitForDeployment(): Promise<this>;
	interface: ERC20PermitInterface;
	queryFilter<TCEvent extends TypedContractEvent>(event: TCEvent, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
	queryFilter<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
	on<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
	on<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
	once<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
	once<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
	listeners<TCEvent extends TypedContractEvent>(event: TCEvent): Promise<Array<TypedListener<TCEvent>>>;
	listeners(eventName?: string): Promise<Array<Listener>>;
	removeAllListeners<TCEvent extends TypedContractEvent>(event?: TCEvent): Promise<this>;
	DOMAIN_SEPARATOR: TypedContractMethod<[
	], [
		string
	], "view">;
	allowance: TypedContractMethod<[
		owner: AddressLike,
		spender: AddressLike
	], [
		bigint
	], "view">;
	approve: TypedContractMethod<[
		spender: AddressLike,
		value: BigNumberish
	], [
		boolean
	], "nonpayable">;
	balanceOf: TypedContractMethod<[
		account: AddressLike
	], [
		bigint
	], "view">;
	decimals: TypedContractMethod<[
	], [
		bigint
	], "view">;
	eip712Domain: TypedContractMethod<[
	], [
		[
			string,
			string,
			string,
			bigint,
			string,
			string,
			bigint[]
		] & {
			fields: string;
			name: string;
			version: string;
			chainId: bigint;
			verifyingContract: string;
			salt: string;
			extensions: bigint[];
		}
	], "view">;
	name: TypedContractMethod<[
	], [
		string
	], "view">;
	nonces: TypedContractMethod<[
		owner: AddressLike
	], [
		bigint
	], "view">;
	permit: TypedContractMethod<[
		owner: AddressLike,
		spender: AddressLike,
		value: BigNumberish,
		deadline: BigNumberish,
		v: BigNumberish,
		r: BytesLike,
		s: BytesLike
	], [
		void
	], "nonpayable">;
	symbol: TypedContractMethod<[
	], [
		string
	], "view">;
	totalSupply: TypedContractMethod<[
	], [
		bigint
	], "view">;
	transfer: TypedContractMethod<[
		to: AddressLike,
		value: BigNumberish
	], [
		boolean
	], "nonpayable">;
	transferFrom: TypedContractMethod<[
		from: AddressLike,
		to: AddressLike,
		value: BigNumberish
	], [
		boolean
	], "nonpayable">;
	getFunction<T extends ContractMethod = ContractMethod>(key: string | FunctionFragment): T;
	getFunction(nameOrSignature: "DOMAIN_SEPARATOR"): TypedContractMethod<[
	], [
		string
	], "view">;
	getFunction(nameOrSignature: "allowance"): TypedContractMethod<[
		owner: AddressLike,
		spender: AddressLike
	], [
		bigint
	], "view">;
	getFunction(nameOrSignature: "approve"): TypedContractMethod<[
		spender: AddressLike,
		value: BigNumberish
	], [
		boolean
	], "nonpayable">;
	getFunction(nameOrSignature: "balanceOf"): TypedContractMethod<[
		account: AddressLike
	], [
		bigint
	], "view">;
	getFunction(nameOrSignature: "decimals"): TypedContractMethod<[
	], [
		bigint
	], "view">;
	getFunction(nameOrSignature: "eip712Domain"): TypedContractMethod<[
	], [
		[
			string,
			string,
			string,
			bigint,
			string,
			string,
			bigint[]
		] & {
			fields: string;
			name: string;
			version: string;
			chainId: bigint;
			verifyingContract: string;
			salt: string;
			extensions: bigint[];
		}
	], "view">;
	getFunction(nameOrSignature: "name"): TypedContractMethod<[
	], [
		string
	], "view">;
	getFunction(nameOrSignature: "nonces"): TypedContractMethod<[
		owner: AddressLike
	], [
		bigint
	], "view">;
	getFunction(nameOrSignature: "permit"): TypedContractMethod<[
		owner: AddressLike,
		spender: AddressLike,
		value: BigNumberish,
		deadline: BigNumberish,
		v: BigNumberish,
		r: BytesLike,
		s: BytesLike
	], [
		void
	], "nonpayable">;
	getFunction(nameOrSignature: "symbol"): TypedContractMethod<[
	], [
		string
	], "view">;
	getFunction(nameOrSignature: "totalSupply"): TypedContractMethod<[
	], [
		bigint
	], "view">;
	getFunction(nameOrSignature: "transfer"): TypedContractMethod<[
		to: AddressLike,
		value: BigNumberish
	], [
		boolean
	], "nonpayable">;
	getFunction(nameOrSignature: "transferFrom"): TypedContractMethod<[
		from: AddressLike,
		to: AddressLike,
		value: BigNumberish
	], [
		boolean
	], "nonpayable">;
	getEvent(key: "Approval"): TypedContractEvent<ApprovalEvent$4.InputTuple, ApprovalEvent$4.OutputTuple, ApprovalEvent$4.OutputObject>;
	getEvent(key: "EIP712DomainChanged"): TypedContractEvent<EIP712DomainChangedEvent$1.InputTuple, EIP712DomainChangedEvent$1.OutputTuple, EIP712DomainChangedEvent$1.OutputObject>;
	getEvent(key: "Transfer"): TypedContractEvent<TransferEvent$4.InputTuple, TransferEvent$4.OutputTuple, TransferEvent$4.OutputObject>;
	filters: {
		"Approval(address,address,uint256)": TypedContractEvent<ApprovalEvent$4.InputTuple, ApprovalEvent$4.OutputTuple, ApprovalEvent$4.OutputObject>;
		Approval: TypedContractEvent<ApprovalEvent$4.InputTuple, ApprovalEvent$4.OutputTuple, ApprovalEvent$4.OutputObject>;
		"EIP712DomainChanged()": TypedContractEvent<EIP712DomainChangedEvent$1.InputTuple, EIP712DomainChangedEvent$1.OutputTuple, EIP712DomainChangedEvent$1.OutputObject>;
		EIP712DomainChanged: TypedContractEvent<EIP712DomainChangedEvent$1.InputTuple, EIP712DomainChangedEvent$1.OutputTuple, EIP712DomainChangedEvent$1.OutputObject>;
		"Transfer(address,address,uint256)": TypedContractEvent<TransferEvent$4.InputTuple, TransferEvent$4.OutputTuple, TransferEvent$4.OutputObject>;
		Transfer: TypedContractEvent<TransferEvent$4.InputTuple, TransferEvent$4.OutputTuple, TransferEvent$4.OutputObject>;
	};
}
export interface IERC20MetadataInterface extends Interface {
	getFunction(nameOrSignature: "allowance" | "approve" | "balanceOf" | "decimals" | "name" | "symbol" | "totalSupply" | "transfer" | "transferFrom"): FunctionFragment;
	getEvent(nameOrSignatureOrTopic: "Approval" | "Transfer"): EventFragment;
	encodeFunctionData(functionFragment: "allowance", values: [
		AddressLike,
		AddressLike
	]): string;
	encodeFunctionData(functionFragment: "approve", values: [
		AddressLike,
		BigNumberish
	]): string;
	encodeFunctionData(functionFragment: "balanceOf", values: [
		AddressLike
	]): string;
	encodeFunctionData(functionFragment: "decimals", values?: undefined): string;
	encodeFunctionData(functionFragment: "name", values?: undefined): string;
	encodeFunctionData(functionFragment: "symbol", values?: undefined): string;
	encodeFunctionData(functionFragment: "totalSupply", values?: undefined): string;
	encodeFunctionData(functionFragment: "transfer", values: [
		AddressLike,
		BigNumberish
	]): string;
	encodeFunctionData(functionFragment: "transferFrom", values: [
		AddressLike,
		AddressLike,
		BigNumberish
	]): string;
	decodeFunctionResult(functionFragment: "allowance", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "approve", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "balanceOf", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "decimals", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "name", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "symbol", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "totalSupply", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "transfer", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "transferFrom", data: BytesLike): Result;
}
declare namespace ApprovalEvent$5 {
	type InputTuple = [
		owner: AddressLike,
		spender: AddressLike,
		value: BigNumberish
	];
	type OutputTuple = [
		owner: string,
		spender: string,
		value: bigint
	];
	interface OutputObject {
		owner: string;
		spender: string;
		value: bigint;
	}
	type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
	type Filter = TypedDeferredTopicFilter<Event>;
	type Log = TypedEventLog<Event>;
	type LogDescription = TypedLogDescription<Event>;
}
declare namespace TransferEvent$5 {
	type InputTuple = [
		from: AddressLike,
		to: AddressLike,
		value: BigNumberish
	];
	type OutputTuple = [
		from: string,
		to: string,
		value: bigint
	];
	interface OutputObject {
		from: string;
		to: string;
		value: bigint;
	}
	type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
	type Filter = TypedDeferredTopicFilter<Event>;
	type Log = TypedEventLog<Event>;
	type LogDescription = TypedLogDescription<Event>;
}
export interface IERC20Metadata extends BaseContract {
	connect(runner?: ContractRunner | null): IERC20Metadata;
	waitForDeployment(): Promise<this>;
	interface: IERC20MetadataInterface;
	queryFilter<TCEvent extends TypedContractEvent>(event: TCEvent, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
	queryFilter<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
	on<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
	on<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
	once<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
	once<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
	listeners<TCEvent extends TypedContractEvent>(event: TCEvent): Promise<Array<TypedListener<TCEvent>>>;
	listeners(eventName?: string): Promise<Array<Listener>>;
	removeAllListeners<TCEvent extends TypedContractEvent>(event?: TCEvent): Promise<this>;
	allowance: TypedContractMethod<[
		owner: AddressLike,
		spender: AddressLike
	], [
		bigint
	], "view">;
	approve: TypedContractMethod<[
		spender: AddressLike,
		value: BigNumberish
	], [
		boolean
	], "nonpayable">;
	balanceOf: TypedContractMethod<[
		account: AddressLike
	], [
		bigint
	], "view">;
	decimals: TypedContractMethod<[
	], [
		bigint
	], "view">;
	name: TypedContractMethod<[
	], [
		string
	], "view">;
	symbol: TypedContractMethod<[
	], [
		string
	], "view">;
	totalSupply: TypedContractMethod<[
	], [
		bigint
	], "view">;
	transfer: TypedContractMethod<[
		to: AddressLike,
		value: BigNumberish
	], [
		boolean
	], "nonpayable">;
	transferFrom: TypedContractMethod<[
		from: AddressLike,
		to: AddressLike,
		value: BigNumberish
	], [
		boolean
	], "nonpayable">;
	getFunction<T extends ContractMethod = ContractMethod>(key: string | FunctionFragment): T;
	getFunction(nameOrSignature: "allowance"): TypedContractMethod<[
		owner: AddressLike,
		spender: AddressLike
	], [
		bigint
	], "view">;
	getFunction(nameOrSignature: "approve"): TypedContractMethod<[
		spender: AddressLike,
		value: BigNumberish
	], [
		boolean
	], "nonpayable">;
	getFunction(nameOrSignature: "balanceOf"): TypedContractMethod<[
		account: AddressLike
	], [
		bigint
	], "view">;
	getFunction(nameOrSignature: "decimals"): TypedContractMethod<[
	], [
		bigint
	], "view">;
	getFunction(nameOrSignature: "name"): TypedContractMethod<[
	], [
		string
	], "view">;
	getFunction(nameOrSignature: "symbol"): TypedContractMethod<[
	], [
		string
	], "view">;
	getFunction(nameOrSignature: "totalSupply"): TypedContractMethod<[
	], [
		bigint
	], "view">;
	getFunction(nameOrSignature: "transfer"): TypedContractMethod<[
		to: AddressLike,
		value: BigNumberish
	], [
		boolean
	], "nonpayable">;
	getFunction(nameOrSignature: "transferFrom"): TypedContractMethod<[
		from: AddressLike,
		to: AddressLike,
		value: BigNumberish
	], [
		boolean
	], "nonpayable">;
	getEvent(key: "Approval"): TypedContractEvent<ApprovalEvent$5.InputTuple, ApprovalEvent$5.OutputTuple, ApprovalEvent$5.OutputObject>;
	getEvent(key: "Transfer"): TypedContractEvent<TransferEvent$5.InputTuple, TransferEvent$5.OutputTuple, TransferEvent$5.OutputObject>;
	filters: {
		"Approval(address,address,uint256)": TypedContractEvent<ApprovalEvent$5.InputTuple, ApprovalEvent$5.OutputTuple, ApprovalEvent$5.OutputObject>;
		Approval: TypedContractEvent<ApprovalEvent$5.InputTuple, ApprovalEvent$5.OutputTuple, ApprovalEvent$5.OutputObject>;
		"Transfer(address,address,uint256)": TypedContractEvent<TransferEvent$5.InputTuple, TransferEvent$5.OutputTuple, TransferEvent$5.OutputObject>;
		Transfer: TypedContractEvent<TransferEvent$5.InputTuple, TransferEvent$5.OutputTuple, TransferEvent$5.OutputObject>;
	};
}
export interface IERC20PermitInterface extends Interface {
	getFunction(nameOrSignature: "DOMAIN_SEPARATOR" | "nonces" | "permit"): FunctionFragment;
	encodeFunctionData(functionFragment: "DOMAIN_SEPARATOR", values?: undefined): string;
	encodeFunctionData(functionFragment: "nonces", values: [
		AddressLike
	]): string;
	encodeFunctionData(functionFragment: "permit", values: [
		AddressLike,
		AddressLike,
		BigNumberish,
		BigNumberish,
		BigNumberish,
		BytesLike,
		BytesLike
	]): string;
	decodeFunctionResult(functionFragment: "DOMAIN_SEPARATOR", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "nonces", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "permit", data: BytesLike): Result;
}
export interface IERC20Permit extends BaseContract {
	connect(runner?: ContractRunner | null): IERC20Permit;
	waitForDeployment(): Promise<this>;
	interface: IERC20PermitInterface;
	queryFilter<TCEvent extends TypedContractEvent>(event: TCEvent, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
	queryFilter<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
	on<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
	on<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
	once<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
	once<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
	listeners<TCEvent extends TypedContractEvent>(event: TCEvent): Promise<Array<TypedListener<TCEvent>>>;
	listeners(eventName?: string): Promise<Array<Listener>>;
	removeAllListeners<TCEvent extends TypedContractEvent>(event?: TCEvent): Promise<this>;
	DOMAIN_SEPARATOR: TypedContractMethod<[
	], [
		string
	], "view">;
	nonces: TypedContractMethod<[
		owner: AddressLike
	], [
		bigint
	], "view">;
	permit: TypedContractMethod<[
		owner: AddressLike,
		spender: AddressLike,
		value: BigNumberish,
		deadline: BigNumberish,
		v: BigNumberish,
		r: BytesLike,
		s: BytesLike
	], [
		void
	], "nonpayable">;
	getFunction<T extends ContractMethod = ContractMethod>(key: string | FunctionFragment): T;
	getFunction(nameOrSignature: "DOMAIN_SEPARATOR"): TypedContractMethod<[
	], [
		string
	], "view">;
	getFunction(nameOrSignature: "nonces"): TypedContractMethod<[
		owner: AddressLike
	], [
		bigint
	], "view">;
	getFunction(nameOrSignature: "permit"): TypedContractMethod<[
		owner: AddressLike,
		spender: AddressLike,
		value: BigNumberish,
		deadline: BigNumberish,
		v: BigNumberish,
		r: BytesLike,
		s: BytesLike
	], [
		void
	], "nonpayable">;
	filters: {};
}
export interface SafeERC20Interface extends Interface {
}
export interface SafeERC20 extends BaseContract {
	connect(runner?: ContractRunner | null): SafeERC20;
	waitForDeployment(): Promise<this>;
	interface: SafeERC20Interface;
	queryFilter<TCEvent extends TypedContractEvent>(event: TCEvent, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
	queryFilter<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
	on<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
	on<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
	once<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
	once<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
	listeners<TCEvent extends TypedContractEvent>(event: TCEvent): Promise<Array<TypedListener<TCEvent>>>;
	listeners(eventName?: string): Promise<Array<Listener>>;
	removeAllListeners<TCEvent extends TypedContractEvent>(event?: TCEvent): Promise<this>;
	getFunction<T extends ContractMethod = ContractMethod>(key: string | FunctionFragment): T;
	filters: {};
}
export interface AddressInterface extends Interface {
}
export interface Address extends BaseContract {
	connect(runner?: ContractRunner | null): Address;
	waitForDeployment(): Promise<this>;
	interface: AddressInterface;
	queryFilter<TCEvent extends TypedContractEvent>(event: TCEvent, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
	queryFilter<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
	on<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
	on<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
	once<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
	once<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
	listeners<TCEvent extends TypedContractEvent>(event: TCEvent): Promise<Array<TypedListener<TCEvent>>>;
	listeners(eventName?: string): Promise<Array<Listener>>;
	removeAllListeners<TCEvent extends TypedContractEvent>(event?: TCEvent): Promise<this>;
	getFunction<T extends ContractMethod = ContractMethod>(key: string | FunctionFragment): T;
	filters: {};
}
export interface ErrorsInterface extends Interface {
}
export interface Errors extends BaseContract {
	connect(runner?: ContractRunner | null): Errors;
	waitForDeployment(): Promise<this>;
	interface: ErrorsInterface;
	queryFilter<TCEvent extends TypedContractEvent>(event: TCEvent, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
	queryFilter<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
	on<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
	on<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
	once<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
	once<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
	listeners<TCEvent extends TypedContractEvent>(event: TCEvent): Promise<Array<TypedListener<TCEvent>>>;
	listeners(eventName?: string): Promise<Array<Listener>>;
	removeAllListeners<TCEvent extends TypedContractEvent>(event?: TCEvent): Promise<this>;
	getFunction<T extends ContractMethod = ContractMethod>(key: string | FunctionFragment): T;
	filters: {};
}
export interface NoncesInterface extends Interface {
	getFunction(nameOrSignature: "nonces"): FunctionFragment;
	encodeFunctionData(functionFragment: "nonces", values: [
		AddressLike
	]): string;
	decodeFunctionResult(functionFragment: "nonces", data: BytesLike): Result;
}
export interface Nonces extends BaseContract {
	connect(runner?: ContractRunner | null): Nonces;
	waitForDeployment(): Promise<this>;
	interface: NoncesInterface;
	queryFilter<TCEvent extends TypedContractEvent>(event: TCEvent, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
	queryFilter<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
	on<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
	on<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
	once<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
	once<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
	listeners<TCEvent extends TypedContractEvent>(event: TCEvent): Promise<Array<TypedListener<TCEvent>>>;
	listeners(eventName?: string): Promise<Array<Listener>>;
	removeAllListeners<TCEvent extends TypedContractEvent>(event?: TCEvent): Promise<this>;
	nonces: TypedContractMethod<[
		owner: AddressLike
	], [
		bigint
	], "view">;
	getFunction<T extends ContractMethod = ContractMethod>(key: string | FunctionFragment): T;
	getFunction(nameOrSignature: "nonces"): TypedContractMethod<[
		owner: AddressLike
	], [
		bigint
	], "view">;
	filters: {};
}
export interface ShortStringsInterface extends Interface {
}
export interface ShortStrings extends BaseContract {
	connect(runner?: ContractRunner | null): ShortStrings;
	waitForDeployment(): Promise<this>;
	interface: ShortStringsInterface;
	queryFilter<TCEvent extends TypedContractEvent>(event: TCEvent, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
	queryFilter<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
	on<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
	on<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
	once<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
	once<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
	listeners<TCEvent extends TypedContractEvent>(event: TCEvent): Promise<Array<TypedListener<TCEvent>>>;
	listeners(eventName?: string): Promise<Array<Listener>>;
	removeAllListeners<TCEvent extends TypedContractEvent>(event?: TCEvent): Promise<this>;
	getFunction<T extends ContractMethod = ContractMethod>(key: string | FunctionFragment): T;
	filters: {};
}
export interface StringsInterface extends Interface {
}
export interface Strings extends BaseContract {
	connect(runner?: ContractRunner | null): Strings;
	waitForDeployment(): Promise<this>;
	interface: StringsInterface;
	queryFilter<TCEvent extends TypedContractEvent>(event: TCEvent, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
	queryFilter<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
	on<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
	on<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
	once<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
	once<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
	listeners<TCEvent extends TypedContractEvent>(event: TCEvent): Promise<Array<TypedListener<TCEvent>>>;
	listeners(eventName?: string): Promise<Array<Listener>>;
	removeAllListeners<TCEvent extends TypedContractEvent>(event?: TCEvent): Promise<this>;
	getFunction<T extends ContractMethod = ContractMethod>(key: string | FunctionFragment): T;
	filters: {};
}
export interface ECDSAInterface extends Interface {
}
export interface ECDSA extends BaseContract {
	connect(runner?: ContractRunner | null): ECDSA;
	waitForDeployment(): Promise<this>;
	interface: ECDSAInterface;
	queryFilter<TCEvent extends TypedContractEvent>(event: TCEvent, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
	queryFilter<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
	on<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
	on<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
	once<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
	once<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
	listeners<TCEvent extends TypedContractEvent>(event: TCEvent): Promise<Array<TypedListener<TCEvent>>>;
	listeners(eventName?: string): Promise<Array<Listener>>;
	removeAllListeners<TCEvent extends TypedContractEvent>(event?: TCEvent): Promise<this>;
	getFunction<T extends ContractMethod = ContractMethod>(key: string | FunctionFragment): T;
	filters: {};
}
export interface EIP712Interface extends Interface {
	getFunction(nameOrSignature: "eip712Domain"): FunctionFragment;
	getEvent(nameOrSignatureOrTopic: "EIP712DomainChanged"): EventFragment;
	encodeFunctionData(functionFragment: "eip712Domain", values?: undefined): string;
	decodeFunctionResult(functionFragment: "eip712Domain", data: BytesLike): Result;
}
declare namespace EIP712DomainChangedEvent$2 {
	type InputTuple = [
	];
	type OutputTuple = [
	];
	interface OutputObject {
	}
	type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
	type Filter = TypedDeferredTopicFilter<Event>;
	type Log = TypedEventLog<Event>;
	type LogDescription = TypedLogDescription<Event>;
}
export interface EIP712 extends BaseContract {
	connect(runner?: ContractRunner | null): EIP712;
	waitForDeployment(): Promise<this>;
	interface: EIP712Interface;
	queryFilter<TCEvent extends TypedContractEvent>(event: TCEvent, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
	queryFilter<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
	on<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
	on<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
	once<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
	once<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
	listeners<TCEvent extends TypedContractEvent>(event: TCEvent): Promise<Array<TypedListener<TCEvent>>>;
	listeners(eventName?: string): Promise<Array<Listener>>;
	removeAllListeners<TCEvent extends TypedContractEvent>(event?: TCEvent): Promise<this>;
	eip712Domain: TypedContractMethod<[
	], [
		[
			string,
			string,
			string,
			bigint,
			string,
			string,
			bigint[]
		] & {
			fields: string;
			name: string;
			version: string;
			chainId: bigint;
			verifyingContract: string;
			salt: string;
			extensions: bigint[];
		}
	], "view">;
	getFunction<T extends ContractMethod = ContractMethod>(key: string | FunctionFragment): T;
	getFunction(nameOrSignature: "eip712Domain"): TypedContractMethod<[
	], [
		[
			string,
			string,
			string,
			bigint,
			string,
			string,
			bigint[]
		] & {
			fields: string;
			name: string;
			version: string;
			chainId: bigint;
			verifyingContract: string;
			salt: string;
			extensions: bigint[];
		}
	], "view">;
	getEvent(key: "EIP712DomainChanged"): TypedContractEvent<EIP712DomainChangedEvent$2.InputTuple, EIP712DomainChangedEvent$2.OutputTuple, EIP712DomainChangedEvent$2.OutputObject>;
	filters: {
		"EIP712DomainChanged()": TypedContractEvent<EIP712DomainChangedEvent$2.InputTuple, EIP712DomainChangedEvent$2.OutputTuple, EIP712DomainChangedEvent$2.OutputObject>;
		EIP712DomainChanged: TypedContractEvent<EIP712DomainChangedEvent$2.InputTuple, EIP712DomainChangedEvent$2.OutputTuple, EIP712DomainChangedEvent$2.OutputObject>;
	};
}
export interface IERC165Interface extends Interface {
	getFunction(nameOrSignature: "supportsInterface"): FunctionFragment;
	encodeFunctionData(functionFragment: "supportsInterface", values: [
		BytesLike
	]): string;
	decodeFunctionResult(functionFragment: "supportsInterface", data: BytesLike): Result;
}
export interface IERC165 extends BaseContract {
	connect(runner?: ContractRunner | null): IERC165;
	waitForDeployment(): Promise<this>;
	interface: IERC165Interface;
	queryFilter<TCEvent extends TypedContractEvent>(event: TCEvent, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
	queryFilter<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
	on<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
	on<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
	once<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
	once<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
	listeners<TCEvent extends TypedContractEvent>(event: TCEvent): Promise<Array<TypedListener<TCEvent>>>;
	listeners(eventName?: string): Promise<Array<Listener>>;
	removeAllListeners<TCEvent extends TypedContractEvent>(event?: TCEvent): Promise<this>;
	supportsInterface: TypedContractMethod<[
		interfaceId: BytesLike
	], [
		boolean
	], "view">;
	getFunction<T extends ContractMethod = ContractMethod>(key: string | FunctionFragment): T;
	getFunction(nameOrSignature: "supportsInterface"): TypedContractMethod<[
		interfaceId: BytesLike
	], [
		boolean
	], "view">;
	filters: {};
}
export interface SafeCastInterface extends Interface {
}
export interface SafeCast extends BaseContract {
	connect(runner?: ContractRunner | null): SafeCast;
	waitForDeployment(): Promise<this>;
	interface: SafeCastInterface;
	queryFilter<TCEvent extends TypedContractEvent>(event: TCEvent, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
	queryFilter<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
	on<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
	on<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
	once<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
	once<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
	listeners<TCEvent extends TypedContractEvent>(event: TCEvent): Promise<Array<TypedListener<TCEvent>>>;
	listeners(eventName?: string): Promise<Array<Listener>>;
	removeAllListeners<TCEvent extends TypedContractEvent>(event?: TCEvent): Promise<this>;
	getFunction<T extends ContractMethod = ContractMethod>(key: string | FunctionFragment): T;
	filters: {};
}
export interface OwnableUpgradeableInterface extends Interface {
	getFunction(nameOrSignature: "owner" | "renounceOwnership" | "transferOwnership"): FunctionFragment;
	getEvent(nameOrSignatureOrTopic: "Initialized" | "OwnershipTransferred"): EventFragment;
	encodeFunctionData(functionFragment: "owner", values?: undefined): string;
	encodeFunctionData(functionFragment: "renounceOwnership", values?: undefined): string;
	encodeFunctionData(functionFragment: "transferOwnership", values: [
		AddressLike
	]): string;
	decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "renounceOwnership", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "transferOwnership", data: BytesLike): Result;
}
declare namespace InitializedEvent {
	type InputTuple = [
		version: BigNumberish
	];
	type OutputTuple = [
		version: bigint
	];
	interface OutputObject {
		version: bigint;
	}
	type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
	type Filter = TypedDeferredTopicFilter<Event>;
	type Log = TypedEventLog<Event>;
	type LogDescription = TypedLogDescription<Event>;
}
declare namespace OwnershipTransferredEvent$1 {
	type InputTuple = [
		previousOwner: AddressLike,
		newOwner: AddressLike
	];
	type OutputTuple = [
		previousOwner: string,
		newOwner: string
	];
	interface OutputObject {
		previousOwner: string;
		newOwner: string;
	}
	type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
	type Filter = TypedDeferredTopicFilter<Event>;
	type Log = TypedEventLog<Event>;
	type LogDescription = TypedLogDescription<Event>;
}
export interface OwnableUpgradeable extends BaseContract {
	connect(runner?: ContractRunner | null): OwnableUpgradeable;
	waitForDeployment(): Promise<this>;
	interface: OwnableUpgradeableInterface;
	queryFilter<TCEvent extends TypedContractEvent>(event: TCEvent, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
	queryFilter<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
	on<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
	on<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
	once<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
	once<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
	listeners<TCEvent extends TypedContractEvent>(event: TCEvent): Promise<Array<TypedListener<TCEvent>>>;
	listeners(eventName?: string): Promise<Array<Listener>>;
	removeAllListeners<TCEvent extends TypedContractEvent>(event?: TCEvent): Promise<this>;
	owner: TypedContractMethod<[
	], [
		string
	], "view">;
	renounceOwnership: TypedContractMethod<[
	], [
		void
	], "nonpayable">;
	transferOwnership: TypedContractMethod<[
		newOwner: AddressLike
	], [
		void
	], "nonpayable">;
	getFunction<T extends ContractMethod = ContractMethod>(key: string | FunctionFragment): T;
	getFunction(nameOrSignature: "owner"): TypedContractMethod<[
	], [
		string
	], "view">;
	getFunction(nameOrSignature: "renounceOwnership"): TypedContractMethod<[
	], [
		void
	], "nonpayable">;
	getFunction(nameOrSignature: "transferOwnership"): TypedContractMethod<[
		newOwner: AddressLike
	], [
		void
	], "nonpayable">;
	getEvent(key: "Initialized"): TypedContractEvent<InitializedEvent.InputTuple, InitializedEvent.OutputTuple, InitializedEvent.OutputObject>;
	getEvent(key: "OwnershipTransferred"): TypedContractEvent<OwnershipTransferredEvent$1.InputTuple, OwnershipTransferredEvent$1.OutputTuple, OwnershipTransferredEvent$1.OutputObject>;
	filters: {
		"Initialized(uint64)": TypedContractEvent<InitializedEvent.InputTuple, InitializedEvent.OutputTuple, InitializedEvent.OutputObject>;
		Initialized: TypedContractEvent<InitializedEvent.InputTuple, InitializedEvent.OutputTuple, InitializedEvent.OutputObject>;
		"OwnershipTransferred(address,address)": TypedContractEvent<OwnershipTransferredEvent$1.InputTuple, OwnershipTransferredEvent$1.OutputTuple, OwnershipTransferredEvent$1.OutputObject>;
		OwnershipTransferred: TypedContractEvent<OwnershipTransferredEvent$1.InputTuple, OwnershipTransferredEvent$1.OutputTuple, OwnershipTransferredEvent$1.OutputObject>;
	};
}
export interface InitializableInterface extends Interface {
	getEvent(nameOrSignatureOrTopic: "Initialized"): EventFragment;
}
declare namespace InitializedEvent$1 {
	type InputTuple = [
		version: BigNumberish
	];
	type OutputTuple = [
		version: bigint
	];
	interface OutputObject {
		version: bigint;
	}
	type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
	type Filter = TypedDeferredTopicFilter<Event>;
	type Log = TypedEventLog<Event>;
	type LogDescription = TypedLogDescription<Event>;
}
export interface Initializable extends BaseContract {
	connect(runner?: ContractRunner | null): Initializable;
	waitForDeployment(): Promise<this>;
	interface: InitializableInterface;
	queryFilter<TCEvent extends TypedContractEvent>(event: TCEvent, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
	queryFilter<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
	on<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
	on<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
	once<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
	once<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
	listeners<TCEvent extends TypedContractEvent>(event: TCEvent): Promise<Array<TypedListener<TCEvent>>>;
	listeners(eventName?: string): Promise<Array<Listener>>;
	removeAllListeners<TCEvent extends TypedContractEvent>(event?: TCEvent): Promise<this>;
	getFunction<T extends ContractMethod = ContractMethod>(key: string | FunctionFragment): T;
	getEvent(key: "Initialized"): TypedContractEvent<InitializedEvent$1.InputTuple, InitializedEvent$1.OutputTuple, InitializedEvent$1.OutputObject>;
	filters: {
		"Initialized(uint64)": TypedContractEvent<InitializedEvent$1.InputTuple, InitializedEvent$1.OutputTuple, InitializedEvent$1.OutputObject>;
		Initialized: TypedContractEvent<InitializedEvent$1.InputTuple, InitializedEvent$1.OutputTuple, InitializedEvent$1.OutputObject>;
	};
}
export interface ContextUpgradeableInterface extends Interface {
	getEvent(nameOrSignatureOrTopic: "Initialized"): EventFragment;
}
declare namespace InitializedEvent$2 {
	type InputTuple = [
		version: BigNumberish
	];
	type OutputTuple = [
		version: bigint
	];
	interface OutputObject {
		version: bigint;
	}
	type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
	type Filter = TypedDeferredTopicFilter<Event>;
	type Log = TypedEventLog<Event>;
	type LogDescription = TypedLogDescription<Event>;
}
export interface ContextUpgradeable extends BaseContract {
	connect(runner?: ContractRunner | null): ContextUpgradeable;
	waitForDeployment(): Promise<this>;
	interface: ContextUpgradeableInterface;
	queryFilter<TCEvent extends TypedContractEvent>(event: TCEvent, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
	queryFilter<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
	on<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
	on<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
	once<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
	once<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
	listeners<TCEvent extends TypedContractEvent>(event: TCEvent): Promise<Array<TypedListener<TCEvent>>>;
	listeners(eventName?: string): Promise<Array<Listener>>;
	removeAllListeners<TCEvent extends TypedContractEvent>(event?: TCEvent): Promise<this>;
	getFunction<T extends ContractMethod = ContractMethod>(key: string | FunctionFragment): T;
	getEvent(key: "Initialized"): TypedContractEvent<InitializedEvent$2.InputTuple, InitializedEvent$2.OutputTuple, InitializedEvent$2.OutputObject>;
	filters: {
		"Initialized(uint64)": TypedContractEvent<InitializedEvent$2.InputTuple, InitializedEvent$2.OutputTuple, InitializedEvent$2.OutputObject>;
		Initialized: TypedContractEvent<InitializedEvent$2.InputTuple, InitializedEvent$2.OutputTuple, InitializedEvent$2.OutputObject>;
	};
}
export interface LockInterface extends Interface {
	getFunction(nameOrSignature: "owner" | "unlockTime" | "withdraw"): FunctionFragment;
	getEvent(nameOrSignatureOrTopic: "Withdrawal"): EventFragment;
	encodeFunctionData(functionFragment: "owner", values?: undefined): string;
	encodeFunctionData(functionFragment: "unlockTime", values?: undefined): string;
	encodeFunctionData(functionFragment: "withdraw", values?: undefined): string;
	decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "unlockTime", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "withdraw", data: BytesLike): Result;
}
declare namespace WithdrawalEvent {
	type InputTuple = [
		amount: BigNumberish,
		when: BigNumberish
	];
	type OutputTuple = [
		amount: bigint,
		when: bigint
	];
	interface OutputObject {
		amount: bigint;
		when: bigint;
	}
	type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
	type Filter = TypedDeferredTopicFilter<Event>;
	type Log = TypedEventLog<Event>;
	type LogDescription = TypedLogDescription<Event>;
}
interface Lock$1 extends BaseContract {
	connect(runner?: ContractRunner | null): Lock$1;
	waitForDeployment(): Promise<this>;
	interface: LockInterface;
	queryFilter<TCEvent extends TypedContractEvent>(event: TCEvent, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
	queryFilter<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
	on<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
	on<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
	once<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
	once<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
	listeners<TCEvent extends TypedContractEvent>(event: TCEvent): Promise<Array<TypedListener<TCEvent>>>;
	listeners(eventName?: string): Promise<Array<Listener>>;
	removeAllListeners<TCEvent extends TypedContractEvent>(event?: TCEvent): Promise<this>;
	owner: TypedContractMethod<[
	], [
		string
	], "view">;
	unlockTime: TypedContractMethod<[
	], [
		bigint
	], "view">;
	withdraw: TypedContractMethod<[
	], [
		void
	], "nonpayable">;
	getFunction<T extends ContractMethod = ContractMethod>(key: string | FunctionFragment): T;
	getFunction(nameOrSignature: "owner"): TypedContractMethod<[
	], [
		string
	], "view">;
	getFunction(nameOrSignature: "unlockTime"): TypedContractMethod<[
	], [
		bigint
	], "view">;
	getFunction(nameOrSignature: "withdraw"): TypedContractMethod<[
	], [
		void
	], "nonpayable">;
	getEvent(key: "Withdrawal"): TypedContractEvent<WithdrawalEvent.InputTuple, WithdrawalEvent.OutputTuple, WithdrawalEvent.OutputObject>;
	filters: {
		"Withdrawal(uint256,uint256)": TypedContractEvent<WithdrawalEvent.InputTuple, WithdrawalEvent.OutputTuple, WithdrawalEvent.OutputObject>;
		Withdrawal: TypedContractEvent<WithdrawalEvent.InputTuple, WithdrawalEvent.OutputTuple, WithdrawalEvent.OutputObject>;
	};
}
export declare namespace ArbGateway {
	type OtherTokensStruct = {
		home: AddressLike;
		other: AddressLike;
	};
	type OtherTokensStructOutput = [
		home: string,
		other: string
	] & {
		home: string;
		other: string;
	};
}
export interface ArbGatewayInterface extends Interface {
	getFunction(nameOrSignature: "arbsys" | "bridgeFrom" | "bridgeMsg" | "bridgeTo" | "bridgeToPermit" | "convertAmount" | "inbox" | "initializeGateway" | "nonce" | "otherGateway" | "otherTokens" | "owner" | "renounceOwnership" | "setBurnToken" | "setOtherToken" | "shouldBurnToken" | "transferOwnership"): FunctionFragment;
	getEvent(nameOrSignatureOrTopic: "BridgedCall" | "BridgedFrom" | "BridgedMessage" | "BridgedTo" | "Initialized" | "InitializedGateway" | "OwnershipTransferred" | "SetOtherToken" | "SetToBurn"): EventFragment;
	encodeFunctionData(functionFragment: "arbsys", values?: undefined): string;
	encodeFunctionData(functionFragment: "bridgeFrom", values: [
		BigNumberish,
		AddressLike,
		AddressLike,
		AddressLike,
		BigNumberish,
		BytesLike,
		BigNumberish
	]): string;
	encodeFunctionData(functionFragment: "bridgeMsg", values: [
		BigNumberish,
		string
	]): string;
	encodeFunctionData(functionFragment: "bridgeTo", values: [
		AddressLike,
		AddressLike,
		BigNumberish,
		BytesLike,
		BigNumberish,
		BigNumberish,
		BigNumberish
	]): string;
	encodeFunctionData(functionFragment: "bridgeToPermit", values: [
		AddressLike,
		AddressLike,
		BigNumberish,
		BytesLike,
		BigNumberish,
		BigNumberish,
		BigNumberish,
		BigNumberish,
		BytesLike
	]): string;
	encodeFunctionData(functionFragment: "convertAmount", values: [
		BigNumberish,
		BigNumberish,
		BigNumberish
	]): string;
	encodeFunctionData(functionFragment: "inbox", values?: undefined): string;
	encodeFunctionData(functionFragment: "initializeGateway", values: [
		AddressLike,
		AddressLike,
		AddressLike,
		ArbGateway.OtherTokensStruct[]
	]): string;
	encodeFunctionData(functionFragment: "nonce", values?: undefined): string;
	encodeFunctionData(functionFragment: "otherGateway", values?: undefined): string;
	encodeFunctionData(functionFragment: "otherTokens", values: [
		AddressLike
	]): string;
	encodeFunctionData(functionFragment: "owner", values?: undefined): string;
	encodeFunctionData(functionFragment: "renounceOwnership", values?: undefined): string;
	encodeFunctionData(functionFragment: "setBurnToken", values: [
		AddressLike
	]): string;
	encodeFunctionData(functionFragment: "setOtherToken", values: [
		AddressLike,
		AddressLike
	]): string;
	encodeFunctionData(functionFragment: "shouldBurnToken", values: [
		AddressLike
	]): string;
	encodeFunctionData(functionFragment: "transferOwnership", values: [
		AddressLike
	]): string;
	decodeFunctionResult(functionFragment: "arbsys", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "bridgeFrom", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "bridgeMsg", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "bridgeTo", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "bridgeToPermit", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "convertAmount", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "inbox", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "initializeGateway", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "nonce", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "otherGateway", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "otherTokens", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "renounceOwnership", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "setBurnToken", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "setOtherToken", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "shouldBurnToken", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "transferOwnership", data: BytesLike): Result;
}
declare namespace BridgedCallEvent {
	type InputTuple = [
		nonce: BigNumberish,
		success: boolean,
		returnData: BytesLike
	];
	type OutputTuple = [
		nonce: bigint,
		success: boolean,
		returnData: string
	];
	interface OutputObject {
		nonce: bigint;
		success: boolean;
		returnData: string;
	}
	type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
	type Filter = TypedDeferredTopicFilter<Event>;
	type Log = TypedEventLog<Event>;
	type LogDescription = TypedLogDescription<Event>;
}
declare namespace BridgedFromEvent {
	type InputTuple = [
		nonce: BigNumberish,
		token: AddressLike,
		from: AddressLike,
		to: AddressLike,
		value: BigNumberish,
		data: BytesLike
	];
	type OutputTuple = [
		nonce: bigint,
		token: string,
		from: string,
		to: string,
		value: bigint,
		data: string
	];
	interface OutputObject {
		nonce: bigint;
		token: string;
		from: string;
		to: string;
		value: bigint;
		data: string;
	}
	type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
	type Filter = TypedDeferredTopicFilter<Event>;
	type Log = TypedEventLog<Event>;
	type LogDescription = TypedLogDescription<Event>;
}
declare namespace BridgedMessageEvent {
	type InputTuple = [
		nonce: BigNumberish,
		msg: string
	];
	type OutputTuple = [
		nonce: bigint,
		msg: string
	];
	interface OutputObject {
		nonce: bigint;
		msg: string;
	}
	type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
	type Filter = TypedDeferredTopicFilter<Event>;
	type Log = TypedEventLog<Event>;
	type LogDescription = TypedLogDescription<Event>;
}
declare namespace BridgedToEvent {
	type InputTuple = [
		nonce: BigNumberish,
		bridgeID: BigNumberish,
		token: AddressLike,
		from: AddressLike,
		to: AddressLike,
		value: BigNumberish,
		data: BytesLike
	];
	type OutputTuple = [
		nonce: bigint,
		bridgeID: bigint,
		token: string,
		from: string,
		to: string,
		value: bigint,
		data: string
	];
	interface OutputObject {
		nonce: bigint;
		bridgeID: bigint;
		token: string;
		from: string;
		to: string;
		value: bigint;
		data: string;
	}
	type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
	type Filter = TypedDeferredTopicFilter<Event>;
	type Log = TypedEventLog<Event>;
	type LogDescription = TypedLogDescription<Event>;
}
declare namespace InitializedEvent$3 {
	type InputTuple = [
		version: BigNumberish
	];
	type OutputTuple = [
		version: bigint
	];
	interface OutputObject {
		version: bigint;
	}
	type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
	type Filter = TypedDeferredTopicFilter<Event>;
	type Log = TypedEventLog<Event>;
	type LogDescription = TypedLogDescription<Event>;
}
declare namespace InitializedGatewayEvent {
	type InputTuple = [
		arbSys: AddressLike,
		inbox: AddressLike,
		otherGateway: AddressLike
	];
	type OutputTuple = [
		arbSys: string,
		inbox: string,
		otherGateway: string
	];
	interface OutputObject {
		arbSys: string;
		inbox: string;
		otherGateway: string;
	}
	type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
	type Filter = TypedDeferredTopicFilter<Event>;
	type Log = TypedEventLog<Event>;
	type LogDescription = TypedLogDescription<Event>;
}
declare namespace OwnershipTransferredEvent$2 {
	type InputTuple = [
		previousOwner: AddressLike,
		newOwner: AddressLike
	];
	type OutputTuple = [
		previousOwner: string,
		newOwner: string
	];
	interface OutputObject {
		previousOwner: string;
		newOwner: string;
	}
	type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
	type Filter = TypedDeferredTopicFilter<Event>;
	type Log = TypedEventLog<Event>;
	type LogDescription = TypedLogDescription<Event>;
}
declare namespace SetOtherTokenEvent {
	type InputTuple = [
		home: AddressLike,
		other: AddressLike
	];
	type OutputTuple = [
		home: string,
		other: string
	];
	interface OutputObject {
		home: string;
		other: string;
	}
	type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
	type Filter = TypedDeferredTopicFilter<Event>;
	type Log = TypedEventLog<Event>;
	type LogDescription = TypedLogDescription<Event>;
}
declare namespace SetToBurnEvent {
	type InputTuple = [
		token: AddressLike,
		shouldBurn: boolean
	];
	type OutputTuple = [
		token: string,
		shouldBurn: boolean
	];
	interface OutputObject {
		token: string;
		shouldBurn: boolean;
	}
	type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
	type Filter = TypedDeferredTopicFilter<Event>;
	type Log = TypedEventLog<Event>;
	type LogDescription = TypedLogDescription<Event>;
}
export interface ArbGateway extends BaseContract {
	connect(runner?: ContractRunner | null): ArbGateway;
	waitForDeployment(): Promise<this>;
	interface: ArbGatewayInterface;
	queryFilter<TCEvent extends TypedContractEvent>(event: TCEvent, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
	queryFilter<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
	on<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
	on<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
	once<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
	once<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
	listeners<TCEvent extends TypedContractEvent>(event: TCEvent): Promise<Array<TypedListener<TCEvent>>>;
	listeners(eventName?: string): Promise<Array<Listener>>;
	removeAllListeners<TCEvent extends TypedContractEvent>(event?: TCEvent): Promise<this>;
	arbsys: TypedContractMethod<[
	], [
		string
	], "view">;
	bridgeFrom: TypedContractMethod<[
		tokenDecimals: BigNumberish,
		token: AddressLike,
		from: AddressLike,
		to: AddressLike,
		value: BigNumberish,
		data: BytesLike,
		_nonce: BigNumberish
	], [
		void
	], "payable">;
	bridgeMsg: TypedContractMethod<[
		_nonce: BigNumberish,
		_msg: string
	], [
		void
	], "nonpayable">;
	bridgeTo: TypedContractMethod<[
		token: AddressLike,
		to: AddressLike,
		value: BigNumberish,
		data: BytesLike,
		maxSubmissionCost: BigNumberish,
		maxGas: BigNumberish,
		gasPriceBid: BigNumberish
	], [
		bigint
	], "payable">;
	bridgeToPermit: TypedContractMethod<[
		token: AddressLike,
		to: AddressLike,
		value: BigNumberish,
		data: BytesLike,
		maxSubmissionCost: BigNumberish,
		maxGas: BigNumberish,
		gasPriceBid: BigNumberish,
		deadline: BigNumberish,
		signature: BytesLike
	], [
		bigint
	], "payable">;
	convertAmount: TypedContractMethod<[
		fromValue: BigNumberish,
		fromDecimals: BigNumberish,
		toDecimals: BigNumberish
	], [
		bigint
	], "view">;
	inbox: TypedContractMethod<[
	], [
		string
	], "view">;
	initializeGateway: TypedContractMethod<[
		_owner: AddressLike,
		_inbox: AddressLike,
		_otherGateway: AddressLike,
		_otherTokens: ArbGateway.OtherTokensStruct[]
	], [
		void
	], "nonpayable">;
	nonce: TypedContractMethod<[
	], [
		bigint
	], "view">;
	otherGateway: TypedContractMethod<[
	], [
		string
	], "view">;
	otherTokens: TypedContractMethod<[
		arg0: AddressLike
	], [
		string
	], "view">;
	owner: TypedContractMethod<[
	], [
		string
	], "view">;
	renounceOwnership: TypedContractMethod<[
	], [
		void
	], "nonpayable">;
	setBurnToken: TypedContractMethod<[
		homeToken: AddressLike
	], [
		void
	], "nonpayable">;
	setOtherToken: TypedContractMethod<[
		home: AddressLike,
		other: AddressLike
	], [
		void
	], "nonpayable">;
	shouldBurnToken: TypedContractMethod<[
		arg0: AddressLike
	], [
		boolean
	], "view">;
	transferOwnership: TypedContractMethod<[
		newOwner: AddressLike
	], [
		void
	], "nonpayable">;
	getFunction<T extends ContractMethod = ContractMethod>(key: string | FunctionFragment): T;
	getFunction(nameOrSignature: "arbsys"): TypedContractMethod<[
	], [
		string
	], "view">;
	getFunction(nameOrSignature: "bridgeFrom"): TypedContractMethod<[
		tokenDecimals: BigNumberish,
		token: AddressLike,
		from: AddressLike,
		to: AddressLike,
		value: BigNumberish,
		data: BytesLike,
		_nonce: BigNumberish
	], [
		void
	], "payable">;
	getFunction(nameOrSignature: "bridgeMsg"): TypedContractMethod<[
		_nonce: BigNumberish,
		_msg: string
	], [
		void
	], "nonpayable">;
	getFunction(nameOrSignature: "bridgeTo"): TypedContractMethod<[
		token: AddressLike,
		to: AddressLike,
		value: BigNumberish,
		data: BytesLike,
		maxSubmissionCost: BigNumberish,
		maxGas: BigNumberish,
		gasPriceBid: BigNumberish
	], [
		bigint
	], "payable">;
	getFunction(nameOrSignature: "bridgeToPermit"): TypedContractMethod<[
		token: AddressLike,
		to: AddressLike,
		value: BigNumberish,
		data: BytesLike,
		maxSubmissionCost: BigNumberish,
		maxGas: BigNumberish,
		gasPriceBid: BigNumberish,
		deadline: BigNumberish,
		signature: BytesLike
	], [
		bigint
	], "payable">;
	getFunction(nameOrSignature: "convertAmount"): TypedContractMethod<[
		fromValue: BigNumberish,
		fromDecimals: BigNumberish,
		toDecimals: BigNumberish
	], [
		bigint
	], "view">;
	getFunction(nameOrSignature: "inbox"): TypedContractMethod<[
	], [
		string
	], "view">;
	getFunction(nameOrSignature: "initializeGateway"): TypedContractMethod<[
		_owner: AddressLike,
		_inbox: AddressLike,
		_otherGateway: AddressLike,
		_otherTokens: ArbGateway.OtherTokensStruct[]
	], [
		void
	], "nonpayable">;
	getFunction(nameOrSignature: "nonce"): TypedContractMethod<[
	], [
		bigint
	], "view">;
	getFunction(nameOrSignature: "otherGateway"): TypedContractMethod<[
	], [
		string
	], "view">;
	getFunction(nameOrSignature: "otherTokens"): TypedContractMethod<[
		arg0: AddressLike
	], [
		string
	], "view">;
	getFunction(nameOrSignature: "owner"): TypedContractMethod<[
	], [
		string
	], "view">;
	getFunction(nameOrSignature: "renounceOwnership"): TypedContractMethod<[
	], [
		void
	], "nonpayable">;
	getFunction(nameOrSignature: "setBurnToken"): TypedContractMethod<[
		homeToken: AddressLike
	], [
		void
	], "nonpayable">;
	getFunction(nameOrSignature: "setOtherToken"): TypedContractMethod<[
		home: AddressLike,
		other: AddressLike
	], [
		void
	], "nonpayable">;
	getFunction(nameOrSignature: "shouldBurnToken"): TypedContractMethod<[
		arg0: AddressLike
	], [
		boolean
	], "view">;
	getFunction(nameOrSignature: "transferOwnership"): TypedContractMethod<[
		newOwner: AddressLike
	], [
		void
	], "nonpayable">;
	getEvent(key: "BridgedCall"): TypedContractEvent<BridgedCallEvent.InputTuple, BridgedCallEvent.OutputTuple, BridgedCallEvent.OutputObject>;
	getEvent(key: "BridgedFrom"): TypedContractEvent<BridgedFromEvent.InputTuple, BridgedFromEvent.OutputTuple, BridgedFromEvent.OutputObject>;
	getEvent(key: "BridgedMessage"): TypedContractEvent<BridgedMessageEvent.InputTuple, BridgedMessageEvent.OutputTuple, BridgedMessageEvent.OutputObject>;
	getEvent(key: "BridgedTo"): TypedContractEvent<BridgedToEvent.InputTuple, BridgedToEvent.OutputTuple, BridgedToEvent.OutputObject>;
	getEvent(key: "Initialized"): TypedContractEvent<InitializedEvent$3.InputTuple, InitializedEvent$3.OutputTuple, InitializedEvent$3.OutputObject>;
	getEvent(key: "InitializedGateway"): TypedContractEvent<InitializedGatewayEvent.InputTuple, InitializedGatewayEvent.OutputTuple, InitializedGatewayEvent.OutputObject>;
	getEvent(key: "OwnershipTransferred"): TypedContractEvent<OwnershipTransferredEvent$2.InputTuple, OwnershipTransferredEvent$2.OutputTuple, OwnershipTransferredEvent$2.OutputObject>;
	getEvent(key: "SetOtherToken"): TypedContractEvent<SetOtherTokenEvent.InputTuple, SetOtherTokenEvent.OutputTuple, SetOtherTokenEvent.OutputObject>;
	getEvent(key: "SetToBurn"): TypedContractEvent<SetToBurnEvent.InputTuple, SetToBurnEvent.OutputTuple, SetToBurnEvent.OutputObject>;
	filters: {
		"BridgedCall(uint256,bool,bytes)": TypedContractEvent<BridgedCallEvent.InputTuple, BridgedCallEvent.OutputTuple, BridgedCallEvent.OutputObject>;
		BridgedCall: TypedContractEvent<BridgedCallEvent.InputTuple, BridgedCallEvent.OutputTuple, BridgedCallEvent.OutputObject>;
		"BridgedFrom(uint256,address,address,address,uint256,bytes)": TypedContractEvent<BridgedFromEvent.InputTuple, BridgedFromEvent.OutputTuple, BridgedFromEvent.OutputObject>;
		BridgedFrom: TypedContractEvent<BridgedFromEvent.InputTuple, BridgedFromEvent.OutputTuple, BridgedFromEvent.OutputObject>;
		"BridgedMessage(uint256,string)": TypedContractEvent<BridgedMessageEvent.InputTuple, BridgedMessageEvent.OutputTuple, BridgedMessageEvent.OutputObject>;
		BridgedMessage: TypedContractEvent<BridgedMessageEvent.InputTuple, BridgedMessageEvent.OutputTuple, BridgedMessageEvent.OutputObject>;
		"BridgedTo(uint256,uint256,address,address,address,uint256,bytes)": TypedContractEvent<BridgedToEvent.InputTuple, BridgedToEvent.OutputTuple, BridgedToEvent.OutputObject>;
		BridgedTo: TypedContractEvent<BridgedToEvent.InputTuple, BridgedToEvent.OutputTuple, BridgedToEvent.OutputObject>;
		"Initialized(uint64)": TypedContractEvent<InitializedEvent$3.InputTuple, InitializedEvent$3.OutputTuple, InitializedEvent$3.OutputObject>;
		Initialized: TypedContractEvent<InitializedEvent$3.InputTuple, InitializedEvent$3.OutputTuple, InitializedEvent$3.OutputObject>;
		"InitializedGateway(address,address,address)": TypedContractEvent<InitializedGatewayEvent.InputTuple, InitializedGatewayEvent.OutputTuple, InitializedGatewayEvent.OutputObject>;
		InitializedGateway: TypedContractEvent<InitializedGatewayEvent.InputTuple, InitializedGatewayEvent.OutputTuple, InitializedGatewayEvent.OutputObject>;
		"OwnershipTransferred(address,address)": TypedContractEvent<OwnershipTransferredEvent$2.InputTuple, OwnershipTransferredEvent$2.OutputTuple, OwnershipTransferredEvent$2.OutputObject>;
		OwnershipTransferred: TypedContractEvent<OwnershipTransferredEvent$2.InputTuple, OwnershipTransferredEvent$2.OutputTuple, OwnershipTransferredEvent$2.OutputObject>;
		"SetOtherToken(address,address)": TypedContractEvent<SetOtherTokenEvent.InputTuple, SetOtherTokenEvent.OutputTuple, SetOtherTokenEvent.OutputObject>;
		SetOtherToken: TypedContractEvent<SetOtherTokenEvent.InputTuple, SetOtherTokenEvent.OutputTuple, SetOtherTokenEvent.OutputObject>;
		"SetToBurn(address,bool)": TypedContractEvent<SetToBurnEvent.InputTuple, SetToBurnEvent.OutputTuple, SetToBurnEvent.OutputObject>;
		SetToBurn: TypedContractEvent<SetToBurnEvent.InputTuple, SetToBurnEvent.OutputTuple, SetToBurnEvent.OutputObject>;
	};
}
declare namespace ArbGateway$1 {
	type OtherTokensStruct = {
		home: AddressLike;
		other: AddressLike;
	};
	type OtherTokensStructOutput = [
		home: string,
		other: string
	] & {
		home: string;
		other: string;
	};
}
export interface ArbGatewaySettleInterface extends Interface {
	getFunction(nameOrSignature: "arbsys" | "autoSettle" | "bridgeFrom" | "bridgeMsg" | "bridgeTo" | "bridgeToPermit" | "convertAmount" | "inbox" | "initializeGateway" | "initializeGatewaySettle" | "nonce" | "orders" | "otherGateway" | "otherTokens" | "owner" | "renounceOwnership" | "setAutoSettle" | "setBurnToken" | "setOtherToken" | "settleOrder" | "shouldBurnToken" | "transferOwnership"): FunctionFragment;
	getEvent(nameOrSignatureOrTopic: "BridgedCall" | "BridgedFrom" | "BridgedMessage" | "BridgedTo" | "Initialized" | "InitializedGateway" | "OwnershipTransferred" | "SetAutoSettle" | "SetOtherToken" | "SetToBurn"): EventFragment;
	encodeFunctionData(functionFragment: "arbsys", values?: undefined): string;
	encodeFunctionData(functionFragment: "autoSettle", values?: undefined): string;
	encodeFunctionData(functionFragment: "bridgeFrom", values: [
		BigNumberish,
		AddressLike,
		AddressLike,
		AddressLike,
		BigNumberish,
		BytesLike,
		BigNumberish
	]): string;
	encodeFunctionData(functionFragment: "bridgeMsg", values: [
		BigNumberish,
		string
	]): string;
	encodeFunctionData(functionFragment: "bridgeTo", values: [
		AddressLike,
		AddressLike,
		BigNumberish,
		BytesLike,
		BigNumberish,
		BigNumberish,
		BigNumberish
	]): string;
	encodeFunctionData(functionFragment: "bridgeToPermit", values: [
		AddressLike,
		AddressLike,
		BigNumberish,
		BytesLike,
		BigNumberish,
		BigNumberish,
		BigNumberish,
		BigNumberish,
		BytesLike
	]): string;
	encodeFunctionData(functionFragment: "convertAmount", values: [
		BigNumberish,
		BigNumberish,
		BigNumberish
	]): string;
	encodeFunctionData(functionFragment: "inbox", values?: undefined): string;
	encodeFunctionData(functionFragment: "initializeGateway", values: [
		AddressLike,
		AddressLike,
		AddressLike,
		ArbGateway$1.OtherTokensStruct[]
	]): string;
	encodeFunctionData(functionFragment: "initializeGatewaySettle", values: [
		AddressLike,
		AddressLike,
		AddressLike,
		ArbGateway$1.OtherTokensStruct[],
		boolean
	]): string;
	encodeFunctionData(functionFragment: "nonce", values?: undefined): string;
	encodeFunctionData(functionFragment: "orders", values: [
		BigNumberish
	]): string;
	encodeFunctionData(functionFragment: "otherGateway", values?: undefined): string;
	encodeFunctionData(functionFragment: "otherTokens", values: [
		AddressLike
	]): string;
	encodeFunctionData(functionFragment: "owner", values?: undefined): string;
	encodeFunctionData(functionFragment: "renounceOwnership", values?: undefined): string;
	encodeFunctionData(functionFragment: "setAutoSettle", values?: undefined): string;
	encodeFunctionData(functionFragment: "setBurnToken", values: [
		AddressLike
	]): string;
	encodeFunctionData(functionFragment: "setOtherToken", values: [
		AddressLike,
		AddressLike
	]): string;
	encodeFunctionData(functionFragment: "settleOrder", values: [
		BigNumberish
	]): string;
	encodeFunctionData(functionFragment: "shouldBurnToken", values: [
		AddressLike
	]): string;
	encodeFunctionData(functionFragment: "transferOwnership", values: [
		AddressLike
	]): string;
	decodeFunctionResult(functionFragment: "arbsys", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "autoSettle", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "bridgeFrom", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "bridgeMsg", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "bridgeTo", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "bridgeToPermit", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "convertAmount", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "inbox", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "initializeGateway", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "initializeGatewaySettle", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "nonce", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "orders", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "otherGateway", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "otherTokens", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "renounceOwnership", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "setAutoSettle", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "setBurnToken", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "setOtherToken", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "settleOrder", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "shouldBurnToken", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "transferOwnership", data: BytesLike): Result;
}
declare namespace BridgedCallEvent$1 {
	type InputTuple = [
		nonce: BigNumberish,
		success: boolean,
		returnData: BytesLike
	];
	type OutputTuple = [
		nonce: bigint,
		success: boolean,
		returnData: string
	];
	interface OutputObject {
		nonce: bigint;
		success: boolean;
		returnData: string;
	}
	type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
	type Filter = TypedDeferredTopicFilter<Event>;
	type Log = TypedEventLog<Event>;
	type LogDescription = TypedLogDescription<Event>;
}
declare namespace BridgedFromEvent$1 {
	type InputTuple = [
		nonce: BigNumberish,
		token: AddressLike,
		from: AddressLike,
		to: AddressLike,
		value: BigNumberish,
		data: BytesLike
	];
	type OutputTuple = [
		nonce: bigint,
		token: string,
		from: string,
		to: string,
		value: bigint,
		data: string
	];
	interface OutputObject {
		nonce: bigint;
		token: string;
		from: string;
		to: string;
		value: bigint;
		data: string;
	}
	type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
	type Filter = TypedDeferredTopicFilter<Event>;
	type Log = TypedEventLog<Event>;
	type LogDescription = TypedLogDescription<Event>;
}
declare namespace BridgedMessageEvent$1 {
	type InputTuple = [
		nonce: BigNumberish,
		msg: string
	];
	type OutputTuple = [
		nonce: bigint,
		msg: string
	];
	interface OutputObject {
		nonce: bigint;
		msg: string;
	}
	type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
	type Filter = TypedDeferredTopicFilter<Event>;
	type Log = TypedEventLog<Event>;
	type LogDescription = TypedLogDescription<Event>;
}
declare namespace BridgedToEvent$1 {
	type InputTuple = [
		nonce: BigNumberish,
		bridgeID: BigNumberish,
		token: AddressLike,
		from: AddressLike,
		to: AddressLike,
		value: BigNumberish,
		data: BytesLike
	];
	type OutputTuple = [
		nonce: bigint,
		bridgeID: bigint,
		token: string,
		from: string,
		to: string,
		value: bigint,
		data: string
	];
	interface OutputObject {
		nonce: bigint;
		bridgeID: bigint;
		token: string;
		from: string;
		to: string;
		value: bigint;
		data: string;
	}
	type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
	type Filter = TypedDeferredTopicFilter<Event>;
	type Log = TypedEventLog<Event>;
	type LogDescription = TypedLogDescription<Event>;
}
declare namespace InitializedEvent$4 {
	type InputTuple = [
		version: BigNumberish
	];
	type OutputTuple = [
		version: bigint
	];
	interface OutputObject {
		version: bigint;
	}
	type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
	type Filter = TypedDeferredTopicFilter<Event>;
	type Log = TypedEventLog<Event>;
	type LogDescription = TypedLogDescription<Event>;
}
declare namespace InitializedGatewayEvent$1 {
	type InputTuple = [
		arbSys: AddressLike,
		inbox: AddressLike,
		otherGateway: AddressLike
	];
	type OutputTuple = [
		arbSys: string,
		inbox: string,
		otherGateway: string
	];
	interface OutputObject {
		arbSys: string;
		inbox: string;
		otherGateway: string;
	}
	type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
	type Filter = TypedDeferredTopicFilter<Event>;
	type Log = TypedEventLog<Event>;
	type LogDescription = TypedLogDescription<Event>;
}
declare namespace OwnershipTransferredEvent$3 {
	type InputTuple = [
		previousOwner: AddressLike,
		newOwner: AddressLike
	];
	type OutputTuple = [
		previousOwner: string,
		newOwner: string
	];
	interface OutputObject {
		previousOwner: string;
		newOwner: string;
	}
	type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
	type Filter = TypedDeferredTopicFilter<Event>;
	type Log = TypedEventLog<Event>;
	type LogDescription = TypedLogDescription<Event>;
}
declare namespace SetAutoSettleEvent {
	type InputTuple = [
		autoSettle: boolean
	];
	type OutputTuple = [
		autoSettle: boolean
	];
	interface OutputObject {
		autoSettle: boolean;
	}
	type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
	type Filter = TypedDeferredTopicFilter<Event>;
	type Log = TypedEventLog<Event>;
	type LogDescription = TypedLogDescription<Event>;
}
declare namespace SetOtherTokenEvent$1 {
	type InputTuple = [
		home: AddressLike,
		other: AddressLike
	];
	type OutputTuple = [
		home: string,
		other: string
	];
	interface OutputObject {
		home: string;
		other: string;
	}
	type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
	type Filter = TypedDeferredTopicFilter<Event>;
	type Log = TypedEventLog<Event>;
	type LogDescription = TypedLogDescription<Event>;
}
declare namespace SetToBurnEvent$1 {
	type InputTuple = [
		token: AddressLike,
		shouldBurn: boolean
	];
	type OutputTuple = [
		token: string,
		shouldBurn: boolean
	];
	interface OutputObject {
		token: string;
		shouldBurn: boolean;
	}
	type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
	type Filter = TypedDeferredTopicFilter<Event>;
	type Log = TypedEventLog<Event>;
	type LogDescription = TypedLogDescription<Event>;
}
export interface ArbGatewaySettle extends BaseContract {
	connect(runner?: ContractRunner | null): ArbGatewaySettle;
	waitForDeployment(): Promise<this>;
	interface: ArbGatewaySettleInterface;
	queryFilter<TCEvent extends TypedContractEvent>(event: TCEvent, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
	queryFilter<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
	on<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
	on<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
	once<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
	once<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
	listeners<TCEvent extends TypedContractEvent>(event: TCEvent): Promise<Array<TypedListener<TCEvent>>>;
	listeners(eventName?: string): Promise<Array<Listener>>;
	removeAllListeners<TCEvent extends TypedContractEvent>(event?: TCEvent): Promise<this>;
	arbsys: TypedContractMethod<[
	], [
		string
	], "view">;
	autoSettle: TypedContractMethod<[
	], [
		boolean
	], "view">;
	bridgeFrom: TypedContractMethod<[
		tokenDecimals: BigNumberish,
		token: AddressLike,
		from: AddressLike,
		to: AddressLike,
		value: BigNumberish,
		data: BytesLike,
		_nonce: BigNumberish
	], [
		void
	], "payable">;
	bridgeMsg: TypedContractMethod<[
		_nonce: BigNumberish,
		_msg: string
	], [
		void
	], "nonpayable">;
	bridgeTo: TypedContractMethod<[
		token: AddressLike,
		to: AddressLike,
		value: BigNumberish,
		data: BytesLike,
		maxSubmissionCost: BigNumberish,
		maxGas: BigNumberish,
		gasPriceBid: BigNumberish
	], [
		bigint
	], "payable">;
	bridgeToPermit: TypedContractMethod<[
		token: AddressLike,
		to: AddressLike,
		value: BigNumberish,
		data: BytesLike,
		maxSubmissionCost: BigNumberish,
		maxGas: BigNumberish,
		gasPriceBid: BigNumberish,
		deadline: BigNumberish,
		signature: BytesLike
	], [
		bigint
	], "payable">;
	convertAmount: TypedContractMethod<[
		fromValue: BigNumberish,
		fromDecimals: BigNumberish,
		toDecimals: BigNumberish
	], [
		bigint
	], "view">;
	inbox: TypedContractMethod<[
	], [
		string
	], "view">;
	initializeGateway: TypedContractMethod<[
		_owner: AddressLike,
		_inbox: AddressLike,
		_otherGateway: AddressLike,
		_otherTokens: ArbGateway$1.OtherTokensStruct[]
	], [
		void
	], "nonpayable">;
	initializeGatewaySettle: TypedContractMethod<[
		_owner: AddressLike,
		_inbox: AddressLike,
		_otherGateway: AddressLike,
		_otherTokens: ArbGateway$1.OtherTokensStruct[],
		_autoSettle: boolean
	], [
		void
	], "nonpayable">;
	nonce: TypedContractMethod<[
	], [
		bigint
	], "view">;
	orders: TypedContractMethod<[
		arg0: BigNumberish
	], [
		[
			string,
			string,
			string,
			bigint,
			string,
			boolean
		] & {
			token: string;
			from: string;
			to: string;
			value: bigint;
			data: string;
			settled: boolean;
		}
	], "view">;
	otherGateway: TypedContractMethod<[
	], [
		string
	], "view">;
	otherTokens: TypedContractMethod<[
		arg0: AddressLike
	], [
		string
	], "view">;
	owner: TypedContractMethod<[
	], [
		string
	], "view">;
	renounceOwnership: TypedContractMethod<[
	], [
		void
	], "nonpayable">;
	setAutoSettle: TypedContractMethod<[
	], [
		void
	], "nonpayable">;
	setBurnToken: TypedContractMethod<[
		homeToken: AddressLike
	], [
		void
	], "nonpayable">;
	setOtherToken: TypedContractMethod<[
		home: AddressLike,
		other: AddressLike
	], [
		void
	], "nonpayable">;
	settleOrder: TypedContractMethod<[
		_nonce: BigNumberish
	], [
		void
	], "nonpayable">;
	shouldBurnToken: TypedContractMethod<[
		arg0: AddressLike
	], [
		boolean
	], "view">;
	transferOwnership: TypedContractMethod<[
		newOwner: AddressLike
	], [
		void
	], "nonpayable">;
	getFunction<T extends ContractMethod = ContractMethod>(key: string | FunctionFragment): T;
	getFunction(nameOrSignature: "arbsys"): TypedContractMethod<[
	], [
		string
	], "view">;
	getFunction(nameOrSignature: "autoSettle"): TypedContractMethod<[
	], [
		boolean
	], "view">;
	getFunction(nameOrSignature: "bridgeFrom"): TypedContractMethod<[
		tokenDecimals: BigNumberish,
		token: AddressLike,
		from: AddressLike,
		to: AddressLike,
		value: BigNumberish,
		data: BytesLike,
		_nonce: BigNumberish
	], [
		void
	], "payable">;
	getFunction(nameOrSignature: "bridgeMsg"): TypedContractMethod<[
		_nonce: BigNumberish,
		_msg: string
	], [
		void
	], "nonpayable">;
	getFunction(nameOrSignature: "bridgeTo"): TypedContractMethod<[
		token: AddressLike,
		to: AddressLike,
		value: BigNumberish,
		data: BytesLike,
		maxSubmissionCost: BigNumberish,
		maxGas: BigNumberish,
		gasPriceBid: BigNumberish
	], [
		bigint
	], "payable">;
	getFunction(nameOrSignature: "bridgeToPermit"): TypedContractMethod<[
		token: AddressLike,
		to: AddressLike,
		value: BigNumberish,
		data: BytesLike,
		maxSubmissionCost: BigNumberish,
		maxGas: BigNumberish,
		gasPriceBid: BigNumberish,
		deadline: BigNumberish,
		signature: BytesLike
	], [
		bigint
	], "payable">;
	getFunction(nameOrSignature: "convertAmount"): TypedContractMethod<[
		fromValue: BigNumberish,
		fromDecimals: BigNumberish,
		toDecimals: BigNumberish
	], [
		bigint
	], "view">;
	getFunction(nameOrSignature: "inbox"): TypedContractMethod<[
	], [
		string
	], "view">;
	getFunction(nameOrSignature: "initializeGateway"): TypedContractMethod<[
		_owner: AddressLike,
		_inbox: AddressLike,
		_otherGateway: AddressLike,
		_otherTokens: ArbGateway$1.OtherTokensStruct[]
	], [
		void
	], "nonpayable">;
	getFunction(nameOrSignature: "initializeGatewaySettle"): TypedContractMethod<[
		_owner: AddressLike,
		_inbox: AddressLike,
		_otherGateway: AddressLike,
		_otherTokens: ArbGateway$1.OtherTokensStruct[],
		_autoSettle: boolean
	], [
		void
	], "nonpayable">;
	getFunction(nameOrSignature: "nonce"): TypedContractMethod<[
	], [
		bigint
	], "view">;
	getFunction(nameOrSignature: "orders"): TypedContractMethod<[
		arg0: BigNumberish
	], [
		[
			string,
			string,
			string,
			bigint,
			string,
			boolean
		] & {
			token: string;
			from: string;
			to: string;
			value: bigint;
			data: string;
			settled: boolean;
		}
	], "view">;
	getFunction(nameOrSignature: "otherGateway"): TypedContractMethod<[
	], [
		string
	], "view">;
	getFunction(nameOrSignature: "otherTokens"): TypedContractMethod<[
		arg0: AddressLike
	], [
		string
	], "view">;
	getFunction(nameOrSignature: "owner"): TypedContractMethod<[
	], [
		string
	], "view">;
	getFunction(nameOrSignature: "renounceOwnership"): TypedContractMethod<[
	], [
		void
	], "nonpayable">;
	getFunction(nameOrSignature: "setAutoSettle"): TypedContractMethod<[
	], [
		void
	], "nonpayable">;
	getFunction(nameOrSignature: "setBurnToken"): TypedContractMethod<[
		homeToken: AddressLike
	], [
		void
	], "nonpayable">;
	getFunction(nameOrSignature: "setOtherToken"): TypedContractMethod<[
		home: AddressLike,
		other: AddressLike
	], [
		void
	], "nonpayable">;
	getFunction(nameOrSignature: "settleOrder"): TypedContractMethod<[
		_nonce: BigNumberish
	], [
		void
	], "nonpayable">;
	getFunction(nameOrSignature: "shouldBurnToken"): TypedContractMethod<[
		arg0: AddressLike
	], [
		boolean
	], "view">;
	getFunction(nameOrSignature: "transferOwnership"): TypedContractMethod<[
		newOwner: AddressLike
	], [
		void
	], "nonpayable">;
	getEvent(key: "BridgedCall"): TypedContractEvent<BridgedCallEvent$1.InputTuple, BridgedCallEvent$1.OutputTuple, BridgedCallEvent$1.OutputObject>;
	getEvent(key: "BridgedFrom"): TypedContractEvent<BridgedFromEvent$1.InputTuple, BridgedFromEvent$1.OutputTuple, BridgedFromEvent$1.OutputObject>;
	getEvent(key: "BridgedMessage"): TypedContractEvent<BridgedMessageEvent$1.InputTuple, BridgedMessageEvent$1.OutputTuple, BridgedMessageEvent$1.OutputObject>;
	getEvent(key: "BridgedTo"): TypedContractEvent<BridgedToEvent$1.InputTuple, BridgedToEvent$1.OutputTuple, BridgedToEvent$1.OutputObject>;
	getEvent(key: "Initialized"): TypedContractEvent<InitializedEvent$4.InputTuple, InitializedEvent$4.OutputTuple, InitializedEvent$4.OutputObject>;
	getEvent(key: "InitializedGateway"): TypedContractEvent<InitializedGatewayEvent$1.InputTuple, InitializedGatewayEvent$1.OutputTuple, InitializedGatewayEvent$1.OutputObject>;
	getEvent(key: "OwnershipTransferred"): TypedContractEvent<OwnershipTransferredEvent$3.InputTuple, OwnershipTransferredEvent$3.OutputTuple, OwnershipTransferredEvent$3.OutputObject>;
	getEvent(key: "SetAutoSettle"): TypedContractEvent<SetAutoSettleEvent.InputTuple, SetAutoSettleEvent.OutputTuple, SetAutoSettleEvent.OutputObject>;
	getEvent(key: "SetOtherToken"): TypedContractEvent<SetOtherTokenEvent$1.InputTuple, SetOtherTokenEvent$1.OutputTuple, SetOtherTokenEvent$1.OutputObject>;
	getEvent(key: "SetToBurn"): TypedContractEvent<SetToBurnEvent$1.InputTuple, SetToBurnEvent$1.OutputTuple, SetToBurnEvent$1.OutputObject>;
	filters: {
		"BridgedCall(uint256,bool,bytes)": TypedContractEvent<BridgedCallEvent$1.InputTuple, BridgedCallEvent$1.OutputTuple, BridgedCallEvent$1.OutputObject>;
		BridgedCall: TypedContractEvent<BridgedCallEvent$1.InputTuple, BridgedCallEvent$1.OutputTuple, BridgedCallEvent$1.OutputObject>;
		"BridgedFrom(uint256,address,address,address,uint256,bytes)": TypedContractEvent<BridgedFromEvent$1.InputTuple, BridgedFromEvent$1.OutputTuple, BridgedFromEvent$1.OutputObject>;
		BridgedFrom: TypedContractEvent<BridgedFromEvent$1.InputTuple, BridgedFromEvent$1.OutputTuple, BridgedFromEvent$1.OutputObject>;
		"BridgedMessage(uint256,string)": TypedContractEvent<BridgedMessageEvent$1.InputTuple, BridgedMessageEvent$1.OutputTuple, BridgedMessageEvent$1.OutputObject>;
		BridgedMessage: TypedContractEvent<BridgedMessageEvent$1.InputTuple, BridgedMessageEvent$1.OutputTuple, BridgedMessageEvent$1.OutputObject>;
		"BridgedTo(uint256,uint256,address,address,address,uint256,bytes)": TypedContractEvent<BridgedToEvent$1.InputTuple, BridgedToEvent$1.OutputTuple, BridgedToEvent$1.OutputObject>;
		BridgedTo: TypedContractEvent<BridgedToEvent$1.InputTuple, BridgedToEvent$1.OutputTuple, BridgedToEvent$1.OutputObject>;
		"Initialized(uint64)": TypedContractEvent<InitializedEvent$4.InputTuple, InitializedEvent$4.OutputTuple, InitializedEvent$4.OutputObject>;
		Initialized: TypedContractEvent<InitializedEvent$4.InputTuple, InitializedEvent$4.OutputTuple, InitializedEvent$4.OutputObject>;
		"InitializedGateway(address,address,address)": TypedContractEvent<InitializedGatewayEvent$1.InputTuple, InitializedGatewayEvent$1.OutputTuple, InitializedGatewayEvent$1.OutputObject>;
		InitializedGateway: TypedContractEvent<InitializedGatewayEvent$1.InputTuple, InitializedGatewayEvent$1.OutputTuple, InitializedGatewayEvent$1.OutputObject>;
		"OwnershipTransferred(address,address)": TypedContractEvent<OwnershipTransferredEvent$3.InputTuple, OwnershipTransferredEvent$3.OutputTuple, OwnershipTransferredEvent$3.OutputObject>;
		OwnershipTransferred: TypedContractEvent<OwnershipTransferredEvent$3.InputTuple, OwnershipTransferredEvent$3.OutputTuple, OwnershipTransferredEvent$3.OutputObject>;
		"SetAutoSettle(bool)": TypedContractEvent<SetAutoSettleEvent.InputTuple, SetAutoSettleEvent.OutputTuple, SetAutoSettleEvent.OutputObject>;
		SetAutoSettle: TypedContractEvent<SetAutoSettleEvent.InputTuple, SetAutoSettleEvent.OutputTuple, SetAutoSettleEvent.OutputObject>;
		"SetOtherToken(address,address)": TypedContractEvent<SetOtherTokenEvent$1.InputTuple, SetOtherTokenEvent$1.OutputTuple, SetOtherTokenEvent$1.OutputObject>;
		SetOtherToken: TypedContractEvent<SetOtherTokenEvent$1.InputTuple, SetOtherTokenEvent$1.OutputTuple, SetOtherTokenEvent$1.OutputObject>;
		"SetToBurn(address,bool)": TypedContractEvent<SetToBurnEvent$1.InputTuple, SetToBurnEvent$1.OutputTuple, SetToBurnEvent$1.OutputObject>;
		SetToBurn: TypedContractEvent<SetToBurnEvent$1.InputTuple, SetToBurnEvent$1.OutputTuple, SetToBurnEvent$1.OutputObject>;
	};
}
export interface GreeterInterface extends Interface {
	getFunction(nameOrSignature: "greet" | "setGreeting"): FunctionFragment;
	getEvent(nameOrSignatureOrTopic: "NewGreeting"): EventFragment;
	encodeFunctionData(functionFragment: "greet", values?: undefined): string;
	encodeFunctionData(functionFragment: "setGreeting", values: [
		string
	]): string;
	decodeFunctionResult(functionFragment: "greet", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "setGreeting", data: BytesLike): Result;
}
declare namespace NewGreetingEvent {
	type InputTuple = [
		greeting: string
	];
	type OutputTuple = [
		greeting: string
	];
	interface OutputObject {
		greeting: string;
	}
	type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
	type Filter = TypedDeferredTopicFilter<Event>;
	type Log = TypedEventLog<Event>;
	type LogDescription = TypedLogDescription<Event>;
}
export interface Greeter extends BaseContract {
	connect(runner?: ContractRunner | null): Greeter;
	waitForDeployment(): Promise<this>;
	interface: GreeterInterface;
	queryFilter<TCEvent extends TypedContractEvent>(event: TCEvent, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
	queryFilter<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
	on<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
	on<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
	once<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
	once<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
	listeners<TCEvent extends TypedContractEvent>(event: TCEvent): Promise<Array<TypedListener<TCEvent>>>;
	listeners(eventName?: string): Promise<Array<Listener>>;
	removeAllListeners<TCEvent extends TypedContractEvent>(event?: TCEvent): Promise<this>;
	greet: TypedContractMethod<[
	], [
		string
	], "view">;
	setGreeting: TypedContractMethod<[
		_greeting: string
	], [
		void
	], "nonpayable">;
	getFunction<T extends ContractMethod = ContractMethod>(key: string | FunctionFragment): T;
	getFunction(nameOrSignature: "greet"): TypedContractMethod<[
	], [
		string
	], "view">;
	getFunction(nameOrSignature: "setGreeting"): TypedContractMethod<[
		_greeting: string
	], [
		void
	], "nonpayable">;
	getEvent(key: "NewGreeting"): TypedContractEvent<NewGreetingEvent.InputTuple, NewGreetingEvent.OutputTuple, NewGreetingEvent.OutputObject>;
	filters: {
		"NewGreeting(string)": TypedContractEvent<NewGreetingEvent.InputTuple, NewGreetingEvent.OutputTuple, NewGreetingEvent.OutputObject>;
		NewGreeting: TypedContractEvent<NewGreetingEvent.InputTuple, NewGreetingEvent.OutputTuple, NewGreetingEvent.OutputObject>;
	};
}
export interface GreeterChildInterface extends Interface {
	getFunction(nameOrSignature: "greet" | "parentTarget" | "setGreeting" | "setGreetingInParent" | "updateParentTarget"): FunctionFragment;
	getEvent(nameOrSignatureOrTopic: "ChildToParentTxCreated" | "NewGreeting"): EventFragment;
	encodeFunctionData(functionFragment: "greet", values?: undefined): string;
	encodeFunctionData(functionFragment: "parentTarget", values?: undefined): string;
	encodeFunctionData(functionFragment: "setGreeting", values: [
		string
	]): string;
	encodeFunctionData(functionFragment: "setGreetingInParent", values: [
		string
	]): string;
	encodeFunctionData(functionFragment: "updateParentTarget", values: [
		AddressLike
	]): string;
	decodeFunctionResult(functionFragment: "greet", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "parentTarget", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "setGreeting", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "setGreetingInParent", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "updateParentTarget", data: BytesLike): Result;
}
declare namespace ChildToParentTxCreatedEvent {
	type InputTuple = [
		withdrawalId: BigNumberish
	];
	type OutputTuple = [
		withdrawalId: bigint
	];
	interface OutputObject {
		withdrawalId: bigint;
	}
	type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
	type Filter = TypedDeferredTopicFilter<Event>;
	type Log = TypedEventLog<Event>;
	type LogDescription = TypedLogDescription<Event>;
}
declare namespace NewGreetingEvent$1 {
	type InputTuple = [
		greeting: string
	];
	type OutputTuple = [
		greeting: string
	];
	interface OutputObject {
		greeting: string;
	}
	type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
	type Filter = TypedDeferredTopicFilter<Event>;
	type Log = TypedEventLog<Event>;
	type LogDescription = TypedLogDescription<Event>;
}
export interface GreeterChild extends BaseContract {
	connect(runner?: ContractRunner | null): GreeterChild;
	waitForDeployment(): Promise<this>;
	interface: GreeterChildInterface;
	queryFilter<TCEvent extends TypedContractEvent>(event: TCEvent, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
	queryFilter<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
	on<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
	on<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
	once<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
	once<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
	listeners<TCEvent extends TypedContractEvent>(event: TCEvent): Promise<Array<TypedListener<TCEvent>>>;
	listeners(eventName?: string): Promise<Array<Listener>>;
	removeAllListeners<TCEvent extends TypedContractEvent>(event?: TCEvent): Promise<this>;
	greet: TypedContractMethod<[
	], [
		string
	], "view">;
	parentTarget: TypedContractMethod<[
	], [
		string
	], "view">;
	setGreeting: TypedContractMethod<[
		_greeting: string
	], [
		void
	], "nonpayable">;
	setGreetingInParent: TypedContractMethod<[
		_greeting: string
	], [
		bigint
	], "nonpayable">;
	updateParentTarget: TypedContractMethod<[
		_parentTarget: AddressLike
	], [
		void
	], "nonpayable">;
	getFunction<T extends ContractMethod = ContractMethod>(key: string | FunctionFragment): T;
	getFunction(nameOrSignature: "greet"): TypedContractMethod<[
	], [
		string
	], "view">;
	getFunction(nameOrSignature: "parentTarget"): TypedContractMethod<[
	], [
		string
	], "view">;
	getFunction(nameOrSignature: "setGreeting"): TypedContractMethod<[
		_greeting: string
	], [
		void
	], "nonpayable">;
	getFunction(nameOrSignature: "setGreetingInParent"): TypedContractMethod<[
		_greeting: string
	], [
		bigint
	], "nonpayable">;
	getFunction(nameOrSignature: "updateParentTarget"): TypedContractMethod<[
		_parentTarget: AddressLike
	], [
		void
	], "nonpayable">;
	getEvent(key: "ChildToParentTxCreated"): TypedContractEvent<ChildToParentTxCreatedEvent.InputTuple, ChildToParentTxCreatedEvent.OutputTuple, ChildToParentTxCreatedEvent.OutputObject>;
	getEvent(key: "NewGreeting"): TypedContractEvent<NewGreetingEvent$1.InputTuple, NewGreetingEvent$1.OutputTuple, NewGreetingEvent$1.OutputObject>;
	filters: {
		"ChildToParentTxCreated(uint256)": TypedContractEvent<ChildToParentTxCreatedEvent.InputTuple, ChildToParentTxCreatedEvent.OutputTuple, ChildToParentTxCreatedEvent.OutputObject>;
		ChildToParentTxCreated: TypedContractEvent<ChildToParentTxCreatedEvent.InputTuple, ChildToParentTxCreatedEvent.OutputTuple, ChildToParentTxCreatedEvent.OutputObject>;
		"NewGreeting(string)": TypedContractEvent<NewGreetingEvent$1.InputTuple, NewGreetingEvent$1.OutputTuple, NewGreetingEvent$1.OutputObject>;
		NewGreeting: TypedContractEvent<NewGreetingEvent$1.InputTuple, NewGreetingEvent$1.OutputTuple, NewGreetingEvent$1.OutputObject>;
	};
}
export interface GreeterParentInterface extends Interface {
	getFunction(nameOrSignature: "childTarget" | "greet" | "inbox" | "setGreeting" | "setGreetingInChild" | "updateChildTarget"): FunctionFragment;
	getEvent(nameOrSignatureOrTopic: "NewGreeting" | "RetryableTicketCreated"): EventFragment;
	encodeFunctionData(functionFragment: "childTarget", values?: undefined): string;
	encodeFunctionData(functionFragment: "greet", values?: undefined): string;
	encodeFunctionData(functionFragment: "inbox", values?: undefined): string;
	encodeFunctionData(functionFragment: "setGreeting", values: [
		string
	]): string;
	encodeFunctionData(functionFragment: "setGreetingInChild", values: [
		string,
		BigNumberish,
		BigNumberish,
		BigNumberish
	]): string;
	encodeFunctionData(functionFragment: "updateChildTarget", values: [
		AddressLike
	]): string;
	decodeFunctionResult(functionFragment: "childTarget", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "greet", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "inbox", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "setGreeting", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "setGreetingInChild", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "updateChildTarget", data: BytesLike): Result;
}
declare namespace NewGreetingEvent$2 {
	type InputTuple = [
		greeting: string
	];
	type OutputTuple = [
		greeting: string
	];
	interface OutputObject {
		greeting: string;
	}
	type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
	type Filter = TypedDeferredTopicFilter<Event>;
	type Log = TypedEventLog<Event>;
	type LogDescription = TypedLogDescription<Event>;
}
declare namespace RetryableTicketCreatedEvent {
	type InputTuple = [
		ticketId: BigNumberish
	];
	type OutputTuple = [
		ticketId: bigint
	];
	interface OutputObject {
		ticketId: bigint;
	}
	type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
	type Filter = TypedDeferredTopicFilter<Event>;
	type Log = TypedEventLog<Event>;
	type LogDescription = TypedLogDescription<Event>;
}
export interface GreeterParent extends BaseContract {
	connect(runner?: ContractRunner | null): GreeterParent;
	waitForDeployment(): Promise<this>;
	interface: GreeterParentInterface;
	queryFilter<TCEvent extends TypedContractEvent>(event: TCEvent, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
	queryFilter<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
	on<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
	on<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
	once<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
	once<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
	listeners<TCEvent extends TypedContractEvent>(event: TCEvent): Promise<Array<TypedListener<TCEvent>>>;
	listeners(eventName?: string): Promise<Array<Listener>>;
	removeAllListeners<TCEvent extends TypedContractEvent>(event?: TCEvent): Promise<this>;
	childTarget: TypedContractMethod<[
	], [
		string
	], "view">;
	greet: TypedContractMethod<[
	], [
		string
	], "view">;
	inbox: TypedContractMethod<[
	], [
		string
	], "view">;
	setGreeting: TypedContractMethod<[
		_greeting: string
	], [
		void
	], "nonpayable">;
	setGreetingInChild: TypedContractMethod<[
		_greeting: string,
		maxSubmissionCost: BigNumberish,
		maxGas: BigNumberish,
		gasPriceBid: BigNumberish
	], [
		bigint
	], "payable">;
	updateChildTarget: TypedContractMethod<[
		_childTarget: AddressLike
	], [
		void
	], "nonpayable">;
	getFunction<T extends ContractMethod = ContractMethod>(key: string | FunctionFragment): T;
	getFunction(nameOrSignature: "childTarget"): TypedContractMethod<[
	], [
		string
	], "view">;
	getFunction(nameOrSignature: "greet"): TypedContractMethod<[
	], [
		string
	], "view">;
	getFunction(nameOrSignature: "inbox"): TypedContractMethod<[
	], [
		string
	], "view">;
	getFunction(nameOrSignature: "setGreeting"): TypedContractMethod<[
		_greeting: string
	], [
		void
	], "nonpayable">;
	getFunction(nameOrSignature: "setGreetingInChild"): TypedContractMethod<[
		_greeting: string,
		maxSubmissionCost: BigNumberish,
		maxGas: BigNumberish,
		gasPriceBid: BigNumberish
	], [
		bigint
	], "payable">;
	getFunction(nameOrSignature: "updateChildTarget"): TypedContractMethod<[
		_childTarget: AddressLike
	], [
		void
	], "nonpayable">;
	getEvent(key: "NewGreeting"): TypedContractEvent<NewGreetingEvent$2.InputTuple, NewGreetingEvent$2.OutputTuple, NewGreetingEvent$2.OutputObject>;
	getEvent(key: "RetryableTicketCreated"): TypedContractEvent<RetryableTicketCreatedEvent.InputTuple, RetryableTicketCreatedEvent.OutputTuple, RetryableTicketCreatedEvent.OutputObject>;
	filters: {
		"NewGreeting(string)": TypedContractEvent<NewGreetingEvent$2.InputTuple, NewGreetingEvent$2.OutputTuple, NewGreetingEvent$2.OutputObject>;
		NewGreeting: TypedContractEvent<NewGreetingEvent$2.InputTuple, NewGreetingEvent$2.OutputTuple, NewGreetingEvent$2.OutputObject>;
		"RetryableTicketCreated(uint256)": TypedContractEvent<RetryableTicketCreatedEvent.InputTuple, RetryableTicketCreatedEvent.OutputTuple, RetryableTicketCreatedEvent.OutputObject>;
		RetryableTicketCreated: TypedContractEvent<RetryableTicketCreatedEvent.InputTuple, RetryableTicketCreatedEvent.OutputTuple, RetryableTicketCreatedEvent.OutputObject>;
	};
}
export interface IERC20ExpInterface extends Interface {
	getFunction(nameOrSignature: "DOMAIN_SEPARATOR" | "allowance" | "approve" | "balanceOf" | "decimals" | "name" | "nonces" | "permit" | "symbol" | "totalSupply" | "transfer" | "transferFrom"): FunctionFragment;
	getEvent(nameOrSignatureOrTopic: "Approval" | "Transfer"): EventFragment;
	encodeFunctionData(functionFragment: "DOMAIN_SEPARATOR", values?: undefined): string;
	encodeFunctionData(functionFragment: "allowance", values: [
		AddressLike,
		AddressLike
	]): string;
	encodeFunctionData(functionFragment: "approve", values: [
		AddressLike,
		BigNumberish
	]): string;
	encodeFunctionData(functionFragment: "balanceOf", values: [
		AddressLike
	]): string;
	encodeFunctionData(functionFragment: "decimals", values?: undefined): string;
	encodeFunctionData(functionFragment: "name", values?: undefined): string;
	encodeFunctionData(functionFragment: "nonces", values: [
		AddressLike
	]): string;
	encodeFunctionData(functionFragment: "permit", values: [
		AddressLike,
		AddressLike,
		BigNumberish,
		BigNumberish,
		BigNumberish,
		BytesLike,
		BytesLike
	]): string;
	encodeFunctionData(functionFragment: "symbol", values?: undefined): string;
	encodeFunctionData(functionFragment: "totalSupply", values?: undefined): string;
	encodeFunctionData(functionFragment: "transfer", values: [
		AddressLike,
		BigNumberish
	]): string;
	encodeFunctionData(functionFragment: "transferFrom", values: [
		AddressLike,
		AddressLike,
		BigNumberish
	]): string;
	decodeFunctionResult(functionFragment: "DOMAIN_SEPARATOR", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "allowance", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "approve", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "balanceOf", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "decimals", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "name", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "nonces", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "permit", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "symbol", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "totalSupply", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "transfer", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "transferFrom", data: BytesLike): Result;
}
declare namespace ApprovalEvent$6 {
	type InputTuple = [
		owner: AddressLike,
		spender: AddressLike,
		value: BigNumberish
	];
	type OutputTuple = [
		owner: string,
		spender: string,
		value: bigint
	];
	interface OutputObject {
		owner: string;
		spender: string;
		value: bigint;
	}
	type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
	type Filter = TypedDeferredTopicFilter<Event>;
	type Log = TypedEventLog<Event>;
	type LogDescription = TypedLogDescription<Event>;
}
declare namespace TransferEvent$6 {
	type InputTuple = [
		from: AddressLike,
		to: AddressLike,
		value: BigNumberish
	];
	type OutputTuple = [
		from: string,
		to: string,
		value: bigint
	];
	interface OutputObject {
		from: string;
		to: string;
		value: bigint;
	}
	type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
	type Filter = TypedDeferredTopicFilter<Event>;
	type Log = TypedEventLog<Event>;
	type LogDescription = TypedLogDescription<Event>;
}
export interface IERC20Exp extends BaseContract {
	connect(runner?: ContractRunner | null): IERC20Exp;
	waitForDeployment(): Promise<this>;
	interface: IERC20ExpInterface;
	queryFilter<TCEvent extends TypedContractEvent>(event: TCEvent, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
	queryFilter<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
	on<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
	on<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
	once<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
	once<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
	listeners<TCEvent extends TypedContractEvent>(event: TCEvent): Promise<Array<TypedListener<TCEvent>>>;
	listeners(eventName?: string): Promise<Array<Listener>>;
	removeAllListeners<TCEvent extends TypedContractEvent>(event?: TCEvent): Promise<this>;
	DOMAIN_SEPARATOR: TypedContractMethod<[
	], [
		string
	], "view">;
	allowance: TypedContractMethod<[
		owner: AddressLike,
		spender: AddressLike
	], [
		bigint
	], "view">;
	approve: TypedContractMethod<[
		spender: AddressLike,
		value: BigNumberish
	], [
		boolean
	], "nonpayable">;
	balanceOf: TypedContractMethod<[
		account: AddressLike
	], [
		bigint
	], "view">;
	decimals: TypedContractMethod<[
	], [
		bigint
	], "view">;
	name: TypedContractMethod<[
	], [
		string
	], "view">;
	nonces: TypedContractMethod<[
		owner: AddressLike
	], [
		bigint
	], "view">;
	permit: TypedContractMethod<[
		owner: AddressLike,
		spender: AddressLike,
		value: BigNumberish,
		deadline: BigNumberish,
		v: BigNumberish,
		r: BytesLike,
		s: BytesLike
	], [
		void
	], "nonpayable">;
	symbol: TypedContractMethod<[
	], [
		string
	], "view">;
	totalSupply: TypedContractMethod<[
	], [
		bigint
	], "view">;
	transfer: TypedContractMethod<[
		to: AddressLike,
		value: BigNumberish
	], [
		boolean
	], "nonpayable">;
	transferFrom: TypedContractMethod<[
		from: AddressLike,
		to: AddressLike,
		value: BigNumberish
	], [
		boolean
	], "nonpayable">;
	getFunction<T extends ContractMethod = ContractMethod>(key: string | FunctionFragment): T;
	getFunction(nameOrSignature: "DOMAIN_SEPARATOR"): TypedContractMethod<[
	], [
		string
	], "view">;
	getFunction(nameOrSignature: "allowance"): TypedContractMethod<[
		owner: AddressLike,
		spender: AddressLike
	], [
		bigint
	], "view">;
	getFunction(nameOrSignature: "approve"): TypedContractMethod<[
		spender: AddressLike,
		value: BigNumberish
	], [
		boolean
	], "nonpayable">;
	getFunction(nameOrSignature: "balanceOf"): TypedContractMethod<[
		account: AddressLike
	], [
		bigint
	], "view">;
	getFunction(nameOrSignature: "decimals"): TypedContractMethod<[
	], [
		bigint
	], "view">;
	getFunction(nameOrSignature: "name"): TypedContractMethod<[
	], [
		string
	], "view">;
	getFunction(nameOrSignature: "nonces"): TypedContractMethod<[
		owner: AddressLike
	], [
		bigint
	], "view">;
	getFunction(nameOrSignature: "permit"): TypedContractMethod<[
		owner: AddressLike,
		spender: AddressLike,
		value: BigNumberish,
		deadline: BigNumberish,
		v: BigNumberish,
		r: BytesLike,
		s: BytesLike
	], [
		void
	], "nonpayable">;
	getFunction(nameOrSignature: "symbol"): TypedContractMethod<[
	], [
		string
	], "view">;
	getFunction(nameOrSignature: "totalSupply"): TypedContractMethod<[
	], [
		bigint
	], "view">;
	getFunction(nameOrSignature: "transfer"): TypedContractMethod<[
		to: AddressLike,
		value: BigNumberish
	], [
		boolean
	], "nonpayable">;
	getFunction(nameOrSignature: "transferFrom"): TypedContractMethod<[
		from: AddressLike,
		to: AddressLike,
		value: BigNumberish
	], [
		boolean
	], "nonpayable">;
	getEvent(key: "Approval"): TypedContractEvent<ApprovalEvent$6.InputTuple, ApprovalEvent$6.OutputTuple, ApprovalEvent$6.OutputObject>;
	getEvent(key: "Transfer"): TypedContractEvent<TransferEvent$6.InputTuple, TransferEvent$6.OutputTuple, TransferEvent$6.OutputObject>;
	filters: {
		"Approval(address,address,uint256)": TypedContractEvent<ApprovalEvent$6.InputTuple, ApprovalEvent$6.OutputTuple, ApprovalEvent$6.OutputObject>;
		Approval: TypedContractEvent<ApprovalEvent$6.InputTuple, ApprovalEvent$6.OutputTuple, ApprovalEvent$6.OutputObject>;
		"Transfer(address,address,uint256)": TypedContractEvent<TransferEvent$6.InputTuple, TransferEvent$6.OutputTuple, TransferEvent$6.OutputObject>;
		Transfer: TypedContractEvent<TransferEvent$6.InputTuple, TransferEvent$6.OutputTuple, TransferEvent$6.OutputObject>;
	};
}
export interface IERC20MintableInterface extends Interface {
	getFunction(nameOrSignature: "DOMAIN_SEPARATOR" | "allowance" | "approve" | "balanceOf" | "burn" | "burnFrom" | "decimals" | "mint" | "name" | "nonces" | "permit" | "symbol" | "totalSupply" | "transfer" | "transferFrom"): FunctionFragment;
	getEvent(nameOrSignatureOrTopic: "Approval" | "Transfer"): EventFragment;
	encodeFunctionData(functionFragment: "DOMAIN_SEPARATOR", values?: undefined): string;
	encodeFunctionData(functionFragment: "allowance", values: [
		AddressLike,
		AddressLike
	]): string;
	encodeFunctionData(functionFragment: "approve", values: [
		AddressLike,
		BigNumberish
	]): string;
	encodeFunctionData(functionFragment: "balanceOf", values: [
		AddressLike
	]): string;
	encodeFunctionData(functionFragment: "burn", values: [
		BigNumberish
	]): string;
	encodeFunctionData(functionFragment: "burnFrom", values: [
		AddressLike,
		BigNumberish
	]): string;
	encodeFunctionData(functionFragment: "decimals", values?: undefined): string;
	encodeFunctionData(functionFragment: "mint", values: [
		AddressLike,
		BigNumberish
	]): string;
	encodeFunctionData(functionFragment: "name", values?: undefined): string;
	encodeFunctionData(functionFragment: "nonces", values: [
		AddressLike
	]): string;
	encodeFunctionData(functionFragment: "permit", values: [
		AddressLike,
		AddressLike,
		BigNumberish,
		BigNumberish,
		BigNumberish,
		BytesLike,
		BytesLike
	]): string;
	encodeFunctionData(functionFragment: "symbol", values?: undefined): string;
	encodeFunctionData(functionFragment: "totalSupply", values?: undefined): string;
	encodeFunctionData(functionFragment: "transfer", values: [
		AddressLike,
		BigNumberish
	]): string;
	encodeFunctionData(functionFragment: "transferFrom", values: [
		AddressLike,
		AddressLike,
		BigNumberish
	]): string;
	decodeFunctionResult(functionFragment: "DOMAIN_SEPARATOR", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "allowance", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "approve", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "balanceOf", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "burn", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "burnFrom", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "decimals", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "mint", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "name", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "nonces", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "permit", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "symbol", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "totalSupply", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "transfer", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "transferFrom", data: BytesLike): Result;
}
declare namespace ApprovalEvent$7 {
	type InputTuple = [
		owner: AddressLike,
		spender: AddressLike,
		value: BigNumberish
	];
	type OutputTuple = [
		owner: string,
		spender: string,
		value: bigint
	];
	interface OutputObject {
		owner: string;
		spender: string;
		value: bigint;
	}
	type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
	type Filter = TypedDeferredTopicFilter<Event>;
	type Log = TypedEventLog<Event>;
	type LogDescription = TypedLogDescription<Event>;
}
declare namespace TransferEvent$7 {
	type InputTuple = [
		from: AddressLike,
		to: AddressLike,
		value: BigNumberish
	];
	type OutputTuple = [
		from: string,
		to: string,
		value: bigint
	];
	interface OutputObject {
		from: string;
		to: string;
		value: bigint;
	}
	type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
	type Filter = TypedDeferredTopicFilter<Event>;
	type Log = TypedEventLog<Event>;
	type LogDescription = TypedLogDescription<Event>;
}
export interface IERC20Mintable extends BaseContract {
	connect(runner?: ContractRunner | null): IERC20Mintable;
	waitForDeployment(): Promise<this>;
	interface: IERC20MintableInterface;
	queryFilter<TCEvent extends TypedContractEvent>(event: TCEvent, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
	queryFilter<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
	on<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
	on<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
	once<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
	once<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
	listeners<TCEvent extends TypedContractEvent>(event: TCEvent): Promise<Array<TypedListener<TCEvent>>>;
	listeners(eventName?: string): Promise<Array<Listener>>;
	removeAllListeners<TCEvent extends TypedContractEvent>(event?: TCEvent): Promise<this>;
	DOMAIN_SEPARATOR: TypedContractMethod<[
	], [
		string
	], "view">;
	allowance: TypedContractMethod<[
		owner: AddressLike,
		spender: AddressLike
	], [
		bigint
	], "view">;
	approve: TypedContractMethod<[
		spender: AddressLike,
		value: BigNumberish
	], [
		boolean
	], "nonpayable">;
	balanceOf: TypedContractMethod<[
		account: AddressLike
	], [
		bigint
	], "view">;
	burn: TypedContractMethod<[
		value: BigNumberish
	], [
		void
	], "nonpayable">;
	burnFrom: TypedContractMethod<[
		account: AddressLike,
		amount: BigNumberish
	], [
		void
	], "nonpayable">;
	decimals: TypedContractMethod<[
	], [
		bigint
	], "view">;
	mint: TypedContractMethod<[
		to: AddressLike,
		amount: BigNumberish
	], [
		void
	], "nonpayable">;
	name: TypedContractMethod<[
	], [
		string
	], "view">;
	nonces: TypedContractMethod<[
		owner: AddressLike
	], [
		bigint
	], "view">;
	permit: TypedContractMethod<[
		owner: AddressLike,
		spender: AddressLike,
		value: BigNumberish,
		deadline: BigNumberish,
		v: BigNumberish,
		r: BytesLike,
		s: BytesLike
	], [
		void
	], "nonpayable">;
	symbol: TypedContractMethod<[
	], [
		string
	], "view">;
	totalSupply: TypedContractMethod<[
	], [
		bigint
	], "view">;
	transfer: TypedContractMethod<[
		to: AddressLike,
		value: BigNumberish
	], [
		boolean
	], "nonpayable">;
	transferFrom: TypedContractMethod<[
		from: AddressLike,
		to: AddressLike,
		value: BigNumberish
	], [
		boolean
	], "nonpayable">;
	getFunction<T extends ContractMethod = ContractMethod>(key: string | FunctionFragment): T;
	getFunction(nameOrSignature: "DOMAIN_SEPARATOR"): TypedContractMethod<[
	], [
		string
	], "view">;
	getFunction(nameOrSignature: "allowance"): TypedContractMethod<[
		owner: AddressLike,
		spender: AddressLike
	], [
		bigint
	], "view">;
	getFunction(nameOrSignature: "approve"): TypedContractMethod<[
		spender: AddressLike,
		value: BigNumberish
	], [
		boolean
	], "nonpayable">;
	getFunction(nameOrSignature: "balanceOf"): TypedContractMethod<[
		account: AddressLike
	], [
		bigint
	], "view">;
	getFunction(nameOrSignature: "burn"): TypedContractMethod<[
		value: BigNumberish
	], [
		void
	], "nonpayable">;
	getFunction(nameOrSignature: "burnFrom"): TypedContractMethod<[
		account: AddressLike,
		amount: BigNumberish
	], [
		void
	], "nonpayable">;
	getFunction(nameOrSignature: "decimals"): TypedContractMethod<[
	], [
		bigint
	], "view">;
	getFunction(nameOrSignature: "mint"): TypedContractMethod<[
		to: AddressLike,
		amount: BigNumberish
	], [
		void
	], "nonpayable">;
	getFunction(nameOrSignature: "name"): TypedContractMethod<[
	], [
		string
	], "view">;
	getFunction(nameOrSignature: "nonces"): TypedContractMethod<[
		owner: AddressLike
	], [
		bigint
	], "view">;
	getFunction(nameOrSignature: "permit"): TypedContractMethod<[
		owner: AddressLike,
		spender: AddressLike,
		value: BigNumberish,
		deadline: BigNumberish,
		v: BigNumberish,
		r: BytesLike,
		s: BytesLike
	], [
		void
	], "nonpayable">;
	getFunction(nameOrSignature: "symbol"): TypedContractMethod<[
	], [
		string
	], "view">;
	getFunction(nameOrSignature: "totalSupply"): TypedContractMethod<[
	], [
		bigint
	], "view">;
	getFunction(nameOrSignature: "transfer"): TypedContractMethod<[
		to: AddressLike,
		value: BigNumberish
	], [
		boolean
	], "nonpayable">;
	getFunction(nameOrSignature: "transferFrom"): TypedContractMethod<[
		from: AddressLike,
		to: AddressLike,
		value: BigNumberish
	], [
		boolean
	], "nonpayable">;
	getEvent(key: "Approval"): TypedContractEvent<ApprovalEvent$7.InputTuple, ApprovalEvent$7.OutputTuple, ApprovalEvent$7.OutputObject>;
	getEvent(key: "Transfer"): TypedContractEvent<TransferEvent$7.InputTuple, TransferEvent$7.OutputTuple, TransferEvent$7.OutputObject>;
	filters: {
		"Approval(address,address,uint256)": TypedContractEvent<ApprovalEvent$7.InputTuple, ApprovalEvent$7.OutputTuple, ApprovalEvent$7.OutputObject>;
		Approval: TypedContractEvent<ApprovalEvent$7.InputTuple, ApprovalEvent$7.OutputTuple, ApprovalEvent$7.OutputObject>;
		"Transfer(address,address,uint256)": TypedContractEvent<TransferEvent$7.InputTuple, TransferEvent$7.OutputTuple, TransferEvent$7.OutputObject>;
		Transfer: TypedContractEvent<TransferEvent$7.InputTuple, TransferEvent$7.OutputTuple, TransferEvent$7.OutputObject>;
	};
}
export interface IGatewayInterface extends Interface {
	getFunction(nameOrSignature: "bridgeFrom" | "bridgeMsg" | "bridgeTo" | "bridgeToPermit"): FunctionFragment;
	encodeFunctionData(functionFragment: "bridgeFrom", values: [
		BigNumberish,
		AddressLike,
		AddressLike,
		AddressLike,
		BigNumberish,
		BytesLike,
		BigNumberish
	]): string;
	encodeFunctionData(functionFragment: "bridgeMsg", values: [
		BigNumberish,
		string
	]): string;
	encodeFunctionData(functionFragment: "bridgeTo", values: [
		AddressLike,
		AddressLike,
		BigNumberish,
		BytesLike,
		BigNumberish,
		BigNumberish,
		BigNumberish
	]): string;
	encodeFunctionData(functionFragment: "bridgeToPermit", values: [
		AddressLike,
		AddressLike,
		BigNumberish,
		BytesLike,
		BigNumberish,
		BigNumberish,
		BigNumberish,
		BigNumberish,
		BytesLike
	]): string;
	decodeFunctionResult(functionFragment: "bridgeFrom", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "bridgeMsg", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "bridgeTo", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "bridgeToPermit", data: BytesLike): Result;
}
export interface IGateway extends BaseContract {
	connect(runner?: ContractRunner | null): IGateway;
	waitForDeployment(): Promise<this>;
	interface: IGatewayInterface;
	queryFilter<TCEvent extends TypedContractEvent>(event: TCEvent, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
	queryFilter<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
	on<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
	on<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
	once<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
	once<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
	listeners<TCEvent extends TypedContractEvent>(event: TCEvent): Promise<Array<TypedListener<TCEvent>>>;
	listeners(eventName?: string): Promise<Array<Listener>>;
	removeAllListeners<TCEvent extends TypedContractEvent>(event?: TCEvent): Promise<this>;
	bridgeFrom: TypedContractMethod<[
		tokenDecimals: BigNumberish,
		token: AddressLike,
		from: AddressLike,
		to: AddressLike,
		value: BigNumberish,
		data: BytesLike,
		nonce: BigNumberish
	], [
		bigint
	], "payable">;
	bridgeMsg: TypedContractMethod<[
		nonce: BigNumberish,
		msg: string
	], [
		void
	], "nonpayable">;
	bridgeTo: TypedContractMethod<[
		token: AddressLike,
		to: AddressLike,
		value: BigNumberish,
		data: BytesLike,
		maxSubmissionCost: BigNumberish,
		maxGas: BigNumberish,
		gasPriceBid: BigNumberish
	], [
		bigint
	], "payable">;
	bridgeToPermit: TypedContractMethod<[
		token: AddressLike,
		to: AddressLike,
		value: BigNumberish,
		data: BytesLike,
		maxSubmissionCost: BigNumberish,
		maxGas: BigNumberish,
		gasPriceBid: BigNumberish,
		deadline: BigNumberish,
		signature: BytesLike
	], [
		bigint
	], "payable">;
	getFunction<T extends ContractMethod = ContractMethod>(key: string | FunctionFragment): T;
	getFunction(nameOrSignature: "bridgeFrom"): TypedContractMethod<[
		tokenDecimals: BigNumberish,
		token: AddressLike,
		from: AddressLike,
		to: AddressLike,
		value: BigNumberish,
		data: BytesLike,
		nonce: BigNumberish
	], [
		bigint
	], "payable">;
	getFunction(nameOrSignature: "bridgeMsg"): TypedContractMethod<[
		nonce: BigNumberish,
		msg: string
	], [
		void
	], "nonpayable">;
	getFunction(nameOrSignature: "bridgeTo"): TypedContractMethod<[
		token: AddressLike,
		to: AddressLike,
		value: BigNumberish,
		data: BytesLike,
		maxSubmissionCost: BigNumberish,
		maxGas: BigNumberish,
		gasPriceBid: BigNumberish
	], [
		bigint
	], "payable">;
	getFunction(nameOrSignature: "bridgeToPermit"): TypedContractMethod<[
		token: AddressLike,
		to: AddressLike,
		value: BigNumberish,
		data: BytesLike,
		maxSubmissionCost: BigNumberish,
		maxGas: BigNumberish,
		gasPriceBid: BigNumberish,
		deadline: BigNumberish,
		signature: BytesLike
	], [
		bigint
	], "payable">;
	filters: {};
}
export interface IInitializableProxyInterface extends Interface {
	getFunction(nameOrSignature: "admin" | "changeAdmin" | "implementation" | "initializeProxy" | "upgradeToAndCall"): FunctionFragment;
	encodeFunctionData(functionFragment: "admin", values?: undefined): string;
	encodeFunctionData(functionFragment: "changeAdmin", values: [
		AddressLike
	]): string;
	encodeFunctionData(functionFragment: "implementation", values?: undefined): string;
	encodeFunctionData(functionFragment: "initializeProxy", values: [
		AddressLike,
		AddressLike,
		BytesLike
	]): string;
	encodeFunctionData(functionFragment: "upgradeToAndCall", values: [
		AddressLike,
		BytesLike
	]): string;
	decodeFunctionResult(functionFragment: "admin", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "changeAdmin", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "implementation", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "initializeProxy", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "upgradeToAndCall", data: BytesLike): Result;
}
export interface IInitializableProxy extends BaseContract {
	connect(runner?: ContractRunner | null): IInitializableProxy;
	waitForDeployment(): Promise<this>;
	interface: IInitializableProxyInterface;
	queryFilter<TCEvent extends TypedContractEvent>(event: TCEvent, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
	queryFilter<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
	on<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
	on<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
	once<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
	once<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
	listeners<TCEvent extends TypedContractEvent>(event: TCEvent): Promise<Array<TypedListener<TCEvent>>>;
	listeners(eventName?: string): Promise<Array<Listener>>;
	removeAllListeners<TCEvent extends TypedContractEvent>(event?: TCEvent): Promise<this>;
	admin: TypedContractMethod<[
	], [
		string
	], "nonpayable">;
	changeAdmin: TypedContractMethod<[
		newAdmin: AddressLike
	], [
		void
	], "nonpayable">;
	implementation: TypedContractMethod<[
	], [
		string
	], "nonpayable">;
	initializeProxy: TypedContractMethod<[
		newAdmin: AddressLike,
		newImplementation: AddressLike,
		data: BytesLike
	], [
		void
	], "payable">;
	upgradeToAndCall: TypedContractMethod<[
		newImplementation: AddressLike,
		data: BytesLike
	], [
		void
	], "payable">;
	getFunction<T extends ContractMethod = ContractMethod>(key: string | FunctionFragment): T;
	getFunction(nameOrSignature: "admin"): TypedContractMethod<[
	], [
		string
	], "nonpayable">;
	getFunction(nameOrSignature: "changeAdmin"): TypedContractMethod<[
		newAdmin: AddressLike
	], [
		void
	], "nonpayable">;
	getFunction(nameOrSignature: "implementation"): TypedContractMethod<[
	], [
		string
	], "nonpayable">;
	getFunction(nameOrSignature: "initializeProxy"): TypedContractMethod<[
		newAdmin: AddressLike,
		newImplementation: AddressLike,
		data: BytesLike
	], [
		void
	], "payable">;
	getFunction(nameOrSignature: "upgradeToAndCall"): TypedContractMethod<[
		newImplementation: AddressLike,
		data: BytesLike
	], [
		void
	], "payable">;
	filters: {};
}
export interface SigLibInterface extends Interface {
}
export interface SigLib extends BaseContract {
	connect(runner?: ContractRunner | null): SigLib;
	waitForDeployment(): Promise<this>;
	interface: SigLibInterface;
	queryFilter<TCEvent extends TypedContractEvent>(event: TCEvent, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
	queryFilter<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
	on<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
	on<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
	once<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
	once<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
	listeners<TCEvent extends TypedContractEvent>(event: TCEvent): Promise<Array<TypedListener<TCEvent>>>;
	listeners(eventName?: string): Promise<Array<Listener>>;
	removeAllListeners<TCEvent extends TypedContractEvent>(event?: TCEvent): Promise<this>;
	getFunction<T extends ContractMethod = ContractMethod>(key: string | FunctionFragment): T;
	filters: {};
}
export interface WithSettlerInterface extends Interface {
	getFunction(nameOrSignature: "addSettler" | "initialize" | "owner" | "removeSettler" | "renounceOwnership" | "settlers" | "transferOwnership"): FunctionFragment;
	getEvent(nameOrSignatureOrTopic: "AddSettler" | "Initialized" | "OwnershipTransferred" | "RemoveSettler"): EventFragment;
	encodeFunctionData(functionFragment: "addSettler", values: [
		AddressLike
	]): string;
	encodeFunctionData(functionFragment: "initialize", values: [
		AddressLike
	]): string;
	encodeFunctionData(functionFragment: "owner", values?: undefined): string;
	encodeFunctionData(functionFragment: "removeSettler", values: [
		AddressLike
	]): string;
	encodeFunctionData(functionFragment: "renounceOwnership", values?: undefined): string;
	encodeFunctionData(functionFragment: "settlers", values?: undefined): string;
	encodeFunctionData(functionFragment: "transferOwnership", values: [
		AddressLike
	]): string;
	decodeFunctionResult(functionFragment: "addSettler", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "initialize", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "removeSettler", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "renounceOwnership", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "settlers", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "transferOwnership", data: BytesLike): Result;
}
declare namespace AddSettlerEvent {
	type InputTuple = [
		newSettler: AddressLike
	];
	type OutputTuple = [
		newSettler: string
	];
	interface OutputObject {
		newSettler: string;
	}
	type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
	type Filter = TypedDeferredTopicFilter<Event>;
	type Log = TypedEventLog<Event>;
	type LogDescription = TypedLogDescription<Event>;
}
declare namespace InitializedEvent$5 {
	type InputTuple = [
		version: BigNumberish
	];
	type OutputTuple = [
		version: bigint
	];
	interface OutputObject {
		version: bigint;
	}
	type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
	type Filter = TypedDeferredTopicFilter<Event>;
	type Log = TypedEventLog<Event>;
	type LogDescription = TypedLogDescription<Event>;
}
declare namespace OwnershipTransferredEvent$4 {
	type InputTuple = [
		previousOwner: AddressLike,
		newOwner: AddressLike
	];
	type OutputTuple = [
		previousOwner: string,
		newOwner: string
	];
	interface OutputObject {
		previousOwner: string;
		newOwner: string;
	}
	type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
	type Filter = TypedDeferredTopicFilter<Event>;
	type Log = TypedEventLog<Event>;
	type LogDescription = TypedLogDescription<Event>;
}
declare namespace RemoveSettlerEvent {
	type InputTuple = [
		oldSettler: AddressLike
	];
	type OutputTuple = [
		oldSettler: string
	];
	interface OutputObject {
		oldSettler: string;
	}
	type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
	type Filter = TypedDeferredTopicFilter<Event>;
	type Log = TypedEventLog<Event>;
	type LogDescription = TypedLogDescription<Event>;
}
export interface WithSettler extends BaseContract {
	connect(runner?: ContractRunner | null): WithSettler;
	waitForDeployment(): Promise<this>;
	interface: WithSettlerInterface;
	queryFilter<TCEvent extends TypedContractEvent>(event: TCEvent, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
	queryFilter<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
	on<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
	on<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
	once<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
	once<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
	listeners<TCEvent extends TypedContractEvent>(event: TCEvent): Promise<Array<TypedListener<TCEvent>>>;
	listeners(eventName?: string): Promise<Array<Listener>>;
	removeAllListeners<TCEvent extends TypedContractEvent>(event?: TCEvent): Promise<this>;
	addSettler: TypedContractMethod<[
		_settler: AddressLike
	], [
		void
	], "nonpayable">;
	initialize: TypedContractMethod<[
		_initOwner: AddressLike
	], [
		void
	], "nonpayable">;
	owner: TypedContractMethod<[
	], [
		string
	], "view">;
	removeSettler: TypedContractMethod<[
		_settler: AddressLike
	], [
		void
	], "nonpayable">;
	renounceOwnership: TypedContractMethod<[
	], [
		void
	], "nonpayable">;
	settlers: TypedContractMethod<[
	], [
		string[]
	], "view">;
	transferOwnership: TypedContractMethod<[
		newOwner: AddressLike
	], [
		void
	], "nonpayable">;
	getFunction<T extends ContractMethod = ContractMethod>(key: string | FunctionFragment): T;
	getFunction(nameOrSignature: "addSettler"): TypedContractMethod<[
		_settler: AddressLike
	], [
		void
	], "nonpayable">;
	getFunction(nameOrSignature: "initialize"): TypedContractMethod<[
		_initOwner: AddressLike
	], [
		void
	], "nonpayable">;
	getFunction(nameOrSignature: "owner"): TypedContractMethod<[
	], [
		string
	], "view">;
	getFunction(nameOrSignature: "removeSettler"): TypedContractMethod<[
		_settler: AddressLike
	], [
		void
	], "nonpayable">;
	getFunction(nameOrSignature: "renounceOwnership"): TypedContractMethod<[
	], [
		void
	], "nonpayable">;
	getFunction(nameOrSignature: "settlers"): TypedContractMethod<[
	], [
		string[]
	], "view">;
	getFunction(nameOrSignature: "transferOwnership"): TypedContractMethod<[
		newOwner: AddressLike
	], [
		void
	], "nonpayable">;
	getEvent(key: "AddSettler"): TypedContractEvent<AddSettlerEvent.InputTuple, AddSettlerEvent.OutputTuple, AddSettlerEvent.OutputObject>;
	getEvent(key: "Initialized"): TypedContractEvent<InitializedEvent$5.InputTuple, InitializedEvent$5.OutputTuple, InitializedEvent$5.OutputObject>;
	getEvent(key: "OwnershipTransferred"): TypedContractEvent<OwnershipTransferredEvent$4.InputTuple, OwnershipTransferredEvent$4.OutputTuple, OwnershipTransferredEvent$4.OutputObject>;
	getEvent(key: "RemoveSettler"): TypedContractEvent<RemoveSettlerEvent.InputTuple, RemoveSettlerEvent.OutputTuple, RemoveSettlerEvent.OutputObject>;
	filters: {
		"AddSettler(address)": TypedContractEvent<AddSettlerEvent.InputTuple, AddSettlerEvent.OutputTuple, AddSettlerEvent.OutputObject>;
		AddSettler: TypedContractEvent<AddSettlerEvent.InputTuple, AddSettlerEvent.OutputTuple, AddSettlerEvent.OutputObject>;
		"Initialized(uint64)": TypedContractEvent<InitializedEvent$5.InputTuple, InitializedEvent$5.OutputTuple, InitializedEvent$5.OutputObject>;
		Initialized: TypedContractEvent<InitializedEvent$5.InputTuple, InitializedEvent$5.OutputTuple, InitializedEvent$5.OutputObject>;
		"OwnershipTransferred(address,address)": TypedContractEvent<OwnershipTransferredEvent$4.InputTuple, OwnershipTransferredEvent$4.OutputTuple, OwnershipTransferredEvent$4.OutputObject>;
		OwnershipTransferred: TypedContractEvent<OwnershipTransferredEvent$4.InputTuple, OwnershipTransferredEvent$4.OutputTuple, OwnershipTransferredEvent$4.OutputObject>;
		"RemoveSettler(address)": TypedContractEvent<RemoveSettlerEvent.InputTuple, RemoveSettlerEvent.OutputTuple, RemoveSettlerEvent.OutputObject>;
		RemoveSettler: TypedContractEvent<RemoveSettlerEvent.InputTuple, RemoveSettlerEvent.OutputTuple, RemoveSettlerEvent.OutputObject>;
	};
}
export interface InitializableProxyInterface extends Interface {
	getFunction(nameOrSignature: "admin" | "changeAdmin" | "implementation" | "initializeProxy" | "upgradeToAndCall"): FunctionFragment;
	getEvent(nameOrSignatureOrTopic: "AdminChanged" | "Upgraded"): EventFragment;
	encodeFunctionData(functionFragment: "admin", values?: undefined): string;
	encodeFunctionData(functionFragment: "changeAdmin", values: [
		AddressLike
	]): string;
	encodeFunctionData(functionFragment: "implementation", values?: undefined): string;
	encodeFunctionData(functionFragment: "initializeProxy", values: [
		AddressLike,
		AddressLike,
		BytesLike
	]): string;
	encodeFunctionData(functionFragment: "upgradeToAndCall", values: [
		AddressLike,
		BytesLike
	]): string;
	decodeFunctionResult(functionFragment: "admin", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "changeAdmin", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "implementation", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "initializeProxy", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "upgradeToAndCall", data: BytesLike): Result;
}
declare namespace AdminChangedEvent$1 {
	type InputTuple = [
		previousAdmin: AddressLike,
		newAdmin: AddressLike
	];
	type OutputTuple = [
		previousAdmin: string,
		newAdmin: string
	];
	interface OutputObject {
		previousAdmin: string;
		newAdmin: string;
	}
	type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
	type Filter = TypedDeferredTopicFilter<Event>;
	type Log = TypedEventLog<Event>;
	type LogDescription = TypedLogDescription<Event>;
}
declare namespace UpgradedEvent$1 {
	type InputTuple = [
		implementation: AddressLike
	];
	type OutputTuple = [
		implementation: string
	];
	interface OutputObject {
		implementation: string;
	}
	type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
	type Filter = TypedDeferredTopicFilter<Event>;
	type Log = TypedEventLog<Event>;
	type LogDescription = TypedLogDescription<Event>;
}
export interface InitializableProxy extends BaseContract {
	connect(runner?: ContractRunner | null): InitializableProxy;
	waitForDeployment(): Promise<this>;
	interface: InitializableProxyInterface;
	queryFilter<TCEvent extends TypedContractEvent>(event: TCEvent, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
	queryFilter<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
	on<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
	on<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
	once<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
	once<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
	listeners<TCEvent extends TypedContractEvent>(event: TCEvent): Promise<Array<TypedListener<TCEvent>>>;
	listeners(eventName?: string): Promise<Array<Listener>>;
	removeAllListeners<TCEvent extends TypedContractEvent>(event?: TCEvent): Promise<this>;
	admin: TypedContractMethod<[
	], [
		string
	], "view">;
	changeAdmin: TypedContractMethod<[
		newAdmin: AddressLike
	], [
		void
	], "nonpayable">;
	implementation: TypedContractMethod<[
	], [
		string
	], "view">;
	initializeProxy: TypedContractMethod<[
		newAdmin: AddressLike,
		newImplementation: AddressLike,
		data: BytesLike
	], [
		void
	], "payable">;
	upgradeToAndCall: TypedContractMethod<[
		newImplementation: AddressLike,
		data: BytesLike
	], [
		void
	], "payable">;
	getFunction<T extends ContractMethod = ContractMethod>(key: string | FunctionFragment): T;
	getFunction(nameOrSignature: "admin"): TypedContractMethod<[
	], [
		string
	], "view">;
	getFunction(nameOrSignature: "changeAdmin"): TypedContractMethod<[
		newAdmin: AddressLike
	], [
		void
	], "nonpayable">;
	getFunction(nameOrSignature: "implementation"): TypedContractMethod<[
	], [
		string
	], "view">;
	getFunction(nameOrSignature: "initializeProxy"): TypedContractMethod<[
		newAdmin: AddressLike,
		newImplementation: AddressLike,
		data: BytesLike
	], [
		void
	], "payable">;
	getFunction(nameOrSignature: "upgradeToAndCall"): TypedContractMethod<[
		newImplementation: AddressLike,
		data: BytesLike
	], [
		void
	], "payable">;
	getEvent(key: "AdminChanged"): TypedContractEvent<AdminChangedEvent$1.InputTuple, AdminChangedEvent$1.OutputTuple, AdminChangedEvent$1.OutputObject>;
	getEvent(key: "Upgraded"): TypedContractEvent<UpgradedEvent$1.InputTuple, UpgradedEvent$1.OutputTuple, UpgradedEvent$1.OutputObject>;
	filters: {
		"AdminChanged(address,address)": TypedContractEvent<AdminChangedEvent$1.InputTuple, AdminChangedEvent$1.OutputTuple, AdminChangedEvent$1.OutputObject>;
		AdminChanged: TypedContractEvent<AdminChangedEvent$1.InputTuple, AdminChangedEvent$1.OutputTuple, AdminChangedEvent$1.OutputObject>;
		"Upgraded(address)": TypedContractEvent<UpgradedEvent$1.InputTuple, UpgradedEvent$1.OutputTuple, UpgradedEvent$1.OutputObject>;
		Upgraded: TypedContractEvent<UpgradedEvent$1.InputTuple, UpgradedEvent$1.OutputTuple, UpgradedEvent$1.OutputObject>;
	};
}
export interface ArowanaInterface extends Interface {
	getFunction(nameOrSignature: "DOMAIN_SEPARATOR" | "allowance" | "approve" | "balanceOf" | "burn" | "burnFrom" | "decimals" | "eip712Domain" | "maxSupply" | "name" | "nonces" | "permit" | "symbol" | "totalSupply" | "transfer" | "transferFrom"): FunctionFragment;
	getEvent(nameOrSignatureOrTopic: "Approval" | "EIP712DomainChanged" | "Transfer"): EventFragment;
	encodeFunctionData(functionFragment: "DOMAIN_SEPARATOR", values?: undefined): string;
	encodeFunctionData(functionFragment: "allowance", values: [
		AddressLike,
		AddressLike
	]): string;
	encodeFunctionData(functionFragment: "approve", values: [
		AddressLike,
		BigNumberish
	]): string;
	encodeFunctionData(functionFragment: "balanceOf", values: [
		AddressLike
	]): string;
	encodeFunctionData(functionFragment: "burn", values: [
		BigNumberish
	]): string;
	encodeFunctionData(functionFragment: "burnFrom", values: [
		AddressLike,
		BigNumberish
	]): string;
	encodeFunctionData(functionFragment: "decimals", values?: undefined): string;
	encodeFunctionData(functionFragment: "eip712Domain", values?: undefined): string;
	encodeFunctionData(functionFragment: "maxSupply", values?: undefined): string;
	encodeFunctionData(functionFragment: "name", values?: undefined): string;
	encodeFunctionData(functionFragment: "nonces", values: [
		AddressLike
	]): string;
	encodeFunctionData(functionFragment: "permit", values: [
		AddressLike,
		AddressLike,
		BigNumberish,
		BigNumberish,
		BigNumberish,
		BytesLike,
		BytesLike
	]): string;
	encodeFunctionData(functionFragment: "symbol", values?: undefined): string;
	encodeFunctionData(functionFragment: "totalSupply", values?: undefined): string;
	encodeFunctionData(functionFragment: "transfer", values: [
		AddressLike,
		BigNumberish
	]): string;
	encodeFunctionData(functionFragment: "transferFrom", values: [
		AddressLike,
		AddressLike,
		BigNumberish
	]): string;
	decodeFunctionResult(functionFragment: "DOMAIN_SEPARATOR", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "allowance", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "approve", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "balanceOf", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "burn", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "burnFrom", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "decimals", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "eip712Domain", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "maxSupply", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "name", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "nonces", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "permit", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "symbol", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "totalSupply", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "transfer", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "transferFrom", data: BytesLike): Result;
}
declare namespace ApprovalEvent$8 {
	type InputTuple = [
		owner: AddressLike,
		spender: AddressLike,
		value: BigNumberish
	];
	type OutputTuple = [
		owner: string,
		spender: string,
		value: bigint
	];
	interface OutputObject {
		owner: string;
		spender: string;
		value: bigint;
	}
	type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
	type Filter = TypedDeferredTopicFilter<Event>;
	type Log = TypedEventLog<Event>;
	type LogDescription = TypedLogDescription<Event>;
}
declare namespace EIP712DomainChangedEvent$3 {
	type InputTuple = [
	];
	type OutputTuple = [
	];
	interface OutputObject {
	}
	type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
	type Filter = TypedDeferredTopicFilter<Event>;
	type Log = TypedEventLog<Event>;
	type LogDescription = TypedLogDescription<Event>;
}
declare namespace TransferEvent$8 {
	type InputTuple = [
		from: AddressLike,
		to: AddressLike,
		value: BigNumberish
	];
	type OutputTuple = [
		from: string,
		to: string,
		value: bigint
	];
	interface OutputObject {
		from: string;
		to: string;
		value: bigint;
	}
	type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
	type Filter = TypedDeferredTopicFilter<Event>;
	type Log = TypedEventLog<Event>;
	type LogDescription = TypedLogDescription<Event>;
}
export interface Arowana extends BaseContract {
	connect(runner?: ContractRunner | null): Arowana;
	waitForDeployment(): Promise<this>;
	interface: ArowanaInterface;
	queryFilter<TCEvent extends TypedContractEvent>(event: TCEvent, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
	queryFilter<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
	on<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
	on<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
	once<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
	once<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
	listeners<TCEvent extends TypedContractEvent>(event: TCEvent): Promise<Array<TypedListener<TCEvent>>>;
	listeners(eventName?: string): Promise<Array<Listener>>;
	removeAllListeners<TCEvent extends TypedContractEvent>(event?: TCEvent): Promise<this>;
	DOMAIN_SEPARATOR: TypedContractMethod<[
	], [
		string
	], "view">;
	allowance: TypedContractMethod<[
		owner: AddressLike,
		spender: AddressLike
	], [
		bigint
	], "view">;
	approve: TypedContractMethod<[
		spender: AddressLike,
		value: BigNumberish
	], [
		boolean
	], "nonpayable">;
	balanceOf: TypedContractMethod<[
		account: AddressLike
	], [
		bigint
	], "view">;
	burn: TypedContractMethod<[
		value: BigNumberish
	], [
		void
	], "nonpayable">;
	burnFrom: TypedContractMethod<[
		account: AddressLike,
		value: BigNumberish
	], [
		void
	], "nonpayable">;
	decimals: TypedContractMethod<[
	], [
		bigint
	], "view">;
	eip712Domain: TypedContractMethod<[
	], [
		[
			string,
			string,
			string,
			bigint,
			string,
			string,
			bigint[]
		] & {
			fields: string;
			name: string;
			version: string;
			chainId: bigint;
			verifyingContract: string;
			salt: string;
			extensions: bigint[];
		}
	], "view">;
	maxSupply: TypedContractMethod<[
	], [
		bigint
	], "view">;
	name: TypedContractMethod<[
	], [
		string
	], "view">;
	nonces: TypedContractMethod<[
		owner: AddressLike
	], [
		bigint
	], "view">;
	permit: TypedContractMethod<[
		owner: AddressLike,
		spender: AddressLike,
		value: BigNumberish,
		deadline: BigNumberish,
		v: BigNumberish,
		r: BytesLike,
		s: BytesLike
	], [
		void
	], "nonpayable">;
	symbol: TypedContractMethod<[
	], [
		string
	], "view">;
	totalSupply: TypedContractMethod<[
	], [
		bigint
	], "view">;
	transfer: TypedContractMethod<[
		to: AddressLike,
		value: BigNumberish
	], [
		boolean
	], "nonpayable">;
	transferFrom: TypedContractMethod<[
		from: AddressLike,
		to: AddressLike,
		value: BigNumberish
	], [
		boolean
	], "nonpayable">;
	getFunction<T extends ContractMethod = ContractMethod>(key: string | FunctionFragment): T;
	getFunction(nameOrSignature: "DOMAIN_SEPARATOR"): TypedContractMethod<[
	], [
		string
	], "view">;
	getFunction(nameOrSignature: "allowance"): TypedContractMethod<[
		owner: AddressLike,
		spender: AddressLike
	], [
		bigint
	], "view">;
	getFunction(nameOrSignature: "approve"): TypedContractMethod<[
		spender: AddressLike,
		value: BigNumberish
	], [
		boolean
	], "nonpayable">;
	getFunction(nameOrSignature: "balanceOf"): TypedContractMethod<[
		account: AddressLike
	], [
		bigint
	], "view">;
	getFunction(nameOrSignature: "burn"): TypedContractMethod<[
		value: BigNumberish
	], [
		void
	], "nonpayable">;
	getFunction(nameOrSignature: "burnFrom"): TypedContractMethod<[
		account: AddressLike,
		value: BigNumberish
	], [
		void
	], "nonpayable">;
	getFunction(nameOrSignature: "decimals"): TypedContractMethod<[
	], [
		bigint
	], "view">;
	getFunction(nameOrSignature: "eip712Domain"): TypedContractMethod<[
	], [
		[
			string,
			string,
			string,
			bigint,
			string,
			string,
			bigint[]
		] & {
			fields: string;
			name: string;
			version: string;
			chainId: bigint;
			verifyingContract: string;
			salt: string;
			extensions: bigint[];
		}
	], "view">;
	getFunction(nameOrSignature: "maxSupply"): TypedContractMethod<[
	], [
		bigint
	], "view">;
	getFunction(nameOrSignature: "name"): TypedContractMethod<[
	], [
		string
	], "view">;
	getFunction(nameOrSignature: "nonces"): TypedContractMethod<[
		owner: AddressLike
	], [
		bigint
	], "view">;
	getFunction(nameOrSignature: "permit"): TypedContractMethod<[
		owner: AddressLike,
		spender: AddressLike,
		value: BigNumberish,
		deadline: BigNumberish,
		v: BigNumberish,
		r: BytesLike,
		s: BytesLike
	], [
		void
	], "nonpayable">;
	getFunction(nameOrSignature: "symbol"): TypedContractMethod<[
	], [
		string
	], "view">;
	getFunction(nameOrSignature: "totalSupply"): TypedContractMethod<[
	], [
		bigint
	], "view">;
	getFunction(nameOrSignature: "transfer"): TypedContractMethod<[
		to: AddressLike,
		value: BigNumberish
	], [
		boolean
	], "nonpayable">;
	getFunction(nameOrSignature: "transferFrom"): TypedContractMethod<[
		from: AddressLike,
		to: AddressLike,
		value: BigNumberish
	], [
		boolean
	], "nonpayable">;
	getEvent(key: "Approval"): TypedContractEvent<ApprovalEvent$8.InputTuple, ApprovalEvent$8.OutputTuple, ApprovalEvent$8.OutputObject>;
	getEvent(key: "EIP712DomainChanged"): TypedContractEvent<EIP712DomainChangedEvent$3.InputTuple, EIP712DomainChangedEvent$3.OutputTuple, EIP712DomainChangedEvent$3.OutputObject>;
	getEvent(key: "Transfer"): TypedContractEvent<TransferEvent$8.InputTuple, TransferEvent$8.OutputTuple, TransferEvent$8.OutputObject>;
	filters: {
		"Approval(address,address,uint256)": TypedContractEvent<ApprovalEvent$8.InputTuple, ApprovalEvent$8.OutputTuple, ApprovalEvent$8.OutputObject>;
		Approval: TypedContractEvent<ApprovalEvent$8.InputTuple, ApprovalEvent$8.OutputTuple, ApprovalEvent$8.OutputObject>;
		"EIP712DomainChanged()": TypedContractEvent<EIP712DomainChangedEvent$3.InputTuple, EIP712DomainChangedEvent$3.OutputTuple, EIP712DomainChangedEvent$3.OutputObject>;
		EIP712DomainChanged: TypedContractEvent<EIP712DomainChangedEvent$3.InputTuple, EIP712DomainChangedEvent$3.OutputTuple, EIP712DomainChangedEvent$3.OutputObject>;
		"Transfer(address,address,uint256)": TypedContractEvent<TransferEvent$8.InputTuple, TransferEvent$8.OutputTuple, TransferEvent$8.OutputObject>;
		Transfer: TypedContractEvent<TransferEvent$8.InputTuple, TransferEvent$8.OutputTuple, TransferEvent$8.OutputObject>;
	};
}
export interface ERC20MockInterface extends Interface {
	getFunction(nameOrSignature: "DOMAIN_SEPARATOR" | "allowance" | "approve" | "balanceOf" | "burn" | "burnFrom" | "decimals" | "eip712Domain" | "mint(address,uint256)" | "mint(uint256)" | "name" | "nonces" | "owner" | "permit" | "renounceOwnership" | "symbol" | "totalSupply" | "transfer" | "transferFrom" | "transferOwnership"): FunctionFragment;
	getEvent(nameOrSignatureOrTopic: "Approval" | "EIP712DomainChanged" | "OwnershipTransferred" | "Transfer"): EventFragment;
	encodeFunctionData(functionFragment: "DOMAIN_SEPARATOR", values?: undefined): string;
	encodeFunctionData(functionFragment: "allowance", values: [
		AddressLike,
		AddressLike
	]): string;
	encodeFunctionData(functionFragment: "approve", values: [
		AddressLike,
		BigNumberish
	]): string;
	encodeFunctionData(functionFragment: "balanceOf", values: [
		AddressLike
	]): string;
	encodeFunctionData(functionFragment: "burn", values: [
		BigNumberish
	]): string;
	encodeFunctionData(functionFragment: "burnFrom", values: [
		AddressLike,
		BigNumberish
	]): string;
	encodeFunctionData(functionFragment: "decimals", values?: undefined): string;
	encodeFunctionData(functionFragment: "eip712Domain", values?: undefined): string;
	encodeFunctionData(functionFragment: "mint(address,uint256)", values: [
		AddressLike,
		BigNumberish
	]): string;
	encodeFunctionData(functionFragment: "mint(uint256)", values: [
		BigNumberish
	]): string;
	encodeFunctionData(functionFragment: "name", values?: undefined): string;
	encodeFunctionData(functionFragment: "nonces", values: [
		AddressLike
	]): string;
	encodeFunctionData(functionFragment: "owner", values?: undefined): string;
	encodeFunctionData(functionFragment: "permit", values: [
		AddressLike,
		AddressLike,
		BigNumberish,
		BigNumberish,
		BigNumberish,
		BytesLike,
		BytesLike
	]): string;
	encodeFunctionData(functionFragment: "renounceOwnership", values?: undefined): string;
	encodeFunctionData(functionFragment: "symbol", values?: undefined): string;
	encodeFunctionData(functionFragment: "totalSupply", values?: undefined): string;
	encodeFunctionData(functionFragment: "transfer", values: [
		AddressLike,
		BigNumberish
	]): string;
	encodeFunctionData(functionFragment: "transferFrom", values: [
		AddressLike,
		AddressLike,
		BigNumberish
	]): string;
	encodeFunctionData(functionFragment: "transferOwnership", values: [
		AddressLike
	]): string;
	decodeFunctionResult(functionFragment: "DOMAIN_SEPARATOR", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "allowance", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "approve", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "balanceOf", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "burn", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "burnFrom", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "decimals", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "eip712Domain", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "mint(address,uint256)", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "mint(uint256)", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "name", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "nonces", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "permit", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "renounceOwnership", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "symbol", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "totalSupply", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "transfer", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "transferFrom", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "transferOwnership", data: BytesLike): Result;
}
declare namespace ApprovalEvent$9 {
	type InputTuple = [
		owner: AddressLike,
		spender: AddressLike,
		value: BigNumberish
	];
	type OutputTuple = [
		owner: string,
		spender: string,
		value: bigint
	];
	interface OutputObject {
		owner: string;
		spender: string;
		value: bigint;
	}
	type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
	type Filter = TypedDeferredTopicFilter<Event>;
	type Log = TypedEventLog<Event>;
	type LogDescription = TypedLogDescription<Event>;
}
declare namespace EIP712DomainChangedEvent$4 {
	type InputTuple = [
	];
	type OutputTuple = [
	];
	interface OutputObject {
	}
	type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
	type Filter = TypedDeferredTopicFilter<Event>;
	type Log = TypedEventLog<Event>;
	type LogDescription = TypedLogDescription<Event>;
}
declare namespace OwnershipTransferredEvent$5 {
	type InputTuple = [
		previousOwner: AddressLike,
		newOwner: AddressLike
	];
	type OutputTuple = [
		previousOwner: string,
		newOwner: string
	];
	interface OutputObject {
		previousOwner: string;
		newOwner: string;
	}
	type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
	type Filter = TypedDeferredTopicFilter<Event>;
	type Log = TypedEventLog<Event>;
	type LogDescription = TypedLogDescription<Event>;
}
declare namespace TransferEvent$9 {
	type InputTuple = [
		from: AddressLike,
		to: AddressLike,
		value: BigNumberish
	];
	type OutputTuple = [
		from: string,
		to: string,
		value: bigint
	];
	interface OutputObject {
		from: string;
		to: string;
		value: bigint;
	}
	type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
	type Filter = TypedDeferredTopicFilter<Event>;
	type Log = TypedEventLog<Event>;
	type LogDescription = TypedLogDescription<Event>;
}
export interface ERC20Mock extends BaseContract {
	connect(runner?: ContractRunner | null): ERC20Mock;
	waitForDeployment(): Promise<this>;
	interface: ERC20MockInterface;
	queryFilter<TCEvent extends TypedContractEvent>(event: TCEvent, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
	queryFilter<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
	on<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
	on<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
	once<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
	once<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
	listeners<TCEvent extends TypedContractEvent>(event: TCEvent): Promise<Array<TypedListener<TCEvent>>>;
	listeners(eventName?: string): Promise<Array<Listener>>;
	removeAllListeners<TCEvent extends TypedContractEvent>(event?: TCEvent): Promise<this>;
	DOMAIN_SEPARATOR: TypedContractMethod<[
	], [
		string
	], "view">;
	allowance: TypedContractMethod<[
		owner: AddressLike,
		spender: AddressLike
	], [
		bigint
	], "view">;
	approve: TypedContractMethod<[
		spender: AddressLike,
		value: BigNumberish
	], [
		boolean
	], "nonpayable">;
	balanceOf: TypedContractMethod<[
		account: AddressLike
	], [
		bigint
	], "view">;
	burn: TypedContractMethod<[
		value: BigNumberish
	], [
		void
	], "nonpayable">;
	burnFrom: TypedContractMethod<[
		account: AddressLike,
		value: BigNumberish
	], [
		void
	], "nonpayable">;
	decimals: TypedContractMethod<[
	], [
		bigint
	], "view">;
	eip712Domain: TypedContractMethod<[
	], [
		[
			string,
			string,
			string,
			bigint,
			string,
			string,
			bigint[]
		] & {
			fields: string;
			name: string;
			version: string;
			chainId: bigint;
			verifyingContract: string;
			salt: string;
			extensions: bigint[];
		}
	], "view">;
	"mint(address,uint256)": TypedContractMethod<[
		to: AddressLike,
		amount: BigNumberish
	], [
		void
	], "nonpayable">;
	"mint(uint256)": TypedContractMethod<[
		amount: BigNumberish
	], [
		void
	], "nonpayable">;
	name: TypedContractMethod<[
	], [
		string
	], "view">;
	nonces: TypedContractMethod<[
		owner: AddressLike
	], [
		bigint
	], "view">;
	owner: TypedContractMethod<[
	], [
		string
	], "view">;
	permit: TypedContractMethod<[
		owner: AddressLike,
		spender: AddressLike,
		value: BigNumberish,
		deadline: BigNumberish,
		v: BigNumberish,
		r: BytesLike,
		s: BytesLike
	], [
		void
	], "nonpayable">;
	renounceOwnership: TypedContractMethod<[
	], [
		void
	], "nonpayable">;
	symbol: TypedContractMethod<[
	], [
		string
	], "view">;
	totalSupply: TypedContractMethod<[
	], [
		bigint
	], "view">;
	transfer: TypedContractMethod<[
		to: AddressLike,
		value: BigNumberish
	], [
		boolean
	], "nonpayable">;
	transferFrom: TypedContractMethod<[
		from: AddressLike,
		to: AddressLike,
		value: BigNumberish
	], [
		boolean
	], "nonpayable">;
	transferOwnership: TypedContractMethod<[
		newOwner: AddressLike
	], [
		void
	], "nonpayable">;
	getFunction<T extends ContractMethod = ContractMethod>(key: string | FunctionFragment): T;
	getFunction(nameOrSignature: "DOMAIN_SEPARATOR"): TypedContractMethod<[
	], [
		string
	], "view">;
	getFunction(nameOrSignature: "allowance"): TypedContractMethod<[
		owner: AddressLike,
		spender: AddressLike
	], [
		bigint
	], "view">;
	getFunction(nameOrSignature: "approve"): TypedContractMethod<[
		spender: AddressLike,
		value: BigNumberish
	], [
		boolean
	], "nonpayable">;
	getFunction(nameOrSignature: "balanceOf"): TypedContractMethod<[
		account: AddressLike
	], [
		bigint
	], "view">;
	getFunction(nameOrSignature: "burn"): TypedContractMethod<[
		value: BigNumberish
	], [
		void
	], "nonpayable">;
	getFunction(nameOrSignature: "burnFrom"): TypedContractMethod<[
		account: AddressLike,
		value: BigNumberish
	], [
		void
	], "nonpayable">;
	getFunction(nameOrSignature: "decimals"): TypedContractMethod<[
	], [
		bigint
	], "view">;
	getFunction(nameOrSignature: "eip712Domain"): TypedContractMethod<[
	], [
		[
			string,
			string,
			string,
			bigint,
			string,
			string,
			bigint[]
		] & {
			fields: string;
			name: string;
			version: string;
			chainId: bigint;
			verifyingContract: string;
			salt: string;
			extensions: bigint[];
		}
	], "view">;
	getFunction(nameOrSignature: "mint(address,uint256)"): TypedContractMethod<[
		to: AddressLike,
		amount: BigNumberish
	], [
		void
	], "nonpayable">;
	getFunction(nameOrSignature: "mint(uint256)"): TypedContractMethod<[
		amount: BigNumberish
	], [
		void
	], "nonpayable">;
	getFunction(nameOrSignature: "name"): TypedContractMethod<[
	], [
		string
	], "view">;
	getFunction(nameOrSignature: "nonces"): TypedContractMethod<[
		owner: AddressLike
	], [
		bigint
	], "view">;
	getFunction(nameOrSignature: "owner"): TypedContractMethod<[
	], [
		string
	], "view">;
	getFunction(nameOrSignature: "permit"): TypedContractMethod<[
		owner: AddressLike,
		spender: AddressLike,
		value: BigNumberish,
		deadline: BigNumberish,
		v: BigNumberish,
		r: BytesLike,
		s: BytesLike
	], [
		void
	], "nonpayable">;
	getFunction(nameOrSignature: "renounceOwnership"): TypedContractMethod<[
	], [
		void
	], "nonpayable">;
	getFunction(nameOrSignature: "symbol"): TypedContractMethod<[
	], [
		string
	], "view">;
	getFunction(nameOrSignature: "totalSupply"): TypedContractMethod<[
	], [
		bigint
	], "view">;
	getFunction(nameOrSignature: "transfer"): TypedContractMethod<[
		to: AddressLike,
		value: BigNumberish
	], [
		boolean
	], "nonpayable">;
	getFunction(nameOrSignature: "transferFrom"): TypedContractMethod<[
		from: AddressLike,
		to: AddressLike,
		value: BigNumberish
	], [
		boolean
	], "nonpayable">;
	getFunction(nameOrSignature: "transferOwnership"): TypedContractMethod<[
		newOwner: AddressLike
	], [
		void
	], "nonpayable">;
	getEvent(key: "Approval"): TypedContractEvent<ApprovalEvent$9.InputTuple, ApprovalEvent$9.OutputTuple, ApprovalEvent$9.OutputObject>;
	getEvent(key: "EIP712DomainChanged"): TypedContractEvent<EIP712DomainChangedEvent$4.InputTuple, EIP712DomainChangedEvent$4.OutputTuple, EIP712DomainChangedEvent$4.OutputObject>;
	getEvent(key: "OwnershipTransferred"): TypedContractEvent<OwnershipTransferredEvent$5.InputTuple, OwnershipTransferredEvent$5.OutputTuple, OwnershipTransferredEvent$5.OutputObject>;
	getEvent(key: "Transfer"): TypedContractEvent<TransferEvent$9.InputTuple, TransferEvent$9.OutputTuple, TransferEvent$9.OutputObject>;
	filters: {
		"Approval(address,address,uint256)": TypedContractEvent<ApprovalEvent$9.InputTuple, ApprovalEvent$9.OutputTuple, ApprovalEvent$9.OutputObject>;
		Approval: TypedContractEvent<ApprovalEvent$9.InputTuple, ApprovalEvent$9.OutputTuple, ApprovalEvent$9.OutputObject>;
		"EIP712DomainChanged()": TypedContractEvent<EIP712DomainChangedEvent$4.InputTuple, EIP712DomainChangedEvent$4.OutputTuple, EIP712DomainChangedEvent$4.OutputObject>;
		EIP712DomainChanged: TypedContractEvent<EIP712DomainChangedEvent$4.InputTuple, EIP712DomainChangedEvent$4.OutputTuple, EIP712DomainChangedEvent$4.OutputObject>;
		"OwnershipTransferred(address,address)": TypedContractEvent<OwnershipTransferredEvent$5.InputTuple, OwnershipTransferredEvent$5.OutputTuple, OwnershipTransferredEvent$5.OutputObject>;
		OwnershipTransferred: TypedContractEvent<OwnershipTransferredEvent$5.InputTuple, OwnershipTransferredEvent$5.OutputTuple, OwnershipTransferredEvent$5.OutputObject>;
		"Transfer(address,address,uint256)": TypedContractEvent<TransferEvent$9.InputTuple, TransferEvent$9.OutputTuple, TransferEvent$9.OutputObject>;
		Transfer: TypedContractEvent<TransferEvent$9.InputTuple, TransferEvent$9.OutputTuple, TransferEvent$9.OutputObject>;
	};
}
export declare class AbsOutbox__factory {
	static readonly abi: readonly [
		{
			readonly inputs: readonly [
			];
			readonly name: "AlreadyInit";
			readonly type: "error";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "uint256";
					readonly name: "index";
					readonly type: "uint256";
				}
			];
			readonly name: "AlreadySpent";
			readonly type: "error";
		},
		{
			readonly inputs: readonly [
			];
			readonly name: "BadPostUpgradeInit";
			readonly type: "error";
		},
		{
			readonly inputs: readonly [
			];
			readonly name: "BridgeCallFailed";
			readonly type: "error";
		},
		{
			readonly inputs: readonly [
			];
			readonly name: "HadZeroInit";
			readonly type: "error";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "uint256";
					readonly name: "actualLength";
					readonly type: "uint256";
				},
				{
					readonly internalType: "uint256";
					readonly name: "maxProofLength";
					readonly type: "uint256";
				}
			];
			readonly name: "MerkleProofTooLong";
			readonly type: "error";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "address";
					readonly name: "sender";
					readonly type: "address";
				},
				{
					readonly internalType: "address";
					readonly name: "owner";
					readonly type: "address";
				}
			];
			readonly name: "NotOwner";
			readonly type: "error";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "address";
					readonly name: "sender";
					readonly type: "address";
				},
				{
					readonly internalType: "address";
					readonly name: "rollup";
					readonly type: "address";
				}
			];
			readonly name: "NotRollup";
			readonly type: "error";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "uint256";
					readonly name: "index";
					readonly type: "uint256";
				},
				{
					readonly internalType: "uint256";
					readonly name: "maxIndex";
					readonly type: "uint256";
				}
			];
			readonly name: "PathNotMinimal";
			readonly type: "error";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "uint256";
					readonly name: "proofLength";
					readonly type: "uint256";
				}
			];
			readonly name: "ProofTooLong";
			readonly type: "error";
		},
		{
			readonly inputs: readonly [
			];
			readonly name: "RollupNotChanged";
			readonly type: "error";
		},
		{
			readonly inputs: readonly [
			];
			readonly name: "SimulationOnlyEntrypoint";
			readonly type: "error";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "bytes32";
					readonly name: "root";
					readonly type: "bytes32";
				}
			];
			readonly name: "UnknownRoot";
			readonly type: "error";
		},
		{
			readonly anonymous: false;
			readonly inputs: readonly [
				{
					readonly indexed: true;
					readonly internalType: "address";
					readonly name: "to";
					readonly type: "address";
				},
				{
					readonly indexed: true;
					readonly internalType: "address";
					readonly name: "l2Sender";
					readonly type: "address";
				},
				{
					readonly indexed: true;
					readonly internalType: "uint256";
					readonly name: "zero";
					readonly type: "uint256";
				},
				{
					readonly indexed: false;
					readonly internalType: "uint256";
					readonly name: "transactionIndex";
					readonly type: "uint256";
				}
			];
			readonly name: "OutBoxTransactionExecuted";
			readonly type: "event";
		},
		{
			readonly anonymous: false;
			readonly inputs: readonly [
				{
					readonly indexed: true;
					readonly internalType: "bytes32";
					readonly name: "outputRoot";
					readonly type: "bytes32";
				},
				{
					readonly indexed: true;
					readonly internalType: "bytes32";
					readonly name: "l2BlockHash";
					readonly type: "bytes32";
				}
			];
			readonly name: "SendRootUpdated";
			readonly type: "event";
		},
		{
			readonly inputs: readonly [
			];
			readonly name: "OUTBOX_VERSION";
			readonly outputs: readonly [
				{
					readonly internalType: "uint128";
					readonly name: "";
					readonly type: "uint128";
				}
			];
			readonly stateMutability: "view";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
			];
			readonly name: "bridge";
			readonly outputs: readonly [
				{
					readonly internalType: "contract IBridge";
					readonly name: "";
					readonly type: "address";
				}
			];
			readonly stateMutability: "view";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "address";
					readonly name: "l2Sender";
					readonly type: "address";
				},
				{
					readonly internalType: "address";
					readonly name: "to";
					readonly type: "address";
				},
				{
					readonly internalType: "uint256";
					readonly name: "l2Block";
					readonly type: "uint256";
				},
				{
					readonly internalType: "uint256";
					readonly name: "l1Block";
					readonly type: "uint256";
				},
				{
					readonly internalType: "uint256";
					readonly name: "l2Timestamp";
					readonly type: "uint256";
				},
				{
					readonly internalType: "uint256";
					readonly name: "value";
					readonly type: "uint256";
				},
				{
					readonly internalType: "bytes";
					readonly name: "data";
					readonly type: "bytes";
				}
			];
			readonly name: "calculateItemHash";
			readonly outputs: readonly [
				{
					readonly internalType: "bytes32";
					readonly name: "";
					readonly type: "bytes32";
				}
			];
			readonly stateMutability: "pure";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "bytes32[]";
					readonly name: "proof";
					readonly type: "bytes32[]";
				},
				{
					readonly internalType: "uint256";
					readonly name: "path";
					readonly type: "uint256";
				},
				{
					readonly internalType: "bytes32";
					readonly name: "item";
					readonly type: "bytes32";
				}
			];
			readonly name: "calculateMerkleRoot";
			readonly outputs: readonly [
				{
					readonly internalType: "bytes32";
					readonly name: "";
					readonly type: "bytes32";
				}
			];
			readonly stateMutability: "pure";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "bytes32[]";
					readonly name: "proof";
					readonly type: "bytes32[]";
				},
				{
					readonly internalType: "uint256";
					readonly name: "index";
					readonly type: "uint256";
				},
				{
					readonly internalType: "address";
					readonly name: "l2Sender";
					readonly type: "address";
				},
				{
					readonly internalType: "address";
					readonly name: "to";
					readonly type: "address";
				},
				{
					readonly internalType: "uint256";
					readonly name: "l2Block";
					readonly type: "uint256";
				},
				{
					readonly internalType: "uint256";
					readonly name: "l1Block";
					readonly type: "uint256";
				},
				{
					readonly internalType: "uint256";
					readonly name: "l2Timestamp";
					readonly type: "uint256";
				},
				{
					readonly internalType: "uint256";
					readonly name: "value";
					readonly type: "uint256";
				},
				{
					readonly internalType: "bytes";
					readonly name: "data";
					readonly type: "bytes";
				}
			];
			readonly name: "executeTransaction";
			readonly outputs: readonly [
			];
			readonly stateMutability: "nonpayable";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "uint256";
					readonly name: "index";
					readonly type: "uint256";
				},
				{
					readonly internalType: "address";
					readonly name: "l2Sender";
					readonly type: "address";
				},
				{
					readonly internalType: "address";
					readonly name: "to";
					readonly type: "address";
				},
				{
					readonly internalType: "uint256";
					readonly name: "l2Block";
					readonly type: "uint256";
				},
				{
					readonly internalType: "uint256";
					readonly name: "l1Block";
					readonly type: "uint256";
				},
				{
					readonly internalType: "uint256";
					readonly name: "l2Timestamp";
					readonly type: "uint256";
				},
				{
					readonly internalType: "uint256";
					readonly name: "value";
					readonly type: "uint256";
				},
				{
					readonly internalType: "bytes";
					readonly name: "data";
					readonly type: "bytes";
				}
			];
			readonly name: "executeTransactionSimulation";
			readonly outputs: readonly [
			];
			readonly stateMutability: "nonpayable";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "contract IBridge";
					readonly name: "_bridge";
					readonly type: "address";
				}
			];
			readonly name: "initialize";
			readonly outputs: readonly [
			];
			readonly stateMutability: "nonpayable";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "uint256";
					readonly name: "index";
					readonly type: "uint256";
				}
			];
			readonly name: "isSpent";
			readonly outputs: readonly [
				{
					readonly internalType: "bool";
					readonly name: "";
					readonly type: "bool";
				}
			];
			readonly stateMutability: "view";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
			];
			readonly name: "l2ToL1BatchNum";
			readonly outputs: readonly [
				{
					readonly internalType: "uint256";
					readonly name: "";
					readonly type: "uint256";
				}
			];
			readonly stateMutability: "pure";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
			];
			readonly name: "l2ToL1Block";
			readonly outputs: readonly [
				{
					readonly internalType: "uint256";
					readonly name: "";
					readonly type: "uint256";
				}
			];
			readonly stateMutability: "view";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
			];
			readonly name: "l2ToL1EthBlock";
			readonly outputs: readonly [
				{
					readonly internalType: "uint256";
					readonly name: "";
					readonly type: "uint256";
				}
			];
			readonly stateMutability: "view";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
			];
			readonly name: "l2ToL1OutputId";
			readonly outputs: readonly [
				{
					readonly internalType: "bytes32";
					readonly name: "";
					readonly type: "bytes32";
				}
			];
			readonly stateMutability: "view";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
			];
			readonly name: "l2ToL1Sender";
			readonly outputs: readonly [
				{
					readonly internalType: "address";
					readonly name: "";
					readonly type: "address";
				}
			];
			readonly stateMutability: "view";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
			];
			readonly name: "l2ToL1Timestamp";
			readonly outputs: readonly [
				{
					readonly internalType: "uint256";
					readonly name: "";
					readonly type: "uint256";
				}
			];
			readonly stateMutability: "view";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
			];
			readonly name: "postUpgradeInit";
			readonly outputs: readonly [
			];
			readonly stateMutability: "nonpayable";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
			];
			readonly name: "rollup";
			readonly outputs: readonly [
				{
					readonly internalType: "address";
					readonly name: "";
					readonly type: "address";
				}
			];
			readonly stateMutability: "view";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "bytes32";
					readonly name: "";
					readonly type: "bytes32";
				}
			];
			readonly name: "roots";
			readonly outputs: readonly [
				{
					readonly internalType: "bytes32";
					readonly name: "";
					readonly type: "bytes32";
				}
			];
			readonly stateMutability: "view";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "uint256";
					readonly name: "";
					readonly type: "uint256";
				}
			];
			readonly name: "spent";
			readonly outputs: readonly [
				{
					readonly internalType: "bytes32";
					readonly name: "";
					readonly type: "bytes32";
				}
			];
			readonly stateMutability: "view";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
			];
			readonly name: "updateRollupAddress";
			readonly outputs: readonly [
			];
			readonly stateMutability: "nonpayable";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "bytes32";
					readonly name: "root";
					readonly type: "bytes32";
				},
				{
					readonly internalType: "bytes32";
					readonly name: "l2BlockHash";
					readonly type: "bytes32";
				}
			];
			readonly name: "updateSendRoot";
			readonly outputs: readonly [
			];
			readonly stateMutability: "nonpayable";
			readonly type: "function";
		}
	];
	static createInterface(): AbsOutboxInterface;
	static connect(address: string, runner?: ContractRunner | null): AbsOutbox;
}
export declare class IBridge__factory {
	static readonly abi: readonly [
		{
			readonly anonymous: false;
			readonly inputs: readonly [
				{
					readonly indexed: true;
					readonly internalType: "address";
					readonly name: "outbox";
					readonly type: "address";
				},
				{
					readonly indexed: true;
					readonly internalType: "address";
					readonly name: "to";
					readonly type: "address";
				},
				{
					readonly indexed: false;
					readonly internalType: "uint256";
					readonly name: "value";
					readonly type: "uint256";
				},
				{
					readonly indexed: false;
					readonly internalType: "bytes";
					readonly name: "data";
					readonly type: "bytes";
				}
			];
			readonly name: "BridgeCallTriggered";
			readonly type: "event";
		},
		{
			readonly anonymous: false;
			readonly inputs: readonly [
				{
					readonly indexed: true;
					readonly internalType: "address";
					readonly name: "inbox";
					readonly type: "address";
				},
				{
					readonly indexed: false;
					readonly internalType: "bool";
					readonly name: "enabled";
					readonly type: "bool";
				}
			];
			readonly name: "InboxToggle";
			readonly type: "event";
		},
		{
			readonly anonymous: false;
			readonly inputs: readonly [
				{
					readonly indexed: true;
					readonly internalType: "uint256";
					readonly name: "messageIndex";
					readonly type: "uint256";
				},
				{
					readonly indexed: true;
					readonly internalType: "bytes32";
					readonly name: "beforeInboxAcc";
					readonly type: "bytes32";
				},
				{
					readonly indexed: false;
					readonly internalType: "address";
					readonly name: "inbox";
					readonly type: "address";
				},
				{
					readonly indexed: false;
					readonly internalType: "uint8";
					readonly name: "kind";
					readonly type: "uint8";
				},
				{
					readonly indexed: false;
					readonly internalType: "address";
					readonly name: "sender";
					readonly type: "address";
				},
				{
					readonly indexed: false;
					readonly internalType: "bytes32";
					readonly name: "messageDataHash";
					readonly type: "bytes32";
				},
				{
					readonly indexed: false;
					readonly internalType: "uint256";
					readonly name: "baseFeeL1";
					readonly type: "uint256";
				},
				{
					readonly indexed: false;
					readonly internalType: "uint64";
					readonly name: "timestamp";
					readonly type: "uint64";
				}
			];
			readonly name: "MessageDelivered";
			readonly type: "event";
		},
		{
			readonly anonymous: false;
			readonly inputs: readonly [
				{
					readonly indexed: true;
					readonly internalType: "address";
					readonly name: "outbox";
					readonly type: "address";
				},
				{
					readonly indexed: false;
					readonly internalType: "bool";
					readonly name: "enabled";
					readonly type: "bool";
				}
			];
			readonly name: "OutboxToggle";
			readonly type: "event";
		},
		{
			readonly anonymous: false;
			readonly inputs: readonly [
				{
					readonly indexed: false;
					readonly internalType: "address";
					readonly name: "rollup";
					readonly type: "address";
				}
			];
			readonly name: "RollupUpdated";
			readonly type: "event";
		},
		{
			readonly anonymous: false;
			readonly inputs: readonly [
				{
					readonly indexed: false;
					readonly internalType: "address";
					readonly name: "newSequencerInbox";
					readonly type: "address";
				}
			];
			readonly name: "SequencerInboxUpdated";
			readonly type: "event";
		},
		{
			readonly inputs: readonly [
			];
			readonly name: "activeOutbox";
			readonly outputs: readonly [
				{
					readonly internalType: "address";
					readonly name: "";
					readonly type: "address";
				}
			];
			readonly stateMutability: "view";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "uint256";
					readonly name: "";
					readonly type: "uint256";
				}
			];
			readonly name: "allowedDelayedInboxList";
			readonly outputs: readonly [
				{
					readonly internalType: "address";
					readonly name: "";
					readonly type: "address";
				}
			];
			readonly stateMutability: "nonpayable";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "address";
					readonly name: "inbox";
					readonly type: "address";
				}
			];
			readonly name: "allowedDelayedInboxes";
			readonly outputs: readonly [
				{
					readonly internalType: "bool";
					readonly name: "";
					readonly type: "bool";
				}
			];
			readonly stateMutability: "view";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "uint256";
					readonly name: "";
					readonly type: "uint256";
				}
			];
			readonly name: "allowedOutboxList";
			readonly outputs: readonly [
				{
					readonly internalType: "address";
					readonly name: "";
					readonly type: "address";
				}
			];
			readonly stateMutability: "nonpayable";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "address";
					readonly name: "outbox";
					readonly type: "address";
				}
			];
			readonly name: "allowedOutboxes";
			readonly outputs: readonly [
				{
					readonly internalType: "bool";
					readonly name: "";
					readonly type: "bool";
				}
			];
			readonly stateMutability: "view";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "uint256";
					readonly name: "";
					readonly type: "uint256";
				}
			];
			readonly name: "delayedInboxAccs";
			readonly outputs: readonly [
				{
					readonly internalType: "bytes32";
					readonly name: "";
					readonly type: "bytes32";
				}
			];
			readonly stateMutability: "view";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
			];
			readonly name: "delayedMessageCount";
			readonly outputs: readonly [
				{
					readonly internalType: "uint256";
					readonly name: "";
					readonly type: "uint256";
				}
			];
			readonly stateMutability: "view";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "bytes32";
					readonly name: "dataHash";
					readonly type: "bytes32";
				},
				{
					readonly internalType: "uint256";
					readonly name: "afterDelayedMessagesRead";
					readonly type: "uint256";
				},
				{
					readonly internalType: "uint256";
					readonly name: "prevMessageCount";
					readonly type: "uint256";
				},
				{
					readonly internalType: "uint256";
					readonly name: "newMessageCount";
					readonly type: "uint256";
				}
			];
			readonly name: "enqueueSequencerMessage";
			readonly outputs: readonly [
				{
					readonly internalType: "uint256";
					readonly name: "seqMessageIndex";
					readonly type: "uint256";
				},
				{
					readonly internalType: "bytes32";
					readonly name: "beforeAcc";
					readonly type: "bytes32";
				},
				{
					readonly internalType: "bytes32";
					readonly name: "delayedAcc";
					readonly type: "bytes32";
				},
				{
					readonly internalType: "bytes32";
					readonly name: "acc";
					readonly type: "bytes32";
				}
			];
			readonly stateMutability: "nonpayable";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "address";
					readonly name: "to";
					readonly type: "address";
				},
				{
					readonly internalType: "uint256";
					readonly name: "value";
					readonly type: "uint256";
				},
				{
					readonly internalType: "bytes";
					readonly name: "data";
					readonly type: "bytes";
				}
			];
			readonly name: "executeCall";
			readonly outputs: readonly [
				{
					readonly internalType: "bool";
					readonly name: "success";
					readonly type: "bool";
				},
				{
					readonly internalType: "bytes";
					readonly name: "returnData";
					readonly type: "bytes";
				}
			];
			readonly stateMutability: "nonpayable";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
			];
			readonly name: "rollup";
			readonly outputs: readonly [
				{
					readonly internalType: "contract IOwnable";
					readonly name: "";
					readonly type: "address";
				}
			];
			readonly stateMutability: "view";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
			];
			readonly name: "sequencerInbox";
			readonly outputs: readonly [
				{
					readonly internalType: "address";
					readonly name: "";
					readonly type: "address";
				}
			];
			readonly stateMutability: "view";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "uint256";
					readonly name: "";
					readonly type: "uint256";
				}
			];
			readonly name: "sequencerInboxAccs";
			readonly outputs: readonly [
				{
					readonly internalType: "bytes32";
					readonly name: "";
					readonly type: "bytes32";
				}
			];
			readonly stateMutability: "view";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
			];
			readonly name: "sequencerMessageCount";
			readonly outputs: readonly [
				{
					readonly internalType: "uint256";
					readonly name: "";
					readonly type: "uint256";
				}
			];
			readonly stateMutability: "view";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
			];
			readonly name: "sequencerReportedSubMessageCount";
			readonly outputs: readonly [
				{
					readonly internalType: "uint256";
					readonly name: "";
					readonly type: "uint256";
				}
			];
			readonly stateMutability: "view";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "address";
					readonly name: "inbox";
					readonly type: "address";
				},
				{
					readonly internalType: "bool";
					readonly name: "enabled";
					readonly type: "bool";
				}
			];
			readonly name: "setDelayedInbox";
			readonly outputs: readonly [
			];
			readonly stateMutability: "nonpayable";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "address";
					readonly name: "inbox";
					readonly type: "address";
				},
				{
					readonly internalType: "bool";
					readonly name: "enabled";
					readonly type: "bool";
				}
			];
			readonly name: "setOutbox";
			readonly outputs: readonly [
			];
			readonly stateMutability: "nonpayable";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "address";
					readonly name: "_sequencerInbox";
					readonly type: "address";
				}
			];
			readonly name: "setSequencerInbox";
			readonly outputs: readonly [
			];
			readonly stateMutability: "nonpayable";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "address";
					readonly name: "batchPoster";
					readonly type: "address";
				},
				{
					readonly internalType: "bytes32";
					readonly name: "dataHash";
					readonly type: "bytes32";
				}
			];
			readonly name: "submitBatchSpendingReport";
			readonly outputs: readonly [
				{
					readonly internalType: "uint256";
					readonly name: "msgNum";
					readonly type: "uint256";
				}
			];
			readonly stateMutability: "nonpayable";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "contract IOwnable";
					readonly name: "_rollup";
					readonly type: "address";
				}
			];
			readonly name: "updateRollupAddress";
			readonly outputs: readonly [
			];
			readonly stateMutability: "nonpayable";
			readonly type: "function";
		}
	];
	static createInterface(): IBridgeInterface;
	static connect(address: string, runner?: ContractRunner | null): IBridge;
}
export declare class IDelayedMessageProvider__factory {
	static readonly abi: readonly [
		{
			readonly anonymous: false;
			readonly inputs: readonly [
				{
					readonly indexed: true;
					readonly internalType: "uint256";
					readonly name: "messageNum";
					readonly type: "uint256";
				},
				{
					readonly indexed: false;
					readonly internalType: "bytes";
					readonly name: "data";
					readonly type: "bytes";
				}
			];
			readonly name: "InboxMessageDelivered";
			readonly type: "event";
		},
		{
			readonly anonymous: false;
			readonly inputs: readonly [
				{
					readonly indexed: true;
					readonly internalType: "uint256";
					readonly name: "messageNum";
					readonly type: "uint256";
				}
			];
			readonly name: "InboxMessageDeliveredFromOrigin";
			readonly type: "event";
		}
	];
	static createInterface(): IDelayedMessageProviderInterface;
	static connect(address: string, runner?: ContractRunner | null): IDelayedMessageProvider;
}
export declare class IInbox__factory {
	static readonly abi: readonly [
		{
			readonly anonymous: false;
			readonly inputs: readonly [
				{
					readonly indexed: true;
					readonly internalType: "uint256";
					readonly name: "messageNum";
					readonly type: "uint256";
				},
				{
					readonly indexed: false;
					readonly internalType: "bytes";
					readonly name: "data";
					readonly type: "bytes";
				}
			];
			readonly name: "InboxMessageDelivered";
			readonly type: "event";
		},
		{
			readonly anonymous: false;
			readonly inputs: readonly [
				{
					readonly indexed: true;
					readonly internalType: "uint256";
					readonly name: "messageNum";
					readonly type: "uint256";
				}
			];
			readonly name: "InboxMessageDeliveredFromOrigin";
			readonly type: "event";
		},
		{
			readonly inputs: readonly [
			];
			readonly name: "allowListEnabled";
			readonly outputs: readonly [
				{
					readonly internalType: "bool";
					readonly name: "";
					readonly type: "bool";
				}
			];
			readonly stateMutability: "view";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
			];
			readonly name: "bridge";
			readonly outputs: readonly [
				{
					readonly internalType: "contract IBridge";
					readonly name: "";
					readonly type: "address";
				}
			];
			readonly stateMutability: "view";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "uint256";
					readonly name: "dataLength";
					readonly type: "uint256";
				},
				{
					readonly internalType: "uint256";
					readonly name: "baseFee";
					readonly type: "uint256";
				}
			];
			readonly name: "calculateRetryableSubmissionFee";
			readonly outputs: readonly [
				{
					readonly internalType: "uint256";
					readonly name: "";
					readonly type: "uint256";
				}
			];
			readonly stateMutability: "view";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "address";
					readonly name: "to";
					readonly type: "address";
				},
				{
					readonly internalType: "uint256";
					readonly name: "l2CallValue";
					readonly type: "uint256";
				},
				{
					readonly internalType: "uint256";
					readonly name: "maxSubmissionCost";
					readonly type: "uint256";
				},
				{
					readonly internalType: "address";
					readonly name: "excessFeeRefundAddress";
					readonly type: "address";
				},
				{
					readonly internalType: "address";
					readonly name: "callValueRefundAddress";
					readonly type: "address";
				},
				{
					readonly internalType: "uint256";
					readonly name: "gasLimit";
					readonly type: "uint256";
				},
				{
					readonly internalType: "uint256";
					readonly name: "maxFeePerGas";
					readonly type: "uint256";
				},
				{
					readonly internalType: "bytes";
					readonly name: "data";
					readonly type: "bytes";
				}
			];
			readonly name: "createRetryableTicket";
			readonly outputs: readonly [
				{
					readonly internalType: "uint256";
					readonly name: "";
					readonly type: "uint256";
				}
			];
			readonly stateMutability: "payable";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
			];
			readonly name: "depositEth";
			readonly outputs: readonly [
				{
					readonly internalType: "uint256";
					readonly name: "";
					readonly type: "uint256";
				}
			];
			readonly stateMutability: "payable";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
			];
			readonly name: "getProxyAdmin";
			readonly outputs: readonly [
				{
					readonly internalType: "address";
					readonly name: "";
					readonly type: "address";
				}
			];
			readonly stateMutability: "view";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "contract IBridge";
					readonly name: "_bridge";
					readonly type: "address";
				},
				{
					readonly internalType: "contract ISequencerInbox";
					readonly name: "_sequencerInbox";
					readonly type: "address";
				}
			];
			readonly name: "initialize";
			readonly outputs: readonly [
			];
			readonly stateMutability: "nonpayable";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "address";
					readonly name: "user";
					readonly type: "address";
				}
			];
			readonly name: "isAllowed";
			readonly outputs: readonly [
				{
					readonly internalType: "bool";
					readonly name: "";
					readonly type: "bool";
				}
			];
			readonly stateMutability: "view";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
			];
			readonly name: "maxDataSize";
			readonly outputs: readonly [
				{
					readonly internalType: "uint256";
					readonly name: "";
					readonly type: "uint256";
				}
			];
			readonly stateMutability: "view";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
			];
			readonly name: "pause";
			readonly outputs: readonly [
			];
			readonly stateMutability: "nonpayable";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "contract IBridge";
					readonly name: "_bridge";
					readonly type: "address";
				}
			];
			readonly name: "postUpgradeInit";
			readonly outputs: readonly [
			];
			readonly stateMutability: "nonpayable";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "uint256";
					readonly name: "gasLimit";
					readonly type: "uint256";
				},
				{
					readonly internalType: "uint256";
					readonly name: "maxFeePerGas";
					readonly type: "uint256";
				},
				{
					readonly internalType: "address";
					readonly name: "to";
					readonly type: "address";
				},
				{
					readonly internalType: "uint256";
					readonly name: "value";
					readonly type: "uint256";
				},
				{
					readonly internalType: "bytes";
					readonly name: "data";
					readonly type: "bytes";
				}
			];
			readonly name: "sendContractTransaction";
			readonly outputs: readonly [
				{
					readonly internalType: "uint256";
					readonly name: "";
					readonly type: "uint256";
				}
			];
			readonly stateMutability: "nonpayable";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "uint256";
					readonly name: "gasLimit";
					readonly type: "uint256";
				},
				{
					readonly internalType: "uint256";
					readonly name: "maxFeePerGas";
					readonly type: "uint256";
				},
				{
					readonly internalType: "address";
					readonly name: "to";
					readonly type: "address";
				},
				{
					readonly internalType: "bytes";
					readonly name: "data";
					readonly type: "bytes";
				}
			];
			readonly name: "sendL1FundedContractTransaction";
			readonly outputs: readonly [
				{
					readonly internalType: "uint256";
					readonly name: "";
					readonly type: "uint256";
				}
			];
			readonly stateMutability: "payable";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "uint256";
					readonly name: "gasLimit";
					readonly type: "uint256";
				},
				{
					readonly internalType: "uint256";
					readonly name: "maxFeePerGas";
					readonly type: "uint256";
				},
				{
					readonly internalType: "uint256";
					readonly name: "nonce";
					readonly type: "uint256";
				},
				{
					readonly internalType: "address";
					readonly name: "to";
					readonly type: "address";
				},
				{
					readonly internalType: "bytes";
					readonly name: "data";
					readonly type: "bytes";
				}
			];
			readonly name: "sendL1FundedUnsignedTransaction";
			readonly outputs: readonly [
				{
					readonly internalType: "uint256";
					readonly name: "";
					readonly type: "uint256";
				}
			];
			readonly stateMutability: "payable";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "uint256";
					readonly name: "gasLimit";
					readonly type: "uint256";
				},
				{
					readonly internalType: "uint256";
					readonly name: "maxFeePerGas";
					readonly type: "uint256";
				},
				{
					readonly internalType: "uint256";
					readonly name: "nonce";
					readonly type: "uint256";
				},
				{
					readonly internalType: "address";
					readonly name: "to";
					readonly type: "address";
				},
				{
					readonly internalType: "bytes";
					readonly name: "data";
					readonly type: "bytes";
				}
			];
			readonly name: "sendL1FundedUnsignedTransactionToFork";
			readonly outputs: readonly [
				{
					readonly internalType: "uint256";
					readonly name: "";
					readonly type: "uint256";
				}
			];
			readonly stateMutability: "payable";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "bytes";
					readonly name: "messageData";
					readonly type: "bytes";
				}
			];
			readonly name: "sendL2Message";
			readonly outputs: readonly [
				{
					readonly internalType: "uint256";
					readonly name: "";
					readonly type: "uint256";
				}
			];
			readonly stateMutability: "nonpayable";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "bytes";
					readonly name: "messageData";
					readonly type: "bytes";
				}
			];
			readonly name: "sendL2MessageFromOrigin";
			readonly outputs: readonly [
				{
					readonly internalType: "uint256";
					readonly name: "";
					readonly type: "uint256";
				}
			];
			readonly stateMutability: "nonpayable";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "uint256";
					readonly name: "gasLimit";
					readonly type: "uint256";
				},
				{
					readonly internalType: "uint256";
					readonly name: "maxFeePerGas";
					readonly type: "uint256";
				},
				{
					readonly internalType: "uint256";
					readonly name: "nonce";
					readonly type: "uint256";
				},
				{
					readonly internalType: "address";
					readonly name: "to";
					readonly type: "address";
				},
				{
					readonly internalType: "uint256";
					readonly name: "value";
					readonly type: "uint256";
				},
				{
					readonly internalType: "bytes";
					readonly name: "data";
					readonly type: "bytes";
				}
			];
			readonly name: "sendUnsignedTransaction";
			readonly outputs: readonly [
				{
					readonly internalType: "uint256";
					readonly name: "";
					readonly type: "uint256";
				}
			];
			readonly stateMutability: "nonpayable";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "uint256";
					readonly name: "gasLimit";
					readonly type: "uint256";
				},
				{
					readonly internalType: "uint256";
					readonly name: "maxFeePerGas";
					readonly type: "uint256";
				},
				{
					readonly internalType: "uint256";
					readonly name: "nonce";
					readonly type: "uint256";
				},
				{
					readonly internalType: "address";
					readonly name: "to";
					readonly type: "address";
				},
				{
					readonly internalType: "uint256";
					readonly name: "value";
					readonly type: "uint256";
				},
				{
					readonly internalType: "bytes";
					readonly name: "data";
					readonly type: "bytes";
				}
			];
			readonly name: "sendUnsignedTransactionToFork";
			readonly outputs: readonly [
				{
					readonly internalType: "uint256";
					readonly name: "";
					readonly type: "uint256";
				}
			];
			readonly stateMutability: "nonpayable";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "uint256";
					readonly name: "gasLimit";
					readonly type: "uint256";
				},
				{
					readonly internalType: "uint256";
					readonly name: "maxFeePerGas";
					readonly type: "uint256";
				},
				{
					readonly internalType: "uint256";
					readonly name: "nonce";
					readonly type: "uint256";
				},
				{
					readonly internalType: "uint256";
					readonly name: "value";
					readonly type: "uint256";
				},
				{
					readonly internalType: "address";
					readonly name: "withdrawTo";
					readonly type: "address";
				}
			];
			readonly name: "sendWithdrawEthToFork";
			readonly outputs: readonly [
				{
					readonly internalType: "uint256";
					readonly name: "";
					readonly type: "uint256";
				}
			];
			readonly stateMutability: "nonpayable";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
			];
			readonly name: "sequencerInbox";
			readonly outputs: readonly [
				{
					readonly internalType: "contract ISequencerInbox";
					readonly name: "";
					readonly type: "address";
				}
			];
			readonly stateMutability: "view";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "address[]";
					readonly name: "user";
					readonly type: "address[]";
				},
				{
					readonly internalType: "bool[]";
					readonly name: "val";
					readonly type: "bool[]";
				}
			];
			readonly name: "setAllowList";
			readonly outputs: readonly [
			];
			readonly stateMutability: "nonpayable";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "bool";
					readonly name: "_allowListEnabled";
					readonly type: "bool";
				}
			];
			readonly name: "setAllowListEnabled";
			readonly outputs: readonly [
			];
			readonly stateMutability: "nonpayable";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
			];
			readonly name: "unpause";
			readonly outputs: readonly [
			];
			readonly stateMutability: "nonpayable";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "address";
					readonly name: "to";
					readonly type: "address";
				},
				{
					readonly internalType: "uint256";
					readonly name: "l2CallValue";
					readonly type: "uint256";
				},
				{
					readonly internalType: "uint256";
					readonly name: "maxSubmissionCost";
					readonly type: "uint256";
				},
				{
					readonly internalType: "address";
					readonly name: "excessFeeRefundAddress";
					readonly type: "address";
				},
				{
					readonly internalType: "address";
					readonly name: "callValueRefundAddress";
					readonly type: "address";
				},
				{
					readonly internalType: "uint256";
					readonly name: "gasLimit";
					readonly type: "uint256";
				},
				{
					readonly internalType: "uint256";
					readonly name: "maxFeePerGas";
					readonly type: "uint256";
				},
				{
					readonly internalType: "bytes";
					readonly name: "data";
					readonly type: "bytes";
				}
			];
			readonly name: "unsafeCreateRetryableTicket";
			readonly outputs: readonly [
				{
					readonly internalType: "uint256";
					readonly name: "";
					readonly type: "uint256";
				}
			];
			readonly stateMutability: "payable";
			readonly type: "function";
		}
	];
	static createInterface(): IInboxInterface;
	static connect(address: string, runner?: ContractRunner | null): IInbox;
}
export declare class IInboxBase__factory {
	static readonly abi: readonly [
		{
			readonly anonymous: false;
			readonly inputs: readonly [
				{
					readonly indexed: true;
					readonly internalType: "uint256";
					readonly name: "messageNum";
					readonly type: "uint256";
				},
				{
					readonly indexed: false;
					readonly internalType: "bytes";
					readonly name: "data";
					readonly type: "bytes";
				}
			];
			readonly name: "InboxMessageDelivered";
			readonly type: "event";
		},
		{
			readonly anonymous: false;
			readonly inputs: readonly [
				{
					readonly indexed: true;
					readonly internalType: "uint256";
					readonly name: "messageNum";
					readonly type: "uint256";
				}
			];
			readonly name: "InboxMessageDeliveredFromOrigin";
			readonly type: "event";
		},
		{
			readonly inputs: readonly [
			];
			readonly name: "allowListEnabled";
			readonly outputs: readonly [
				{
					readonly internalType: "bool";
					readonly name: "";
					readonly type: "bool";
				}
			];
			readonly stateMutability: "view";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
			];
			readonly name: "bridge";
			readonly outputs: readonly [
				{
					readonly internalType: "contract IBridge";
					readonly name: "";
					readonly type: "address";
				}
			];
			readonly stateMutability: "view";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "uint256";
					readonly name: "dataLength";
					readonly type: "uint256";
				},
				{
					readonly internalType: "uint256";
					readonly name: "baseFee";
					readonly type: "uint256";
				}
			];
			readonly name: "calculateRetryableSubmissionFee";
			readonly outputs: readonly [
				{
					readonly internalType: "uint256";
					readonly name: "";
					readonly type: "uint256";
				}
			];
			readonly stateMutability: "view";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
			];
			readonly name: "getProxyAdmin";
			readonly outputs: readonly [
				{
					readonly internalType: "address";
					readonly name: "";
					readonly type: "address";
				}
			];
			readonly stateMutability: "view";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "contract IBridge";
					readonly name: "_bridge";
					readonly type: "address";
				},
				{
					readonly internalType: "contract ISequencerInbox";
					readonly name: "_sequencerInbox";
					readonly type: "address";
				}
			];
			readonly name: "initialize";
			readonly outputs: readonly [
			];
			readonly stateMutability: "nonpayable";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "address";
					readonly name: "user";
					readonly type: "address";
				}
			];
			readonly name: "isAllowed";
			readonly outputs: readonly [
				{
					readonly internalType: "bool";
					readonly name: "";
					readonly type: "bool";
				}
			];
			readonly stateMutability: "view";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
			];
			readonly name: "maxDataSize";
			readonly outputs: readonly [
				{
					readonly internalType: "uint256";
					readonly name: "";
					readonly type: "uint256";
				}
			];
			readonly stateMutability: "view";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
			];
			readonly name: "pause";
			readonly outputs: readonly [
			];
			readonly stateMutability: "nonpayable";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "uint256";
					readonly name: "gasLimit";
					readonly type: "uint256";
				},
				{
					readonly internalType: "uint256";
					readonly name: "maxFeePerGas";
					readonly type: "uint256";
				},
				{
					readonly internalType: "address";
					readonly name: "to";
					readonly type: "address";
				},
				{
					readonly internalType: "uint256";
					readonly name: "value";
					readonly type: "uint256";
				},
				{
					readonly internalType: "bytes";
					readonly name: "data";
					readonly type: "bytes";
				}
			];
			readonly name: "sendContractTransaction";
			readonly outputs: readonly [
				{
					readonly internalType: "uint256";
					readonly name: "";
					readonly type: "uint256";
				}
			];
			readonly stateMutability: "nonpayable";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "bytes";
					readonly name: "messageData";
					readonly type: "bytes";
				}
			];
			readonly name: "sendL2Message";
			readonly outputs: readonly [
				{
					readonly internalType: "uint256";
					readonly name: "";
					readonly type: "uint256";
				}
			];
			readonly stateMutability: "nonpayable";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "bytes";
					readonly name: "messageData";
					readonly type: "bytes";
				}
			];
			readonly name: "sendL2MessageFromOrigin";
			readonly outputs: readonly [
				{
					readonly internalType: "uint256";
					readonly name: "";
					readonly type: "uint256";
				}
			];
			readonly stateMutability: "nonpayable";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "uint256";
					readonly name: "gasLimit";
					readonly type: "uint256";
				},
				{
					readonly internalType: "uint256";
					readonly name: "maxFeePerGas";
					readonly type: "uint256";
				},
				{
					readonly internalType: "uint256";
					readonly name: "nonce";
					readonly type: "uint256";
				},
				{
					readonly internalType: "address";
					readonly name: "to";
					readonly type: "address";
				},
				{
					readonly internalType: "uint256";
					readonly name: "value";
					readonly type: "uint256";
				},
				{
					readonly internalType: "bytes";
					readonly name: "data";
					readonly type: "bytes";
				}
			];
			readonly name: "sendUnsignedTransaction";
			readonly outputs: readonly [
				{
					readonly internalType: "uint256";
					readonly name: "";
					readonly type: "uint256";
				}
			];
			readonly stateMutability: "nonpayable";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
			];
			readonly name: "sequencerInbox";
			readonly outputs: readonly [
				{
					readonly internalType: "contract ISequencerInbox";
					readonly name: "";
					readonly type: "address";
				}
			];
			readonly stateMutability: "view";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "address[]";
					readonly name: "user";
					readonly type: "address[]";
				},
				{
					readonly internalType: "bool[]";
					readonly name: "val";
					readonly type: "bool[]";
				}
			];
			readonly name: "setAllowList";
			readonly outputs: readonly [
			];
			readonly stateMutability: "nonpayable";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "bool";
					readonly name: "_allowListEnabled";
					readonly type: "bool";
				}
			];
			readonly name: "setAllowListEnabled";
			readonly outputs: readonly [
			];
			readonly stateMutability: "nonpayable";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
			];
			readonly name: "unpause";
			readonly outputs: readonly [
			];
			readonly stateMutability: "nonpayable";
			readonly type: "function";
		}
	];
	static createInterface(): IInboxBaseInterface;
	static connect(address: string, runner?: ContractRunner | null): IInboxBase;
}
export declare class IOutbox__factory {
	static readonly abi: readonly [
		{
			readonly anonymous: false;
			readonly inputs: readonly [
				{
					readonly indexed: true;
					readonly internalType: "address";
					readonly name: "to";
					readonly type: "address";
				},
				{
					readonly indexed: true;
					readonly internalType: "address";
					readonly name: "l2Sender";
					readonly type: "address";
				},
				{
					readonly indexed: true;
					readonly internalType: "uint256";
					readonly name: "zero";
					readonly type: "uint256";
				},
				{
					readonly indexed: false;
					readonly internalType: "uint256";
					readonly name: "transactionIndex";
					readonly type: "uint256";
				}
			];
			readonly name: "OutBoxTransactionExecuted";
			readonly type: "event";
		},
		{
			readonly anonymous: false;
			readonly inputs: readonly [
				{
					readonly indexed: true;
					readonly internalType: "bytes32";
					readonly name: "outputRoot";
					readonly type: "bytes32";
				},
				{
					readonly indexed: true;
					readonly internalType: "bytes32";
					readonly name: "l2BlockHash";
					readonly type: "bytes32";
				}
			];
			readonly name: "SendRootUpdated";
			readonly type: "event";
		},
		{
			readonly inputs: readonly [
			];
			readonly name: "OUTBOX_VERSION";
			readonly outputs: readonly [
				{
					readonly internalType: "uint128";
					readonly name: "";
					readonly type: "uint128";
				}
			];
			readonly stateMutability: "view";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
			];
			readonly name: "bridge";
			readonly outputs: readonly [
				{
					readonly internalType: "contract IBridge";
					readonly name: "";
					readonly type: "address";
				}
			];
			readonly stateMutability: "view";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "address";
					readonly name: "l2Sender";
					readonly type: "address";
				},
				{
					readonly internalType: "address";
					readonly name: "to";
					readonly type: "address";
				},
				{
					readonly internalType: "uint256";
					readonly name: "l2Block";
					readonly type: "uint256";
				},
				{
					readonly internalType: "uint256";
					readonly name: "l1Block";
					readonly type: "uint256";
				},
				{
					readonly internalType: "uint256";
					readonly name: "l2Timestamp";
					readonly type: "uint256";
				},
				{
					readonly internalType: "uint256";
					readonly name: "value";
					readonly type: "uint256";
				},
				{
					readonly internalType: "bytes";
					readonly name: "data";
					readonly type: "bytes";
				}
			];
			readonly name: "calculateItemHash";
			readonly outputs: readonly [
				{
					readonly internalType: "bytes32";
					readonly name: "";
					readonly type: "bytes32";
				}
			];
			readonly stateMutability: "pure";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "bytes32[]";
					readonly name: "proof";
					readonly type: "bytes32[]";
				},
				{
					readonly internalType: "uint256";
					readonly name: "path";
					readonly type: "uint256";
				},
				{
					readonly internalType: "bytes32";
					readonly name: "item";
					readonly type: "bytes32";
				}
			];
			readonly name: "calculateMerkleRoot";
			readonly outputs: readonly [
				{
					readonly internalType: "bytes32";
					readonly name: "";
					readonly type: "bytes32";
				}
			];
			readonly stateMutability: "pure";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "bytes32[]";
					readonly name: "proof";
					readonly type: "bytes32[]";
				},
				{
					readonly internalType: "uint256";
					readonly name: "index";
					readonly type: "uint256";
				},
				{
					readonly internalType: "address";
					readonly name: "l2Sender";
					readonly type: "address";
				},
				{
					readonly internalType: "address";
					readonly name: "to";
					readonly type: "address";
				},
				{
					readonly internalType: "uint256";
					readonly name: "l2Block";
					readonly type: "uint256";
				},
				{
					readonly internalType: "uint256";
					readonly name: "l1Block";
					readonly type: "uint256";
				},
				{
					readonly internalType: "uint256";
					readonly name: "l2Timestamp";
					readonly type: "uint256";
				},
				{
					readonly internalType: "uint256";
					readonly name: "value";
					readonly type: "uint256";
				},
				{
					readonly internalType: "bytes";
					readonly name: "data";
					readonly type: "bytes";
				}
			];
			readonly name: "executeTransaction";
			readonly outputs: readonly [
			];
			readonly stateMutability: "nonpayable";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "uint256";
					readonly name: "index";
					readonly type: "uint256";
				},
				{
					readonly internalType: "address";
					readonly name: "l2Sender";
					readonly type: "address";
				},
				{
					readonly internalType: "address";
					readonly name: "to";
					readonly type: "address";
				},
				{
					readonly internalType: "uint256";
					readonly name: "l2Block";
					readonly type: "uint256";
				},
				{
					readonly internalType: "uint256";
					readonly name: "l1Block";
					readonly type: "uint256";
				},
				{
					readonly internalType: "uint256";
					readonly name: "l2Timestamp";
					readonly type: "uint256";
				},
				{
					readonly internalType: "uint256";
					readonly name: "value";
					readonly type: "uint256";
				},
				{
					readonly internalType: "bytes";
					readonly name: "data";
					readonly type: "bytes";
				}
			];
			readonly name: "executeTransactionSimulation";
			readonly outputs: readonly [
			];
			readonly stateMutability: "nonpayable";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "contract IBridge";
					readonly name: "_bridge";
					readonly type: "address";
				}
			];
			readonly name: "initialize";
			readonly outputs: readonly [
			];
			readonly stateMutability: "nonpayable";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "uint256";
					readonly name: "index";
					readonly type: "uint256";
				}
			];
			readonly name: "isSpent";
			readonly outputs: readonly [
				{
					readonly internalType: "bool";
					readonly name: "";
					readonly type: "bool";
				}
			];
			readonly stateMutability: "view";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
			];
			readonly name: "l2ToL1Block";
			readonly outputs: readonly [
				{
					readonly internalType: "uint256";
					readonly name: "";
					readonly type: "uint256";
				}
			];
			readonly stateMutability: "view";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
			];
			readonly name: "l2ToL1EthBlock";
			readonly outputs: readonly [
				{
					readonly internalType: "uint256";
					readonly name: "";
					readonly type: "uint256";
				}
			];
			readonly stateMutability: "view";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
			];
			readonly name: "l2ToL1OutputId";
			readonly outputs: readonly [
				{
					readonly internalType: "bytes32";
					readonly name: "";
					readonly type: "bytes32";
				}
			];
			readonly stateMutability: "view";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
			];
			readonly name: "l2ToL1Sender";
			readonly outputs: readonly [
				{
					readonly internalType: "address";
					readonly name: "";
					readonly type: "address";
				}
			];
			readonly stateMutability: "view";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
			];
			readonly name: "l2ToL1Timestamp";
			readonly outputs: readonly [
				{
					readonly internalType: "uint256";
					readonly name: "";
					readonly type: "uint256";
				}
			];
			readonly stateMutability: "view";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
			];
			readonly name: "postUpgradeInit";
			readonly outputs: readonly [
			];
			readonly stateMutability: "nonpayable";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
			];
			readonly name: "rollup";
			readonly outputs: readonly [
				{
					readonly internalType: "address";
					readonly name: "";
					readonly type: "address";
				}
			];
			readonly stateMutability: "view";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "bytes32";
					readonly name: "";
					readonly type: "bytes32";
				}
			];
			readonly name: "roots";
			readonly outputs: readonly [
				{
					readonly internalType: "bytes32";
					readonly name: "";
					readonly type: "bytes32";
				}
			];
			readonly stateMutability: "view";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "uint256";
					readonly name: "";
					readonly type: "uint256";
				}
			];
			readonly name: "spent";
			readonly outputs: readonly [
				{
					readonly internalType: "bytes32";
					readonly name: "";
					readonly type: "bytes32";
				}
			];
			readonly stateMutability: "view";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
			];
			readonly name: "updateRollupAddress";
			readonly outputs: readonly [
			];
			readonly stateMutability: "nonpayable";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "bytes32";
					readonly name: "sendRoot";
					readonly type: "bytes32";
				},
				{
					readonly internalType: "bytes32";
					readonly name: "l2BlockHash";
					readonly type: "bytes32";
				}
			];
			readonly name: "updateSendRoot";
			readonly outputs: readonly [
			];
			readonly stateMutability: "nonpayable";
			readonly type: "function";
		}
	];
	static createInterface(): IOutboxInterface;
	static connect(address: string, runner?: ContractRunner | null): IOutbox;
}
export declare class IOwnable__factory {
	static readonly abi: readonly [
		{
			readonly inputs: readonly [
			];
			readonly name: "owner";
			readonly outputs: readonly [
				{
					readonly internalType: "address";
					readonly name: "";
					readonly type: "address";
				}
			];
			readonly stateMutability: "view";
			readonly type: "function";
		}
	];
	static createInterface(): IOwnableInterface;
	static connect(address: string, runner?: ContractRunner | null): IOwnable;
}
export declare class IFeeTokenPricer__factory {
	static readonly abi: readonly [
		{
			readonly inputs: readonly [
			];
			readonly name: "getExchangeRate";
			readonly outputs: readonly [
				{
					readonly internalType: "uint256";
					readonly name: "";
					readonly type: "uint256";
				}
			];
			readonly stateMutability: "nonpayable";
			readonly type: "function";
		}
	];
	static createInterface(): IFeeTokenPricerInterface;
	static connect(address: string, runner?: ContractRunner | null): IFeeTokenPricer;
}
export declare class ISequencerInbox__factory {
	static readonly abi: readonly [
		{
			readonly anonymous: false;
			readonly inputs: readonly [
				{
					readonly indexed: false;
					readonly internalType: "address";
					readonly name: "newBatchPosterManager";
					readonly type: "address";
				}
			];
			readonly name: "BatchPosterManagerSet";
			readonly type: "event";
		},
		{
			readonly anonymous: false;
			readonly inputs: readonly [
				{
					readonly indexed: false;
					readonly internalType: "address";
					readonly name: "batchPoster";
					readonly type: "address";
				},
				{
					readonly indexed: false;
					readonly internalType: "bool";
					readonly name: "isBatchPoster";
					readonly type: "bool";
				}
			];
			readonly name: "BatchPosterSet";
			readonly type: "event";
		},
		{
			readonly anonymous: false;
			readonly inputs: readonly [
				{
					readonly components: readonly [
						{
							readonly internalType: "uint64";
							readonly name: "threshold";
							readonly type: "uint64";
						},
						{
							readonly internalType: "uint64";
							readonly name: "max";
							readonly type: "uint64";
						},
						{
							readonly internalType: "uint64";
							readonly name: "replenishRateInBasis";
							readonly type: "uint64";
						}
					];
					readonly indexed: false;
					readonly internalType: "struct BufferConfig";
					readonly name: "bufferConfig";
					readonly type: "tuple";
				}
			];
			readonly name: "BufferConfigSet";
			readonly type: "event";
		},
		{
			readonly anonymous: false;
			readonly inputs: readonly [
				{
					readonly indexed: false;
					readonly internalType: "address";
					readonly name: "feeTokenPricer";
					readonly type: "address";
				}
			];
			readonly name: "FeeTokenPricerSet";
			readonly type: "event";
		},
		{
			readonly anonymous: false;
			readonly inputs: readonly [
				{
					readonly indexed: true;
					readonly internalType: "uint256";
					readonly name: "messageNum";
					readonly type: "uint256";
				},
				{
					readonly indexed: false;
					readonly internalType: "bytes";
					readonly name: "data";
					readonly type: "bytes";
				}
			];
			readonly name: "InboxMessageDelivered";
			readonly type: "event";
		},
		{
			readonly anonymous: false;
			readonly inputs: readonly [
				{
					readonly indexed: true;
					readonly internalType: "uint256";
					readonly name: "messageNum";
					readonly type: "uint256";
				}
			];
			readonly name: "InboxMessageDeliveredFromOrigin";
			readonly type: "event";
		},
		{
			readonly anonymous: false;
			readonly inputs: readonly [
				{
					readonly indexed: true;
					readonly internalType: "bytes32";
					readonly name: "keysetHash";
					readonly type: "bytes32";
				}
			];
			readonly name: "InvalidateKeyset";
			readonly type: "event";
		},
		{
			readonly anonymous: false;
			readonly inputs: readonly [
				{
					readonly components: readonly [
						{
							readonly internalType: "uint256";
							readonly name: "delayBlocks";
							readonly type: "uint256";
						},
						{
							readonly internalType: "uint256";
							readonly name: "futureBlocks";
							readonly type: "uint256";
						},
						{
							readonly internalType: "uint256";
							readonly name: "delaySeconds";
							readonly type: "uint256";
						},
						{
							readonly internalType: "uint256";
							readonly name: "futureSeconds";
							readonly type: "uint256";
						}
					];
					readonly indexed: false;
					readonly internalType: "struct ISequencerInbox.MaxTimeVariation";
					readonly name: "maxTimeVariation";
					readonly type: "tuple";
				}
			];
			readonly name: "MaxTimeVariationSet";
			readonly type: "event";
		},
		{
			readonly anonymous: false;
			readonly inputs: readonly [
				{
					readonly indexed: true;
					readonly internalType: "uint256";
					readonly name: "id";
					readonly type: "uint256";
				}
			];
			readonly name: "OwnerFunctionCalled";
			readonly type: "event";
		},
		{
			readonly anonymous: false;
			readonly inputs: readonly [
				{
					readonly indexed: true;
					readonly internalType: "uint256";
					readonly name: "batchSequenceNumber";
					readonly type: "uint256";
				},
				{
					readonly indexed: false;
					readonly internalType: "bytes";
					readonly name: "data";
					readonly type: "bytes";
				}
			];
			readonly name: "SequencerBatchData";
			readonly type: "event";
		},
		{
			readonly anonymous: false;
			readonly inputs: readonly [
				{
					readonly indexed: true;
					readonly internalType: "uint256";
					readonly name: "batchSequenceNumber";
					readonly type: "uint256";
				},
				{
					readonly indexed: true;
					readonly internalType: "bytes32";
					readonly name: "beforeAcc";
					readonly type: "bytes32";
				},
				{
					readonly indexed: true;
					readonly internalType: "bytes32";
					readonly name: "afterAcc";
					readonly type: "bytes32";
				},
				{
					readonly indexed: false;
					readonly internalType: "bytes32";
					readonly name: "delayedAcc";
					readonly type: "bytes32";
				},
				{
					readonly indexed: false;
					readonly internalType: "uint256";
					readonly name: "afterDelayedMessagesRead";
					readonly type: "uint256";
				},
				{
					readonly components: readonly [
						{
							readonly internalType: "uint64";
							readonly name: "minTimestamp";
							readonly type: "uint64";
						},
						{
							readonly internalType: "uint64";
							readonly name: "maxTimestamp";
							readonly type: "uint64";
						},
						{
							readonly internalType: "uint64";
							readonly name: "minBlockNumber";
							readonly type: "uint64";
						},
						{
							readonly internalType: "uint64";
							readonly name: "maxBlockNumber";
							readonly type: "uint64";
						}
					];
					readonly indexed: false;
					readonly internalType: "struct IBridge.TimeBounds";
					readonly name: "timeBounds";
					readonly type: "tuple";
				},
				{
					readonly indexed: false;
					readonly internalType: "enum IBridge.BatchDataLocation";
					readonly name: "dataLocation";
					readonly type: "uint8";
				}
			];
			readonly name: "SequencerBatchDelivered";
			readonly type: "event";
		},
		{
			readonly anonymous: false;
			readonly inputs: readonly [
				{
					readonly indexed: false;
					readonly internalType: "address";
					readonly name: "addr";
					readonly type: "address";
				},
				{
					readonly indexed: false;
					readonly internalType: "bool";
					readonly name: "isSequencer";
					readonly type: "bool";
				}
			];
			readonly name: "SequencerSet";
			readonly type: "event";
		},
		{
			readonly anonymous: false;
			readonly inputs: readonly [
				{
					readonly indexed: true;
					readonly internalType: "bytes32";
					readonly name: "keysetHash";
					readonly type: "bytes32";
				},
				{
					readonly indexed: false;
					readonly internalType: "bytes";
					readonly name: "keysetBytes";
					readonly type: "bytes";
				}
			];
			readonly name: "SetValidKeyset";
			readonly type: "event";
		},
		{
			readonly inputs: readonly [
			];
			readonly name: "BROTLI_MESSAGE_HEADER_FLAG";
			readonly outputs: readonly [
				{
					readonly internalType: "bytes1";
					readonly name: "";
					readonly type: "bytes1";
				}
			];
			readonly stateMutability: "view";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
			];
			readonly name: "DAS_MESSAGE_HEADER_FLAG";
			readonly outputs: readonly [
				{
					readonly internalType: "bytes1";
					readonly name: "";
					readonly type: "bytes1";
				}
			];
			readonly stateMutability: "view";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
			];
			readonly name: "DATA_AUTHENTICATED_FLAG";
			readonly outputs: readonly [
				{
					readonly internalType: "bytes1";
					readonly name: "";
					readonly type: "bytes1";
				}
			];
			readonly stateMutability: "view";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
			];
			readonly name: "DATA_BLOB_HEADER_FLAG";
			readonly outputs: readonly [
				{
					readonly internalType: "bytes1";
					readonly name: "";
					readonly type: "bytes1";
				}
			];
			readonly stateMutability: "view";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
			];
			readonly name: "HEADER_LENGTH";
			readonly outputs: readonly [
				{
					readonly internalType: "uint256";
					readonly name: "";
					readonly type: "uint256";
				}
			];
			readonly stateMutability: "view";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
			];
			readonly name: "TREE_DAS_MESSAGE_HEADER_FLAG";
			readonly outputs: readonly [
				{
					readonly internalType: "bytes1";
					readonly name: "";
					readonly type: "bytes1";
				}
			];
			readonly stateMutability: "view";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
			];
			readonly name: "ZERO_HEAVY_MESSAGE_HEADER_FLAG";
			readonly outputs: readonly [
				{
					readonly internalType: "bytes1";
					readonly name: "";
					readonly type: "bytes1";
				}
			];
			readonly stateMutability: "view";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "uint256";
					readonly name: "sequenceNumber";
					readonly type: "uint256";
				},
				{
					readonly internalType: "bytes";
					readonly name: "data";
					readonly type: "bytes";
				},
				{
					readonly internalType: "uint256";
					readonly name: "afterDelayedMessagesRead";
					readonly type: "uint256";
				},
				{
					readonly internalType: "contract IGasRefunder";
					readonly name: "gasRefunder";
					readonly type: "address";
				},
				{
					readonly internalType: "uint256";
					readonly name: "prevMessageCount";
					readonly type: "uint256";
				},
				{
					readonly internalType: "uint256";
					readonly name: "newMessageCount";
					readonly type: "uint256";
				}
			];
			readonly name: "addSequencerL2Batch";
			readonly outputs: readonly [
			];
			readonly stateMutability: "nonpayable";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "uint256";
					readonly name: "sequenceNumber";
					readonly type: "uint256";
				},
				{
					readonly internalType: "bytes";
					readonly name: "data";
					readonly type: "bytes";
				},
				{
					readonly internalType: "uint256";
					readonly name: "afterDelayedMessagesRead";
					readonly type: "uint256";
				},
				{
					readonly internalType: "contract IGasRefunder";
					readonly name: "gasRefunder";
					readonly type: "address";
				},
				{
					readonly internalType: "uint256";
					readonly name: "prevMessageCount";
					readonly type: "uint256";
				},
				{
					readonly internalType: "uint256";
					readonly name: "newMessageCount";
					readonly type: "uint256";
				},
				{
					readonly components: readonly [
						{
							readonly internalType: "bytes32";
							readonly name: "beforeDelayedAcc";
							readonly type: "bytes32";
						},
						{
							readonly components: readonly [
								{
									readonly internalType: "uint8";
									readonly name: "kind";
									readonly type: "uint8";
								},
								{
									readonly internalType: "address";
									readonly name: "sender";
									readonly type: "address";
								},
								{
									readonly internalType: "uint64";
									readonly name: "blockNumber";
									readonly type: "uint64";
								},
								{
									readonly internalType: "uint64";
									readonly name: "timestamp";
									readonly type: "uint64";
								},
								{
									readonly internalType: "uint256";
									readonly name: "inboxSeqNum";
									readonly type: "uint256";
								},
								{
									readonly internalType: "uint256";
									readonly name: "baseFeeL1";
									readonly type: "uint256";
								},
								{
									readonly internalType: "bytes32";
									readonly name: "messageDataHash";
									readonly type: "bytes32";
								}
							];
							readonly internalType: "struct Messages.Message";
							readonly name: "delayedMessage";
							readonly type: "tuple";
						}
					];
					readonly internalType: "struct DelayProof";
					readonly name: "delayProof";
					readonly type: "tuple";
				}
			];
			readonly name: "addSequencerL2BatchDelayProof";
			readonly outputs: readonly [
			];
			readonly stateMutability: "nonpayable";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "uint256";
					readonly name: "sequenceNumber";
					readonly type: "uint256";
				},
				{
					readonly internalType: "uint256";
					readonly name: "afterDelayedMessagesRead";
					readonly type: "uint256";
				},
				{
					readonly internalType: "contract IGasRefunder";
					readonly name: "gasRefunder";
					readonly type: "address";
				},
				{
					readonly internalType: "uint256";
					readonly name: "prevMessageCount";
					readonly type: "uint256";
				},
				{
					readonly internalType: "uint256";
					readonly name: "newMessageCount";
					readonly type: "uint256";
				}
			];
			readonly name: "addSequencerL2BatchFromBlobs";
			readonly outputs: readonly [
			];
			readonly stateMutability: "nonpayable";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "uint256";
					readonly name: "sequenceNumber";
					readonly type: "uint256";
				},
				{
					readonly internalType: "uint256";
					readonly name: "afterDelayedMessagesRead";
					readonly type: "uint256";
				},
				{
					readonly internalType: "contract IGasRefunder";
					readonly name: "gasRefunder";
					readonly type: "address";
				},
				{
					readonly internalType: "uint256";
					readonly name: "prevMessageCount";
					readonly type: "uint256";
				},
				{
					readonly internalType: "uint256";
					readonly name: "newMessageCount";
					readonly type: "uint256";
				},
				{
					readonly components: readonly [
						{
							readonly internalType: "bytes32";
							readonly name: "beforeDelayedAcc";
							readonly type: "bytes32";
						},
						{
							readonly components: readonly [
								{
									readonly internalType: "uint8";
									readonly name: "kind";
									readonly type: "uint8";
								},
								{
									readonly internalType: "address";
									readonly name: "sender";
									readonly type: "address";
								},
								{
									readonly internalType: "uint64";
									readonly name: "blockNumber";
									readonly type: "uint64";
								},
								{
									readonly internalType: "uint64";
									readonly name: "timestamp";
									readonly type: "uint64";
								},
								{
									readonly internalType: "uint256";
									readonly name: "inboxSeqNum";
									readonly type: "uint256";
								},
								{
									readonly internalType: "uint256";
									readonly name: "baseFeeL1";
									readonly type: "uint256";
								},
								{
									readonly internalType: "bytes32";
									readonly name: "messageDataHash";
									readonly type: "bytes32";
								}
							];
							readonly internalType: "struct Messages.Message";
							readonly name: "delayedMessage";
							readonly type: "tuple";
						}
					];
					readonly internalType: "struct DelayProof";
					readonly name: "delayProof";
					readonly type: "tuple";
				}
			];
			readonly name: "addSequencerL2BatchFromBlobsDelayProof";
			readonly outputs: readonly [
			];
			readonly stateMutability: "nonpayable";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "uint256";
					readonly name: "sequenceNumber";
					readonly type: "uint256";
				},
				{
					readonly internalType: "bytes";
					readonly name: "data";
					readonly type: "bytes";
				},
				{
					readonly internalType: "uint256";
					readonly name: "afterDelayedMessagesRead";
					readonly type: "uint256";
				},
				{
					readonly internalType: "contract IGasRefunder";
					readonly name: "gasRefunder";
					readonly type: "address";
				}
			];
			readonly name: "addSequencerL2BatchFromOrigin";
			readonly outputs: readonly [
			];
			readonly stateMutability: "nonpayable";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "uint256";
					readonly name: "sequenceNumber";
					readonly type: "uint256";
				},
				{
					readonly internalType: "bytes";
					readonly name: "data";
					readonly type: "bytes";
				},
				{
					readonly internalType: "uint256";
					readonly name: "afterDelayedMessagesRead";
					readonly type: "uint256";
				},
				{
					readonly internalType: "contract IGasRefunder";
					readonly name: "gasRefunder";
					readonly type: "address";
				},
				{
					readonly internalType: "uint256";
					readonly name: "prevMessageCount";
					readonly type: "uint256";
				},
				{
					readonly internalType: "uint256";
					readonly name: "newMessageCount";
					readonly type: "uint256";
				}
			];
			readonly name: "addSequencerL2BatchFromOrigin";
			readonly outputs: readonly [
			];
			readonly stateMutability: "nonpayable";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "uint256";
					readonly name: "sequenceNumber";
					readonly type: "uint256";
				},
				{
					readonly internalType: "bytes";
					readonly name: "data";
					readonly type: "bytes";
				},
				{
					readonly internalType: "uint256";
					readonly name: "afterDelayedMessagesRead";
					readonly type: "uint256";
				},
				{
					readonly internalType: "contract IGasRefunder";
					readonly name: "gasRefunder";
					readonly type: "address";
				},
				{
					readonly internalType: "uint256";
					readonly name: "prevMessageCount";
					readonly type: "uint256";
				},
				{
					readonly internalType: "uint256";
					readonly name: "newMessageCount";
					readonly type: "uint256";
				},
				{
					readonly components: readonly [
						{
							readonly internalType: "bytes32";
							readonly name: "beforeDelayedAcc";
							readonly type: "bytes32";
						},
						{
							readonly components: readonly [
								{
									readonly internalType: "uint8";
									readonly name: "kind";
									readonly type: "uint8";
								},
								{
									readonly internalType: "address";
									readonly name: "sender";
									readonly type: "address";
								},
								{
									readonly internalType: "uint64";
									readonly name: "blockNumber";
									readonly type: "uint64";
								},
								{
									readonly internalType: "uint64";
									readonly name: "timestamp";
									readonly type: "uint64";
								},
								{
									readonly internalType: "uint256";
									readonly name: "inboxSeqNum";
									readonly type: "uint256";
								},
								{
									readonly internalType: "uint256";
									readonly name: "baseFeeL1";
									readonly type: "uint256";
								},
								{
									readonly internalType: "bytes32";
									readonly name: "messageDataHash";
									readonly type: "bytes32";
								}
							];
							readonly internalType: "struct Messages.Message";
							readonly name: "delayedMessage";
							readonly type: "tuple";
						}
					];
					readonly internalType: "struct DelayProof";
					readonly name: "delayProof";
					readonly type: "tuple";
				}
			];
			readonly name: "addSequencerL2BatchFromOriginDelayProof";
			readonly outputs: readonly [
			];
			readonly stateMutability: "nonpayable";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
			];
			readonly name: "batchCount";
			readonly outputs: readonly [
				{
					readonly internalType: "uint256";
					readonly name: "";
					readonly type: "uint256";
				}
			];
			readonly stateMutability: "view";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
			];
			readonly name: "batchPosterManager";
			readonly outputs: readonly [
				{
					readonly internalType: "address";
					readonly name: "";
					readonly type: "address";
				}
			];
			readonly stateMutability: "view";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
			];
			readonly name: "bridge";
			readonly outputs: readonly [
				{
					readonly internalType: "contract IBridge";
					readonly name: "";
					readonly type: "address";
				}
			];
			readonly stateMutability: "view";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "bytes32";
					readonly name: "";
					readonly type: "bytes32";
				}
			];
			readonly name: "dasKeySetInfo";
			readonly outputs: readonly [
				{
					readonly internalType: "bool";
					readonly name: "";
					readonly type: "bool";
				},
				{
					readonly internalType: "uint64";
					readonly name: "";
					readonly type: "uint64";
				}
			];
			readonly stateMutability: "view";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
			];
			readonly name: "feeTokenPricer";
			readonly outputs: readonly [
				{
					readonly internalType: "contract IFeeTokenPricer";
					readonly name: "";
					readonly type: "address";
				}
			];
			readonly stateMutability: "view";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "uint256";
					readonly name: "_totalDelayedMessagesRead";
					readonly type: "uint256";
				},
				{
					readonly internalType: "uint8";
					readonly name: "kind";
					readonly type: "uint8";
				},
				{
					readonly internalType: "uint64[2]";
					readonly name: "l1BlockAndTime";
					readonly type: "uint64[2]";
				},
				{
					readonly internalType: "uint256";
					readonly name: "baseFeeL1";
					readonly type: "uint256";
				},
				{
					readonly internalType: "address";
					readonly name: "sender";
					readonly type: "address";
				},
				{
					readonly internalType: "bytes32";
					readonly name: "messageDataHash";
					readonly type: "bytes32";
				}
			];
			readonly name: "forceInclusion";
			readonly outputs: readonly [
			];
			readonly stateMutability: "nonpayable";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "uint64";
					readonly name: "blockNumber";
					readonly type: "uint64";
				}
			];
			readonly name: "forceInclusionDeadline";
			readonly outputs: readonly [
				{
					readonly internalType: "uint64";
					readonly name: "blockNumberDeadline";
					readonly type: "uint64";
				}
			];
			readonly stateMutability: "view";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "bytes32";
					readonly name: "ksHash";
					readonly type: "bytes32";
				}
			];
			readonly name: "getKeysetCreationBlock";
			readonly outputs: readonly [
				{
					readonly internalType: "uint256";
					readonly name: "";
					readonly type: "uint256";
				}
			];
			readonly stateMutability: "view";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "uint256";
					readonly name: "index";
					readonly type: "uint256";
				}
			];
			readonly name: "inboxAccs";
			readonly outputs: readonly [
				{
					readonly internalType: "bytes32";
					readonly name: "";
					readonly type: "bytes32";
				}
			];
			readonly stateMutability: "view";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "contract IBridge";
					readonly name: "bridge_";
					readonly type: "address";
				},
				{
					readonly components: readonly [
						{
							readonly internalType: "uint256";
							readonly name: "delayBlocks";
							readonly type: "uint256";
						},
						{
							readonly internalType: "uint256";
							readonly name: "futureBlocks";
							readonly type: "uint256";
						},
						{
							readonly internalType: "uint256";
							readonly name: "delaySeconds";
							readonly type: "uint256";
						},
						{
							readonly internalType: "uint256";
							readonly name: "futureSeconds";
							readonly type: "uint256";
						}
					];
					readonly internalType: "struct ISequencerInbox.MaxTimeVariation";
					readonly name: "maxTimeVariation_";
					readonly type: "tuple";
				},
				{
					readonly components: readonly [
						{
							readonly internalType: "uint64";
							readonly name: "threshold";
							readonly type: "uint64";
						},
						{
							readonly internalType: "uint64";
							readonly name: "max";
							readonly type: "uint64";
						},
						{
							readonly internalType: "uint64";
							readonly name: "replenishRateInBasis";
							readonly type: "uint64";
						}
					];
					readonly internalType: "struct BufferConfig";
					readonly name: "bufferConfig_";
					readonly type: "tuple";
				},
				{
					readonly internalType: "contract IFeeTokenPricer";
					readonly name: "feeTokenPricer_";
					readonly type: "address";
				}
			];
			readonly name: "initialize";
			readonly outputs: readonly [
			];
			readonly stateMutability: "nonpayable";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "bytes32";
					readonly name: "ksHash";
					readonly type: "bytes32";
				}
			];
			readonly name: "invalidateKeysetHash";
			readonly outputs: readonly [
			];
			readonly stateMutability: "nonpayable";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "address";
					readonly name: "";
					readonly type: "address";
				}
			];
			readonly name: "isBatchPoster";
			readonly outputs: readonly [
				{
					readonly internalType: "bool";
					readonly name: "";
					readonly type: "bool";
				}
			];
			readonly stateMutability: "view";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
			];
			readonly name: "isDelayBufferable";
			readonly outputs: readonly [
				{
					readonly internalType: "bool";
					readonly name: "";
					readonly type: "bool";
				}
			];
			readonly stateMutability: "view";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "address";
					readonly name: "";
					readonly type: "address";
				}
			];
			readonly name: "isSequencer";
			readonly outputs: readonly [
				{
					readonly internalType: "bool";
					readonly name: "";
					readonly type: "bool";
				}
			];
			readonly stateMutability: "view";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "bytes32";
					readonly name: "ksHash";
					readonly type: "bytes32";
				}
			];
			readonly name: "isValidKeysetHash";
			readonly outputs: readonly [
				{
					readonly internalType: "bool";
					readonly name: "";
					readonly type: "bool";
				}
			];
			readonly stateMutability: "view";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
			];
			readonly name: "maxDataSize";
			readonly outputs: readonly [
				{
					readonly internalType: "uint256";
					readonly name: "";
					readonly type: "uint256";
				}
			];
			readonly stateMutability: "view";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
			];
			readonly name: "maxTimeVariation";
			readonly outputs: readonly [
				{
					readonly internalType: "uint256";
					readonly name: "delayBlocks";
					readonly type: "uint256";
				},
				{
					readonly internalType: "uint256";
					readonly name: "futureBlocks";
					readonly type: "uint256";
				},
				{
					readonly internalType: "uint256";
					readonly name: "delaySeconds";
					readonly type: "uint256";
				},
				{
					readonly internalType: "uint256";
					readonly name: "futureSeconds";
					readonly type: "uint256";
				}
			];
			readonly stateMutability: "view";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
			];
			readonly name: "removeDelayAfterFork";
			readonly outputs: readonly [
			];
			readonly stateMutability: "nonpayable";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
			];
			readonly name: "rollup";
			readonly outputs: readonly [
				{
					readonly internalType: "contract IOwnable";
					readonly name: "";
					readonly type: "address";
				}
			];
			readonly stateMutability: "view";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "address";
					readonly name: "newBatchPosterManager";
					readonly type: "address";
				}
			];
			readonly name: "setBatchPosterManager";
			readonly outputs: readonly [
			];
			readonly stateMutability: "nonpayable";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "contract IFeeTokenPricer";
					readonly name: "newFeeTokenPricer";
					readonly type: "address";
				}
			];
			readonly name: "setFeeTokenPricer";
			readonly outputs: readonly [
			];
			readonly stateMutability: "nonpayable";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "address";
					readonly name: "addr";
					readonly type: "address";
				},
				{
					readonly internalType: "bool";
					readonly name: "isBatchPoster_";
					readonly type: "bool";
				}
			];
			readonly name: "setIsBatchPoster";
			readonly outputs: readonly [
			];
			readonly stateMutability: "nonpayable";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "address";
					readonly name: "addr";
					readonly type: "address";
				},
				{
					readonly internalType: "bool";
					readonly name: "isSequencer_";
					readonly type: "bool";
				}
			];
			readonly name: "setIsSequencer";
			readonly outputs: readonly [
			];
			readonly stateMutability: "nonpayable";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
				{
					readonly components: readonly [
						{
							readonly internalType: "uint256";
							readonly name: "delayBlocks";
							readonly type: "uint256";
						},
						{
							readonly internalType: "uint256";
							readonly name: "futureBlocks";
							readonly type: "uint256";
						},
						{
							readonly internalType: "uint256";
							readonly name: "delaySeconds";
							readonly type: "uint256";
						},
						{
							readonly internalType: "uint256";
							readonly name: "futureSeconds";
							readonly type: "uint256";
						}
					];
					readonly internalType: "struct ISequencerInbox.MaxTimeVariation";
					readonly name: "maxTimeVariation_";
					readonly type: "tuple";
				}
			];
			readonly name: "setMaxTimeVariation";
			readonly outputs: readonly [
			];
			readonly stateMutability: "nonpayable";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "bytes";
					readonly name: "keysetBytes";
					readonly type: "bytes";
				}
			];
			readonly name: "setValidKeyset";
			readonly outputs: readonly [
			];
			readonly stateMutability: "nonpayable";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
			];
			readonly name: "totalDelayedMessagesRead";
			readonly outputs: readonly [
				{
					readonly internalType: "uint256";
					readonly name: "";
					readonly type: "uint256";
				}
			];
			readonly stateMutability: "view";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
			];
			readonly name: "updateRollupAddress";
			readonly outputs: readonly [
			];
			readonly stateMutability: "nonpayable";
			readonly type: "function";
		}
	];
	static createInterface(): ISequencerInboxInterface;
	static connect(address: string, runner?: ContractRunner | null): ISequencerInbox;
}
export type OutboxConstructorParams = [
	signer?: Signer
] | ConstructorParameters<typeof ContractFactory>;
export declare class Outbox__factory extends ContractFactory {
	constructor(...args: OutboxConstructorParams);
	getDeployTransaction(overrides?: NonPayableOverrides & {
		from?: string;
	}): Promise<ContractDeployTransaction>;
	deploy(overrides?: NonPayableOverrides & {
		from?: string;
	}): Promise<Outbox & {
		deploymentTransaction(): ContractTransactionResponse;
	}>;
	connect(runner: ContractRunner | null): Outbox__factory;
	static readonly bytecode = "0x60a060405230608052348015601357600080fd5b506080516116b66100366000396000818161066a015261088a01526116b66000f3fe608060405234801561001057600080fd5b506004361061012b5760003560e01c806395fcea78116100ad578063c4d66de811610071578063c4d66de81461023e578063c75184df14610251578063cb23bcb514610271578063d5b5cc2314610284578063e78cea92146102a457600080fd5b806395fcea78146101e85780639f0c04bf146101f0578063a04cee6014610203578063ae6dead714610216578063b0f305371461023657600080fd5b80635a129efe116100f45780635a129efe1461018d5780636ae71f12146101b057806372f2a8c7146101b857806380648b02146101c05780638515bc6a146101e057600080fd5b80627436d31461013057806308635a9514610156578063119852711461016b578063288e5b10146101725780634654779014610185575b600080fd5b61014361013e366004610f90565b6102b7565b6040519081526020015b60405180910390f35b6101696101643660046110be565b6102f4565b005b6000610143565b6101696101803660046111bb565b610367565b6101436103a2565b6101a061019b366004611257565b6103d6565b604051901515815260200161014d565b6101696103f3565b6101436105df565b6101c86105fa565b6040516001600160a01b03909116815260200161014d565b610143610620565b610169610660565b6101436101fe366004611270565b61078f565b6101696102113660046112ff565b6107d4565b610143610224366004611257565b60036020526000908152604090205481565b610143610853565b61016961024c366004611321565b610880565b610259600281565b6040516001600160801b03909116815260200161014d565b6000546101c8906001600160a01b031681565b610143610292366004611257565b60026020526000908152604090205481565b6001546101c8906001600160a01b031681565b60006102ec8484846040516020016102d191815260200190565b60405160208183030381529060405280519060200120610a0f565b949350505050565b6000610306898989898989898961078f565b90506103488c8c808060200260200160405190810160405280939291908181526020018383602002808284376000920191909152508e9250859150610ab19050565b6103598a8a8a8a8a8a8a8a8a610bba565b505050505050505050505050565b331561038657604051630e13b69d60e01b815260040160405180910390fd5b610397898989898989898989610bba565b505050505050505050565b6004546000906001600160801b03166002600160801b031981016103c857600091505090565b6001600160801b0316919050565b60008060006103e484610e44565b92509250506102ec8282610e81565b60008054906101000a90046001600160a01b03166001600160a01b0316638da5cb5b6040518163ffffffff1660e01b8152600401602060405180830381865afa158015610444573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906104689190611345565b6001600160a01b0316336001600160a01b03161461051e5760005460408051638da5cb5b60e01b8152905133926001600160a01b031691638da5cb5b9160048083019260209291908290030181865afa1580156104c9573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906104ed9190611345565b604051631194af8760e11b81526001600160a01b039283166004820152911660248201526044015b60405180910390fd5b6001546040805163cb23bcb560e01b815290516000926001600160a01b03169163cb23bcb59160048083019260209291908290030181865afa158015610568573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061058c9190611345565b6000549091506001600160a01b038083169116036105bd5760405163d054909f60e01b815260040160405180910390fd5b600080546001600160a01b0319166001600160a01b0392909216919091179055565b600554600090600181016105f557506000919050565b919050565b6006546000906001600160a01b03166002600160a01b031981016105f557600091505090565b600654600090600160a01b90046001600160601b03166bfffffffffffffffffffffffe19810161065257600091505090565b6001600160601b0316919050565b6001600160a01b037f00000000000000000000000000000000000000000000000000000000000000001630036106a85760405162461bcd60e51b815260040161051590611362565b7fb53127684a568b3173ae13b9f8a6016e243e63b6e8ee1178d6a717850b5d61038054336001600160a01b0382161461070557604051631194af8760e11b81523360048201526001600160a01b0382166024820152604401610515565b6004546001600160801b03908116146107315760405163d0afb66160e01b815260040160405180910390fd5b50506040805160c0810182526001600160801b0380825260208201526000199181018290526001600160a01b0360608201526001600160601b036080820152600060a090910181905260048290556005829055600691909155600755565b600088888888888888886040516020016107b09897969594939291906113ae565b60405160208183030381529060405280519060200120905098975050505050505050565b6000546001600160a01b0316331461081457600054604051630e4cf1bf60e21b81523360048201526001600160a01b039091166024820152604401610515565b60008281526003602052604080822083905551829184917fb4df3847300f076a369cd76d2314b470a1194d9e8a6bb97f1860aee88a5f67489190a35050565b600454600090600160801b90046001600160801b03166002600160801b031981016103c857600091505090565b6001600160a01b037f00000000000000000000000000000000000000000000000000000000000000001630036108c85760405162461bcd60e51b815260040161051590611362565b6001600160a01b0381166108ef57604051631ad0f74360e01b815260040160405180910390fd5b6001546001600160a01b03161561091957604051633bcd329760e21b815260040160405180910390fd5b6040805160c0810182526001600160801b038082526020808301919091526000198284018190526001600160a01b03606084018190526001600160601b036080850152600060a090940184905260048281556005839055600692909255600793909355600180546001600160a01b0319169386169384179055835163cb23bcb560e01b81529351929363cb23bcb593818301939290918290030181865afa1580156109c8573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906109ec9190611345565b600080546001600160a01b0319166001600160a01b039290921691909117905550565b8251600090610100811115610a4257604051637ed6198f60e11b8152600481018290526101006024820152604401610515565b8260005b82811015610aa7576000878281518110610a6257610a62611405565b60200260200101519050816001901b8716600003610a8e57826000528060205260406000209250610a9e565b8060005282602052604060002092505b50600101610a46565b5095945050505050565b610100835110610ad957825160405163ab6a068360e01b815260040161051591815260200190565b8251610ae6906002611518565b8210610b1d578183516002610afb9190611518565b604051630b8a724b60e01b815260048101929092526024820152604401610515565b6000610b2a8484846102b7565b600081815260036020526040902054909150610b5c576040516310e61af960e31b815260048101829052602401610515565b6000806000610b6a86610e44565b925092509250610b7a8282610e81565b15610b9b57604051639715b8d360e01b815260048101879052602401610515565b600092835260026020526040909220600190911b909117905550505050565b6000886001600160a01b0316886001600160a01b03167f20af7f3bbfe38132b8900ae295cd9c8d1914be7052d061a511f3f728dab189648c604051610c0191815260200190565b60405180910390a46000839050600060046040518060c00160405290816000820160009054906101000a90046001600160801b03166001600160801b03166001600160801b031681526020016000820160109054906101000a90046001600160801b03166001600160801b03166001600160801b03168152602001600182015481526020016002820160009054906101000a90046001600160a01b03166001600160a01b03166001600160a01b031681526020016002820160149054906101000a90046001600160601b03166001600160601b03166001600160601b0316815260200160038201548152505090506040518060c00160405280896001600160801b03168152602001876001600160801b031681526020018c60001b81526020018b6001600160a01b03168152602001886001600160601b03168152602001610d47600090565b905280516020808301516001600160801b03908116600160801b02921691909117600455604080830151600555606083015160808401516001600160601b0316600160a01b026001600160a01b039091161760065560a0909201516007558151601f8601829004820281018201909252848252610de3918b918591908890889081908401838280828437600092019190915250610e9092505050565b805160208201516001600160801b03908116600160801b029116176004556040810151600555606081015160808201516001600160601b0316600160a01b026001600160a01b039091161760065560a0015160075550505050505050505050565b6000808080610e5460ff8661153a565b90506000610e6360ff8761154e565b60008381526002602052604090205492979096509194509092505050565b80821c60011615155b92915050565b600154604051639e5d4c4960e01b815260009182916001600160a01b0390911690639e5d4c4990610ec990889088908890600401611586565b6000604051808303816000875af1158015610ee8573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f19168201604052610f1091908101906115cf565b9150915081610f4257805115610f295780518082602001fd5b604051631bb7daad60e11b815260040160405180910390fd5b5050505050565b634e487b7160e01b600052604160045260246000fd5b604051601f8201601f1916810167ffffffffffffffff81118282101715610f8857610f88610f49565b604052919050565b600080600060608486031215610fa557600080fd5b833567ffffffffffffffff811115610fbc57600080fd5b8401601f81018613610fcd57600080fd5b803567ffffffffffffffff811115610fe757610fe7610f49565b8060051b610ff760208201610f5f565b9182526020818401810192908101908984111561101357600080fd5b6020850194505b838510156110395784358083526020958601959093509091019061101a565b9960208901359950604090980135979650505050505050565b6001600160a01b038116811461106757600080fd5b50565b80356105f581611052565b60008083601f84011261108757600080fd5b50813567ffffffffffffffff81111561109f57600080fd5b6020830191508360208285010111156110b757600080fd5b9250929050565b60008060008060008060008060008060006101208c8e0312156110e057600080fd5b8b3567ffffffffffffffff8111156110f757600080fd5b8c01601f81018e1361110857600080fd5b803567ffffffffffffffff81111561111f57600080fd5b8e60208260051b840101111561113457600080fd5b60209182019c509a508c0135985061114e60408d0161106a565b975061115c60608d0161106a565b965060808c0135955060a08c0135945060c08c0135935060e08c013592506101008c013567ffffffffffffffff81111561119557600080fd5b6111a18e828f01611075565b915080935050809150509295989b509295989b9093969950565b60008060008060008060008060006101008a8c0312156111da57600080fd5b8935985060208a01356111ec81611052565b975060408a01356111fc81611052565b965060608a0135955060808a0135945060a08a0135935060c08a0135925060e08a013567ffffffffffffffff81111561123457600080fd5b6112408c828d01611075565b915080935050809150509295985092959850929598565b60006020828403121561126957600080fd5b5035919050565b60008060008060008060008060e0898b03121561128c57600080fd5b883561129781611052565b975060208901356112a781611052565b965060408901359550606089013594506080890135935060a0890135925060c089013567ffffffffffffffff8111156112df57600080fd5b6112eb8b828c01611075565b999c989b5096995094979396929594505050565b6000806040838503121561131257600080fd5b50508035926020909101359150565b60006020828403121561133357600080fd5b813561133e81611052565b9392505050565b60006020828403121561135757600080fd5b815161133e81611052565b6020808252602c908201527f46756e6374696f6e206d7573742062652063616c6c6564207468726f7567682060408201526b19195b1959d85d1958d85b1b60a21b606082015260800190565b6001600160601b03198960601b1681526001600160601b03198860601b166014820152866028820152856048820152846068820152836088820152818360a88301376000910160a801908152979650505050505050565b634e487b7160e01b600052603260045260246000fd5b634e487b7160e01b600052601160045260246000fd5b6001815b600184111561146c578085048111156114505761145061141b565b600184161561145e57908102905b60019390931c928002611435565b935093915050565b60008261148357506001610e8a565b8161149057506000610e8a565b81600181146114a657600281146114b0576114cc565b6001915050610e8a565b60ff8411156114c1576114c161141b565b50506001821b610e8a565b5060208310610133831016604e8410600b84101617156114ef575081810a610e8a565b6114fc6000198484611431565b80600019048211156115105761151061141b565b029392505050565b600061133e8383611474565b634e487b7160e01b600052601260045260246000fd5b60008261154957611549611524565b500490565b60008261155d5761155d611524565b500690565b60005b8381101561157d578181015183820152602001611565565b50506000910152565b60018060a01b038416815282602082015260606040820152600082518060608401526115b9816080850160208701611562565b601f01601f191691909101608001949350505050565b600080604083850312156115e257600080fd5b825180151581146115f257600080fd5b602084015190925067ffffffffffffffff81111561160f57600080fd5b8301601f8101851361162057600080fd5b805167ffffffffffffffff81111561163a5761163a610f49565b61164d601f8201601f1916602001610f5f565b81815286602083850101111561166257600080fd5b611673826020830160208601611562565b809350505050925092905056fea26469706673582212207104442fadc9a7521ef8f71e8ef2efdd1998a3762860253a98a2366fe5a1cd3464736f6c634300081e0033";
	static readonly abi: readonly [
		{
			readonly inputs: readonly [
			];
			readonly name: "AlreadyInit";
			readonly type: "error";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "uint256";
					readonly name: "index";
					readonly type: "uint256";
				}
			];
			readonly name: "AlreadySpent";
			readonly type: "error";
		},
		{
			readonly inputs: readonly [
			];
			readonly name: "BadPostUpgradeInit";
			readonly type: "error";
		},
		{
			readonly inputs: readonly [
			];
			readonly name: "BridgeCallFailed";
			readonly type: "error";
		},
		{
			readonly inputs: readonly [
			];
			readonly name: "HadZeroInit";
			readonly type: "error";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "uint256";
					readonly name: "actualLength";
					readonly type: "uint256";
				},
				{
					readonly internalType: "uint256";
					readonly name: "maxProofLength";
					readonly type: "uint256";
				}
			];
			readonly name: "MerkleProofTooLong";
			readonly type: "error";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "address";
					readonly name: "sender";
					readonly type: "address";
				},
				{
					readonly internalType: "address";
					readonly name: "owner";
					readonly type: "address";
				}
			];
			readonly name: "NotOwner";
			readonly type: "error";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "address";
					readonly name: "sender";
					readonly type: "address";
				},
				{
					readonly internalType: "address";
					readonly name: "rollup";
					readonly type: "address";
				}
			];
			readonly name: "NotRollup";
			readonly type: "error";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "uint256";
					readonly name: "index";
					readonly type: "uint256";
				},
				{
					readonly internalType: "uint256";
					readonly name: "maxIndex";
					readonly type: "uint256";
				}
			];
			readonly name: "PathNotMinimal";
			readonly type: "error";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "uint256";
					readonly name: "proofLength";
					readonly type: "uint256";
				}
			];
			readonly name: "ProofTooLong";
			readonly type: "error";
		},
		{
			readonly inputs: readonly [
			];
			readonly name: "RollupNotChanged";
			readonly type: "error";
		},
		{
			readonly inputs: readonly [
			];
			readonly name: "SimulationOnlyEntrypoint";
			readonly type: "error";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "bytes32";
					readonly name: "root";
					readonly type: "bytes32";
				}
			];
			readonly name: "UnknownRoot";
			readonly type: "error";
		},
		{
			readonly anonymous: false;
			readonly inputs: readonly [
				{
					readonly indexed: true;
					readonly internalType: "address";
					readonly name: "to";
					readonly type: "address";
				},
				{
					readonly indexed: true;
					readonly internalType: "address";
					readonly name: "l2Sender";
					readonly type: "address";
				},
				{
					readonly indexed: true;
					readonly internalType: "uint256";
					readonly name: "zero";
					readonly type: "uint256";
				},
				{
					readonly indexed: false;
					readonly internalType: "uint256";
					readonly name: "transactionIndex";
					readonly type: "uint256";
				}
			];
			readonly name: "OutBoxTransactionExecuted";
			readonly type: "event";
		},
		{
			readonly anonymous: false;
			readonly inputs: readonly [
				{
					readonly indexed: true;
					readonly internalType: "bytes32";
					readonly name: "outputRoot";
					readonly type: "bytes32";
				},
				{
					readonly indexed: true;
					readonly internalType: "bytes32";
					readonly name: "l2BlockHash";
					readonly type: "bytes32";
				}
			];
			readonly name: "SendRootUpdated";
			readonly type: "event";
		},
		{
			readonly inputs: readonly [
			];
			readonly name: "OUTBOX_VERSION";
			readonly outputs: readonly [
				{
					readonly internalType: "uint128";
					readonly name: "";
					readonly type: "uint128";
				}
			];
			readonly stateMutability: "view";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
			];
			readonly name: "bridge";
			readonly outputs: readonly [
				{
					readonly internalType: "contract IBridge";
					readonly name: "";
					readonly type: "address";
				}
			];
			readonly stateMutability: "view";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "address";
					readonly name: "l2Sender";
					readonly type: "address";
				},
				{
					readonly internalType: "address";
					readonly name: "to";
					readonly type: "address";
				},
				{
					readonly internalType: "uint256";
					readonly name: "l2Block";
					readonly type: "uint256";
				},
				{
					readonly internalType: "uint256";
					readonly name: "l1Block";
					readonly type: "uint256";
				},
				{
					readonly internalType: "uint256";
					readonly name: "l2Timestamp";
					readonly type: "uint256";
				},
				{
					readonly internalType: "uint256";
					readonly name: "value";
					readonly type: "uint256";
				},
				{
					readonly internalType: "bytes";
					readonly name: "data";
					readonly type: "bytes";
				}
			];
			readonly name: "calculateItemHash";
			readonly outputs: readonly [
				{
					readonly internalType: "bytes32";
					readonly name: "";
					readonly type: "bytes32";
				}
			];
			readonly stateMutability: "pure";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "bytes32[]";
					readonly name: "proof";
					readonly type: "bytes32[]";
				},
				{
					readonly internalType: "uint256";
					readonly name: "path";
					readonly type: "uint256";
				},
				{
					readonly internalType: "bytes32";
					readonly name: "item";
					readonly type: "bytes32";
				}
			];
			readonly name: "calculateMerkleRoot";
			readonly outputs: readonly [
				{
					readonly internalType: "bytes32";
					readonly name: "";
					readonly type: "bytes32";
				}
			];
			readonly stateMutability: "pure";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "bytes32[]";
					readonly name: "proof";
					readonly type: "bytes32[]";
				},
				{
					readonly internalType: "uint256";
					readonly name: "index";
					readonly type: "uint256";
				},
				{
					readonly internalType: "address";
					readonly name: "l2Sender";
					readonly type: "address";
				},
				{
					readonly internalType: "address";
					readonly name: "to";
					readonly type: "address";
				},
				{
					readonly internalType: "uint256";
					readonly name: "l2Block";
					readonly type: "uint256";
				},
				{
					readonly internalType: "uint256";
					readonly name: "l1Block";
					readonly type: "uint256";
				},
				{
					readonly internalType: "uint256";
					readonly name: "l2Timestamp";
					readonly type: "uint256";
				},
				{
					readonly internalType: "uint256";
					readonly name: "value";
					readonly type: "uint256";
				},
				{
					readonly internalType: "bytes";
					readonly name: "data";
					readonly type: "bytes";
				}
			];
			readonly name: "executeTransaction";
			readonly outputs: readonly [
			];
			readonly stateMutability: "nonpayable";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "uint256";
					readonly name: "index";
					readonly type: "uint256";
				},
				{
					readonly internalType: "address";
					readonly name: "l2Sender";
					readonly type: "address";
				},
				{
					readonly internalType: "address";
					readonly name: "to";
					readonly type: "address";
				},
				{
					readonly internalType: "uint256";
					readonly name: "l2Block";
					readonly type: "uint256";
				},
				{
					readonly internalType: "uint256";
					readonly name: "l1Block";
					readonly type: "uint256";
				},
				{
					readonly internalType: "uint256";
					readonly name: "l2Timestamp";
					readonly type: "uint256";
				},
				{
					readonly internalType: "uint256";
					readonly name: "value";
					readonly type: "uint256";
				},
				{
					readonly internalType: "bytes";
					readonly name: "data";
					readonly type: "bytes";
				}
			];
			readonly name: "executeTransactionSimulation";
			readonly outputs: readonly [
			];
			readonly stateMutability: "nonpayable";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "contract IBridge";
					readonly name: "_bridge";
					readonly type: "address";
				}
			];
			readonly name: "initialize";
			readonly outputs: readonly [
			];
			readonly stateMutability: "nonpayable";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "uint256";
					readonly name: "index";
					readonly type: "uint256";
				}
			];
			readonly name: "isSpent";
			readonly outputs: readonly [
				{
					readonly internalType: "bool";
					readonly name: "";
					readonly type: "bool";
				}
			];
			readonly stateMutability: "view";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
			];
			readonly name: "l2ToL1BatchNum";
			readonly outputs: readonly [
				{
					readonly internalType: "uint256";
					readonly name: "";
					readonly type: "uint256";
				}
			];
			readonly stateMutability: "pure";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
			];
			readonly name: "l2ToL1Block";
			readonly outputs: readonly [
				{
					readonly internalType: "uint256";
					readonly name: "";
					readonly type: "uint256";
				}
			];
			readonly stateMutability: "view";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
			];
			readonly name: "l2ToL1EthBlock";
			readonly outputs: readonly [
				{
					readonly internalType: "uint256";
					readonly name: "";
					readonly type: "uint256";
				}
			];
			readonly stateMutability: "view";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
			];
			readonly name: "l2ToL1OutputId";
			readonly outputs: readonly [
				{
					readonly internalType: "bytes32";
					readonly name: "";
					readonly type: "bytes32";
				}
			];
			readonly stateMutability: "view";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
			];
			readonly name: "l2ToL1Sender";
			readonly outputs: readonly [
				{
					readonly internalType: "address";
					readonly name: "";
					readonly type: "address";
				}
			];
			readonly stateMutability: "view";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
			];
			readonly name: "l2ToL1Timestamp";
			readonly outputs: readonly [
				{
					readonly internalType: "uint256";
					readonly name: "";
					readonly type: "uint256";
				}
			];
			readonly stateMutability: "view";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
			];
			readonly name: "postUpgradeInit";
			readonly outputs: readonly [
			];
			readonly stateMutability: "nonpayable";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
			];
			readonly name: "rollup";
			readonly outputs: readonly [
				{
					readonly internalType: "address";
					readonly name: "";
					readonly type: "address";
				}
			];
			readonly stateMutability: "view";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "bytes32";
					readonly name: "";
					readonly type: "bytes32";
				}
			];
			readonly name: "roots";
			readonly outputs: readonly [
				{
					readonly internalType: "bytes32";
					readonly name: "";
					readonly type: "bytes32";
				}
			];
			readonly stateMutability: "view";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "uint256";
					readonly name: "";
					readonly type: "uint256";
				}
			];
			readonly name: "spent";
			readonly outputs: readonly [
				{
					readonly internalType: "bytes32";
					readonly name: "";
					readonly type: "bytes32";
				}
			];
			readonly stateMutability: "view";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
			];
			readonly name: "updateRollupAddress";
			readonly outputs: readonly [
			];
			readonly stateMutability: "nonpayable";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "bytes32";
					readonly name: "root";
					readonly type: "bytes32";
				},
				{
					readonly internalType: "bytes32";
					readonly name: "l2BlockHash";
					readonly type: "bytes32";
				}
			];
			readonly name: "updateSendRoot";
			readonly outputs: readonly [
			];
			readonly stateMutability: "nonpayable";
			readonly type: "function";
		}
	];
	static createInterface(): OutboxInterface;
	static connect(address: string, runner?: ContractRunner | null): Outbox;
}
export declare class IGasRefunder__factory {
	static readonly abi: readonly [
		{
			readonly inputs: readonly [
				{
					readonly internalType: "address payable";
					readonly name: "spender";
					readonly type: "address";
				},
				{
					readonly internalType: "uint256";
					readonly name: "gasUsed";
					readonly type: "uint256";
				},
				{
					readonly internalType: "uint256";
					readonly name: "calldataSize";
					readonly type: "uint256";
				}
			];
			readonly name: "onGasSpent";
			readonly outputs: readonly [
				{
					readonly internalType: "bool";
					readonly name: "success";
					readonly type: "bool";
				}
			];
			readonly stateMutability: "nonpayable";
			readonly type: "function";
		}
	];
	static createInterface(): IGasRefunderInterface;
	static connect(address: string, runner?: ContractRunner | null): IGasRefunder;
}
export declare class NodeInterface__factory {
	static readonly abi: readonly [
		{
			readonly inputs: readonly [
				{
					readonly internalType: "uint64";
					readonly name: "l2BlockNum";
					readonly type: "uint64";
				}
			];
			readonly name: "blockL1Num";
			readonly outputs: readonly [
				{
					readonly internalType: "uint64";
					readonly name: "l1BlockNum";
					readonly type: "uint64";
				}
			];
			readonly stateMutability: "view";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "uint64";
					readonly name: "size";
					readonly type: "uint64";
				},
				{
					readonly internalType: "uint64";
					readonly name: "leaf";
					readonly type: "uint64";
				}
			];
			readonly name: "constructOutboxProof";
			readonly outputs: readonly [
				{
					readonly internalType: "bytes32";
					readonly name: "send";
					readonly type: "bytes32";
				},
				{
					readonly internalType: "bytes32";
					readonly name: "root";
					readonly type: "bytes32";
				},
				{
					readonly internalType: "bytes32[]";
					readonly name: "proof";
					readonly type: "bytes32[]";
				}
			];
			readonly stateMutability: "view";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "address";
					readonly name: "sender";
					readonly type: "address";
				},
				{
					readonly internalType: "uint256";
					readonly name: "deposit";
					readonly type: "uint256";
				},
				{
					readonly internalType: "address";
					readonly name: "to";
					readonly type: "address";
				},
				{
					readonly internalType: "uint256";
					readonly name: "l2CallValue";
					readonly type: "uint256";
				},
				{
					readonly internalType: "address";
					readonly name: "excessFeeRefundAddress";
					readonly type: "address";
				},
				{
					readonly internalType: "address";
					readonly name: "callValueRefundAddress";
					readonly type: "address";
				},
				{
					readonly internalType: "bytes";
					readonly name: "data";
					readonly type: "bytes";
				}
			];
			readonly name: "estimateRetryableTicket";
			readonly outputs: readonly [
			];
			readonly stateMutability: "nonpayable";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "uint64";
					readonly name: "blockNum";
					readonly type: "uint64";
				}
			];
			readonly name: "findBatchContainingBlock";
			readonly outputs: readonly [
				{
					readonly internalType: "uint64";
					readonly name: "batch";
					readonly type: "uint64";
				}
			];
			readonly stateMutability: "view";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "address";
					readonly name: "to";
					readonly type: "address";
				},
				{
					readonly internalType: "bool";
					readonly name: "contractCreation";
					readonly type: "bool";
				},
				{
					readonly internalType: "bytes";
					readonly name: "data";
					readonly type: "bytes";
				}
			];
			readonly name: "gasEstimateComponents";
			readonly outputs: readonly [
				{
					readonly internalType: "uint64";
					readonly name: "gasEstimate";
					readonly type: "uint64";
				},
				{
					readonly internalType: "uint64";
					readonly name: "gasEstimateForL1";
					readonly type: "uint64";
				},
				{
					readonly internalType: "uint256";
					readonly name: "baseFee";
					readonly type: "uint256";
				},
				{
					readonly internalType: "uint256";
					readonly name: "l1BaseFeeEstimate";
					readonly type: "uint256";
				}
			];
			readonly stateMutability: "payable";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "address";
					readonly name: "to";
					readonly type: "address";
				},
				{
					readonly internalType: "bool";
					readonly name: "contractCreation";
					readonly type: "bool";
				},
				{
					readonly internalType: "bytes";
					readonly name: "data";
					readonly type: "bytes";
				}
			];
			readonly name: "gasEstimateL1Component";
			readonly outputs: readonly [
				{
					readonly internalType: "uint64";
					readonly name: "gasEstimateForL1";
					readonly type: "uint64";
				},
				{
					readonly internalType: "uint256";
					readonly name: "baseFee";
					readonly type: "uint256";
				},
				{
					readonly internalType: "uint256";
					readonly name: "l1BaseFeeEstimate";
					readonly type: "uint256";
				}
			];
			readonly stateMutability: "payable";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "bytes32";
					readonly name: "blockHash";
					readonly type: "bytes32";
				}
			];
			readonly name: "getL1Confirmations";
			readonly outputs: readonly [
				{
					readonly internalType: "uint64";
					readonly name: "confirmations";
					readonly type: "uint64";
				}
			];
			readonly stateMutability: "view";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "uint64";
					readonly name: "blockNum";
					readonly type: "uint64";
				}
			];
			readonly name: "l2BlockRangeForL1";
			readonly outputs: readonly [
				{
					readonly internalType: "uint64";
					readonly name: "firstBlock";
					readonly type: "uint64";
				},
				{
					readonly internalType: "uint64";
					readonly name: "lastBlock";
					readonly type: "uint64";
				}
			];
			readonly stateMutability: "view";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "uint256";
					readonly name: "batchNum";
					readonly type: "uint256";
				},
				{
					readonly internalType: "uint64";
					readonly name: "index";
					readonly type: "uint64";
				}
			];
			readonly name: "legacyLookupMessageBatchProof";
			readonly outputs: readonly [
				{
					readonly internalType: "bytes32[]";
					readonly name: "proof";
					readonly type: "bytes32[]";
				},
				{
					readonly internalType: "uint256";
					readonly name: "path";
					readonly type: "uint256";
				},
				{
					readonly internalType: "address";
					readonly name: "l2Sender";
					readonly type: "address";
				},
				{
					readonly internalType: "address";
					readonly name: "l1Dest";
					readonly type: "address";
				},
				{
					readonly internalType: "uint256";
					readonly name: "l2Block";
					readonly type: "uint256";
				},
				{
					readonly internalType: "uint256";
					readonly name: "l1Block";
					readonly type: "uint256";
				},
				{
					readonly internalType: "uint256";
					readonly name: "timestamp";
					readonly type: "uint256";
				},
				{
					readonly internalType: "uint256";
					readonly name: "amount";
					readonly type: "uint256";
				},
				{
					readonly internalType: "bytes";
					readonly name: "calldataForL1";
					readonly type: "bytes";
				}
			];
			readonly stateMutability: "view";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
			];
			readonly name: "nitroGenesisBlock";
			readonly outputs: readonly [
				{
					readonly internalType: "uint256";
					readonly name: "number";
					readonly type: "uint256";
				}
			];
			readonly stateMutability: "pure";
			readonly type: "function";
		}
	];
	static createInterface(): NodeInterfaceInterface;
	static connect(address: string, runner?: ContractRunner | null): NodeInterface;
}
export declare class ArbSys__factory {
	static readonly abi: readonly [
		{
			readonly inputs: readonly [
				{
					readonly internalType: "uint256";
					readonly name: "requested";
					readonly type: "uint256";
				},
				{
					readonly internalType: "uint256";
					readonly name: "current";
					readonly type: "uint256";
				}
			];
			readonly name: "InvalidBlockNumber";
			readonly type: "error";
		},
		{
			readonly anonymous: false;
			readonly inputs: readonly [
				{
					readonly indexed: false;
					readonly internalType: "address";
					readonly name: "caller";
					readonly type: "address";
				},
				{
					readonly indexed: true;
					readonly internalType: "address";
					readonly name: "destination";
					readonly type: "address";
				},
				{
					readonly indexed: true;
					readonly internalType: "uint256";
					readonly name: "uniqueId";
					readonly type: "uint256";
				},
				{
					readonly indexed: true;
					readonly internalType: "uint256";
					readonly name: "batchNumber";
					readonly type: "uint256";
				},
				{
					readonly indexed: false;
					readonly internalType: "uint256";
					readonly name: "indexInBatch";
					readonly type: "uint256";
				},
				{
					readonly indexed: false;
					readonly internalType: "uint256";
					readonly name: "arbBlockNum";
					readonly type: "uint256";
				},
				{
					readonly indexed: false;
					readonly internalType: "uint256";
					readonly name: "ethBlockNum";
					readonly type: "uint256";
				},
				{
					readonly indexed: false;
					readonly internalType: "uint256";
					readonly name: "timestamp";
					readonly type: "uint256";
				},
				{
					readonly indexed: false;
					readonly internalType: "uint256";
					readonly name: "callvalue";
					readonly type: "uint256";
				},
				{
					readonly indexed: false;
					readonly internalType: "bytes";
					readonly name: "data";
					readonly type: "bytes";
				}
			];
			readonly name: "L2ToL1Transaction";
			readonly type: "event";
		},
		{
			readonly anonymous: false;
			readonly inputs: readonly [
				{
					readonly indexed: false;
					readonly internalType: "address";
					readonly name: "caller";
					readonly type: "address";
				},
				{
					readonly indexed: true;
					readonly internalType: "address";
					readonly name: "destination";
					readonly type: "address";
				},
				{
					readonly indexed: true;
					readonly internalType: "uint256";
					readonly name: "hash";
					readonly type: "uint256";
				},
				{
					readonly indexed: true;
					readonly internalType: "uint256";
					readonly name: "position";
					readonly type: "uint256";
				},
				{
					readonly indexed: false;
					readonly internalType: "uint256";
					readonly name: "arbBlockNum";
					readonly type: "uint256";
				},
				{
					readonly indexed: false;
					readonly internalType: "uint256";
					readonly name: "ethBlockNum";
					readonly type: "uint256";
				},
				{
					readonly indexed: false;
					readonly internalType: "uint256";
					readonly name: "timestamp";
					readonly type: "uint256";
				},
				{
					readonly indexed: false;
					readonly internalType: "uint256";
					readonly name: "callvalue";
					readonly type: "uint256";
				},
				{
					readonly indexed: false;
					readonly internalType: "bytes";
					readonly name: "data";
					readonly type: "bytes";
				}
			];
			readonly name: "L2ToL1Tx";
			readonly type: "event";
		},
		{
			readonly anonymous: false;
			readonly inputs: readonly [
				{
					readonly indexed: true;
					readonly internalType: "uint256";
					readonly name: "reserved";
					readonly type: "uint256";
				},
				{
					readonly indexed: true;
					readonly internalType: "bytes32";
					readonly name: "hash";
					readonly type: "bytes32";
				},
				{
					readonly indexed: true;
					readonly internalType: "uint256";
					readonly name: "position";
					readonly type: "uint256";
				}
			];
			readonly name: "SendMerkleUpdate";
			readonly type: "event";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "uint256";
					readonly name: "arbBlockNum";
					readonly type: "uint256";
				}
			];
			readonly name: "arbBlockHash";
			readonly outputs: readonly [
				{
					readonly internalType: "bytes32";
					readonly name: "";
					readonly type: "bytes32";
				}
			];
			readonly stateMutability: "view";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
			];
			readonly name: "arbBlockNumber";
			readonly outputs: readonly [
				{
					readonly internalType: "uint256";
					readonly name: "";
					readonly type: "uint256";
				}
			];
			readonly stateMutability: "view";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
			];
			readonly name: "arbChainID";
			readonly outputs: readonly [
				{
					readonly internalType: "uint256";
					readonly name: "";
					readonly type: "uint256";
				}
			];
			readonly stateMutability: "view";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
			];
			readonly name: "arbOSVersion";
			readonly outputs: readonly [
				{
					readonly internalType: "uint256";
					readonly name: "";
					readonly type: "uint256";
				}
			];
			readonly stateMutability: "view";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
			];
			readonly name: "getStorageGasAvailable";
			readonly outputs: readonly [
				{
					readonly internalType: "uint256";
					readonly name: "";
					readonly type: "uint256";
				}
			];
			readonly stateMutability: "view";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
			];
			readonly name: "isTopLevelCall";
			readonly outputs: readonly [
				{
					readonly internalType: "bool";
					readonly name: "";
					readonly type: "bool";
				}
			];
			readonly stateMutability: "view";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "address";
					readonly name: "sender";
					readonly type: "address";
				},
				{
					readonly internalType: "address";
					readonly name: "unused";
					readonly type: "address";
				}
			];
			readonly name: "mapL1SenderContractAddressToL2Alias";
			readonly outputs: readonly [
				{
					readonly internalType: "address";
					readonly name: "";
					readonly type: "address";
				}
			];
			readonly stateMutability: "pure";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
			];
			readonly name: "myCallersAddressWithoutAliasing";
			readonly outputs: readonly [
				{
					readonly internalType: "address";
					readonly name: "";
					readonly type: "address";
				}
			];
			readonly stateMutability: "view";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
			];
			readonly name: "sendMerkleTreeState";
			readonly outputs: readonly [
				{
					readonly internalType: "uint256";
					readonly name: "size";
					readonly type: "uint256";
				},
				{
					readonly internalType: "bytes32";
					readonly name: "root";
					readonly type: "bytes32";
				},
				{
					readonly internalType: "bytes32[]";
					readonly name: "partials";
					readonly type: "bytes32[]";
				}
			];
			readonly stateMutability: "view";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "address";
					readonly name: "destination";
					readonly type: "address";
				},
				{
					readonly internalType: "bytes";
					readonly name: "data";
					readonly type: "bytes";
				}
			];
			readonly name: "sendTxToL1";
			readonly outputs: readonly [
				{
					readonly internalType: "uint256";
					readonly name: "";
					readonly type: "uint256";
				}
			];
			readonly stateMutability: "payable";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
			];
			readonly name: "wasMyCallersAddressAliased";
			readonly outputs: readonly [
				{
					readonly internalType: "bool";
					readonly name: "";
					readonly type: "bool";
				}
			];
			readonly stateMutability: "view";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "address";
					readonly name: "destination";
					readonly type: "address";
				}
			];
			readonly name: "withdrawEth";
			readonly outputs: readonly [
				{
					readonly internalType: "uint256";
					readonly name: "";
					readonly type: "uint256";
				}
			];
			readonly stateMutability: "payable";
			readonly type: "function";
		}
	];
	static createInterface(): ArbSysInterface;
	static connect(address: string, runner?: ContractRunner | null): ArbSys;
}
export declare class Ownable__factory {
	static readonly abi: readonly [
		{
			readonly inputs: readonly [
				{
					readonly internalType: "address";
					readonly name: "owner";
					readonly type: "address";
				}
			];
			readonly name: "OwnableInvalidOwner";
			readonly type: "error";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "address";
					readonly name: "account";
					readonly type: "address";
				}
			];
			readonly name: "OwnableUnauthorizedAccount";
			readonly type: "error";
		},
		{
			readonly anonymous: false;
			readonly inputs: readonly [
				{
					readonly indexed: true;
					readonly internalType: "address";
					readonly name: "previousOwner";
					readonly type: "address";
				},
				{
					readonly indexed: true;
					readonly internalType: "address";
					readonly name: "newOwner";
					readonly type: "address";
				}
			];
			readonly name: "OwnershipTransferred";
			readonly type: "event";
		},
		{
			readonly inputs: readonly [
			];
			readonly name: "owner";
			readonly outputs: readonly [
				{
					readonly internalType: "address";
					readonly name: "";
					readonly type: "address";
				}
			];
			readonly stateMutability: "view";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
			];
			readonly name: "renounceOwnership";
			readonly outputs: readonly [
			];
			readonly stateMutability: "nonpayable";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "address";
					readonly name: "newOwner";
					readonly type: "address";
				}
			];
			readonly name: "transferOwnership";
			readonly outputs: readonly [
			];
			readonly stateMutability: "nonpayable";
			readonly type: "function";
		}
	];
	static createInterface(): OwnableInterface;
	static connect(address: string, runner?: ContractRunner | null): Ownable;
}
export declare class IERC1363__factory {
	static readonly abi: readonly [
		{
			readonly anonymous: false;
			readonly inputs: readonly [
				{
					readonly indexed: true;
					readonly internalType: "address";
					readonly name: "owner";
					readonly type: "address";
				},
				{
					readonly indexed: true;
					readonly internalType: "address";
					readonly name: "spender";
					readonly type: "address";
				},
				{
					readonly indexed: false;
					readonly internalType: "uint256";
					readonly name: "value";
					readonly type: "uint256";
				}
			];
			readonly name: "Approval";
			readonly type: "event";
		},
		{
			readonly anonymous: false;
			readonly inputs: readonly [
				{
					readonly indexed: true;
					readonly internalType: "address";
					readonly name: "from";
					readonly type: "address";
				},
				{
					readonly indexed: true;
					readonly internalType: "address";
					readonly name: "to";
					readonly type: "address";
				},
				{
					readonly indexed: false;
					readonly internalType: "uint256";
					readonly name: "value";
					readonly type: "uint256";
				}
			];
			readonly name: "Transfer";
			readonly type: "event";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "address";
					readonly name: "owner";
					readonly type: "address";
				},
				{
					readonly internalType: "address";
					readonly name: "spender";
					readonly type: "address";
				}
			];
			readonly name: "allowance";
			readonly outputs: readonly [
				{
					readonly internalType: "uint256";
					readonly name: "";
					readonly type: "uint256";
				}
			];
			readonly stateMutability: "view";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "address";
					readonly name: "spender";
					readonly type: "address";
				},
				{
					readonly internalType: "uint256";
					readonly name: "value";
					readonly type: "uint256";
				}
			];
			readonly name: "approve";
			readonly outputs: readonly [
				{
					readonly internalType: "bool";
					readonly name: "";
					readonly type: "bool";
				}
			];
			readonly stateMutability: "nonpayable";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "address";
					readonly name: "spender";
					readonly type: "address";
				},
				{
					readonly internalType: "uint256";
					readonly name: "value";
					readonly type: "uint256";
				}
			];
			readonly name: "approveAndCall";
			readonly outputs: readonly [
				{
					readonly internalType: "bool";
					readonly name: "";
					readonly type: "bool";
				}
			];
			readonly stateMutability: "nonpayable";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "address";
					readonly name: "spender";
					readonly type: "address";
				},
				{
					readonly internalType: "uint256";
					readonly name: "value";
					readonly type: "uint256";
				},
				{
					readonly internalType: "bytes";
					readonly name: "data";
					readonly type: "bytes";
				}
			];
			readonly name: "approveAndCall";
			readonly outputs: readonly [
				{
					readonly internalType: "bool";
					readonly name: "";
					readonly type: "bool";
				}
			];
			readonly stateMutability: "nonpayable";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "address";
					readonly name: "account";
					readonly type: "address";
				}
			];
			readonly name: "balanceOf";
			readonly outputs: readonly [
				{
					readonly internalType: "uint256";
					readonly name: "";
					readonly type: "uint256";
				}
			];
			readonly stateMutability: "view";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "bytes4";
					readonly name: "interfaceId";
					readonly type: "bytes4";
				}
			];
			readonly name: "supportsInterface";
			readonly outputs: readonly [
				{
					readonly internalType: "bool";
					readonly name: "";
					readonly type: "bool";
				}
			];
			readonly stateMutability: "view";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
			];
			readonly name: "totalSupply";
			readonly outputs: readonly [
				{
					readonly internalType: "uint256";
					readonly name: "";
					readonly type: "uint256";
				}
			];
			readonly stateMutability: "view";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "address";
					readonly name: "to";
					readonly type: "address";
				},
				{
					readonly internalType: "uint256";
					readonly name: "value";
					readonly type: "uint256";
				}
			];
			readonly name: "transfer";
			readonly outputs: readonly [
				{
					readonly internalType: "bool";
					readonly name: "";
					readonly type: "bool";
				}
			];
			readonly stateMutability: "nonpayable";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "address";
					readonly name: "to";
					readonly type: "address";
				},
				{
					readonly internalType: "uint256";
					readonly name: "value";
					readonly type: "uint256";
				}
			];
			readonly name: "transferAndCall";
			readonly outputs: readonly [
				{
					readonly internalType: "bool";
					readonly name: "";
					readonly type: "bool";
				}
			];
			readonly stateMutability: "nonpayable";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "address";
					readonly name: "to";
					readonly type: "address";
				},
				{
					readonly internalType: "uint256";
					readonly name: "value";
					readonly type: "uint256";
				},
				{
					readonly internalType: "bytes";
					readonly name: "data";
					readonly type: "bytes";
				}
			];
			readonly name: "transferAndCall";
			readonly outputs: readonly [
				{
					readonly internalType: "bool";
					readonly name: "";
					readonly type: "bool";
				}
			];
			readonly stateMutability: "nonpayable";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "address";
					readonly name: "from";
					readonly type: "address";
				},
				{
					readonly internalType: "address";
					readonly name: "to";
					readonly type: "address";
				},
				{
					readonly internalType: "uint256";
					readonly name: "value";
					readonly type: "uint256";
				}
			];
			readonly name: "transferFrom";
			readonly outputs: readonly [
				{
					readonly internalType: "bool";
					readonly name: "";
					readonly type: "bool";
				}
			];
			readonly stateMutability: "nonpayable";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "address";
					readonly name: "from";
					readonly type: "address";
				},
				{
					readonly internalType: "address";
					readonly name: "to";
					readonly type: "address";
				},
				{
					readonly internalType: "uint256";
					readonly name: "value";
					readonly type: "uint256";
				},
				{
					readonly internalType: "bytes";
					readonly name: "data";
					readonly type: "bytes";
				}
			];
			readonly name: "transferFromAndCall";
			readonly outputs: readonly [
				{
					readonly internalType: "bool";
					readonly name: "";
					readonly type: "bool";
				}
			];
			readonly stateMutability: "nonpayable";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "address";
					readonly name: "from";
					readonly type: "address";
				},
				{
					readonly internalType: "address";
					readonly name: "to";
					readonly type: "address";
				},
				{
					readonly internalType: "uint256";
					readonly name: "value";
					readonly type: "uint256";
				}
			];
			readonly name: "transferFromAndCall";
			readonly outputs: readonly [
				{
					readonly internalType: "bool";
					readonly name: "";
					readonly type: "bool";
				}
			];
			readonly stateMutability: "nonpayable";
			readonly type: "function";
		}
	];
	static createInterface(): IERC1363Interface;
	static connect(address: string, runner?: ContractRunner | null): IERC1363;
}
export declare class IERC1967__factory {
	static readonly abi: readonly [
		{
			readonly anonymous: false;
			readonly inputs: readonly [
				{
					readonly indexed: false;
					readonly internalType: "address";
					readonly name: "previousAdmin";
					readonly type: "address";
				},
				{
					readonly indexed: false;
					readonly internalType: "address";
					readonly name: "newAdmin";
					readonly type: "address";
				}
			];
			readonly name: "AdminChanged";
			readonly type: "event";
		},
		{
			readonly anonymous: false;
			readonly inputs: readonly [
				{
					readonly indexed: true;
					readonly internalType: "address";
					readonly name: "beacon";
					readonly type: "address";
				}
			];
			readonly name: "BeaconUpgraded";
			readonly type: "event";
		},
		{
			readonly anonymous: false;
			readonly inputs: readonly [
				{
					readonly indexed: true;
					readonly internalType: "address";
					readonly name: "implementation";
					readonly type: "address";
				}
			];
			readonly name: "Upgraded";
			readonly type: "event";
		}
	];
	static createInterface(): IERC1967Interface;
	static connect(address: string, runner?: ContractRunner | null): IERC1967;
}
export declare class IERC5267__factory {
	static readonly abi: readonly [
		{
			readonly anonymous: false;
			readonly inputs: readonly [
			];
			readonly name: "EIP712DomainChanged";
			readonly type: "event";
		},
		{
			readonly inputs: readonly [
			];
			readonly name: "eip712Domain";
			readonly outputs: readonly [
				{
					readonly internalType: "bytes1";
					readonly name: "fields";
					readonly type: "bytes1";
				},
				{
					readonly internalType: "string";
					readonly name: "name";
					readonly type: "string";
				},
				{
					readonly internalType: "string";
					readonly name: "version";
					readonly type: "string";
				},
				{
					readonly internalType: "uint256";
					readonly name: "chainId";
					readonly type: "uint256";
				},
				{
					readonly internalType: "address";
					readonly name: "verifyingContract";
					readonly type: "address";
				},
				{
					readonly internalType: "bytes32";
					readonly name: "salt";
					readonly type: "bytes32";
				},
				{
					readonly internalType: "uint256[]";
					readonly name: "extensions";
					readonly type: "uint256[]";
				}
			];
			readonly stateMutability: "view";
			readonly type: "function";
		}
	];
	static createInterface(): IERC5267Interface;
	static connect(address: string, runner?: ContractRunner | null): IERC5267;
}
export declare class IERC1155Errors__factory {
	static readonly abi: readonly [
		{
			readonly inputs: readonly [
				{
					readonly internalType: "address";
					readonly name: "sender";
					readonly type: "address";
				},
				{
					readonly internalType: "uint256";
					readonly name: "balance";
					readonly type: "uint256";
				},
				{
					readonly internalType: "uint256";
					readonly name: "needed";
					readonly type: "uint256";
				},
				{
					readonly internalType: "uint256";
					readonly name: "tokenId";
					readonly type: "uint256";
				}
			];
			readonly name: "ERC1155InsufficientBalance";
			readonly type: "error";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "address";
					readonly name: "approver";
					readonly type: "address";
				}
			];
			readonly name: "ERC1155InvalidApprover";
			readonly type: "error";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "uint256";
					readonly name: "idsLength";
					readonly type: "uint256";
				},
				{
					readonly internalType: "uint256";
					readonly name: "valuesLength";
					readonly type: "uint256";
				}
			];
			readonly name: "ERC1155InvalidArrayLength";
			readonly type: "error";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "address";
					readonly name: "operator";
					readonly type: "address";
				}
			];
			readonly name: "ERC1155InvalidOperator";
			readonly type: "error";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "address";
					readonly name: "receiver";
					readonly type: "address";
				}
			];
			readonly name: "ERC1155InvalidReceiver";
			readonly type: "error";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "address";
					readonly name: "sender";
					readonly type: "address";
				}
			];
			readonly name: "ERC1155InvalidSender";
			readonly type: "error";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "address";
					readonly name: "operator";
					readonly type: "address";
				},
				{
					readonly internalType: "address";
					readonly name: "owner";
					readonly type: "address";
				}
			];
			readonly name: "ERC1155MissingApprovalForAll";
			readonly type: "error";
		}
	];
	static createInterface(): IERC1155ErrorsInterface;
	static connect(address: string, runner?: ContractRunner | null): IERC1155Errors;
}
export declare class IERC20Errors__factory {
	static readonly abi: readonly [
		{
			readonly inputs: readonly [
				{
					readonly internalType: "address";
					readonly name: "spender";
					readonly type: "address";
				},
				{
					readonly internalType: "uint256";
					readonly name: "allowance";
					readonly type: "uint256";
				},
				{
					readonly internalType: "uint256";
					readonly name: "needed";
					readonly type: "uint256";
				}
			];
			readonly name: "ERC20InsufficientAllowance";
			readonly type: "error";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "address";
					readonly name: "sender";
					readonly type: "address";
				},
				{
					readonly internalType: "uint256";
					readonly name: "balance";
					readonly type: "uint256";
				},
				{
					readonly internalType: "uint256";
					readonly name: "needed";
					readonly type: "uint256";
				}
			];
			readonly name: "ERC20InsufficientBalance";
			readonly type: "error";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "address";
					readonly name: "approver";
					readonly type: "address";
				}
			];
			readonly name: "ERC20InvalidApprover";
			readonly type: "error";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "address";
					readonly name: "receiver";
					readonly type: "address";
				}
			];
			readonly name: "ERC20InvalidReceiver";
			readonly type: "error";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "address";
					readonly name: "sender";
					readonly type: "address";
				}
			];
			readonly name: "ERC20InvalidSender";
			readonly type: "error";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "address";
					readonly name: "spender";
					readonly type: "address";
				}
			];
			readonly name: "ERC20InvalidSpender";
			readonly type: "error";
		}
	];
	static createInterface(): IERC20ErrorsInterface;
	static connect(address: string, runner?: ContractRunner | null): IERC20Errors;
}
export declare class IERC721Errors__factory {
	static readonly abi: readonly [
		{
			readonly inputs: readonly [
				{
					readonly internalType: "address";
					readonly name: "sender";
					readonly type: "address";
				},
				{
					readonly internalType: "uint256";
					readonly name: "tokenId";
					readonly type: "uint256";
				},
				{
					readonly internalType: "address";
					readonly name: "owner";
					readonly type: "address";
				}
			];
			readonly name: "ERC721IncorrectOwner";
			readonly type: "error";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "address";
					readonly name: "operator";
					readonly type: "address";
				},
				{
					readonly internalType: "uint256";
					readonly name: "tokenId";
					readonly type: "uint256";
				}
			];
			readonly name: "ERC721InsufficientApproval";
			readonly type: "error";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "address";
					readonly name: "approver";
					readonly type: "address";
				}
			];
			readonly name: "ERC721InvalidApprover";
			readonly type: "error";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "address";
					readonly name: "operator";
					readonly type: "address";
				}
			];
			readonly name: "ERC721InvalidOperator";
			readonly type: "error";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "address";
					readonly name: "owner";
					readonly type: "address";
				}
			];
			readonly name: "ERC721InvalidOwner";
			readonly type: "error";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "address";
					readonly name: "receiver";
					readonly type: "address";
				}
			];
			readonly name: "ERC721InvalidReceiver";
			readonly type: "error";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "address";
					readonly name: "sender";
					readonly type: "address";
				}
			];
			readonly name: "ERC721InvalidSender";
			readonly type: "error";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "uint256";
					readonly name: "tokenId";
					readonly type: "uint256";
				}
			];
			readonly name: "ERC721NonexistentToken";
			readonly type: "error";
		}
	];
	static createInterface(): IERC721ErrorsInterface;
	static connect(address: string, runner?: ContractRunner | null): IERC721Errors;
}
export type ERC1967UtilsConstructorParams = [
	signer?: Signer
] | ConstructorParameters<typeof ContractFactory>;
export declare class ERC1967Utils__factory extends ContractFactory {
	constructor(...args: ERC1967UtilsConstructorParams);
	getDeployTransaction(overrides?: NonPayableOverrides & {
		from?: string;
	}): Promise<ContractDeployTransaction>;
	deploy(overrides?: NonPayableOverrides & {
		from?: string;
	}): Promise<ERC1967Utils & {
		deploymentTransaction(): ContractTransactionResponse;
	}>;
	connect(runner: ContractRunner | null): ERC1967Utils__factory;
	static readonly bytecode = "0x60566037600b82828239805160001a607314602a57634e487b7160e01b600052600060045260246000fd5b30600052607381538281f3fe73000000000000000000000000000000000000000030146080604052600080fdfea264697066735822122062776a869569e45e8d20c4c1c7f91dfce5d4593da7e5cc85b15f9a451abdabb364736f6c634300081e0033";
	static readonly abi: readonly [
		{
			readonly inputs: readonly [
				{
					readonly internalType: "address";
					readonly name: "admin";
					readonly type: "address";
				}
			];
			readonly name: "ERC1967InvalidAdmin";
			readonly type: "error";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "address";
					readonly name: "beacon";
					readonly type: "address";
				}
			];
			readonly name: "ERC1967InvalidBeacon";
			readonly type: "error";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "address";
					readonly name: "implementation";
					readonly type: "address";
				}
			];
			readonly name: "ERC1967InvalidImplementation";
			readonly type: "error";
		},
		{
			readonly inputs: readonly [
			];
			readonly name: "ERC1967NonPayable";
			readonly type: "error";
		}
	];
	static createInterface(): ERC1967UtilsInterface;
	static connect(address: string, runner?: ContractRunner | null): ERC1967Utils;
}
export declare class Proxy__factory {
	static readonly abi: readonly [
		{
			readonly stateMutability: "payable";
			readonly type: "fallback";
		}
	];
	static createInterface(): ProxyInterface;
	static connect(address: string, runner?: ContractRunner | null): Proxy$1;
}
export declare class IBeacon__factory {
	static readonly abi: readonly [
		{
			readonly inputs: readonly [
			];
			readonly name: "implementation";
			readonly outputs: readonly [
				{
					readonly internalType: "address";
					readonly name: "";
					readonly type: "address";
				}
			];
			readonly stateMutability: "view";
			readonly type: "function";
		}
	];
	static createInterface(): IBeaconInterface;
	static connect(address: string, runner?: ContractRunner | null): IBeacon;
}
export declare class ERC20__factory {
	static readonly abi: readonly [
		{
			readonly inputs: readonly [
				{
					readonly internalType: "address";
					readonly name: "spender";
					readonly type: "address";
				},
				{
					readonly internalType: "uint256";
					readonly name: "allowance";
					readonly type: "uint256";
				},
				{
					readonly internalType: "uint256";
					readonly name: "needed";
					readonly type: "uint256";
				}
			];
			readonly name: "ERC20InsufficientAllowance";
			readonly type: "error";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "address";
					readonly name: "sender";
					readonly type: "address";
				},
				{
					readonly internalType: "uint256";
					readonly name: "balance";
					readonly type: "uint256";
				},
				{
					readonly internalType: "uint256";
					readonly name: "needed";
					readonly type: "uint256";
				}
			];
			readonly name: "ERC20InsufficientBalance";
			readonly type: "error";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "address";
					readonly name: "approver";
					readonly type: "address";
				}
			];
			readonly name: "ERC20InvalidApprover";
			readonly type: "error";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "address";
					readonly name: "receiver";
					readonly type: "address";
				}
			];
			readonly name: "ERC20InvalidReceiver";
			readonly type: "error";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "address";
					readonly name: "sender";
					readonly type: "address";
				}
			];
			readonly name: "ERC20InvalidSender";
			readonly type: "error";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "address";
					readonly name: "spender";
					readonly type: "address";
				}
			];
			readonly name: "ERC20InvalidSpender";
			readonly type: "error";
		},
		{
			readonly anonymous: false;
			readonly inputs: readonly [
				{
					readonly indexed: true;
					readonly internalType: "address";
					readonly name: "owner";
					readonly type: "address";
				},
				{
					readonly indexed: true;
					readonly internalType: "address";
					readonly name: "spender";
					readonly type: "address";
				},
				{
					readonly indexed: false;
					readonly internalType: "uint256";
					readonly name: "value";
					readonly type: "uint256";
				}
			];
			readonly name: "Approval";
			readonly type: "event";
		},
		{
			readonly anonymous: false;
			readonly inputs: readonly [
				{
					readonly indexed: true;
					readonly internalType: "address";
					readonly name: "from";
					readonly type: "address";
				},
				{
					readonly indexed: true;
					readonly internalType: "address";
					readonly name: "to";
					readonly type: "address";
				},
				{
					readonly indexed: false;
					readonly internalType: "uint256";
					readonly name: "value";
					readonly type: "uint256";
				}
			];
			readonly name: "Transfer";
			readonly type: "event";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "address";
					readonly name: "owner";
					readonly type: "address";
				},
				{
					readonly internalType: "address";
					readonly name: "spender";
					readonly type: "address";
				}
			];
			readonly name: "allowance";
			readonly outputs: readonly [
				{
					readonly internalType: "uint256";
					readonly name: "";
					readonly type: "uint256";
				}
			];
			readonly stateMutability: "view";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "address";
					readonly name: "spender";
					readonly type: "address";
				},
				{
					readonly internalType: "uint256";
					readonly name: "value";
					readonly type: "uint256";
				}
			];
			readonly name: "approve";
			readonly outputs: readonly [
				{
					readonly internalType: "bool";
					readonly name: "";
					readonly type: "bool";
				}
			];
			readonly stateMutability: "nonpayable";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "address";
					readonly name: "account";
					readonly type: "address";
				}
			];
			readonly name: "balanceOf";
			readonly outputs: readonly [
				{
					readonly internalType: "uint256";
					readonly name: "";
					readonly type: "uint256";
				}
			];
			readonly stateMutability: "view";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
			];
			readonly name: "decimals";
			readonly outputs: readonly [
				{
					readonly internalType: "uint8";
					readonly name: "";
					readonly type: "uint8";
				}
			];
			readonly stateMutability: "view";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
			];
			readonly name: "name";
			readonly outputs: readonly [
				{
					readonly internalType: "string";
					readonly name: "";
					readonly type: "string";
				}
			];
			readonly stateMutability: "view";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
			];
			readonly name: "symbol";
			readonly outputs: readonly [
				{
					readonly internalType: "string";
					readonly name: "";
					readonly type: "string";
				}
			];
			readonly stateMutability: "view";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
			];
			readonly name: "totalSupply";
			readonly outputs: readonly [
				{
					readonly internalType: "uint256";
					readonly name: "";
					readonly type: "uint256";
				}
			];
			readonly stateMutability: "view";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "address";
					readonly name: "to";
					readonly type: "address";
				},
				{
					readonly internalType: "uint256";
					readonly name: "value";
					readonly type: "uint256";
				}
			];
			readonly name: "transfer";
			readonly outputs: readonly [
				{
					readonly internalType: "bool";
					readonly name: "";
					readonly type: "bool";
				}
			];
			readonly stateMutability: "nonpayable";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "address";
					readonly name: "from";
					readonly type: "address";
				},
				{
					readonly internalType: "address";
					readonly name: "to";
					readonly type: "address";
				},
				{
					readonly internalType: "uint256";
					readonly name: "value";
					readonly type: "uint256";
				}
			];
			readonly name: "transferFrom";
			readonly outputs: readonly [
				{
					readonly internalType: "bool";
					readonly name: "";
					readonly type: "bool";
				}
			];
			readonly stateMutability: "nonpayable";
			readonly type: "function";
		}
	];
	static createInterface(): ERC20Interface;
	static connect(address: string, runner?: ContractRunner | null): ERC20;
}
export declare class IERC20__factory {
	static readonly abi: readonly [
		{
			readonly anonymous: false;
			readonly inputs: readonly [
				{
					readonly indexed: true;
					readonly internalType: "address";
					readonly name: "owner";
					readonly type: "address";
				},
				{
					readonly indexed: true;
					readonly internalType: "address";
					readonly name: "spender";
					readonly type: "address";
				},
				{
					readonly indexed: false;
					readonly internalType: "uint256";
					readonly name: "value";
					readonly type: "uint256";
				}
			];
			readonly name: "Approval";
			readonly type: "event";
		},
		{
			readonly anonymous: false;
			readonly inputs: readonly [
				{
					readonly indexed: true;
					readonly internalType: "address";
					readonly name: "from";
					readonly type: "address";
				},
				{
					readonly indexed: true;
					readonly internalType: "address";
					readonly name: "to";
					readonly type: "address";
				},
				{
					readonly indexed: false;
					readonly internalType: "uint256";
					readonly name: "value";
					readonly type: "uint256";
				}
			];
			readonly name: "Transfer";
			readonly type: "event";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "address";
					readonly name: "owner";
					readonly type: "address";
				},
				{
					readonly internalType: "address";
					readonly name: "spender";
					readonly type: "address";
				}
			];
			readonly name: "allowance";
			readonly outputs: readonly [
				{
					readonly internalType: "uint256";
					readonly name: "";
					readonly type: "uint256";
				}
			];
			readonly stateMutability: "view";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "address";
					readonly name: "spender";
					readonly type: "address";
				},
				{
					readonly internalType: "uint256";
					readonly name: "value";
					readonly type: "uint256";
				}
			];
			readonly name: "approve";
			readonly outputs: readonly [
				{
					readonly internalType: "bool";
					readonly name: "";
					readonly type: "bool";
				}
			];
			readonly stateMutability: "nonpayable";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "address";
					readonly name: "account";
					readonly type: "address";
				}
			];
			readonly name: "balanceOf";
			readonly outputs: readonly [
				{
					readonly internalType: "uint256";
					readonly name: "";
					readonly type: "uint256";
				}
			];
			readonly stateMutability: "view";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
			];
			readonly name: "totalSupply";
			readonly outputs: readonly [
				{
					readonly internalType: "uint256";
					readonly name: "";
					readonly type: "uint256";
				}
			];
			readonly stateMutability: "view";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "address";
					readonly name: "to";
					readonly type: "address";
				},
				{
					readonly internalType: "uint256";
					readonly name: "value";
					readonly type: "uint256";
				}
			];
			readonly name: "transfer";
			readonly outputs: readonly [
				{
					readonly internalType: "bool";
					readonly name: "";
					readonly type: "bool";
				}
			];
			readonly stateMutability: "nonpayable";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "address";
					readonly name: "from";
					readonly type: "address";
				},
				{
					readonly internalType: "address";
					readonly name: "to";
					readonly type: "address";
				},
				{
					readonly internalType: "uint256";
					readonly name: "value";
					readonly type: "uint256";
				}
			];
			readonly name: "transferFrom";
			readonly outputs: readonly [
				{
					readonly internalType: "bool";
					readonly name: "";
					readonly type: "bool";
				}
			];
			readonly stateMutability: "nonpayable";
			readonly type: "function";
		}
	];
	static createInterface(): IERC20Interface;
	static connect(address: string, runner?: ContractRunner | null): IERC20;
}
export declare class ERC20Burnable__factory {
	static readonly abi: readonly [
		{
			readonly inputs: readonly [
				{
					readonly internalType: "address";
					readonly name: "spender";
					readonly type: "address";
				},
				{
					readonly internalType: "uint256";
					readonly name: "allowance";
					readonly type: "uint256";
				},
				{
					readonly internalType: "uint256";
					readonly name: "needed";
					readonly type: "uint256";
				}
			];
			readonly name: "ERC20InsufficientAllowance";
			readonly type: "error";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "address";
					readonly name: "sender";
					readonly type: "address";
				},
				{
					readonly internalType: "uint256";
					readonly name: "balance";
					readonly type: "uint256";
				},
				{
					readonly internalType: "uint256";
					readonly name: "needed";
					readonly type: "uint256";
				}
			];
			readonly name: "ERC20InsufficientBalance";
			readonly type: "error";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "address";
					readonly name: "approver";
					readonly type: "address";
				}
			];
			readonly name: "ERC20InvalidApprover";
			readonly type: "error";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "address";
					readonly name: "receiver";
					readonly type: "address";
				}
			];
			readonly name: "ERC20InvalidReceiver";
			readonly type: "error";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "address";
					readonly name: "sender";
					readonly type: "address";
				}
			];
			readonly name: "ERC20InvalidSender";
			readonly type: "error";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "address";
					readonly name: "spender";
					readonly type: "address";
				}
			];
			readonly name: "ERC20InvalidSpender";
			readonly type: "error";
		},
		{
			readonly anonymous: false;
			readonly inputs: readonly [
				{
					readonly indexed: true;
					readonly internalType: "address";
					readonly name: "owner";
					readonly type: "address";
				},
				{
					readonly indexed: true;
					readonly internalType: "address";
					readonly name: "spender";
					readonly type: "address";
				},
				{
					readonly indexed: false;
					readonly internalType: "uint256";
					readonly name: "value";
					readonly type: "uint256";
				}
			];
			readonly name: "Approval";
			readonly type: "event";
		},
		{
			readonly anonymous: false;
			readonly inputs: readonly [
				{
					readonly indexed: true;
					readonly internalType: "address";
					readonly name: "from";
					readonly type: "address";
				},
				{
					readonly indexed: true;
					readonly internalType: "address";
					readonly name: "to";
					readonly type: "address";
				},
				{
					readonly indexed: false;
					readonly internalType: "uint256";
					readonly name: "value";
					readonly type: "uint256";
				}
			];
			readonly name: "Transfer";
			readonly type: "event";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "address";
					readonly name: "owner";
					readonly type: "address";
				},
				{
					readonly internalType: "address";
					readonly name: "spender";
					readonly type: "address";
				}
			];
			readonly name: "allowance";
			readonly outputs: readonly [
				{
					readonly internalType: "uint256";
					readonly name: "";
					readonly type: "uint256";
				}
			];
			readonly stateMutability: "view";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "address";
					readonly name: "spender";
					readonly type: "address";
				},
				{
					readonly internalType: "uint256";
					readonly name: "value";
					readonly type: "uint256";
				}
			];
			readonly name: "approve";
			readonly outputs: readonly [
				{
					readonly internalType: "bool";
					readonly name: "";
					readonly type: "bool";
				}
			];
			readonly stateMutability: "nonpayable";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "address";
					readonly name: "account";
					readonly type: "address";
				}
			];
			readonly name: "balanceOf";
			readonly outputs: readonly [
				{
					readonly internalType: "uint256";
					readonly name: "";
					readonly type: "uint256";
				}
			];
			readonly stateMutability: "view";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "uint256";
					readonly name: "value";
					readonly type: "uint256";
				}
			];
			readonly name: "burn";
			readonly outputs: readonly [
			];
			readonly stateMutability: "nonpayable";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "address";
					readonly name: "account";
					readonly type: "address";
				},
				{
					readonly internalType: "uint256";
					readonly name: "value";
					readonly type: "uint256";
				}
			];
			readonly name: "burnFrom";
			readonly outputs: readonly [
			];
			readonly stateMutability: "nonpayable";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
			];
			readonly name: "decimals";
			readonly outputs: readonly [
				{
					readonly internalType: "uint8";
					readonly name: "";
					readonly type: "uint8";
				}
			];
			readonly stateMutability: "view";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
			];
			readonly name: "name";
			readonly outputs: readonly [
				{
					readonly internalType: "string";
					readonly name: "";
					readonly type: "string";
				}
			];
			readonly stateMutability: "view";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
			];
			readonly name: "symbol";
			readonly outputs: readonly [
				{
					readonly internalType: "string";
					readonly name: "";
					readonly type: "string";
				}
			];
			readonly stateMutability: "view";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
			];
			readonly name: "totalSupply";
			readonly outputs: readonly [
				{
					readonly internalType: "uint256";
					readonly name: "";
					readonly type: "uint256";
				}
			];
			readonly stateMutability: "view";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "address";
					readonly name: "to";
					readonly type: "address";
				},
				{
					readonly internalType: "uint256";
					readonly name: "value";
					readonly type: "uint256";
				}
			];
			readonly name: "transfer";
			readonly outputs: readonly [
				{
					readonly internalType: "bool";
					readonly name: "";
					readonly type: "bool";
				}
			];
			readonly stateMutability: "nonpayable";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "address";
					readonly name: "from";
					readonly type: "address";
				},
				{
					readonly internalType: "address";
					readonly name: "to";
					readonly type: "address";
				},
				{
					readonly internalType: "uint256";
					readonly name: "value";
					readonly type: "uint256";
				}
			];
			readonly name: "transferFrom";
			readonly outputs: readonly [
				{
					readonly internalType: "bool";
					readonly name: "";
					readonly type: "bool";
				}
			];
			readonly stateMutability: "nonpayable";
			readonly type: "function";
		}
	];
	static createInterface(): ERC20BurnableInterface;
	static connect(address: string, runner?: ContractRunner | null): ERC20Burnable;
}
export declare class ERC20Permit__factory {
	static readonly abi: readonly [
		{
			readonly inputs: readonly [
			];
			readonly name: "ECDSAInvalidSignature";
			readonly type: "error";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "uint256";
					readonly name: "length";
					readonly type: "uint256";
				}
			];
			readonly name: "ECDSAInvalidSignatureLength";
			readonly type: "error";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "bytes32";
					readonly name: "s";
					readonly type: "bytes32";
				}
			];
			readonly name: "ECDSAInvalidSignatureS";
			readonly type: "error";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "address";
					readonly name: "spender";
					readonly type: "address";
				},
				{
					readonly internalType: "uint256";
					readonly name: "allowance";
					readonly type: "uint256";
				},
				{
					readonly internalType: "uint256";
					readonly name: "needed";
					readonly type: "uint256";
				}
			];
			readonly name: "ERC20InsufficientAllowance";
			readonly type: "error";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "address";
					readonly name: "sender";
					readonly type: "address";
				},
				{
					readonly internalType: "uint256";
					readonly name: "balance";
					readonly type: "uint256";
				},
				{
					readonly internalType: "uint256";
					readonly name: "needed";
					readonly type: "uint256";
				}
			];
			readonly name: "ERC20InsufficientBalance";
			readonly type: "error";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "address";
					readonly name: "approver";
					readonly type: "address";
				}
			];
			readonly name: "ERC20InvalidApprover";
			readonly type: "error";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "address";
					readonly name: "receiver";
					readonly type: "address";
				}
			];
			readonly name: "ERC20InvalidReceiver";
			readonly type: "error";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "address";
					readonly name: "sender";
					readonly type: "address";
				}
			];
			readonly name: "ERC20InvalidSender";
			readonly type: "error";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "address";
					readonly name: "spender";
					readonly type: "address";
				}
			];
			readonly name: "ERC20InvalidSpender";
			readonly type: "error";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "uint256";
					readonly name: "deadline";
					readonly type: "uint256";
				}
			];
			readonly name: "ERC2612ExpiredSignature";
			readonly type: "error";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "address";
					readonly name: "signer";
					readonly type: "address";
				},
				{
					readonly internalType: "address";
					readonly name: "owner";
					readonly type: "address";
				}
			];
			readonly name: "ERC2612InvalidSigner";
			readonly type: "error";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "address";
					readonly name: "account";
					readonly type: "address";
				},
				{
					readonly internalType: "uint256";
					readonly name: "currentNonce";
					readonly type: "uint256";
				}
			];
			readonly name: "InvalidAccountNonce";
			readonly type: "error";
		},
		{
			readonly inputs: readonly [
			];
			readonly name: "InvalidShortString";
			readonly type: "error";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "string";
					readonly name: "str";
					readonly type: "string";
				}
			];
			readonly name: "StringTooLong";
			readonly type: "error";
		},
		{
			readonly anonymous: false;
			readonly inputs: readonly [
				{
					readonly indexed: true;
					readonly internalType: "address";
					readonly name: "owner";
					readonly type: "address";
				},
				{
					readonly indexed: true;
					readonly internalType: "address";
					readonly name: "spender";
					readonly type: "address";
				},
				{
					readonly indexed: false;
					readonly internalType: "uint256";
					readonly name: "value";
					readonly type: "uint256";
				}
			];
			readonly name: "Approval";
			readonly type: "event";
		},
		{
			readonly anonymous: false;
			readonly inputs: readonly [
			];
			readonly name: "EIP712DomainChanged";
			readonly type: "event";
		},
		{
			readonly anonymous: false;
			readonly inputs: readonly [
				{
					readonly indexed: true;
					readonly internalType: "address";
					readonly name: "from";
					readonly type: "address";
				},
				{
					readonly indexed: true;
					readonly internalType: "address";
					readonly name: "to";
					readonly type: "address";
				},
				{
					readonly indexed: false;
					readonly internalType: "uint256";
					readonly name: "value";
					readonly type: "uint256";
				}
			];
			readonly name: "Transfer";
			readonly type: "event";
		},
		{
			readonly inputs: readonly [
			];
			readonly name: "DOMAIN_SEPARATOR";
			readonly outputs: readonly [
				{
					readonly internalType: "bytes32";
					readonly name: "";
					readonly type: "bytes32";
				}
			];
			readonly stateMutability: "view";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "address";
					readonly name: "owner";
					readonly type: "address";
				},
				{
					readonly internalType: "address";
					readonly name: "spender";
					readonly type: "address";
				}
			];
			readonly name: "allowance";
			readonly outputs: readonly [
				{
					readonly internalType: "uint256";
					readonly name: "";
					readonly type: "uint256";
				}
			];
			readonly stateMutability: "view";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "address";
					readonly name: "spender";
					readonly type: "address";
				},
				{
					readonly internalType: "uint256";
					readonly name: "value";
					readonly type: "uint256";
				}
			];
			readonly name: "approve";
			readonly outputs: readonly [
				{
					readonly internalType: "bool";
					readonly name: "";
					readonly type: "bool";
				}
			];
			readonly stateMutability: "nonpayable";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "address";
					readonly name: "account";
					readonly type: "address";
				}
			];
			readonly name: "balanceOf";
			readonly outputs: readonly [
				{
					readonly internalType: "uint256";
					readonly name: "";
					readonly type: "uint256";
				}
			];
			readonly stateMutability: "view";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
			];
			readonly name: "decimals";
			readonly outputs: readonly [
				{
					readonly internalType: "uint8";
					readonly name: "";
					readonly type: "uint8";
				}
			];
			readonly stateMutability: "view";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
			];
			readonly name: "eip712Domain";
			readonly outputs: readonly [
				{
					readonly internalType: "bytes1";
					readonly name: "fields";
					readonly type: "bytes1";
				},
				{
					readonly internalType: "string";
					readonly name: "name";
					readonly type: "string";
				},
				{
					readonly internalType: "string";
					readonly name: "version";
					readonly type: "string";
				},
				{
					readonly internalType: "uint256";
					readonly name: "chainId";
					readonly type: "uint256";
				},
				{
					readonly internalType: "address";
					readonly name: "verifyingContract";
					readonly type: "address";
				},
				{
					readonly internalType: "bytes32";
					readonly name: "salt";
					readonly type: "bytes32";
				},
				{
					readonly internalType: "uint256[]";
					readonly name: "extensions";
					readonly type: "uint256[]";
				}
			];
			readonly stateMutability: "view";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
			];
			readonly name: "name";
			readonly outputs: readonly [
				{
					readonly internalType: "string";
					readonly name: "";
					readonly type: "string";
				}
			];
			readonly stateMutability: "view";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "address";
					readonly name: "owner";
					readonly type: "address";
				}
			];
			readonly name: "nonces";
			readonly outputs: readonly [
				{
					readonly internalType: "uint256";
					readonly name: "";
					readonly type: "uint256";
				}
			];
			readonly stateMutability: "view";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "address";
					readonly name: "owner";
					readonly type: "address";
				},
				{
					readonly internalType: "address";
					readonly name: "spender";
					readonly type: "address";
				},
				{
					readonly internalType: "uint256";
					readonly name: "value";
					readonly type: "uint256";
				},
				{
					readonly internalType: "uint256";
					readonly name: "deadline";
					readonly type: "uint256";
				},
				{
					readonly internalType: "uint8";
					readonly name: "v";
					readonly type: "uint8";
				},
				{
					readonly internalType: "bytes32";
					readonly name: "r";
					readonly type: "bytes32";
				},
				{
					readonly internalType: "bytes32";
					readonly name: "s";
					readonly type: "bytes32";
				}
			];
			readonly name: "permit";
			readonly outputs: readonly [
			];
			readonly stateMutability: "nonpayable";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
			];
			readonly name: "symbol";
			readonly outputs: readonly [
				{
					readonly internalType: "string";
					readonly name: "";
					readonly type: "string";
				}
			];
			readonly stateMutability: "view";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
			];
			readonly name: "totalSupply";
			readonly outputs: readonly [
				{
					readonly internalType: "uint256";
					readonly name: "";
					readonly type: "uint256";
				}
			];
			readonly stateMutability: "view";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "address";
					readonly name: "to";
					readonly type: "address";
				},
				{
					readonly internalType: "uint256";
					readonly name: "value";
					readonly type: "uint256";
				}
			];
			readonly name: "transfer";
			readonly outputs: readonly [
				{
					readonly internalType: "bool";
					readonly name: "";
					readonly type: "bool";
				}
			];
			readonly stateMutability: "nonpayable";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "address";
					readonly name: "from";
					readonly type: "address";
				},
				{
					readonly internalType: "address";
					readonly name: "to";
					readonly type: "address";
				},
				{
					readonly internalType: "uint256";
					readonly name: "value";
					readonly type: "uint256";
				}
			];
			readonly name: "transferFrom";
			readonly outputs: readonly [
				{
					readonly internalType: "bool";
					readonly name: "";
					readonly type: "bool";
				}
			];
			readonly stateMutability: "nonpayable";
			readonly type: "function";
		}
	];
	static createInterface(): ERC20PermitInterface;
	static connect(address: string, runner?: ContractRunner | null): ERC20Permit;
}
export declare class IERC20Metadata__factory {
	static readonly abi: readonly [
		{
			readonly anonymous: false;
			readonly inputs: readonly [
				{
					readonly indexed: true;
					readonly internalType: "address";
					readonly name: "owner";
					readonly type: "address";
				},
				{
					readonly indexed: true;
					readonly internalType: "address";
					readonly name: "spender";
					readonly type: "address";
				},
				{
					readonly indexed: false;
					readonly internalType: "uint256";
					readonly name: "value";
					readonly type: "uint256";
				}
			];
			readonly name: "Approval";
			readonly type: "event";
		},
		{
			readonly anonymous: false;
			readonly inputs: readonly [
				{
					readonly indexed: true;
					readonly internalType: "address";
					readonly name: "from";
					readonly type: "address";
				},
				{
					readonly indexed: true;
					readonly internalType: "address";
					readonly name: "to";
					readonly type: "address";
				},
				{
					readonly indexed: false;
					readonly internalType: "uint256";
					readonly name: "value";
					readonly type: "uint256";
				}
			];
			readonly name: "Transfer";
			readonly type: "event";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "address";
					readonly name: "owner";
					readonly type: "address";
				},
				{
					readonly internalType: "address";
					readonly name: "spender";
					readonly type: "address";
				}
			];
			readonly name: "allowance";
			readonly outputs: readonly [
				{
					readonly internalType: "uint256";
					readonly name: "";
					readonly type: "uint256";
				}
			];
			readonly stateMutability: "view";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "address";
					readonly name: "spender";
					readonly type: "address";
				},
				{
					readonly internalType: "uint256";
					readonly name: "value";
					readonly type: "uint256";
				}
			];
			readonly name: "approve";
			readonly outputs: readonly [
				{
					readonly internalType: "bool";
					readonly name: "";
					readonly type: "bool";
				}
			];
			readonly stateMutability: "nonpayable";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "address";
					readonly name: "account";
					readonly type: "address";
				}
			];
			readonly name: "balanceOf";
			readonly outputs: readonly [
				{
					readonly internalType: "uint256";
					readonly name: "";
					readonly type: "uint256";
				}
			];
			readonly stateMutability: "view";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
			];
			readonly name: "decimals";
			readonly outputs: readonly [
				{
					readonly internalType: "uint8";
					readonly name: "";
					readonly type: "uint8";
				}
			];
			readonly stateMutability: "view";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
			];
			readonly name: "name";
			readonly outputs: readonly [
				{
					readonly internalType: "string";
					readonly name: "";
					readonly type: "string";
				}
			];
			readonly stateMutability: "view";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
			];
			readonly name: "symbol";
			readonly outputs: readonly [
				{
					readonly internalType: "string";
					readonly name: "";
					readonly type: "string";
				}
			];
			readonly stateMutability: "view";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
			];
			readonly name: "totalSupply";
			readonly outputs: readonly [
				{
					readonly internalType: "uint256";
					readonly name: "";
					readonly type: "uint256";
				}
			];
			readonly stateMutability: "view";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "address";
					readonly name: "to";
					readonly type: "address";
				},
				{
					readonly internalType: "uint256";
					readonly name: "value";
					readonly type: "uint256";
				}
			];
			readonly name: "transfer";
			readonly outputs: readonly [
				{
					readonly internalType: "bool";
					readonly name: "";
					readonly type: "bool";
				}
			];
			readonly stateMutability: "nonpayable";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "address";
					readonly name: "from";
					readonly type: "address";
				},
				{
					readonly internalType: "address";
					readonly name: "to";
					readonly type: "address";
				},
				{
					readonly internalType: "uint256";
					readonly name: "value";
					readonly type: "uint256";
				}
			];
			readonly name: "transferFrom";
			readonly outputs: readonly [
				{
					readonly internalType: "bool";
					readonly name: "";
					readonly type: "bool";
				}
			];
			readonly stateMutability: "nonpayable";
			readonly type: "function";
		}
	];
	static createInterface(): IERC20MetadataInterface;
	static connect(address: string, runner?: ContractRunner | null): IERC20Metadata;
}
export declare class IERC20Permit__factory {
	static readonly abi: readonly [
		{
			readonly inputs: readonly [
			];
			readonly name: "DOMAIN_SEPARATOR";
			readonly outputs: readonly [
				{
					readonly internalType: "bytes32";
					readonly name: "";
					readonly type: "bytes32";
				}
			];
			readonly stateMutability: "view";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "address";
					readonly name: "owner";
					readonly type: "address";
				}
			];
			readonly name: "nonces";
			readonly outputs: readonly [
				{
					readonly internalType: "uint256";
					readonly name: "";
					readonly type: "uint256";
				}
			];
			readonly stateMutability: "view";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "address";
					readonly name: "owner";
					readonly type: "address";
				},
				{
					readonly internalType: "address";
					readonly name: "spender";
					readonly type: "address";
				},
				{
					readonly internalType: "uint256";
					readonly name: "value";
					readonly type: "uint256";
				},
				{
					readonly internalType: "uint256";
					readonly name: "deadline";
					readonly type: "uint256";
				},
				{
					readonly internalType: "uint8";
					readonly name: "v";
					readonly type: "uint8";
				},
				{
					readonly internalType: "bytes32";
					readonly name: "r";
					readonly type: "bytes32";
				},
				{
					readonly internalType: "bytes32";
					readonly name: "s";
					readonly type: "bytes32";
				}
			];
			readonly name: "permit";
			readonly outputs: readonly [
			];
			readonly stateMutability: "nonpayable";
			readonly type: "function";
		}
	];
	static createInterface(): IERC20PermitInterface;
	static connect(address: string, runner?: ContractRunner | null): IERC20Permit;
}
export type SafeERC20ConstructorParams = [
	signer?: Signer
] | ConstructorParameters<typeof ContractFactory>;
export declare class SafeERC20__factory extends ContractFactory {
	constructor(...args: SafeERC20ConstructorParams);
	getDeployTransaction(overrides?: NonPayableOverrides & {
		from?: string;
	}): Promise<ContractDeployTransaction>;
	deploy(overrides?: NonPayableOverrides & {
		from?: string;
	}): Promise<SafeERC20 & {
		deploymentTransaction(): ContractTransactionResponse;
	}>;
	connect(runner: ContractRunner | null): SafeERC20__factory;
	static readonly bytecode = "0x60566037600b82828239805160001a607314602a57634e487b7160e01b600052600060045260246000fd5b30600052607381538281f3fe73000000000000000000000000000000000000000030146080604052600080fdfea2646970667358221220e709be9238eded8c5ce30132794d91665a511fb09147507d7f8c19ae6ef6505e64736f6c634300081e0033";
	static readonly abi: readonly [
		{
			readonly inputs: readonly [
				{
					readonly internalType: "address";
					readonly name: "spender";
					readonly type: "address";
				},
				{
					readonly internalType: "uint256";
					readonly name: "currentAllowance";
					readonly type: "uint256";
				},
				{
					readonly internalType: "uint256";
					readonly name: "requestedDecrease";
					readonly type: "uint256";
				}
			];
			readonly name: "SafeERC20FailedDecreaseAllowance";
			readonly type: "error";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "address";
					readonly name: "token";
					readonly type: "address";
				}
			];
			readonly name: "SafeERC20FailedOperation";
			readonly type: "error";
		}
	];
	static createInterface(): SafeERC20Interface;
	static connect(address: string, runner?: ContractRunner | null): SafeERC20;
}
export type AddressConstructorParams = [
	signer?: Signer
] | ConstructorParameters<typeof ContractFactory>;
export declare class Address__factory extends ContractFactory {
	constructor(...args: AddressConstructorParams);
	getDeployTransaction(overrides?: NonPayableOverrides & {
		from?: string;
	}): Promise<ContractDeployTransaction>;
	deploy(overrides?: NonPayableOverrides & {
		from?: string;
	}): Promise<Address & {
		deploymentTransaction(): ContractTransactionResponse;
	}>;
	connect(runner: ContractRunner | null): Address__factory;
	static readonly bytecode = "0x60566037600b82828239805160001a607314602a57634e487b7160e01b600052600060045260246000fd5b30600052607381538281f3fe73000000000000000000000000000000000000000030146080604052600080fdfea26469706673582212206de8b6da1f7e1361f3e61a0d1791ee4faa460ea45f2bb4b1232be4410a7a08fa64736f6c634300081e0033";
	static readonly abi: readonly [
		{
			readonly inputs: readonly [
				{
					readonly internalType: "address";
					readonly name: "target";
					readonly type: "address";
				}
			];
			readonly name: "AddressEmptyCode";
			readonly type: "error";
		}
	];
	static createInterface(): AddressInterface;
	static connect(address: string, runner?: ContractRunner | null): Address;
}
export type ErrorsConstructorParams = [
	signer?: Signer
] | ConstructorParameters<typeof ContractFactory>;
export declare class Errors__factory extends ContractFactory {
	constructor(...args: ErrorsConstructorParams);
	getDeployTransaction(overrides?: NonPayableOverrides & {
		from?: string;
	}): Promise<ContractDeployTransaction>;
	deploy(overrides?: NonPayableOverrides & {
		from?: string;
	}): Promise<Errors & {
		deploymentTransaction(): ContractTransactionResponse;
	}>;
	connect(runner: ContractRunner | null): Errors__factory;
	static readonly bytecode = "0x60566037600b82828239805160001a607314602a57634e487b7160e01b600052600060045260246000fd5b30600052607381538281f3fe73000000000000000000000000000000000000000030146080604052600080fdfea26469706673582212201e25921bb3bb33c02f503ebc76a3e2d0809c19bc2515b63a154c18598b05a8f664736f6c634300081e0033";
	static readonly abi: readonly [
		{
			readonly inputs: readonly [
			];
			readonly name: "FailedCall";
			readonly type: "error";
		},
		{
			readonly inputs: readonly [
			];
			readonly name: "FailedDeployment";
			readonly type: "error";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "uint256";
					readonly name: "balance";
					readonly type: "uint256";
				},
				{
					readonly internalType: "uint256";
					readonly name: "needed";
					readonly type: "uint256";
				}
			];
			readonly name: "InsufficientBalance";
			readonly type: "error";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "address";
					readonly name: "";
					readonly type: "address";
				}
			];
			readonly name: "MissingPrecompile";
			readonly type: "error";
		}
	];
	static createInterface(): ErrorsInterface;
	static connect(address: string, runner?: ContractRunner | null): Errors;
}
export declare class Nonces__factory {
	static readonly abi: readonly [
		{
			readonly inputs: readonly [
				{
					readonly internalType: "address";
					readonly name: "account";
					readonly type: "address";
				},
				{
					readonly internalType: "uint256";
					readonly name: "currentNonce";
					readonly type: "uint256";
				}
			];
			readonly name: "InvalidAccountNonce";
			readonly type: "error";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "address";
					readonly name: "owner";
					readonly type: "address";
				}
			];
			readonly name: "nonces";
			readonly outputs: readonly [
				{
					readonly internalType: "uint256";
					readonly name: "";
					readonly type: "uint256";
				}
			];
			readonly stateMutability: "view";
			readonly type: "function";
		}
	];
	static createInterface(): NoncesInterface;
	static connect(address: string, runner?: ContractRunner | null): Nonces;
}
export type ShortStringsConstructorParams = [
	signer?: Signer
] | ConstructorParameters<typeof ContractFactory>;
export declare class ShortStrings__factory extends ContractFactory {
	constructor(...args: ShortStringsConstructorParams);
	getDeployTransaction(overrides?: NonPayableOverrides & {
		from?: string;
	}): Promise<ContractDeployTransaction>;
	deploy(overrides?: NonPayableOverrides & {
		from?: string;
	}): Promise<ShortStrings & {
		deploymentTransaction(): ContractTransactionResponse;
	}>;
	connect(runner: ContractRunner | null): ShortStrings__factory;
	static readonly bytecode = "0x60566037600b82828239805160001a607314602a57634e487b7160e01b600052600060045260246000fd5b30600052607381538281f3fe73000000000000000000000000000000000000000030146080604052600080fdfea26469706673582212201021e5bd6290c490792798a5d7780b2eb00b28234ab94a5f1cd3ed1b6c522cac64736f6c634300081e0033";
	static readonly abi: readonly [
		{
			readonly inputs: readonly [
			];
			readonly name: "InvalidShortString";
			readonly type: "error";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "string";
					readonly name: "str";
					readonly type: "string";
				}
			];
			readonly name: "StringTooLong";
			readonly type: "error";
		}
	];
	static createInterface(): ShortStringsInterface;
	static connect(address: string, runner?: ContractRunner | null): ShortStrings;
}
export type StringsConstructorParams = [
	signer?: Signer
] | ConstructorParameters<typeof ContractFactory>;
export declare class Strings__factory extends ContractFactory {
	constructor(...args: StringsConstructorParams);
	getDeployTransaction(overrides?: NonPayableOverrides & {
		from?: string;
	}): Promise<ContractDeployTransaction>;
	deploy(overrides?: NonPayableOverrides & {
		from?: string;
	}): Promise<Strings & {
		deploymentTransaction(): ContractTransactionResponse;
	}>;
	connect(runner: ContractRunner | null): Strings__factory;
	static readonly bytecode = "0x60566037600b82828239805160001a607314602a57634e487b7160e01b600052600060045260246000fd5b30600052607381538281f3fe73000000000000000000000000000000000000000030146080604052600080fdfea26469706673582212207a4658386d5cb676fc8cc05d1582db7eeab07718866a46fe4771cd9b580ef2f864736f6c634300081e0033";
	static readonly abi: readonly [
		{
			readonly inputs: readonly [
				{
					readonly internalType: "uint256";
					readonly name: "value";
					readonly type: "uint256";
				},
				{
					readonly internalType: "uint256";
					readonly name: "length";
					readonly type: "uint256";
				}
			];
			readonly name: "StringsInsufficientHexLength";
			readonly type: "error";
		},
		{
			readonly inputs: readonly [
			];
			readonly name: "StringsInvalidAddressFormat";
			readonly type: "error";
		},
		{
			readonly inputs: readonly [
			];
			readonly name: "StringsInvalidChar";
			readonly type: "error";
		}
	];
	static createInterface(): StringsInterface;
	static connect(address: string, runner?: ContractRunner | null): Strings;
}
export type ECDSAConstructorParams = [
	signer?: Signer
] | ConstructorParameters<typeof ContractFactory>;
export declare class ECDSA__factory extends ContractFactory {
	constructor(...args: ECDSAConstructorParams);
	getDeployTransaction(overrides?: NonPayableOverrides & {
		from?: string;
	}): Promise<ContractDeployTransaction>;
	deploy(overrides?: NonPayableOverrides & {
		from?: string;
	}): Promise<ECDSA & {
		deploymentTransaction(): ContractTransactionResponse;
	}>;
	connect(runner: ContractRunner | null): ECDSA__factory;
	static readonly bytecode = "0x60566037600b82828239805160001a607314602a57634e487b7160e01b600052600060045260246000fd5b30600052607381538281f3fe73000000000000000000000000000000000000000030146080604052600080fdfea2646970667358221220f1adc27ed30b57b4e3c6a01873376280f8171108123c0cd1ae6dda9ab1d9b1a864736f6c634300081e0033";
	static readonly abi: readonly [
		{
			readonly inputs: readonly [
			];
			readonly name: "ECDSAInvalidSignature";
			readonly type: "error";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "uint256";
					readonly name: "length";
					readonly type: "uint256";
				}
			];
			readonly name: "ECDSAInvalidSignatureLength";
			readonly type: "error";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "bytes32";
					readonly name: "s";
					readonly type: "bytes32";
				}
			];
			readonly name: "ECDSAInvalidSignatureS";
			readonly type: "error";
		}
	];
	static createInterface(): ECDSAInterface;
	static connect(address: string, runner?: ContractRunner | null): ECDSA;
}
export declare class EIP712__factory {
	static readonly abi: readonly [
		{
			readonly inputs: readonly [
			];
			readonly name: "InvalidShortString";
			readonly type: "error";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "string";
					readonly name: "str";
					readonly type: "string";
				}
			];
			readonly name: "StringTooLong";
			readonly type: "error";
		},
		{
			readonly anonymous: false;
			readonly inputs: readonly [
			];
			readonly name: "EIP712DomainChanged";
			readonly type: "event";
		},
		{
			readonly inputs: readonly [
			];
			readonly name: "eip712Domain";
			readonly outputs: readonly [
				{
					readonly internalType: "bytes1";
					readonly name: "fields";
					readonly type: "bytes1";
				},
				{
					readonly internalType: "string";
					readonly name: "name";
					readonly type: "string";
				},
				{
					readonly internalType: "string";
					readonly name: "version";
					readonly type: "string";
				},
				{
					readonly internalType: "uint256";
					readonly name: "chainId";
					readonly type: "uint256";
				},
				{
					readonly internalType: "address";
					readonly name: "verifyingContract";
					readonly type: "address";
				},
				{
					readonly internalType: "bytes32";
					readonly name: "salt";
					readonly type: "bytes32";
				},
				{
					readonly internalType: "uint256[]";
					readonly name: "extensions";
					readonly type: "uint256[]";
				}
			];
			readonly stateMutability: "view";
			readonly type: "function";
		}
	];
	static createInterface(): EIP712Interface;
	static connect(address: string, runner?: ContractRunner | null): EIP712;
}
export declare class IERC165__factory {
	static readonly abi: readonly [
		{
			readonly inputs: readonly [
				{
					readonly internalType: "bytes4";
					readonly name: "interfaceId";
					readonly type: "bytes4";
				}
			];
			readonly name: "supportsInterface";
			readonly outputs: readonly [
				{
					readonly internalType: "bool";
					readonly name: "";
					readonly type: "bool";
				}
			];
			readonly stateMutability: "view";
			readonly type: "function";
		}
	];
	static createInterface(): IERC165Interface;
	static connect(address: string, runner?: ContractRunner | null): IERC165;
}
export type SafeCastConstructorParams = [
	signer?: Signer
] | ConstructorParameters<typeof ContractFactory>;
export declare class SafeCast__factory extends ContractFactory {
	constructor(...args: SafeCastConstructorParams);
	getDeployTransaction(overrides?: NonPayableOverrides & {
		from?: string;
	}): Promise<ContractDeployTransaction>;
	deploy(overrides?: NonPayableOverrides & {
		from?: string;
	}): Promise<SafeCast & {
		deploymentTransaction(): ContractTransactionResponse;
	}>;
	connect(runner: ContractRunner | null): SafeCast__factory;
	static readonly bytecode = "0x60566037600b82828239805160001a607314602a57634e487b7160e01b600052600060045260246000fd5b30600052607381538281f3fe73000000000000000000000000000000000000000030146080604052600080fdfea2646970667358221220e38525ca395593e23413b273284deb502430764865341426f419c80a3cb3523664736f6c634300081e0033";
	static readonly abi: readonly [
		{
			readonly inputs: readonly [
				{
					readonly internalType: "uint8";
					readonly name: "bits";
					readonly type: "uint8";
				},
				{
					readonly internalType: "int256";
					readonly name: "value";
					readonly type: "int256";
				}
			];
			readonly name: "SafeCastOverflowedIntDowncast";
			readonly type: "error";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "int256";
					readonly name: "value";
					readonly type: "int256";
				}
			];
			readonly name: "SafeCastOverflowedIntToUint";
			readonly type: "error";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "uint8";
					readonly name: "bits";
					readonly type: "uint8";
				},
				{
					readonly internalType: "uint256";
					readonly name: "value";
					readonly type: "uint256";
				}
			];
			readonly name: "SafeCastOverflowedUintDowncast";
			readonly type: "error";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "uint256";
					readonly name: "value";
					readonly type: "uint256";
				}
			];
			readonly name: "SafeCastOverflowedUintToInt";
			readonly type: "error";
		}
	];
	static createInterface(): SafeCastInterface;
	static connect(address: string, runner?: ContractRunner | null): SafeCast;
}
export declare class OwnableUpgradeable__factory {
	static readonly abi: readonly [
		{
			readonly inputs: readonly [
			];
			readonly name: "InvalidInitialization";
			readonly type: "error";
		},
		{
			readonly inputs: readonly [
			];
			readonly name: "NotInitializing";
			readonly type: "error";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "address";
					readonly name: "owner";
					readonly type: "address";
				}
			];
			readonly name: "OwnableInvalidOwner";
			readonly type: "error";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "address";
					readonly name: "account";
					readonly type: "address";
				}
			];
			readonly name: "OwnableUnauthorizedAccount";
			readonly type: "error";
		},
		{
			readonly anonymous: false;
			readonly inputs: readonly [
				{
					readonly indexed: false;
					readonly internalType: "uint64";
					readonly name: "version";
					readonly type: "uint64";
				}
			];
			readonly name: "Initialized";
			readonly type: "event";
		},
		{
			readonly anonymous: false;
			readonly inputs: readonly [
				{
					readonly indexed: true;
					readonly internalType: "address";
					readonly name: "previousOwner";
					readonly type: "address";
				},
				{
					readonly indexed: true;
					readonly internalType: "address";
					readonly name: "newOwner";
					readonly type: "address";
				}
			];
			readonly name: "OwnershipTransferred";
			readonly type: "event";
		},
		{
			readonly inputs: readonly [
			];
			readonly name: "owner";
			readonly outputs: readonly [
				{
					readonly internalType: "address";
					readonly name: "";
					readonly type: "address";
				}
			];
			readonly stateMutability: "view";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
			];
			readonly name: "renounceOwnership";
			readonly outputs: readonly [
			];
			readonly stateMutability: "nonpayable";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "address";
					readonly name: "newOwner";
					readonly type: "address";
				}
			];
			readonly name: "transferOwnership";
			readonly outputs: readonly [
			];
			readonly stateMutability: "nonpayable";
			readonly type: "function";
		}
	];
	static createInterface(): OwnableUpgradeableInterface;
	static connect(address: string, runner?: ContractRunner | null): OwnableUpgradeable;
}
export declare class Initializable__factory {
	static readonly abi: readonly [
		{
			readonly inputs: readonly [
			];
			readonly name: "InvalidInitialization";
			readonly type: "error";
		},
		{
			readonly inputs: readonly [
			];
			readonly name: "NotInitializing";
			readonly type: "error";
		},
		{
			readonly anonymous: false;
			readonly inputs: readonly [
				{
					readonly indexed: false;
					readonly internalType: "uint64";
					readonly name: "version";
					readonly type: "uint64";
				}
			];
			readonly name: "Initialized";
			readonly type: "event";
		}
	];
	static createInterface(): InitializableInterface;
	static connect(address: string, runner?: ContractRunner | null): Initializable;
}
export declare class ContextUpgradeable__factory {
	static readonly abi: readonly [
		{
			readonly inputs: readonly [
			];
			readonly name: "InvalidInitialization";
			readonly type: "error";
		},
		{
			readonly inputs: readonly [
			];
			readonly name: "NotInitializing";
			readonly type: "error";
		},
		{
			readonly anonymous: false;
			readonly inputs: readonly [
				{
					readonly indexed: false;
					readonly internalType: "uint64";
					readonly name: "version";
					readonly type: "uint64";
				}
			];
			readonly name: "Initialized";
			readonly type: "event";
		}
	];
	static createInterface(): ContextUpgradeableInterface;
	static connect(address: string, runner?: ContractRunner | null): ContextUpgradeable;
}
export type LockConstructorParams = [
	signer?: Signer
] | ConstructorParameters<typeof ContractFactory>;
export declare class Lock__factory extends ContractFactory {
	constructor(...args: LockConstructorParams);
	getDeployTransaction(_unlockTime: BigNumberish, overrides?: PayableOverrides & {
		from?: string;
	}): Promise<ContractDeployTransaction>;
	deploy(_unlockTime: BigNumberish, overrides?: PayableOverrides & {
		from?: string;
	}): Promise<Lock$1 & {
		deploymentTransaction(): ContractTransactionResponse;
	}>;
	connect(runner: ContractRunner | null): Lock__factory;
	static readonly bytecode = "0x60806040526040516102a03803806102a08339810160408190526020916097565b804210607e5760405162461bcd60e51b815260206004820152602360248201527f556e6c6f636b2074696d652073686f756c6420626520696e207468652066757460448201526275726560e81b606482015260840160405180910390fd5b600055600180546001600160a01b0319163317905560af565b60006020828403121560a857600080fd5b5051919050565b6101e2806100be6000396000f3fe608060405234801561001057600080fd5b50600436106100415760003560e01c8063251c1aa3146100465780633ccfd60b146100625780638da5cb5b1461006c575b600080fd5b61004f60005481565b6040519081526020015b60405180910390f35b61006a610097565b005b60015461007f906001600160a01b031681565b6040516001600160a01b039091168152602001610059565b6000544210156100e75760405162461bcd60e51b8152602060048201526016602482015275165bdd4818d85b89dd081dda5d1a191c985dc81e595d60521b60448201526064015b60405180910390fd5b6001546001600160a01b031633146101385760405162461bcd60e51b81526020600482015260146024820152732cb7ba9030b932b713ba103a34329037bbb732b960611b60448201526064016100de565b604080514781524260208201527fbf2ed60bd5b5965d685680c01195c9514e4382e28e3a5a2d2d5244bf59411b93910160405180910390a16001546040516001600160a01b03909116904780156108fc02916000818181858888f193505050501580156101a9573d6000803e3d6000fd5b5056fea2646970667358221220a93f9750b41045a0886faa30e4f1ebf5ef528da2bc1728e8ff29afadc5ddf96c64736f6c634300081e0033";
	static readonly abi: readonly [
		{
			readonly inputs: readonly [
				{
					readonly internalType: "uint256";
					readonly name: "_unlockTime";
					readonly type: "uint256";
				}
			];
			readonly stateMutability: "payable";
			readonly type: "constructor";
		},
		{
			readonly anonymous: false;
			readonly inputs: readonly [
				{
					readonly indexed: false;
					readonly internalType: "uint256";
					readonly name: "amount";
					readonly type: "uint256";
				},
				{
					readonly indexed: false;
					readonly internalType: "uint256";
					readonly name: "when";
					readonly type: "uint256";
				}
			];
			readonly name: "Withdrawal";
			readonly type: "event";
		},
		{
			readonly inputs: readonly [
			];
			readonly name: "owner";
			readonly outputs: readonly [
				{
					readonly internalType: "address payable";
					readonly name: "";
					readonly type: "address";
				}
			];
			readonly stateMutability: "view";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
			];
			readonly name: "unlockTime";
			readonly outputs: readonly [
				{
					readonly internalType: "uint256";
					readonly name: "";
					readonly type: "uint256";
				}
			];
			readonly stateMutability: "view";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
			];
			readonly name: "withdraw";
			readonly outputs: readonly [
			];
			readonly stateMutability: "nonpayable";
			readonly type: "function";
		}
	];
	static createInterface(): LockInterface;
	static connect(address: string, runner?: ContractRunner | null): Lock$1;
}
export type ArbGatewayConstructorParams = [
	signer?: Signer
] | ConstructorParameters<typeof ContractFactory>;
export declare class ArbGateway__factory extends ContractFactory {
	constructor(...args: ArbGatewayConstructorParams);
	getDeployTransaction(overrides?: NonPayableOverrides & {
		from?: string;
	}): Promise<ContractDeployTransaction>;
	deploy(overrides?: NonPayableOverrides & {
		from?: string;
	}): Promise<ArbGateway & {
		deploymentTransaction(): ContractTransactionResponse;
	}>;
	connect(runner: ContractRunner | null): ArbGateway__factory;
	static readonly bytecode = "0x6080604052348015600f57600080fd5b50611e3b8061001f6000396000f3fe6080604052600436106100fe5760003560e01c8063b190be8511610095578063e3f30e7111610064578063e3f30e71146102a2578063eac96f23146102d8578063ebde1bdb146102f8578063f2fde38b14610318578063fb0e722b1461033857600080fd5b8063b190be851461020f578063b44db82e1461022f578063c358798014610242578063df36132b1461026257600080fd5b80638da5cb5b116100d15780638da5cb5b1461017357806390f7e1b3146101c4578063a51c8cb9146101e4578063affed0e0146101f957600080fd5b806348875bf51461010357806360e312a714610125578063715018a61461014b57806374378d3714610160575b600080fd5b34801561010f57600080fd5b5061012361011e3660046115d4565b610358565b005b610138610133366004611674565b6103d4565b6040519081526020015b60405180910390f35b34801561015757600080fd5b506101236106f9565b61012361016e36600461170a565b61070d565b34801561017f57600080fd5b507f9016d09d72d40fdae2fd8ceac6b6234c7706214fd39c1cd1e609a0528c199300546001600160a01b03165b6040516001600160a01b039091168152602001610142565b3480156101d057600080fd5b506001546101ac906001600160a01b031681565b3480156101f057600080fd5b506101ac606481565b34801561020557600080fd5b5061013860045481565b34801561021b57600080fd5b5061013861022a3660046117a8565b61078d565b61013861023d3660046117ea565b6107b8565b34801561024e57600080fd5b5061012361025d3660046118a7565b610873565b34801561026e57600080fd5b5061029261027d3660046118a7565b60036020526000908152604090205460ff1681565b6040519015158152602001610142565b3480156102ae57600080fd5b506101ac6102bd3660046118a7565b6002602052600090815260409020546001600160a01b031681565b3480156102e457600080fd5b506101236102f33660046118c4565b6109fc565b34801561030457600080fd5b506101236103133660046119e9565b610c14565b34801561032457600080fd5b506101236103333660046118a7565b610c7c565b34801561034457600080fd5b506000546101ac906001600160a01b031681565b3330146103985760405162461bcd60e51b815260206004820152600960248201526827a7262cafa9a2a62360b91b60448201526064015b60405180910390fd5b817f07ce1e2038f0bf86b874f8aa890353ddfe00ccba5e000ad4b713e9b2ce90fa72826040516103c89190611a72565b60405180910390a25050565b60006103eb6001600160a01b038916333089610cba565b6001600160a01b03881660009081526003602052604090205460ff161561046757604051630852cd8d60e31b8152600481018790526001600160a01b038916906342966c6890602401600060405180830381600087803b15801561044e57600080fd5b505af1158015610462573d6000803e3d6000fd5b505050505b6000600454905060006374378d3760e01b8a6001600160a01b031663313ce5676040518163ffffffff1660e01b8152600401602060405180830381865afa1580156104b6573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906104da9190611a85565b6001600160a01b03808d16600090815260026020526040908190205490516105149392919091169033908e908e908e908a90602401611aa2565b60408051601f198184030181529190526020810180516001600160e01b03166001600160e01b03199093169290921790915260008054919250906001600160a01b0316158061060b5760008054906101000a90046001600160a01b03166001600160a01b031663679b6ded34600160009054906101000a90046001600160a01b031660008c33338e8e8c6040518a63ffffffff1660e01b81526004016105c1989796959493929190611afa565b60206040518083038185885af11580156105df573d6000803e3d6000fd5b50505050506040513d601f19601f820116820180604052508101906106049190611b59565b9150610682565b6001546040516349460b4d60e11b815260649163928c169a9161063c916001600160a01b0316908790600401611b72565b6020604051808303816000875af115801561065b573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061067f9190611b59565b91505b6004805490600061069283611bac565b9190505550336001600160a01b03168c6001600160a01b0316857f9df4cc1e9776bb39b63370f1f8d003320ceeebe30547208fa83a07a3e984794b858f8f8f6040516106e19493929190611bc5565b60405180910390a450919a9950505050505050505050565b610701610d27565b61070b6000610d82565b565b6107748388886001600160a01b031663313ce5676040518163ffffffff1660e01b8152600401602060405180830381865afa158015610750573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061022a9190611a85565b9250610784868686868686610df3565b50505050505050565b60006107998284611bfc565b6107a490600a611cfc565b6107ae9085611d0b565b90505b9392505050565b6000806000806107c78561132e565b60405163d505accf60e01b8152336004820152306024820152604481018f9052606481018a905260ff8416608482015260a4810183905260c4810182905292955090935091506001600160a01b038e169063d505accf9060e401600060405180830381600087803b15801561083b57600080fd5b505af115801561084f573d6000803e3d6000fd5b505050506108628d8d8d8d8d8d8d6103d4565b9d9c50505050505050505050505050565b61087b610d27565b6001600160a01b03811660009081526003602052604090205460ff166108a25760016108a5565b60005b6001600160a01b0382166000908152600360205260409020805460ff1916911515918217905560ff16156109a6576040516370a0823160e01b815230600482015281906000906001600160a01b038316906370a0823190602401602060405180830381865afa15801561091c573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906109409190611b59565b905080156109a357604051630852cd8d60e31b8152600481018290526001600160a01b038316906342966c6890602401600060405180830381600087803b15801561098a57600080fd5b505af115801561099e573d6000803e3d6000fd5b505050505b50505b6001600160a01b03811660008181526003602090815260409182902054915160ff909216151582527f7740f93df62e6714ab915a82ef699f7a6db1f754498e2e363890d286aba7dcab910160405180910390a250565b6000610a06611378565b805490915060ff600160401b820416159067ffffffffffffffff16600081158015610a2e5750825b905060008267ffffffffffffffff166001148015610a4b5750303b155b905081158015610a59575080155b15610a775760405163f92ee8a960e01b815260040160405180910390fd5b845467ffffffffffffffff191660011785558315610aa157845460ff60401b1916600160401b1785555b610aaa896113a3565b600080546001600160a01b038a81166001600160a01b0319928316811790935560018054918b16919092168117909155604080516064815260208101939093528201527f59967eb20e0c027d0c4fe6e11fcec2273a08036e26740962b3ef3a23f107f93c9060600160405180910390a160005b8651811015610bc2576000878281518110610b3a57610b3a611d2d565b602090810291909101810151808201805182516001600160a01b0390811660009081526002865260409081902080546001600160a01b0319169383169390931790925583519251915191811682529294509116917fd7b0a59830045bcaf6233768890edf6fcda71a5654d385440db294eb92b9a7db910160405180910390a250600101610b1d565b508315610c0957845460ff60401b19168555604051600181527fc7f505b2f371ae2175ee4913f4499e1f2633a7b5936321eed1cdaeb6115181d29060200160405180910390a15b505050505050505050565b610c1c610d27565b6001600160a01b0382811660008181526002602090815260409182902080546001600160a01b0319169486169485179055905192835290917fd7b0a59830045bcaf6233768890edf6fcda71a5654d385440db294eb92b9a7db91016103c8565b610c84610d27565b6001600160a01b038116610cae57604051631e4fbdf760e01b81526000600482015260240161038f565b610cb781610d82565b50565b6040516001600160a01b038481166024830152838116604483015260648201839052610d219186918216906323b872dd906084015b604051602081830303815290604052915060e01b6020820180516001600160e01b0383818316178352505050506113b4565b50505050565b33610d597f9016d09d72d40fdae2fd8ceac6b6234c7706214fd39c1cd1e609a0528c199300546001600160a01b031690565b6001600160a01b03161461070b5760405163118cdaa760e01b815233600482015260240161038f565b7f9016d09d72d40fdae2fd8ceac6b6234c7706214fd39c1cd1e609a0528c19930080546001600160a01b031981166001600160a01b03848116918217845560405192169182907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a3505050565b6000546001600160a01b0316158015610e8257600154610e2f906001600160a01b03167311110000000000000000000000000000000011110190565b6001600160a01b0316336001600160a01b031614610e7d5760405162461bcd60e51b815260206004820152600b60248201526a4e4f545f4741544557415960a81b604482015260640161038f565b611058565b60008060009054906101000a90046001600160a01b03166001600160a01b031663e78cea926040518163ffffffff1660e01b8152600401602060405180830381865afa158015610ed6573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610efa9190611d43565b9050336001600160a01b03821614610f415760405162461bcd60e51b815260206004820152600a6024820152694e4f545f42524944474560b01b604482015260640161038f565b6001546040805163ab5d894360e01b815290516001600160a01b039283169284169163ab5d89439160048083019260209291908290030181865afa158015610f8d573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610fb19190611d43565b6001600160a01b03166380648b026040518163ffffffff1660e01b8152600401602060405180830381865afa158015610fee573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906110129190611d43565b6001600160a01b0316146110565760405162461bcd60e51b815260206004820152600b60248201526a4e4f545f4741544557415960a81b604482015260640161038f565b505b6040516370a0823160e01b8152306004820152879085906001600160a01b038316906370a0823190602401602060405180830381865afa1580156110a0573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906110c49190611b59565b106110e2576110dd6001600160a01b0382168787611425565b611145565b6040516340c10f1960e01b81526001600160a01b038781166004830152602482018790528216906340c10f1990604401600060405180830381600087803b15801561112c57600080fd5b505af1158015611140573d6000803e3d6000fd5b505050505b8351156112d45760006348875bf560e01b6111628683600461145b565b61116b90611d60565b6001600160e01b031916149050801561121e576000306001600160a01b0316866040516111989190611d9e565b6000604051808303816000865af19150503d80600081146111d5576040519150601f19603f3d011682016040523d82523d6000602084013e6111da565b606091505b50509050806112185760405162461bcd60e51b815260206004820152600a6024820152691354d1d7d1905253115160b21b604482015260640161038f565b506112d2565b6001600160a01b0387163b156112d257600080886001600160a01b0316620c35008860405161124d9190611d9e565b60006040518083038160008787f1925050503d806000811461128b576040519150601f19603f3d011682016040523d82523d6000602084013e611290565b606091505b5091509150857f840af9ca2ec8c881ca3de23cf221981cd4118acdefeb96233fbdf0e365d7615583836040516112c7929190611dba565b60405180910390a250505b505b866001600160a01b0316886001600160a01b0316847f42365fe0dfe76a5961cdef1960c9135c4097a1b6c253d8c1d74f5d27e41cbb8e89898960405161131c93929190611dd5565b60405180910390a45050505050505050565b600080600083516041036113585750505060208101516040820151606083015160001a9190611371565b604051634be6321b60e01b815260040160405180910390fd5b9193909250565b6000807ff0c57e16840df040f15088dc2f81fe391c3923bec73e23a9662efc9c229c6a005b92915050565b6113ab6114c1565b610cb7816114e6565b600080602060008451602086016000885af1806113d7576040513d6000823e3d81fd5b50506000513d915081156113ef5780600114156113fc565b6001600160a01b0384163b155b15610d2157604051635274afe760e01b81526001600160a01b038516600482015260240161038f565b6040516001600160a01b0383811660248301526044820183905261145691859182169063a9059cbb90606401610cef565b505050565b6060835182811161146a578092505b838111611475578093505b50818310156107b15750604051828203848401601f19601f830181165b828101518582015281018061149257505050806020830101600081526020810160405250808252509392505050565b6114c96114ee565b61070b57604051631afcd79f60e31b815260040160405180910390fd5b610c846114c1565b60006114f8611378565b54600160401b900460ff16919050565b634e487b7160e01b600052604160045260246000fd5b6040805190810167ffffffffffffffff8111828210171561154157611541611508565b60405290565b604051601f8201601f1916810167ffffffffffffffff8111828210171561157057611570611508565b604052919050565b60008067ffffffffffffffff84111561159357611593611508565b50601f8301601f19166020016115a881611547565b9150508281528383830111156115bd57600080fd5b828260208301376000602084830101529392505050565b600080604083850312156115e757600080fd5b82359150602083013567ffffffffffffffff81111561160557600080fd5b8301601f8101851361161657600080fd5b61162585823560208401611578565b9150509250929050565b6001600160a01b0381168114610cb757600080fd5b803561164f8161162f565b919050565b600082601f83011261166557600080fd5b6107b183833560208501611578565b600080600080600080600060e0888a03121561168f57600080fd5b873561169a8161162f565b965060208801356116aa8161162f565b955060408801359450606088013567ffffffffffffffff8111156116cd57600080fd5b6116d98a828b01611654565b979a969950949760808101359660a0820135965060c090910135945092505050565b60ff81168114610cb757600080fd5b600080600080600080600060e0888a03121561172557600080fd5b8735611730816116fb565b965060208801356117408161162f565b955060408801356117508161162f565b945060608801356117608161162f565b93506080880135925060a088013567ffffffffffffffff81111561178357600080fd5b61178f8a828b01611654565b979a969950949793969295929450505060c09091013590565b6000806000606084860312156117bd57600080fd5b8335925060208401356117cf816116fb565b915060408401356117df816116fb565b809150509250925092565b60008060008060008060008060006101208a8c03121561180957600080fd5b89356118148161162f565b985061182260208b01611644565b975060408a0135965060608a013567ffffffffffffffff81111561184557600080fd5b6118518c828d01611654565b96505060808a0135945060a08a0135935060c08a0135925060e08a013591506101008a013567ffffffffffffffff81111561188b57600080fd5b6118978c828d01611654565b9150509295985092959850929598565b6000602082840312156118b957600080fd5b81356107b18161162f565b600080600080608085870312156118da57600080fd5b84356118e58161162f565b935060208501356118f58161162f565b925060408501356119058161162f565b9150606085013567ffffffffffffffff81111561192157600080fd5b8501601f8101871361193257600080fd5b803567ffffffffffffffff81111561194c5761194c611508565b61195b60208260051b01611547565b8082825260208201915060208360061b85010192508983111561197d57600080fd5b6020840193505b828410156119db576040848b03121561199c57600080fd5b6119a461151e565b84356119af8161162f565b815260208501356119bf8161162f565b8060208301525080835250602082019150604084019350611984565b969995985093965050505050565b600080604083850312156119fc57600080fd5b8235611a078161162f565b91506020830135611a178161162f565b809150509250929050565b60005b83811015611a3d578181015183820152602001611a25565b50506000910152565b60008151808452611a5e816020860160208601611a22565b601f01601f19169290920160200192915050565b6020815260006107b16020830184611a46565b600060208284031215611a9757600080fd5b81516107b1816116fb565b60ff881681526001600160a01b0387811660208301528681166040830152851660608201526080810184905260e060a08201819052600090611ae690830185611a46565b90508260c083015298975050505050505050565b6001600160a01b038981168252602082018990526040820188905286811660608301528516608082015260a0810184905260c0810183905261010060e08201819052600090611b4b90830184611a46565b9a9950505050505050505050565b600060208284031215611b6b57600080fd5b5051919050565b6001600160a01b03831681526040602082018190526000906107ae90830184611a46565b634e487b7160e01b600052601160045260246000fd5b600060018201611bbe57611bbe611b96565b5060010190565b84815260018060a01b0384166020820152826040820152608060608201526000611bf26080830184611a46565b9695505050505050565b60ff828116828216039081111561139d5761139d611b96565b6001815b6001841115611c5057808504811115611c3457611c34611b96565b6001841615611c4257908102905b60019390931c928002611c19565b935093915050565b600082611c675750600161139d565b81611c745750600061139d565b8160018114611c8a5760028114611c9457611cb0565b600191505061139d565b60ff841115611ca557611ca5611b96565b50506001821b61139d565b5060208310610133831016604e8410600b8410161715611cd3575081810a61139d565b611ce06000198484611c15565b8060001904821115611cf457611cf4611b96565b029392505050565b60006107b160ff841683611c58565b600082611d2857634e487b7160e01b600052601260045260246000fd5b500490565b634e487b7160e01b600052603260045260246000fd5b600060208284031215611d5557600080fd5b81516107b18161162f565b805160208201516001600160e01b0319811691906004821015611d97576001600160e01b0319600483900360031b81901b82161692505b5050919050565b60008251611db0818460208701611a22565b9190910192915050565b82151581526040602082015260006107ae6040830184611a46565b60018060a01b0384168152826020820152606060408201526000611dfc6060830184611a46565b9594505050505056fea26469706673582212203ad667bd704c5733be943ea6faead7394ad540bddc64fd916f4a1554eadf7d8964736f6c634300081e0033";
	static readonly abi: readonly [
		{
			readonly inputs: readonly [
			];
			readonly name: "InvalidInitialization";
			readonly type: "error";
		},
		{
			readonly inputs: readonly [
			];
			readonly name: "InvalidSignatureLength";
			readonly type: "error";
		},
		{
			readonly inputs: readonly [
			];
			readonly name: "NotInitializing";
			readonly type: "error";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "address";
					readonly name: "owner";
					readonly type: "address";
				}
			];
			readonly name: "OwnableInvalidOwner";
			readonly type: "error";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "address";
					readonly name: "account";
					readonly type: "address";
				}
			];
			readonly name: "OwnableUnauthorizedAccount";
			readonly type: "error";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "address";
					readonly name: "token";
					readonly type: "address";
				}
			];
			readonly name: "SafeERC20FailedOperation";
			readonly type: "error";
		},
		{
			readonly anonymous: false;
			readonly inputs: readonly [
				{
					readonly indexed: true;
					readonly internalType: "uint256";
					readonly name: "nonce";
					readonly type: "uint256";
				},
				{
					readonly indexed: false;
					readonly internalType: "bool";
					readonly name: "success";
					readonly type: "bool";
				},
				{
					readonly indexed: false;
					readonly internalType: "bytes";
					readonly name: "returnData";
					readonly type: "bytes";
				}
			];
			readonly name: "BridgedCall";
			readonly type: "event";
		},
		{
			readonly anonymous: false;
			readonly inputs: readonly [
				{
					readonly indexed: true;
					readonly internalType: "uint256";
					readonly name: "nonce";
					readonly type: "uint256";
				},
				{
					readonly indexed: true;
					readonly internalType: "address";
					readonly name: "token";
					readonly type: "address";
				},
				{
					readonly indexed: true;
					readonly internalType: "address";
					readonly name: "from";
					readonly type: "address";
				},
				{
					readonly indexed: false;
					readonly internalType: "address";
					readonly name: "to";
					readonly type: "address";
				},
				{
					readonly indexed: false;
					readonly internalType: "uint256";
					readonly name: "value";
					readonly type: "uint256";
				},
				{
					readonly indexed: false;
					readonly internalType: "bytes";
					readonly name: "data";
					readonly type: "bytes";
				}
			];
			readonly name: "BridgedFrom";
			readonly type: "event";
		},
		{
			readonly anonymous: false;
			readonly inputs: readonly [
				{
					readonly indexed: true;
					readonly internalType: "uint256";
					readonly name: "nonce";
					readonly type: "uint256";
				},
				{
					readonly indexed: false;
					readonly internalType: "string";
					readonly name: "msg";
					readonly type: "string";
				}
			];
			readonly name: "BridgedMessage";
			readonly type: "event";
		},
		{
			readonly anonymous: false;
			readonly inputs: readonly [
				{
					readonly indexed: true;
					readonly internalType: "uint256";
					readonly name: "nonce";
					readonly type: "uint256";
				},
				{
					readonly indexed: false;
					readonly internalType: "uint256";
					readonly name: "bridgeID";
					readonly type: "uint256";
				},
				{
					readonly indexed: true;
					readonly internalType: "address";
					readonly name: "token";
					readonly type: "address";
				},
				{
					readonly indexed: true;
					readonly internalType: "address";
					readonly name: "from";
					readonly type: "address";
				},
				{
					readonly indexed: false;
					readonly internalType: "address";
					readonly name: "to";
					readonly type: "address";
				},
				{
					readonly indexed: false;
					readonly internalType: "uint256";
					readonly name: "value";
					readonly type: "uint256";
				},
				{
					readonly indexed: false;
					readonly internalType: "bytes";
					readonly name: "data";
					readonly type: "bytes";
				}
			];
			readonly name: "BridgedTo";
			readonly type: "event";
		},
		{
			readonly anonymous: false;
			readonly inputs: readonly [
				{
					readonly indexed: false;
					readonly internalType: "uint64";
					readonly name: "version";
					readonly type: "uint64";
				}
			];
			readonly name: "Initialized";
			readonly type: "event";
		},
		{
			readonly anonymous: false;
			readonly inputs: readonly [
				{
					readonly indexed: false;
					readonly internalType: "address";
					readonly name: "arbSys";
					readonly type: "address";
				},
				{
					readonly indexed: false;
					readonly internalType: "address";
					readonly name: "inbox";
					readonly type: "address";
				},
				{
					readonly indexed: false;
					readonly internalType: "address";
					readonly name: "otherGateway";
					readonly type: "address";
				}
			];
			readonly name: "InitializedGateway";
			readonly type: "event";
		},
		{
			readonly anonymous: false;
			readonly inputs: readonly [
				{
					readonly indexed: true;
					readonly internalType: "address";
					readonly name: "previousOwner";
					readonly type: "address";
				},
				{
					readonly indexed: true;
					readonly internalType: "address";
					readonly name: "newOwner";
					readonly type: "address";
				}
			];
			readonly name: "OwnershipTransferred";
			readonly type: "event";
		},
		{
			readonly anonymous: false;
			readonly inputs: readonly [
				{
					readonly indexed: true;
					readonly internalType: "address";
					readonly name: "home";
					readonly type: "address";
				},
				{
					readonly indexed: false;
					readonly internalType: "address";
					readonly name: "other";
					readonly type: "address";
				}
			];
			readonly name: "SetOtherToken";
			readonly type: "event";
		},
		{
			readonly anonymous: false;
			readonly inputs: readonly [
				{
					readonly indexed: true;
					readonly internalType: "address";
					readonly name: "token";
					readonly type: "address";
				},
				{
					readonly indexed: false;
					readonly internalType: "bool";
					readonly name: "shouldBurn";
					readonly type: "bool";
				}
			];
			readonly name: "SetToBurn";
			readonly type: "event";
		},
		{
			readonly inputs: readonly [
			];
			readonly name: "arbsys";
			readonly outputs: readonly [
				{
					readonly internalType: "contract ArbSys";
					readonly name: "";
					readonly type: "address";
				}
			];
			readonly stateMutability: "view";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "uint8";
					readonly name: "tokenDecimals";
					readonly type: "uint8";
				},
				{
					readonly internalType: "address";
					readonly name: "token";
					readonly type: "address";
				},
				{
					readonly internalType: "address";
					readonly name: "from";
					readonly type: "address";
				},
				{
					readonly internalType: "address";
					readonly name: "to";
					readonly type: "address";
				},
				{
					readonly internalType: "uint256";
					readonly name: "value";
					readonly type: "uint256";
				},
				{
					readonly internalType: "bytes";
					readonly name: "data";
					readonly type: "bytes";
				},
				{
					readonly internalType: "uint256";
					readonly name: "_nonce";
					readonly type: "uint256";
				}
			];
			readonly name: "bridgeFrom";
			readonly outputs: readonly [
			];
			readonly stateMutability: "payable";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "uint256";
					readonly name: "_nonce";
					readonly type: "uint256";
				},
				{
					readonly internalType: "string";
					readonly name: "_msg";
					readonly type: "string";
				}
			];
			readonly name: "bridgeMsg";
			readonly outputs: readonly [
			];
			readonly stateMutability: "nonpayable";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "contract IERC20Mintable";
					readonly name: "token";
					readonly type: "address";
				},
				{
					readonly internalType: "address";
					readonly name: "to";
					readonly type: "address";
				},
				{
					readonly internalType: "uint256";
					readonly name: "value";
					readonly type: "uint256";
				},
				{
					readonly internalType: "bytes";
					readonly name: "data";
					readonly type: "bytes";
				},
				{
					readonly internalType: "uint256";
					readonly name: "maxSubmissionCost";
					readonly type: "uint256";
				},
				{
					readonly internalType: "uint256";
					readonly name: "maxGas";
					readonly type: "uint256";
				},
				{
					readonly internalType: "uint256";
					readonly name: "gasPriceBid";
					readonly type: "uint256";
				}
			];
			readonly name: "bridgeTo";
			readonly outputs: readonly [
				{
					readonly internalType: "uint256";
					readonly name: "";
					readonly type: "uint256";
				}
			];
			readonly stateMutability: "payable";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "contract IERC20Mintable";
					readonly name: "token";
					readonly type: "address";
				},
				{
					readonly internalType: "address";
					readonly name: "to";
					readonly type: "address";
				},
				{
					readonly internalType: "uint256";
					readonly name: "value";
					readonly type: "uint256";
				},
				{
					readonly internalType: "bytes";
					readonly name: "data";
					readonly type: "bytes";
				},
				{
					readonly internalType: "uint256";
					readonly name: "maxSubmissionCost";
					readonly type: "uint256";
				},
				{
					readonly internalType: "uint256";
					readonly name: "maxGas";
					readonly type: "uint256";
				},
				{
					readonly internalType: "uint256";
					readonly name: "gasPriceBid";
					readonly type: "uint256";
				},
				{
					readonly internalType: "uint256";
					readonly name: "deadline";
					readonly type: "uint256";
				},
				{
					readonly internalType: "bytes";
					readonly name: "signature";
					readonly type: "bytes";
				}
			];
			readonly name: "bridgeToPermit";
			readonly outputs: readonly [
				{
					readonly internalType: "uint256";
					readonly name: "";
					readonly type: "uint256";
				}
			];
			readonly stateMutability: "payable";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "uint256";
					readonly name: "fromValue";
					readonly type: "uint256";
				},
				{
					readonly internalType: "uint8";
					readonly name: "fromDecimals";
					readonly type: "uint8";
				},
				{
					readonly internalType: "uint8";
					readonly name: "toDecimals";
					readonly type: "uint8";
				}
			];
			readonly name: "convertAmount";
			readonly outputs: readonly [
				{
					readonly internalType: "uint256";
					readonly name: "";
					readonly type: "uint256";
				}
			];
			readonly stateMutability: "pure";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
			];
			readonly name: "inbox";
			readonly outputs: readonly [
				{
					readonly internalType: "contract IInbox";
					readonly name: "";
					readonly type: "address";
				}
			];
			readonly stateMutability: "view";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "address";
					readonly name: "_owner";
					readonly type: "address";
				},
				{
					readonly internalType: "contract IInbox";
					readonly name: "_inbox";
					readonly type: "address";
				},
				{
					readonly internalType: "address";
					readonly name: "_otherGateway";
					readonly type: "address";
				},
				{
					readonly components: readonly [
						{
							readonly internalType: "address";
							readonly name: "home";
							readonly type: "address";
						},
						{
							readonly internalType: "address";
							readonly name: "other";
							readonly type: "address";
						}
					];
					readonly internalType: "struct ArbGateway.OtherTokens[]";
					readonly name: "_otherTokens";
					readonly type: "tuple[]";
				}
			];
			readonly name: "initializeGateway";
			readonly outputs: readonly [
			];
			readonly stateMutability: "nonpayable";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
			];
			readonly name: "nonce";
			readonly outputs: readonly [
				{
					readonly internalType: "uint256";
					readonly name: "";
					readonly type: "uint256";
				}
			];
			readonly stateMutability: "view";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
			];
			readonly name: "otherGateway";
			readonly outputs: readonly [
				{
					readonly internalType: "address";
					readonly name: "";
					readonly type: "address";
				}
			];
			readonly stateMutability: "view";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "address";
					readonly name: "";
					readonly type: "address";
				}
			];
			readonly name: "otherTokens";
			readonly outputs: readonly [
				{
					readonly internalType: "address";
					readonly name: "";
					readonly type: "address";
				}
			];
			readonly stateMutability: "view";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
			];
			readonly name: "owner";
			readonly outputs: readonly [
				{
					readonly internalType: "address";
					readonly name: "";
					readonly type: "address";
				}
			];
			readonly stateMutability: "view";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
			];
			readonly name: "renounceOwnership";
			readonly outputs: readonly [
			];
			readonly stateMutability: "nonpayable";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "address";
					readonly name: "homeToken";
					readonly type: "address";
				}
			];
			readonly name: "setBurnToken";
			readonly outputs: readonly [
			];
			readonly stateMutability: "nonpayable";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "address";
					readonly name: "home";
					readonly type: "address";
				},
				{
					readonly internalType: "address";
					readonly name: "other";
					readonly type: "address";
				}
			];
			readonly name: "setOtherToken";
			readonly outputs: readonly [
			];
			readonly stateMutability: "nonpayable";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "address";
					readonly name: "";
					readonly type: "address";
				}
			];
			readonly name: "shouldBurnToken";
			readonly outputs: readonly [
				{
					readonly internalType: "bool";
					readonly name: "";
					readonly type: "bool";
				}
			];
			readonly stateMutability: "view";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "address";
					readonly name: "newOwner";
					readonly type: "address";
				}
			];
			readonly name: "transferOwnership";
			readonly outputs: readonly [
			];
			readonly stateMutability: "nonpayable";
			readonly type: "function";
		}
	];
	static createInterface(): ArbGatewayInterface;
	static connect(address: string, runner?: ContractRunner | null): ArbGateway;
}
export type ArbGatewaySettleConstructorParams = [
	signer?: Signer
] | ConstructorParameters<typeof ContractFactory>;
export declare class ArbGatewaySettle__factory extends ContractFactory {
	constructor(...args: ArbGatewaySettleConstructorParams);
	getDeployTransaction(overrides?: NonPayableOverrides & {
		from?: string;
	}): Promise<ContractDeployTransaction>;
	deploy(overrides?: NonPayableOverrides & {
		from?: string;
	}): Promise<ArbGatewaySettle & {
		deploymentTransaction(): ContractTransactionResponse;
	}>;
	connect(runner: ContractRunner | null): ArbGatewaySettle__factory;
	static readonly bytecode = "0x6080604052348015600f57600080fd5b506125558061001f6000396000f3fe6080604052600436106101355760003560e01c8063affed0e0116100ab578063df36132b1161006f578063df36132b1461034a578063e3f30e711461037a578063eac96f23146103b0578063ebde1bdb146103d0578063f2fde38b146103f0578063fb0e722b1461041057600080fd5b8063affed0e0146102c1578063b190be85146102d7578063b44db82e146102f7578063b50e801d1461030a578063c35879801461032a57600080fd5b806374378d37116100fd57806374378d37146101d65780638da5cb5b146101e957806390f7e1b31461023a578063a51c8cb91461025a578063a85c38ef1461026f578063ac4cb358146102a157600080fd5b80631f6a02671461013a57806348875bf5146101695780635484f0761461018b57806360e312a7146101a0578063715018a6146101c1575b600080fd5b34801561014657600080fd5b506006546101549060ff1681565b60405190151581526020015b60405180910390f35b34801561017557600080fd5b50610189610184366004611aa9565b610430565b005b34801561019757600080fd5b506101896104ac565b6101b36101ae366004611b48565b610513565b604051908152602001610160565b3480156101cd57600080fd5b50610189610838565b6101896101e4366004611bdd565b61084c565b3480156101f557600080fd5b507f9016d09d72d40fdae2fd8ceac6b6234c7706214fd39c1cd1e609a0528c199300546001600160a01b03165b6040516001600160a01b039091168152602001610160565b34801561024657600080fd5b50600154610222906001600160a01b031681565b34801561026657600080fd5b50610222606481565b34801561027b57600080fd5b5061028f61028a366004611c7a565b6109b8565b60405161016096959493929190611ce3565b3480156102ad57600080fd5b506101896102bc366004611df1565b610a88565b3480156102cd57600080fd5b506101b360045481565b3480156102e357600080fd5b506101b36102f2366004611e7f565b610adf565b6101b3610305366004611ec1565b610b0a565b34801561031657600080fd5b50610189610325366004611c7a565b610bc5565b34801561033657600080fd5b50610189610345366004611f7c565b610d4d565b34801561035657600080fd5b50610154610365366004611f7c565b60036020526000908152604090205460ff1681565b34801561038657600080fd5b50610222610395366004611f7c565b6002602052600090815260409020546001600160a01b031681565b3480156103bc57600080fd5b506101896103cb366004611f99565b610ed6565b3480156103dc57600080fd5b506101896103eb36600461200d565b6110ec565b3480156103fc57600080fd5b5061018961040b366004611f7c565b611154565b34801561041c57600080fd5b50600054610222906001600160a01b031681565b3330146104705760405162461bcd60e51b815260206004820152600960248201526827a7262cafa9a2a62360b91b60448201526064015b60405180910390fd5b817f07ce1e2038f0bf86b874f8aa890353ddfe00ccba5e000ad4b713e9b2ce90fa72826040516104a09190612046565b60405180910390a25050565b6104b4611192565b60065460ff166104c55760016104c8565b60005b6006805460ff1916911515918217905560405160ff909116151581527f4caa98d8778c80a93e087168a6e45fa5369af8904ba8f828d1bbec56dfe8f35d9060200160405180910390a1565b600061052a6001600160a01b0389163330896111ed565b6001600160a01b03881660009081526003602052604090205460ff16156105a657604051630852cd8d60e31b8152600481018790526001600160a01b038916906342966c6890602401600060405180830381600087803b15801561058d57600080fd5b505af11580156105a1573d6000803e3d6000fd5b505050505b6000600454905060006374378d3760e01b8a6001600160a01b031663313ce5676040518163ffffffff1660e01b8152600401602060405180830381865afa1580156105f5573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906106199190612059565b6001600160a01b03808d16600090815260026020526040908190205490516106539392919091169033908e908e908e908a90602401612076565b60408051601f198184030181529190526020810180516001600160e01b03166001600160e01b03199093169290921790915260008054919250906001600160a01b0316158061074a5760008054906101000a90046001600160a01b03166001600160a01b031663679b6ded34600160009054906101000a90046001600160a01b031660008c33338e8e8c6040518a63ffffffff1660e01b81526004016107009897969594939291906120ce565b60206040518083038185885af115801561071e573d6000803e3d6000fd5b50505050506040513d601f19601f82011682018060405250810190610743919061212d565b91506107c1565b6001546040516349460b4d60e11b815260649163928c169a9161077b916001600160a01b0316908790600401612146565b6020604051808303816000875af115801561079a573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906107be919061212d565b91505b600480549060006107d183612180565b9190505550336001600160a01b03168c6001600160a01b0316857f9df4cc1e9776bb39b63370f1f8d003320ceeebe30547208fa83a07a3e984794b858f8f8f6040516108209493929190612199565b60405180910390a450919a9950505050505050505050565b610840611192565b61084a600061125a565b565b6108b38388886001600160a01b031663313ce5676040518163ffffffff1660e01b8152600401602060405180830381865afa15801561088f573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906102f29190612059565b6040805160c0810182526001600160a01b03808a168252888116602080840191825289831684860190815260608501878152608086018a8152600060a088018190528a8152600590945296909220855181549086166001600160a01b0319918216178255935160018201805491871691861691909117905590516002820180549190951693169290921790925590516003820155915192955091600482019061095c9082612258565b5060a091909101516005909101805460ff191691151591909117905560065460ff16156109af576109918686868686866112cb565b600081815260056020819052604090912001805460ff191660011790555b50505050505050565b600560205260009081526040902080546001820154600283015460038401546004850180546001600160a01b0395861696948616959093169391926109fc906121d0565b80601f0160208091040260200160405190810160405280929190818152602001828054610a28906121d0565b8015610a755780601f10610a4a57610100808354040283529160200191610a75565b820191906000526020600020905b815481529060010190602001808311610a5857829003601f168201915b5050506005909301549192505060ff1686565b610a9485858585610ed6565b6006805460ff19168215159081179091556040519081527f4caa98d8778c80a93e087168a6e45fa5369af8904ba8f828d1bbec56dfe8f35d9060200160405180910390a15050505050565b6000610aeb8284612316565b610af690600a612416565b610b009085612425565b90505b9392505050565b600080600080610b1985611806565b60405163d505accf60e01b8152336004820152306024820152604481018f9052606481018a905260ff8416608482015260a4810183905260c4810182905292955090935091506001600160a01b038e169063d505accf9060e401600060405180830381600087803b158015610b8d57600080fd5b505af1158015610ba1573d6000803e3d6000fd5b50505050610bb48d8d8d8d8d8d8d610513565b9d9c50505050505050505050505050565b610bcd611192565b6000818152600560209081526040808320815160c08101835281546001600160a01b039081168252600183015481169482019490945260028201549093169183019190915260038101546060830152600481018054608084019190610c31906121d0565b80601f0160208091040260200160405190810160405280929190818152602001828054610c5d906121d0565b8015610caa5780601f10610c7f57610100808354040283529160200191610caa565b820191906000526020600020905b815481529060010190602001808311610c8d57829003601f168201915b50505091835250506005919091015460ff16151560209091015260a081015190915015610d0b5760405162461bcd60e51b815260206004820152600f60248201526e1053149150511657d4d15515131151608a1b6044820152606401610467565b610d2d81600001518260200151836040015184606001518560800151876112cb565b50600090815260056020819052604090912001805460ff19166001179055565b610d55611192565b6001600160a01b03811660009081526003602052604090205460ff16610d7c576001610d7f565b60005b6001600160a01b0382166000908152600360205260409020805460ff1916911515918217905560ff1615610e80576040516370a0823160e01b815230600482015281906000906001600160a01b038316906370a0823190602401602060405180830381865afa158015610df6573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610e1a919061212d565b90508015610e7d57604051630852cd8d60e31b8152600481018290526001600160a01b038316906342966c6890602401600060405180830381600087803b158015610e6457600080fd5b505af1158015610e78573d6000803e3d6000fd5b505050505b50505b6001600160a01b03811660008181526003602090815260409182902054915160ff909216151582527f7740f93df62e6714ab915a82ef699f7a6db1f754498e2e363890d286aba7dcab910160405180910390a250565b6000610ee0611850565b805490915060ff600160401b82041615906001600160401b0316600081158015610f075750825b90506000826001600160401b03166001148015610f235750303b155b905081158015610f31575080155b15610f4f5760405163f92ee8a960e01b815260040160405180910390fd5b845467ffffffffffffffff191660011785558315610f7957845460ff60401b1916600160401b1785555b610f828961187b565b600080546001600160a01b038a81166001600160a01b0319928316811790935560018054918b16919092168117909155604080516064815260208101939093528201527f59967eb20e0c027d0c4fe6e11fcec2273a08036e26740962b3ef3a23f107f93c9060600160405180910390a160005b865181101561109a57600087828151811061101257611012612447565b602090810291909101810151808201805182516001600160a01b0390811660009081526002865260409081902080546001600160a01b0319169383169390931790925583519251915191811682529294509116917fd7b0a59830045bcaf6233768890edf6fcda71a5654d385440db294eb92b9a7db910160405180910390a250600101610ff5565b5083156110e157845460ff60401b19168555604051600181527fc7f505b2f371ae2175ee4913f4499e1f2633a7b5936321eed1cdaeb6115181d29060200160405180910390a15b505050505050505050565b6110f4611192565b6001600160a01b0382811660008181526002602090815260409182902080546001600160a01b0319169486169485179055905192835290917fd7b0a59830045bcaf6233768890edf6fcda71a5654d385440db294eb92b9a7db91016104a0565b61115c611192565b6001600160a01b03811661118657604051631e4fbdf760e01b815260006004820152602401610467565b61118f8161125a565b50565b336111c47f9016d09d72d40fdae2fd8ceac6b6234c7706214fd39c1cd1e609a0528c199300546001600160a01b031690565b6001600160a01b03161461084a5760405163118cdaa760e01b8152336004820152602401610467565b6040516001600160a01b0384811660248301528381166044830152606482018390526112549186918216906323b872dd906084015b604051602081830303815290604052915060e01b6020820180516001600160e01b03838183161783525050505061188c565b50505050565b7f9016d09d72d40fdae2fd8ceac6b6234c7706214fd39c1cd1e609a0528c19930080546001600160a01b031981166001600160a01b03848116918217845560405192169182907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a3505050565b6000546001600160a01b031615801561135a57600154611307906001600160a01b03167311110000000000000000000000000000000011110190565b6001600160a01b0316336001600160a01b0316146113555760405162461bcd60e51b815260206004820152600b60248201526a4e4f545f4741544557415960a81b6044820152606401610467565b611530565b60008060009054906101000a90046001600160a01b03166001600160a01b031663e78cea926040518163ffffffff1660e01b8152600401602060405180830381865afa1580156113ae573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906113d2919061245d565b9050336001600160a01b038216146114195760405162461bcd60e51b815260206004820152600a6024820152694e4f545f42524944474560b01b6044820152606401610467565b6001546040805163ab5d894360e01b815290516001600160a01b039283169284169163ab5d89439160048083019260209291908290030181865afa158015611465573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611489919061245d565b6001600160a01b03166380648b026040518163ffffffff1660e01b8152600401602060405180830381865afa1580156114c6573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906114ea919061245d565b6001600160a01b03161461152e5760405162461bcd60e51b815260206004820152600b60248201526a4e4f545f4741544557415960a81b6044820152606401610467565b505b6040516370a0823160e01b8152306004820152879085906001600160a01b038316906370a0823190602401602060405180830381865afa158015611578573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061159c919061212d565b106115ba576115b56001600160a01b03821687876118fd565b61161d565b6040516340c10f1960e01b81526001600160a01b038781166004830152602482018790528216906340c10f1990604401600060405180830381600087803b15801561160457600080fd5b505af1158015611618573d6000803e3d6000fd5b505050505b8351156117ac5760006348875bf560e01b61163a86836004611933565b6116439061247a565b6001600160e01b03191614905080156116f6576000306001600160a01b03168660405161167091906124b8565b6000604051808303816000865af19150503d80600081146116ad576040519150601f19603f3d011682016040523d82523d6000602084013e6116b2565b606091505b50509050806116f05760405162461bcd60e51b815260206004820152600a6024820152691354d1d7d1905253115160b21b6044820152606401610467565b506117aa565b6001600160a01b0387163b156117aa57600080886001600160a01b0316620c35008860405161172591906124b8565b60006040518083038160008787f1925050503d8060008114611763576040519150601f19603f3d011682016040523d82523d6000602084013e611768565b606091505b5091509150857f840af9ca2ec8c881ca3de23cf221981cd4118acdefeb96233fbdf0e365d76155838360405161179f9291906124d4565b60405180910390a250505b505b866001600160a01b0316886001600160a01b0316847f42365fe0dfe76a5961cdef1960c9135c4097a1b6c253d8c1d74f5d27e41cbb8e8989896040516117f4939291906124ef565b60405180910390a45050505050505050565b600080600083516041036118305750505060208101516040820151606083015160001a9190611849565b604051634be6321b60e01b815260040160405180910390fd5b9193909250565b6000807ff0c57e16840df040f15088dc2f81fe391c3923bec73e23a9662efc9c229c6a005b92915050565b611883611999565b61118f816119be565b600080602060008451602086016000885af1806118af576040513d6000823e3d81fd5b50506000513d915081156118c75780600114156118d4565b6001600160a01b0384163b155b1561125457604051635274afe760e01b81526001600160a01b0385166004820152602401610467565b6040516001600160a01b0383811660248301526044820183905261192e91859182169063a9059cbb90606401611222565b505050565b60608351828111611942578092505b83811161194d578093505b5081831015610b035750604051828203848401601f19601f830181165b828101518582015281018061196a57505050806020830101600081526020810160405250808252509392505050565b6119a16119c6565b61084a57604051631afcd79f60e31b815260040160405180910390fd5b61115c611999565b60006119d0611850565b54600160401b900460ff16919050565b634e487b7160e01b600052604160045260246000fd5b604080519081016001600160401b0381118282101715611a1857611a186119e0565b60405290565b604051601f8201601f191681016001600160401b0381118282101715611a4657611a466119e0565b604052919050565b6000806001600160401b03841115611a6857611a686119e0565b50601f8301601f1916602001611a7d81611a1e565b915050828152838383011115611a9257600080fd5b828260208301376000602084830101529392505050565b60008060408385031215611abc57600080fd5b8235915060208301356001600160401b03811115611ad957600080fd5b8301601f81018513611aea57600080fd5b611af985823560208401611a4e565b9150509250929050565b6001600160a01b038116811461118f57600080fd5b8035611b2381611b03565b919050565b600082601f830112611b3957600080fd5b610b0383833560208501611a4e565b600080600080600080600060e0888a031215611b6357600080fd5b8735611b6e81611b03565b96506020880135611b7e81611b03565b95506040880135945060608801356001600160401b03811115611ba057600080fd5b611bac8a828b01611b28565b979a969950949760808101359660a0820135965060c090910135945092505050565b60ff8116811461118f57600080fd5b600080600080600080600060e0888a031215611bf857600080fd5b8735611c0381611bce565b96506020880135611c1381611b03565b95506040880135611c2381611b03565b94506060880135611c3381611b03565b93506080880135925060a08801356001600160401b03811115611c5557600080fd5b611c618a828b01611b28565b979a969950949793969295929450505060c09091013590565b600060208284031215611c8c57600080fd5b5035919050565b60005b83811015611cae578181015183820152602001611c96565b50506000910152565b60008151808452611ccf816020860160208601611c93565b601f01601f19169290920160200192915050565b6001600160a01b0387811682528681166020830152851660408201526060810184905260c060808201819052600090611d1e90830185611cb7565b905082151560a0830152979650505050505050565b600082601f830112611d4457600080fd5b81356001600160401b03811115611d5d57611d5d6119e0565b611d6c60208260051b01611a1e565b8082825260208201915060208360061b860101925085831115611d8e57600080fd5b602085015b83811015611de75760408188031215611dab57600080fd5b611db36119f6565b8135611dbe81611b03565b81526020820135611dce81611b03565b6020828101919091529084529290920191604001611d93565b5095945050505050565b600080600080600060a08688031215611e0957600080fd5b8535611e1481611b03565b94506020860135611e2481611b03565b93506040860135611e3481611b03565b925060608601356001600160401b03811115611e4f57600080fd5b611e5b88828901611d33565b92505060808601358015158114611e7157600080fd5b809150509295509295909350565b600080600060608486031215611e9457600080fd5b833592506020840135611ea681611bce565b91506040840135611eb681611bce565b809150509250925092565b60008060008060008060008060006101208a8c031215611ee057600080fd5b8935611eeb81611b03565b9850611ef960208b01611b18565b975060408a0135965060608a01356001600160401b03811115611f1b57600080fd5b611f278c828d01611b28565b96505060808a0135945060a08a0135935060c08a0135925060e08a013591506101008a01356001600160401b03811115611f6057600080fd5b611f6c8c828d01611b28565b9150509295985092959850929598565b600060208284031215611f8e57600080fd5b8135610b0381611b03565b60008060008060808587031215611faf57600080fd5b8435611fba81611b03565b93506020850135611fca81611b03565b92506040850135611fda81611b03565b915060608501356001600160401b03811115611ff557600080fd5b61200187828801611d33565b91505092959194509250565b6000806040838503121561202057600080fd5b823561202b81611b03565b9150602083013561203b81611b03565b809150509250929050565b602081526000610b036020830184611cb7565b60006020828403121561206b57600080fd5b8151610b0381611bce565b60ff881681526001600160a01b0387811660208301528681166040830152851660608201526080810184905260e060a082018190526000906120ba90830185611cb7565b90508260c083015298975050505050505050565b6001600160a01b038981168252602082018990526040820188905286811660608301528516608082015260a0810184905260c0810183905261010060e0820181905260009061211f90830184611cb7565b9a9950505050505050505050565b60006020828403121561213f57600080fd5b5051919050565b6001600160a01b0383168152604060208201819052600090610b0090830184611cb7565b634e487b7160e01b600052601160045260246000fd5b6000600182016121925761219261216a565b5060010190565b84815260018060a01b03841660208201528260408201526080606082015260006121c66080830184611cb7565b9695505050505050565b600181811c908216806121e457607f821691505b60208210810361220457634e487b7160e01b600052602260045260246000fd5b50919050565b601f82111561192e57806000526020600020601f840160051c810160208510156122315750805b601f840160051c820191505b81811015612251576000815560010161223d565b5050505050565b81516001600160401b03811115612271576122716119e0565b6122858161227f84546121d0565b8461220a565b6020601f8211600181146122b957600083156122a15750848201515b600019600385901b1c1916600184901b178455612251565b600084815260208120601f198516915b828110156122e957878501518255602094850194600190920191016122c9565b50848210156123075786840151600019600387901b60f8161c191681555b50505050600190811b01905550565b60ff82811682821603908111156118755761187561216a565b6001815b600184111561236a5780850481111561234e5761234e61216a565b600184161561235c57908102905b60019390931c928002612333565b935093915050565b60008261238157506001611875565b8161238e57506000611875565b81600181146123a457600281146123ae576123ca565b6001915050611875565b60ff8411156123bf576123bf61216a565b50506001821b611875565b5060208310610133831016604e8410600b84101617156123ed575081810a611875565b6123fa600019848461232f565b806000190482111561240e5761240e61216a565b029392505050565b6000610b0360ff841683612372565b60008261244257634e487b7160e01b600052601260045260246000fd5b500490565b634e487b7160e01b600052603260045260246000fd5b60006020828403121561246f57600080fd5b8151610b0381611b03565b805160208201516001600160e01b03198116919060048210156124b1576001600160e01b0319600483900360031b81901b82161692505b5050919050565b600082516124ca818460208701611c93565b9190910192915050565b8215158152604060208201526000610b006040830184611cb7565b60018060a01b03841681528260208201526060604082015260006125166060830184611cb7565b9594505050505056fea2646970667358221220866237bc4ecf2a69470e774a5e78d0dc0df6cde94e6bb49cb0152c6d9ba9ac1b64736f6c634300081e0033";
	static readonly abi: readonly [
		{
			readonly inputs: readonly [
			];
			readonly name: "InvalidInitialization";
			readonly type: "error";
		},
		{
			readonly inputs: readonly [
			];
			readonly name: "InvalidSignatureLength";
			readonly type: "error";
		},
		{
			readonly inputs: readonly [
			];
			readonly name: "NotInitializing";
			readonly type: "error";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "address";
					readonly name: "owner";
					readonly type: "address";
				}
			];
			readonly name: "OwnableInvalidOwner";
			readonly type: "error";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "address";
					readonly name: "account";
					readonly type: "address";
				}
			];
			readonly name: "OwnableUnauthorizedAccount";
			readonly type: "error";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "address";
					readonly name: "token";
					readonly type: "address";
				}
			];
			readonly name: "SafeERC20FailedOperation";
			readonly type: "error";
		},
		{
			readonly anonymous: false;
			readonly inputs: readonly [
				{
					readonly indexed: true;
					readonly internalType: "uint256";
					readonly name: "nonce";
					readonly type: "uint256";
				},
				{
					readonly indexed: false;
					readonly internalType: "bool";
					readonly name: "success";
					readonly type: "bool";
				},
				{
					readonly indexed: false;
					readonly internalType: "bytes";
					readonly name: "returnData";
					readonly type: "bytes";
				}
			];
			readonly name: "BridgedCall";
			readonly type: "event";
		},
		{
			readonly anonymous: false;
			readonly inputs: readonly [
				{
					readonly indexed: true;
					readonly internalType: "uint256";
					readonly name: "nonce";
					readonly type: "uint256";
				},
				{
					readonly indexed: true;
					readonly internalType: "address";
					readonly name: "token";
					readonly type: "address";
				},
				{
					readonly indexed: true;
					readonly internalType: "address";
					readonly name: "from";
					readonly type: "address";
				},
				{
					readonly indexed: false;
					readonly internalType: "address";
					readonly name: "to";
					readonly type: "address";
				},
				{
					readonly indexed: false;
					readonly internalType: "uint256";
					readonly name: "value";
					readonly type: "uint256";
				},
				{
					readonly indexed: false;
					readonly internalType: "bytes";
					readonly name: "data";
					readonly type: "bytes";
				}
			];
			readonly name: "BridgedFrom";
			readonly type: "event";
		},
		{
			readonly anonymous: false;
			readonly inputs: readonly [
				{
					readonly indexed: true;
					readonly internalType: "uint256";
					readonly name: "nonce";
					readonly type: "uint256";
				},
				{
					readonly indexed: false;
					readonly internalType: "string";
					readonly name: "msg";
					readonly type: "string";
				}
			];
			readonly name: "BridgedMessage";
			readonly type: "event";
		},
		{
			readonly anonymous: false;
			readonly inputs: readonly [
				{
					readonly indexed: true;
					readonly internalType: "uint256";
					readonly name: "nonce";
					readonly type: "uint256";
				},
				{
					readonly indexed: false;
					readonly internalType: "uint256";
					readonly name: "bridgeID";
					readonly type: "uint256";
				},
				{
					readonly indexed: true;
					readonly internalType: "address";
					readonly name: "token";
					readonly type: "address";
				},
				{
					readonly indexed: true;
					readonly internalType: "address";
					readonly name: "from";
					readonly type: "address";
				},
				{
					readonly indexed: false;
					readonly internalType: "address";
					readonly name: "to";
					readonly type: "address";
				},
				{
					readonly indexed: false;
					readonly internalType: "uint256";
					readonly name: "value";
					readonly type: "uint256";
				},
				{
					readonly indexed: false;
					readonly internalType: "bytes";
					readonly name: "data";
					readonly type: "bytes";
				}
			];
			readonly name: "BridgedTo";
			readonly type: "event";
		},
		{
			readonly anonymous: false;
			readonly inputs: readonly [
				{
					readonly indexed: false;
					readonly internalType: "uint64";
					readonly name: "version";
					readonly type: "uint64";
				}
			];
			readonly name: "Initialized";
			readonly type: "event";
		},
		{
			readonly anonymous: false;
			readonly inputs: readonly [
				{
					readonly indexed: false;
					readonly internalType: "address";
					readonly name: "arbSys";
					readonly type: "address";
				},
				{
					readonly indexed: false;
					readonly internalType: "address";
					readonly name: "inbox";
					readonly type: "address";
				},
				{
					readonly indexed: false;
					readonly internalType: "address";
					readonly name: "otherGateway";
					readonly type: "address";
				}
			];
			readonly name: "InitializedGateway";
			readonly type: "event";
		},
		{
			readonly anonymous: false;
			readonly inputs: readonly [
				{
					readonly indexed: true;
					readonly internalType: "address";
					readonly name: "previousOwner";
					readonly type: "address";
				},
				{
					readonly indexed: true;
					readonly internalType: "address";
					readonly name: "newOwner";
					readonly type: "address";
				}
			];
			readonly name: "OwnershipTransferred";
			readonly type: "event";
		},
		{
			readonly anonymous: false;
			readonly inputs: readonly [
				{
					readonly indexed: false;
					readonly internalType: "bool";
					readonly name: "autoSettle";
					readonly type: "bool";
				}
			];
			readonly name: "SetAutoSettle";
			readonly type: "event";
		},
		{
			readonly anonymous: false;
			readonly inputs: readonly [
				{
					readonly indexed: true;
					readonly internalType: "address";
					readonly name: "home";
					readonly type: "address";
				},
				{
					readonly indexed: false;
					readonly internalType: "address";
					readonly name: "other";
					readonly type: "address";
				}
			];
			readonly name: "SetOtherToken";
			readonly type: "event";
		},
		{
			readonly anonymous: false;
			readonly inputs: readonly [
				{
					readonly indexed: true;
					readonly internalType: "address";
					readonly name: "token";
					readonly type: "address";
				},
				{
					readonly indexed: false;
					readonly internalType: "bool";
					readonly name: "shouldBurn";
					readonly type: "bool";
				}
			];
			readonly name: "SetToBurn";
			readonly type: "event";
		},
		{
			readonly inputs: readonly [
			];
			readonly name: "arbsys";
			readonly outputs: readonly [
				{
					readonly internalType: "contract ArbSys";
					readonly name: "";
					readonly type: "address";
				}
			];
			readonly stateMutability: "view";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
			];
			readonly name: "autoSettle";
			readonly outputs: readonly [
				{
					readonly internalType: "bool";
					readonly name: "";
					readonly type: "bool";
				}
			];
			readonly stateMutability: "view";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "uint8";
					readonly name: "tokenDecimals";
					readonly type: "uint8";
				},
				{
					readonly internalType: "address";
					readonly name: "token";
					readonly type: "address";
				},
				{
					readonly internalType: "address";
					readonly name: "from";
					readonly type: "address";
				},
				{
					readonly internalType: "address";
					readonly name: "to";
					readonly type: "address";
				},
				{
					readonly internalType: "uint256";
					readonly name: "value";
					readonly type: "uint256";
				},
				{
					readonly internalType: "bytes";
					readonly name: "data";
					readonly type: "bytes";
				},
				{
					readonly internalType: "uint256";
					readonly name: "_nonce";
					readonly type: "uint256";
				}
			];
			readonly name: "bridgeFrom";
			readonly outputs: readonly [
			];
			readonly stateMutability: "payable";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "uint256";
					readonly name: "_nonce";
					readonly type: "uint256";
				},
				{
					readonly internalType: "string";
					readonly name: "_msg";
					readonly type: "string";
				}
			];
			readonly name: "bridgeMsg";
			readonly outputs: readonly [
			];
			readonly stateMutability: "nonpayable";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "contract IERC20Mintable";
					readonly name: "token";
					readonly type: "address";
				},
				{
					readonly internalType: "address";
					readonly name: "to";
					readonly type: "address";
				},
				{
					readonly internalType: "uint256";
					readonly name: "value";
					readonly type: "uint256";
				},
				{
					readonly internalType: "bytes";
					readonly name: "data";
					readonly type: "bytes";
				},
				{
					readonly internalType: "uint256";
					readonly name: "maxSubmissionCost";
					readonly type: "uint256";
				},
				{
					readonly internalType: "uint256";
					readonly name: "maxGas";
					readonly type: "uint256";
				},
				{
					readonly internalType: "uint256";
					readonly name: "gasPriceBid";
					readonly type: "uint256";
				}
			];
			readonly name: "bridgeTo";
			readonly outputs: readonly [
				{
					readonly internalType: "uint256";
					readonly name: "";
					readonly type: "uint256";
				}
			];
			readonly stateMutability: "payable";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "contract IERC20Mintable";
					readonly name: "token";
					readonly type: "address";
				},
				{
					readonly internalType: "address";
					readonly name: "to";
					readonly type: "address";
				},
				{
					readonly internalType: "uint256";
					readonly name: "value";
					readonly type: "uint256";
				},
				{
					readonly internalType: "bytes";
					readonly name: "data";
					readonly type: "bytes";
				},
				{
					readonly internalType: "uint256";
					readonly name: "maxSubmissionCost";
					readonly type: "uint256";
				},
				{
					readonly internalType: "uint256";
					readonly name: "maxGas";
					readonly type: "uint256";
				},
				{
					readonly internalType: "uint256";
					readonly name: "gasPriceBid";
					readonly type: "uint256";
				},
				{
					readonly internalType: "uint256";
					readonly name: "deadline";
					readonly type: "uint256";
				},
				{
					readonly internalType: "bytes";
					readonly name: "signature";
					readonly type: "bytes";
				}
			];
			readonly name: "bridgeToPermit";
			readonly outputs: readonly [
				{
					readonly internalType: "uint256";
					readonly name: "";
					readonly type: "uint256";
				}
			];
			readonly stateMutability: "payable";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "uint256";
					readonly name: "fromValue";
					readonly type: "uint256";
				},
				{
					readonly internalType: "uint8";
					readonly name: "fromDecimals";
					readonly type: "uint8";
				},
				{
					readonly internalType: "uint8";
					readonly name: "toDecimals";
					readonly type: "uint8";
				}
			];
			readonly name: "convertAmount";
			readonly outputs: readonly [
				{
					readonly internalType: "uint256";
					readonly name: "";
					readonly type: "uint256";
				}
			];
			readonly stateMutability: "pure";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
			];
			readonly name: "inbox";
			readonly outputs: readonly [
				{
					readonly internalType: "contract IInbox";
					readonly name: "";
					readonly type: "address";
				}
			];
			readonly stateMutability: "view";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "address";
					readonly name: "_owner";
					readonly type: "address";
				},
				{
					readonly internalType: "contract IInbox";
					readonly name: "_inbox";
					readonly type: "address";
				},
				{
					readonly internalType: "address";
					readonly name: "_otherGateway";
					readonly type: "address";
				},
				{
					readonly components: readonly [
						{
							readonly internalType: "address";
							readonly name: "home";
							readonly type: "address";
						},
						{
							readonly internalType: "address";
							readonly name: "other";
							readonly type: "address";
						}
					];
					readonly internalType: "struct ArbGateway.OtherTokens[]";
					readonly name: "_otherTokens";
					readonly type: "tuple[]";
				}
			];
			readonly name: "initializeGateway";
			readonly outputs: readonly [
			];
			readonly stateMutability: "nonpayable";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "address";
					readonly name: "_owner";
					readonly type: "address";
				},
				{
					readonly internalType: "contract IInbox";
					readonly name: "_inbox";
					readonly type: "address";
				},
				{
					readonly internalType: "address";
					readonly name: "_otherGateway";
					readonly type: "address";
				},
				{
					readonly components: readonly [
						{
							readonly internalType: "address";
							readonly name: "home";
							readonly type: "address";
						},
						{
							readonly internalType: "address";
							readonly name: "other";
							readonly type: "address";
						}
					];
					readonly internalType: "struct ArbGateway.OtherTokens[]";
					readonly name: "_otherTokens";
					readonly type: "tuple[]";
				},
				{
					readonly internalType: "bool";
					readonly name: "_autoSettle";
					readonly type: "bool";
				}
			];
			readonly name: "initializeGatewaySettle";
			readonly outputs: readonly [
			];
			readonly stateMutability: "nonpayable";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
			];
			readonly name: "nonce";
			readonly outputs: readonly [
				{
					readonly internalType: "uint256";
					readonly name: "";
					readonly type: "uint256";
				}
			];
			readonly stateMutability: "view";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "uint256";
					readonly name: "";
					readonly type: "uint256";
				}
			];
			readonly name: "orders";
			readonly outputs: readonly [
				{
					readonly internalType: "address";
					readonly name: "token";
					readonly type: "address";
				},
				{
					readonly internalType: "address";
					readonly name: "from";
					readonly type: "address";
				},
				{
					readonly internalType: "address";
					readonly name: "to";
					readonly type: "address";
				},
				{
					readonly internalType: "uint256";
					readonly name: "value";
					readonly type: "uint256";
				},
				{
					readonly internalType: "bytes";
					readonly name: "data";
					readonly type: "bytes";
				},
				{
					readonly internalType: "bool";
					readonly name: "settled";
					readonly type: "bool";
				}
			];
			readonly stateMutability: "view";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
			];
			readonly name: "otherGateway";
			readonly outputs: readonly [
				{
					readonly internalType: "address";
					readonly name: "";
					readonly type: "address";
				}
			];
			readonly stateMutability: "view";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "address";
					readonly name: "";
					readonly type: "address";
				}
			];
			readonly name: "otherTokens";
			readonly outputs: readonly [
				{
					readonly internalType: "address";
					readonly name: "";
					readonly type: "address";
				}
			];
			readonly stateMutability: "view";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
			];
			readonly name: "owner";
			readonly outputs: readonly [
				{
					readonly internalType: "address";
					readonly name: "";
					readonly type: "address";
				}
			];
			readonly stateMutability: "view";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
			];
			readonly name: "renounceOwnership";
			readonly outputs: readonly [
			];
			readonly stateMutability: "nonpayable";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
			];
			readonly name: "setAutoSettle";
			readonly outputs: readonly [
			];
			readonly stateMutability: "nonpayable";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "address";
					readonly name: "homeToken";
					readonly type: "address";
				}
			];
			readonly name: "setBurnToken";
			readonly outputs: readonly [
			];
			readonly stateMutability: "nonpayable";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "address";
					readonly name: "home";
					readonly type: "address";
				},
				{
					readonly internalType: "address";
					readonly name: "other";
					readonly type: "address";
				}
			];
			readonly name: "setOtherToken";
			readonly outputs: readonly [
			];
			readonly stateMutability: "nonpayable";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "uint256";
					readonly name: "_nonce";
					readonly type: "uint256";
				}
			];
			readonly name: "settleOrder";
			readonly outputs: readonly [
			];
			readonly stateMutability: "nonpayable";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "address";
					readonly name: "";
					readonly type: "address";
				}
			];
			readonly name: "shouldBurnToken";
			readonly outputs: readonly [
				{
					readonly internalType: "bool";
					readonly name: "";
					readonly type: "bool";
				}
			];
			readonly stateMutability: "view";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "address";
					readonly name: "newOwner";
					readonly type: "address";
				}
			];
			readonly name: "transferOwnership";
			readonly outputs: readonly [
			];
			readonly stateMutability: "nonpayable";
			readonly type: "function";
		}
	];
	static createInterface(): ArbGatewaySettleInterface;
	static connect(address: string, runner?: ContractRunner | null): ArbGatewaySettle;
}
export type GreeterConstructorParams = [
	signer?: Signer
] | ConstructorParameters<typeof ContractFactory>;
export declare class Greeter__factory extends ContractFactory {
	constructor(...args: GreeterConstructorParams);
	getDeployTransaction(_greeting: string, overrides?: NonPayableOverrides & {
		from?: string;
	}): Promise<ContractDeployTransaction>;
	deploy(_greeting: string, overrides?: NonPayableOverrides & {
		from?: string;
	}): Promise<Greeter & {
		deploymentTransaction(): ContractTransactionResponse;
	}>;
	connect(runner: ContractRunner | null): Greeter__factory;
	static readonly bytecode = "0x608060405234801561001057600080fd5b5060405161065c38038061065c83398101604081905261002f91610058565b600061003b82826101ad565b505061026b565b634e487b7160e01b600052604160045260246000fd5b60006020828403121561006a57600080fd5b81516001600160401b0381111561008057600080fd5b8201601f8101841361009157600080fd5b80516001600160401b038111156100aa576100aa610042565b604051601f8201601f19908116603f011681016001600160401b03811182821017156100d8576100d8610042565b6040528181528282016020018610156100f057600080fd5b60005b8281101561010f576020818501810151838301820152016100f3565b50600091810160200191909152949350505050565b600181811c9082168061013857607f821691505b60208210810361015857634e487b7160e01b600052602260045260246000fd5b50919050565b601f8211156101a857806000526020600020601f840160051c810160208510156101855750805b601f840160051c820191505b818110156101a55760008155600101610191565b50505b505050565b81516001600160401b038111156101c6576101c6610042565b6101da816101d48454610124565b8461015e565b6020601f82116001811461020e57600083156101f65750848201515b600019600385901b1c1916600184901b1784556101a5565b600084815260208120601f198516915b8281101561023e578785015182556020948501946001909201910161021e565b508482101561025c5786840151600019600387901b60f8161c191681555b50505050600190811b01905550565b6103e28061027a6000396000f3fe608060405234801561001057600080fd5b50600436106100365760003560e01c8063a41368621461003b578063cfae321714610050575b600080fd5b61004e61004936600461015d565b61006e565b005b6100586100b5565b6040516100659190610216565b60405180910390f35b600061007a82826102ed565b507f0d332ed5c7d6f1999116748c0eb99c740f276d879d025a5be6435fcf177785de816040516100aa9190610216565b60405180910390a150565b6060600080546100c490610264565b80601f01602080910402602001604051908101604052809291908181526020018280546100f090610264565b801561013d5780601f106101125761010080835404028352916020019161013d565b820191906000526020600020905b81548152906001019060200180831161012057829003601f168201915b5050505050905090565b634e487b7160e01b600052604160045260246000fd5b60006020828403121561016f57600080fd5b813567ffffffffffffffff81111561018657600080fd5b8201601f8101841361019757600080fd5b803567ffffffffffffffff8111156101b1576101b1610147565b604051601f8201601f19908116603f0116810167ffffffffffffffff811182821017156101e0576101e0610147565b6040528181528282016020018610156101f857600080fd5b81602084016020830137600091810160200191909152949350505050565b602081526000825180602084015260005b818110156102445760208186018101516040868401015201610227565b506000604082850101526040601f19601f83011684010191505092915050565b600181811c9082168061027857607f821691505b60208210810361029857634e487b7160e01b600052602260045260246000fd5b50919050565b601f8211156102e857806000526020600020601f840160051c810160208510156102c55750805b601f840160051c820191505b818110156102e557600081556001016102d1565b50505b505050565b815167ffffffffffffffff81111561030757610307610147565b61031b816103158454610264565b8461029e565b6020601f82116001811461034f57600083156103375750848201515b600019600385901b1c1916600184901b1784556102e5565b600084815260208120601f198516915b8281101561037f578785015182556020948501946001909201910161035f565b508482101561039d5786840151600019600387901b60f8161c191681555b50505050600190811b0190555056fea2646970667358221220a0c727299c8dd8aa49c1d26d2e9e631eea4e4864edc0434e30887ee8fb28958c64736f6c634300081e0033";
	static readonly abi: readonly [
		{
			readonly inputs: readonly [
				{
					readonly internalType: "string";
					readonly name: "_greeting";
					readonly type: "string";
				}
			];
			readonly stateMutability: "nonpayable";
			readonly type: "constructor";
		},
		{
			readonly anonymous: false;
			readonly inputs: readonly [
				{
					readonly indexed: false;
					readonly internalType: "string";
					readonly name: "greeting";
					readonly type: "string";
				}
			];
			readonly name: "NewGreeting";
			readonly type: "event";
		},
		{
			readonly inputs: readonly [
			];
			readonly name: "greet";
			readonly outputs: readonly [
				{
					readonly internalType: "string";
					readonly name: "";
					readonly type: "string";
				}
			];
			readonly stateMutability: "view";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "string";
					readonly name: "_greeting";
					readonly type: "string";
				}
			];
			readonly name: "setGreeting";
			readonly outputs: readonly [
			];
			readonly stateMutability: "nonpayable";
			readonly type: "function";
		}
	];
	static createInterface(): GreeterInterface;
	static connect(address: string, runner?: ContractRunner | null): Greeter;
}
export type GreeterChildConstructorParams = [
	signer?: Signer
] | ConstructorParameters<typeof ContractFactory>;
export declare class GreeterChild__factory extends ContractFactory {
	constructor(...args: GreeterChildConstructorParams);
	getDeployTransaction(_greeting: string, _parentTarget: AddressLike, overrides?: NonPayableOverrides & {
		from?: string;
	}): Promise<ContractDeployTransaction>;
	deploy(_greeting: string, _parentTarget: AddressLike, overrides?: NonPayableOverrides & {
		from?: string;
	}): Promise<GreeterChild & {
		deploymentTransaction(): ContractTransactionResponse;
	}>;
	connect(runner: ContractRunner | null): GreeterChild__factory;
	static readonly bytecode = "0x608060405234801561001057600080fd5b5060405161097738038061097783398101604081905261002f91610096565b81600061003c82826101fc565b5050600180546001600160a01b0319166001600160a01b0392909216919091179055506102ba565b634e487b7160e01b600052604160045260246000fd5b80516001600160a01b038116811461009157600080fd5b919050565b600080604083850312156100a957600080fd5b82516001600160401b038111156100bf57600080fd5b8301601f810185136100d057600080fd5b80516001600160401b038111156100e9576100e9610064565b604051601f8201601f19908116603f011681016001600160401b038111828210171561011757610117610064565b60405281815282820160200187101561012f57600080fd5b60005b8281101561014e57602081850181015183830182015201610132565b5060006020838301015280945050505061016a6020840161007a565b90509250929050565b600181811c9082168061018757607f821691505b6020821081036101a757634e487b7160e01b600052602260045260246000fd5b50919050565b601f8211156101f757806000526020600020601f840160051c810160208510156101d45750805b601f840160051c820191505b818110156101f457600081556001016101e0565b50505b505050565b81516001600160401b0381111561021557610215610064565b610229816102238454610173565b846101ad565b6020601f82116001811461025d57600083156102455750848201515b600019600385901b1c1916600184901b1784556101f4565b600084815260208120601f198516915b8281101561028d578785015182556020948501946001909201910161026d565b50848210156102ab5786840151600019600387901b60f8161c191681555b50505050600190811b01905550565b6106ae806102c96000396000f3fe608060405234801561001057600080fd5b50600436106100575760003560e01c806323fd78851461005c5780636d58bbd41461008c578063a4136862146100be578063cfae3217146100d1578063e16a5ff9146100e6575b600080fd5b60015461006f906001600160a01b031681565b6040516001600160a01b0390911681526020015b60405180910390f35b6100bc61009a366004610393565b600180546001600160a01b0319166001600160a01b0392909216919091179055565b005b6100bc6100cc3660046103d9565b610107565b6100d96101bb565b60405161008391906104d8565b6100f96100f43660046103d9565b61024d565b604051908152602001610083565b600154610130906001600160a01b03167311110000000000000000000000000000000011110190565b6001600160a01b0316336001600160a01b0316146101af5760405162461bcd60e51b815260206004820152603260248201527f4772656574696e67206f6e6c792075706461746561626c6520627920706172656044820152716e7420636861696e2773206164647265737360701b606482015260840160405180910390fd5b6101b88161034c565b50565b6060600080546101ca906104eb565b80601f01602080910402602001604051908101604052809291908181526020018280546101f6906104eb565b80156102435780601f1061021857610100808354040283529160200191610243565b820191906000526020600020905b81548152906001019060200180831161022657829003601f168201915b5050505050905090565b60008063a413686260e01b8360405160240161026991906104d8565b60408051601f198184030181529181526020820180516001600160e01b03166001600160e01b03199094169390931790925260015491516349460b4d60e11b815290925060009160649163928c169a916102d4916001600160a01b0391909116908690600401610525565b6020604051808303816000875af11580156102f3573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906103179190610551565b60405190915081907f70181b11a3e9262fd1d816a04c5e30d1bb0b8a453a6fe2dfd5db03a8b8fc984590600090a29392505050565b600061035882826105b9565b507f0d332ed5c7d6f1999116748c0eb99c740f276d879d025a5be6435fcf177785de8160405161038891906104d8565b60405180910390a150565b6000602082840312156103a557600080fd5b81356001600160a01b03811681146103bc57600080fd5b9392505050565b634e487b7160e01b600052604160045260246000fd5b6000602082840312156103eb57600080fd5b813567ffffffffffffffff81111561040257600080fd5b8201601f8101841361041357600080fd5b803567ffffffffffffffff81111561042d5761042d6103c3565b604051601f8201601f19908116603f0116810167ffffffffffffffff8111828210171561045c5761045c6103c3565b60405281815282820160200186101561047457600080fd5b81602084016020830137600091810160200191909152949350505050565b6000815180845260005b818110156104b85760208185018101518683018201520161049c565b506000602082860101526020601f19601f83011685010191505092915050565b6020815260006103bc6020830184610492565b600181811c908216806104ff57607f821691505b60208210810361051f57634e487b7160e01b600052602260045260246000fd5b50919050565b6001600160a01b038316815260406020820181905260009061054990830184610492565b949350505050565b60006020828403121561056357600080fd5b5051919050565b601f8211156105b457806000526020600020601f840160051c810160208510156105915750805b601f840160051c820191505b818110156105b1576000815560010161059d565b50505b505050565b815167ffffffffffffffff8111156105d3576105d36103c3565b6105e7816105e184546104eb565b8461056a565b6020601f82116001811461061b57600083156106035750848201515b600019600385901b1c1916600184901b1784556105b1565b600084815260208120601f198516915b8281101561064b578785015182556020948501946001909201910161062b565b50848210156106695786840151600019600387901b60f8161c191681555b50505050600190811b0190555056fea2646970667358221220d9dac1a2b81c21b3c387cebf782c629f57497aaea067bb247bb087689765491d64736f6c634300081e0033";
	static readonly abi: readonly [
		{
			readonly inputs: readonly [
				{
					readonly internalType: "string";
					readonly name: "_greeting";
					readonly type: "string";
				},
				{
					readonly internalType: "address";
					readonly name: "_parentTarget";
					readonly type: "address";
				}
			];
			readonly stateMutability: "nonpayable";
			readonly type: "constructor";
		},
		{
			readonly anonymous: false;
			readonly inputs: readonly [
				{
					readonly indexed: true;
					readonly internalType: "uint256";
					readonly name: "withdrawalId";
					readonly type: "uint256";
				}
			];
			readonly name: "ChildToParentTxCreated";
			readonly type: "event";
		},
		{
			readonly anonymous: false;
			readonly inputs: readonly [
				{
					readonly indexed: false;
					readonly internalType: "string";
					readonly name: "greeting";
					readonly type: "string";
				}
			];
			readonly name: "NewGreeting";
			readonly type: "event";
		},
		{
			readonly inputs: readonly [
			];
			readonly name: "greet";
			readonly outputs: readonly [
				{
					readonly internalType: "string";
					readonly name: "";
					readonly type: "string";
				}
			];
			readonly stateMutability: "view";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
			];
			readonly name: "parentTarget";
			readonly outputs: readonly [
				{
					readonly internalType: "address";
					readonly name: "";
					readonly type: "address";
				}
			];
			readonly stateMutability: "view";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "string";
					readonly name: "_greeting";
					readonly type: "string";
				}
			];
			readonly name: "setGreeting";
			readonly outputs: readonly [
			];
			readonly stateMutability: "nonpayable";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "string";
					readonly name: "_greeting";
					readonly type: "string";
				}
			];
			readonly name: "setGreetingInParent";
			readonly outputs: readonly [
				{
					readonly internalType: "uint256";
					readonly name: "";
					readonly type: "uint256";
				}
			];
			readonly stateMutability: "nonpayable";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "address";
					readonly name: "_parentTarget";
					readonly type: "address";
				}
			];
			readonly name: "updateParentTarget";
			readonly outputs: readonly [
			];
			readonly stateMutability: "nonpayable";
			readonly type: "function";
		}
	];
	static createInterface(): GreeterChildInterface;
	static connect(address: string, runner?: ContractRunner | null): GreeterChild;
}
export type GreeterParentConstructorParams = [
	signer?: Signer
] | ConstructorParameters<typeof ContractFactory>;
export declare class GreeterParent__factory extends ContractFactory {
	constructor(...args: GreeterParentConstructorParams);
	getDeployTransaction(_greeting: string, _childTarget: AddressLike, _inbox: AddressLike, overrides?: NonPayableOverrides & {
		from?: string;
	}): Promise<ContractDeployTransaction>;
	deploy(_greeting: string, _childTarget: AddressLike, _inbox: AddressLike, overrides?: NonPayableOverrides & {
		from?: string;
	}): Promise<GreeterParent & {
		deploymentTransaction(): ContractTransactionResponse;
	}>;
	connect(runner: ContractRunner | null): GreeterParent__factory;
	static readonly bytecode = "0x608060405234801561001057600080fd5b50604051610c19380380610c1983398101604081905261002f916100a2565b82600061003c8282610218565b5050600180546001600160a01b039384166001600160a01b03199182161790915560028054929093169116179055506102d6565b634e487b7160e01b600052604160045260246000fd5b80516001600160a01b038116811461009d57600080fd5b919050565b6000806000606084860312156100b757600080fd5b83516001600160401b038111156100cd57600080fd5b8401601f810186136100de57600080fd5b80516001600160401b038111156100f7576100f7610070565b604051601f8201601f19908116603f011681016001600160401b038111828210171561012557610125610070565b60405281815282820160200188101561013d57600080fd5b60005b8281101561015c57602081850181015183830182015201610140565b5060006020838301015280955050505061017860208501610086565b915061018660408501610086565b90509250925092565b600181811c908216806101a357607f821691505b6020821081036101c357634e487b7160e01b600052602260045260246000fd5b50919050565b601f82111561021357806000526020600020601f840160051c810160208510156101f05750805b601f840160051c820191505b8181101561021057600081556001016101fc565b50505b505050565b81516001600160401b0381111561023157610231610070565b6102458161023f845461018f565b846101c9565b6020601f82116001811461027957600083156102615750848201515b600019600385901b1c1916600184901b178455610210565b600084815260208120601f198516915b828110156102a95787850151825560209485019460019092019101610289565b50848210156102c75786840151600019600387901b60f8161c191681555b50505050600190811b01905550565b610934806102e56000396000f3fe6080604052600436106100555760003560e01c80637c15beee1461005a57806382a5ea4614610080578063a4136862146100b8578063a663866a146100da578063cfae321714610117578063fb0e722b14610139575b600080fd5b61006d6100683660046105fb565b610159565b6040519081526020015b60405180910390f35b34801561008c57600080fd5b506001546100a0906001600160a01b031681565b6040516001600160a01b039091168152602001610077565b3480156100c457600080fd5b506100d86100d336600461064f565b61026b565b005b3480156100e657600080fd5b506100d86100f53660046106a4565b600180546001600160a01b0319166001600160a01b0392909216919091179055565b34801561012357600080fd5b5061012c61047d565b604051610077919061070e565b34801561014557600080fd5b506002546100a0906001600160a01b031681565b60008063a413686260e01b86604051602401610175919061070e565b60408051601f198184030181529181526020820180516001600160e01b03166001600160e01b031990941693909317909252600254600154925163679b6ded60e01b81529193506000926001600160a01b039182169263679b6ded9234926101f09291169086908c90339081908e908e908d90600401610721565b60206040518083038185885af115801561020e573d6000803e3d6000fd5b50505050506040513d601f19601f820116820180604052508101906102339190610780565b60405190915081907fde92b5b7839f4a2c640f5e3bbb66d415458dadc57a487b0c7fa562ed7c9c896f90600090a29695505050505050565b600254604080516373c6754960e11b815290516000926001600160a01b03169163e78cea929160048083019260209291908290030181865afa1580156102b5573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906102d99190610799565b9050336001600160a01b038216146103255760405162461bcd60e51b815260206004820152600a6024820152694e4f545f42524944474560b01b60448201526064015b60405180910390fd5b6000816001600160a01b031663ab5d89436040518163ffffffff1660e01b8152600401602060405180830381865afa158015610365573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906103899190610799565b90506000816001600160a01b03166380648b026040518163ffffffff1660e01b8152600401602060405180830381865afa1580156103cb573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906103ef9190610799565b6001549091506001600160a01b0380831691161461046e5760405162461bcd60e51b815260206004820152603660248201527f4772656574696e67206f6e6c792075706461746561626c65206279207468652060448201527518da1a5b190818da185a5b89dcc818dbdb9d1c9858dd60521b606482015260840161031c565b6104778461050f565b50505050565b60606000805461048c906107b6565b80601f01602080910402602001604051908101604052809291908181526020018280546104b8906107b6565b80156105055780601f106104da57610100808354040283529160200191610505565b820191906000526020600020905b8154815290600101906020018083116104e857829003601f168201915b5050505050905090565b600061051b828261083f565b507f0d332ed5c7d6f1999116748c0eb99c740f276d879d025a5be6435fcf177785de8160405161054b919061070e565b60405180910390a150565b634e487b7160e01b600052604160045260246000fd5b600082601f83011261057d57600080fd5b813567ffffffffffffffff81111561059757610597610556565b604051601f8201601f19908116603f0116810167ffffffffffffffff811182821017156105c6576105c6610556565b6040528181528382016020018510156105de57600080fd5b816020850160208301376000918101602001919091529392505050565b6000806000806080858703121561061157600080fd5b843567ffffffffffffffff81111561062857600080fd5b6106348782880161056c565b97602087013597506040870135966060013595509350505050565b60006020828403121561066157600080fd5b813567ffffffffffffffff81111561067857600080fd5b6106848482850161056c565b949350505050565b6001600160a01b03811681146106a157600080fd5b50565b6000602082840312156106b657600080fd5b81356106c18161068c565b9392505050565b6000815180845260005b818110156106ee576020818501810151868301820152016106d2565b506000602082860101526020601f19601f83011685010191505092915050565b6020815260006106c160208301846106c8565b6001600160a01b038981168252602082018990526040820188905286811660608301528516608082015260a0810184905260c0810183905261010060e08201819052600090610772908301846106c8565b9a9950505050505050505050565b60006020828403121561079257600080fd5b5051919050565b6000602082840312156107ab57600080fd5b81516106c18161068c565b600181811c908216806107ca57607f821691505b6020821081036107ea57634e487b7160e01b600052602260045260246000fd5b50919050565b601f82111561083a57806000526020600020601f840160051c810160208510156108175750805b601f840160051c820191505b818110156108375760008155600101610823565b50505b505050565b815167ffffffffffffffff81111561085957610859610556565b61086d8161086784546107b6565b846107f0565b6020601f8211600181146108a157600083156108895750848201515b600019600385901b1c1916600184901b178455610837565b600084815260208120601f198516915b828110156108d157878501518255602094850194600190920191016108b1565b50848210156108ef5786840151600019600387901b60f8161c191681555b50505050600190811b0190555056fea264697066735822122019ec35faf92c244e9268120e92f2ea5da91b7c8014860c67c236a6f6b08504cd64736f6c634300081e0033";
	static readonly abi: readonly [
		{
			readonly inputs: readonly [
				{
					readonly internalType: "string";
					readonly name: "_greeting";
					readonly type: "string";
				},
				{
					readonly internalType: "address";
					readonly name: "_childTarget";
					readonly type: "address";
				},
				{
					readonly internalType: "address";
					readonly name: "_inbox";
					readonly type: "address";
				}
			];
			readonly stateMutability: "nonpayable";
			readonly type: "constructor";
		},
		{
			readonly anonymous: false;
			readonly inputs: readonly [
				{
					readonly indexed: false;
					readonly internalType: "string";
					readonly name: "greeting";
					readonly type: "string";
				}
			];
			readonly name: "NewGreeting";
			readonly type: "event";
		},
		{
			readonly anonymous: false;
			readonly inputs: readonly [
				{
					readonly indexed: true;
					readonly internalType: "uint256";
					readonly name: "ticketId";
					readonly type: "uint256";
				}
			];
			readonly name: "RetryableTicketCreated";
			readonly type: "event";
		},
		{
			readonly inputs: readonly [
			];
			readonly name: "childTarget";
			readonly outputs: readonly [
				{
					readonly internalType: "address";
					readonly name: "";
					readonly type: "address";
				}
			];
			readonly stateMutability: "view";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
			];
			readonly name: "greet";
			readonly outputs: readonly [
				{
					readonly internalType: "string";
					readonly name: "";
					readonly type: "string";
				}
			];
			readonly stateMutability: "view";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
			];
			readonly name: "inbox";
			readonly outputs: readonly [
				{
					readonly internalType: "contract IInbox";
					readonly name: "";
					readonly type: "address";
				}
			];
			readonly stateMutability: "view";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "string";
					readonly name: "_greeting";
					readonly type: "string";
				}
			];
			readonly name: "setGreeting";
			readonly outputs: readonly [
			];
			readonly stateMutability: "nonpayable";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "string";
					readonly name: "_greeting";
					readonly type: "string";
				},
				{
					readonly internalType: "uint256";
					readonly name: "maxSubmissionCost";
					readonly type: "uint256";
				},
				{
					readonly internalType: "uint256";
					readonly name: "maxGas";
					readonly type: "uint256";
				},
				{
					readonly internalType: "uint256";
					readonly name: "gasPriceBid";
					readonly type: "uint256";
				}
			];
			readonly name: "setGreetingInChild";
			readonly outputs: readonly [
				{
					readonly internalType: "uint256";
					readonly name: "";
					readonly type: "uint256";
				}
			];
			readonly stateMutability: "payable";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "address";
					readonly name: "_childTarget";
					readonly type: "address";
				}
			];
			readonly name: "updateChildTarget";
			readonly outputs: readonly [
			];
			readonly stateMutability: "nonpayable";
			readonly type: "function";
		}
	];
	static createInterface(): GreeterParentInterface;
	static connect(address: string, runner?: ContractRunner | null): GreeterParent;
}
export declare class IERC20Exp__factory {
	static readonly abi: readonly [
		{
			readonly anonymous: false;
			readonly inputs: readonly [
				{
					readonly indexed: true;
					readonly internalType: "address";
					readonly name: "owner";
					readonly type: "address";
				},
				{
					readonly indexed: true;
					readonly internalType: "address";
					readonly name: "spender";
					readonly type: "address";
				},
				{
					readonly indexed: false;
					readonly internalType: "uint256";
					readonly name: "value";
					readonly type: "uint256";
				}
			];
			readonly name: "Approval";
			readonly type: "event";
		},
		{
			readonly anonymous: false;
			readonly inputs: readonly [
				{
					readonly indexed: true;
					readonly internalType: "address";
					readonly name: "from";
					readonly type: "address";
				},
				{
					readonly indexed: true;
					readonly internalType: "address";
					readonly name: "to";
					readonly type: "address";
				},
				{
					readonly indexed: false;
					readonly internalType: "uint256";
					readonly name: "value";
					readonly type: "uint256";
				}
			];
			readonly name: "Transfer";
			readonly type: "event";
		},
		{
			readonly inputs: readonly [
			];
			readonly name: "DOMAIN_SEPARATOR";
			readonly outputs: readonly [
				{
					readonly internalType: "bytes32";
					readonly name: "";
					readonly type: "bytes32";
				}
			];
			readonly stateMutability: "view";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "address";
					readonly name: "owner";
					readonly type: "address";
				},
				{
					readonly internalType: "address";
					readonly name: "spender";
					readonly type: "address";
				}
			];
			readonly name: "allowance";
			readonly outputs: readonly [
				{
					readonly internalType: "uint256";
					readonly name: "";
					readonly type: "uint256";
				}
			];
			readonly stateMutability: "view";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "address";
					readonly name: "spender";
					readonly type: "address";
				},
				{
					readonly internalType: "uint256";
					readonly name: "value";
					readonly type: "uint256";
				}
			];
			readonly name: "approve";
			readonly outputs: readonly [
				{
					readonly internalType: "bool";
					readonly name: "";
					readonly type: "bool";
				}
			];
			readonly stateMutability: "nonpayable";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "address";
					readonly name: "account";
					readonly type: "address";
				}
			];
			readonly name: "balanceOf";
			readonly outputs: readonly [
				{
					readonly internalType: "uint256";
					readonly name: "";
					readonly type: "uint256";
				}
			];
			readonly stateMutability: "view";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
			];
			readonly name: "decimals";
			readonly outputs: readonly [
				{
					readonly internalType: "uint8";
					readonly name: "";
					readonly type: "uint8";
				}
			];
			readonly stateMutability: "view";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
			];
			readonly name: "name";
			readonly outputs: readonly [
				{
					readonly internalType: "string";
					readonly name: "";
					readonly type: "string";
				}
			];
			readonly stateMutability: "view";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "address";
					readonly name: "owner";
					readonly type: "address";
				}
			];
			readonly name: "nonces";
			readonly outputs: readonly [
				{
					readonly internalType: "uint256";
					readonly name: "";
					readonly type: "uint256";
				}
			];
			readonly stateMutability: "view";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "address";
					readonly name: "owner";
					readonly type: "address";
				},
				{
					readonly internalType: "address";
					readonly name: "spender";
					readonly type: "address";
				},
				{
					readonly internalType: "uint256";
					readonly name: "value";
					readonly type: "uint256";
				},
				{
					readonly internalType: "uint256";
					readonly name: "deadline";
					readonly type: "uint256";
				},
				{
					readonly internalType: "uint8";
					readonly name: "v";
					readonly type: "uint8";
				},
				{
					readonly internalType: "bytes32";
					readonly name: "r";
					readonly type: "bytes32";
				},
				{
					readonly internalType: "bytes32";
					readonly name: "s";
					readonly type: "bytes32";
				}
			];
			readonly name: "permit";
			readonly outputs: readonly [
			];
			readonly stateMutability: "nonpayable";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
			];
			readonly name: "symbol";
			readonly outputs: readonly [
				{
					readonly internalType: "string";
					readonly name: "";
					readonly type: "string";
				}
			];
			readonly stateMutability: "view";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
			];
			readonly name: "totalSupply";
			readonly outputs: readonly [
				{
					readonly internalType: "uint256";
					readonly name: "";
					readonly type: "uint256";
				}
			];
			readonly stateMutability: "view";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "address";
					readonly name: "to";
					readonly type: "address";
				},
				{
					readonly internalType: "uint256";
					readonly name: "value";
					readonly type: "uint256";
				}
			];
			readonly name: "transfer";
			readonly outputs: readonly [
				{
					readonly internalType: "bool";
					readonly name: "";
					readonly type: "bool";
				}
			];
			readonly stateMutability: "nonpayable";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "address";
					readonly name: "from";
					readonly type: "address";
				},
				{
					readonly internalType: "address";
					readonly name: "to";
					readonly type: "address";
				},
				{
					readonly internalType: "uint256";
					readonly name: "value";
					readonly type: "uint256";
				}
			];
			readonly name: "transferFrom";
			readonly outputs: readonly [
				{
					readonly internalType: "bool";
					readonly name: "";
					readonly type: "bool";
				}
			];
			readonly stateMutability: "nonpayable";
			readonly type: "function";
		}
	];
	static createInterface(): IERC20ExpInterface;
	static connect(address: string, runner?: ContractRunner | null): IERC20Exp;
}
export declare class IERC20Mintable__factory {
	static readonly abi: readonly [
		{
			readonly anonymous: false;
			readonly inputs: readonly [
				{
					readonly indexed: true;
					readonly internalType: "address";
					readonly name: "owner";
					readonly type: "address";
				},
				{
					readonly indexed: true;
					readonly internalType: "address";
					readonly name: "spender";
					readonly type: "address";
				},
				{
					readonly indexed: false;
					readonly internalType: "uint256";
					readonly name: "value";
					readonly type: "uint256";
				}
			];
			readonly name: "Approval";
			readonly type: "event";
		},
		{
			readonly anonymous: false;
			readonly inputs: readonly [
				{
					readonly indexed: true;
					readonly internalType: "address";
					readonly name: "from";
					readonly type: "address";
				},
				{
					readonly indexed: true;
					readonly internalType: "address";
					readonly name: "to";
					readonly type: "address";
				},
				{
					readonly indexed: false;
					readonly internalType: "uint256";
					readonly name: "value";
					readonly type: "uint256";
				}
			];
			readonly name: "Transfer";
			readonly type: "event";
		},
		{
			readonly inputs: readonly [
			];
			readonly name: "DOMAIN_SEPARATOR";
			readonly outputs: readonly [
				{
					readonly internalType: "bytes32";
					readonly name: "";
					readonly type: "bytes32";
				}
			];
			readonly stateMutability: "view";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "address";
					readonly name: "owner";
					readonly type: "address";
				},
				{
					readonly internalType: "address";
					readonly name: "spender";
					readonly type: "address";
				}
			];
			readonly name: "allowance";
			readonly outputs: readonly [
				{
					readonly internalType: "uint256";
					readonly name: "";
					readonly type: "uint256";
				}
			];
			readonly stateMutability: "view";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "address";
					readonly name: "spender";
					readonly type: "address";
				},
				{
					readonly internalType: "uint256";
					readonly name: "value";
					readonly type: "uint256";
				}
			];
			readonly name: "approve";
			readonly outputs: readonly [
				{
					readonly internalType: "bool";
					readonly name: "";
					readonly type: "bool";
				}
			];
			readonly stateMutability: "nonpayable";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "address";
					readonly name: "account";
					readonly type: "address";
				}
			];
			readonly name: "balanceOf";
			readonly outputs: readonly [
				{
					readonly internalType: "uint256";
					readonly name: "";
					readonly type: "uint256";
				}
			];
			readonly stateMutability: "view";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "uint256";
					readonly name: "value";
					readonly type: "uint256";
				}
			];
			readonly name: "burn";
			readonly outputs: readonly [
			];
			readonly stateMutability: "nonpayable";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "address";
					readonly name: "account";
					readonly type: "address";
				},
				{
					readonly internalType: "uint256";
					readonly name: "amount";
					readonly type: "uint256";
				}
			];
			readonly name: "burnFrom";
			readonly outputs: readonly [
			];
			readonly stateMutability: "nonpayable";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
			];
			readonly name: "decimals";
			readonly outputs: readonly [
				{
					readonly internalType: "uint8";
					readonly name: "";
					readonly type: "uint8";
				}
			];
			readonly stateMutability: "view";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "address";
					readonly name: "to";
					readonly type: "address";
				},
				{
					readonly internalType: "uint256";
					readonly name: "amount";
					readonly type: "uint256";
				}
			];
			readonly name: "mint";
			readonly outputs: readonly [
			];
			readonly stateMutability: "nonpayable";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
			];
			readonly name: "name";
			readonly outputs: readonly [
				{
					readonly internalType: "string";
					readonly name: "";
					readonly type: "string";
				}
			];
			readonly stateMutability: "view";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "address";
					readonly name: "owner";
					readonly type: "address";
				}
			];
			readonly name: "nonces";
			readonly outputs: readonly [
				{
					readonly internalType: "uint256";
					readonly name: "";
					readonly type: "uint256";
				}
			];
			readonly stateMutability: "view";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "address";
					readonly name: "owner";
					readonly type: "address";
				},
				{
					readonly internalType: "address";
					readonly name: "spender";
					readonly type: "address";
				},
				{
					readonly internalType: "uint256";
					readonly name: "value";
					readonly type: "uint256";
				},
				{
					readonly internalType: "uint256";
					readonly name: "deadline";
					readonly type: "uint256";
				},
				{
					readonly internalType: "uint8";
					readonly name: "v";
					readonly type: "uint8";
				},
				{
					readonly internalType: "bytes32";
					readonly name: "r";
					readonly type: "bytes32";
				},
				{
					readonly internalType: "bytes32";
					readonly name: "s";
					readonly type: "bytes32";
				}
			];
			readonly name: "permit";
			readonly outputs: readonly [
			];
			readonly stateMutability: "nonpayable";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
			];
			readonly name: "symbol";
			readonly outputs: readonly [
				{
					readonly internalType: "string";
					readonly name: "";
					readonly type: "string";
				}
			];
			readonly stateMutability: "view";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
			];
			readonly name: "totalSupply";
			readonly outputs: readonly [
				{
					readonly internalType: "uint256";
					readonly name: "";
					readonly type: "uint256";
				}
			];
			readonly stateMutability: "view";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "address";
					readonly name: "to";
					readonly type: "address";
				},
				{
					readonly internalType: "uint256";
					readonly name: "value";
					readonly type: "uint256";
				}
			];
			readonly name: "transfer";
			readonly outputs: readonly [
				{
					readonly internalType: "bool";
					readonly name: "";
					readonly type: "bool";
				}
			];
			readonly stateMutability: "nonpayable";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "address";
					readonly name: "from";
					readonly type: "address";
				},
				{
					readonly internalType: "address";
					readonly name: "to";
					readonly type: "address";
				},
				{
					readonly internalType: "uint256";
					readonly name: "value";
					readonly type: "uint256";
				}
			];
			readonly name: "transferFrom";
			readonly outputs: readonly [
				{
					readonly internalType: "bool";
					readonly name: "";
					readonly type: "bool";
				}
			];
			readonly stateMutability: "nonpayable";
			readonly type: "function";
		}
	];
	static createInterface(): IERC20MintableInterface;
	static connect(address: string, runner?: ContractRunner | null): IERC20Mintable;
}
export declare class IGateway__factory {
	static readonly abi: readonly [
		{
			readonly inputs: readonly [
				{
					readonly internalType: "uint8";
					readonly name: "tokenDecimals";
					readonly type: "uint8";
				},
				{
					readonly internalType: "address";
					readonly name: "token";
					readonly type: "address";
				},
				{
					readonly internalType: "address";
					readonly name: "from";
					readonly type: "address";
				},
				{
					readonly internalType: "address";
					readonly name: "to";
					readonly type: "address";
				},
				{
					readonly internalType: "uint256";
					readonly name: "value";
					readonly type: "uint256";
				},
				{
					readonly internalType: "bytes";
					readonly name: "data";
					readonly type: "bytes";
				},
				{
					readonly internalType: "uint256";
					readonly name: "nonce";
					readonly type: "uint256";
				}
			];
			readonly name: "bridgeFrom";
			readonly outputs: readonly [
				{
					readonly internalType: "uint256";
					readonly name: "";
					readonly type: "uint256";
				}
			];
			readonly stateMutability: "payable";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "uint256";
					readonly name: "nonce";
					readonly type: "uint256";
				},
				{
					readonly internalType: "string";
					readonly name: "msg";
					readonly type: "string";
				}
			];
			readonly name: "bridgeMsg";
			readonly outputs: readonly [
			];
			readonly stateMutability: "nonpayable";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "address";
					readonly name: "token";
					readonly type: "address";
				},
				{
					readonly internalType: "address";
					readonly name: "to";
					readonly type: "address";
				},
				{
					readonly internalType: "uint256";
					readonly name: "value";
					readonly type: "uint256";
				},
				{
					readonly internalType: "bytes";
					readonly name: "data";
					readonly type: "bytes";
				},
				{
					readonly internalType: "uint256";
					readonly name: "maxSubmissionCost";
					readonly type: "uint256";
				},
				{
					readonly internalType: "uint256";
					readonly name: "maxGas";
					readonly type: "uint256";
				},
				{
					readonly internalType: "uint256";
					readonly name: "gasPriceBid";
					readonly type: "uint256";
				}
			];
			readonly name: "bridgeTo";
			readonly outputs: readonly [
				{
					readonly internalType: "uint256";
					readonly name: "";
					readonly type: "uint256";
				}
			];
			readonly stateMutability: "payable";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "address";
					readonly name: "token";
					readonly type: "address";
				},
				{
					readonly internalType: "address";
					readonly name: "to";
					readonly type: "address";
				},
				{
					readonly internalType: "uint256";
					readonly name: "value";
					readonly type: "uint256";
				},
				{
					readonly internalType: "bytes";
					readonly name: "data";
					readonly type: "bytes";
				},
				{
					readonly internalType: "uint256";
					readonly name: "maxSubmissionCost";
					readonly type: "uint256";
				},
				{
					readonly internalType: "uint256";
					readonly name: "maxGas";
					readonly type: "uint256";
				},
				{
					readonly internalType: "uint256";
					readonly name: "gasPriceBid";
					readonly type: "uint256";
				},
				{
					readonly internalType: "uint256";
					readonly name: "deadline";
					readonly type: "uint256";
				},
				{
					readonly internalType: "bytes";
					readonly name: "signature";
					readonly type: "bytes";
				}
			];
			readonly name: "bridgeToPermit";
			readonly outputs: readonly [
				{
					readonly internalType: "uint256";
					readonly name: "";
					readonly type: "uint256";
				}
			];
			readonly stateMutability: "payable";
			readonly type: "function";
		}
	];
	static createInterface(): IGatewayInterface;
	static connect(address: string, runner?: ContractRunner | null): IGateway;
}
export declare class IInitializableProxy__factory {
	static readonly abi: readonly [
		{
			readonly inputs: readonly [
			];
			readonly name: "admin";
			readonly outputs: readonly [
				{
					readonly internalType: "address";
					readonly name: "";
					readonly type: "address";
				}
			];
			readonly stateMutability: "nonpayable";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "address";
					readonly name: "newAdmin";
					readonly type: "address";
				}
			];
			readonly name: "changeAdmin";
			readonly outputs: readonly [
			];
			readonly stateMutability: "nonpayable";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
			];
			readonly name: "implementation";
			readonly outputs: readonly [
				{
					readonly internalType: "address";
					readonly name: "";
					readonly type: "address";
				}
			];
			readonly stateMutability: "nonpayable";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "address";
					readonly name: "newAdmin";
					readonly type: "address";
				},
				{
					readonly internalType: "address";
					readonly name: "newImplementation";
					readonly type: "address";
				},
				{
					readonly internalType: "bytes";
					readonly name: "data";
					readonly type: "bytes";
				}
			];
			readonly name: "initializeProxy";
			readonly outputs: readonly [
			];
			readonly stateMutability: "payable";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "address";
					readonly name: "newImplementation";
					readonly type: "address";
				},
				{
					readonly internalType: "bytes";
					readonly name: "data";
					readonly type: "bytes";
				}
			];
			readonly name: "upgradeToAndCall";
			readonly outputs: readonly [
			];
			readonly stateMutability: "payable";
			readonly type: "function";
		}
	];
	static createInterface(): IInitializableProxyInterface;
	static connect(address: string, runner?: ContractRunner | null): IInitializableProxy;
}
export type SigLibConstructorParams = [
	signer?: Signer
] | ConstructorParameters<typeof ContractFactory>;
export declare class SigLib__factory extends ContractFactory {
	constructor(...args: SigLibConstructorParams);
	getDeployTransaction(overrides?: NonPayableOverrides & {
		from?: string;
	}): Promise<ContractDeployTransaction>;
	deploy(overrides?: NonPayableOverrides & {
		from?: string;
	}): Promise<SigLib & {
		deploymentTransaction(): ContractTransactionResponse;
	}>;
	connect(runner: ContractRunner | null): SigLib__factory;
	static readonly bytecode = "0x60566037600b82828239805160001a607314602a57634e487b7160e01b600052600060045260246000fd5b30600052607381538281f3fe73000000000000000000000000000000000000000030146080604052600080fdfea2646970667358221220741593d28771aef74fd7a1d0f1fc5149dae0241ac4989549a457170a48b508b764736f6c634300081e0033";
	static readonly abi: readonly [
		{
			readonly inputs: readonly [
			];
			readonly name: "InvalidSignatureLength";
			readonly type: "error";
		}
	];
	static createInterface(): SigLibInterface;
	static connect(address: string, runner?: ContractRunner | null): SigLib;
}
export type WithSettlerConstructorParams = [
	signer?: Signer
] | ConstructorParameters<typeof ContractFactory>;
export declare class WithSettler__factory extends ContractFactory {
	constructor(...args: WithSettlerConstructorParams);
	getDeployTransaction(overrides?: NonPayableOverrides & {
		from?: string;
	}): Promise<ContractDeployTransaction>;
	deploy(overrides?: NonPayableOverrides & {
		from?: string;
	}): Promise<WithSettler & {
		deploymentTransaction(): ContractTransactionResponse;
	}>;
	connect(runner: ContractRunner | null): WithSettler__factory;
	static readonly bytecode = "0x6080604052348015600f57600080fd5b506108278061001f6000396000f3fe608060405234801561001057600080fd5b506004361061007c5760003560e01c80638da5cb5b1161005b5780638da5cb5b146100b1578063b1da41fe146100f0578063c4d66de814610105578063f2fde38b1461011857600080fd5b8062b105e61461008157806314d3940d14610096578063715018a6146100a9575b600080fd5b61009461008f36600461072f565b61012b565b005b6100946100a436600461072f565b6101cd565b610094610266565b7f9016d09d72d40fdae2fd8ceac6b6234c7706214fd39c1cd1e609a0528c199300546040516001600160a01b0390911681526020015b60405180910390f35b6100f861027a565b6040516100e79190610758565b61009461011336600461072f565b61028b565b61009461012636600461072f565b610387565b6101336103c5565b61013e600082610420565b6101815760405162461bcd60e51b815260206004820152600f60248201526e24a72b20a624a22fa9a2aa2a2622a960891b60448201526064015b60405180910390fd5b61018c600082610447565b506040516001600160a01b03821681527fc75b24622d5a8552bcfe775a11d9009ac47d4c050a3af79686aebe33f902fc03906020015b60405180910390a150565b6101d56103c5565b6101e0600082610420565b156102215760405162461bcd60e51b8152602060048201526011602482015270222aa82624a1a0aa22afa9a2aa2a2622a960791b6044820152606401610178565b61022c60008261045c565b506040516001600160a01b03821681527f0e8d4de8d62b8ad5b1837a4a13009121b82a40e3bdcd6e6f454a72418cc86b0e906020016101c2565b61026e6103c5565b6102786000610471565b565b606061028660006104e2565b905090565b60006102956104f6565b805490915060ff600160401b820416159067ffffffffffffffff166000811580156102bd5750825b905060008267ffffffffffffffff1660011480156102da5750303b155b9050811580156102e8575080155b156103065760405163f92ee8a960e01b815260040160405180910390fd5b845467ffffffffffffffff19166001178555831561033057845460ff60401b1916600160401b1785555b6103398661051f565b831561037f57845460ff60401b19168555604051600181527fc7f505b2f371ae2175ee4913f4499e1f2633a7b5936321eed1cdaeb6115181d29060200160405180910390a15b505050505050565b61038f6103c5565b6001600160a01b0381166103b957604051631e4fbdf760e01b815260006004820152602401610178565b6103c281610471565b50565b336103f77f9016d09d72d40fdae2fd8ceac6b6234c7706214fd39c1cd1e609a0528c199300546001600160a01b031690565b6001600160a01b0316146102785760405163118cdaa760e01b8152336004820152602401610178565b6001600160a01b038116600090815260018301602052604081205415155b90505b92915050565b600061043e836001600160a01b038416610539565b600061043e836001600160a01b03841661062c565b7f9016d09d72d40fdae2fd8ceac6b6234c7706214fd39c1cd1e609a0528c19930080546001600160a01b031981166001600160a01b03848116918217845560405192169182907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a3505050565b606060006104ef8361067b565b9392505050565b6000807ff0c57e16840df040f15088dc2f81fe391c3923bec73e23a9662efc9c229c6a00610441565b6001600160a01b0381166105305750335b610221816106d7565b6000818152600183016020526040812054801561062257600061055d6001836107a4565b8554909150600090610571906001906107a4565b90508082146105d6576000866000018281548110610591576105916107c5565b90600052602060002001549050808760000184815481106105b4576105b46107c5565b6000918252602080832090910192909255918252600188019052604090208390555b85548690806105e7576105e76107db565b600190038181906000526020600020016000905590558560010160008681526020019081526020016000206000905560019350505050610441565b6000915050610441565b600081815260018301602052604081205461067357508154600181810184556000848152602080822090930184905584548482528286019093526040902091909155610441565b506000610441565b6060816000018054806020026020016040519081016040528092919081815260200182805480156106cb57602002820191906000526020600020905b8154815260200190600101908083116106b7575b50505050509050919050565b6106df6106e8565b6103c28161070d565b6106f0610715565b61027857604051631afcd79f60e31b815260040160405180910390fd5b61038f6106e8565b600061071f6104f6565b54600160401b900460ff16919050565b60006020828403121561074157600080fd5b81356001600160a01b03811681146104ef57600080fd5b602080825282518282018190526000918401906040840190835b818110156107995783516001600160a01b0316835260209384019390920191600101610772565b509095945050505050565b8181038181111561044157634e487b7160e01b600052601160045260246000fd5b634e487b7160e01b600052603260045260246000fd5b634e487b7160e01b600052603160045260246000fdfea26469706673582212202fcaf371f37bd190823a30049e4c10435befbdf51fd078116285c0acbde8e08464736f6c634300081e0033";
	static readonly abi: readonly [
		{
			readonly inputs: readonly [
			];
			readonly name: "InvalidInitialization";
			readonly type: "error";
		},
		{
			readonly inputs: readonly [
			];
			readonly name: "NotInitializing";
			readonly type: "error";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "address";
					readonly name: "owner";
					readonly type: "address";
				}
			];
			readonly name: "OwnableInvalidOwner";
			readonly type: "error";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "address";
					readonly name: "account";
					readonly type: "address";
				}
			];
			readonly name: "OwnableUnauthorizedAccount";
			readonly type: "error";
		},
		{
			readonly anonymous: false;
			readonly inputs: readonly [
				{
					readonly indexed: false;
					readonly internalType: "address";
					readonly name: "newSettler";
					readonly type: "address";
				}
			];
			readonly name: "AddSettler";
			readonly type: "event";
		},
		{
			readonly anonymous: false;
			readonly inputs: readonly [
				{
					readonly indexed: false;
					readonly internalType: "uint64";
					readonly name: "version";
					readonly type: "uint64";
				}
			];
			readonly name: "Initialized";
			readonly type: "event";
		},
		{
			readonly anonymous: false;
			readonly inputs: readonly [
				{
					readonly indexed: true;
					readonly internalType: "address";
					readonly name: "previousOwner";
					readonly type: "address";
				},
				{
					readonly indexed: true;
					readonly internalType: "address";
					readonly name: "newOwner";
					readonly type: "address";
				}
			];
			readonly name: "OwnershipTransferred";
			readonly type: "event";
		},
		{
			readonly anonymous: false;
			readonly inputs: readonly [
				{
					readonly indexed: false;
					readonly internalType: "address";
					readonly name: "oldSettler";
					readonly type: "address";
				}
			];
			readonly name: "RemoveSettler";
			readonly type: "event";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "address";
					readonly name: "_settler";
					readonly type: "address";
				}
			];
			readonly name: "addSettler";
			readonly outputs: readonly [
			];
			readonly stateMutability: "nonpayable";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "address";
					readonly name: "_initOwner";
					readonly type: "address";
				}
			];
			readonly name: "initialize";
			readonly outputs: readonly [
			];
			readonly stateMutability: "nonpayable";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
			];
			readonly name: "owner";
			readonly outputs: readonly [
				{
					readonly internalType: "address";
					readonly name: "";
					readonly type: "address";
				}
			];
			readonly stateMutability: "view";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "address";
					readonly name: "_settler";
					readonly type: "address";
				}
			];
			readonly name: "removeSettler";
			readonly outputs: readonly [
			];
			readonly stateMutability: "nonpayable";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
			];
			readonly name: "renounceOwnership";
			readonly outputs: readonly [
			];
			readonly stateMutability: "nonpayable";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
			];
			readonly name: "settlers";
			readonly outputs: readonly [
				{
					readonly internalType: "address[]";
					readonly name: "";
					readonly type: "address[]";
				}
			];
			readonly stateMutability: "view";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "address";
					readonly name: "newOwner";
					readonly type: "address";
				}
			];
			readonly name: "transferOwnership";
			readonly outputs: readonly [
			];
			readonly stateMutability: "nonpayable";
			readonly type: "function";
		}
	];
	static createInterface(): WithSettlerInterface;
	static connect(address: string, runner?: ContractRunner | null): WithSettler;
}
export type InitializableProxyConstructorParams = [
	signer?: Signer
] | ConstructorParameters<typeof ContractFactory>;
export declare class InitializableProxy__factory extends ContractFactory {
	constructor(...args: InitializableProxyConstructorParams);
	getDeployTransaction(overrides?: NonPayableOverrides & {
		from?: string;
	}): Promise<ContractDeployTransaction>;
	deploy(overrides?: NonPayableOverrides & {
		from?: string;
	}): Promise<InitializableProxy & {
		deploymentTransaction(): ContractTransactionResponse;
	}>;
	connect(runner: ContractRunner | null): InitializableProxy__factory;
	static readonly bytecode = "0x6080604052348015600f57600080fd5b506106f18061001f6000396000f3fe60806040526004361061004e5760003560e01c80634f1ef286146100655780635c60da1b146100785780638f283970146100a9578063dce95104146100c9578063f851a440146100dc5761005d565b3661005d5761005b6100f1565b005b61005b6100f1565b61005b6100733660046105be565b610103565b34801561008457600080fd5b5061008d61016a565b6040516001600160a01b03909116815260200160405180910390f35b3480156100b557600080fd5b5061005b6100c436600461060c565b610179565b61005b6100d736600461062e565b6101d9565b3480156100e857600080fd5b5061008d610263565b6101016100fc61026d565b610277565b565b61010b61029b565b6001600160a01b0316336001600160a01b03161461015c5760405162461bcd60e51b81526020600482015260096024820152682727aa2fa0a226a4a760b91b60448201526064015b60405180910390fd5b61016682826102a5565b5050565b600061017461026d565b905090565b61018161029b565b6001600160a01b0316336001600160a01b0316146101cd5760405162461bcd60e51b81526020600482015260096024820152682727aa2fa0a226a4a760b91b6044820152606401610153565b6101d681610364565b50565b60006101e361026d565b6001600160a01b0316148015610209575060006101fe61029b565b6001600160a01b0316145b61024b5760405162461bcd60e51b81526020600482015260136024820152721053149150511657d253925512505312569151606a1b6044820152606401610153565b61025483610364565b61025e82826102a5565b505050565b600061017461029b565b60006101746103b8565b3660008037600080366000845af43d6000803e808015610296573d6000f35b3d6000fd5b60006101746103eb565b6102ae82610413565b6040516001600160a01b038316907fbc7cd75a20ee27fd9adebab32041f755214dbc6bffa90cc0225b39da2e5c2d3b90600090a280511561035c57600080836001600160a01b031683604051610304919061068c565b600060405180830381855af49150503d806000811461033f576040519150601f19603f3d011682016040523d82523d6000602084013e610344565b606091505b50915091508161035657805181602001fd5b50505050565b61016661048d565b7f7e644d79422f17c01e4894b5f4f588d331ebfa28653d42ae832dc59e38c9798f61038d6103eb565b604080516001600160a01b03928316815291841660208301520160405180910390a16101d6816104ac565b60007f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc5b546001600160a01b0316919050565b60007fb53127684a568b3173ae13b9f8a6016e243e63b6e8ee1178d6a717850b5d61036103dc565b806001600160a01b03163b60000361044957604051634c9c8ce360e01b81526001600160a01b0382166004820152602401610153565b807f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc5b80546001600160a01b0319166001600160a01b039290921691909117905550565b34156101015760405163b398979f60e01b815260040160405180910390fd5b6001600160a01b0381166104d657604051633173bdd160e11b815260006004820152602401610153565b807fb53127684a568b3173ae13b9f8a6016e243e63b6e8ee1178d6a717850b5d610361046c565b80356001600160a01b038116811461051457600080fd5b919050565b634e487b7160e01b600052604160045260246000fd5b600082601f83011261054057600080fd5b813567ffffffffffffffff81111561055a5761055a610519565b604051601f8201601f19908116603f0116810167ffffffffffffffff8111828210171561058957610589610519565b6040528181528382016020018510156105a157600080fd5b816020850160208301376000918101602001919091529392505050565b600080604083850312156105d157600080fd5b6105da836104fd565b9150602083013567ffffffffffffffff8111156105f657600080fd5b6106028582860161052f565b9150509250929050565b60006020828403121561061e57600080fd5b610627826104fd565b9392505050565b60008060006060848603121561064357600080fd5b61064c846104fd565b925061065a602085016104fd565b9150604084013567ffffffffffffffff81111561067657600080fd5b6106828682870161052f565b9150509250925092565b6000825160005b818110156106ad5760208186018101518583015201610693565b50600092019182525091905056fea26469706673582212202a459f62cd1d03e8ebe48fa74b557bd32eb39e272122fd7a4602a8b38ec2dc7564736f6c634300081e0033";
	static readonly abi: readonly [
		{
			readonly inputs: readonly [
				{
					readonly internalType: "address";
					readonly name: "admin";
					readonly type: "address";
				}
			];
			readonly name: "ERC1967InvalidAdmin";
			readonly type: "error";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "address";
					readonly name: "implementation";
					readonly type: "address";
				}
			];
			readonly name: "ERC1967InvalidImplementation";
			readonly type: "error";
		},
		{
			readonly inputs: readonly [
			];
			readonly name: "ERC1967NonPayable";
			readonly type: "error";
		},
		{
			readonly anonymous: false;
			readonly inputs: readonly [
				{
					readonly indexed: false;
					readonly internalType: "address";
					readonly name: "previousAdmin";
					readonly type: "address";
				},
				{
					readonly indexed: false;
					readonly internalType: "address";
					readonly name: "newAdmin";
					readonly type: "address";
				}
			];
			readonly name: "AdminChanged";
			readonly type: "event";
		},
		{
			readonly anonymous: false;
			readonly inputs: readonly [
				{
					readonly indexed: true;
					readonly internalType: "address";
					readonly name: "implementation";
					readonly type: "address";
				}
			];
			readonly name: "Upgraded";
			readonly type: "event";
		},
		{
			readonly stateMutability: "payable";
			readonly type: "fallback";
		},
		{
			readonly inputs: readonly [
			];
			readonly name: "admin";
			readonly outputs: readonly [
				{
					readonly internalType: "address";
					readonly name: "";
					readonly type: "address";
				}
			];
			readonly stateMutability: "view";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "address";
					readonly name: "newAdmin";
					readonly type: "address";
				}
			];
			readonly name: "changeAdmin";
			readonly outputs: readonly [
			];
			readonly stateMutability: "nonpayable";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
			];
			readonly name: "implementation";
			readonly outputs: readonly [
				{
					readonly internalType: "address";
					readonly name: "";
					readonly type: "address";
				}
			];
			readonly stateMutability: "view";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "address";
					readonly name: "newAdmin";
					readonly type: "address";
				},
				{
					readonly internalType: "address";
					readonly name: "newImplementation";
					readonly type: "address";
				},
				{
					readonly internalType: "bytes";
					readonly name: "data";
					readonly type: "bytes";
				}
			];
			readonly name: "initializeProxy";
			readonly outputs: readonly [
			];
			readonly stateMutability: "payable";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "address";
					readonly name: "newImplementation";
					readonly type: "address";
				},
				{
					readonly internalType: "bytes";
					readonly name: "data";
					readonly type: "bytes";
				}
			];
			readonly name: "upgradeToAndCall";
			readonly outputs: readonly [
			];
			readonly stateMutability: "payable";
			readonly type: "function";
		},
		{
			readonly stateMutability: "payable";
			readonly type: "receive";
		}
	];
	static createInterface(): InitializableProxyInterface;
	static connect(address: string, runner?: ContractRunner | null): InitializableProxy;
}
export type ArowanaConstructorParams = [
	signer?: Signer
] | ConstructorParameters<typeof ContractFactory>;
export declare class Arowana__factory extends ContractFactory {
	constructor(...args: ArowanaConstructorParams);
	getDeployTransaction(overrides?: NonPayableOverrides & {
		from?: string;
	}): Promise<ContractDeployTransaction>;
	deploy(overrides?: NonPayableOverrides & {
		from?: string;
	}): Promise<Arowana & {
		deploymentTransaction(): ContractTransactionResponse;
	}>;
	connect(runner: ContractRunner | null): Arowana__factory;
	static readonly bytecode = "0x61018060405234801561001157600080fd5b506040518060400160405280600781526020016641726f77616e6160c81b81525080604051806040016040528060018152602001603160f81b8152506040518060400160405280600781526020016641726f77616e6160c81b8152506040518060400160405280600381526020016241525760e81b815250816003908161009891906103f7565b5060046100a582826103f7565b506100b59150839050600561017e565b610120526100c481600661017e565b61014052815160208084019190912060e052815190820120610100524660a05261015160e05161010051604080517f8b73c3c69bb8fe3d512ecc4cf759cc79239f7b179b0ffacaa9a75d522b39400f60208201529081019290925260608201524660808201523060a082015260009060c00160405160208183030381529060405280519060200120905090565b60805250503060c052506b019d971e4fe8401e740000006101608190526101799033906101b1565b610548565b600060208351101561019a57610193836101f0565b90506101ab565b816101a584826103f7565b5060ff90505b92915050565b6001600160a01b0382166101e05760405163ec442f0560e01b8152600060048201526024015b60405180910390fd5b6101ec6000838361022e565b5050565b600080829050601f8151111561021b578260405163305a27a960e01b81526004016101d791906104b5565b805161022682610503565b179392505050565b6001600160a01b03831661025957806002600082825461024e9190610527565b909155506102cb9050565b6001600160a01b038316600090815260208190526040902054818110156102ac5760405163391434e360e21b81526001600160a01b038516600482015260248101829052604481018390526064016101d7565b6001600160a01b03841660009081526020819052604090209082900390555b6001600160a01b0382166102e757600280548290039055610306565b6001600160a01b03821660009081526020819052604090208054820190555b816001600160a01b0316836001600160a01b03167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef8360405161034b91815260200190565b60405180910390a3505050565b634e487b7160e01b600052604160045260246000fd5b600181811c9082168061038257607f821691505b6020821081036103a257634e487b7160e01b600052602260045260246000fd5b50919050565b601f8211156103f257806000526020600020601f840160051c810160208510156103cf5750805b601f840160051c820191505b818110156103ef57600081556001016103db565b50505b505050565b81516001600160401b0381111561041057610410610358565b6104248161041e845461036e565b846103a8565b6020601f82116001811461045857600083156104405750848201515b600019600385901b1c1916600184901b1784556103ef565b600084815260208120601f198516915b828110156104885787850151825560209485019460019092019101610468565b50848210156104a65786840151600019600387901b60f8161c191681555b50505050600190811b01905550565b602081526000825180602084015260005b818110156104e357602081860181015160408684010152016104c6565b506000604082850101526040601f19601f83011684010191505092915050565b805160208083015191908110156103a25760001960209190910360031b1b16919050565b808201808211156101ab57634e487b7160e01b600052601160045260246000fd5b60805160a05160c05160e05161010051610120516101405161016051610fef6105ad6000396000610234015260006107d9015260006107ac0152600061071e015260006106f6015260006106510152600061067b015260006106a50152610fef6000f3fe608060405234801561001057600080fd5b50600436106101005760003560e01c806379cc679011610097578063a9059cbb11610066578063a9059cbb14610209578063d505accf1461021c578063d5abeb011461022f578063dd62ed3e1461025657600080fd5b806379cc6790146101c05780637ecebe00146101d357806384b0196e146101e657806395d89b411461020157600080fd5b8063313ce567116100d3578063313ce5671461016b5780633644e5151461017a57806342966c681461018257806370a082311461019757600080fd5b806306fdde0314610105578063095ea7b31461012357806318160ddd1461014657806323b872dd14610158575b600080fd5b61010d61028f565b60405161011a9190610d39565b60405180910390f35b610136610131366004610d6f565b610321565b604051901515815260200161011a565b6002545b60405190815260200161011a565b610136610166366004610d99565b61033b565b6040516012815260200161011a565b61014a61035f565b610195610190366004610dd6565b61036e565b005b61014a6101a5366004610def565b6001600160a01b031660009081526020819052604090205490565b6101956101ce366004610d6f565b61037b565b61014a6101e1366004610def565b610394565b6101ee6103b2565b60405161011a9796959493929190610e0a565b61010d6103f8565b610136610217366004610d6f565b610407565b61019561022a366004610ea2565b610415565b61014a7f000000000000000000000000000000000000000000000000000000000000000081565b61014a610264366004610f15565b6001600160a01b03918216600090815260016020908152604080832093909416825291909152205490565b60606003805461029e90610f48565b80601f01602080910402602001604051908101604052809291908181526020018280546102ca90610f48565b80156103175780601f106102ec57610100808354040283529160200191610317565b820191906000526020600020905b8154815290600101906020018083116102fa57829003601f168201915b5050505050905090565b60003361032f818585610554565b60019150505b92915050565b600033610349858285610566565b6103548585856105e5565b506001949350505050565b6000610369610644565b905090565b610378338261076f565b50565b610386823383610566565b610390828261076f565b5050565b6001600160a01b038116600090815260076020526040812054610335565b6000606080600080600060606103c66107a5565b6103ce6107d2565b60408051600080825260208201909252600f60f81b9b939a50919850469750309650945092509050565b60606004805461029e90610f48565b60003361032f8185856105e5565b8342111561043e5760405163313c898160e11b8152600481018590526024015b60405180910390fd5b60007f6e71edae12b1b97f4d1f60370fef10105fa2faae0126114a169c64845d6126c988888861048b8c6001600160a01b0316600090815260076020526040902080546001810190915590565b6040805160208101969096526001600160a01b0394851690860152929091166060840152608083015260a082015260c0810186905260e00160405160208183030381529060405280519060200120905060006104e6826107ff565b905060006104f68287878761082c565b9050896001600160a01b0316816001600160a01b03161461053d576040516325c0072360e11b81526001600160a01b0380831660048301528b166024820152604401610435565b6105488a8a8a610554565b50505050505050505050565b610561838383600161085a565b505050565b6001600160a01b038381166000908152600160209081526040808320938616835292905220546000198110156105df57818110156105d057604051637dc7a0d960e11b81526001600160a01b03841660048201526024810182905260448101839052606401610435565b6105df8484848403600061085a565b50505050565b6001600160a01b03831661060f57604051634b637e8f60e11b815260006004820152602401610435565b6001600160a01b0382166106395760405163ec442f0560e01b815260006004820152602401610435565b61056183838361092f565b6000306001600160a01b037f00000000000000000000000000000000000000000000000000000000000000001614801561069d57507f000000000000000000000000000000000000000000000000000000000000000046145b156106c757507f000000000000000000000000000000000000000000000000000000000000000090565b610369604080517f8b73c3c69bb8fe3d512ecc4cf759cc79239f7b179b0ffacaa9a75d522b39400f60208201527f0000000000000000000000000000000000000000000000000000000000000000918101919091527f000000000000000000000000000000000000000000000000000000000000000060608201524660808201523060a082015260009060c00160405160208183030381529060405280519060200120905090565b6001600160a01b03821661079957604051634b637e8f60e11b815260006004820152602401610435565b6103908260008361092f565b60606103697f00000000000000000000000000000000000000000000000000000000000000006005610a59565b60606103697f00000000000000000000000000000000000000000000000000000000000000006006610a59565b600061033561080c610644565b8360405161190160f01b8152600281019290925260228201526042902090565b60008060008061083e88888888610b04565b92509250925061084e8282610bd3565b50909695505050505050565b6001600160a01b0384166108845760405163e602df0560e01b815260006004820152602401610435565b6001600160a01b0383166108ae57604051634a1406b160e11b815260006004820152602401610435565b6001600160a01b03808516600090815260016020908152604080832093871683529290522082905580156105df57826001600160a01b0316846001600160a01b03167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b9258460405161092191815260200190565b60405180910390a350505050565b6001600160a01b03831661095a57806002600082825461094f9190610f82565b909155506109cc9050565b6001600160a01b038316600090815260208190526040902054818110156109ad5760405163391434e360e21b81526001600160a01b03851660048201526024810182905260448101839052606401610435565b6001600160a01b03841660009081526020819052604090209082900390555b6001600160a01b0382166109e857600280548290039055610a07565b6001600160a01b03821660009081526020819052604090208054820190555b816001600160a01b0316836001600160a01b03167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef83604051610a4c91815260200190565b60405180910390a3505050565b606060ff8314610a7357610a6c83610c8c565b9050610335565b818054610a7f90610f48565b80601f0160208091040260200160405190810160405280929190818152602001828054610aab90610f48565b8015610af85780601f10610acd57610100808354040283529160200191610af8565b820191906000526020600020905b815481529060010190602001808311610adb57829003601f168201915b50505050509050610335565b600080807f7fffffffffffffffffffffffffffffff5d576e7357a4501ddfe92f46681b20a0841115610b3f5750600091506003905082610bc9565b604080516000808252602082018084528a905260ff891692820192909252606081018790526080810186905260019060a0016020604051602081039080840390855afa158015610b93573d6000803e3d6000fd5b5050604051601f1901519150506001600160a01b038116610bbf57506000925060019150829050610bc9565b9250600091508190505b9450945094915050565b6000826003811115610be757610be7610fa3565b03610bf0575050565b6001826003811115610c0457610c04610fa3565b03610c225760405163f645eedf60e01b815260040160405180910390fd5b6002826003811115610c3657610c36610fa3565b03610c575760405163fce698f760e01b815260048101829052602401610435565b6003826003811115610c6b57610c6b610fa3565b03610390576040516335e2f38360e21b815260048101829052602401610435565b60606000610c9983610ccb565b604080516020808252818301909252919250600091906020820181803683375050509182525060208101929092525090565b600060ff8216601f81111561033557604051632cd44ac360e21b815260040160405180910390fd5b6000815180845260005b81811015610d1957602081850181015186830182015201610cfd565b506000602082860101526020601f19601f83011685010191505092915050565b602081526000610d4c6020830184610cf3565b9392505050565b80356001600160a01b0381168114610d6a57600080fd5b919050565b60008060408385031215610d8257600080fd5b610d8b83610d53565b946020939093013593505050565b600080600060608486031215610dae57600080fd5b610db784610d53565b9250610dc560208501610d53565b929592945050506040919091013590565b600060208284031215610de857600080fd5b5035919050565b600060208284031215610e0157600080fd5b610d4c82610d53565b60ff60f81b8816815260e060208201526000610e2960e0830189610cf3565b8281036040840152610e3b8189610cf3565b606084018890526001600160a01b038716608085015260a0840186905283810360c08501528451808252602080870193509091019060005b81811015610e91578351835260209384019390920191600101610e73565b50909b9a5050505050505050505050565b600080600080600080600060e0888a031215610ebd57600080fd5b610ec688610d53565b9650610ed460208901610d53565b95506040880135945060608801359350608088013560ff81168114610ef857600080fd5b9699959850939692959460a0840135945060c09093013592915050565b60008060408385031215610f2857600080fd5b610f3183610d53565b9150610f3f60208401610d53565b90509250929050565b600181811c90821680610f5c57607f821691505b602082108103610f7c57634e487b7160e01b600052602260045260246000fd5b50919050565b8082018082111561033557634e487b7160e01b600052601160045260246000fd5b634e487b7160e01b600052602160045260246000fdfea2646970667358221220f6302ce700503012fb4cecbe365e0546ba2dd870985fdb4d122a49653c9a8a6764736f6c634300081e0033";
	static readonly abi: readonly [
		{
			readonly inputs: readonly [
			];
			readonly stateMutability: "nonpayable";
			readonly type: "constructor";
		},
		{
			readonly inputs: readonly [
			];
			readonly name: "ECDSAInvalidSignature";
			readonly type: "error";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "uint256";
					readonly name: "length";
					readonly type: "uint256";
				}
			];
			readonly name: "ECDSAInvalidSignatureLength";
			readonly type: "error";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "bytes32";
					readonly name: "s";
					readonly type: "bytes32";
				}
			];
			readonly name: "ECDSAInvalidSignatureS";
			readonly type: "error";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "address";
					readonly name: "spender";
					readonly type: "address";
				},
				{
					readonly internalType: "uint256";
					readonly name: "allowance";
					readonly type: "uint256";
				},
				{
					readonly internalType: "uint256";
					readonly name: "needed";
					readonly type: "uint256";
				}
			];
			readonly name: "ERC20InsufficientAllowance";
			readonly type: "error";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "address";
					readonly name: "sender";
					readonly type: "address";
				},
				{
					readonly internalType: "uint256";
					readonly name: "balance";
					readonly type: "uint256";
				},
				{
					readonly internalType: "uint256";
					readonly name: "needed";
					readonly type: "uint256";
				}
			];
			readonly name: "ERC20InsufficientBalance";
			readonly type: "error";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "address";
					readonly name: "approver";
					readonly type: "address";
				}
			];
			readonly name: "ERC20InvalidApprover";
			readonly type: "error";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "address";
					readonly name: "receiver";
					readonly type: "address";
				}
			];
			readonly name: "ERC20InvalidReceiver";
			readonly type: "error";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "address";
					readonly name: "sender";
					readonly type: "address";
				}
			];
			readonly name: "ERC20InvalidSender";
			readonly type: "error";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "address";
					readonly name: "spender";
					readonly type: "address";
				}
			];
			readonly name: "ERC20InvalidSpender";
			readonly type: "error";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "uint256";
					readonly name: "deadline";
					readonly type: "uint256";
				}
			];
			readonly name: "ERC2612ExpiredSignature";
			readonly type: "error";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "address";
					readonly name: "signer";
					readonly type: "address";
				},
				{
					readonly internalType: "address";
					readonly name: "owner";
					readonly type: "address";
				}
			];
			readonly name: "ERC2612InvalidSigner";
			readonly type: "error";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "address";
					readonly name: "account";
					readonly type: "address";
				},
				{
					readonly internalType: "uint256";
					readonly name: "currentNonce";
					readonly type: "uint256";
				}
			];
			readonly name: "InvalidAccountNonce";
			readonly type: "error";
		},
		{
			readonly inputs: readonly [
			];
			readonly name: "InvalidShortString";
			readonly type: "error";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "string";
					readonly name: "str";
					readonly type: "string";
				}
			];
			readonly name: "StringTooLong";
			readonly type: "error";
		},
		{
			readonly anonymous: false;
			readonly inputs: readonly [
				{
					readonly indexed: true;
					readonly internalType: "address";
					readonly name: "owner";
					readonly type: "address";
				},
				{
					readonly indexed: true;
					readonly internalType: "address";
					readonly name: "spender";
					readonly type: "address";
				},
				{
					readonly indexed: false;
					readonly internalType: "uint256";
					readonly name: "value";
					readonly type: "uint256";
				}
			];
			readonly name: "Approval";
			readonly type: "event";
		},
		{
			readonly anonymous: false;
			readonly inputs: readonly [
			];
			readonly name: "EIP712DomainChanged";
			readonly type: "event";
		},
		{
			readonly anonymous: false;
			readonly inputs: readonly [
				{
					readonly indexed: true;
					readonly internalType: "address";
					readonly name: "from";
					readonly type: "address";
				},
				{
					readonly indexed: true;
					readonly internalType: "address";
					readonly name: "to";
					readonly type: "address";
				},
				{
					readonly indexed: false;
					readonly internalType: "uint256";
					readonly name: "value";
					readonly type: "uint256";
				}
			];
			readonly name: "Transfer";
			readonly type: "event";
		},
		{
			readonly inputs: readonly [
			];
			readonly name: "DOMAIN_SEPARATOR";
			readonly outputs: readonly [
				{
					readonly internalType: "bytes32";
					readonly name: "";
					readonly type: "bytes32";
				}
			];
			readonly stateMutability: "view";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "address";
					readonly name: "owner";
					readonly type: "address";
				},
				{
					readonly internalType: "address";
					readonly name: "spender";
					readonly type: "address";
				}
			];
			readonly name: "allowance";
			readonly outputs: readonly [
				{
					readonly internalType: "uint256";
					readonly name: "";
					readonly type: "uint256";
				}
			];
			readonly stateMutability: "view";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "address";
					readonly name: "spender";
					readonly type: "address";
				},
				{
					readonly internalType: "uint256";
					readonly name: "value";
					readonly type: "uint256";
				}
			];
			readonly name: "approve";
			readonly outputs: readonly [
				{
					readonly internalType: "bool";
					readonly name: "";
					readonly type: "bool";
				}
			];
			readonly stateMutability: "nonpayable";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "address";
					readonly name: "account";
					readonly type: "address";
				}
			];
			readonly name: "balanceOf";
			readonly outputs: readonly [
				{
					readonly internalType: "uint256";
					readonly name: "";
					readonly type: "uint256";
				}
			];
			readonly stateMutability: "view";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "uint256";
					readonly name: "value";
					readonly type: "uint256";
				}
			];
			readonly name: "burn";
			readonly outputs: readonly [
			];
			readonly stateMutability: "nonpayable";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "address";
					readonly name: "account";
					readonly type: "address";
				},
				{
					readonly internalType: "uint256";
					readonly name: "value";
					readonly type: "uint256";
				}
			];
			readonly name: "burnFrom";
			readonly outputs: readonly [
			];
			readonly stateMutability: "nonpayable";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
			];
			readonly name: "decimals";
			readonly outputs: readonly [
				{
					readonly internalType: "uint8";
					readonly name: "";
					readonly type: "uint8";
				}
			];
			readonly stateMutability: "view";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
			];
			readonly name: "eip712Domain";
			readonly outputs: readonly [
				{
					readonly internalType: "bytes1";
					readonly name: "fields";
					readonly type: "bytes1";
				},
				{
					readonly internalType: "string";
					readonly name: "name";
					readonly type: "string";
				},
				{
					readonly internalType: "string";
					readonly name: "version";
					readonly type: "string";
				},
				{
					readonly internalType: "uint256";
					readonly name: "chainId";
					readonly type: "uint256";
				},
				{
					readonly internalType: "address";
					readonly name: "verifyingContract";
					readonly type: "address";
				},
				{
					readonly internalType: "bytes32";
					readonly name: "salt";
					readonly type: "bytes32";
				},
				{
					readonly internalType: "uint256[]";
					readonly name: "extensions";
					readonly type: "uint256[]";
				}
			];
			readonly stateMutability: "view";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
			];
			readonly name: "maxSupply";
			readonly outputs: readonly [
				{
					readonly internalType: "uint256";
					readonly name: "";
					readonly type: "uint256";
				}
			];
			readonly stateMutability: "view";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
			];
			readonly name: "name";
			readonly outputs: readonly [
				{
					readonly internalType: "string";
					readonly name: "";
					readonly type: "string";
				}
			];
			readonly stateMutability: "view";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "address";
					readonly name: "owner";
					readonly type: "address";
				}
			];
			readonly name: "nonces";
			readonly outputs: readonly [
				{
					readonly internalType: "uint256";
					readonly name: "";
					readonly type: "uint256";
				}
			];
			readonly stateMutability: "view";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "address";
					readonly name: "owner";
					readonly type: "address";
				},
				{
					readonly internalType: "address";
					readonly name: "spender";
					readonly type: "address";
				},
				{
					readonly internalType: "uint256";
					readonly name: "value";
					readonly type: "uint256";
				},
				{
					readonly internalType: "uint256";
					readonly name: "deadline";
					readonly type: "uint256";
				},
				{
					readonly internalType: "uint8";
					readonly name: "v";
					readonly type: "uint8";
				},
				{
					readonly internalType: "bytes32";
					readonly name: "r";
					readonly type: "bytes32";
				},
				{
					readonly internalType: "bytes32";
					readonly name: "s";
					readonly type: "bytes32";
				}
			];
			readonly name: "permit";
			readonly outputs: readonly [
			];
			readonly stateMutability: "nonpayable";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
			];
			readonly name: "symbol";
			readonly outputs: readonly [
				{
					readonly internalType: "string";
					readonly name: "";
					readonly type: "string";
				}
			];
			readonly stateMutability: "view";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
			];
			readonly name: "totalSupply";
			readonly outputs: readonly [
				{
					readonly internalType: "uint256";
					readonly name: "";
					readonly type: "uint256";
				}
			];
			readonly stateMutability: "view";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "address";
					readonly name: "to";
					readonly type: "address";
				},
				{
					readonly internalType: "uint256";
					readonly name: "value";
					readonly type: "uint256";
				}
			];
			readonly name: "transfer";
			readonly outputs: readonly [
				{
					readonly internalType: "bool";
					readonly name: "";
					readonly type: "bool";
				}
			];
			readonly stateMutability: "nonpayable";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "address";
					readonly name: "from";
					readonly type: "address";
				},
				{
					readonly internalType: "address";
					readonly name: "to";
					readonly type: "address";
				},
				{
					readonly internalType: "uint256";
					readonly name: "value";
					readonly type: "uint256";
				}
			];
			readonly name: "transferFrom";
			readonly outputs: readonly [
				{
					readonly internalType: "bool";
					readonly name: "";
					readonly type: "bool";
				}
			];
			readonly stateMutability: "nonpayable";
			readonly type: "function";
		}
	];
	static createInterface(): ArowanaInterface;
	static connect(address: string, runner?: ContractRunner | null): Arowana;
}
export type ERC20MockConstructorParams = [
	signer?: Signer
] | ConstructorParameters<typeof ContractFactory>;
export declare class ERC20Mock__factory extends ContractFactory {
	constructor(...args: ERC20MockConstructorParams);
	getDeployTransaction(name_: string, symbol_: string, decimals_: BigNumberish, supply_: BigNumberish, overrides?: NonPayableOverrides & {
		from?: string;
	}): Promise<ContractDeployTransaction>;
	deploy(name_: string, symbol_: string, decimals_: BigNumberish, supply_: BigNumberish, overrides?: NonPayableOverrides & {
		from?: string;
	}): Promise<ERC20Mock & {
		deploymentTransaction(): ContractTransactionResponse;
	}>;
	connect(runner: ContractRunner | null): ERC20Mock__factory;
	static readonly bytecode = "0x61018060405234801561001157600080fd5b506040516118a63803806118a68339810160408190526100309161045f565b338480604051806040016040528060018152602001603160f81b8152508787816003908161005e9190610571565b50600461006b8282610571565b5061007b91508390506005610175565b6101205261008a816006610175565b61014052815160208084019190912060e052815190820120610100524660a05261011760e05161010051604080517f8b73c3c69bb8fe3d512ecc4cf759cc79239f7b179b0ffacaa9a75d522b39400f60208201529081019290925260608201524660808201523060a082015260009060c00160405160208183030381529060405280519060200120905090565b60805250503060c052506001600160a01b03811661015057604051631e4fbdf760e01b8152600060048201526024015b60405180910390fd5b610159816101a8565b5060ff82166101605261016c33826101fa565b505050506106a7565b60006020835110156101915761018a83610234565b90506101a2565b8161019c8482610571565b5060ff90505b92915050565b600880546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b6001600160a01b0382166102245760405163ec442f0560e01b815260006004820152602401610147565b61023060008383610272565b5050565b600080829050601f8151111561025f578260405163305a27a960e01b8152600401610147919061062f565b805161026a82610662565b179392505050565b6001600160a01b03831661029d5780600260008282546102929190610686565b9091555061030f9050565b6001600160a01b038316600090815260208190526040902054818110156102f05760405163391434e360e21b81526001600160a01b03851660048201526024810182905260448101839052606401610147565b6001600160a01b03841660009081526020819052604090209082900390555b6001600160a01b03821661032b5760028054829003905561034a565b6001600160a01b03821660009081526020819052604090208054820190555b816001600160a01b0316836001600160a01b03167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef8360405161038f91815260200190565b60405180910390a3505050565b634e487b7160e01b600052604160045260246000fd5b60005b838110156103cd5781810151838201526020016103b5565b50506000910152565b600082601f8301126103e757600080fd5b81516001600160401b038111156104005761040061039c565b604051601f8201601f19908116603f011681016001600160401b038111828210171561042e5761042e61039c565b60405281815283820160200185101561044657600080fd5b6104578260208301602087016103b2565b949350505050565b6000806000806080858703121561047557600080fd5b84516001600160401b0381111561048b57600080fd5b610497878288016103d6565b602087015190955090506001600160401b038111156104b557600080fd5b6104c1878288016103d6565b935050604085015160ff811681146104d857600080fd5b6060959095015193969295505050565b600181811c908216806104fc57607f821691505b60208210810361051c57634e487b7160e01b600052602260045260246000fd5b50919050565b601f82111561056c57806000526020600020601f840160051c810160208510156105495750805b601f840160051c820191505b818110156105695760008155600101610555565b50505b505050565b81516001600160401b0381111561058a5761058a61039c565b61059e8161059884546104e8565b84610522565b6020601f8211600181146105d257600083156105ba5750848201515b600019600385901b1c1916600184901b178455610569565b600084815260208120601f198516915b8281101561060257878501518255602094850194600190920191016105e2565b50848210156106205786840151600019600387901b60f8161c191681555b50505050600190811b01905550565b602081526000825180602084015261064e8160408501602087016103b2565b601f01601f19169190910160400192915050565b8051602080830151919081101561051c5760001960209190910360031b1b16919050565b808201808211156101a257634e487b7160e01b600052601160045260246000fd5b60805160a05160c05160e0516101005161012051610140516101605161119a61070c600039600061019e015260006109840152600061095701526000610814015260006107ec01526000610747015260006107710152600061079b015261119a6000f3fe608060405234801561001057600080fd5b506004361061012c5760003560e01c806379cc6790116100ad578063a0712d6811610071578063a0712d681461028d578063a9059cbb146102a0578063d505accf146102b3578063dd62ed3e146102c6578063f2fde38b146102ff57600080fd5b806379cc6790146102295780637ecebe001461023c57806384b0196e1461024f5780638da5cb5b1461026a57806395d89b411461028557600080fd5b80633644e515116100f45780633644e515146101c857806340c10f19146101d057806342966c68146101e557806370a08231146101f8578063715018a61461022157600080fd5b806306fdde0314610131578063095ea7b31461014f57806318160ddd1461017257806323b872dd14610184578063313ce56714610197575b600080fd5b610139610312565b6040516101469190610ee4565b60405180910390f35b61016261015d366004610f1a565b6103a4565b6040519015158152602001610146565b6002545b604051908152602001610146565b610162610192366004610f44565b6103be565b60405160ff7f0000000000000000000000000000000000000000000000000000000000000000168152602001610146565b6101766103e2565b6101e36101de366004610f1a565b6103f1565b005b6101e36101f3366004610f81565b610407565b610176610206366004610f9a565b6001600160a01b031660009081526020819052604090205490565b6101e3610414565b6101e3610237366004610f1a565b610428565b61017661024a366004610f9a565b61043d565b61025761045b565b6040516101469796959493929190610fb5565b6008546040516001600160a01b039091168152602001610146565b6101396104a1565b6101e361029b366004610f81565b6104b0565b6101626102ae366004610f1a565b6104c2565b6101e36102c136600461104d565b6104d0565b6101766102d43660046110c0565b6001600160a01b03918216600090815260016020908152604080832093909416825291909152205490565b6101e361030d366004610f9a565b61060f565b606060038054610321906110f3565b80601f016020809104026020016040519081016040528092919081815260200182805461034d906110f3565b801561039a5780601f1061036f5761010080835404028352916020019161039a565b820191906000526020600020905b81548152906001019060200180831161037d57829003601f168201915b5050505050905090565b6000336103b281858561064a565b60019150505b92915050565b6000336103cc85828561065c565b6103d78585856106db565b506001949350505050565b60006103ec61073a565b905090565b6103f9610865565b6104038282610892565b5050565b61041133826108c8565b50565b61041c610865565b61042660006108fe565b565b61043382338361065c565b61040382826108c8565b6001600160a01b0381166000908152600760205260408120546103b8565b60006060806000806000606061046f610950565b61047761097d565b60408051600080825260208201909252600f60f81b9b939a50919850469750309650945092509050565b606060048054610321906110f3565b6104b8610865565b6104113382610892565b6000336103b28185856106db565b834211156104f95760405163313c898160e11b8152600481018590526024015b60405180910390fd5b60007f6e71edae12b1b97f4d1f60370fef10105fa2faae0126114a169c64845d6126c98888886105468c6001600160a01b0316600090815260076020526040902080546001810190915590565b6040805160208101969096526001600160a01b0394851690860152929091166060840152608083015260a082015260c0810186905260e00160405160208183030381529060405280519060200120905060006105a1826109aa565b905060006105b1828787876109d7565b9050896001600160a01b0316816001600160a01b0316146105f8576040516325c0072360e11b81526001600160a01b0380831660048301528b1660248201526044016104f0565b6106038a8a8a61064a565b50505050505050505050565b610617610865565b6001600160a01b03811661064157604051631e4fbdf760e01b8152600060048201526024016104f0565b610411816108fe565b6106578383836001610a05565b505050565b6001600160a01b038381166000908152600160209081526040808320938616835292905220546000198110156106d557818110156106c657604051637dc7a0d960e11b81526001600160a01b038416600482015260248101829052604481018390526064016104f0565b6106d584848484036000610a05565b50505050565b6001600160a01b03831661070557604051634b637e8f60e11b8152600060048201526024016104f0565b6001600160a01b03821661072f5760405163ec442f0560e01b8152600060048201526024016104f0565b610657838383610ada565b6000306001600160a01b037f00000000000000000000000000000000000000000000000000000000000000001614801561079357507f000000000000000000000000000000000000000000000000000000000000000046145b156107bd57507f000000000000000000000000000000000000000000000000000000000000000090565b6103ec604080517f8b73c3c69bb8fe3d512ecc4cf759cc79239f7b179b0ffacaa9a75d522b39400f60208201527f0000000000000000000000000000000000000000000000000000000000000000918101919091527f000000000000000000000000000000000000000000000000000000000000000060608201524660808201523060a082015260009060c00160405160208183030381529060405280519060200120905090565b6008546001600160a01b031633146104265760405163118cdaa760e01b81523360048201526024016104f0565b6001600160a01b0382166108bc5760405163ec442f0560e01b8152600060048201526024016104f0565b61040360008383610ada565b6001600160a01b0382166108f257604051634b637e8f60e11b8152600060048201526024016104f0565b61040382600083610ada565b600880546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b60606103ec7f00000000000000000000000000000000000000000000000000000000000000006005610c04565b60606103ec7f00000000000000000000000000000000000000000000000000000000000000006006610c04565b60006103b86109b761073a565b8360405161190160f01b8152600281019290925260228201526042902090565b6000806000806109e988888888610caf565b9250925092506109f98282610d7e565b50909695505050505050565b6001600160a01b038416610a2f5760405163e602df0560e01b8152600060048201526024016104f0565b6001600160a01b038316610a5957604051634a1406b160e11b8152600060048201526024016104f0565b6001600160a01b03808516600090815260016020908152604080832093871683529290522082905580156106d557826001600160a01b0316846001600160a01b03167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92584604051610acc91815260200190565b60405180910390a350505050565b6001600160a01b038316610b05578060026000828254610afa919061112d565b90915550610b779050565b6001600160a01b03831660009081526020819052604090205481811015610b585760405163391434e360e21b81526001600160a01b038516600482015260248101829052604481018390526064016104f0565b6001600160a01b03841660009081526020819052604090209082900390555b6001600160a01b038216610b9357600280548290039055610bb2565b6001600160a01b03821660009081526020819052604090208054820190555b816001600160a01b0316836001600160a01b03167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef83604051610bf791815260200190565b60405180910390a3505050565b606060ff8314610c1e57610c1783610e37565b90506103b8565b818054610c2a906110f3565b80601f0160208091040260200160405190810160405280929190818152602001828054610c56906110f3565b8015610ca35780601f10610c7857610100808354040283529160200191610ca3565b820191906000526020600020905b815481529060010190602001808311610c8657829003601f168201915b505050505090506103b8565b600080807f7fffffffffffffffffffffffffffffff5d576e7357a4501ddfe92f46681b20a0841115610cea5750600091506003905082610d74565b604080516000808252602082018084528a905260ff891692820192909252606081018790526080810186905260019060a0016020604051602081039080840390855afa158015610d3e573d6000803e3d6000fd5b5050604051601f1901519150506001600160a01b038116610d6a57506000925060019150829050610d74565b9250600091508190505b9450945094915050565b6000826003811115610d9257610d9261114e565b03610d9b575050565b6001826003811115610daf57610daf61114e565b03610dcd5760405163f645eedf60e01b815260040160405180910390fd5b6002826003811115610de157610de161114e565b03610e025760405163fce698f760e01b8152600481018290526024016104f0565b6003826003811115610e1657610e1661114e565b03610403576040516335e2f38360e21b8152600481018290526024016104f0565b60606000610e4483610e76565b604080516020808252818301909252919250600091906020820181803683375050509182525060208101929092525090565b600060ff8216601f8111156103b857604051632cd44ac360e21b815260040160405180910390fd5b6000815180845260005b81811015610ec457602081850181015186830182015201610ea8565b506000602082860101526020601f19601f83011685010191505092915050565b602081526000610ef76020830184610e9e565b9392505050565b80356001600160a01b0381168114610f1557600080fd5b919050565b60008060408385031215610f2d57600080fd5b610f3683610efe565b946020939093013593505050565b600080600060608486031215610f5957600080fd5b610f6284610efe565b9250610f7060208501610efe565b929592945050506040919091013590565b600060208284031215610f9357600080fd5b5035919050565b600060208284031215610fac57600080fd5b610ef782610efe565b60ff60f81b8816815260e060208201526000610fd460e0830189610e9e565b8281036040840152610fe68189610e9e565b606084018890526001600160a01b038716608085015260a0840186905283810360c08501528451808252602080870193509091019060005b8181101561103c57835183526020938401939092019160010161101e565b50909b9a5050505050505050505050565b600080600080600080600060e0888a03121561106857600080fd5b61107188610efe565b965061107f60208901610efe565b95506040880135945060608801359350608088013560ff811681146110a357600080fd5b9699959850939692959460a0840135945060c09093013592915050565b600080604083850312156110d357600080fd5b6110dc83610efe565b91506110ea60208401610efe565b90509250929050565b600181811c9082168061110757607f821691505b60208210810361112757634e487b7160e01b600052602260045260246000fd5b50919050565b808201808211156103b857634e487b7160e01b600052601160045260246000fd5b634e487b7160e01b600052602160045260246000fdfea2646970667358221220ce45c62bed66623730be98422a9267b4a12c5e9b1730188d6b07e35e1629afea64736f6c634300081e0033";
	static readonly abi: readonly [
		{
			readonly inputs: readonly [
				{
					readonly internalType: "string";
					readonly name: "name_";
					readonly type: "string";
				},
				{
					readonly internalType: "string";
					readonly name: "symbol_";
					readonly type: "string";
				},
				{
					readonly internalType: "uint8";
					readonly name: "decimals_";
					readonly type: "uint8";
				},
				{
					readonly internalType: "uint256";
					readonly name: "supply_";
					readonly type: "uint256";
				}
			];
			readonly stateMutability: "nonpayable";
			readonly type: "constructor";
		},
		{
			readonly inputs: readonly [
			];
			readonly name: "ECDSAInvalidSignature";
			readonly type: "error";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "uint256";
					readonly name: "length";
					readonly type: "uint256";
				}
			];
			readonly name: "ECDSAInvalidSignatureLength";
			readonly type: "error";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "bytes32";
					readonly name: "s";
					readonly type: "bytes32";
				}
			];
			readonly name: "ECDSAInvalidSignatureS";
			readonly type: "error";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "address";
					readonly name: "spender";
					readonly type: "address";
				},
				{
					readonly internalType: "uint256";
					readonly name: "allowance";
					readonly type: "uint256";
				},
				{
					readonly internalType: "uint256";
					readonly name: "needed";
					readonly type: "uint256";
				}
			];
			readonly name: "ERC20InsufficientAllowance";
			readonly type: "error";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "address";
					readonly name: "sender";
					readonly type: "address";
				},
				{
					readonly internalType: "uint256";
					readonly name: "balance";
					readonly type: "uint256";
				},
				{
					readonly internalType: "uint256";
					readonly name: "needed";
					readonly type: "uint256";
				}
			];
			readonly name: "ERC20InsufficientBalance";
			readonly type: "error";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "address";
					readonly name: "approver";
					readonly type: "address";
				}
			];
			readonly name: "ERC20InvalidApprover";
			readonly type: "error";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "address";
					readonly name: "receiver";
					readonly type: "address";
				}
			];
			readonly name: "ERC20InvalidReceiver";
			readonly type: "error";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "address";
					readonly name: "sender";
					readonly type: "address";
				}
			];
			readonly name: "ERC20InvalidSender";
			readonly type: "error";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "address";
					readonly name: "spender";
					readonly type: "address";
				}
			];
			readonly name: "ERC20InvalidSpender";
			readonly type: "error";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "uint256";
					readonly name: "deadline";
					readonly type: "uint256";
				}
			];
			readonly name: "ERC2612ExpiredSignature";
			readonly type: "error";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "address";
					readonly name: "signer";
					readonly type: "address";
				},
				{
					readonly internalType: "address";
					readonly name: "owner";
					readonly type: "address";
				}
			];
			readonly name: "ERC2612InvalidSigner";
			readonly type: "error";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "address";
					readonly name: "account";
					readonly type: "address";
				},
				{
					readonly internalType: "uint256";
					readonly name: "currentNonce";
					readonly type: "uint256";
				}
			];
			readonly name: "InvalidAccountNonce";
			readonly type: "error";
		},
		{
			readonly inputs: readonly [
			];
			readonly name: "InvalidShortString";
			readonly type: "error";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "address";
					readonly name: "owner";
					readonly type: "address";
				}
			];
			readonly name: "OwnableInvalidOwner";
			readonly type: "error";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "address";
					readonly name: "account";
					readonly type: "address";
				}
			];
			readonly name: "OwnableUnauthorizedAccount";
			readonly type: "error";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "string";
					readonly name: "str";
					readonly type: "string";
				}
			];
			readonly name: "StringTooLong";
			readonly type: "error";
		},
		{
			readonly anonymous: false;
			readonly inputs: readonly [
				{
					readonly indexed: true;
					readonly internalType: "address";
					readonly name: "owner";
					readonly type: "address";
				},
				{
					readonly indexed: true;
					readonly internalType: "address";
					readonly name: "spender";
					readonly type: "address";
				},
				{
					readonly indexed: false;
					readonly internalType: "uint256";
					readonly name: "value";
					readonly type: "uint256";
				}
			];
			readonly name: "Approval";
			readonly type: "event";
		},
		{
			readonly anonymous: false;
			readonly inputs: readonly [
			];
			readonly name: "EIP712DomainChanged";
			readonly type: "event";
		},
		{
			readonly anonymous: false;
			readonly inputs: readonly [
				{
					readonly indexed: true;
					readonly internalType: "address";
					readonly name: "previousOwner";
					readonly type: "address";
				},
				{
					readonly indexed: true;
					readonly internalType: "address";
					readonly name: "newOwner";
					readonly type: "address";
				}
			];
			readonly name: "OwnershipTransferred";
			readonly type: "event";
		},
		{
			readonly anonymous: false;
			readonly inputs: readonly [
				{
					readonly indexed: true;
					readonly internalType: "address";
					readonly name: "from";
					readonly type: "address";
				},
				{
					readonly indexed: true;
					readonly internalType: "address";
					readonly name: "to";
					readonly type: "address";
				},
				{
					readonly indexed: false;
					readonly internalType: "uint256";
					readonly name: "value";
					readonly type: "uint256";
				}
			];
			readonly name: "Transfer";
			readonly type: "event";
		},
		{
			readonly inputs: readonly [
			];
			readonly name: "DOMAIN_SEPARATOR";
			readonly outputs: readonly [
				{
					readonly internalType: "bytes32";
					readonly name: "";
					readonly type: "bytes32";
				}
			];
			readonly stateMutability: "view";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "address";
					readonly name: "owner";
					readonly type: "address";
				},
				{
					readonly internalType: "address";
					readonly name: "spender";
					readonly type: "address";
				}
			];
			readonly name: "allowance";
			readonly outputs: readonly [
				{
					readonly internalType: "uint256";
					readonly name: "";
					readonly type: "uint256";
				}
			];
			readonly stateMutability: "view";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "address";
					readonly name: "spender";
					readonly type: "address";
				},
				{
					readonly internalType: "uint256";
					readonly name: "value";
					readonly type: "uint256";
				}
			];
			readonly name: "approve";
			readonly outputs: readonly [
				{
					readonly internalType: "bool";
					readonly name: "";
					readonly type: "bool";
				}
			];
			readonly stateMutability: "nonpayable";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "address";
					readonly name: "account";
					readonly type: "address";
				}
			];
			readonly name: "balanceOf";
			readonly outputs: readonly [
				{
					readonly internalType: "uint256";
					readonly name: "";
					readonly type: "uint256";
				}
			];
			readonly stateMutability: "view";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "uint256";
					readonly name: "value";
					readonly type: "uint256";
				}
			];
			readonly name: "burn";
			readonly outputs: readonly [
			];
			readonly stateMutability: "nonpayable";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "address";
					readonly name: "account";
					readonly type: "address";
				},
				{
					readonly internalType: "uint256";
					readonly name: "value";
					readonly type: "uint256";
				}
			];
			readonly name: "burnFrom";
			readonly outputs: readonly [
			];
			readonly stateMutability: "nonpayable";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
			];
			readonly name: "decimals";
			readonly outputs: readonly [
				{
					readonly internalType: "uint8";
					readonly name: "";
					readonly type: "uint8";
				}
			];
			readonly stateMutability: "view";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
			];
			readonly name: "eip712Domain";
			readonly outputs: readonly [
				{
					readonly internalType: "bytes1";
					readonly name: "fields";
					readonly type: "bytes1";
				},
				{
					readonly internalType: "string";
					readonly name: "name";
					readonly type: "string";
				},
				{
					readonly internalType: "string";
					readonly name: "version";
					readonly type: "string";
				},
				{
					readonly internalType: "uint256";
					readonly name: "chainId";
					readonly type: "uint256";
				},
				{
					readonly internalType: "address";
					readonly name: "verifyingContract";
					readonly type: "address";
				},
				{
					readonly internalType: "bytes32";
					readonly name: "salt";
					readonly type: "bytes32";
				},
				{
					readonly internalType: "uint256[]";
					readonly name: "extensions";
					readonly type: "uint256[]";
				}
			];
			readonly stateMutability: "view";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "address";
					readonly name: "to";
					readonly type: "address";
				},
				{
					readonly internalType: "uint256";
					readonly name: "amount";
					readonly type: "uint256";
				}
			];
			readonly name: "mint";
			readonly outputs: readonly [
			];
			readonly stateMutability: "nonpayable";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "uint256";
					readonly name: "amount";
					readonly type: "uint256";
				}
			];
			readonly name: "mint";
			readonly outputs: readonly [
			];
			readonly stateMutability: "nonpayable";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
			];
			readonly name: "name";
			readonly outputs: readonly [
				{
					readonly internalType: "string";
					readonly name: "";
					readonly type: "string";
				}
			];
			readonly stateMutability: "view";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "address";
					readonly name: "owner";
					readonly type: "address";
				}
			];
			readonly name: "nonces";
			readonly outputs: readonly [
				{
					readonly internalType: "uint256";
					readonly name: "";
					readonly type: "uint256";
				}
			];
			readonly stateMutability: "view";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
			];
			readonly name: "owner";
			readonly outputs: readonly [
				{
					readonly internalType: "address";
					readonly name: "";
					readonly type: "address";
				}
			];
			readonly stateMutability: "view";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "address";
					readonly name: "owner";
					readonly type: "address";
				},
				{
					readonly internalType: "address";
					readonly name: "spender";
					readonly type: "address";
				},
				{
					readonly internalType: "uint256";
					readonly name: "value";
					readonly type: "uint256";
				},
				{
					readonly internalType: "uint256";
					readonly name: "deadline";
					readonly type: "uint256";
				},
				{
					readonly internalType: "uint8";
					readonly name: "v";
					readonly type: "uint8";
				},
				{
					readonly internalType: "bytes32";
					readonly name: "r";
					readonly type: "bytes32";
				},
				{
					readonly internalType: "bytes32";
					readonly name: "s";
					readonly type: "bytes32";
				}
			];
			readonly name: "permit";
			readonly outputs: readonly [
			];
			readonly stateMutability: "nonpayable";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
			];
			readonly name: "renounceOwnership";
			readonly outputs: readonly [
			];
			readonly stateMutability: "nonpayable";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
			];
			readonly name: "symbol";
			readonly outputs: readonly [
				{
					readonly internalType: "string";
					readonly name: "";
					readonly type: "string";
				}
			];
			readonly stateMutability: "view";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
			];
			readonly name: "totalSupply";
			readonly outputs: readonly [
				{
					readonly internalType: "uint256";
					readonly name: "";
					readonly type: "uint256";
				}
			];
			readonly stateMutability: "view";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "address";
					readonly name: "to";
					readonly type: "address";
				},
				{
					readonly internalType: "uint256";
					readonly name: "value";
					readonly type: "uint256";
				}
			];
			readonly name: "transfer";
			readonly outputs: readonly [
				{
					readonly internalType: "bool";
					readonly name: "";
					readonly type: "bool";
				}
			];
			readonly stateMutability: "nonpayable";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "address";
					readonly name: "from";
					readonly type: "address";
				},
				{
					readonly internalType: "address";
					readonly name: "to";
					readonly type: "address";
				},
				{
					readonly internalType: "uint256";
					readonly name: "value";
					readonly type: "uint256";
				}
			];
			readonly name: "transferFrom";
			readonly outputs: readonly [
				{
					readonly internalType: "bool";
					readonly name: "";
					readonly type: "bool";
				}
			];
			readonly stateMutability: "nonpayable";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
				{
					readonly internalType: "address";
					readonly name: "newOwner";
					readonly type: "address";
				}
			];
			readonly name: "transferOwnership";
			readonly outputs: readonly [
			];
			readonly stateMutability: "nonpayable";
			readonly type: "function";
		}
	];
	static createInterface(): ERC20MockInterface;
	static connect(address: string, runner?: ContractRunner | null): ERC20Mock;
}
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
export declare const arbNetworks: Record<number, ArbNetworkConfig>;
export declare const NODE_INTERFACE_ADDRESS = "0x00000000000000000000000000000000000000C8";
export declare const ARB_RETRYABLE_TX = "0x000000000000000000000000000000000000006E";
export declare function getArbNetwork(arbHelper: ArbHelper): Promise<ArbNetworkConfig>;
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
	creationId: string;
	sender: string;
	messageNumber: bigint;
	parentBaseFee: bigint;
	messageData: RetryableMessageData;
}
export declare function submitRetryableMessageDataParser(eventData: string): RetryableMessageData;
export declare function getRetryableCreationId({ chainId, sender, messageNumber, parentBaseFee, messageData, }: RetryableMessage): string;
export interface L2TransactionRequest extends TransactionRequest {
	l2CallValue?: bigint;
	excessFeeRefundAddress?: string;
	callValueRefundAddress?: string;
}
export declare class ArbHelper {
	parentProvider: Provider;
	childProvider: Provider;
	arbNetworkConfig: Promise<ArbNetworkConfig>;
	constructor({ parentProvider, childProvider }: {
		parentProvider: Provider;
		childProvider: Provider;
	});
	estimateParentToChildFees({ from, to, l2CallValue, excessFeeRefundAddress, callValueRefundAddress, data, }: L2TransactionRequest): Promise<{
		gasLimit: number;
		gasPriceBid: bigint;
		maxSubmissionCost: bigint;
		maxFeePerGas: bigint;
		deposit: bigint;
	}>;
	/**
	 * Parse Cross-chain transaction info from parent chain transaction receipts
	 * (Does not validate on child chain due to complexity and possible failures with eth_getLogs)
	 * (It is recommended to have dedicated transfer nonce because parsing arbitrum bridge txs sucks)
	 * (This function may break on ArbOs upgrade, use it with caution!)
	 */
	parseParentToChildMessage(txReceipt: TransactionReceipt | null): Promise<RetryableMessage[]>;
}
export declare function getTokenInfo(token: unknown): Promise<{
	name: string;
	symbol: string;
	decimals: number;
	totalSupply: string;
}>;
export declare function getArwBalance(L1Token: unknown, L2Token: unknown, user?: SignerWithAddress | string): Promise<{
	l1Supply: number;
	l1Balance: number;
	l2Supply: number;
	l2Balance: number;
}>;
export declare function getParentToChildMessageGasParams({ arbHelper, L1Token, L2Token, L1Gateway, L2Gateway, from, to, value, data, msg, }: {
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
}): Promise<{
	from: string;
	to: string;
	value: bigint;
	data: string;
	msgData: string;
	params: {
		gasLimit: number;
		gasPriceBid: bigint;
		maxSubmissionCost: bigint;
		maxFeePerGas: bigint;
		deposit: bigint;
	};
}>;
export declare function bridgeArwArb({ arbHelper, L1Token, L2Token, L1Gateway, L2Gateway, from, to, value, data, msg, }: {
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
}): Promise<ContractTransaction>;
export declare function bnToHex(bn: bigint | number | string): string;
export declare function addressFromBigInt(bn: bigint): string;

declare namespace outboxSol {
	export { Outbox };
}
declare namespace absOutboxSol {
	export { AbsOutbox };
}
declare namespace iBridgeSol {
	export { IBridge };
}
declare namespace iDelayedMessageProviderSol {
	export { IDelayedMessageProvider };
}
declare namespace iInboxSol {
	export { IInbox };
}
declare namespace iInboxBaseSol {
	export { IInboxBase };
}
declare namespace iOutboxSol {
	export { IOutbox };
}
declare namespace iOwnableSol {
	export { IOwnable };
}
declare namespace iSequencerInboxSol {
	export { IFeeTokenPricer, ISequencerInbox };
}
declare namespace precompiles {
	export { arbSysSol };
}
declare namespace iGasRefunderSol {
	export { IGasRefunder };
}
declare namespace nodeInterfaceSol {
	export { NodeInterface };
}
declare namespace arbSysSol {
	export { ArbSys };
}
declare namespace bridge {
	export { absOutboxSol, iBridgeSol, iDelayedMessageProviderSol, iInboxBaseSol, iInboxSol, iOutboxSol, iOwnableSol, iSequencerInboxSol, outboxSol };
}
declare namespace libraries {
	export { iGasRefunderSol };
}
declare namespace nodeInterface {
	export { nodeInterfaceSol };
}
declare namespace src {
	export { bridge, libraries, nodeInterface, precompiles };
}
declare namespace nitroContracts {
	export { src };
}
declare namespace factories {
	export { arbitrum$2 as arbitrum, contracts$1 as contracts, openzeppelin };
}
declare namespace ownableSol {
	export { Ownable };
}
declare namespace utils {
	export { addressSol, cryptography, errorsSol, introspection, math, noncesSol, shortStringsSol, stringsSol };
}
declare namespace draftIerc6093Sol {
	export { IERC1155Errors, IERC20Errors, IERC721Errors };
}
declare namespace ierc1363Sol {
	export { IERC1363 };
}
declare namespace ierc1967Sol {
	export { IERC1967 };
}
declare namespace ierc5267Sol {
	export { IERC5267 };
}
declare namespace erc1967UtilsSol {
	export { ERC1967Utils };
}
declare namespace beacon {
	export { iBeaconSol };
}
declare namespace iBeaconSol {
	export { IBeacon };
}
declare namespace erc1967 {
	export { erc1967UtilsSol };
}
declare namespace proxySol {
	export { Proxy$1 as Proxy };
}
declare namespace ierc20PermitSol {
	export { IERC20Permit };
}
declare namespace erc20BurnableSol {
	export { ERC20Burnable };
}
declare namespace erc20PermitSol {
	export { ERC20Permit };
}
declare namespace ierc20MetadataSol {
	export { IERC20Metadata };
}
declare namespace utils$1 {
	export { safeErc20Sol };
}
declare namespace safeErc20Sol {
	export { SafeERC20 };
}
declare namespace erc20Sol {
	export { ERC20 };
}
declare namespace ierc20Sol {
	export { IERC20 };
}
declare namespace extensions {
	export { erc20BurnableSol, erc20PermitSol, ierc20MetadataSol, ierc20PermitSol };
}
declare namespace erc20 {
	export { erc20Sol, extensions, ierc20Sol, utils$1 as utils };
}
declare namespace eip712Sol {
	export { EIP712 };
}
declare namespace ecdsaSol {
	export { ECDSA };
}
declare namespace math {
	export { safeCastSol };
}
declare namespace ierc165Sol {
	export { IERC165 };
}
declare namespace safeCastSol {
	export { SafeCast };
}
declare namespace addressSol {
	export { Address };
}
declare namespace errorsSol {
	export { Errors };
}
declare namespace noncesSol {
	export { Nonces };
}
declare namespace shortStringsSol {
	export { ShortStrings };
}
declare namespace stringsSol {
	export { Strings };
}
declare namespace cryptography {
	export { ecdsaSol, eip712Sol };
}
declare namespace introspection {
	export { ierc165Sol };
}
declare namespace access {
	export { ownableSol };
}
declare namespace interfaces {
	export { draftIerc6093Sol, ierc1363Sol, ierc1967Sol, ierc5267Sol };
}
declare namespace proxy {
	export { beacon, erc1967, proxySol };
}
declare namespace token {
	export { erc20 };
}
declare namespace contractsUpgradeable {
	export { access$1 as access, proxy$1 as proxy, utils$2 as utils };
}
declare namespace ownableUpgradeableSol {
	export { OwnableUpgradeable };
}
declare namespace utils$2 {
	export { contextUpgradeableSol };
}
declare namespace initializableSol {
	export { Initializable };
}
declare namespace utils$3 {
	export { initializableSol };
}
declare namespace contextUpgradeableSol {
	export { ContextUpgradeable };
}
declare namespace access$1 {
	export { ownableUpgradeableSol };
}
declare namespace proxy$1 {
	export { utils$3 as utils };
}
declare namespace contracts {
	export { access, interfaces, proxy, token, utils };
}
declare namespace greeterParentSol {
	export { GreeterParent };
}
declare namespace arbGatewaySol {
	export { ArbGateway };
}
declare namespace arbGatewaySettleSol {
	export { ArbGatewaySettle };
}
declare namespace greeterSol {
	export { Greeter };
}
declare namespace greeterChildSol {
	export { GreeterChild };
}
declare namespace tokens {
	export { arowanaSol, erc20MockSol };
}
declare namespace iInitializableProxySol {
	export { IInitializableProxy };
}
declare namespace ierc20Sol$1 {
	export { IERC20Exp, IERC20Mintable };
}
declare namespace iGatewaySol {
	export { IGateway };
}
declare namespace withSettlerSol {
	export { WithSettler };
}
declare namespace sigLibSol {
	export { SigLib };
}
declare namespace initializableProxySol {
	export { InitializableProxy };
}
declare namespace erc20MockSol {
	export { ERC20Mock };
}
declare namespace arowanaSol {
	export { Arowana };
}
declare namespace lockSol {
	export { Lock$1 as Lock };
}
declare namespace arbitrum {
	export { arbGatewaySettleSol, arbGatewaySol, greeterChildSol, greeterParentSol, greeterSol };
}
declare namespace interfaces$1 {
	export { iGatewaySol, iInitializableProxySol, ierc20Sol$1 as ierc20Sol };
}
declare namespace libraries$1 {
	export { sigLibSol, withSettlerSol };
}
declare namespace proxy$2 {
	export { initializableProxySol };
}
declare namespace outboxSol$1 {
	export { Outbox__factory };
}
declare namespace absOutboxSol$1 {
	export { AbsOutbox__factory };
}
declare namespace iBridgeSol$1 {
	export { IBridge__factory };
}
declare namespace iDelayedMessageProviderSol$1 {
	export { IDelayedMessageProvider__factory };
}
declare namespace iInboxSol$1 {
	export { IInbox__factory };
}
declare namespace iInboxBaseSol$1 {
	export { IInboxBase__factory };
}
declare namespace iOutboxSol$1 {
	export { IOutbox__factory };
}
declare namespace iOwnableSol$1 {
	export { IOwnable__factory };
}
declare namespace iSequencerInboxSol$1 {
	export { IFeeTokenPricer__factory, ISequencerInbox__factory };
}
declare namespace precompiles$1 {
	export { arbSysSol$1 as arbSysSol };
}
declare namespace iGasRefunderSol$1 {
	export { IGasRefunder__factory };
}
declare namespace nodeInterfaceSol$1 {
	export { NodeInterface__factory };
}
declare namespace arbSysSol$1 {
	export { ArbSys__factory };
}
declare namespace bridge$1 {
	export { absOutboxSol$1 as absOutboxSol, iBridgeSol$1 as iBridgeSol, iDelayedMessageProviderSol$1 as iDelayedMessageProviderSol, iInboxBaseSol$1 as iInboxBaseSol, iInboxSol$1 as iInboxSol, iOutboxSol$1 as iOutboxSol, iOwnableSol$1 as iOwnableSol, iSequencerInboxSol$1 as iSequencerInboxSol, outboxSol$1 as outboxSol };
}
declare namespace libraries$2 {
	export { iGasRefunderSol$1 as iGasRefunderSol };
}
declare namespace nodeInterface$1 {
	export { nodeInterfaceSol$1 as nodeInterfaceSol };
}
declare namespace src$1 {
	export { bridge$1 as bridge, libraries$2 as libraries, nodeInterface$1 as nodeInterface, precompiles$1 as precompiles };
}
declare namespace nitroContracts$1 {
	export { src$1 as src };
}
declare namespace contracts$1 {
	export { arbitrum$1 as arbitrum, interfaces$3 as interfaces, libraries$3 as libraries, lockSol$1 as lockSol, proxy$5 as proxy, tokens$1 as tokens };
}
declare namespace ownableSol$1 {
	export { Ownable__factory };
}
declare namespace utils$4 {
	export { addressSol$1 as addressSol, cryptography$1 as cryptography, errorsSol$1 as errorsSol, introspection$1 as introspection, math$1 as math, noncesSol$1 as noncesSol, shortStringsSol$1 as shortStringsSol, stringsSol$1 as stringsSol };
}
declare namespace draftIerc6093Sol$1 {
	export { IERC1155Errors__factory, IERC20Errors__factory, IERC721Errors__factory };
}
declare namespace ierc1363Sol$1 {
	export { IERC1363__factory };
}
declare namespace ierc1967Sol$1 {
	export { IERC1967__factory };
}
declare namespace ierc5267Sol$1 {
	export { IERC5267__factory };
}
declare namespace erc1967UtilsSol$1 {
	export { ERC1967Utils__factory };
}
declare namespace beacon$1 {
	export { iBeaconSol$1 as iBeaconSol };
}
declare namespace iBeaconSol$1 {
	export { IBeacon__factory };
}
declare namespace erc1967$1 {
	export { erc1967UtilsSol$1 as erc1967UtilsSol };
}
declare namespace proxySol$1 {
	export { Proxy__factory };
}
declare namespace ierc20PermitSol$1 {
	export { IERC20Permit__factory };
}
declare namespace erc20BurnableSol$1 {
	export { ERC20Burnable__factory };
}
declare namespace erc20PermitSol$1 {
	export { ERC20Permit__factory };
}
declare namespace ierc20MetadataSol$1 {
	export { IERC20Metadata__factory };
}
declare namespace utils$5 {
	export { safeErc20Sol$1 as safeErc20Sol };
}
declare namespace safeErc20Sol$1 {
	export { SafeERC20__factory };
}
declare namespace erc20Sol$1 {
	export { ERC20__factory };
}
declare namespace ierc20Sol$2 {
	export { IERC20__factory };
}
declare namespace extensions$1 {
	export { erc20BurnableSol$1 as erc20BurnableSol, erc20PermitSol$1 as erc20PermitSol, ierc20MetadataSol$1 as ierc20MetadataSol, ierc20PermitSol$1 as ierc20PermitSol };
}
declare namespace erc20$1 {
	export { erc20Sol$1 as erc20Sol, extensions$1 as extensions, ierc20Sol$2 as ierc20Sol, utils$5 as utils };
}
declare namespace eip712Sol$1 {
	export { EIP712__factory };
}
declare namespace ecdsaSol$1 {
	export { ECDSA__factory };
}
declare namespace math$1 {
	export { safeCastSol$1 as safeCastSol };
}
declare namespace ierc165Sol$1 {
	export { IERC165__factory };
}
declare namespace safeCastSol$1 {
	export { SafeCast__factory };
}
declare namespace addressSol$1 {
	export { Address__factory };
}
declare namespace errorsSol$1 {
	export { Errors__factory };
}
declare namespace noncesSol$1 {
	export { Nonces__factory };
}
declare namespace shortStringsSol$1 {
	export { ShortStrings__factory };
}
declare namespace stringsSol$1 {
	export { Strings__factory };
}
declare namespace cryptography$1 {
	export { ecdsaSol$1 as ecdsaSol, eip712Sol$1 as eip712Sol };
}
declare namespace introspection$1 {
	export { ierc165Sol$1 as ierc165Sol };
}
declare namespace access$2 {
	export { ownableSol$1 as ownableSol };
}
declare namespace interfaces$2 {
	export { draftIerc6093Sol$1 as draftIerc6093Sol, ierc1363Sol$1 as ierc1363Sol, ierc1967Sol$1 as ierc1967Sol, ierc5267Sol$1 as ierc5267Sol };
}
declare namespace proxy$3 {
	export { beacon$1 as beacon, erc1967$1 as erc1967, proxySol$1 as proxySol };
}
declare namespace token$1 {
	export { erc20$1 as erc20 };
}
declare namespace contractsUpgradeable$1 {
	export { access$3 as access, proxy$4 as proxy, utils$6 as utils };
}
declare namespace ownableUpgradeableSol$1 {
	export { OwnableUpgradeable__factory };
}
declare namespace utils$6 {
	export { contextUpgradeableSol$1 as contextUpgradeableSol };
}
declare namespace initializableSol$1 {
	export { Initializable__factory };
}
declare namespace utils$7 {
	export { initializableSol$1 as initializableSol };
}
declare namespace contextUpgradeableSol$1 {
	export { ContextUpgradeable__factory };
}
declare namespace access$3 {
	export { ownableUpgradeableSol$1 as ownableUpgradeableSol };
}
declare namespace proxy$4 {
	export { utils$7 as utils };
}
declare namespace contracts$2 {
	export { access$2 as access, interfaces$2 as interfaces, proxy$3 as proxy, token$1 as token, utils$4 as utils };
}
declare namespace greeterParentSol$1 {
	export { GreeterParent__factory };
}
declare namespace arbGatewaySol$1 {
	export { ArbGateway__factory };
}
declare namespace arbGatewaySettleSol$1 {
	export { ArbGatewaySettle__factory };
}
declare namespace greeterSol$1 {
	export { Greeter__factory };
}
declare namespace greeterChildSol$1 {
	export { GreeterChild__factory };
}
declare namespace tokens$1 {
	export { arowanaSol$1 as arowanaSol, erc20MockSol$1 as erc20MockSol };
}
declare namespace iInitializableProxySol$1 {
	export { IInitializableProxy__factory };
}
declare namespace ierc20Sol$3 {
	export { IERC20Exp__factory, IERC20Mintable__factory };
}
declare namespace iGatewaySol$1 {
	export { IGateway__factory };
}
declare namespace withSettlerSol$1 {
	export { WithSettler__factory };
}
declare namespace sigLibSol$1 {
	export { SigLib__factory };
}
declare namespace initializableProxySol$1 {
	export { InitializableProxy__factory };
}
declare namespace erc20MockSol$1 {
	export { ERC20Mock__factory };
}
declare namespace arowanaSol$1 {
	export { Arowana__factory };
}
declare namespace lockSol$1 {
	export { Lock__factory };
}
declare namespace arbitrum$1 {
	export { arbGatewaySettleSol$1 as arbGatewaySettleSol, arbGatewaySol$1 as arbGatewaySol, greeterChildSol$1 as greeterChildSol, greeterParentSol$1 as greeterParentSol, greeterSol$1 as greeterSol };
}
declare namespace interfaces$3 {
	export { iGatewaySol$1 as iGatewaySol, iInitializableProxySol$1 as iInitializableProxySol, ierc20Sol$3 as ierc20Sol };
}
declare namespace libraries$3 {
	export { sigLibSol$1 as sigLibSol, withSettlerSol$1 as withSettlerSol };
}
declare namespace proxy$5 {
	export { initializableProxySol$1 as initializableProxySol };
}
declare namespace arbitrum$2 {
	export { nitroContracts$1 as nitroContracts };
}
declare namespace openzeppelin {
	export { contracts$2 as contracts, contractsUpgradeable$1 as contractsUpgradeable };
}
declare namespace arbitrum$3 {
	export { nitroContracts };
}
declare namespace openzeppelin$1 {
	export { contracts, contractsUpgradeable };
}
declare namespace contracts$3 {
	export { arbitrum, interfaces$1 as interfaces, libraries$1 as libraries, lockSol, proxy$2 as proxy, tokens };
}

export {
	Lock$1 as Lock,
	Proxy$1 as Proxy,
	arbitrum$3 as arbitrum,
	contracts$3 as contracts,
	factories,
	openzeppelin$1 as openzeppelin,
};

export {};
