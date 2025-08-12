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
declare namespace ISequencerInbox {
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
export interface ARWSupplyInterface extends Interface {
	getFunction(nameOrSignature: "ARW" | "addExcludedAddress" | "circulatingSupply" | "excludedAddresses" | "excludedSupply" | "initialize" | "owner" | "removeExcludedaddress" | "renounceOwnership" | "transferOwnership"): FunctionFragment;
	getEvent(nameOrSignatureOrTopic: "AddExcludedAddress" | "Initialized(uint64)" | "Initialized(address)" | "OwnershipTransferred" | "RemoveExcludedAddress"): EventFragment;
	encodeFunctionData(functionFragment: "ARW", values?: undefined): string;
	encodeFunctionData(functionFragment: "addExcludedAddress", values: [
		AddressLike
	]): string;
	encodeFunctionData(functionFragment: "circulatingSupply", values?: undefined): string;
	encodeFunctionData(functionFragment: "excludedAddresses", values?: undefined): string;
	encodeFunctionData(functionFragment: "excludedSupply", values?: undefined): string;
	encodeFunctionData(functionFragment: "initialize", values: [
		AddressLike
	]): string;
	encodeFunctionData(functionFragment: "owner", values?: undefined): string;
	encodeFunctionData(functionFragment: "removeExcludedaddress", values: [
		AddressLike
	]): string;
	encodeFunctionData(functionFragment: "renounceOwnership", values?: undefined): string;
	encodeFunctionData(functionFragment: "transferOwnership", values: [
		AddressLike
	]): string;
	decodeFunctionResult(functionFragment: "ARW", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "addExcludedAddress", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "circulatingSupply", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "excludedAddresses", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "excludedSupply", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "initialize", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "removeExcludedaddress", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "renounceOwnership", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "transferOwnership", data: BytesLike): Result;
}
declare namespace AddExcludedAddressEvent {
	type InputTuple = [
		excluded: AddressLike
	];
	type OutputTuple = [
		excluded: string
	];
	interface OutputObject {
		excluded: string;
	}
	type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
	type Filter = TypedDeferredTopicFilter<Event>;
	type Log = TypedEventLog<Event>;
	type LogDescription = TypedLogDescription<Event>;
}
declare namespace Initialized_uint64_Event {
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
declare namespace Initialized_address_Event {
	type InputTuple = [
		arw: AddressLike
	];
	type OutputTuple = [
		arw: string
	];
	interface OutputObject {
		arw: string;
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
declare namespace RemoveExcludedAddressEvent {
	type InputTuple = [
		excluded: AddressLike
	];
	type OutputTuple = [
		excluded: string
	];
	interface OutputObject {
		excluded: string;
	}
	type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
	type Filter = TypedDeferredTopicFilter<Event>;
	type Log = TypedEventLog<Event>;
	type LogDescription = TypedLogDescription<Event>;
}
export interface ARWSupply extends BaseContract {
	connect(runner?: ContractRunner | null): ARWSupply;
	waitForDeployment(): Promise<this>;
	interface: ARWSupplyInterface;
	queryFilter<TCEvent extends TypedContractEvent>(event: TCEvent, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
	queryFilter<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
	on<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
	on<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
	once<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
	once<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
	listeners<TCEvent extends TypedContractEvent>(event: TCEvent): Promise<Array<TypedListener<TCEvent>>>;
	listeners(eventName?: string): Promise<Array<Listener>>;
	removeAllListeners<TCEvent extends TypedContractEvent>(event?: TCEvent): Promise<this>;
	ARW: TypedContractMethod<[
	], [
		string
	], "view">;
	addExcludedAddress: TypedContractMethod<[
		_excluded: AddressLike
	], [
		void
	], "nonpayable">;
	circulatingSupply: TypedContractMethod<[
	], [
		bigint
	], "view">;
	excludedAddresses: TypedContractMethod<[
	], [
		string[]
	], "view">;
	excludedSupply: TypedContractMethod<[
	], [
		bigint
	], "view">;
	initialize: TypedContractMethod<[
		_ARW: AddressLike
	], [
		void
	], "nonpayable">;
	owner: TypedContractMethod<[
	], [
		string
	], "view">;
	removeExcludedaddress: TypedContractMethod<[
		_excluded: AddressLike
	], [
		void
	], "nonpayable">;
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
	getFunction(nameOrSignature: "ARW"): TypedContractMethod<[
	], [
		string
	], "view">;
	getFunction(nameOrSignature: "addExcludedAddress"): TypedContractMethod<[
		_excluded: AddressLike
	], [
		void
	], "nonpayable">;
	getFunction(nameOrSignature: "circulatingSupply"): TypedContractMethod<[
	], [
		bigint
	], "view">;
	getFunction(nameOrSignature: "excludedAddresses"): TypedContractMethod<[
	], [
		string[]
	], "view">;
	getFunction(nameOrSignature: "excludedSupply"): TypedContractMethod<[
	], [
		bigint
	], "view">;
	getFunction(nameOrSignature: "initialize"): TypedContractMethod<[
		_ARW: AddressLike
	], [
		void
	], "nonpayable">;
	getFunction(nameOrSignature: "owner"): TypedContractMethod<[
	], [
		string
	], "view">;
	getFunction(nameOrSignature: "removeExcludedaddress"): TypedContractMethod<[
		_excluded: AddressLike
	], [
		void
	], "nonpayable">;
	getFunction(nameOrSignature: "renounceOwnership"): TypedContractMethod<[
	], [
		void
	], "nonpayable">;
	getFunction(nameOrSignature: "transferOwnership"): TypedContractMethod<[
		newOwner: AddressLike
	], [
		void
	], "nonpayable">;
	getEvent(key: "AddExcludedAddress"): TypedContractEvent<AddExcludedAddressEvent.InputTuple, AddExcludedAddressEvent.OutputTuple, AddExcludedAddressEvent.OutputObject>;
	getEvent(key: "Initialized(uint64)"): TypedContractEvent<Initialized_uint64_Event.InputTuple, Initialized_uint64_Event.OutputTuple, Initialized_uint64_Event.OutputObject>;
	getEvent(key: "Initialized(address)"): TypedContractEvent<Initialized_address_Event.InputTuple, Initialized_address_Event.OutputTuple, Initialized_address_Event.OutputObject>;
	getEvent(key: "OwnershipTransferred"): TypedContractEvent<OwnershipTransferredEvent$2.InputTuple, OwnershipTransferredEvent$2.OutputTuple, OwnershipTransferredEvent$2.OutputObject>;
	getEvent(key: "RemoveExcludedAddress"): TypedContractEvent<RemoveExcludedAddressEvent.InputTuple, RemoveExcludedAddressEvent.OutputTuple, RemoveExcludedAddressEvent.OutputObject>;
	filters: {
		"AddExcludedAddress(address)": TypedContractEvent<AddExcludedAddressEvent.InputTuple, AddExcludedAddressEvent.OutputTuple, AddExcludedAddressEvent.OutputObject>;
		AddExcludedAddress: TypedContractEvent<AddExcludedAddressEvent.InputTuple, AddExcludedAddressEvent.OutputTuple, AddExcludedAddressEvent.OutputObject>;
		"Initialized(uint64)": TypedContractEvent<Initialized_uint64_Event.InputTuple, Initialized_uint64_Event.OutputTuple, Initialized_uint64_Event.OutputObject>;
		"Initialized(address)": TypedContractEvent<Initialized_address_Event.InputTuple, Initialized_address_Event.OutputTuple, Initialized_address_Event.OutputObject>;
		"OwnershipTransferred(address,address)": TypedContractEvent<OwnershipTransferredEvent$2.InputTuple, OwnershipTransferredEvent$2.OutputTuple, OwnershipTransferredEvent$2.OutputObject>;
		OwnershipTransferred: TypedContractEvent<OwnershipTransferredEvent$2.InputTuple, OwnershipTransferredEvent$2.OutputTuple, OwnershipTransferredEvent$2.OutputObject>;
		"RemoveExcludedAddress(address)": TypedContractEvent<RemoveExcludedAddressEvent.InputTuple, RemoveExcludedAddressEvent.OutputTuple, RemoveExcludedAddressEvent.OutputObject>;
		RemoveExcludedAddress: TypedContractEvent<RemoveExcludedAddressEvent.InputTuple, RemoveExcludedAddressEvent.OutputTuple, RemoveExcludedAddressEvent.OutputObject>;
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
declare namespace ArbGateway {
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
	getFunction(nameOrSignature: "arbsys" | "bridgeFrom" | "bridgeMsg" | "bridgeTo" | "bridgeToPermit" | "checkArb" | "convertAmount" | "inbox" | "initializeGateway" | "nonce" | "otherGateway" | "otherTokens" | "owner" | "renounceOwnership" | "setBurnToken" | "setOtherToken" | "shouldBurnToken" | "transferOwnership"): FunctionFragment;
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
	encodeFunctionData(functionFragment: "checkArb", values: [
		AddressLike
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
	decodeFunctionResult(functionFragment: "checkArb", data: BytesLike): Result;
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
	checkArb: TypedContractMethod<[
		msgSender: AddressLike
	], [
		boolean
	], "view">;
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
	getFunction(nameOrSignature: "checkArb"): TypedContractMethod<[
		msgSender: AddressLike
	], [
		boolean
	], "view">;
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
	getEvent(key: "OwnershipTransferred"): TypedContractEvent<OwnershipTransferredEvent$3.InputTuple, OwnershipTransferredEvent$3.OutputTuple, OwnershipTransferredEvent$3.OutputObject>;
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
		"OwnershipTransferred(address,address)": TypedContractEvent<OwnershipTransferredEvent$3.InputTuple, OwnershipTransferredEvent$3.OutputTuple, OwnershipTransferredEvent$3.OutputObject>;
		OwnershipTransferred: TypedContractEvent<OwnershipTransferredEvent$3.InputTuple, OwnershipTransferredEvent$3.OutputTuple, OwnershipTransferredEvent$3.OutputObject>;
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
	getFunction(nameOrSignature: "arbsys" | "autoSettle" | "bridgeFrom" | "bridgeMsg" | "bridgeTo" | "bridgeToPermit" | "checkArb" | "convertAmount" | "inbox" | "initializeGateway" | "initializeGatewaySettle" | "nonce" | "orders" | "otherGateway" | "otherTokens" | "owner" | "renounceOwnership" | "setAutoSettle" | "setBurnToken" | "setOtherToken" | "settleOrder" | "shouldBurnToken" | "transferOwnership"): FunctionFragment;
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
	encodeFunctionData(functionFragment: "checkArb", values: [
		AddressLike
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
	decodeFunctionResult(functionFragment: "checkArb", data: BytesLike): Result;
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
	checkArb: TypedContractMethod<[
		msgSender: AddressLike
	], [
		boolean
	], "view">;
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
	getFunction(nameOrSignature: "checkArb"): TypedContractMethod<[
		msgSender: AddressLike
	], [
		boolean
	], "view">;
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
	getEvent(key: "OwnershipTransferred"): TypedContractEvent<OwnershipTransferredEvent$4.InputTuple, OwnershipTransferredEvent$4.OutputTuple, OwnershipTransferredEvent$4.OutputObject>;
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
		"OwnershipTransferred(address,address)": TypedContractEvent<OwnershipTransferredEvent$4.InputTuple, OwnershipTransferredEvent$4.OutputTuple, OwnershipTransferredEvent$4.OutputObject>;
		OwnershipTransferred: TypedContractEvent<OwnershipTransferredEvent$4.InputTuple, OwnershipTransferredEvent$4.OutputTuple, OwnershipTransferredEvent$4.OutputObject>;
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
	getFunction(nameOrSignature: "admin" | "changeAdmin" | "implementation" | "initializeProxy" | "proxyDescription" | "upgradeToAndCall"): FunctionFragment;
	encodeFunctionData(functionFragment: "admin", values?: undefined): string;
	encodeFunctionData(functionFragment: "changeAdmin", values: [
		AddressLike
	]): string;
	encodeFunctionData(functionFragment: "implementation", values?: undefined): string;
	encodeFunctionData(functionFragment: "initializeProxy", values: [
		string,
		AddressLike,
		AddressLike,
		BytesLike
	]): string;
	encodeFunctionData(functionFragment: "proxyDescription", values?: undefined): string;
	encodeFunctionData(functionFragment: "upgradeToAndCall", values: [
		AddressLike,
		BytesLike
	]): string;
	decodeFunctionResult(functionFragment: "admin", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "changeAdmin", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "implementation", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "initializeProxy", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "proxyDescription", data: BytesLike): Result;
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
		_description: string,
		newAdmin: AddressLike,
		newImplementation: AddressLike,
		data: BytesLike
	], [
		void
	], "payable">;
	proxyDescription: TypedContractMethod<[
	], [
		string
	], "view">;
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
		_description: string,
		newAdmin: AddressLike,
		newImplementation: AddressLike,
		data: BytesLike
	], [
		void
	], "payable">;
	getFunction(nameOrSignature: "proxyDescription"): TypedContractMethod<[
	], [
		string
	], "view">;
	getFunction(nameOrSignature: "upgradeToAndCall"): TypedContractMethod<[
		newImplementation: AddressLike,
		data: BytesLike
	], [
		void
	], "payable">;
	filters: {};
}
interface OwnableInterface$1 extends Interface {
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
interface Ownable$1 extends BaseContract {
	connect(runner?: ContractRunner | null): Ownable$1;
	waitForDeployment(): Promise<this>;
	interface: OwnableInterface$1;
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
	getEvent(key: "Initialized"): TypedContractEvent<InitializedEvent$5.InputTuple, InitializedEvent$5.OutputTuple, InitializedEvent$5.OutputObject>;
	getEvent(key: "OwnershipTransferred"): TypedContractEvent<OwnershipTransferredEvent$5.InputTuple, OwnershipTransferredEvent$5.OutputTuple, OwnershipTransferredEvent$5.OutputObject>;
	filters: {
		"Initialized(uint64)": TypedContractEvent<InitializedEvent$5.InputTuple, InitializedEvent$5.OutputTuple, InitializedEvent$5.OutputObject>;
		Initialized: TypedContractEvent<InitializedEvent$5.InputTuple, InitializedEvent$5.OutputTuple, InitializedEvent$5.OutputObject>;
		"OwnershipTransferred(address,address)": TypedContractEvent<OwnershipTransferredEvent$5.InputTuple, OwnershipTransferredEvent$5.OutputTuple, OwnershipTransferredEvent$5.OutputObject>;
		OwnershipTransferred: TypedContractEvent<OwnershipTransferredEvent$5.InputTuple, OwnershipTransferredEvent$5.OutputTuple, OwnershipTransferredEvent$5.OutputObject>;
	};
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
	getFunction(nameOrSignature: "addSettler" | "initializeSettler" | "owner" | "removeSettler" | "renounceOwnership" | "settlers" | "transferOwnership"): FunctionFragment;
	getEvent(nameOrSignatureOrTopic: "AddSettler" | "Initialized" | "OwnershipTransferred" | "RemoveSettler"): EventFragment;
	encodeFunctionData(functionFragment: "addSettler", values: [
		AddressLike
	]): string;
	encodeFunctionData(functionFragment: "initializeSettler", values: [
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
	decodeFunctionResult(functionFragment: "initializeSettler", data: BytesLike): Result;
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
declare namespace InitializedEvent$6 {
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
declare namespace OwnershipTransferredEvent$6 {
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
	initializeSettler: TypedContractMethod<[
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
	getFunction(nameOrSignature: "initializeSettler"): TypedContractMethod<[
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
	getEvent(key: "Initialized"): TypedContractEvent<InitializedEvent$6.InputTuple, InitializedEvent$6.OutputTuple, InitializedEvent$6.OutputObject>;
	getEvent(key: "OwnershipTransferred"): TypedContractEvent<OwnershipTransferredEvent$6.InputTuple, OwnershipTransferredEvent$6.OutputTuple, OwnershipTransferredEvent$6.OutputObject>;
	getEvent(key: "RemoveSettler"): TypedContractEvent<RemoveSettlerEvent.InputTuple, RemoveSettlerEvent.OutputTuple, RemoveSettlerEvent.OutputObject>;
	filters: {
		"AddSettler(address)": TypedContractEvent<AddSettlerEvent.InputTuple, AddSettlerEvent.OutputTuple, AddSettlerEvent.OutputObject>;
		AddSettler: TypedContractEvent<AddSettlerEvent.InputTuple, AddSettlerEvent.OutputTuple, AddSettlerEvent.OutputObject>;
		"Initialized(uint64)": TypedContractEvent<InitializedEvent$6.InputTuple, InitializedEvent$6.OutputTuple, InitializedEvent$6.OutputObject>;
		Initialized: TypedContractEvent<InitializedEvent$6.InputTuple, InitializedEvent$6.OutputTuple, InitializedEvent$6.OutputObject>;
		"OwnershipTransferred(address,address)": TypedContractEvent<OwnershipTransferredEvent$6.InputTuple, OwnershipTransferredEvent$6.OutputTuple, OwnershipTransferredEvent$6.OutputObject>;
		OwnershipTransferred: TypedContractEvent<OwnershipTransferredEvent$6.InputTuple, OwnershipTransferredEvent$6.OutputTuple, OwnershipTransferredEvent$6.OutputObject>;
		"RemoveSettler(address)": TypedContractEvent<RemoveSettlerEvent.InputTuple, RemoveSettlerEvent.OutputTuple, RemoveSettlerEvent.OutputObject>;
		RemoveSettler: TypedContractEvent<RemoveSettlerEvent.InputTuple, RemoveSettlerEvent.OutputTuple, RemoveSettlerEvent.OutputObject>;
	};
}
export interface InitializableProxyInterface extends Interface {
	getFunction(nameOrSignature: "admin" | "changeAdmin" | "changeDescription" | "implementation" | "initializeProxy" | "proxyDescription" | "upgradeToAndCall"): FunctionFragment;
	getEvent(nameOrSignatureOrTopic: "AdminChanged" | "DescriptionChanged" | "Upgraded"): EventFragment;
	encodeFunctionData(functionFragment: "admin", values?: undefined): string;
	encodeFunctionData(functionFragment: "changeAdmin", values: [
		AddressLike
	]): string;
	encodeFunctionData(functionFragment: "changeDescription", values: [
		string
	]): string;
	encodeFunctionData(functionFragment: "implementation", values?: undefined): string;
	encodeFunctionData(functionFragment: "initializeProxy", values: [
		string,
		AddressLike,
		AddressLike,
		BytesLike
	]): string;
	encodeFunctionData(functionFragment: "proxyDescription", values?: undefined): string;
	encodeFunctionData(functionFragment: "upgradeToAndCall", values: [
		AddressLike,
		BytesLike
	]): string;
	decodeFunctionResult(functionFragment: "admin", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "changeAdmin", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "changeDescription", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "implementation", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "initializeProxy", data: BytesLike): Result;
	decodeFunctionResult(functionFragment: "proxyDescription", data: BytesLike): Result;
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
declare namespace DescriptionChangedEvent {
	type InputTuple = [
		description: string
	];
	type OutputTuple = [
		description: string
	];
	interface OutputObject {
		description: string;
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
	changeDescription: TypedContractMethod<[
		_description: string
	], [
		void
	], "nonpayable">;
	implementation: TypedContractMethod<[
	], [
		string
	], "view">;
	initializeProxy: TypedContractMethod<[
		_description: string,
		newAdmin: AddressLike,
		newImplementation: AddressLike,
		data: BytesLike
	], [
		void
	], "payable">;
	proxyDescription: TypedContractMethod<[
	], [
		string
	], "view">;
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
	getFunction(nameOrSignature: "changeDescription"): TypedContractMethod<[
		_description: string
	], [
		void
	], "nonpayable">;
	getFunction(nameOrSignature: "implementation"): TypedContractMethod<[
	], [
		string
	], "view">;
	getFunction(nameOrSignature: "initializeProxy"): TypedContractMethod<[
		_description: string,
		newAdmin: AddressLike,
		newImplementation: AddressLike,
		data: BytesLike
	], [
		void
	], "payable">;
	getFunction(nameOrSignature: "proxyDescription"): TypedContractMethod<[
	], [
		string
	], "view">;
	getFunction(nameOrSignature: "upgradeToAndCall"): TypedContractMethod<[
		newImplementation: AddressLike,
		data: BytesLike
	], [
		void
	], "payable">;
	getEvent(key: "AdminChanged"): TypedContractEvent<AdminChangedEvent$1.InputTuple, AdminChangedEvent$1.OutputTuple, AdminChangedEvent$1.OutputObject>;
	getEvent(key: "DescriptionChanged"): TypedContractEvent<DescriptionChangedEvent.InputTuple, DescriptionChangedEvent.OutputTuple, DescriptionChangedEvent.OutputObject>;
	getEvent(key: "Upgraded"): TypedContractEvent<UpgradedEvent$1.InputTuple, UpgradedEvent$1.OutputTuple, UpgradedEvent$1.OutputObject>;
	filters: {
		"AdminChanged(address,address)": TypedContractEvent<AdminChangedEvent$1.InputTuple, AdminChangedEvent$1.OutputTuple, AdminChangedEvent$1.OutputObject>;
		AdminChanged: TypedContractEvent<AdminChangedEvent$1.InputTuple, AdminChangedEvent$1.OutputTuple, AdminChangedEvent$1.OutputObject>;
		"DescriptionChanged(string)": TypedContractEvent<DescriptionChangedEvent.InputTuple, DescriptionChangedEvent.OutputTuple, DescriptionChangedEvent.OutputObject>;
		DescriptionChanged: TypedContractEvent<DescriptionChangedEvent.InputTuple, DescriptionChangedEvent.OutputTuple, DescriptionChangedEvent.OutputObject>;
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
declare namespace OwnershipTransferredEvent$7 {
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
	getEvent(key: "OwnershipTransferred"): TypedContractEvent<OwnershipTransferredEvent$7.InputTuple, OwnershipTransferredEvent$7.OutputTuple, OwnershipTransferredEvent$7.OutputObject>;
	getEvent(key: "Transfer"): TypedContractEvent<TransferEvent$9.InputTuple, TransferEvent$9.OutputTuple, TransferEvent$9.OutputObject>;
	filters: {
		"Approval(address,address,uint256)": TypedContractEvent<ApprovalEvent$9.InputTuple, ApprovalEvent$9.OutputTuple, ApprovalEvent$9.OutputObject>;
		Approval: TypedContractEvent<ApprovalEvent$9.InputTuple, ApprovalEvent$9.OutputTuple, ApprovalEvent$9.OutputObject>;
		"EIP712DomainChanged()": TypedContractEvent<EIP712DomainChangedEvent$4.InputTuple, EIP712DomainChangedEvent$4.OutputTuple, EIP712DomainChangedEvent$4.OutputObject>;
		EIP712DomainChanged: TypedContractEvent<EIP712DomainChangedEvent$4.InputTuple, EIP712DomainChangedEvent$4.OutputTuple, EIP712DomainChangedEvent$4.OutputObject>;
		"OwnershipTransferred(address,address)": TypedContractEvent<OwnershipTransferredEvent$7.InputTuple, OwnershipTransferredEvent$7.OutputTuple, OwnershipTransferredEvent$7.OutputObject>;
		OwnershipTransferred: TypedContractEvent<OwnershipTransferredEvent$7.InputTuple, OwnershipTransferredEvent$7.OutputTuple, OwnershipTransferredEvent$7.OutputObject>;
		"Transfer(address,address,uint256)": TypedContractEvent<TransferEvent$9.InputTuple, TransferEvent$9.OutputTuple, TransferEvent$9.OutputObject>;
		Transfer: TypedContractEvent<TransferEvent$9.InputTuple, TransferEvent$9.OutputTuple, TransferEvent$9.OutputObject>;
	};
}
declare class AbsOutbox__factory {
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
declare class IBridge__factory {
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
declare class IDelayedMessageProvider__factory {
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
declare class IInbox__factory {
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
declare class IInboxBase__factory {
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
declare class IOutbox__factory {
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
declare class IOwnable__factory {
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
declare class IFeeTokenPricer__factory {
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
declare class ISequencerInbox__factory {
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
declare class Outbox__factory extends ContractFactory {
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
	static readonly bytecode = "0x60a060405230608052348015601357600080fd5b506080516116b66100366000396000818161066a015261088a01526116b66000f3fe608060405234801561001057600080fd5b506004361061012b5760003560e01c806395fcea78116100ad578063c4d66de811610071578063c4d66de81461023e578063c75184df14610251578063cb23bcb514610271578063d5b5cc2314610284578063e78cea92146102a457600080fd5b806395fcea78146101e85780639f0c04bf146101f0578063a04cee6014610203578063ae6dead714610216578063b0f305371461023657600080fd5b80635a129efe116100f45780635a129efe1461018d5780636ae71f12146101b057806372f2a8c7146101b857806380648b02146101c05780638515bc6a146101e057600080fd5b80627436d31461013057806308635a9514610156578063119852711461016b578063288e5b10146101725780634654779014610185575b600080fd5b61014361013e366004610f90565b6102b7565b6040519081526020015b60405180910390f35b6101696101643660046110be565b6102f4565b005b6000610143565b6101696101803660046111bb565b610367565b6101436103a2565b6101a061019b366004611257565b6103d6565b604051901515815260200161014d565b6101696103f3565b6101436105df565b6101c86105fa565b6040516001600160a01b03909116815260200161014d565b610143610620565b610169610660565b6101436101fe366004611270565b61078f565b6101696102113660046112ff565b6107d4565b610143610224366004611257565b60036020526000908152604090205481565b610143610853565b61016961024c366004611321565b610880565b610259600281565b6040516001600160801b03909116815260200161014d565b6000546101c8906001600160a01b031681565b610143610292366004611257565b60026020526000908152604090205481565b6001546101c8906001600160a01b031681565b60006102ec8484846040516020016102d191815260200190565b60405160208183030381529060405280519060200120610a0f565b949350505050565b6000610306898989898989898961078f565b90506103488c8c808060200260200160405190810160405280939291908181526020018383602002808284376000920191909152508e9250859150610ab19050565b6103598a8a8a8a8a8a8a8a8a610bba565b505050505050505050505050565b331561038657604051630e13b69d60e01b815260040160405180910390fd5b610397898989898989898989610bba565b505050505050505050565b6004546000906001600160801b03166002600160801b031981016103c857600091505090565b6001600160801b0316919050565b60008060006103e484610e44565b92509250506102ec8282610e81565b60008054906101000a90046001600160a01b03166001600160a01b0316638da5cb5b6040518163ffffffff1660e01b8152600401602060405180830381865afa158015610444573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906104689190611345565b6001600160a01b0316336001600160a01b03161461051e5760005460408051638da5cb5b60e01b8152905133926001600160a01b031691638da5cb5b9160048083019260209291908290030181865afa1580156104c9573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906104ed9190611345565b604051631194af8760e11b81526001600160a01b039283166004820152911660248201526044015b60405180910390fd5b6001546040805163cb23bcb560e01b815290516000926001600160a01b03169163cb23bcb59160048083019260209291908290030181865afa158015610568573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061058c9190611345565b6000549091506001600160a01b038083169116036105bd5760405163d054909f60e01b815260040160405180910390fd5b600080546001600160a01b0319166001600160a01b0392909216919091179055565b600554600090600181016105f557506000919050565b919050565b6006546000906001600160a01b03166002600160a01b031981016105f557600091505090565b600654600090600160a01b90046001600160601b03166bfffffffffffffffffffffffe19810161065257600091505090565b6001600160601b0316919050565b6001600160a01b037f00000000000000000000000000000000000000000000000000000000000000001630036106a85760405162461bcd60e51b815260040161051590611362565b7fb53127684a568b3173ae13b9f8a6016e243e63b6e8ee1178d6a717850b5d61038054336001600160a01b0382161461070557604051631194af8760e11b81523360048201526001600160a01b0382166024820152604401610515565b6004546001600160801b03908116146107315760405163d0afb66160e01b815260040160405180910390fd5b50506040805160c0810182526001600160801b0380825260208201526000199181018290526001600160a01b0360608201526001600160601b036080820152600060a090910181905260048290556005829055600691909155600755565b600088888888888888886040516020016107b09897969594939291906113ae565b60405160208183030381529060405280519060200120905098975050505050505050565b6000546001600160a01b0316331461081457600054604051630e4cf1bf60e21b81523360048201526001600160a01b039091166024820152604401610515565b60008281526003602052604080822083905551829184917fb4df3847300f076a369cd76d2314b470a1194d9e8a6bb97f1860aee88a5f67489190a35050565b600454600090600160801b90046001600160801b03166002600160801b031981016103c857600091505090565b6001600160a01b037f00000000000000000000000000000000000000000000000000000000000000001630036108c85760405162461bcd60e51b815260040161051590611362565b6001600160a01b0381166108ef57604051631ad0f74360e01b815260040160405180910390fd5b6001546001600160a01b03161561091957604051633bcd329760e21b815260040160405180910390fd5b6040805160c0810182526001600160801b038082526020808301919091526000198284018190526001600160a01b03606084018190526001600160601b036080850152600060a090940184905260048281556005839055600692909255600793909355600180546001600160a01b0319169386169384179055835163cb23bcb560e01b81529351929363cb23bcb593818301939290918290030181865afa1580156109c8573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906109ec9190611345565b600080546001600160a01b0319166001600160a01b039290921691909117905550565b8251600090610100811115610a4257604051637ed6198f60e11b8152600481018290526101006024820152604401610515565b8260005b82811015610aa7576000878281518110610a6257610a62611405565b60200260200101519050816001901b8716600003610a8e57826000528060205260406000209250610a9e565b8060005282602052604060002092505b50600101610a46565b5095945050505050565b610100835110610ad957825160405163ab6a068360e01b815260040161051591815260200190565b8251610ae6906002611518565b8210610b1d578183516002610afb9190611518565b604051630b8a724b60e01b815260048101929092526024820152604401610515565b6000610b2a8484846102b7565b600081815260036020526040902054909150610b5c576040516310e61af960e31b815260048101829052602401610515565b6000806000610b6a86610e44565b925092509250610b7a8282610e81565b15610b9b57604051639715b8d360e01b815260048101879052602401610515565b600092835260026020526040909220600190911b909117905550505050565b6000886001600160a01b0316886001600160a01b03167f20af7f3bbfe38132b8900ae295cd9c8d1914be7052d061a511f3f728dab189648c604051610c0191815260200190565b60405180910390a46000839050600060046040518060c00160405290816000820160009054906101000a90046001600160801b03166001600160801b03166001600160801b031681526020016000820160109054906101000a90046001600160801b03166001600160801b03166001600160801b03168152602001600182015481526020016002820160009054906101000a90046001600160a01b03166001600160a01b03166001600160a01b031681526020016002820160149054906101000a90046001600160601b03166001600160601b03166001600160601b0316815260200160038201548152505090506040518060c00160405280896001600160801b03168152602001876001600160801b031681526020018c60001b81526020018b6001600160a01b03168152602001886001600160601b03168152602001610d47600090565b905280516020808301516001600160801b03908116600160801b02921691909117600455604080830151600555606083015160808401516001600160601b0316600160a01b026001600160a01b039091161760065560a0909201516007558151601f8601829004820281018201909252848252610de3918b918591908890889081908401838280828437600092019190915250610e9092505050565b805160208201516001600160801b03908116600160801b029116176004556040810151600555606081015160808201516001600160601b0316600160a01b026001600160a01b039091161760065560a0015160075550505050505050505050565b6000808080610e5460ff8661153a565b90506000610e6360ff8761154e565b60008381526002602052604090205492979096509194509092505050565b80821c60011615155b92915050565b600154604051639e5d4c4960e01b815260009182916001600160a01b0390911690639e5d4c4990610ec990889088908890600401611586565b6000604051808303816000875af1158015610ee8573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f19168201604052610f1091908101906115cf565b9150915081610f4257805115610f295780518082602001fd5b604051631bb7daad60e11b815260040160405180910390fd5b5050505050565b634e487b7160e01b600052604160045260246000fd5b604051601f8201601f1916810167ffffffffffffffff81118282101715610f8857610f88610f49565b604052919050565b600080600060608486031215610fa557600080fd5b833567ffffffffffffffff811115610fbc57600080fd5b8401601f81018613610fcd57600080fd5b803567ffffffffffffffff811115610fe757610fe7610f49565b8060051b610ff760208201610f5f565b9182526020818401810192908101908984111561101357600080fd5b6020850194505b838510156110395784358083526020958601959093509091019061101a565b9960208901359950604090980135979650505050505050565b6001600160a01b038116811461106757600080fd5b50565b80356105f581611052565b60008083601f84011261108757600080fd5b50813567ffffffffffffffff81111561109f57600080fd5b6020830191508360208285010111156110b757600080fd5b9250929050565b60008060008060008060008060008060006101208c8e0312156110e057600080fd5b8b3567ffffffffffffffff8111156110f757600080fd5b8c01601f81018e1361110857600080fd5b803567ffffffffffffffff81111561111f57600080fd5b8e60208260051b840101111561113457600080fd5b60209182019c509a508c0135985061114e60408d0161106a565b975061115c60608d0161106a565b965060808c0135955060a08c0135945060c08c0135935060e08c013592506101008c013567ffffffffffffffff81111561119557600080fd5b6111a18e828f01611075565b915080935050809150509295989b509295989b9093969950565b60008060008060008060008060006101008a8c0312156111da57600080fd5b8935985060208a01356111ec81611052565b975060408a01356111fc81611052565b965060608a0135955060808a0135945060a08a0135935060c08a0135925060e08a013567ffffffffffffffff81111561123457600080fd5b6112408c828d01611075565b915080935050809150509295985092959850929598565b60006020828403121561126957600080fd5b5035919050565b60008060008060008060008060e0898b03121561128c57600080fd5b883561129781611052565b975060208901356112a781611052565b965060408901359550606089013594506080890135935060a0890135925060c089013567ffffffffffffffff8111156112df57600080fd5b6112eb8b828c01611075565b999c989b5096995094979396929594505050565b6000806040838503121561131257600080fd5b50508035926020909101359150565b60006020828403121561133357600080fd5b813561133e81611052565b9392505050565b60006020828403121561135757600080fd5b815161133e81611052565b6020808252602c908201527f46756e6374696f6e206d7573742062652063616c6c6564207468726f7567682060408201526b19195b1959d85d1958d85b1b60a21b606082015260800190565b6001600160601b03198960601b1681526001600160601b03198860601b166014820152866028820152856048820152846068820152836088820152818360a88301376000910160a801908152979650505050505050565b634e487b7160e01b600052603260045260246000fd5b634e487b7160e01b600052601160045260246000fd5b6001815b600184111561146c578085048111156114505761145061141b565b600184161561145e57908102905b60019390931c928002611435565b935093915050565b60008261148357506001610e8a565b8161149057506000610e8a565b81600181146114a657600281146114b0576114cc565b6001915050610e8a565b60ff8411156114c1576114c161141b565b50506001821b610e8a565b5060208310610133831016604e8410600b84101617156114ef575081810a610e8a565b6114fc6000198484611431565b80600019048211156115105761151061141b565b029392505050565b600061133e8383611474565b634e487b7160e01b600052601260045260246000fd5b60008261154957611549611524565b500490565b60008261155d5761155d611524565b500690565b60005b8381101561157d578181015183820152602001611565565b50506000910152565b60018060a01b038416815282602082015260606040820152600082518060608401526115b9816080850160208701611562565b601f01601f191691909101608001949350505050565b600080604083850312156115e257600080fd5b825180151581146115f257600080fd5b602084015190925067ffffffffffffffff81111561160f57600080fd5b8301601f8101851361162057600080fd5b805167ffffffffffffffff81111561163a5761163a610f49565b61164d601f8201601f1916602001610f5f565b81815286602083850101111561166257600080fd5b611673826020830160208601611562565b809350505050925092905056fea2646970667358221220e99a770594b5702a50d266ad259c2d28d8114270a8570b7dfa275dca46ca372f64736f6c634300081e0033";
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
declare class IGasRefunder__factory {
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
declare class NodeInterface__factory {
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
declare class ArbSys__factory {
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
declare class Ownable__factory {
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
declare class IERC1363__factory {
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
declare class IERC1967__factory {
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
declare class IERC5267__factory {
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
declare class IERC1155Errors__factory {
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
declare class IERC20Errors__factory {
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
declare class IERC721Errors__factory {
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
declare class ERC1967Utils__factory extends ContractFactory {
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
	static readonly bytecode = "0x60566037600b82828239805160001a607314602a57634e487b7160e01b600052600060045260246000fd5b30600052607381538281f3fe73000000000000000000000000000000000000000030146080604052600080fdfea26469706673582212203d0cc6f4ebf77c194bdedecd06cd87a147499b436811583fafed4cb2e9f55a7364736f6c634300081e0033";
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
declare class Proxy__factory {
	static readonly abi: readonly [
		{
			readonly stateMutability: "payable";
			readonly type: "fallback";
		}
	];
	static createInterface(): ProxyInterface;
	static connect(address: string, runner?: ContractRunner | null): Proxy$1;
}
declare class IBeacon__factory {
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
declare class ERC20__factory {
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
declare class IERC20__factory {
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
declare class ERC20Burnable__factory {
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
declare class ERC20Permit__factory {
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
declare class IERC20Metadata__factory {
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
declare class IERC20Permit__factory {
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
declare class SafeERC20__factory extends ContractFactory {
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
	static readonly bytecode = "0x60566037600b82828239805160001a607314602a57634e487b7160e01b600052600060045260246000fd5b30600052607381538281f3fe73000000000000000000000000000000000000000030146080604052600080fdfea264697066735822122069f8fe1b46bdf02ea7c0137a80e720ac188e8930343e9fac3f4f81de580a1d0a64736f6c634300081e0033";
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
declare class Address__factory extends ContractFactory {
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
	static readonly bytecode = "0x60566037600b82828239805160001a607314602a57634e487b7160e01b600052600060045260246000fd5b30600052607381538281f3fe73000000000000000000000000000000000000000030146080604052600080fdfea2646970667358221220e5e86df292c2ca26f62ff3e7eb2a9024cd0e4243d45dc7bc1c5465a971d4215464736f6c634300081e0033";
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
declare class Errors__factory extends ContractFactory {
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
	static readonly bytecode = "0x60566037600b82828239805160001a607314602a57634e487b7160e01b600052600060045260246000fd5b30600052607381538281f3fe73000000000000000000000000000000000000000030146080604052600080fdfea26469706673582212209a41a4f0cc7ace7652452319e17bc006e46185add4d22541975f61b14fa8f33a64736f6c634300081e0033";
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
declare class Nonces__factory {
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
declare class ShortStrings__factory extends ContractFactory {
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
	static readonly bytecode = "0x60566037600b82828239805160001a607314602a57634e487b7160e01b600052600060045260246000fd5b30600052607381538281f3fe73000000000000000000000000000000000000000030146080604052600080fdfea264697066735822122003d88aaa6eba9ea4c0ba3933e94e0a5964f9e63efe384dabe55f66f5a1728e5e64736f6c634300081e0033";
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
declare class Strings__factory extends ContractFactory {
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
	static readonly bytecode = "0x60566037600b82828239805160001a607314602a57634e487b7160e01b600052600060045260246000fd5b30600052607381538281f3fe73000000000000000000000000000000000000000030146080604052600080fdfea2646970667358221220ca8312e82d36213c64d141980d299035a0c64eee8eb7f6347b06cc2f78ac61b164736f6c634300081e0033";
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
declare class ECDSA__factory extends ContractFactory {
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
	static readonly bytecode = "0x60566037600b82828239805160001a607314602a57634e487b7160e01b600052600060045260246000fd5b30600052607381538281f3fe73000000000000000000000000000000000000000030146080604052600080fdfea26469706673582212209447175e61ea77c41719ea7cd701ff1ba374fbf37c43b2b92b555043e528214364736f6c634300081e0033";
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
declare class EIP712__factory {
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
declare class IERC165__factory {
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
declare class SafeCast__factory extends ContractFactory {
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
	static readonly bytecode = "0x60566037600b82828239805160001a607314602a57634e487b7160e01b600052600060045260246000fd5b30600052607381538281f3fe73000000000000000000000000000000000000000030146080604052600080fdfea2646970667358221220207a6091af3a049797b59f084651e20835d20a55fb9c41706a7a23a4dcd2008764736f6c634300081e0033";
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
declare class OwnableUpgradeable__factory {
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
declare class Initializable__factory {
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
declare class ContextUpgradeable__factory {
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
export type ARWSupplyConstructorParams = [
	signer?: Signer
] | ConstructorParameters<typeof ContractFactory>;
declare class ARWSupply__factory extends ContractFactory {
	constructor(...args: ARWSupplyConstructorParams);
	getDeployTransaction(overrides?: NonPayableOverrides & {
		from?: string;
	}): Promise<ContractDeployTransaction>;
	deploy(overrides?: NonPayableOverrides & {
		from?: string;
	}): Promise<ARWSupply & {
		deploymentTransaction(): ContractTransactionResponse;
	}>;
	connect(runner: ContractRunner | null): ARWSupply__factory;
	static readonly bytecode = "0x6080604052348015600f57600080fd5b50610eac8061001f6000396000f3fe608060405234801561001057600080fd5b506004361061009e5760003560e01c80639358928b116100665780639358928b14610139578063a9b54bcd1461014f578063c4d66de814610162578063f2fde38b14610175578063fbb9ee0d1461018857600080fd5b806352ec6716146100a357806365bd5e63146100c1578063715018a6146100d657806389df8136146100de5780638da5cb5b14610109575b600080fd5b6100ab610190565b6040516100b89190610d80565b60405180910390f35b6100d46100cf366004610dcc565b6101a1565b005b6100d461023a565b6000546100f1906001600160a01b031681565b6040516001600160a01b0390911681526020016100b8565b7f9016d09d72d40fdae2fd8ceac6b6234c7706214fd39c1cd1e609a0528c199300546001600160a01b03166100f1565b61014161024e565b6040519081526020016100b8565b6100d461015d366004610dcc565b6102d7565b6100d4610170366004610dcc565b61036c565b6100d4610183366004610dcc565b610904565b610141610942565b606061019c6001610a15565b905090565b6101a9610a29565b6101b4600182610a9f565b6101f75760405162461bcd60e51b815260206004820152600f60248201526e496e76616c6964206164647265737360881b60448201526064015b60405180910390fd5b610202600182610ac6565b506040516001600160a01b038216907f6ade7fc06752ca3786738ecc30afaa9afa43b95e4908d25f416b252537ff533c90600090a250565b610242610a29565b61024c6000610adb565b565b6000610258610942565b60008054906101000a90046001600160a01b03166001600160a01b03166318160ddd6040518163ffffffff1660e01b8152600401602060405180830381865afa1580156102a9573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906102cd9190610df5565b61019c9190610e24565b6102df610a29565b6102ea600182610a9f565b156103295760405162461bcd60e51b815260206004820152600f60248201526e496e76616c6964206164647265737360881b60448201526064016101ee565b610334600182610b4c565b506040516001600160a01b038216907f784d23afa452b9062ecb2423875d1c56e8583688921c7d56f293a0c72645216e90600090a250565b6000610376610b61565b805490915060ff600160401b820416159067ffffffffffffffff1660008115801561039e5750825b905060008267ffffffffffffffff1660011480156103bb5750303b155b9050811580156103c9575080155b156103e75760405163f92ee8a960e01b815260040160405180910390fd5b845467ffffffffffffffff19166001178555831561041157845460ff60401b1916600160401b1785555b61041a33610b8a565b600080546001600160a01b0319166001600160a01b0388169081179091556040519081527f908408e307fc569b417f6cbec5d5a06f44a0a505ac0479b47d421a4b2fd6a1e69060200160405180910390a160408051600d8082526101c08201909252600091602082016101a08036833701905050905073b8c574171ee55be2ddc98e7461f9ebd2de2f00ab816000815181106104b8576104b8610e37565b60200260200101906001600160a01b031690816001600160a01b031681525050731e54223e49ebb025c3fcaed65ce1da9c039c95658160018151811061050057610500610e37565b60200260200101906001600160a01b031690816001600160a01b031681525050732b4e8a0e5e52c65c45692fccf77f10c786bc1e0b8160028151811061054857610548610e37565b60200260200101906001600160a01b031690816001600160a01b03168152505073a0f008b3e3187b247ddc987e52735654048858c98160038151811061059057610590610e37565b60200260200101906001600160a01b031690816001600160a01b0316815250507385225ddfbcc3cd5d5333d1525cb64e43e4c77e75816004815181106105d8576105d8610e37565b60200260200101906001600160a01b031690816001600160a01b0316815250507306088f4b78bbc74570124badb3f9475410dc369a8160058151811061062057610620610e37565b60200260200101906001600160a01b031690816001600160a01b031681525050734af320d6155ac13a962048bc310ed83b1e44e4ae8160068151811061066857610668610e37565b60200260200101906001600160a01b031690816001600160a01b03168152505073754637675bbf31b07f9a114ef59bc78e65737a80816007815181106106b0576106b0610e37565b60200260200101906001600160a01b031690816001600160a01b0316815250507314a77f8656b753be4febab0f8891db0205f7d588816008815181106106f8576106f8610e37565b60200260200101906001600160a01b031690816001600160a01b031681525050732c12b7adab9f02ce1a0aa0e092c2f36487126cce8160098151811061074057610740610e37565b60200260200101906001600160a01b031690816001600160a01b0316815250507317d30a2d883d40090ac1a19a09c635fc967d7d4681600a8151811061078857610788610e37565b60200260200101906001600160a01b031690816001600160a01b031681525050732f19e9d3d3f7f7da27b6a0a2005748e295b6949d81600b815181106107d0576107d0610e37565b60200260200101906001600160a01b031690816001600160a01b031681525050734173f68528dfa76787cc8420c4e8592485456c4381600c8151811061081857610818610e37565b60200260200101906001600160a01b031690816001600160a01b03168152505060005b81518110156108b457600082828151811061085857610858610e37565b60200260200101519050610876816001610b4c90919063ffffffff16565b506040516001600160a01b038216907f784d23afa452b9062ecb2423875d1c56e8583688921c7d56f293a0c72645216e90600090a25060010161083b565b505083156108fc57845460ff60401b19168555604051600181527fc7f505b2f371ae2175ee4913f4499e1f2633a7b5936321eed1cdaeb6115181d29060200160405180910390a15b505050505050565b61090c610a29565b6001600160a01b03811661093657604051631e4fbdf760e01b8152600060048201526024016101ee565b61093f81610adb565b50565b6000808061094e610190565b905060005b8151811015610a0d5760005482516001600160a01b03909116906370a082319084908490811061098557610985610e37565b60200260200101516040518263ffffffff1660e01b81526004016109b891906001600160a01b0391909116815260200190565b602060405180830381865afa1580156109d5573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906109f99190610df5565b610a039084610e4d565b9250600101610953565b509092915050565b60606000610a2283610b9b565b9392505050565b6000610a5c7f9016d09d72d40fdae2fd8ceac6b6234c7706214fd39c1cd1e609a0528c199300546001600160a01b031690565b90506001600160a01b03811615801590610a7f57506001600160a01b0381163314155b1561093f5760405163118cdaa760e01b81523360048201526024016101ee565b6001600160a01b038116600090815260018301602052604081205415155b90505b92915050565b6000610abd836001600160a01b038416610bf7565b7f9016d09d72d40fdae2fd8ceac6b6234c7706214fd39c1cd1e609a0528c19930080546001600160a01b031981166001600160a01b03848116918217845560405192169182907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a3505050565b6000610abd836001600160a01b038416610cea565b6000807ff0c57e16840df040f15088dc2f81fe391c3923bec73e23a9662efc9c229c6a00610ac0565b610b92610d39565b61093f81610d5e565b606081600001805480602002602001604051908101604052809291908181526020018280548015610beb57602002820191906000526020600020905b815481526020019060010190808311610bd7575b50505050509050919050565b60008181526001830160205260408120548015610ce0576000610c1b600183610e24565b8554909150600090610c2f90600190610e24565b9050808214610c94576000866000018281548110610c4f57610c4f610e37565b9060005260206000200154905080876000018481548110610c7257610c72610e37565b6000918252602080832090910192909255918252600188019052604090208390555b8554869080610ca557610ca5610e60565b600190038181906000526020600020016000905590558560010160008681526020019081526020016000206000905560019350505050610ac0565b6000915050610ac0565b6000818152600183016020526040812054610d3157508154600181810184556000848152602080822090930184905584548482528286019093526040902091909155610ac0565b506000610ac0565b610d41610d66565b61024c57604051631afcd79f60e31b815260040160405180910390fd5b61090c610d39565b6000610d70610b61565b54600160401b900460ff16919050565b602080825282518282018190526000918401906040840190835b81811015610dc15783516001600160a01b0316835260209384019390920191600101610d9a565b509095945050505050565b600060208284031215610dde57600080fd5b81356001600160a01b0381168114610a2257600080fd5b600060208284031215610e0757600080fd5b5051919050565b634e487b7160e01b600052601160045260246000fd5b81810381811115610ac057610ac0610e0e565b634e487b7160e01b600052603260045260246000fd5b80820180821115610ac057610ac0610e0e565b634e487b7160e01b600052603160045260246000fdfea2646970667358221220116c24e66f3f2f816ace4f7ec2159d26c1227d5d71d5f301a8d9fc9e935648ab64736f6c634300081e0033";
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
					readonly indexed: true;
					readonly internalType: "address";
					readonly name: "excluded";
					readonly type: "address";
				}
			];
			readonly name: "AddExcludedAddress";
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
					readonly name: "arw";
					readonly type: "address";
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
					readonly indexed: true;
					readonly internalType: "address";
					readonly name: "excluded";
					readonly type: "address";
				}
			];
			readonly name: "RemoveExcludedAddress";
			readonly type: "event";
		},
		{
			readonly inputs: readonly [
			];
			readonly name: "ARW";
			readonly outputs: readonly [
				{
					readonly internalType: "contract IERC20";
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
					readonly name: "_excluded";
					readonly type: "address";
				}
			];
			readonly name: "addExcludedAddress";
			readonly outputs: readonly [
			];
			readonly stateMutability: "nonpayable";
			readonly type: "function";
		},
		{
			readonly inputs: readonly [
			];
			readonly name: "circulatingSupply";
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
			readonly name: "excludedAddresses";
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
			];
			readonly name: "excludedSupply";
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
					readonly name: "_ARW";
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
					readonly name: "_excluded";
					readonly type: "address";
				}
			];
			readonly name: "removeExcludedaddress";
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
	static createInterface(): ARWSupplyInterface;
	static connect(address: string, runner?: ContractRunner | null): ARWSupply;
}
export type LockConstructorParams = [
	signer?: Signer
] | ConstructorParameters<typeof ContractFactory>;
declare class Lock__factory extends ContractFactory {
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
	static readonly bytecode = "0x60806040526040516102a03803806102a08339810160408190526020916097565b804210607e5760405162461bcd60e51b815260206004820152602360248201527f556e6c6f636b2074696d652073686f756c6420626520696e207468652066757460448201526275726560e81b606482015260840160405180910390fd5b600055600180546001600160a01b0319163317905560af565b60006020828403121560a857600080fd5b5051919050565b6101e2806100be6000396000f3fe608060405234801561001057600080fd5b50600436106100415760003560e01c8063251c1aa3146100465780633ccfd60b146100625780638da5cb5b1461006c575b600080fd5b61004f60005481565b6040519081526020015b60405180910390f35b61006a610097565b005b60015461007f906001600160a01b031681565b6040516001600160a01b039091168152602001610059565b6000544210156100e75760405162461bcd60e51b8152602060048201526016602482015275165bdd4818d85b89dd081dda5d1a191c985dc81e595d60521b60448201526064015b60405180910390fd5b6001546001600160a01b031633146101385760405162461bcd60e51b81526020600482015260146024820152732cb7ba9030b932b713ba103a34329037bbb732b960611b60448201526064016100de565b604080514781524260208201527fbf2ed60bd5b5965d685680c01195c9514e4382e28e3a5a2d2d5244bf59411b93910160405180910390a16001546040516001600160a01b03909116904780156108fc02916000818181858888f193505050501580156101a9573d6000803e3d6000fd5b5056fea2646970667358221220d5263116f896a3f18a47334ef21d9e8e402a28dcd2071309f446598d27cf5e6764736f6c634300081e0033";
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
declare class ArbGateway__factory extends ContractFactory {
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
	static readonly bytecode = "0x6080604052348015600f57600080fd5b50611dd78061001f6000396000f3fe6080604052600436106101095760003560e01c8063b190be8511610095578063e3f30e7111610064578063e3f30e71146102a9578063eac96f23146102df578063ebde1bdb146102ff578063f2fde38b1461031f578063fb0e722b1461033f57600080fd5b8063b190be8514610226578063b44db82e14610246578063c358798014610259578063df36132b1461027957600080fd5b80638da5cb5b116100dc5780638da5cb5b1461017e57806390f7e1b3146101ab57806394ba88cb146101cb578063a51c8cb9146101fb578063affed0e01461021057600080fd5b806348875bf51461010e57806360e312a714610130578063715018a61461015657806374378d371461016b575b600080fd5b34801561011a57600080fd5b5061012e610129366004611570565b61035f565b005b61014361013e366004611610565b6103db565b6040519081526020015b60405180910390f35b34801561016257600080fd5b5061012e610700565b61012e6101793660046116a6565b610714565b34801561018a57600080fd5b506101936107fb565b6040516001600160a01b03909116815260200161014d565b3480156101b757600080fd5b50600154610193906001600160a01b031681565b3480156101d757600080fd5b506101eb6101e6366004611744565b610829565b604051901515815260200161014d565b34801561020757600080fd5b50610193606481565b34801561021c57600080fd5b5061014360045481565b34801561023257600080fd5b50610143610241366004611761565b6109fc565b6101436102543660046117a3565b610a27565b34801561026557600080fd5b5061012e610274366004611744565b610ae2565b34801561028557600080fd5b506101eb610294366004611744565b60036020526000908152604090205460ff1681565b3480156102b557600080fd5b506101936102c4366004611744565b6002602052600090815260409020546001600160a01b031681565b3480156102eb57600080fd5b5061012e6102fa366004611860565b610c6b565b34801561030b57600080fd5b5061012e61031a366004611985565b610e24565b34801561032b57600080fd5b5061012e61033a366004611744565b610e8c565b34801561034b57600080fd5b50600054610193906001600160a01b031681565b33301461039f5760405162461bcd60e51b815260206004820152600960248201526827a7262cafa9a2a62360b91b60448201526064015b60405180910390fd5b817f07ce1e2038f0bf86b874f8aa890353ddfe00ccba5e000ad4b713e9b2ce90fa72826040516103cf9190611a0e565b60405180910390a25050565b60006103f26001600160a01b038916333089610eca565b6001600160a01b03881660009081526003602052604090205460ff161561046e57604051630852cd8d60e31b8152600481018790526001600160a01b038916906342966c6890602401600060405180830381600087803b15801561045557600080fd5b505af1158015610469573d6000803e3d6000fd5b505050505b6000600454905060006374378d3760e01b8a6001600160a01b031663313ce5676040518163ffffffff1660e01b8152600401602060405180830381865afa1580156104bd573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906104e19190611a21565b6001600160a01b03808d166000908152600260205260409081902054905161051b9392919091169033908e908e908e908a90602401611a3e565b60408051601f198184030181529190526020810180516001600160e01b03166001600160e01b03199093169290921790915260008054919250906001600160a01b031615806106125760008054906101000a90046001600160a01b03166001600160a01b031663679b6ded34600160009054906101000a90046001600160a01b031660008c33338e8e8c6040518a63ffffffff1660e01b81526004016105c8989796959493929190611a96565b60206040518083038185885af11580156105e6573d6000803e3d6000fd5b50505050506040513d601f19601f8201168201806040525081019061060b9190611af5565b9150610689565b6001546040516349460b4d60e11b815260649163928c169a91610643916001600160a01b0316908790600401611b0e565b6020604051808303816000875af1158015610662573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906106869190611af5565b91505b6004805490600061069983611b48565b9190505550336001600160a01b03168c6001600160a01b0316857f9df4cc1e9776bb39b63370f1f8d003320ceeebe30547208fa83a07a3e984794b858f8f8f6040516106e89493929190611b61565b60405180910390a450919a9950505050505050505050565b610708610f37565b6107126000610f84565b565b61071d33610829565b80610740575061072b6107fb565b6001600160a01b0316336001600160a01b0316145b61077b5760405162461bcd60e51b815260206004820152600c60248201526b4e4f545f415242495452554d60a01b6044820152606401610396565b6107e28388886001600160a01b031663313ce5676040518163ffffffff1660e01b8152600401602060405180830381865afa1580156107be573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906102419190611a21565b92506107f2868686868686610ff5565b50505050505050565b7f9016d09d72d40fdae2fd8ceac6b6234c7706214fd39c1cd1e609a0528c199300546001600160a01b031690565b600080546001600160a01b031615801561088257600154610866906001600160a01b03167311110000000000000000000000000000000011110190565b6001600160a01b0316836001600160a01b031614915050919050565b60008060009054906101000a90046001600160a01b03166001600160a01b031663e78cea926040518163ffffffff1660e01b8152600401602060405180830381865afa1580156108d6573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906108fa9190611b98565b9050806001600160a01b0316846001600160a01b03161480156109f457506001546040805163ab5d894360e01b815290516001600160a01b039283169284169163ab5d89439160048083019260209291908290030181865afa158015610964573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906109889190611b98565b6001600160a01b03166380648b026040518163ffffffff1660e01b8152600401602060405180830381865afa1580156109c5573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906109e99190611b98565b6001600160a01b0316145b949350505050565b6000610a088284611bb5565b610a1390600a611cb5565b610a1d9085611cc4565b90505b9392505050565b600080600080610a36856112ca565b60405163d505accf60e01b8152336004820152306024820152604481018f9052606481018a905260ff8416608482015260a4810183905260c4810182905292955090935091506001600160a01b038e169063d505accf9060e401600060405180830381600087803b158015610aaa57600080fd5b505af1158015610abe573d6000803e3d6000fd5b50505050610ad18d8d8d8d8d8d8d6103db565b9d9c50505050505050505050505050565b610aea610f37565b6001600160a01b03811660009081526003602052604090205460ff16610b11576001610b14565b60005b6001600160a01b0382166000908152600360205260409020805460ff1916911515918217905560ff1615610c15576040516370a0823160e01b815230600482015281906000906001600160a01b038316906370a0823190602401602060405180830381865afa158015610b8b573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610baf9190611af5565b90508015610c1257604051630852cd8d60e31b8152600481018290526001600160a01b038316906342966c6890602401600060405180830381600087803b158015610bf957600080fd5b505af1158015610c0d573d6000803e3d6000fd5b505050505b50505b6001600160a01b03811660008181526003602090815260409182902054915160ff909216151582527f7740f93df62e6714ab915a82ef699f7a6db1f754498e2e363890d286aba7dcab910160405180910390a250565b6000610c75611314565b805490915060ff600160401b820416159067ffffffffffffffff16600081158015610c9d5750825b905060008267ffffffffffffffff166001148015610cba5750303b155b905081158015610cc8575080155b15610ce65760405163f92ee8a960e01b815260040160405180910390fd5b845467ffffffffffffffff191660011785558315610d1057845460ff60401b1916600160401b1785555b600080546001600160a01b03808b166001600160a01b031992831617835560018054918b16919092161790555b8651811015610d7f576000878281518110610d5a57610d5a611ce6565b60200260200101519050610d7681600001518260200151610e24565b50600101610d3d565b50610d898961133f565b60408051606481526001600160a01b038a8116602083015289168183015290517f59967eb20e0c027d0c4fe6e11fcec2273a08036e26740962b3ef3a23f107f93c9181900360600190a18315610e1957845460ff60401b19168555604051600181527fc7f505b2f371ae2175ee4913f4499e1f2633a7b5936321eed1cdaeb6115181d29060200160405180910390a15b505050505050505050565b610e2c610f37565b6001600160a01b0382811660008181526002602090815260409182902080546001600160a01b0319169486169485179055905192835290917fd7b0a59830045bcaf6233768890edf6fcda71a5654d385440db294eb92b9a7db91016103cf565b610e94610f37565b6001600160a01b038116610ebe57604051631e4fbdf760e01b815260006004820152602401610396565b610ec781610f84565b50565b6040516001600160a01b038481166024830152838116604483015260648201839052610f319186918216906323b872dd906084015b604051602081830303815290604052915060e01b6020820180516001600160e01b038381831617835250505050611350565b50505050565b6000610f416107fb565b90506001600160a01b03811615801590610f6457506001600160a01b0381163314155b15610ec75760405163118cdaa760e01b8152336004820152602401610396565b7f9016d09d72d40fdae2fd8ceac6b6234c7706214fd39c1cd1e609a0528c19930080546001600160a01b031981166001600160a01b03848116918217845560405192169182907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a3505050565b6040516370a0823160e01b8152306004820152869084906001600160a01b038316906370a0823190602401602060405180830381865afa15801561103d573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906110619190611af5565b1061107f5761107a6001600160a01b03821686866113c1565b6110e2565b6040516340c10f1960e01b81526001600160a01b038681166004830152602482018690528216906340c10f1990604401600060405180830381600087803b1580156110c957600080fd5b505af11580156110dd573d6000803e3d6000fd5b505050505b8251156112715760006348875bf560e01b6110ff858360046113f7565b61110890611cfc565b6001600160e01b03191614905080156111bb576000306001600160a01b0316856040516111359190611d3a565b6000604051808303816000865af19150503d8060008114611172576040519150601f19603f3d011682016040523d82523d6000602084013e611177565b606091505b50509050806111b55760405162461bcd60e51b815260206004820152600a6024820152691354d1d7d1905253115160b21b6044820152606401610396565b5061126f565b6001600160a01b0386163b1561126f57600080876001600160a01b0316620c3500876040516111ea9190611d3a565b60006040518083038160008787f1925050503d8060008114611228576040519150601f19603f3d011682016040523d82523d6000602084013e61122d565b606091505b5091509150847f840af9ca2ec8c881ca3de23cf221981cd4118acdefeb96233fbdf0e365d761558383604051611264929190611d56565b60405180910390a250505b505b856001600160a01b0316876001600160a01b0316837f42365fe0dfe76a5961cdef1960c9135c4097a1b6c253d8c1d74f5d27e41cbb8e8888886040516112b993929190611d71565b60405180910390a450505050505050565b600080600083516041036112f45750505060208101516040820151606083015160001a919061130d565b604051634be6321b60e01b815260040160405180910390fd5b9193909250565b6000807ff0c57e16840df040f15088dc2f81fe391c3923bec73e23a9662efc9c229c6a005b92915050565b61134761145d565b610ec781611482565b600080602060008451602086016000885af180611373576040513d6000823e3d81fd5b50506000513d9150811561138b578060011415611398565b6001600160a01b0384163b155b15610f3157604051635274afe760e01b81526001600160a01b0385166004820152602401610396565b6040516001600160a01b038381166024830152604482018390526113f291859182169063a9059cbb90606401610eff565b505050565b60608351828111611406578092505b838111611411578093505b5081831015610a205750604051828203848401601f19601f830181165b828101518582015281018061142e57505050806020830101600081526020810160405250808252509392505050565b61146561148a565b61071257604051631afcd79f60e31b815260040160405180910390fd5b610e9461145d565b6000611494611314565b54600160401b900460ff16919050565b634e487b7160e01b600052604160045260246000fd5b6040805190810167ffffffffffffffff811182821017156114dd576114dd6114a4565b60405290565b604051601f8201601f1916810167ffffffffffffffff8111828210171561150c5761150c6114a4565b604052919050565b60008067ffffffffffffffff84111561152f5761152f6114a4565b50601f8301601f1916602001611544816114e3565b91505082815283838301111561155957600080fd5b828260208301376000602084830101529392505050565b6000806040838503121561158357600080fd5b82359150602083013567ffffffffffffffff8111156115a157600080fd5b8301601f810185136115b257600080fd5b6115c185823560208401611514565b9150509250929050565b6001600160a01b0381168114610ec757600080fd5b80356115eb816115cb565b919050565b600082601f83011261160157600080fd5b610a2083833560208501611514565b600080600080600080600060e0888a03121561162b57600080fd5b8735611636816115cb565b96506020880135611646816115cb565b955060408801359450606088013567ffffffffffffffff81111561166957600080fd5b6116758a828b016115f0565b979a969950949760808101359660a0820135965060c090910135945092505050565b60ff81168114610ec757600080fd5b600080600080600080600060e0888a0312156116c157600080fd5b87356116cc81611697565b965060208801356116dc816115cb565b955060408801356116ec816115cb565b945060608801356116fc816115cb565b93506080880135925060a088013567ffffffffffffffff81111561171f57600080fd5b61172b8a828b016115f0565b979a969950949793969295929450505060c09091013590565b60006020828403121561175657600080fd5b8135610a20816115cb565b60008060006060848603121561177657600080fd5b83359250602084013561178881611697565b9150604084013561179881611697565b809150509250925092565b60008060008060008060008060006101208a8c0312156117c257600080fd5b89356117cd816115cb565b98506117db60208b016115e0565b975060408a0135965060608a013567ffffffffffffffff8111156117fe57600080fd5b61180a8c828d016115f0565b96505060808a0135945060a08a0135935060c08a0135925060e08a013591506101008a013567ffffffffffffffff81111561184457600080fd5b6118508c828d016115f0565b9150509295985092959850929598565b6000806000806080858703121561187657600080fd5b8435611881816115cb565b93506020850135611891816115cb565b925060408501356118a1816115cb565b9150606085013567ffffffffffffffff8111156118bd57600080fd5b8501601f810187136118ce57600080fd5b803567ffffffffffffffff8111156118e8576118e86114a4565b6118f760208260051b016114e3565b8082825260208201915060208360061b85010192508983111561191957600080fd5b6020840193505b82841015611977576040848b03121561193857600080fd5b6119406114ba565b843561194b816115cb565b8152602085013561195b816115cb565b8060208301525080835250602082019150604084019350611920565b969995985093965050505050565b6000806040838503121561199857600080fd5b82356119a3816115cb565b915060208301356119b3816115cb565b809150509250929050565b60005b838110156119d95781810151838201526020016119c1565b50506000910152565b600081518084526119fa8160208601602086016119be565b601f01601f19169290920160200192915050565b602081526000610a2060208301846119e2565b600060208284031215611a3357600080fd5b8151610a2081611697565b60ff881681526001600160a01b0387811660208301528681166040830152851660608201526080810184905260e060a08201819052600090611a82908301856119e2565b90508260c083015298975050505050505050565b6001600160a01b038981168252602082018990526040820188905286811660608301528516608082015260a0810184905260c0810183905261010060e08201819052600090611ae7908301846119e2565b9a9950505050505050505050565b600060208284031215611b0757600080fd5b5051919050565b6001600160a01b0383168152604060208201819052600090610a1d908301846119e2565b634e487b7160e01b600052601160045260246000fd5b600060018201611b5a57611b5a611b32565b5060010190565b84815260018060a01b0384166020820152826040820152608060608201526000611b8e60808301846119e2565b9695505050505050565b600060208284031215611baa57600080fd5b8151610a20816115cb565b60ff828116828216039081111561133957611339611b32565b6001815b6001841115611c0957808504811115611bed57611bed611b32565b6001841615611bfb57908102905b60019390931c928002611bd2565b935093915050565b600082611c2057506001611339565b81611c2d57506000611339565b8160018114611c435760028114611c4d57611c69565b6001915050611339565b60ff841115611c5e57611c5e611b32565b50506001821b611339565b5060208310610133831016604e8410600b8410161715611c8c575081810a611339565b611c996000198484611bce565b8060001904821115611cad57611cad611b32565b029392505050565b6000610a2060ff841683611c11565b600082611ce157634e487b7160e01b600052601260045260246000fd5b500490565b634e487b7160e01b600052603260045260246000fd5b805160208201516001600160e01b0319811691906004821015611d33576001600160e01b0319600483900360031b81901b82161692505b5050919050565b60008251611d4c8184602087016119be565b9190910192915050565b8215158152604060208201526000610a1d60408301846119e2565b60018060a01b0384168152826020820152606060408201526000611d9860608301846119e2565b9594505050505056fea2646970667358221220f5a3f6772b5917dc118dc5a233b9e7ab2dc0c2fae7411e5c4c87a3180def06f464736f6c634300081e0033";
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
					readonly internalType: "address";
					readonly name: "msgSender";
					readonly type: "address";
				}
			];
			readonly name: "checkArb";
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
declare class ArbGatewaySettle__factory extends ContractFactory {
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
	static readonly bytecode = "0x6080604052348015600f57600080fd5b506124f18061001f6000396000f3fe6080604052600436106101405760003560e01c8063ac4cb358116100b6578063df36132b1161006f578063df36132b14610351578063e3f30e7114610381578063eac96f23146103b7578063ebde1bdb146103d7578063f2fde38b146103f7578063fb0e722b1461041757600080fd5b8063ac4cb358146102a8578063affed0e0146102c8578063b190be85146102de578063b44db82e146102fe578063b50e801d14610311578063c35879801461033157600080fd5b806374378d371161010857806374378d37146101e15780638da5cb5b146101f457806390f7e1b31461022157806394ba88cb14610241578063a51c8cb914610261578063a85c38ef1461027657600080fd5b80631f6a02671461014557806348875bf5146101745780635484f0761461019657806360e312a7146101ab578063715018a6146101cc575b600080fd5b34801561015157600080fd5b5060065461015f9060ff1681565b60405190151581526020015b60405180910390f35b34801561018057600080fd5b5061019461018f366004611a4b565b610437565b005b3480156101a257600080fd5b506101946104b3565b6101be6101b9366004611aea565b61051a565b60405190815260200161016b565b3480156101d857600080fd5b5061019461083f565b6101946101ef366004611b7f565b610853565b34801561020057600080fd5b50610209610a26565b6040516001600160a01b03909116815260200161016b565b34801561022d57600080fd5b50600154610209906001600160a01b031681565b34801561024d57600080fd5b5061015f61025c366004611c1c565b610a54565b34801561026d57600080fd5b50610209606481565b34801561028257600080fd5b50610296610291366004611c39565b610c2d565b60405161016b96959493929190611ca2565b3480156102b457600080fd5b506101946102c3366004611db0565b610cfd565b3480156102d457600080fd5b506101be60045481565b3480156102ea57600080fd5b506101be6102f9366004611e3e565b610d54565b6101be61030c366004611e80565b610d7f565b34801561031d57600080fd5b5061019461032c366004611c39565b610e3a565b34801561033d57600080fd5b5061019461034c366004611c1c565b610fc2565b34801561035d57600080fd5b5061015f61036c366004611c1c565b60036020526000908152604090205460ff1681565b34801561038d57600080fd5b5061020961039c366004611c1c565b6002602052600090815260409020546001600160a01b031681565b3480156103c357600080fd5b506101946103d2366004611f3b565b61114b565b3480156103e357600080fd5b506101946103f2366004611faf565b611302565b34801561040357600080fd5b50610194610412366004611c1c565b61136a565b34801561042357600080fd5b50600054610209906001600160a01b031681565b3330146104775760405162461bcd60e51b815260206004820152600960248201526827a7262cafa9a2a62360b91b60448201526064015b60405180910390fd5b817f07ce1e2038f0bf86b874f8aa890353ddfe00ccba5e000ad4b713e9b2ce90fa72826040516104a79190611fe8565b60405180910390a25050565b6104bb6113a8565b60065460ff166104cc5760016104cf565b60005b6006805460ff1916911515918217905560405160ff909116151581527f4caa98d8778c80a93e087168a6e45fa5369af8904ba8f828d1bbec56dfe8f35d9060200160405180910390a1565b60006105316001600160a01b0389163330896113f5565b6001600160a01b03881660009081526003602052604090205460ff16156105ad57604051630852cd8d60e31b8152600481018790526001600160a01b038916906342966c6890602401600060405180830381600087803b15801561059457600080fd5b505af11580156105a8573d6000803e3d6000fd5b505050505b6000600454905060006374378d3760e01b8a6001600160a01b031663313ce5676040518163ffffffff1660e01b8152600401602060405180830381865afa1580156105fc573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906106209190611ffb565b6001600160a01b03808d166000908152600260205260409081902054905161065a9392919091169033908e908e908e908a90602401612018565b60408051601f198184030181529190526020810180516001600160e01b03166001600160e01b03199093169290921790915260008054919250906001600160a01b031615806107515760008054906101000a90046001600160a01b03166001600160a01b031663679b6ded34600160009054906101000a90046001600160a01b031660008c33338e8e8c6040518a63ffffffff1660e01b8152600401610707989796959493929190612070565b60206040518083038185885af1158015610725573d6000803e3d6000fd5b50505050506040513d601f19601f8201168201806040525081019061074a91906120cf565b91506107c8565b6001546040516349460b4d60e11b815260649163928c169a91610782916001600160a01b03169087906004016120e8565b6020604051808303816000875af11580156107a1573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906107c591906120cf565b91505b600480549060006107d883612122565b9190505550336001600160a01b03168c6001600160a01b0316857f9df4cc1e9776bb39b63370f1f8d003320ceeebe30547208fa83a07a3e984794b858f8f8f604051610827949392919061213b565b60405180910390a450919a9950505050505050505050565b6108476113a8565b6108516000611462565b565b61085c33610a54565b8061087f575061086a610a26565b6001600160a01b0316336001600160a01b0316145b6108ba5760405162461bcd60e51b815260206004820152600c60248201526b4e4f545f415242495452554d60a01b604482015260640161046e565b6109218388886001600160a01b031663313ce5676040518163ffffffff1660e01b8152600401602060405180830381865afa1580156108fd573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906102f99190611ffb565b6040805160c0810182526001600160a01b03808a168252888116602080840191825289831684860190815260608501878152608086018a8152600060a088018190528a8152600590945296909220855181549086166001600160a01b031991821617825593516001820180549187169186169190911790559051600282018054919095169316929092179092559051600382015591519295509160048201906109ca90826121f4565b5060a091909101516005909101805460ff191691151591909117905560065460ff1615610a1d576109ff8686868686866114d3565b600081815260056020819052604090912001805460ff191660011790555b50505050505050565b7f9016d09d72d40fdae2fd8ceac6b6234c7706214fd39c1cd1e609a0528c199300546001600160a01b031690565b600080546001600160a01b0316158015610aad57600154610a91906001600160a01b03167311110000000000000000000000000000000011110190565b6001600160a01b0316836001600160a01b031614915050919050565b60008060009054906101000a90046001600160a01b03166001600160a01b031663e78cea926040518163ffffffff1660e01b8152600401602060405180830381865afa158015610b01573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610b2591906122b2565b9050806001600160a01b0316846001600160a01b0316148015610c1f57506001546040805163ab5d894360e01b815290516001600160a01b039283169284169163ab5d89439160048083019260209291908290030181865afa158015610b8f573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610bb391906122b2565b6001600160a01b03166380648b026040518163ffffffff1660e01b8152600401602060405180830381865afa158015610bf0573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610c1491906122b2565b6001600160a01b0316145b949350505050565b50919050565b600560205260009081526040902080546001820154600283015460038401546004850180546001600160a01b039586169694861695909316939192610c7190612172565b80601f0160208091040260200160405190810160405280929190818152602001828054610c9d90612172565b8015610cea5780601f10610cbf57610100808354040283529160200191610cea565b820191906000526020600020905b815481529060010190602001808311610ccd57829003601f168201915b5050506005909301549192505060ff1686565b610d098585858561114b565b6006805460ff19168215159081179091556040519081527f4caa98d8778c80a93e087168a6e45fa5369af8904ba8f828d1bbec56dfe8f35d9060200160405180910390a15050505050565b6000610d6082846122cf565b610d6b90600a6123cf565b610d7590856123de565b90505b9392505050565b600080600080610d8e856117a8565b60405163d505accf60e01b8152336004820152306024820152604481018f9052606481018a905260ff8416608482015260a4810183905260c4810182905292955090935091506001600160a01b038e169063d505accf9060e401600060405180830381600087803b158015610e0257600080fd5b505af1158015610e16573d6000803e3d6000fd5b50505050610e298d8d8d8d8d8d8d61051a565b9d9c50505050505050505050505050565b610e426113a8565b6000818152600560209081526040808320815160c08101835281546001600160a01b039081168252600183015481169482019490945260028201549093169183019190915260038101546060830152600481018054608084019190610ea690612172565b80601f0160208091040260200160405190810160405280929190818152602001828054610ed290612172565b8015610f1f5780601f10610ef457610100808354040283529160200191610f1f565b820191906000526020600020905b815481529060010190602001808311610f0257829003601f168201915b50505091835250506005919091015460ff16151560209091015260a081015190915015610f805760405162461bcd60e51b815260206004820152600f60248201526e1053149150511657d4d15515131151608a1b604482015260640161046e565b610fa281600001518260200151836040015184606001518560800151876114d3565b50600090815260056020819052604090912001805460ff19166001179055565b610fca6113a8565b6001600160a01b03811660009081526003602052604090205460ff16610ff1576001610ff4565b60005b6001600160a01b0382166000908152600360205260409020805460ff1916911515918217905560ff16156110f5576040516370a0823160e01b815230600482015281906000906001600160a01b038316906370a0823190602401602060405180830381865afa15801561106b573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061108f91906120cf565b905080156110f257604051630852cd8d60e31b8152600481018290526001600160a01b038316906342966c6890602401600060405180830381600087803b1580156110d957600080fd5b505af11580156110ed573d6000803e3d6000fd5b505050505b50505b6001600160a01b03811660008181526003602090815260409182902054915160ff909216151582527f7740f93df62e6714ab915a82ef699f7a6db1f754498e2e363890d286aba7dcab910160405180910390a250565b60006111556117f2565b805490915060ff600160401b82041615906001600160401b031660008115801561117c5750825b90506000826001600160401b031660011480156111985750303b155b9050811580156111a6575080155b156111c45760405163f92ee8a960e01b815260040160405180910390fd5b845467ffffffffffffffff1916600117855583156111ee57845460ff60401b1916600160401b1785555b600080546001600160a01b03808b166001600160a01b031992831617835560018054918b16919092161790555b865181101561125d57600087828151811061123857611238612400565b6020026020010151905061125481600001518260200151611302565b5060010161121b565b506112678961181d565b60408051606481526001600160a01b038a8116602083015289168183015290517f59967eb20e0c027d0c4fe6e11fcec2273a08036e26740962b3ef3a23f107f93c9181900360600190a183156112f757845460ff60401b19168555604051600181527fc7f505b2f371ae2175ee4913f4499e1f2633a7b5936321eed1cdaeb6115181d29060200160405180910390a15b505050505050505050565b61130a6113a8565b6001600160a01b0382811660008181526002602090815260409182902080546001600160a01b0319169486169485179055905192835290917fd7b0a59830045bcaf6233768890edf6fcda71a5654d385440db294eb92b9a7db91016104a7565b6113726113a8565b6001600160a01b03811661139c57604051631e4fbdf760e01b81526000600482015260240161046e565b6113a581611462565b50565b60006113b2610a26565b90506001600160a01b038116158015906113d557506001600160a01b0381163314155b156113a55760405163118cdaa760e01b815233600482015260240161046e565b6040516001600160a01b03848116602483015283811660448301526064820183905261145c9186918216906323b872dd906084015b604051602081830303815290604052915060e01b6020820180516001600160e01b03838183161783525050505061182e565b50505050565b7f9016d09d72d40fdae2fd8ceac6b6234c7706214fd39c1cd1e609a0528c19930080546001600160a01b031981166001600160a01b03848116918217845560405192169182907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a3505050565b6040516370a0823160e01b8152306004820152869084906001600160a01b038316906370a0823190602401602060405180830381865afa15801561151b573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061153f91906120cf565b1061155d576115586001600160a01b038216868661189f565b6115c0565b6040516340c10f1960e01b81526001600160a01b038681166004830152602482018690528216906340c10f1990604401600060405180830381600087803b1580156115a757600080fd5b505af11580156115bb573d6000803e3d6000fd5b505050505b82511561174f5760006348875bf560e01b6115dd858360046118d5565b6115e690612416565b6001600160e01b0319161490508015611699576000306001600160a01b0316856040516116139190612454565b6000604051808303816000865af19150503d8060008114611650576040519150601f19603f3d011682016040523d82523d6000602084013e611655565b606091505b50509050806116935760405162461bcd60e51b815260206004820152600a6024820152691354d1d7d1905253115160b21b604482015260640161046e565b5061174d565b6001600160a01b0386163b1561174d57600080876001600160a01b0316620c3500876040516116c89190612454565b60006040518083038160008787f1925050503d8060008114611706576040519150601f19603f3d011682016040523d82523d6000602084013e61170b565b606091505b5091509150847f840af9ca2ec8c881ca3de23cf221981cd4118acdefeb96233fbdf0e365d761558383604051611742929190612470565b60405180910390a250505b505b856001600160a01b0316876001600160a01b0316837f42365fe0dfe76a5961cdef1960c9135c4097a1b6c253d8c1d74f5d27e41cbb8e8888886040516117979392919061248b565b60405180910390a450505050505050565b600080600083516041036117d25750505060208101516040820151606083015160001a91906117eb565b604051634be6321b60e01b815260040160405180910390fd5b9193909250565b6000807ff0c57e16840df040f15088dc2f81fe391c3923bec73e23a9662efc9c229c6a005b92915050565b61182561193b565b6113a581611960565b600080602060008451602086016000885af180611851576040513d6000823e3d81fd5b50506000513d91508115611869578060011415611876565b6001600160a01b0384163b155b1561145c57604051635274afe760e01b81526001600160a01b038516600482015260240161046e565b6040516001600160a01b038381166024830152604482018390526118d091859182169063a9059cbb9060640161142a565b505050565b606083518281116118e4578092505b8381116118ef578093505b5081831015610d785750604051828203848401601f19601f830181165b828101518582015281018061190c57505050806020830101600081526020810160405250808252509392505050565b611943611968565b61085157604051631afcd79f60e31b815260040160405180910390fd5b61137261193b565b60006119726117f2565b54600160401b900460ff16919050565b634e487b7160e01b600052604160045260246000fd5b604080519081016001600160401b03811182821017156119ba576119ba611982565b60405290565b604051601f8201601f191681016001600160401b03811182821017156119e8576119e8611982565b604052919050565b6000806001600160401b03841115611a0a57611a0a611982565b50601f8301601f1916602001611a1f816119c0565b915050828152838383011115611a3457600080fd5b828260208301376000602084830101529392505050565b60008060408385031215611a5e57600080fd5b8235915060208301356001600160401b03811115611a7b57600080fd5b8301601f81018513611a8c57600080fd5b611a9b858235602084016119f0565b9150509250929050565b6001600160a01b03811681146113a557600080fd5b8035611ac581611aa5565b919050565b600082601f830112611adb57600080fd5b610d78838335602085016119f0565b600080600080600080600060e0888a031215611b0557600080fd5b8735611b1081611aa5565b96506020880135611b2081611aa5565b95506040880135945060608801356001600160401b03811115611b4257600080fd5b611b4e8a828b01611aca565b979a969950949760808101359660a0820135965060c090910135945092505050565b60ff811681146113a557600080fd5b600080600080600080600060e0888a031215611b9a57600080fd5b8735611ba581611b70565b96506020880135611bb581611aa5565b95506040880135611bc581611aa5565b94506060880135611bd581611aa5565b93506080880135925060a08801356001600160401b03811115611bf757600080fd5b611c038a828b01611aca565b979a969950949793969295929450505060c09091013590565b600060208284031215611c2e57600080fd5b8135610d7881611aa5565b600060208284031215611c4b57600080fd5b5035919050565b60005b83811015611c6d578181015183820152602001611c55565b50506000910152565b60008151808452611c8e816020860160208601611c52565b601f01601f19169290920160200192915050565b6001600160a01b0387811682528681166020830152851660408201526060810184905260c060808201819052600090611cdd90830185611c76565b905082151560a0830152979650505050505050565b600082601f830112611d0357600080fd5b81356001600160401b03811115611d1c57611d1c611982565b611d2b60208260051b016119c0565b8082825260208201915060208360061b860101925085831115611d4d57600080fd5b602085015b83811015611da65760408188031215611d6a57600080fd5b611d72611998565b8135611d7d81611aa5565b81526020820135611d8d81611aa5565b6020828101919091529084529290920191604001611d52565b5095945050505050565b600080600080600060a08688031215611dc857600080fd5b8535611dd381611aa5565b94506020860135611de381611aa5565b93506040860135611df381611aa5565b925060608601356001600160401b03811115611e0e57600080fd5b611e1a88828901611cf2565b92505060808601358015158114611e3057600080fd5b809150509295509295909350565b600080600060608486031215611e5357600080fd5b833592506020840135611e6581611b70565b91506040840135611e7581611b70565b809150509250925092565b60008060008060008060008060006101208a8c031215611e9f57600080fd5b8935611eaa81611aa5565b9850611eb860208b01611aba565b975060408a0135965060608a01356001600160401b03811115611eda57600080fd5b611ee68c828d01611aca565b96505060808a0135945060a08a0135935060c08a0135925060e08a013591506101008a01356001600160401b03811115611f1f57600080fd5b611f2b8c828d01611aca565b9150509295985092959850929598565b60008060008060808587031215611f5157600080fd5b8435611f5c81611aa5565b93506020850135611f6c81611aa5565b92506040850135611f7c81611aa5565b915060608501356001600160401b03811115611f9757600080fd5b611fa387828801611cf2565b91505092959194509250565b60008060408385031215611fc257600080fd5b8235611fcd81611aa5565b91506020830135611fdd81611aa5565b809150509250929050565b602081526000610d786020830184611c76565b60006020828403121561200d57600080fd5b8151610d7881611b70565b60ff881681526001600160a01b0387811660208301528681166040830152851660608201526080810184905260e060a0820181905260009061205c90830185611c76565b90508260c083015298975050505050505050565b6001600160a01b038981168252602082018990526040820188905286811660608301528516608082015260a0810184905260c0810183905261010060e082018190526000906120c190830184611c76565b9a9950505050505050505050565b6000602082840312156120e157600080fd5b5051919050565b6001600160a01b0383168152604060208201819052600090610d7590830184611c76565b634e487b7160e01b600052601160045260246000fd5b6000600182016121345761213461210c565b5060010190565b84815260018060a01b03841660208201528260408201526080606082015260006121686080830184611c76565b9695505050505050565b600181811c9082168061218657607f821691505b602082108103610c2757634e487b7160e01b600052602260045260246000fd5b601f8211156118d057806000526020600020601f840160051c810160208510156121cd5750805b601f840160051c820191505b818110156121ed57600081556001016121d9565b5050505050565b81516001600160401b0381111561220d5761220d611982565b6122218161221b8454612172565b846121a6565b6020601f821160018114612255576000831561223d5750848201515b600019600385901b1c1916600184901b1784556121ed565b600084815260208120601f198516915b828110156122855787850151825560209485019460019092019101612265565b50848210156122a35786840151600019600387901b60f8161c191681555b50505050600190811b01905550565b6000602082840312156122c457600080fd5b8151610d7881611aa5565b60ff82811682821603908111156118175761181761210c565b6001815b6001841115612323578085048111156123075761230761210c565b600184161561231557908102905b60019390931c9280026122ec565b935093915050565b60008261233a57506001611817565b8161234757506000611817565b816001811461235d576002811461236757612383565b6001915050611817565b60ff8411156123785761237861210c565b50506001821b611817565b5060208310610133831016604e8410600b84101617156123a6575081810a611817565b6123b360001984846122e8565b80600019048211156123c7576123c761210c565b029392505050565b6000610d7860ff84168361232b565b6000826123fb57634e487b7160e01b600052601260045260246000fd5b500490565b634e487b7160e01b600052603260045260246000fd5b805160208201516001600160e01b031981169190600482101561244d576001600160e01b0319600483900360031b81901b82161692505b5050919050565b60008251612466818460208701611c52565b9190910192915050565b8215158152604060208201526000610d756040830184611c76565b60018060a01b03841681528260208201526060604082015260006124b26060830184611c76565b9594505050505056fea26469706673582212202319d2b5d0cfffcea9cf697c1e15b5596e02941d5f2dd3f609becd517662ab7964736f6c634300081e0033";
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
					readonly internalType: "address";
					readonly name: "msgSender";
					readonly type: "address";
				}
			];
			readonly name: "checkArb";
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
declare class Greeter__factory extends ContractFactory {
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
	static readonly bytecode = "0x608060405234801561001057600080fd5b5060405161065c38038061065c83398101604081905261002f91610058565b600061003b82826101ad565b505061026b565b634e487b7160e01b600052604160045260246000fd5b60006020828403121561006a57600080fd5b81516001600160401b0381111561008057600080fd5b8201601f8101841361009157600080fd5b80516001600160401b038111156100aa576100aa610042565b604051601f8201601f19908116603f011681016001600160401b03811182821017156100d8576100d8610042565b6040528181528282016020018610156100f057600080fd5b60005b8281101561010f576020818501810151838301820152016100f3565b50600091810160200191909152949350505050565b600181811c9082168061013857607f821691505b60208210810361015857634e487b7160e01b600052602260045260246000fd5b50919050565b601f8211156101a857806000526020600020601f840160051c810160208510156101855750805b601f840160051c820191505b818110156101a55760008155600101610191565b50505b505050565b81516001600160401b038111156101c6576101c6610042565b6101da816101d48454610124565b8461015e565b6020601f82116001811461020e57600083156101f65750848201515b600019600385901b1c1916600184901b1784556101a5565b600084815260208120601f198516915b8281101561023e578785015182556020948501946001909201910161021e565b508482101561025c5786840151600019600387901b60f8161c191681555b50505050600190811b01905550565b6103e28061027a6000396000f3fe608060405234801561001057600080fd5b50600436106100365760003560e01c8063a41368621461003b578063cfae321714610050575b600080fd5b61004e61004936600461015d565b61006e565b005b6100586100b5565b6040516100659190610216565b60405180910390f35b600061007a82826102ed565b507f0d332ed5c7d6f1999116748c0eb99c740f276d879d025a5be6435fcf177785de816040516100aa9190610216565b60405180910390a150565b6060600080546100c490610264565b80601f01602080910402602001604051908101604052809291908181526020018280546100f090610264565b801561013d5780601f106101125761010080835404028352916020019161013d565b820191906000526020600020905b81548152906001019060200180831161012057829003601f168201915b5050505050905090565b634e487b7160e01b600052604160045260246000fd5b60006020828403121561016f57600080fd5b813567ffffffffffffffff81111561018657600080fd5b8201601f8101841361019757600080fd5b803567ffffffffffffffff8111156101b1576101b1610147565b604051601f8201601f19908116603f0116810167ffffffffffffffff811182821017156101e0576101e0610147565b6040528181528282016020018610156101f857600080fd5b81602084016020830137600091810160200191909152949350505050565b602081526000825180602084015260005b818110156102445760208186018101516040868401015201610227565b506000604082850101526040601f19601f83011684010191505092915050565b600181811c9082168061027857607f821691505b60208210810361029857634e487b7160e01b600052602260045260246000fd5b50919050565b601f8211156102e857806000526020600020601f840160051c810160208510156102c55750805b601f840160051c820191505b818110156102e557600081556001016102d1565b50505b505050565b815167ffffffffffffffff81111561030757610307610147565b61031b816103158454610264565b8461029e565b6020601f82116001811461034f57600083156103375750848201515b600019600385901b1c1916600184901b1784556102e5565b600084815260208120601f198516915b8281101561037f578785015182556020948501946001909201910161035f565b508482101561039d5786840151600019600387901b60f8161c191681555b50505050600190811b0190555056fea26469706673582212204fd9c551430330e1dc97c5ef3e2dd33232988b0c6616e7b600cbd4378ef234d064736f6c634300081e0033";
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
declare class GreeterChild__factory extends ContractFactory {
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
	static readonly bytecode = "0x608060405234801561001057600080fd5b5060405161097738038061097783398101604081905261002f91610096565b81600061003c82826101fc565b5050600180546001600160a01b0319166001600160a01b0392909216919091179055506102ba565b634e487b7160e01b600052604160045260246000fd5b80516001600160a01b038116811461009157600080fd5b919050565b600080604083850312156100a957600080fd5b82516001600160401b038111156100bf57600080fd5b8301601f810185136100d057600080fd5b80516001600160401b038111156100e9576100e9610064565b604051601f8201601f19908116603f011681016001600160401b038111828210171561011757610117610064565b60405281815282820160200187101561012f57600080fd5b60005b8281101561014e57602081850181015183830182015201610132565b5060006020838301015280945050505061016a6020840161007a565b90509250929050565b600181811c9082168061018757607f821691505b6020821081036101a757634e487b7160e01b600052602260045260246000fd5b50919050565b601f8211156101f757806000526020600020601f840160051c810160208510156101d45750805b601f840160051c820191505b818110156101f457600081556001016101e0565b50505b505050565b81516001600160401b0381111561021557610215610064565b610229816102238454610173565b846101ad565b6020601f82116001811461025d57600083156102455750848201515b600019600385901b1c1916600184901b1784556101f4565b600084815260208120601f198516915b8281101561028d578785015182556020948501946001909201910161026d565b50848210156102ab5786840151600019600387901b60f8161c191681555b50505050600190811b01905550565b6106ae806102c96000396000f3fe608060405234801561001057600080fd5b50600436106100575760003560e01c806323fd78851461005c5780636d58bbd41461008c578063a4136862146100be578063cfae3217146100d1578063e16a5ff9146100e6575b600080fd5b60015461006f906001600160a01b031681565b6040516001600160a01b0390911681526020015b60405180910390f35b6100bc61009a366004610393565b600180546001600160a01b0319166001600160a01b0392909216919091179055565b005b6100bc6100cc3660046103d9565b610107565b6100d96101bb565b60405161008391906104d8565b6100f96100f43660046103d9565b61024d565b604051908152602001610083565b600154610130906001600160a01b03167311110000000000000000000000000000000011110190565b6001600160a01b0316336001600160a01b0316146101af5760405162461bcd60e51b815260206004820152603260248201527f4772656574696e67206f6e6c792075706461746561626c6520627920706172656044820152716e7420636861696e2773206164647265737360701b606482015260840160405180910390fd5b6101b88161034c565b50565b6060600080546101ca906104eb565b80601f01602080910402602001604051908101604052809291908181526020018280546101f6906104eb565b80156102435780601f1061021857610100808354040283529160200191610243565b820191906000526020600020905b81548152906001019060200180831161022657829003601f168201915b5050505050905090565b60008063a413686260e01b8360405160240161026991906104d8565b60408051601f198184030181529181526020820180516001600160e01b03166001600160e01b03199094169390931790925260015491516349460b4d60e11b815290925060009160649163928c169a916102d4916001600160a01b0391909116908690600401610525565b6020604051808303816000875af11580156102f3573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906103179190610551565b60405190915081907f70181b11a3e9262fd1d816a04c5e30d1bb0b8a453a6fe2dfd5db03a8b8fc984590600090a29392505050565b600061035882826105b9565b507f0d332ed5c7d6f1999116748c0eb99c740f276d879d025a5be6435fcf177785de8160405161038891906104d8565b60405180910390a150565b6000602082840312156103a557600080fd5b81356001600160a01b03811681146103bc57600080fd5b9392505050565b634e487b7160e01b600052604160045260246000fd5b6000602082840312156103eb57600080fd5b813567ffffffffffffffff81111561040257600080fd5b8201601f8101841361041357600080fd5b803567ffffffffffffffff81111561042d5761042d6103c3565b604051601f8201601f19908116603f0116810167ffffffffffffffff8111828210171561045c5761045c6103c3565b60405281815282820160200186101561047457600080fd5b81602084016020830137600091810160200191909152949350505050565b6000815180845260005b818110156104b85760208185018101518683018201520161049c565b506000602082860101526020601f19601f83011685010191505092915050565b6020815260006103bc6020830184610492565b600181811c908216806104ff57607f821691505b60208210810361051f57634e487b7160e01b600052602260045260246000fd5b50919050565b6001600160a01b038316815260406020820181905260009061054990830184610492565b949350505050565b60006020828403121561056357600080fd5b5051919050565b601f8211156105b457806000526020600020601f840160051c810160208510156105915750805b601f840160051c820191505b818110156105b1576000815560010161059d565b50505b505050565b815167ffffffffffffffff8111156105d3576105d36103c3565b6105e7816105e184546104eb565b8461056a565b6020601f82116001811461061b57600083156106035750848201515b600019600385901b1c1916600184901b1784556105b1565b600084815260208120601f198516915b8281101561064b578785015182556020948501946001909201910161062b565b50848210156106695786840151600019600387901b60f8161c191681555b50505050600190811b0190555056fea2646970667358221220a595f228205655b3ba3c4ac62e0c6af67802fe364f18523b5da9e56b5ab9093664736f6c634300081e0033";
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
declare class GreeterParent__factory extends ContractFactory {
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
	static readonly bytecode = "0x608060405234801561001057600080fd5b50604051610c19380380610c1983398101604081905261002f916100a2565b82600061003c8282610218565b5050600180546001600160a01b039384166001600160a01b03199182161790915560028054929093169116179055506102d6565b634e487b7160e01b600052604160045260246000fd5b80516001600160a01b038116811461009d57600080fd5b919050565b6000806000606084860312156100b757600080fd5b83516001600160401b038111156100cd57600080fd5b8401601f810186136100de57600080fd5b80516001600160401b038111156100f7576100f7610070565b604051601f8201601f19908116603f011681016001600160401b038111828210171561012557610125610070565b60405281815282820160200188101561013d57600080fd5b60005b8281101561015c57602081850181015183830182015201610140565b5060006020838301015280955050505061017860208501610086565b915061018660408501610086565b90509250925092565b600181811c908216806101a357607f821691505b6020821081036101c357634e487b7160e01b600052602260045260246000fd5b50919050565b601f82111561021357806000526020600020601f840160051c810160208510156101f05750805b601f840160051c820191505b8181101561021057600081556001016101fc565b50505b505050565b81516001600160401b0381111561023157610231610070565b6102458161023f845461018f565b846101c9565b6020601f82116001811461027957600083156102615750848201515b600019600385901b1c1916600184901b178455610210565b600084815260208120601f198516915b828110156102a95787850151825560209485019460019092019101610289565b50848210156102c75786840151600019600387901b60f8161c191681555b50505050600190811b01905550565b610934806102e56000396000f3fe6080604052600436106100555760003560e01c80637c15beee1461005a57806382a5ea4614610080578063a4136862146100b8578063a663866a146100da578063cfae321714610117578063fb0e722b14610139575b600080fd5b61006d6100683660046105fb565b610159565b6040519081526020015b60405180910390f35b34801561008c57600080fd5b506001546100a0906001600160a01b031681565b6040516001600160a01b039091168152602001610077565b3480156100c457600080fd5b506100d86100d336600461064f565b61026b565b005b3480156100e657600080fd5b506100d86100f53660046106a4565b600180546001600160a01b0319166001600160a01b0392909216919091179055565b34801561012357600080fd5b5061012c61047d565b604051610077919061070e565b34801561014557600080fd5b506002546100a0906001600160a01b031681565b60008063a413686260e01b86604051602401610175919061070e565b60408051601f198184030181529181526020820180516001600160e01b03166001600160e01b031990941693909317909252600254600154925163679b6ded60e01b81529193506000926001600160a01b039182169263679b6ded9234926101f09291169086908c90339081908e908e908d90600401610721565b60206040518083038185885af115801561020e573d6000803e3d6000fd5b50505050506040513d601f19601f820116820180604052508101906102339190610780565b60405190915081907fde92b5b7839f4a2c640f5e3bbb66d415458dadc57a487b0c7fa562ed7c9c896f90600090a29695505050505050565b600254604080516373c6754960e11b815290516000926001600160a01b03169163e78cea929160048083019260209291908290030181865afa1580156102b5573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906102d99190610799565b9050336001600160a01b038216146103255760405162461bcd60e51b815260206004820152600a6024820152694e4f545f42524944474560b01b60448201526064015b60405180910390fd5b6000816001600160a01b031663ab5d89436040518163ffffffff1660e01b8152600401602060405180830381865afa158015610365573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906103899190610799565b90506000816001600160a01b03166380648b026040518163ffffffff1660e01b8152600401602060405180830381865afa1580156103cb573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906103ef9190610799565b6001549091506001600160a01b0380831691161461046e5760405162461bcd60e51b815260206004820152603660248201527f4772656574696e67206f6e6c792075706461746561626c65206279207468652060448201527518da1a5b190818da185a5b89dcc818dbdb9d1c9858dd60521b606482015260840161031c565b6104778461050f565b50505050565b60606000805461048c906107b6565b80601f01602080910402602001604051908101604052809291908181526020018280546104b8906107b6565b80156105055780601f106104da57610100808354040283529160200191610505565b820191906000526020600020905b8154815290600101906020018083116104e857829003601f168201915b5050505050905090565b600061051b828261083f565b507f0d332ed5c7d6f1999116748c0eb99c740f276d879d025a5be6435fcf177785de8160405161054b919061070e565b60405180910390a150565b634e487b7160e01b600052604160045260246000fd5b600082601f83011261057d57600080fd5b813567ffffffffffffffff81111561059757610597610556565b604051601f8201601f19908116603f0116810167ffffffffffffffff811182821017156105c6576105c6610556565b6040528181528382016020018510156105de57600080fd5b816020850160208301376000918101602001919091529392505050565b6000806000806080858703121561061157600080fd5b843567ffffffffffffffff81111561062857600080fd5b6106348782880161056c565b97602087013597506040870135966060013595509350505050565b60006020828403121561066157600080fd5b813567ffffffffffffffff81111561067857600080fd5b6106848482850161056c565b949350505050565b6001600160a01b03811681146106a157600080fd5b50565b6000602082840312156106b657600080fd5b81356106c18161068c565b9392505050565b6000815180845260005b818110156106ee576020818501810151868301820152016106d2565b506000602082860101526020601f19601f83011685010191505092915050565b6020815260006106c160208301846106c8565b6001600160a01b038981168252602082018990526040820188905286811660608301528516608082015260a0810184905260c0810183905261010060e08201819052600090610772908301846106c8565b9a9950505050505050505050565b60006020828403121561079257600080fd5b5051919050565b6000602082840312156107ab57600080fd5b81516106c18161068c565b600181811c908216806107ca57607f821691505b6020821081036107ea57634e487b7160e01b600052602260045260246000fd5b50919050565b601f82111561083a57806000526020600020601f840160051c810160208510156108175750805b601f840160051c820191505b818110156108375760008155600101610823565b50505b505050565b815167ffffffffffffffff81111561085957610859610556565b61086d8161086784546107b6565b846107f0565b6020601f8211600181146108a157600083156108895750848201515b600019600385901b1c1916600184901b178455610837565b600084815260208120601f198516915b828110156108d157878501518255602094850194600190920191016108b1565b50848210156108ef5786840151600019600387901b60f8161c191681555b50505050600190811b0190555056fea26469706673582212206e123d3e68ffaba3396dbed0318535c695cbd11416d5ceb6426eec2b7a5e3b8e64736f6c634300081e0033";
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
declare class IERC20Exp__factory {
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
declare class IERC20Mintable__factory {
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
declare class IGateway__factory {
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
declare class IInitializableProxy__factory {
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
					readonly internalType: "string";
					readonly name: "_description";
					readonly type: "string";
				},
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
			];
			readonly name: "proxyDescription";
			readonly outputs: readonly [
				{
					readonly internalType: "bytes";
					readonly name: "";
					readonly type: "bytes";
				}
			];
			readonly stateMutability: "view";
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
declare class Ownable__factory$1 {
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
	static createInterface(): OwnableInterface$1;
	static connect(address: string, runner?: ContractRunner | null): Ownable$1;
}
export type SigLibConstructorParams = [
	signer?: Signer
] | ConstructorParameters<typeof ContractFactory>;
declare class SigLib__factory extends ContractFactory {
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
	static readonly bytecode = "0x60566037600b82828239805160001a607314602a57634e487b7160e01b600052600060045260246000fd5b30600052607381538281f3fe73000000000000000000000000000000000000000030146080604052600080fdfea264697066735822122023c2694e5c8edbf463c9890cbb0a5478a7ddc07e3df00be79a29d6c4fdaf97b064736f6c634300081e0033";
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
declare class WithSettler__factory extends ContractFactory {
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
	static readonly bytecode = "0x6080604052348015600f57600080fd5b506108428061001f6000396000f3fe608060405234801561001057600080fd5b506004361061007c5760003560e01c8063715018a61161005b578063715018a6146100bc5780638da5cb5b146100c4578063b1da41fe14610103578063f2fde38b1461011857600080fd5b8062b105e61461008157806314d3940d14610096578063329bad17146100a9575b600080fd5b61009461008f36600461074a565b61012b565b005b6100946100a436600461074a565b6101cd565b6100946100b736600461074a565b610266565b610094610362565b7f9016d09d72d40fdae2fd8ceac6b6234c7706214fd39c1cd1e609a0528c199300546040516001600160a01b0390911681526020015b60405180910390f35b61010b610376565b6040516100fa9190610773565b61009461012636600461074a565b610387565b6101336103c5565b61013e60008261043b565b6101815760405162461bcd60e51b815260206004820152600f60248201526e24a72b20a624a22fa9a2aa2a2622a960891b60448201526064015b60405180910390fd5b61018c600082610462565b506040516001600160a01b03821681527fc75b24622d5a8552bcfe775a11d9009ac47d4c050a3af79686aebe33f902fc03906020015b60405180910390a150565b6101d56103c5565b6101e060008261043b565b156102215760405162461bcd60e51b8152602060048201526011602482015270222aa82624a1a0aa22afa9a2aa2a2622a960791b6044820152606401610178565b61022c600082610477565b506040516001600160a01b03821681527f0e8d4de8d62b8ad5b1837a4a13009121b82a40e3bdcd6e6f454a72418cc86b0e906020016101c2565b600061027061048c565b805490915060ff600160401b820416159067ffffffffffffffff166000811580156102985750825b905060008267ffffffffffffffff1660011480156102b55750303b155b9050811580156102c3575080155b156102e15760405163f92ee8a960e01b815260040160405180910390fd5b845467ffffffffffffffff19166001178555831561030b57845460ff60401b1916600160401b1785555b610314866104b5565b831561035a57845460ff60401b19168555604051600181527fc7f505b2f371ae2175ee4913f4499e1f2633a7b5936321eed1cdaeb6115181d29060200160405180910390a15b505050505050565b61036a6103c5565b61037460006104cf565b565b60606103826000610540565b905090565b61038f6103c5565b6001600160a01b0381166103b957604051631e4fbdf760e01b815260006004820152602401610178565b6103c2816104cf565b50565b60006103f87f9016d09d72d40fdae2fd8ceac6b6234c7706214fd39c1cd1e609a0528c199300546001600160a01b031690565b90506001600160a01b0381161580159061041b57506001600160a01b0381163314155b156103c25760405163118cdaa760e01b8152336004820152602401610178565b6001600160a01b038116600090815260018301602052604081205415155b90505b92915050565b6000610459836001600160a01b038416610554565b6000610459836001600160a01b038416610647565b6000807ff0c57e16840df040f15088dc2f81fe391c3923bec73e23a9662efc9c229c6a0061045c565b6001600160a01b0381166104c65750335b61022181610696565b7f9016d09d72d40fdae2fd8ceac6b6234c7706214fd39c1cd1e609a0528c19930080546001600160a01b031981166001600160a01b03848116918217845560405192169182907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a3505050565b6060600061054d836106a7565b9392505050565b6000818152600183016020526040812054801561063d5760006105786001836107bf565b855490915060009061058c906001906107bf565b90508082146105f15760008660000182815481106105ac576105ac6107e0565b90600052602060002001549050808760000184815481106105cf576105cf6107e0565b6000918252602080832090910192909255918252600188019052604090208390555b8554869080610602576106026107f6565b60019003818190600052602060002001600090559055856001016000868152602001908152602001600020600090556001935050505061045c565b600091505061045c565b600081815260018301602052604081205461068e5750815460018181018455600084815260208082209093018490558454848252828601909352604090209190915561045c565b50600061045c565b61069e610703565b6103c281610728565b6060816000018054806020026020016040519081016040528092919081815260200182805480156106f757602002820191906000526020600020905b8154815260200190600101908083116106e3575b50505050509050919050565b61070b610730565b61037457604051631afcd79f60e31b815260040160405180910390fd5b61038f610703565b600061073a61048c565b54600160401b900460ff16919050565b60006020828403121561075c57600080fd5b81356001600160a01b038116811461054d57600080fd5b602080825282518282018190526000918401906040840190835b818110156107b45783516001600160a01b031683526020938401939092019160010161078d565b509095945050505050565b8181038181111561045c57634e487b7160e01b600052601160045260246000fd5b634e487b7160e01b600052603260045260246000fd5b634e487b7160e01b600052603160045260246000fdfea26469706673582212200f78ed3435f91821fb62197d6bbfdc8af6ef3e87a7b88501f237bb71622385a164736f6c634300081e0033";
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
			readonly name: "initializeSettler";
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
declare class InitializableProxy__factory extends ContractFactory {
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
	static readonly bytecode = "0x6080604052348015600f57600080fd5b50610aac8061001f6000396000f3fe6080604052600436106100745760003560e01c8063aba001731161004e578063aba00173146100f0578063e612041314610103578063ee0530f414610123578063f851a4401461014557610083565b80634f1ef2861461008b5780635c60da1b1461009e5780638f283970146100d057610083565b366100835761008161015a565b005b61008161015a565b610081610099366004610762565b61016c565b3480156100aa57600080fd5b506100b36101bb565b6040516001600160a01b0390911681526020015b60405180910390f35b3480156100dc57600080fd5b506100816100eb3660046107b0565b6101ca565b6100816100fe3660046107d2565b61020e565b34801561010f57600080fd5b5061008161011e36600461085c565b6102a2565b34801561012f57600080fd5b506101386102e3565b6040516100c791906108bd565b34801561015157600080fd5b506100b3610394565b61016a61016561039e565b6103a8565b565b6101746103d1565b6001600160a01b0316336001600160a01b0316146101ad5760405162461bcd60e51b81526004016101a4906108f0565b60405180910390fd5b6101b782826103db565b5050565b60006101c561039e565b905090565b6101d26103d1565b6001600160a01b0316336001600160a01b0316146102025760405162461bcd60e51b81526004016101a4906108f0565b61020b81610494565b50565b600061021861039e565b6001600160a01b031614801561023e575060006102336103d1565b6001600160a01b0316145b6102805760405162461bcd60e51b81526020600482015260136024820152721053149150511657d253925512505312569151606a1b60448201526064016101a4565b61028983610494565b61029382826103db565b61029c846104e8565b50505050565b6102aa6103d1565b6001600160a01b0316336001600160a01b0316146102da5760405162461bcd60e51b81526004016101a4906108f0565b61020b816104e8565b60607ffcba12fcf625f4823c7c0c86b97ab29721afc9e784836bc00bf04553a0c8dff4805461031190610913565b80601f016020809104026020016040519081016040528092919081815260200182805461033d90610913565b801561038a5780601f1061035f5761010080835404028352916020019161038a565b820191906000526020600020905b81548152906001019060200180831161036d57829003601f168201915b5050505050905090565b60006101c56103d1565b60006101c5610555565b3660008037600080366000845af43d6000803e8080156103c7573d6000f35b3d6000fd5b505050565b60006101c5610588565b6103e4826105b0565b6040516001600160a01b038316907fbc7cd75a20ee27fd9adebab32041f755214dbc6bffa90cc0225b39da2e5c2d3b90600090a280511561048c57600080836001600160a01b03168360405161043a919061094d565b600060405180830381855af49150503d8060008114610475576040519150601f19603f3d011682016040523d82523d6000602084013e61047a565b606091505b50915091508161029c57805181602001fd5b6101b761062a565b7f7e644d79422f17c01e4894b5f4f588d331ebfa28653d42ae832dc59e38c9798f6104bd610588565b604080516001600160a01b03928316815291841660208301520160405180910390a161020b81610649565b80511561020b577ffcba12fcf625f4823c7c0c86b97ab29721afc9e784836bc00bf04553a0c8dff461051a82826109b7565b507f8a1bce929b257bfd582fa164d9b9fa4d4b0b7442b10b3aad23e2c56aa4e0d61a8160405161054a91906108bd565b60405180910390a150565b60007f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc5b546001600160a01b0316919050565b60007fb53127684a568b3173ae13b9f8a6016e243e63b6e8ee1178d6a717850b5d6103610579565b806001600160a01b03163b6000036105e657604051634c9c8ce360e01b81526001600160a01b03821660048201526024016101a4565b807f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc5b80546001600160a01b0319166001600160a01b039290921691909117905550565b341561016a5760405163b398979f60e01b815260040160405180910390fd5b6001600160a01b03811661067357604051633173bdd160e11b8152600060048201526024016101a4565b807fb53127684a568b3173ae13b9f8a6016e243e63b6e8ee1178d6a717850b5d6103610609565b80356001600160a01b03811681146106b157600080fd5b919050565b634e487b7160e01b600052604160045260246000fd5b600082601f8301126106dd57600080fd5b81356020830160008067ffffffffffffffff8411156106fe576106fe6106b6565b50604051601f19601f85018116603f0116810181811067ffffffffffffffff8211171561072d5761072d6106b6565b60405283815290508082840187101561074557600080fd5b838360208301376000602085830101528094505050505092915050565b6000806040838503121561077557600080fd5b61077e8361069a565b9150602083013567ffffffffffffffff81111561079a57600080fd5b6107a6858286016106cc565b9150509250929050565b6000602082840312156107c257600080fd5b6107cb8261069a565b9392505050565b600080600080608085870312156107e857600080fd5b843567ffffffffffffffff8111156107ff57600080fd5b61080b878288016106cc565b94505061081a6020860161069a565b92506108286040860161069a565b9150606085013567ffffffffffffffff81111561084457600080fd5b610850878288016106cc565b91505092959194509250565b60006020828403121561086e57600080fd5b813567ffffffffffffffff81111561088557600080fd5b610891848285016106cc565b949350505050565b60005b838110156108b457818101518382015260200161089c565b50506000910152565b60208152600082518060208401526108dc816040850160208701610899565b601f01601f19169190910160400192915050565b6020808252600990820152682727aa2fa0a226a4a760b91b604082015260600190565b600181811c9082168061092757607f821691505b60208210810361094757634e487b7160e01b600052602260045260246000fd5b50919050565b6000825161095f818460208701610899565b9190910192915050565b601f8211156103cc57806000526020600020601f840160051c810160208510156109905750805b601f840160051c820191505b818110156109b0576000815560010161099c565b5050505050565b815167ffffffffffffffff8111156109d1576109d16106b6565b6109e5816109df8454610913565b84610969565b6020601f821160018114610a195760008315610a015750848201515b600019600385901b1c1916600184901b1784556109b0565b600084815260208120601f198516915b82811015610a495787850151825560209485019460019092019101610a29565b5084821015610a675786840151600019600387901b60f8161c191681555b50505050600190811b0190555056fea2646970667358221220248be40a63d65cf62c84670e7a6c41e2f1489219290c7f8ebe9df7c423cd5a8f64736f6c634300081e0033";
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
					readonly indexed: false;
					readonly internalType: "string";
					readonly name: "description";
					readonly type: "string";
				}
			];
			readonly name: "DescriptionChanged";
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
				{
					readonly internalType: "string";
					readonly name: "_description";
					readonly type: "string";
				}
			];
			readonly name: "changeDescription";
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
					readonly internalType: "string";
					readonly name: "_description";
					readonly type: "string";
				},
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
			];
			readonly name: "proxyDescription";
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
declare class Arowana__factory extends ContractFactory {
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
	static readonly bytecode = "0x61018060405234801561001157600080fd5b506040518060400160405280600781526020016641726f77616e6160c81b81525080604051806040016040528060018152602001603160f81b8152506040518060400160405280600781526020016641726f77616e6160c81b8152506040518060400160405280600381526020016241525760e81b815250816003908161009891906103f7565b5060046100a582826103f7565b506100b59150839050600561017e565b610120526100c481600661017e565b61014052815160208084019190912060e052815190820120610100524660a05261015160e05161010051604080517f8b73c3c69bb8fe3d512ecc4cf759cc79239f7b179b0ffacaa9a75d522b39400f60208201529081019290925260608201524660808201523060a082015260009060c00160405160208183030381529060405280519060200120905090565b60805250503060c052506b019d971e4fe8401e740000006101608190526101799033906101b1565b610548565b600060208351101561019a57610193836101f0565b90506101ab565b816101a584826103f7565b5060ff90505b92915050565b6001600160a01b0382166101e05760405163ec442f0560e01b8152600060048201526024015b60405180910390fd5b6101ec6000838361022e565b5050565b600080829050601f8151111561021b578260405163305a27a960e01b81526004016101d791906104b5565b805161022682610503565b179392505050565b6001600160a01b03831661025957806002600082825461024e9190610527565b909155506102cb9050565b6001600160a01b038316600090815260208190526040902054818110156102ac5760405163391434e360e21b81526001600160a01b038516600482015260248101829052604481018390526064016101d7565b6001600160a01b03841660009081526020819052604090209082900390555b6001600160a01b0382166102e757600280548290039055610306565b6001600160a01b03821660009081526020819052604090208054820190555b816001600160a01b0316836001600160a01b03167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef8360405161034b91815260200190565b60405180910390a3505050565b634e487b7160e01b600052604160045260246000fd5b600181811c9082168061038257607f821691505b6020821081036103a257634e487b7160e01b600052602260045260246000fd5b50919050565b601f8211156103f257806000526020600020601f840160051c810160208510156103cf5750805b601f840160051c820191505b818110156103ef57600081556001016103db565b50505b505050565b81516001600160401b0381111561041057610410610358565b6104248161041e845461036e565b846103a8565b6020601f82116001811461045857600083156104405750848201515b600019600385901b1c1916600184901b1784556103ef565b600084815260208120601f198516915b828110156104885787850151825560209485019460019092019101610468565b50848210156104a65786840151600019600387901b60f8161c191681555b50505050600190811b01905550565b602081526000825180602084015260005b818110156104e357602081860181015160408684010152016104c6565b506000604082850101526040601f19601f83011684010191505092915050565b805160208083015191908110156103a25760001960209190910360031b1b16919050565b808201808211156101ab57634e487b7160e01b600052601160045260246000fd5b60805160a05160c05160e05161010051610120516101405161016051610fef6105ad6000396000610234015260006107d9015260006107ac0152600061071e015260006106f6015260006106510152600061067b015260006106a50152610fef6000f3fe608060405234801561001057600080fd5b50600436106101005760003560e01c806379cc679011610097578063a9059cbb11610066578063a9059cbb14610209578063d505accf1461021c578063d5abeb011461022f578063dd62ed3e1461025657600080fd5b806379cc6790146101c05780637ecebe00146101d357806384b0196e146101e657806395d89b411461020157600080fd5b8063313ce567116100d3578063313ce5671461016b5780633644e5151461017a57806342966c681461018257806370a082311461019757600080fd5b806306fdde0314610105578063095ea7b31461012357806318160ddd1461014657806323b872dd14610158575b600080fd5b61010d61028f565b60405161011a9190610d39565b60405180910390f35b610136610131366004610d6f565b610321565b604051901515815260200161011a565b6002545b60405190815260200161011a565b610136610166366004610d99565b61033b565b6040516012815260200161011a565b61014a61035f565b610195610190366004610dd6565b61036e565b005b61014a6101a5366004610def565b6001600160a01b031660009081526020819052604090205490565b6101956101ce366004610d6f565b61037b565b61014a6101e1366004610def565b610394565b6101ee6103b2565b60405161011a9796959493929190610e0a565b61010d6103f8565b610136610217366004610d6f565b610407565b61019561022a366004610ea2565b610415565b61014a7f000000000000000000000000000000000000000000000000000000000000000081565b61014a610264366004610f15565b6001600160a01b03918216600090815260016020908152604080832093909416825291909152205490565b60606003805461029e90610f48565b80601f01602080910402602001604051908101604052809291908181526020018280546102ca90610f48565b80156103175780601f106102ec57610100808354040283529160200191610317565b820191906000526020600020905b8154815290600101906020018083116102fa57829003601f168201915b5050505050905090565b60003361032f818585610554565b60019150505b92915050565b600033610349858285610566565b6103548585856105e5565b506001949350505050565b6000610369610644565b905090565b610378338261076f565b50565b610386823383610566565b610390828261076f565b5050565b6001600160a01b038116600090815260076020526040812054610335565b6000606080600080600060606103c66107a5565b6103ce6107d2565b60408051600080825260208201909252600f60f81b9b939a50919850469750309650945092509050565b60606004805461029e90610f48565b60003361032f8185856105e5565b8342111561043e5760405163313c898160e11b8152600481018590526024015b60405180910390fd5b60007f6e71edae12b1b97f4d1f60370fef10105fa2faae0126114a169c64845d6126c988888861048b8c6001600160a01b0316600090815260076020526040902080546001810190915590565b6040805160208101969096526001600160a01b0394851690860152929091166060840152608083015260a082015260c0810186905260e00160405160208183030381529060405280519060200120905060006104e6826107ff565b905060006104f68287878761082c565b9050896001600160a01b0316816001600160a01b03161461053d576040516325c0072360e11b81526001600160a01b0380831660048301528b166024820152604401610435565b6105488a8a8a610554565b50505050505050505050565b610561838383600161085a565b505050565b6001600160a01b038381166000908152600160209081526040808320938616835292905220546000198110156105df57818110156105d057604051637dc7a0d960e11b81526001600160a01b03841660048201526024810182905260448101839052606401610435565b6105df8484848403600061085a565b50505050565b6001600160a01b03831661060f57604051634b637e8f60e11b815260006004820152602401610435565b6001600160a01b0382166106395760405163ec442f0560e01b815260006004820152602401610435565b61056183838361092f565b6000306001600160a01b037f00000000000000000000000000000000000000000000000000000000000000001614801561069d57507f000000000000000000000000000000000000000000000000000000000000000046145b156106c757507f000000000000000000000000000000000000000000000000000000000000000090565b610369604080517f8b73c3c69bb8fe3d512ecc4cf759cc79239f7b179b0ffacaa9a75d522b39400f60208201527f0000000000000000000000000000000000000000000000000000000000000000918101919091527f000000000000000000000000000000000000000000000000000000000000000060608201524660808201523060a082015260009060c00160405160208183030381529060405280519060200120905090565b6001600160a01b03821661079957604051634b637e8f60e11b815260006004820152602401610435565b6103908260008361092f565b60606103697f00000000000000000000000000000000000000000000000000000000000000006005610a59565b60606103697f00000000000000000000000000000000000000000000000000000000000000006006610a59565b600061033561080c610644565b8360405161190160f01b8152600281019290925260228201526042902090565b60008060008061083e88888888610b04565b92509250925061084e8282610bd3565b50909695505050505050565b6001600160a01b0384166108845760405163e602df0560e01b815260006004820152602401610435565b6001600160a01b0383166108ae57604051634a1406b160e11b815260006004820152602401610435565b6001600160a01b03808516600090815260016020908152604080832093871683529290522082905580156105df57826001600160a01b0316846001600160a01b03167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b9258460405161092191815260200190565b60405180910390a350505050565b6001600160a01b03831661095a57806002600082825461094f9190610f82565b909155506109cc9050565b6001600160a01b038316600090815260208190526040902054818110156109ad5760405163391434e360e21b81526001600160a01b03851660048201526024810182905260448101839052606401610435565b6001600160a01b03841660009081526020819052604090209082900390555b6001600160a01b0382166109e857600280548290039055610a07565b6001600160a01b03821660009081526020819052604090208054820190555b816001600160a01b0316836001600160a01b03167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef83604051610a4c91815260200190565b60405180910390a3505050565b606060ff8314610a7357610a6c83610c8c565b9050610335565b818054610a7f90610f48565b80601f0160208091040260200160405190810160405280929190818152602001828054610aab90610f48565b8015610af85780601f10610acd57610100808354040283529160200191610af8565b820191906000526020600020905b815481529060010190602001808311610adb57829003601f168201915b50505050509050610335565b600080807f7fffffffffffffffffffffffffffffff5d576e7357a4501ddfe92f46681b20a0841115610b3f5750600091506003905082610bc9565b604080516000808252602082018084528a905260ff891692820192909252606081018790526080810186905260019060a0016020604051602081039080840390855afa158015610b93573d6000803e3d6000fd5b5050604051601f1901519150506001600160a01b038116610bbf57506000925060019150829050610bc9565b9250600091508190505b9450945094915050565b6000826003811115610be757610be7610fa3565b03610bf0575050565b6001826003811115610c0457610c04610fa3565b03610c225760405163f645eedf60e01b815260040160405180910390fd5b6002826003811115610c3657610c36610fa3565b03610c575760405163fce698f760e01b815260048101829052602401610435565b6003826003811115610c6b57610c6b610fa3565b03610390576040516335e2f38360e21b815260048101829052602401610435565b60606000610c9983610ccb565b604080516020808252818301909252919250600091906020820181803683375050509182525060208101929092525090565b600060ff8216601f81111561033557604051632cd44ac360e21b815260040160405180910390fd5b6000815180845260005b81811015610d1957602081850181015186830182015201610cfd565b506000602082860101526020601f19601f83011685010191505092915050565b602081526000610d4c6020830184610cf3565b9392505050565b80356001600160a01b0381168114610d6a57600080fd5b919050565b60008060408385031215610d8257600080fd5b610d8b83610d53565b946020939093013593505050565b600080600060608486031215610dae57600080fd5b610db784610d53565b9250610dc560208501610d53565b929592945050506040919091013590565b600060208284031215610de857600080fd5b5035919050565b600060208284031215610e0157600080fd5b610d4c82610d53565b60ff60f81b8816815260e060208201526000610e2960e0830189610cf3565b8281036040840152610e3b8189610cf3565b606084018890526001600160a01b038716608085015260a0840186905283810360c08501528451808252602080870193509091019060005b81811015610e91578351835260209384019390920191600101610e73565b50909b9a5050505050505050505050565b600080600080600080600060e0888a031215610ebd57600080fd5b610ec688610d53565b9650610ed460208901610d53565b95506040880135945060608801359350608088013560ff81168114610ef857600080fd5b9699959850939692959460a0840135945060c09093013592915050565b60008060408385031215610f2857600080fd5b610f3183610d53565b9150610f3f60208401610d53565b90509250929050565b600181811c90821680610f5c57607f821691505b602082108103610f7c57634e487b7160e01b600052602260045260246000fd5b50919050565b8082018082111561033557634e487b7160e01b600052601160045260246000fd5b634e487b7160e01b600052602160045260246000fdfea2646970667358221220b222bc60bc80476c2bbaf3471923005e9bffd31905a3e9aff7b22df1e1658d2264736f6c634300081e0033";
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
declare class ERC20Mock__factory extends ContractFactory {
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
	static readonly bytecode = "0x61018060405234801561001157600080fd5b506040516118a63803806118a68339810160408190526100309161045f565b338480604051806040016040528060018152602001603160f81b8152508787816003908161005e9190610571565b50600461006b8282610571565b5061007b91508390506005610175565b6101205261008a816006610175565b61014052815160208084019190912060e052815190820120610100524660a05261011760e05161010051604080517f8b73c3c69bb8fe3d512ecc4cf759cc79239f7b179b0ffacaa9a75d522b39400f60208201529081019290925260608201524660808201523060a082015260009060c00160405160208183030381529060405280519060200120905090565b60805250503060c052506001600160a01b03811661015057604051631e4fbdf760e01b8152600060048201526024015b60405180910390fd5b610159816101a8565b5060ff82166101605261016c33826101fa565b505050506106a7565b60006020835110156101915761018a83610234565b90506101a2565b8161019c8482610571565b5060ff90505b92915050565b600880546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b6001600160a01b0382166102245760405163ec442f0560e01b815260006004820152602401610147565b61023060008383610272565b5050565b600080829050601f8151111561025f578260405163305a27a960e01b8152600401610147919061062f565b805161026a82610662565b179392505050565b6001600160a01b03831661029d5780600260008282546102929190610686565b9091555061030f9050565b6001600160a01b038316600090815260208190526040902054818110156102f05760405163391434e360e21b81526001600160a01b03851660048201526024810182905260448101839052606401610147565b6001600160a01b03841660009081526020819052604090209082900390555b6001600160a01b03821661032b5760028054829003905561034a565b6001600160a01b03821660009081526020819052604090208054820190555b816001600160a01b0316836001600160a01b03167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef8360405161038f91815260200190565b60405180910390a3505050565b634e487b7160e01b600052604160045260246000fd5b60005b838110156103cd5781810151838201526020016103b5565b50506000910152565b600082601f8301126103e757600080fd5b81516001600160401b038111156104005761040061039c565b604051601f8201601f19908116603f011681016001600160401b038111828210171561042e5761042e61039c565b60405281815283820160200185101561044657600080fd5b6104578260208301602087016103b2565b949350505050565b6000806000806080858703121561047557600080fd5b84516001600160401b0381111561048b57600080fd5b610497878288016103d6565b602087015190955090506001600160401b038111156104b557600080fd5b6104c1878288016103d6565b935050604085015160ff811681146104d857600080fd5b6060959095015193969295505050565b600181811c908216806104fc57607f821691505b60208210810361051c57634e487b7160e01b600052602260045260246000fd5b50919050565b601f82111561056c57806000526020600020601f840160051c810160208510156105495750805b601f840160051c820191505b818110156105695760008155600101610555565b50505b505050565b81516001600160401b0381111561058a5761058a61039c565b61059e8161059884546104e8565b84610522565b6020601f8211600181146105d257600083156105ba5750848201515b600019600385901b1c1916600184901b178455610569565b600084815260208120601f198516915b8281101561060257878501518255602094850194600190920191016105e2565b50848210156106205786840151600019600387901b60f8161c191681555b50505050600190811b01905550565b602081526000825180602084015261064e8160408501602087016103b2565b601f01601f19169190910160400192915050565b8051602080830151919081101561051c5760001960209190910360031b1b16919050565b808201808211156101a257634e487b7160e01b600052601160045260246000fd5b60805160a05160c05160e0516101005161012051610140516101605161119a61070c600039600061019e015260006109840152600061095701526000610814015260006107ec01526000610747015260006107710152600061079b015261119a6000f3fe608060405234801561001057600080fd5b506004361061012c5760003560e01c806379cc6790116100ad578063a0712d6811610071578063a0712d681461028d578063a9059cbb146102a0578063d505accf146102b3578063dd62ed3e146102c6578063f2fde38b146102ff57600080fd5b806379cc6790146102295780637ecebe001461023c57806384b0196e1461024f5780638da5cb5b1461026a57806395d89b411461028557600080fd5b80633644e515116100f45780633644e515146101c857806340c10f19146101d057806342966c68146101e557806370a08231146101f8578063715018a61461022157600080fd5b806306fdde0314610131578063095ea7b31461014f57806318160ddd1461017257806323b872dd14610184578063313ce56714610197575b600080fd5b610139610312565b6040516101469190610ee4565b60405180910390f35b61016261015d366004610f1a565b6103a4565b6040519015158152602001610146565b6002545b604051908152602001610146565b610162610192366004610f44565b6103be565b60405160ff7f0000000000000000000000000000000000000000000000000000000000000000168152602001610146565b6101766103e2565b6101e36101de366004610f1a565b6103f1565b005b6101e36101f3366004610f81565b610407565b610176610206366004610f9a565b6001600160a01b031660009081526020819052604090205490565b6101e3610414565b6101e3610237366004610f1a565b610428565b61017661024a366004610f9a565b61043d565b61025761045b565b6040516101469796959493929190610fb5565b6008546040516001600160a01b039091168152602001610146565b6101396104a1565b6101e361029b366004610f81565b6104b0565b6101626102ae366004610f1a565b6104c2565b6101e36102c136600461104d565b6104d0565b6101766102d43660046110c0565b6001600160a01b03918216600090815260016020908152604080832093909416825291909152205490565b6101e361030d366004610f9a565b61060f565b606060038054610321906110f3565b80601f016020809104026020016040519081016040528092919081815260200182805461034d906110f3565b801561039a5780601f1061036f5761010080835404028352916020019161039a565b820191906000526020600020905b81548152906001019060200180831161037d57829003601f168201915b5050505050905090565b6000336103b281858561064a565b60019150505b92915050565b6000336103cc85828561065c565b6103d78585856106db565b506001949350505050565b60006103ec61073a565b905090565b6103f9610865565b6104038282610892565b5050565b61041133826108c8565b50565b61041c610865565b61042660006108fe565b565b61043382338361065c565b61040382826108c8565b6001600160a01b0381166000908152600760205260408120546103b8565b60006060806000806000606061046f610950565b61047761097d565b60408051600080825260208201909252600f60f81b9b939a50919850469750309650945092509050565b606060048054610321906110f3565b6104b8610865565b6104113382610892565b6000336103b28185856106db565b834211156104f95760405163313c898160e11b8152600481018590526024015b60405180910390fd5b60007f6e71edae12b1b97f4d1f60370fef10105fa2faae0126114a169c64845d6126c98888886105468c6001600160a01b0316600090815260076020526040902080546001810190915590565b6040805160208101969096526001600160a01b0394851690860152929091166060840152608083015260a082015260c0810186905260e00160405160208183030381529060405280519060200120905060006105a1826109aa565b905060006105b1828787876109d7565b9050896001600160a01b0316816001600160a01b0316146105f8576040516325c0072360e11b81526001600160a01b0380831660048301528b1660248201526044016104f0565b6106038a8a8a61064a565b50505050505050505050565b610617610865565b6001600160a01b03811661064157604051631e4fbdf760e01b8152600060048201526024016104f0565b610411816108fe565b6106578383836001610a05565b505050565b6001600160a01b038381166000908152600160209081526040808320938616835292905220546000198110156106d557818110156106c657604051637dc7a0d960e11b81526001600160a01b038416600482015260248101829052604481018390526064016104f0565b6106d584848484036000610a05565b50505050565b6001600160a01b03831661070557604051634b637e8f60e11b8152600060048201526024016104f0565b6001600160a01b03821661072f5760405163ec442f0560e01b8152600060048201526024016104f0565b610657838383610ada565b6000306001600160a01b037f00000000000000000000000000000000000000000000000000000000000000001614801561079357507f000000000000000000000000000000000000000000000000000000000000000046145b156107bd57507f000000000000000000000000000000000000000000000000000000000000000090565b6103ec604080517f8b73c3c69bb8fe3d512ecc4cf759cc79239f7b179b0ffacaa9a75d522b39400f60208201527f0000000000000000000000000000000000000000000000000000000000000000918101919091527f000000000000000000000000000000000000000000000000000000000000000060608201524660808201523060a082015260009060c00160405160208183030381529060405280519060200120905090565b6008546001600160a01b031633146104265760405163118cdaa760e01b81523360048201526024016104f0565b6001600160a01b0382166108bc5760405163ec442f0560e01b8152600060048201526024016104f0565b61040360008383610ada565b6001600160a01b0382166108f257604051634b637e8f60e11b8152600060048201526024016104f0565b61040382600083610ada565b600880546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b60606103ec7f00000000000000000000000000000000000000000000000000000000000000006005610c04565b60606103ec7f00000000000000000000000000000000000000000000000000000000000000006006610c04565b60006103b86109b761073a565b8360405161190160f01b8152600281019290925260228201526042902090565b6000806000806109e988888888610caf565b9250925092506109f98282610d7e565b50909695505050505050565b6001600160a01b038416610a2f5760405163e602df0560e01b8152600060048201526024016104f0565b6001600160a01b038316610a5957604051634a1406b160e11b8152600060048201526024016104f0565b6001600160a01b03808516600090815260016020908152604080832093871683529290522082905580156106d557826001600160a01b0316846001600160a01b03167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92584604051610acc91815260200190565b60405180910390a350505050565b6001600160a01b038316610b05578060026000828254610afa919061112d565b90915550610b779050565b6001600160a01b03831660009081526020819052604090205481811015610b585760405163391434e360e21b81526001600160a01b038516600482015260248101829052604481018390526064016104f0565b6001600160a01b03841660009081526020819052604090209082900390555b6001600160a01b038216610b9357600280548290039055610bb2565b6001600160a01b03821660009081526020819052604090208054820190555b816001600160a01b0316836001600160a01b03167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef83604051610bf791815260200190565b60405180910390a3505050565b606060ff8314610c1e57610c1783610e37565b90506103b8565b818054610c2a906110f3565b80601f0160208091040260200160405190810160405280929190818152602001828054610c56906110f3565b8015610ca35780601f10610c7857610100808354040283529160200191610ca3565b820191906000526020600020905b815481529060010190602001808311610c8657829003601f168201915b505050505090506103b8565b600080807f7fffffffffffffffffffffffffffffff5d576e7357a4501ddfe92f46681b20a0841115610cea5750600091506003905082610d74565b604080516000808252602082018084528a905260ff891692820192909252606081018790526080810186905260019060a0016020604051602081039080840390855afa158015610d3e573d6000803e3d6000fd5b5050604051601f1901519150506001600160a01b038116610d6a57506000925060019150829050610d74565b9250600091508190505b9450945094915050565b6000826003811115610d9257610d9261114e565b03610d9b575050565b6001826003811115610daf57610daf61114e565b03610dcd5760405163f645eedf60e01b815260040160405180910390fd5b6002826003811115610de157610de161114e565b03610e025760405163fce698f760e01b8152600481018290526024016104f0565b6003826003811115610e1657610e1661114e565b03610403576040516335e2f38360e21b8152600481018290526024016104f0565b60606000610e4483610e76565b604080516020808252818301909252919250600091906020820181803683375050509182525060208101929092525090565b600060ff8216601f8111156103b857604051632cd44ac360e21b815260040160405180910390fd5b6000815180845260005b81811015610ec457602081850181015186830182015201610ea8565b506000602082860101526020601f19601f83011685010191505092915050565b602081526000610ef76020830184610e9e565b9392505050565b80356001600160a01b0381168114610f1557600080fd5b919050565b60008060408385031215610f2d57600080fd5b610f3683610efe565b946020939093013593505050565b600080600060608486031215610f5957600080fd5b610f6284610efe565b9250610f7060208501610efe565b929592945050506040919091013590565b600060208284031215610f9357600080fd5b5035919050565b600060208284031215610fac57600080fd5b610ef782610efe565b60ff60f81b8816815260e060208201526000610fd460e0830189610e9e565b8281036040840152610fe68189610e9e565b606084018890526001600160a01b038716608085015260a0840186905283810360c08501528451808252602080870193509091019060005b8181101561103c57835183526020938401939092019160010161101e565b50909b9a5050505050505050505050565b600080600080600080600060e0888a03121561106857600080fd5b61107188610efe565b965061107f60208901610efe565b95506040880135945060608801359350608088013560ff811681146110a357600080fd5b9699959850939692959460a0840135945060c09093013592915050565b600080604083850312156110d357600080fd5b6110dc83610efe565b91506110ea60208401610efe565b90509250929050565b600181811c9082168061110757607f821691505b60208210810361112757634e487b7160e01b600052602260045260246000fd5b50919050565b808201808211156103b857634e487b7160e01b600052601160045260246000fd5b634e487b7160e01b600052602160045260246000fdfea264697066735822122078add9d6798a5a3e41fdaf38a266d27ce93f256d8046c8d4281c1882137b31bd64736f6c634300081e0033";
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
export declare function getTokenInfo(token: unknown, user?: SignerWithAddress | string): Promise<{
	name: string;
	symbol: string;
	decimals: number;
	totalSupply: number;
	balance: number;
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
declare namespace ownableSol$1 {
	export { Ownable$1 as Ownable };
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
declare namespace arwSupplySol {
	export { ARWSupply };
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
	export { ownableSol$1 as ownableSol, sigLibSol, withSettlerSol };
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
	export { arbitrum$1 as arbitrum, arwSupplySol$1 as arwSupplySol, interfaces$3 as interfaces, libraries$3 as libraries, lockSol$1 as lockSol, proxy$5 as proxy, tokens$1 as tokens };
}
declare namespace ownableSol$2 {
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
	export { ownableSol$2 as ownableSol };
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
declare namespace ownableSol$3 {
	export { Ownable__factory$1 as Ownable__factory };
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
declare namespace arwSupplySol$1 {
	export { ARWSupply__factory };
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
	export { ownableSol$3 as ownableSol, sigLibSol$1 as sigLibSol, withSettlerSol$1 as withSettlerSol };
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
	export { arbitrum, arwSupplySol, interfaces$1 as interfaces, libraries$1 as libraries, lockSol, proxy$2 as proxy, tokens };
}
declare namespace contracts$4 {
	export { ARWSupply, ARWSupply__factory, AbsOutbox, AbsOutbox__factory, Address, Address__factory, ArbGateway, ArbGatewaySettle, ArbGatewaySettle__factory, ArbGateway__factory, ArbSys, ArbSys__factory, Arowana, Arowana__factory, ContextUpgradeable, ContextUpgradeable__factory, ECDSA, ECDSA__factory, EIP712, EIP712__factory, ERC1967Utils, ERC1967Utils__factory, ERC20, ERC20Burnable, ERC20Burnable__factory, ERC20Mock, ERC20Mock__factory, ERC20Permit, ERC20Permit__factory, ERC20__factory, Errors, Errors__factory, Greeter, GreeterChild, GreeterChild__factory, GreeterParent, GreeterParent__factory, Greeter__factory, IBeacon, IBeacon__factory, IBridge, IBridge__factory, IDelayedMessageProvider, IDelayedMessageProvider__factory, IERC1155Errors, IERC1155Errors__factory, IERC1363, IERC1363__factory, IERC165, IERC165__factory, IERC1967, IERC1967__factory, IERC20, IERC20Errors, IERC20Errors__factory, IERC20Exp, IERC20Exp__factory, IERC20Metadata, IERC20Metadata__factory, IERC20Mintable, IERC20Mintable__factory, IERC20Permit, IERC20Permit__factory, IERC20__factory, IERC5267, IERC5267__factory, IERC721Errors, IERC721Errors__factory, IFeeTokenPricer, IFeeTokenPricer__factory, IGasRefunder, IGasRefunder__factory, IGateway, IGateway__factory, IInbox, IInboxBase, IInboxBase__factory, IInbox__factory, IInitializableProxy, IInitializableProxy__factory, IOutbox, IOutbox__factory, IOwnable, IOwnable__factory, ISequencerInbox, ISequencerInbox__factory, Initializable, InitializableProxy, InitializableProxy__factory, Initializable__factory, Lock$1 as Lock, Lock__factory, NodeInterface, NodeInterface__factory, Nonces, Nonces__factory, Outbox, Outbox__factory, Ownable$1 as Ownable, OwnableUpgradeable, OwnableUpgradeable__factory, Ownable__factory$1 as Ownable__factory, Proxy$1 as Proxy, Proxy__factory, SafeCast, SafeCast__factory, SafeERC20, SafeERC20__factory, ShortStrings, ShortStrings__factory, SigLib, SigLib__factory, Strings, Strings__factory, WithSettler, WithSettler__factory, arbitrum$3 as arbitrum, contracts$3 as contracts, factories, openzeppelin$1 as openzeppelin };
}

export {
	contracts$4 as contracts,
};

export {};
