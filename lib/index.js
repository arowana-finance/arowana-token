import { Interface, Contract, ContractFactory, getAddress, AbiCoder, keccak256, concat, encodeRlp, ZeroAddress, dataLength, parseEther, formatUnits, parseUnits } from 'ethers';
import { toFixedHex } from 'ethers-opt';

const _abi$W = [
  {
    inputs: [],
    name: "AlreadyInit",
    type: "error"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "index",
        type: "uint256"
      }
    ],
    name: "AlreadySpent",
    type: "error"
  },
  {
    inputs: [],
    name: "BadPostUpgradeInit",
    type: "error"
  },
  {
    inputs: [],
    name: "BridgeCallFailed",
    type: "error"
  },
  {
    inputs: [],
    name: "HadZeroInit",
    type: "error"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "actualLength",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "maxProofLength",
        type: "uint256"
      }
    ],
    name: "MerkleProofTooLong",
    type: "error"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "sender",
        type: "address"
      },
      {
        internalType: "address",
        name: "owner",
        type: "address"
      }
    ],
    name: "NotOwner",
    type: "error"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "sender",
        type: "address"
      },
      {
        internalType: "address",
        name: "rollup",
        type: "address"
      }
    ],
    name: "NotRollup",
    type: "error"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "index",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "maxIndex",
        type: "uint256"
      }
    ],
    name: "PathNotMinimal",
    type: "error"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "proofLength",
        type: "uint256"
      }
    ],
    name: "ProofTooLong",
    type: "error"
  },
  {
    inputs: [],
    name: "RollupNotChanged",
    type: "error"
  },
  {
    inputs: [],
    name: "SimulationOnlyEntrypoint",
    type: "error"
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "root",
        type: "bytes32"
      }
    ],
    name: "UnknownRoot",
    type: "error"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address"
      },
      {
        indexed: true,
        internalType: "address",
        name: "l2Sender",
        type: "address"
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "zero",
        type: "uint256"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "transactionIndex",
        type: "uint256"
      }
    ],
    name: "OutBoxTransactionExecuted",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "outputRoot",
        type: "bytes32"
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "l2BlockHash",
        type: "bytes32"
      }
    ],
    name: "SendRootUpdated",
    type: "event"
  },
  {
    inputs: [],
    name: "OUTBOX_VERSION",
    outputs: [
      {
        internalType: "uint128",
        name: "",
        type: "uint128"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "bridge",
    outputs: [
      {
        internalType: "contract IBridge",
        name: "",
        type: "address"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "l2Sender",
        type: "address"
      },
      {
        internalType: "address",
        name: "to",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "l2Block",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "l1Block",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "l2Timestamp",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256"
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes"
      }
    ],
    name: "calculateItemHash",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32"
      }
    ],
    stateMutability: "pure",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "bytes32[]",
        name: "proof",
        type: "bytes32[]"
      },
      {
        internalType: "uint256",
        name: "path",
        type: "uint256"
      },
      {
        internalType: "bytes32",
        name: "item",
        type: "bytes32"
      }
    ],
    name: "calculateMerkleRoot",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32"
      }
    ],
    stateMutability: "pure",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "bytes32[]",
        name: "proof",
        type: "bytes32[]"
      },
      {
        internalType: "uint256",
        name: "index",
        type: "uint256"
      },
      {
        internalType: "address",
        name: "l2Sender",
        type: "address"
      },
      {
        internalType: "address",
        name: "to",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "l2Block",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "l1Block",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "l2Timestamp",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256"
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes"
      }
    ],
    name: "executeTransaction",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "index",
        type: "uint256"
      },
      {
        internalType: "address",
        name: "l2Sender",
        type: "address"
      },
      {
        internalType: "address",
        name: "to",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "l2Block",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "l1Block",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "l2Timestamp",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256"
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes"
      }
    ],
    name: "executeTransactionSimulation",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "contract IBridge",
        name: "_bridge",
        type: "address"
      }
    ],
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "index",
        type: "uint256"
      }
    ],
    name: "isSpent",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "l2ToL1BatchNum",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "pure",
    type: "function"
  },
  {
    inputs: [],
    name: "l2ToL1Block",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "l2ToL1EthBlock",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "l2ToL1OutputId",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "l2ToL1Sender",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "l2ToL1Timestamp",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "postUpgradeInit",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "rollup",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32"
      }
    ],
    name: "roots",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    name: "spent",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "updateRollupAddress",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "root",
        type: "bytes32"
      },
      {
        internalType: "bytes32",
        name: "l2BlockHash",
        type: "bytes32"
      }
    ],
    name: "updateSendRoot",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  }
];
class AbsOutbox__factory {
  static abi = _abi$W;
  static createInterface() {
    return new Interface(_abi$W);
  }
  static connect(address, runner) {
    return new Contract(address, _abi$W, runner);
  }
}

var index$1p = /*#__PURE__*/Object.freeze({
  __proto__: null,
  AbsOutbox__factory: AbsOutbox__factory
});

const _abi$V = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "outbox",
        type: "address"
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256"
      },
      {
        indexed: false,
        internalType: "bytes",
        name: "data",
        type: "bytes"
      }
    ],
    name: "BridgeCallTriggered",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "inbox",
        type: "address"
      },
      {
        indexed: false,
        internalType: "bool",
        name: "enabled",
        type: "bool"
      }
    ],
    name: "InboxToggle",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "messageIndex",
        type: "uint256"
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "beforeInboxAcc",
        type: "bytes32"
      },
      {
        indexed: false,
        internalType: "address",
        name: "inbox",
        type: "address"
      },
      {
        indexed: false,
        internalType: "uint8",
        name: "kind",
        type: "uint8"
      },
      {
        indexed: false,
        internalType: "address",
        name: "sender",
        type: "address"
      },
      {
        indexed: false,
        internalType: "bytes32",
        name: "messageDataHash",
        type: "bytes32"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "baseFeeL1",
        type: "uint256"
      },
      {
        indexed: false,
        internalType: "uint64",
        name: "timestamp",
        type: "uint64"
      }
    ],
    name: "MessageDelivered",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "outbox",
        type: "address"
      },
      {
        indexed: false,
        internalType: "bool",
        name: "enabled",
        type: "bool"
      }
    ],
    name: "OutboxToggle",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "rollup",
        type: "address"
      }
    ],
    name: "RollupUpdated",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "newSequencerInbox",
        type: "address"
      }
    ],
    name: "SequencerInboxUpdated",
    type: "event"
  },
  {
    inputs: [],
    name: "activeOutbox",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    name: "allowedDelayedInboxList",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address"
      }
    ],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "inbox",
        type: "address"
      }
    ],
    name: "allowedDelayedInboxes",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    name: "allowedOutboxList",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address"
      }
    ],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "outbox",
        type: "address"
      }
    ],
    name: "allowedOutboxes",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    name: "delayedInboxAccs",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "delayedMessageCount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "dataHash",
        type: "bytes32"
      },
      {
        internalType: "uint256",
        name: "afterDelayedMessagesRead",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "prevMessageCount",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "newMessageCount",
        type: "uint256"
      }
    ],
    name: "enqueueSequencerMessage",
    outputs: [
      {
        internalType: "uint256",
        name: "seqMessageIndex",
        type: "uint256"
      },
      {
        internalType: "bytes32",
        name: "beforeAcc",
        type: "bytes32"
      },
      {
        internalType: "bytes32",
        name: "delayedAcc",
        type: "bytes32"
      },
      {
        internalType: "bytes32",
        name: "acc",
        type: "bytes32"
      }
    ],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256"
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes"
      }
    ],
    name: "executeCall",
    outputs: [
      {
        internalType: "bool",
        name: "success",
        type: "bool"
      },
      {
        internalType: "bytes",
        name: "returnData",
        type: "bytes"
      }
    ],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "rollup",
    outputs: [
      {
        internalType: "contract IOwnable",
        name: "",
        type: "address"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "sequencerInbox",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    name: "sequencerInboxAccs",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "sequencerMessageCount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "sequencerReportedSubMessageCount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "inbox",
        type: "address"
      },
      {
        internalType: "bool",
        name: "enabled",
        type: "bool"
      }
    ],
    name: "setDelayedInbox",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "inbox",
        type: "address"
      },
      {
        internalType: "bool",
        name: "enabled",
        type: "bool"
      }
    ],
    name: "setOutbox",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_sequencerInbox",
        type: "address"
      }
    ],
    name: "setSequencerInbox",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "batchPoster",
        type: "address"
      },
      {
        internalType: "bytes32",
        name: "dataHash",
        type: "bytes32"
      }
    ],
    name: "submitBatchSpendingReport",
    outputs: [
      {
        internalType: "uint256",
        name: "msgNum",
        type: "uint256"
      }
    ],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "contract IOwnable",
        name: "_rollup",
        type: "address"
      }
    ],
    name: "updateRollupAddress",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  }
];
class IBridge__factory {
  static abi = _abi$V;
  static createInterface() {
    return new Interface(_abi$V);
  }
  static connect(address, runner) {
    return new Contract(address, _abi$V, runner);
  }
}

var index$1o = /*#__PURE__*/Object.freeze({
  __proto__: null,
  IBridge__factory: IBridge__factory
});

const _abi$U = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "messageNum",
        type: "uint256"
      },
      {
        indexed: false,
        internalType: "bytes",
        name: "data",
        type: "bytes"
      }
    ],
    name: "InboxMessageDelivered",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "messageNum",
        type: "uint256"
      }
    ],
    name: "InboxMessageDeliveredFromOrigin",
    type: "event"
  }
];
class IDelayedMessageProvider__factory {
  static abi = _abi$U;
  static createInterface() {
    return new Interface(_abi$U);
  }
  static connect(address, runner) {
    return new Contract(
      address,
      _abi$U,
      runner
    );
  }
}

var index$1n = /*#__PURE__*/Object.freeze({
  __proto__: null,
  IDelayedMessageProvider__factory: IDelayedMessageProvider__factory
});

const _abi$T = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "messageNum",
        type: "uint256"
      },
      {
        indexed: false,
        internalType: "bytes",
        name: "data",
        type: "bytes"
      }
    ],
    name: "InboxMessageDelivered",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "messageNum",
        type: "uint256"
      }
    ],
    name: "InboxMessageDeliveredFromOrigin",
    type: "event"
  },
  {
    inputs: [],
    name: "allowListEnabled",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "bridge",
    outputs: [
      {
        internalType: "contract IBridge",
        name: "",
        type: "address"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "dataLength",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "baseFee",
        type: "uint256"
      }
    ],
    name: "calculateRetryableSubmissionFee",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "l2CallValue",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "maxSubmissionCost",
        type: "uint256"
      },
      {
        internalType: "address",
        name: "excessFeeRefundAddress",
        type: "address"
      },
      {
        internalType: "address",
        name: "callValueRefundAddress",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "gasLimit",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "maxFeePerGas",
        type: "uint256"
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes"
      }
    ],
    name: "createRetryableTicket",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "payable",
    type: "function"
  },
  {
    inputs: [],
    name: "depositEth",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "payable",
    type: "function"
  },
  {
    inputs: [],
    name: "getProxyAdmin",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "contract IBridge",
        name: "_bridge",
        type: "address"
      },
      {
        internalType: "contract ISequencerInbox",
        name: "_sequencerInbox",
        type: "address"
      }
    ],
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "user",
        type: "address"
      }
    ],
    name: "isAllowed",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "maxDataSize",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "pause",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "contract IBridge",
        name: "_bridge",
        type: "address"
      }
    ],
    name: "postUpgradeInit",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "gasLimit",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "maxFeePerGas",
        type: "uint256"
      },
      {
        internalType: "address",
        name: "to",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256"
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes"
      }
    ],
    name: "sendContractTransaction",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "gasLimit",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "maxFeePerGas",
        type: "uint256"
      },
      {
        internalType: "address",
        name: "to",
        type: "address"
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes"
      }
    ],
    name: "sendL1FundedContractTransaction",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "payable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "gasLimit",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "maxFeePerGas",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "nonce",
        type: "uint256"
      },
      {
        internalType: "address",
        name: "to",
        type: "address"
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes"
      }
    ],
    name: "sendL1FundedUnsignedTransaction",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "payable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "gasLimit",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "maxFeePerGas",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "nonce",
        type: "uint256"
      },
      {
        internalType: "address",
        name: "to",
        type: "address"
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes"
      }
    ],
    name: "sendL1FundedUnsignedTransactionToFork",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "payable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "messageData",
        type: "bytes"
      }
    ],
    name: "sendL2Message",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "messageData",
        type: "bytes"
      }
    ],
    name: "sendL2MessageFromOrigin",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "gasLimit",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "maxFeePerGas",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "nonce",
        type: "uint256"
      },
      {
        internalType: "address",
        name: "to",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256"
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes"
      }
    ],
    name: "sendUnsignedTransaction",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "gasLimit",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "maxFeePerGas",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "nonce",
        type: "uint256"
      },
      {
        internalType: "address",
        name: "to",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256"
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes"
      }
    ],
    name: "sendUnsignedTransactionToFork",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "gasLimit",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "maxFeePerGas",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "nonce",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256"
      },
      {
        internalType: "address",
        name: "withdrawTo",
        type: "address"
      }
    ],
    name: "sendWithdrawEthToFork",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "sequencerInbox",
    outputs: [
      {
        internalType: "contract ISequencerInbox",
        name: "",
        type: "address"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address[]",
        name: "user",
        type: "address[]"
      },
      {
        internalType: "bool[]",
        name: "val",
        type: "bool[]"
      }
    ],
    name: "setAllowList",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "bool",
        name: "_allowListEnabled",
        type: "bool"
      }
    ],
    name: "setAllowListEnabled",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "unpause",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "l2CallValue",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "maxSubmissionCost",
        type: "uint256"
      },
      {
        internalType: "address",
        name: "excessFeeRefundAddress",
        type: "address"
      },
      {
        internalType: "address",
        name: "callValueRefundAddress",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "gasLimit",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "maxFeePerGas",
        type: "uint256"
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes"
      }
    ],
    name: "unsafeCreateRetryableTicket",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "payable",
    type: "function"
  }
];
class IInbox__factory {
  static abi = _abi$T;
  static createInterface() {
    return new Interface(_abi$T);
  }
  static connect(address, runner) {
    return new Contract(address, _abi$T, runner);
  }
}

var index$1m = /*#__PURE__*/Object.freeze({
  __proto__: null,
  IInbox__factory: IInbox__factory
});

const _abi$S = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "messageNum",
        type: "uint256"
      },
      {
        indexed: false,
        internalType: "bytes",
        name: "data",
        type: "bytes"
      }
    ],
    name: "InboxMessageDelivered",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "messageNum",
        type: "uint256"
      }
    ],
    name: "InboxMessageDeliveredFromOrigin",
    type: "event"
  },
  {
    inputs: [],
    name: "allowListEnabled",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "bridge",
    outputs: [
      {
        internalType: "contract IBridge",
        name: "",
        type: "address"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "dataLength",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "baseFee",
        type: "uint256"
      }
    ],
    name: "calculateRetryableSubmissionFee",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "getProxyAdmin",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "contract IBridge",
        name: "_bridge",
        type: "address"
      },
      {
        internalType: "contract ISequencerInbox",
        name: "_sequencerInbox",
        type: "address"
      }
    ],
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "user",
        type: "address"
      }
    ],
    name: "isAllowed",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "maxDataSize",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "pause",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "gasLimit",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "maxFeePerGas",
        type: "uint256"
      },
      {
        internalType: "address",
        name: "to",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256"
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes"
      }
    ],
    name: "sendContractTransaction",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "messageData",
        type: "bytes"
      }
    ],
    name: "sendL2Message",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "messageData",
        type: "bytes"
      }
    ],
    name: "sendL2MessageFromOrigin",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "gasLimit",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "maxFeePerGas",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "nonce",
        type: "uint256"
      },
      {
        internalType: "address",
        name: "to",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256"
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes"
      }
    ],
    name: "sendUnsignedTransaction",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "sequencerInbox",
    outputs: [
      {
        internalType: "contract ISequencerInbox",
        name: "",
        type: "address"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address[]",
        name: "user",
        type: "address[]"
      },
      {
        internalType: "bool[]",
        name: "val",
        type: "bool[]"
      }
    ],
    name: "setAllowList",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "bool",
        name: "_allowListEnabled",
        type: "bool"
      }
    ],
    name: "setAllowListEnabled",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "unpause",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  }
];
class IInboxBase__factory {
  static abi = _abi$S;
  static createInterface() {
    return new Interface(_abi$S);
  }
  static connect(address, runner) {
    return new Contract(address, _abi$S, runner);
  }
}

var index$1l = /*#__PURE__*/Object.freeze({
  __proto__: null,
  IInboxBase__factory: IInboxBase__factory
});

const _abi$R = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address"
      },
      {
        indexed: true,
        internalType: "address",
        name: "l2Sender",
        type: "address"
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "zero",
        type: "uint256"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "transactionIndex",
        type: "uint256"
      }
    ],
    name: "OutBoxTransactionExecuted",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "outputRoot",
        type: "bytes32"
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "l2BlockHash",
        type: "bytes32"
      }
    ],
    name: "SendRootUpdated",
    type: "event"
  },
  {
    inputs: [],
    name: "OUTBOX_VERSION",
    outputs: [
      {
        internalType: "uint128",
        name: "",
        type: "uint128"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "bridge",
    outputs: [
      {
        internalType: "contract IBridge",
        name: "",
        type: "address"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "l2Sender",
        type: "address"
      },
      {
        internalType: "address",
        name: "to",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "l2Block",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "l1Block",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "l2Timestamp",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256"
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes"
      }
    ],
    name: "calculateItemHash",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32"
      }
    ],
    stateMutability: "pure",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "bytes32[]",
        name: "proof",
        type: "bytes32[]"
      },
      {
        internalType: "uint256",
        name: "path",
        type: "uint256"
      },
      {
        internalType: "bytes32",
        name: "item",
        type: "bytes32"
      }
    ],
    name: "calculateMerkleRoot",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32"
      }
    ],
    stateMutability: "pure",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "bytes32[]",
        name: "proof",
        type: "bytes32[]"
      },
      {
        internalType: "uint256",
        name: "index",
        type: "uint256"
      },
      {
        internalType: "address",
        name: "l2Sender",
        type: "address"
      },
      {
        internalType: "address",
        name: "to",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "l2Block",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "l1Block",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "l2Timestamp",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256"
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes"
      }
    ],
    name: "executeTransaction",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "index",
        type: "uint256"
      },
      {
        internalType: "address",
        name: "l2Sender",
        type: "address"
      },
      {
        internalType: "address",
        name: "to",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "l2Block",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "l1Block",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "l2Timestamp",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256"
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes"
      }
    ],
    name: "executeTransactionSimulation",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "contract IBridge",
        name: "_bridge",
        type: "address"
      }
    ],
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "index",
        type: "uint256"
      }
    ],
    name: "isSpent",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "l2ToL1Block",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "l2ToL1EthBlock",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "l2ToL1OutputId",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "l2ToL1Sender",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "l2ToL1Timestamp",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "postUpgradeInit",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "rollup",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32"
      }
    ],
    name: "roots",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    name: "spent",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "updateRollupAddress",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "sendRoot",
        type: "bytes32"
      },
      {
        internalType: "bytes32",
        name: "l2BlockHash",
        type: "bytes32"
      }
    ],
    name: "updateSendRoot",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  }
];
class IOutbox__factory {
  static abi = _abi$R;
  static createInterface() {
    return new Interface(_abi$R);
  }
  static connect(address, runner) {
    return new Contract(address, _abi$R, runner);
  }
}

var index$1k = /*#__PURE__*/Object.freeze({
  __proto__: null,
  IOutbox__factory: IOutbox__factory
});

const _abi$Q = [
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address"
      }
    ],
    stateMutability: "view",
    type: "function"
  }
];
class IOwnable__factory {
  static abi = _abi$Q;
  static createInterface() {
    return new Interface(_abi$Q);
  }
  static connect(address, runner) {
    return new Contract(address, _abi$Q, runner);
  }
}

var index$1j = /*#__PURE__*/Object.freeze({
  __proto__: null,
  IOwnable__factory: IOwnable__factory
});

const _abi$P = [
  {
    inputs: [],
    name: "getExchangeRate",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "nonpayable",
    type: "function"
  }
];
class IFeeTokenPricer__factory {
  static abi = _abi$P;
  static createInterface() {
    return new Interface(_abi$P);
  }
  static connect(address, runner) {
    return new Contract(address, _abi$P, runner);
  }
}

const _abi$O = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "newBatchPosterManager",
        type: "address"
      }
    ],
    name: "BatchPosterManagerSet",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "batchPoster",
        type: "address"
      },
      {
        indexed: false,
        internalType: "bool",
        name: "isBatchPoster",
        type: "bool"
      }
    ],
    name: "BatchPosterSet",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        components: [
          {
            internalType: "uint64",
            name: "threshold",
            type: "uint64"
          },
          {
            internalType: "uint64",
            name: "max",
            type: "uint64"
          },
          {
            internalType: "uint64",
            name: "replenishRateInBasis",
            type: "uint64"
          }
        ],
        indexed: false,
        internalType: "struct BufferConfig",
        name: "bufferConfig",
        type: "tuple"
      }
    ],
    name: "BufferConfigSet",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "feeTokenPricer",
        type: "address"
      }
    ],
    name: "FeeTokenPricerSet",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "messageNum",
        type: "uint256"
      },
      {
        indexed: false,
        internalType: "bytes",
        name: "data",
        type: "bytes"
      }
    ],
    name: "InboxMessageDelivered",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "messageNum",
        type: "uint256"
      }
    ],
    name: "InboxMessageDeliveredFromOrigin",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "keysetHash",
        type: "bytes32"
      }
    ],
    name: "InvalidateKeyset",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "delayBlocks",
            type: "uint256"
          },
          {
            internalType: "uint256",
            name: "futureBlocks",
            type: "uint256"
          },
          {
            internalType: "uint256",
            name: "delaySeconds",
            type: "uint256"
          },
          {
            internalType: "uint256",
            name: "futureSeconds",
            type: "uint256"
          }
        ],
        indexed: false,
        internalType: "struct ISequencerInbox.MaxTimeVariation",
        name: "maxTimeVariation",
        type: "tuple"
      }
    ],
    name: "MaxTimeVariationSet",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "id",
        type: "uint256"
      }
    ],
    name: "OwnerFunctionCalled",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "batchSequenceNumber",
        type: "uint256"
      },
      {
        indexed: false,
        internalType: "bytes",
        name: "data",
        type: "bytes"
      }
    ],
    name: "SequencerBatchData",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "batchSequenceNumber",
        type: "uint256"
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "beforeAcc",
        type: "bytes32"
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "afterAcc",
        type: "bytes32"
      },
      {
        indexed: false,
        internalType: "bytes32",
        name: "delayedAcc",
        type: "bytes32"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "afterDelayedMessagesRead",
        type: "uint256"
      },
      {
        components: [
          {
            internalType: "uint64",
            name: "minTimestamp",
            type: "uint64"
          },
          {
            internalType: "uint64",
            name: "maxTimestamp",
            type: "uint64"
          },
          {
            internalType: "uint64",
            name: "minBlockNumber",
            type: "uint64"
          },
          {
            internalType: "uint64",
            name: "maxBlockNumber",
            type: "uint64"
          }
        ],
        indexed: false,
        internalType: "struct IBridge.TimeBounds",
        name: "timeBounds",
        type: "tuple"
      },
      {
        indexed: false,
        internalType: "enum IBridge.BatchDataLocation",
        name: "dataLocation",
        type: "uint8"
      }
    ],
    name: "SequencerBatchDelivered",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "addr",
        type: "address"
      },
      {
        indexed: false,
        internalType: "bool",
        name: "isSequencer",
        type: "bool"
      }
    ],
    name: "SequencerSet",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "keysetHash",
        type: "bytes32"
      },
      {
        indexed: false,
        internalType: "bytes",
        name: "keysetBytes",
        type: "bytes"
      }
    ],
    name: "SetValidKeyset",
    type: "event"
  },
  {
    inputs: [],
    name: "BROTLI_MESSAGE_HEADER_FLAG",
    outputs: [
      {
        internalType: "bytes1",
        name: "",
        type: "bytes1"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "DAS_MESSAGE_HEADER_FLAG",
    outputs: [
      {
        internalType: "bytes1",
        name: "",
        type: "bytes1"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "DATA_AUTHENTICATED_FLAG",
    outputs: [
      {
        internalType: "bytes1",
        name: "",
        type: "bytes1"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "DATA_BLOB_HEADER_FLAG",
    outputs: [
      {
        internalType: "bytes1",
        name: "",
        type: "bytes1"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "HEADER_LENGTH",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "TREE_DAS_MESSAGE_HEADER_FLAG",
    outputs: [
      {
        internalType: "bytes1",
        name: "",
        type: "bytes1"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "ZERO_HEAVY_MESSAGE_HEADER_FLAG",
    outputs: [
      {
        internalType: "bytes1",
        name: "",
        type: "bytes1"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "sequenceNumber",
        type: "uint256"
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes"
      },
      {
        internalType: "uint256",
        name: "afterDelayedMessagesRead",
        type: "uint256"
      },
      {
        internalType: "contract IGasRefunder",
        name: "gasRefunder",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "prevMessageCount",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "newMessageCount",
        type: "uint256"
      }
    ],
    name: "addSequencerL2Batch",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "sequenceNumber",
        type: "uint256"
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes"
      },
      {
        internalType: "uint256",
        name: "afterDelayedMessagesRead",
        type: "uint256"
      },
      {
        internalType: "contract IGasRefunder",
        name: "gasRefunder",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "prevMessageCount",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "newMessageCount",
        type: "uint256"
      },
      {
        components: [
          {
            internalType: "bytes32",
            name: "beforeDelayedAcc",
            type: "bytes32"
          },
          {
            components: [
              {
                internalType: "uint8",
                name: "kind",
                type: "uint8"
              },
              {
                internalType: "address",
                name: "sender",
                type: "address"
              },
              {
                internalType: "uint64",
                name: "blockNumber",
                type: "uint64"
              },
              {
                internalType: "uint64",
                name: "timestamp",
                type: "uint64"
              },
              {
                internalType: "uint256",
                name: "inboxSeqNum",
                type: "uint256"
              },
              {
                internalType: "uint256",
                name: "baseFeeL1",
                type: "uint256"
              },
              {
                internalType: "bytes32",
                name: "messageDataHash",
                type: "bytes32"
              }
            ],
            internalType: "struct Messages.Message",
            name: "delayedMessage",
            type: "tuple"
          }
        ],
        internalType: "struct DelayProof",
        name: "delayProof",
        type: "tuple"
      }
    ],
    name: "addSequencerL2BatchDelayProof",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "sequenceNumber",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "afterDelayedMessagesRead",
        type: "uint256"
      },
      {
        internalType: "contract IGasRefunder",
        name: "gasRefunder",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "prevMessageCount",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "newMessageCount",
        type: "uint256"
      }
    ],
    name: "addSequencerL2BatchFromBlobs",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "sequenceNumber",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "afterDelayedMessagesRead",
        type: "uint256"
      },
      {
        internalType: "contract IGasRefunder",
        name: "gasRefunder",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "prevMessageCount",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "newMessageCount",
        type: "uint256"
      },
      {
        components: [
          {
            internalType: "bytes32",
            name: "beforeDelayedAcc",
            type: "bytes32"
          },
          {
            components: [
              {
                internalType: "uint8",
                name: "kind",
                type: "uint8"
              },
              {
                internalType: "address",
                name: "sender",
                type: "address"
              },
              {
                internalType: "uint64",
                name: "blockNumber",
                type: "uint64"
              },
              {
                internalType: "uint64",
                name: "timestamp",
                type: "uint64"
              },
              {
                internalType: "uint256",
                name: "inboxSeqNum",
                type: "uint256"
              },
              {
                internalType: "uint256",
                name: "baseFeeL1",
                type: "uint256"
              },
              {
                internalType: "bytes32",
                name: "messageDataHash",
                type: "bytes32"
              }
            ],
            internalType: "struct Messages.Message",
            name: "delayedMessage",
            type: "tuple"
          }
        ],
        internalType: "struct DelayProof",
        name: "delayProof",
        type: "tuple"
      }
    ],
    name: "addSequencerL2BatchFromBlobsDelayProof",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "sequenceNumber",
        type: "uint256"
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes"
      },
      {
        internalType: "uint256",
        name: "afterDelayedMessagesRead",
        type: "uint256"
      },
      {
        internalType: "contract IGasRefunder",
        name: "gasRefunder",
        type: "address"
      }
    ],
    name: "addSequencerL2BatchFromOrigin",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "sequenceNumber",
        type: "uint256"
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes"
      },
      {
        internalType: "uint256",
        name: "afterDelayedMessagesRead",
        type: "uint256"
      },
      {
        internalType: "contract IGasRefunder",
        name: "gasRefunder",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "prevMessageCount",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "newMessageCount",
        type: "uint256"
      }
    ],
    name: "addSequencerL2BatchFromOrigin",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "sequenceNumber",
        type: "uint256"
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes"
      },
      {
        internalType: "uint256",
        name: "afterDelayedMessagesRead",
        type: "uint256"
      },
      {
        internalType: "contract IGasRefunder",
        name: "gasRefunder",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "prevMessageCount",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "newMessageCount",
        type: "uint256"
      },
      {
        components: [
          {
            internalType: "bytes32",
            name: "beforeDelayedAcc",
            type: "bytes32"
          },
          {
            components: [
              {
                internalType: "uint8",
                name: "kind",
                type: "uint8"
              },
              {
                internalType: "address",
                name: "sender",
                type: "address"
              },
              {
                internalType: "uint64",
                name: "blockNumber",
                type: "uint64"
              },
              {
                internalType: "uint64",
                name: "timestamp",
                type: "uint64"
              },
              {
                internalType: "uint256",
                name: "inboxSeqNum",
                type: "uint256"
              },
              {
                internalType: "uint256",
                name: "baseFeeL1",
                type: "uint256"
              },
              {
                internalType: "bytes32",
                name: "messageDataHash",
                type: "bytes32"
              }
            ],
            internalType: "struct Messages.Message",
            name: "delayedMessage",
            type: "tuple"
          }
        ],
        internalType: "struct DelayProof",
        name: "delayProof",
        type: "tuple"
      }
    ],
    name: "addSequencerL2BatchFromOriginDelayProof",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "batchCount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "batchPosterManager",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "bridge",
    outputs: [
      {
        internalType: "contract IBridge",
        name: "",
        type: "address"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32"
      }
    ],
    name: "dasKeySetInfo",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool"
      },
      {
        internalType: "uint64",
        name: "",
        type: "uint64"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "feeTokenPricer",
    outputs: [
      {
        internalType: "contract IFeeTokenPricer",
        name: "",
        type: "address"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_totalDelayedMessagesRead",
        type: "uint256"
      },
      {
        internalType: "uint8",
        name: "kind",
        type: "uint8"
      },
      {
        internalType: "uint64[2]",
        name: "l1BlockAndTime",
        type: "uint64[2]"
      },
      {
        internalType: "uint256",
        name: "baseFeeL1",
        type: "uint256"
      },
      {
        internalType: "address",
        name: "sender",
        type: "address"
      },
      {
        internalType: "bytes32",
        name: "messageDataHash",
        type: "bytes32"
      }
    ],
    name: "forceInclusion",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint64",
        name: "blockNumber",
        type: "uint64"
      }
    ],
    name: "forceInclusionDeadline",
    outputs: [
      {
        internalType: "uint64",
        name: "blockNumberDeadline",
        type: "uint64"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "ksHash",
        type: "bytes32"
      }
    ],
    name: "getKeysetCreationBlock",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "index",
        type: "uint256"
      }
    ],
    name: "inboxAccs",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "contract IBridge",
        name: "bridge_",
        type: "address"
      },
      {
        components: [
          {
            internalType: "uint256",
            name: "delayBlocks",
            type: "uint256"
          },
          {
            internalType: "uint256",
            name: "futureBlocks",
            type: "uint256"
          },
          {
            internalType: "uint256",
            name: "delaySeconds",
            type: "uint256"
          },
          {
            internalType: "uint256",
            name: "futureSeconds",
            type: "uint256"
          }
        ],
        internalType: "struct ISequencerInbox.MaxTimeVariation",
        name: "maxTimeVariation_",
        type: "tuple"
      },
      {
        components: [
          {
            internalType: "uint64",
            name: "threshold",
            type: "uint64"
          },
          {
            internalType: "uint64",
            name: "max",
            type: "uint64"
          },
          {
            internalType: "uint64",
            name: "replenishRateInBasis",
            type: "uint64"
          }
        ],
        internalType: "struct BufferConfig",
        name: "bufferConfig_",
        type: "tuple"
      },
      {
        internalType: "contract IFeeTokenPricer",
        name: "feeTokenPricer_",
        type: "address"
      }
    ],
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "ksHash",
        type: "bytes32"
      }
    ],
    name: "invalidateKeysetHash",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address"
      }
    ],
    name: "isBatchPoster",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "isDelayBufferable",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address"
      }
    ],
    name: "isSequencer",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "ksHash",
        type: "bytes32"
      }
    ],
    name: "isValidKeysetHash",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "maxDataSize",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "maxTimeVariation",
    outputs: [
      {
        internalType: "uint256",
        name: "delayBlocks",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "futureBlocks",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "delaySeconds",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "futureSeconds",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "removeDelayAfterFork",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "rollup",
    outputs: [
      {
        internalType: "contract IOwnable",
        name: "",
        type: "address"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newBatchPosterManager",
        type: "address"
      }
    ],
    name: "setBatchPosterManager",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "contract IFeeTokenPricer",
        name: "newFeeTokenPricer",
        type: "address"
      }
    ],
    name: "setFeeTokenPricer",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "addr",
        type: "address"
      },
      {
        internalType: "bool",
        name: "isBatchPoster_",
        type: "bool"
      }
    ],
    name: "setIsBatchPoster",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "addr",
        type: "address"
      },
      {
        internalType: "bool",
        name: "isSequencer_",
        type: "bool"
      }
    ],
    name: "setIsSequencer",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "delayBlocks",
            type: "uint256"
          },
          {
            internalType: "uint256",
            name: "futureBlocks",
            type: "uint256"
          },
          {
            internalType: "uint256",
            name: "delaySeconds",
            type: "uint256"
          },
          {
            internalType: "uint256",
            name: "futureSeconds",
            type: "uint256"
          }
        ],
        internalType: "struct ISequencerInbox.MaxTimeVariation",
        name: "maxTimeVariation_",
        type: "tuple"
      }
    ],
    name: "setMaxTimeVariation",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "keysetBytes",
        type: "bytes"
      }
    ],
    name: "setValidKeyset",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "totalDelayedMessagesRead",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "updateRollupAddress",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  }
];
class ISequencerInbox__factory {
  static abi = _abi$O;
  static createInterface() {
    return new Interface(_abi$O);
  }
  static connect(address, runner) {
    return new Contract(address, _abi$O, runner);
  }
}

var index$1i = /*#__PURE__*/Object.freeze({
  __proto__: null,
  IFeeTokenPricer__factory: IFeeTokenPricer__factory,
  ISequencerInbox__factory: ISequencerInbox__factory
});

const _abi$N = [
  {
    inputs: [],
    name: "AlreadyInit",
    type: "error"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "index",
        type: "uint256"
      }
    ],
    name: "AlreadySpent",
    type: "error"
  },
  {
    inputs: [],
    name: "BadPostUpgradeInit",
    type: "error"
  },
  {
    inputs: [],
    name: "BridgeCallFailed",
    type: "error"
  },
  {
    inputs: [],
    name: "HadZeroInit",
    type: "error"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "actualLength",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "maxProofLength",
        type: "uint256"
      }
    ],
    name: "MerkleProofTooLong",
    type: "error"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "sender",
        type: "address"
      },
      {
        internalType: "address",
        name: "owner",
        type: "address"
      }
    ],
    name: "NotOwner",
    type: "error"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "sender",
        type: "address"
      },
      {
        internalType: "address",
        name: "rollup",
        type: "address"
      }
    ],
    name: "NotRollup",
    type: "error"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "index",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "maxIndex",
        type: "uint256"
      }
    ],
    name: "PathNotMinimal",
    type: "error"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "proofLength",
        type: "uint256"
      }
    ],
    name: "ProofTooLong",
    type: "error"
  },
  {
    inputs: [],
    name: "RollupNotChanged",
    type: "error"
  },
  {
    inputs: [],
    name: "SimulationOnlyEntrypoint",
    type: "error"
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "root",
        type: "bytes32"
      }
    ],
    name: "UnknownRoot",
    type: "error"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address"
      },
      {
        indexed: true,
        internalType: "address",
        name: "l2Sender",
        type: "address"
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "zero",
        type: "uint256"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "transactionIndex",
        type: "uint256"
      }
    ],
    name: "OutBoxTransactionExecuted",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "outputRoot",
        type: "bytes32"
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "l2BlockHash",
        type: "bytes32"
      }
    ],
    name: "SendRootUpdated",
    type: "event"
  },
  {
    inputs: [],
    name: "OUTBOX_VERSION",
    outputs: [
      {
        internalType: "uint128",
        name: "",
        type: "uint128"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "bridge",
    outputs: [
      {
        internalType: "contract IBridge",
        name: "",
        type: "address"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "l2Sender",
        type: "address"
      },
      {
        internalType: "address",
        name: "to",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "l2Block",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "l1Block",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "l2Timestamp",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256"
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes"
      }
    ],
    name: "calculateItemHash",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32"
      }
    ],
    stateMutability: "pure",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "bytes32[]",
        name: "proof",
        type: "bytes32[]"
      },
      {
        internalType: "uint256",
        name: "path",
        type: "uint256"
      },
      {
        internalType: "bytes32",
        name: "item",
        type: "bytes32"
      }
    ],
    name: "calculateMerkleRoot",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32"
      }
    ],
    stateMutability: "pure",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "bytes32[]",
        name: "proof",
        type: "bytes32[]"
      },
      {
        internalType: "uint256",
        name: "index",
        type: "uint256"
      },
      {
        internalType: "address",
        name: "l2Sender",
        type: "address"
      },
      {
        internalType: "address",
        name: "to",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "l2Block",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "l1Block",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "l2Timestamp",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256"
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes"
      }
    ],
    name: "executeTransaction",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "index",
        type: "uint256"
      },
      {
        internalType: "address",
        name: "l2Sender",
        type: "address"
      },
      {
        internalType: "address",
        name: "to",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "l2Block",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "l1Block",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "l2Timestamp",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256"
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes"
      }
    ],
    name: "executeTransactionSimulation",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "contract IBridge",
        name: "_bridge",
        type: "address"
      }
    ],
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "index",
        type: "uint256"
      }
    ],
    name: "isSpent",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "l2ToL1BatchNum",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "pure",
    type: "function"
  },
  {
    inputs: [],
    name: "l2ToL1Block",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "l2ToL1EthBlock",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "l2ToL1OutputId",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "l2ToL1Sender",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "l2ToL1Timestamp",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "postUpgradeInit",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "rollup",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32"
      }
    ],
    name: "roots",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    name: "spent",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "updateRollupAddress",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "root",
        type: "bytes32"
      },
      {
        internalType: "bytes32",
        name: "l2BlockHash",
        type: "bytes32"
      }
    ],
    name: "updateSendRoot",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  }
];
const _bytecode$k = "0x60a060405230608052348015601357600080fd5b506080516116b66100366000396000818161066a015261088a01526116b66000f3fe608060405234801561001057600080fd5b506004361061012b5760003560e01c806395fcea78116100ad578063c4d66de811610071578063c4d66de81461023e578063c75184df14610251578063cb23bcb514610271578063d5b5cc2314610284578063e78cea92146102a457600080fd5b806395fcea78146101e85780639f0c04bf146101f0578063a04cee6014610203578063ae6dead714610216578063b0f305371461023657600080fd5b80635a129efe116100f45780635a129efe1461018d5780636ae71f12146101b057806372f2a8c7146101b857806380648b02146101c05780638515bc6a146101e057600080fd5b80627436d31461013057806308635a9514610156578063119852711461016b578063288e5b10146101725780634654779014610185575b600080fd5b61014361013e366004610f90565b6102b7565b6040519081526020015b60405180910390f35b6101696101643660046110be565b6102f4565b005b6000610143565b6101696101803660046111bb565b610367565b6101436103a2565b6101a061019b366004611257565b6103d6565b604051901515815260200161014d565b6101696103f3565b6101436105df565b6101c86105fa565b6040516001600160a01b03909116815260200161014d565b610143610620565b610169610660565b6101436101fe366004611270565b61078f565b6101696102113660046112ff565b6107d4565b610143610224366004611257565b60036020526000908152604090205481565b610143610853565b61016961024c366004611321565b610880565b610259600281565b6040516001600160801b03909116815260200161014d565b6000546101c8906001600160a01b031681565b610143610292366004611257565b60026020526000908152604090205481565b6001546101c8906001600160a01b031681565b60006102ec8484846040516020016102d191815260200190565b60405160208183030381529060405280519060200120610a0f565b949350505050565b6000610306898989898989898961078f565b90506103488c8c808060200260200160405190810160405280939291908181526020018383602002808284376000920191909152508e9250859150610ab19050565b6103598a8a8a8a8a8a8a8a8a610bba565b505050505050505050505050565b331561038657604051630e13b69d60e01b815260040160405180910390fd5b610397898989898989898989610bba565b505050505050505050565b6004546000906001600160801b03166002600160801b031981016103c857600091505090565b6001600160801b0316919050565b60008060006103e484610e44565b92509250506102ec8282610e81565b60008054906101000a90046001600160a01b03166001600160a01b0316638da5cb5b6040518163ffffffff1660e01b8152600401602060405180830381865afa158015610444573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906104689190611345565b6001600160a01b0316336001600160a01b03161461051e5760005460408051638da5cb5b60e01b8152905133926001600160a01b031691638da5cb5b9160048083019260209291908290030181865afa1580156104c9573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906104ed9190611345565b604051631194af8760e11b81526001600160a01b039283166004820152911660248201526044015b60405180910390fd5b6001546040805163cb23bcb560e01b815290516000926001600160a01b03169163cb23bcb59160048083019260209291908290030181865afa158015610568573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061058c9190611345565b6000549091506001600160a01b038083169116036105bd5760405163d054909f60e01b815260040160405180910390fd5b600080546001600160a01b0319166001600160a01b0392909216919091179055565b600554600090600181016105f557506000919050565b919050565b6006546000906001600160a01b03166002600160a01b031981016105f557600091505090565b600654600090600160a01b90046001600160601b03166bfffffffffffffffffffffffe19810161065257600091505090565b6001600160601b0316919050565b6001600160a01b037f00000000000000000000000000000000000000000000000000000000000000001630036106a85760405162461bcd60e51b815260040161051590611362565b7fb53127684a568b3173ae13b9f8a6016e243e63b6e8ee1178d6a717850b5d61038054336001600160a01b0382161461070557604051631194af8760e11b81523360048201526001600160a01b0382166024820152604401610515565b6004546001600160801b03908116146107315760405163d0afb66160e01b815260040160405180910390fd5b50506040805160c0810182526001600160801b0380825260208201526000199181018290526001600160a01b0360608201526001600160601b036080820152600060a090910181905260048290556005829055600691909155600755565b600088888888888888886040516020016107b09897969594939291906113ae565b60405160208183030381529060405280519060200120905098975050505050505050565b6000546001600160a01b0316331461081457600054604051630e4cf1bf60e21b81523360048201526001600160a01b039091166024820152604401610515565b60008281526003602052604080822083905551829184917fb4df3847300f076a369cd76d2314b470a1194d9e8a6bb97f1860aee88a5f67489190a35050565b600454600090600160801b90046001600160801b03166002600160801b031981016103c857600091505090565b6001600160a01b037f00000000000000000000000000000000000000000000000000000000000000001630036108c85760405162461bcd60e51b815260040161051590611362565b6001600160a01b0381166108ef57604051631ad0f74360e01b815260040160405180910390fd5b6001546001600160a01b03161561091957604051633bcd329760e21b815260040160405180910390fd5b6040805160c0810182526001600160801b038082526020808301919091526000198284018190526001600160a01b03606084018190526001600160601b036080850152600060a090940184905260048281556005839055600692909255600793909355600180546001600160a01b0319169386169384179055835163cb23bcb560e01b81529351929363cb23bcb593818301939290918290030181865afa1580156109c8573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906109ec9190611345565b600080546001600160a01b0319166001600160a01b039290921691909117905550565b8251600090610100811115610a4257604051637ed6198f60e11b8152600481018290526101006024820152604401610515565b8260005b82811015610aa7576000878281518110610a6257610a62611405565b60200260200101519050816001901b8716600003610a8e57826000528060205260406000209250610a9e565b8060005282602052604060002092505b50600101610a46565b5095945050505050565b610100835110610ad957825160405163ab6a068360e01b815260040161051591815260200190565b8251610ae6906002611518565b8210610b1d578183516002610afb9190611518565b604051630b8a724b60e01b815260048101929092526024820152604401610515565b6000610b2a8484846102b7565b600081815260036020526040902054909150610b5c576040516310e61af960e31b815260048101829052602401610515565b6000806000610b6a86610e44565b925092509250610b7a8282610e81565b15610b9b57604051639715b8d360e01b815260048101879052602401610515565b600092835260026020526040909220600190911b909117905550505050565b6000886001600160a01b0316886001600160a01b03167f20af7f3bbfe38132b8900ae295cd9c8d1914be7052d061a511f3f728dab189648c604051610c0191815260200190565b60405180910390a46000839050600060046040518060c00160405290816000820160009054906101000a90046001600160801b03166001600160801b03166001600160801b031681526020016000820160109054906101000a90046001600160801b03166001600160801b03166001600160801b03168152602001600182015481526020016002820160009054906101000a90046001600160a01b03166001600160a01b03166001600160a01b031681526020016002820160149054906101000a90046001600160601b03166001600160601b03166001600160601b0316815260200160038201548152505090506040518060c00160405280896001600160801b03168152602001876001600160801b031681526020018c60001b81526020018b6001600160a01b03168152602001886001600160601b03168152602001610d47600090565b905280516020808301516001600160801b03908116600160801b02921691909117600455604080830151600555606083015160808401516001600160601b0316600160a01b026001600160a01b039091161760065560a0909201516007558151601f8601829004820281018201909252848252610de3918b918591908890889081908401838280828437600092019190915250610e9092505050565b805160208201516001600160801b03908116600160801b029116176004556040810151600555606081015160808201516001600160601b0316600160a01b026001600160a01b039091161760065560a0015160075550505050505050505050565b6000808080610e5460ff8661153a565b90506000610e6360ff8761154e565b60008381526002602052604090205492979096509194509092505050565b80821c60011615155b92915050565b600154604051639e5d4c4960e01b815260009182916001600160a01b0390911690639e5d4c4990610ec990889088908890600401611586565b6000604051808303816000875af1158015610ee8573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f19168201604052610f1091908101906115cf565b9150915081610f4257805115610f295780518082602001fd5b604051631bb7daad60e11b815260040160405180910390fd5b5050505050565b634e487b7160e01b600052604160045260246000fd5b604051601f8201601f1916810167ffffffffffffffff81118282101715610f8857610f88610f49565b604052919050565b600080600060608486031215610fa557600080fd5b833567ffffffffffffffff811115610fbc57600080fd5b8401601f81018613610fcd57600080fd5b803567ffffffffffffffff811115610fe757610fe7610f49565b8060051b610ff760208201610f5f565b9182526020818401810192908101908984111561101357600080fd5b6020850194505b838510156110395784358083526020958601959093509091019061101a565b9960208901359950604090980135979650505050505050565b6001600160a01b038116811461106757600080fd5b50565b80356105f581611052565b60008083601f84011261108757600080fd5b50813567ffffffffffffffff81111561109f57600080fd5b6020830191508360208285010111156110b757600080fd5b9250929050565b60008060008060008060008060008060006101208c8e0312156110e057600080fd5b8b3567ffffffffffffffff8111156110f757600080fd5b8c01601f81018e1361110857600080fd5b803567ffffffffffffffff81111561111f57600080fd5b8e60208260051b840101111561113457600080fd5b60209182019c509a508c0135985061114e60408d0161106a565b975061115c60608d0161106a565b965060808c0135955060a08c0135945060c08c0135935060e08c013592506101008c013567ffffffffffffffff81111561119557600080fd5b6111a18e828f01611075565b915080935050809150509295989b509295989b9093969950565b60008060008060008060008060006101008a8c0312156111da57600080fd5b8935985060208a01356111ec81611052565b975060408a01356111fc81611052565b965060608a0135955060808a0135945060a08a0135935060c08a0135925060e08a013567ffffffffffffffff81111561123457600080fd5b6112408c828d01611075565b915080935050809150509295985092959850929598565b60006020828403121561126957600080fd5b5035919050565b60008060008060008060008060e0898b03121561128c57600080fd5b883561129781611052565b975060208901356112a781611052565b965060408901359550606089013594506080890135935060a0890135925060c089013567ffffffffffffffff8111156112df57600080fd5b6112eb8b828c01611075565b999c989b5096995094979396929594505050565b6000806040838503121561131257600080fd5b50508035926020909101359150565b60006020828403121561133357600080fd5b813561133e81611052565b9392505050565b60006020828403121561135757600080fd5b815161133e81611052565b6020808252602c908201527f46756e6374696f6e206d7573742062652063616c6c6564207468726f7567682060408201526b19195b1959d85d1958d85b1b60a21b606082015260800190565b6001600160601b03198960601b1681526001600160601b03198860601b166014820152866028820152856048820152846068820152836088820152818360a88301376000910160a801908152979650505050505050565b634e487b7160e01b600052603260045260246000fd5b634e487b7160e01b600052601160045260246000fd5b6001815b600184111561146c578085048111156114505761145061141b565b600184161561145e57908102905b60019390931c928002611435565b935093915050565b60008261148357506001610e8a565b8161149057506000610e8a565b81600181146114a657600281146114b0576114cc565b6001915050610e8a565b60ff8411156114c1576114c161141b565b50506001821b610e8a565b5060208310610133831016604e8410600b84101617156114ef575081810a610e8a565b6114fc6000198484611431565b80600019048211156115105761151061141b565b029392505050565b600061133e8383611474565b634e487b7160e01b600052601260045260246000fd5b60008261154957611549611524565b500490565b60008261155d5761155d611524565b500690565b60005b8381101561157d578181015183820152602001611565565b50506000910152565b60018060a01b038416815282602082015260606040820152600082518060608401526115b9816080850160208701611562565b601f01601f191691909101608001949350505050565b600080604083850312156115e257600080fd5b825180151581146115f257600080fd5b602084015190925067ffffffffffffffff81111561160f57600080fd5b8301601f8101851361162057600080fd5b805167ffffffffffffffff81111561163a5761163a610f49565b61164d601f8201601f1916602001610f5f565b81815286602083850101111561166257600080fd5b611673826020830160208601611562565b809350505050925092905056fea2646970667358221220e99a770594b5702a50d266ad259c2d28d8114270a8570b7dfa275dca46ca372f64736f6c634300081e0033";
const isSuperArgs$k = (xs) => xs.length > 1;
class Outbox__factory extends ContractFactory {
  constructor(...args) {
    if (isSuperArgs$k(args)) {
      super(...args);
    } else {
      super(_abi$N, _bytecode$k, args[0]);
    }
  }
  getDeployTransaction(overrides) {
    return super.getDeployTransaction(overrides || {});
  }
  deploy(overrides) {
    return super.deploy(overrides || {});
  }
  connect(runner) {
    return super.connect(runner);
  }
  static bytecode = _bytecode$k;
  static abi = _abi$N;
  static createInterface() {
    return new Interface(_abi$N);
  }
  static connect(address, runner) {
    return new Contract(address, _abi$N, runner);
  }
}

var index$1h = /*#__PURE__*/Object.freeze({
  __proto__: null,
  Outbox__factory: Outbox__factory
});

var index$1g = /*#__PURE__*/Object.freeze({
  __proto__: null,
  absOutboxSol: index$1p,
  iBridgeSol: index$1o,
  iDelayedMessageProviderSol: index$1n,
  iInboxBaseSol: index$1l,
  iInboxSol: index$1m,
  iOutboxSol: index$1k,
  iOwnableSol: index$1j,
  iSequencerInboxSol: index$1i,
  outboxSol: index$1h
});

const _abi$M = [
  {
    inputs: [
      {
        internalType: "address payable",
        name: "spender",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "gasUsed",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "calldataSize",
        type: "uint256"
      }
    ],
    name: "onGasSpent",
    outputs: [
      {
        internalType: "bool",
        name: "success",
        type: "bool"
      }
    ],
    stateMutability: "nonpayable",
    type: "function"
  }
];
class IGasRefunder__factory {
  static abi = _abi$M;
  static createInterface() {
    return new Interface(_abi$M);
  }
  static connect(address, runner) {
    return new Contract(address, _abi$M, runner);
  }
}

var index$1f = /*#__PURE__*/Object.freeze({
  __proto__: null,
  IGasRefunder__factory: IGasRefunder__factory
});

var index$1e = /*#__PURE__*/Object.freeze({
  __proto__: null,
  iGasRefunderSol: index$1f
});

const _abi$L = [
  {
    inputs: [
      {
        internalType: "uint64",
        name: "l2BlockNum",
        type: "uint64"
      }
    ],
    name: "blockL1Num",
    outputs: [
      {
        internalType: "uint64",
        name: "l1BlockNum",
        type: "uint64"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint64",
        name: "size",
        type: "uint64"
      },
      {
        internalType: "uint64",
        name: "leaf",
        type: "uint64"
      }
    ],
    name: "constructOutboxProof",
    outputs: [
      {
        internalType: "bytes32",
        name: "send",
        type: "bytes32"
      },
      {
        internalType: "bytes32",
        name: "root",
        type: "bytes32"
      },
      {
        internalType: "bytes32[]",
        name: "proof",
        type: "bytes32[]"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "sender",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "deposit",
        type: "uint256"
      },
      {
        internalType: "address",
        name: "to",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "l2CallValue",
        type: "uint256"
      },
      {
        internalType: "address",
        name: "excessFeeRefundAddress",
        type: "address"
      },
      {
        internalType: "address",
        name: "callValueRefundAddress",
        type: "address"
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes"
      }
    ],
    name: "estimateRetryableTicket",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint64",
        name: "blockNum",
        type: "uint64"
      }
    ],
    name: "findBatchContainingBlock",
    outputs: [
      {
        internalType: "uint64",
        name: "batch",
        type: "uint64"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address"
      },
      {
        internalType: "bool",
        name: "contractCreation",
        type: "bool"
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes"
      }
    ],
    name: "gasEstimateComponents",
    outputs: [
      {
        internalType: "uint64",
        name: "gasEstimate",
        type: "uint64"
      },
      {
        internalType: "uint64",
        name: "gasEstimateForL1",
        type: "uint64"
      },
      {
        internalType: "uint256",
        name: "baseFee",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "l1BaseFeeEstimate",
        type: "uint256"
      }
    ],
    stateMutability: "payable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address"
      },
      {
        internalType: "bool",
        name: "contractCreation",
        type: "bool"
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes"
      }
    ],
    name: "gasEstimateL1Component",
    outputs: [
      {
        internalType: "uint64",
        name: "gasEstimateForL1",
        type: "uint64"
      },
      {
        internalType: "uint256",
        name: "baseFee",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "l1BaseFeeEstimate",
        type: "uint256"
      }
    ],
    stateMutability: "payable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "blockHash",
        type: "bytes32"
      }
    ],
    name: "getL1Confirmations",
    outputs: [
      {
        internalType: "uint64",
        name: "confirmations",
        type: "uint64"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint64",
        name: "blockNum",
        type: "uint64"
      }
    ],
    name: "l2BlockRangeForL1",
    outputs: [
      {
        internalType: "uint64",
        name: "firstBlock",
        type: "uint64"
      },
      {
        internalType: "uint64",
        name: "lastBlock",
        type: "uint64"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "batchNum",
        type: "uint256"
      },
      {
        internalType: "uint64",
        name: "index",
        type: "uint64"
      }
    ],
    name: "legacyLookupMessageBatchProof",
    outputs: [
      {
        internalType: "bytes32[]",
        name: "proof",
        type: "bytes32[]"
      },
      {
        internalType: "uint256",
        name: "path",
        type: "uint256"
      },
      {
        internalType: "address",
        name: "l2Sender",
        type: "address"
      },
      {
        internalType: "address",
        name: "l1Dest",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "l2Block",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "l1Block",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "timestamp",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256"
      },
      {
        internalType: "bytes",
        name: "calldataForL1",
        type: "bytes"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "nitroGenesisBlock",
    outputs: [
      {
        internalType: "uint256",
        name: "number",
        type: "uint256"
      }
    ],
    stateMutability: "pure",
    type: "function"
  }
];
class NodeInterface__factory {
  static abi = _abi$L;
  static createInterface() {
    return new Interface(_abi$L);
  }
  static connect(address, runner) {
    return new Contract(address, _abi$L, runner);
  }
}

var index$1d = /*#__PURE__*/Object.freeze({
  __proto__: null,
  NodeInterface__factory: NodeInterface__factory
});

var index$1c = /*#__PURE__*/Object.freeze({
  __proto__: null,
  nodeInterfaceSol: index$1d
});

const _abi$K = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "requested",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "current",
        type: "uint256"
      }
    ],
    name: "InvalidBlockNumber",
    type: "error"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "caller",
        type: "address"
      },
      {
        indexed: true,
        internalType: "address",
        name: "destination",
        type: "address"
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "uniqueId",
        type: "uint256"
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "batchNumber",
        type: "uint256"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "indexInBatch",
        type: "uint256"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "arbBlockNum",
        type: "uint256"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "ethBlockNum",
        type: "uint256"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "timestamp",
        type: "uint256"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "callvalue",
        type: "uint256"
      },
      {
        indexed: false,
        internalType: "bytes",
        name: "data",
        type: "bytes"
      }
    ],
    name: "L2ToL1Transaction",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "caller",
        type: "address"
      },
      {
        indexed: true,
        internalType: "address",
        name: "destination",
        type: "address"
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "hash",
        type: "uint256"
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "position",
        type: "uint256"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "arbBlockNum",
        type: "uint256"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "ethBlockNum",
        type: "uint256"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "timestamp",
        type: "uint256"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "callvalue",
        type: "uint256"
      },
      {
        indexed: false,
        internalType: "bytes",
        name: "data",
        type: "bytes"
      }
    ],
    name: "L2ToL1Tx",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "reserved",
        type: "uint256"
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "hash",
        type: "bytes32"
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "position",
        type: "uint256"
      }
    ],
    name: "SendMerkleUpdate",
    type: "event"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "arbBlockNum",
        type: "uint256"
      }
    ],
    name: "arbBlockHash",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "arbBlockNumber",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "arbChainID",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "arbOSVersion",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "getStorageGasAvailable",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "isTopLevelCall",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "sender",
        type: "address"
      },
      {
        internalType: "address",
        name: "unused",
        type: "address"
      }
    ],
    name: "mapL1SenderContractAddressToL2Alias",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address"
      }
    ],
    stateMutability: "pure",
    type: "function"
  },
  {
    inputs: [],
    name: "myCallersAddressWithoutAliasing",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "sendMerkleTreeState",
    outputs: [
      {
        internalType: "uint256",
        name: "size",
        type: "uint256"
      },
      {
        internalType: "bytes32",
        name: "root",
        type: "bytes32"
      },
      {
        internalType: "bytes32[]",
        name: "partials",
        type: "bytes32[]"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "destination",
        type: "address"
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes"
      }
    ],
    name: "sendTxToL1",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "payable",
    type: "function"
  },
  {
    inputs: [],
    name: "wasMyCallersAddressAliased",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "destination",
        type: "address"
      }
    ],
    name: "withdrawEth",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "payable",
    type: "function"
  }
];
class ArbSys__factory {
  static abi = _abi$K;
  static createInterface() {
    return new Interface(_abi$K);
  }
  static connect(address, runner) {
    return new Contract(address, _abi$K, runner);
  }
}

var index$1b = /*#__PURE__*/Object.freeze({
  __proto__: null,
  ArbSys__factory: ArbSys__factory
});

var index$1a = /*#__PURE__*/Object.freeze({
  __proto__: null,
  arbSysSol: index$1b
});

var index$19 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  bridge: index$1g,
  libraries: index$1e,
  nodeInterface: index$1c,
  precompiles: index$1a
});

var index$18 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  src: index$19
});

var index$17 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  nitroContracts: index$18
});

const _abi$J = [
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address"
      }
    ],
    name: "OwnableInvalidOwner",
    type: "error"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address"
      }
    ],
    name: "OwnableUnauthorizedAccount",
    type: "error"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address"
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address"
      }
    ],
    name: "OwnershipTransferred",
    type: "event"
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address"
      }
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  }
];
let Ownable__factory$1 = class Ownable__factory {
  static abi = _abi$J;
  static createInterface() {
    return new Interface(_abi$J);
  }
  static connect(address, runner) {
    return new Contract(address, _abi$J, runner);
  }
};

var index$16 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  Ownable__factory: Ownable__factory$1
});

var index$15 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  ownableSol: index$16
});

const _abi$I = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address"
      },
      {
        indexed: true,
        internalType: "address",
        name: "spender",
        type: "address"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256"
      }
    ],
    name: "Approval",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address"
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256"
      }
    ],
    name: "Transfer",
    type: "event"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address"
      },
      {
        internalType: "address",
        name: "spender",
        type: "address"
      }
    ],
    name: "allowance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256"
      }
    ],
    name: "approve",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool"
      }
    ],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256"
      }
    ],
    name: "approveAndCall",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool"
      }
    ],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256"
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes"
      }
    ],
    name: "approveAndCall",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool"
      }
    ],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address"
      }
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4"
      }
    ],
    name: "supportsInterface",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256"
      }
    ],
    name: "transfer",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool"
      }
    ],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256"
      }
    ],
    name: "transferAndCall",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool"
      }
    ],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256"
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes"
      }
    ],
    name: "transferAndCall",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool"
      }
    ],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address"
      },
      {
        internalType: "address",
        name: "to",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256"
      }
    ],
    name: "transferFrom",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool"
      }
    ],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address"
      },
      {
        internalType: "address",
        name: "to",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256"
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes"
      }
    ],
    name: "transferFromAndCall",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool"
      }
    ],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address"
      },
      {
        internalType: "address",
        name: "to",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256"
      }
    ],
    name: "transferFromAndCall",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool"
      }
    ],
    stateMutability: "nonpayable",
    type: "function"
  }
];
class IERC1363__factory {
  static abi = _abi$I;
  static createInterface() {
    return new Interface(_abi$I);
  }
  static connect(address, runner) {
    return new Contract(address, _abi$I, runner);
  }
}

var index$14 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  IERC1363__factory: IERC1363__factory
});

const _abi$H = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "previousAdmin",
        type: "address"
      },
      {
        indexed: false,
        internalType: "address",
        name: "newAdmin",
        type: "address"
      }
    ],
    name: "AdminChanged",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "beacon",
        type: "address"
      }
    ],
    name: "BeaconUpgraded",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "implementation",
        type: "address"
      }
    ],
    name: "Upgraded",
    type: "event"
  }
];
class IERC1967__factory {
  static abi = _abi$H;
  static createInterface() {
    return new Interface(_abi$H);
  }
  static connect(address, runner) {
    return new Contract(address, _abi$H, runner);
  }
}

var index$13 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  IERC1967__factory: IERC1967__factory
});

const _abi$G = [
  {
    anonymous: false,
    inputs: [],
    name: "EIP712DomainChanged",
    type: "event"
  },
  {
    inputs: [],
    name: "eip712Domain",
    outputs: [
      {
        internalType: "bytes1",
        name: "fields",
        type: "bytes1"
      },
      {
        internalType: "string",
        name: "name",
        type: "string"
      },
      {
        internalType: "string",
        name: "version",
        type: "string"
      },
      {
        internalType: "uint256",
        name: "chainId",
        type: "uint256"
      },
      {
        internalType: "address",
        name: "verifyingContract",
        type: "address"
      },
      {
        internalType: "bytes32",
        name: "salt",
        type: "bytes32"
      },
      {
        internalType: "uint256[]",
        name: "extensions",
        type: "uint256[]"
      }
    ],
    stateMutability: "view",
    type: "function"
  }
];
class IERC5267__factory {
  static abi = _abi$G;
  static createInterface() {
    return new Interface(_abi$G);
  }
  static connect(address, runner) {
    return new Contract(address, _abi$G, runner);
  }
}

var index$12 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  IERC5267__factory: IERC5267__factory
});

const _abi$F = [
  {
    inputs: [
      {
        internalType: "address",
        name: "sender",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "balance",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "needed",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256"
      }
    ],
    name: "ERC1155InsufficientBalance",
    type: "error"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "approver",
        type: "address"
      }
    ],
    name: "ERC1155InvalidApprover",
    type: "error"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "idsLength",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "valuesLength",
        type: "uint256"
      }
    ],
    name: "ERC1155InvalidArrayLength",
    type: "error"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address"
      }
    ],
    name: "ERC1155InvalidOperator",
    type: "error"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "receiver",
        type: "address"
      }
    ],
    name: "ERC1155InvalidReceiver",
    type: "error"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "sender",
        type: "address"
      }
    ],
    name: "ERC1155InvalidSender",
    type: "error"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address"
      },
      {
        internalType: "address",
        name: "owner",
        type: "address"
      }
    ],
    name: "ERC1155MissingApprovalForAll",
    type: "error"
  }
];
class IERC1155Errors__factory {
  static abi = _abi$F;
  static createInterface() {
    return new Interface(_abi$F);
  }
  static connect(address, runner) {
    return new Contract(address, _abi$F, runner);
  }
}

const _abi$E = [
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "allowance",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "needed",
        type: "uint256"
      }
    ],
    name: "ERC20InsufficientAllowance",
    type: "error"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "sender",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "balance",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "needed",
        type: "uint256"
      }
    ],
    name: "ERC20InsufficientBalance",
    type: "error"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "approver",
        type: "address"
      }
    ],
    name: "ERC20InvalidApprover",
    type: "error"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "receiver",
        type: "address"
      }
    ],
    name: "ERC20InvalidReceiver",
    type: "error"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "sender",
        type: "address"
      }
    ],
    name: "ERC20InvalidSender",
    type: "error"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address"
      }
    ],
    name: "ERC20InvalidSpender",
    type: "error"
  }
];
class IERC20Errors__factory {
  static abi = _abi$E;
  static createInterface() {
    return new Interface(_abi$E);
  }
  static connect(address, runner) {
    return new Contract(address, _abi$E, runner);
  }
}

const _abi$D = [
  {
    inputs: [
      {
        internalType: "address",
        name: "sender",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256"
      },
      {
        internalType: "address",
        name: "owner",
        type: "address"
      }
    ],
    name: "ERC721IncorrectOwner",
    type: "error"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256"
      }
    ],
    name: "ERC721InsufficientApproval",
    type: "error"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "approver",
        type: "address"
      }
    ],
    name: "ERC721InvalidApprover",
    type: "error"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address"
      }
    ],
    name: "ERC721InvalidOperator",
    type: "error"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address"
      }
    ],
    name: "ERC721InvalidOwner",
    type: "error"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "receiver",
        type: "address"
      }
    ],
    name: "ERC721InvalidReceiver",
    type: "error"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "sender",
        type: "address"
      }
    ],
    name: "ERC721InvalidSender",
    type: "error"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256"
      }
    ],
    name: "ERC721NonexistentToken",
    type: "error"
  }
];
class IERC721Errors__factory {
  static abi = _abi$D;
  static createInterface() {
    return new Interface(_abi$D);
  }
  static connect(address, runner) {
    return new Contract(address, _abi$D, runner);
  }
}

var index$11 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  IERC1155Errors__factory: IERC1155Errors__factory,
  IERC20Errors__factory: IERC20Errors__factory,
  IERC721Errors__factory: IERC721Errors__factory
});

var index$10 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  draftIerc6093Sol: index$11,
  ierc1363Sol: index$14,
  ierc1967Sol: index$13,
  ierc5267Sol: index$12
});

const _abi$C = [
  {
    inputs: [
      {
        internalType: "address",
        name: "admin",
        type: "address"
      }
    ],
    name: "ERC1967InvalidAdmin",
    type: "error"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "beacon",
        type: "address"
      }
    ],
    name: "ERC1967InvalidBeacon",
    type: "error"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "implementation",
        type: "address"
      }
    ],
    name: "ERC1967InvalidImplementation",
    type: "error"
  },
  {
    inputs: [],
    name: "ERC1967NonPayable",
    type: "error"
  }
];
const _bytecode$j = "0x60566037600b82828239805160001a607314602a57634e487b7160e01b600052600060045260246000fd5b30600052607381538281f3fe73000000000000000000000000000000000000000030146080604052600080fdfea26469706673582212203d0cc6f4ebf77c194bdedecd06cd87a147499b436811583fafed4cb2e9f55a7364736f6c634300081e0033";
const isSuperArgs$j = (xs) => xs.length > 1;
class ERC1967Utils__factory extends ContractFactory {
  constructor(...args) {
    if (isSuperArgs$j(args)) {
      super(...args);
    } else {
      super(_abi$C, _bytecode$j, args[0]);
    }
  }
  getDeployTransaction(overrides) {
    return super.getDeployTransaction(overrides || {});
  }
  deploy(overrides) {
    return super.deploy(overrides || {});
  }
  connect(runner) {
    return super.connect(runner);
  }
  static bytecode = _bytecode$j;
  static abi = _abi$C;
  static createInterface() {
    return new Interface(_abi$C);
  }
  static connect(address, runner) {
    return new Contract(address, _abi$C, runner);
  }
}

var index$$ = /*#__PURE__*/Object.freeze({
  __proto__: null,
  ERC1967Utils__factory: ERC1967Utils__factory
});

var index$_ = /*#__PURE__*/Object.freeze({
  __proto__: null,
  erc1967UtilsSol: index$$
});

const _abi$B = [
  {
    stateMutability: "payable",
    type: "fallback"
  }
];
class Proxy__factory {
  static abi = _abi$B;
  static createInterface() {
    return new Interface(_abi$B);
  }
  static connect(address, runner) {
    return new Contract(address, _abi$B, runner);
  }
}

var index$Z = /*#__PURE__*/Object.freeze({
  __proto__: null,
  Proxy__factory: Proxy__factory
});

const _abi$A = [
  {
    inputs: [],
    name: "implementation",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address"
      }
    ],
    stateMutability: "view",
    type: "function"
  }
];
class IBeacon__factory {
  static abi = _abi$A;
  static createInterface() {
    return new Interface(_abi$A);
  }
  static connect(address, runner) {
    return new Contract(address, _abi$A, runner);
  }
}

var index$Y = /*#__PURE__*/Object.freeze({
  __proto__: null,
  IBeacon__factory: IBeacon__factory
});

var index$X = /*#__PURE__*/Object.freeze({
  __proto__: null,
  iBeaconSol: index$Y
});

var index$W = /*#__PURE__*/Object.freeze({
  __proto__: null,
  beacon: index$X,
  erc1967: index$_,
  proxySol: index$Z
});

const _abi$z = [
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "allowance",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "needed",
        type: "uint256"
      }
    ],
    name: "ERC20InsufficientAllowance",
    type: "error"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "sender",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "balance",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "needed",
        type: "uint256"
      }
    ],
    name: "ERC20InsufficientBalance",
    type: "error"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "approver",
        type: "address"
      }
    ],
    name: "ERC20InvalidApprover",
    type: "error"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "receiver",
        type: "address"
      }
    ],
    name: "ERC20InvalidReceiver",
    type: "error"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "sender",
        type: "address"
      }
    ],
    name: "ERC20InvalidSender",
    type: "error"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address"
      }
    ],
    name: "ERC20InvalidSpender",
    type: "error"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address"
      },
      {
        indexed: true,
        internalType: "address",
        name: "spender",
        type: "address"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256"
      }
    ],
    name: "Approval",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address"
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256"
      }
    ],
    name: "Transfer",
    type: "event"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address"
      },
      {
        internalType: "address",
        name: "spender",
        type: "address"
      }
    ],
    name: "allowance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256"
      }
    ],
    name: "approve",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool"
      }
    ],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address"
      }
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256"
      }
    ],
    name: "transfer",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool"
      }
    ],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address"
      },
      {
        internalType: "address",
        name: "to",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256"
      }
    ],
    name: "transferFrom",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool"
      }
    ],
    stateMutability: "nonpayable",
    type: "function"
  }
];
class ERC20__factory {
  static abi = _abi$z;
  static createInterface() {
    return new Interface(_abi$z);
  }
  static connect(address, runner) {
    return new Contract(address, _abi$z, runner);
  }
}

var index$V = /*#__PURE__*/Object.freeze({
  __proto__: null,
  ERC20__factory: ERC20__factory
});

const _abi$y = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address"
      },
      {
        indexed: true,
        internalType: "address",
        name: "spender",
        type: "address"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256"
      }
    ],
    name: "Approval",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address"
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256"
      }
    ],
    name: "Transfer",
    type: "event"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address"
      },
      {
        internalType: "address",
        name: "spender",
        type: "address"
      }
    ],
    name: "allowance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256"
      }
    ],
    name: "approve",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool"
      }
    ],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address"
      }
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256"
      }
    ],
    name: "transfer",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool"
      }
    ],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address"
      },
      {
        internalType: "address",
        name: "to",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256"
      }
    ],
    name: "transferFrom",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool"
      }
    ],
    stateMutability: "nonpayable",
    type: "function"
  }
];
class IERC20__factory {
  static abi = _abi$y;
  static createInterface() {
    return new Interface(_abi$y);
  }
  static connect(address, runner) {
    return new Contract(address, _abi$y, runner);
  }
}

var index$U = /*#__PURE__*/Object.freeze({
  __proto__: null,
  IERC20__factory: IERC20__factory
});

const _abi$x = [
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "allowance",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "needed",
        type: "uint256"
      }
    ],
    name: "ERC20InsufficientAllowance",
    type: "error"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "sender",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "balance",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "needed",
        type: "uint256"
      }
    ],
    name: "ERC20InsufficientBalance",
    type: "error"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "approver",
        type: "address"
      }
    ],
    name: "ERC20InvalidApprover",
    type: "error"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "receiver",
        type: "address"
      }
    ],
    name: "ERC20InvalidReceiver",
    type: "error"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "sender",
        type: "address"
      }
    ],
    name: "ERC20InvalidSender",
    type: "error"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address"
      }
    ],
    name: "ERC20InvalidSpender",
    type: "error"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address"
      },
      {
        indexed: true,
        internalType: "address",
        name: "spender",
        type: "address"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256"
      }
    ],
    name: "Approval",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address"
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256"
      }
    ],
    name: "Transfer",
    type: "event"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address"
      },
      {
        internalType: "address",
        name: "spender",
        type: "address"
      }
    ],
    name: "allowance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256"
      }
    ],
    name: "approve",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool"
      }
    ],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address"
      }
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "value",
        type: "uint256"
      }
    ],
    name: "burn",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256"
      }
    ],
    name: "burnFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256"
      }
    ],
    name: "transfer",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool"
      }
    ],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address"
      },
      {
        internalType: "address",
        name: "to",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256"
      }
    ],
    name: "transferFrom",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool"
      }
    ],
    stateMutability: "nonpayable",
    type: "function"
  }
];
class ERC20Burnable__factory {
  static abi = _abi$x;
  static createInterface() {
    return new Interface(_abi$x);
  }
  static connect(address, runner) {
    return new Contract(address, _abi$x, runner);
  }
}

var index$T = /*#__PURE__*/Object.freeze({
  __proto__: null,
  ERC20Burnable__factory: ERC20Burnable__factory
});

const _abi$w = [
  {
    inputs: [],
    name: "ECDSAInvalidSignature",
    type: "error"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "length",
        type: "uint256"
      }
    ],
    name: "ECDSAInvalidSignatureLength",
    type: "error"
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "s",
        type: "bytes32"
      }
    ],
    name: "ECDSAInvalidSignatureS",
    type: "error"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "allowance",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "needed",
        type: "uint256"
      }
    ],
    name: "ERC20InsufficientAllowance",
    type: "error"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "sender",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "balance",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "needed",
        type: "uint256"
      }
    ],
    name: "ERC20InsufficientBalance",
    type: "error"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "approver",
        type: "address"
      }
    ],
    name: "ERC20InvalidApprover",
    type: "error"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "receiver",
        type: "address"
      }
    ],
    name: "ERC20InvalidReceiver",
    type: "error"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "sender",
        type: "address"
      }
    ],
    name: "ERC20InvalidSender",
    type: "error"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address"
      }
    ],
    name: "ERC20InvalidSpender",
    type: "error"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "deadline",
        type: "uint256"
      }
    ],
    name: "ERC2612ExpiredSignature",
    type: "error"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "signer",
        type: "address"
      },
      {
        internalType: "address",
        name: "owner",
        type: "address"
      }
    ],
    name: "ERC2612InvalidSigner",
    type: "error"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "currentNonce",
        type: "uint256"
      }
    ],
    name: "InvalidAccountNonce",
    type: "error"
  },
  {
    inputs: [],
    name: "InvalidShortString",
    type: "error"
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "str",
        type: "string"
      }
    ],
    name: "StringTooLong",
    type: "error"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address"
      },
      {
        indexed: true,
        internalType: "address",
        name: "spender",
        type: "address"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256"
      }
    ],
    name: "Approval",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [],
    name: "EIP712DomainChanged",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address"
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256"
      }
    ],
    name: "Transfer",
    type: "event"
  },
  {
    inputs: [],
    name: "DOMAIN_SEPARATOR",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address"
      },
      {
        internalType: "address",
        name: "spender",
        type: "address"
      }
    ],
    name: "allowance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256"
      }
    ],
    name: "approve",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool"
      }
    ],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address"
      }
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "eip712Domain",
    outputs: [
      {
        internalType: "bytes1",
        name: "fields",
        type: "bytes1"
      },
      {
        internalType: "string",
        name: "name",
        type: "string"
      },
      {
        internalType: "string",
        name: "version",
        type: "string"
      },
      {
        internalType: "uint256",
        name: "chainId",
        type: "uint256"
      },
      {
        internalType: "address",
        name: "verifyingContract",
        type: "address"
      },
      {
        internalType: "bytes32",
        name: "salt",
        type: "bytes32"
      },
      {
        internalType: "uint256[]",
        name: "extensions",
        type: "uint256[]"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address"
      }
    ],
    name: "nonces",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address"
      },
      {
        internalType: "address",
        name: "spender",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "deadline",
        type: "uint256"
      },
      {
        internalType: "uint8",
        name: "v",
        type: "uint8"
      },
      {
        internalType: "bytes32",
        name: "r",
        type: "bytes32"
      },
      {
        internalType: "bytes32",
        name: "s",
        type: "bytes32"
      }
    ],
    name: "permit",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256"
      }
    ],
    name: "transfer",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool"
      }
    ],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address"
      },
      {
        internalType: "address",
        name: "to",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256"
      }
    ],
    name: "transferFrom",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool"
      }
    ],
    stateMutability: "nonpayable",
    type: "function"
  }
];
class ERC20Permit__factory {
  static abi = _abi$w;
  static createInterface() {
    return new Interface(_abi$w);
  }
  static connect(address, runner) {
    return new Contract(address, _abi$w, runner);
  }
}

var index$S = /*#__PURE__*/Object.freeze({
  __proto__: null,
  ERC20Permit__factory: ERC20Permit__factory
});

const _abi$v = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address"
      },
      {
        indexed: true,
        internalType: "address",
        name: "spender",
        type: "address"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256"
      }
    ],
    name: "Approval",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address"
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256"
      }
    ],
    name: "Transfer",
    type: "event"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address"
      },
      {
        internalType: "address",
        name: "spender",
        type: "address"
      }
    ],
    name: "allowance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256"
      }
    ],
    name: "approve",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool"
      }
    ],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address"
      }
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256"
      }
    ],
    name: "transfer",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool"
      }
    ],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address"
      },
      {
        internalType: "address",
        name: "to",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256"
      }
    ],
    name: "transferFrom",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool"
      }
    ],
    stateMutability: "nonpayable",
    type: "function"
  }
];
class IERC20Metadata__factory {
  static abi = _abi$v;
  static createInterface() {
    return new Interface(_abi$v);
  }
  static connect(address, runner) {
    return new Contract(address, _abi$v, runner);
  }
}

var index$R = /*#__PURE__*/Object.freeze({
  __proto__: null,
  IERC20Metadata__factory: IERC20Metadata__factory
});

const _abi$u = [
  {
    inputs: [],
    name: "DOMAIN_SEPARATOR",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address"
      }
    ],
    name: "nonces",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address"
      },
      {
        internalType: "address",
        name: "spender",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "deadline",
        type: "uint256"
      },
      {
        internalType: "uint8",
        name: "v",
        type: "uint8"
      },
      {
        internalType: "bytes32",
        name: "r",
        type: "bytes32"
      },
      {
        internalType: "bytes32",
        name: "s",
        type: "bytes32"
      }
    ],
    name: "permit",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  }
];
class IERC20Permit__factory {
  static abi = _abi$u;
  static createInterface() {
    return new Interface(_abi$u);
  }
  static connect(address, runner) {
    return new Contract(address, _abi$u, runner);
  }
}

var index$Q = /*#__PURE__*/Object.freeze({
  __proto__: null,
  IERC20Permit__factory: IERC20Permit__factory
});

var index$P = /*#__PURE__*/Object.freeze({
  __proto__: null,
  erc20BurnableSol: index$T,
  erc20PermitSol: index$S,
  ierc20MetadataSol: index$R,
  ierc20PermitSol: index$Q
});

const _abi$t = [
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "currentAllowance",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "requestedDecrease",
        type: "uint256"
      }
    ],
    name: "SafeERC20FailedDecreaseAllowance",
    type: "error"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "token",
        type: "address"
      }
    ],
    name: "SafeERC20FailedOperation",
    type: "error"
  }
];
const _bytecode$i = "0x60566037600b82828239805160001a607314602a57634e487b7160e01b600052600060045260246000fd5b30600052607381538281f3fe73000000000000000000000000000000000000000030146080604052600080fdfea264697066735822122069f8fe1b46bdf02ea7c0137a80e720ac188e8930343e9fac3f4f81de580a1d0a64736f6c634300081e0033";
const isSuperArgs$i = (xs) => xs.length > 1;
class SafeERC20__factory extends ContractFactory {
  constructor(...args) {
    if (isSuperArgs$i(args)) {
      super(...args);
    } else {
      super(_abi$t, _bytecode$i, args[0]);
    }
  }
  getDeployTransaction(overrides) {
    return super.getDeployTransaction(overrides || {});
  }
  deploy(overrides) {
    return super.deploy(overrides || {});
  }
  connect(runner) {
    return super.connect(runner);
  }
  static bytecode = _bytecode$i;
  static abi = _abi$t;
  static createInterface() {
    return new Interface(_abi$t);
  }
  static connect(address, runner) {
    return new Contract(address, _abi$t, runner);
  }
}

var index$O = /*#__PURE__*/Object.freeze({
  __proto__: null,
  SafeERC20__factory: SafeERC20__factory
});

var index$N = /*#__PURE__*/Object.freeze({
  __proto__: null,
  safeErc20Sol: index$O
});

var index$M = /*#__PURE__*/Object.freeze({
  __proto__: null,
  erc20Sol: index$V,
  extensions: index$P,
  ierc20Sol: index$U,
  utils: index$N
});

var index$L = /*#__PURE__*/Object.freeze({
  __proto__: null,
  erc20: index$M
});

const _abi$s = [
  {
    inputs: [
      {
        internalType: "address",
        name: "target",
        type: "address"
      }
    ],
    name: "AddressEmptyCode",
    type: "error"
  }
];
const _bytecode$h = "0x60566037600b82828239805160001a607314602a57634e487b7160e01b600052600060045260246000fd5b30600052607381538281f3fe73000000000000000000000000000000000000000030146080604052600080fdfea2646970667358221220e5e86df292c2ca26f62ff3e7eb2a9024cd0e4243d45dc7bc1c5465a971d4215464736f6c634300081e0033";
const isSuperArgs$h = (xs) => xs.length > 1;
class Address__factory extends ContractFactory {
  constructor(...args) {
    if (isSuperArgs$h(args)) {
      super(...args);
    } else {
      super(_abi$s, _bytecode$h, args[0]);
    }
  }
  getDeployTransaction(overrides) {
    return super.getDeployTransaction(overrides || {});
  }
  deploy(overrides) {
    return super.deploy(overrides || {});
  }
  connect(runner) {
    return super.connect(runner);
  }
  static bytecode = _bytecode$h;
  static abi = _abi$s;
  static createInterface() {
    return new Interface(_abi$s);
  }
  static connect(address, runner) {
    return new Contract(address, _abi$s, runner);
  }
}

var index$K = /*#__PURE__*/Object.freeze({
  __proto__: null,
  Address__factory: Address__factory
});

const _abi$r = [
  {
    inputs: [],
    name: "FailedCall",
    type: "error"
  },
  {
    inputs: [],
    name: "FailedDeployment",
    type: "error"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "balance",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "needed",
        type: "uint256"
      }
    ],
    name: "InsufficientBalance",
    type: "error"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address"
      }
    ],
    name: "MissingPrecompile",
    type: "error"
  }
];
const _bytecode$g = "0x60566037600b82828239805160001a607314602a57634e487b7160e01b600052600060045260246000fd5b30600052607381538281f3fe73000000000000000000000000000000000000000030146080604052600080fdfea26469706673582212209a41a4f0cc7ace7652452319e17bc006e46185add4d22541975f61b14fa8f33a64736f6c634300081e0033";
const isSuperArgs$g = (xs) => xs.length > 1;
class Errors__factory extends ContractFactory {
  constructor(...args) {
    if (isSuperArgs$g(args)) {
      super(...args);
    } else {
      super(_abi$r, _bytecode$g, args[0]);
    }
  }
  getDeployTransaction(overrides) {
    return super.getDeployTransaction(overrides || {});
  }
  deploy(overrides) {
    return super.deploy(overrides || {});
  }
  connect(runner) {
    return super.connect(runner);
  }
  static bytecode = _bytecode$g;
  static abi = _abi$r;
  static createInterface() {
    return new Interface(_abi$r);
  }
  static connect(address, runner) {
    return new Contract(address, _abi$r, runner);
  }
}

var index$J = /*#__PURE__*/Object.freeze({
  __proto__: null,
  Errors__factory: Errors__factory
});

const _abi$q = [
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "currentNonce",
        type: "uint256"
      }
    ],
    name: "InvalidAccountNonce",
    type: "error"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address"
      }
    ],
    name: "nonces",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  }
];
class Nonces__factory {
  static abi = _abi$q;
  static createInterface() {
    return new Interface(_abi$q);
  }
  static connect(address, runner) {
    return new Contract(address, _abi$q, runner);
  }
}

var index$I = /*#__PURE__*/Object.freeze({
  __proto__: null,
  Nonces__factory: Nonces__factory
});

const _abi$p = [
  {
    inputs: [],
    name: "InvalidShortString",
    type: "error"
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "str",
        type: "string"
      }
    ],
    name: "StringTooLong",
    type: "error"
  }
];
const _bytecode$f = "0x60566037600b82828239805160001a607314602a57634e487b7160e01b600052600060045260246000fd5b30600052607381538281f3fe73000000000000000000000000000000000000000030146080604052600080fdfea264697066735822122003d88aaa6eba9ea4c0ba3933e94e0a5964f9e63efe384dabe55f66f5a1728e5e64736f6c634300081e0033";
const isSuperArgs$f = (xs) => xs.length > 1;
class ShortStrings__factory extends ContractFactory {
  constructor(...args) {
    if (isSuperArgs$f(args)) {
      super(...args);
    } else {
      super(_abi$p, _bytecode$f, args[0]);
    }
  }
  getDeployTransaction(overrides) {
    return super.getDeployTransaction(overrides || {});
  }
  deploy(overrides) {
    return super.deploy(overrides || {});
  }
  connect(runner) {
    return super.connect(runner);
  }
  static bytecode = _bytecode$f;
  static abi = _abi$p;
  static createInterface() {
    return new Interface(_abi$p);
  }
  static connect(address, runner) {
    return new Contract(address, _abi$p, runner);
  }
}

var index$H = /*#__PURE__*/Object.freeze({
  __proto__: null,
  ShortStrings__factory: ShortStrings__factory
});

const _abi$o = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "value",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "length",
        type: "uint256"
      }
    ],
    name: "StringsInsufficientHexLength",
    type: "error"
  },
  {
    inputs: [],
    name: "StringsInvalidAddressFormat",
    type: "error"
  },
  {
    inputs: [],
    name: "StringsInvalidChar",
    type: "error"
  }
];
const _bytecode$e = "0x60566037600b82828239805160001a607314602a57634e487b7160e01b600052600060045260246000fd5b30600052607381538281f3fe73000000000000000000000000000000000000000030146080604052600080fdfea2646970667358221220ca8312e82d36213c64d141980d299035a0c64eee8eb7f6347b06cc2f78ac61b164736f6c634300081e0033";
const isSuperArgs$e = (xs) => xs.length > 1;
class Strings__factory extends ContractFactory {
  constructor(...args) {
    if (isSuperArgs$e(args)) {
      super(...args);
    } else {
      super(_abi$o, _bytecode$e, args[0]);
    }
  }
  getDeployTransaction(overrides) {
    return super.getDeployTransaction(overrides || {});
  }
  deploy(overrides) {
    return super.deploy(overrides || {});
  }
  connect(runner) {
    return super.connect(runner);
  }
  static bytecode = _bytecode$e;
  static abi = _abi$o;
  static createInterface() {
    return new Interface(_abi$o);
  }
  static connect(address, runner) {
    return new Contract(address, _abi$o, runner);
  }
}

var index$G = /*#__PURE__*/Object.freeze({
  __proto__: null,
  Strings__factory: Strings__factory
});

const _abi$n = [
  {
    inputs: [],
    name: "ECDSAInvalidSignature",
    type: "error"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "length",
        type: "uint256"
      }
    ],
    name: "ECDSAInvalidSignatureLength",
    type: "error"
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "s",
        type: "bytes32"
      }
    ],
    name: "ECDSAInvalidSignatureS",
    type: "error"
  }
];
const _bytecode$d = "0x60566037600b82828239805160001a607314602a57634e487b7160e01b600052600060045260246000fd5b30600052607381538281f3fe73000000000000000000000000000000000000000030146080604052600080fdfea26469706673582212209447175e61ea77c41719ea7cd701ff1ba374fbf37c43b2b92b555043e528214364736f6c634300081e0033";
const isSuperArgs$d = (xs) => xs.length > 1;
class ECDSA__factory extends ContractFactory {
  constructor(...args) {
    if (isSuperArgs$d(args)) {
      super(...args);
    } else {
      super(_abi$n, _bytecode$d, args[0]);
    }
  }
  getDeployTransaction(overrides) {
    return super.getDeployTransaction(overrides || {});
  }
  deploy(overrides) {
    return super.deploy(overrides || {});
  }
  connect(runner) {
    return super.connect(runner);
  }
  static bytecode = _bytecode$d;
  static abi = _abi$n;
  static createInterface() {
    return new Interface(_abi$n);
  }
  static connect(address, runner) {
    return new Contract(address, _abi$n, runner);
  }
}

var index$F = /*#__PURE__*/Object.freeze({
  __proto__: null,
  ECDSA__factory: ECDSA__factory
});

const _abi$m = [
  {
    inputs: [],
    name: "InvalidShortString",
    type: "error"
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "str",
        type: "string"
      }
    ],
    name: "StringTooLong",
    type: "error"
  },
  {
    anonymous: false,
    inputs: [],
    name: "EIP712DomainChanged",
    type: "event"
  },
  {
    inputs: [],
    name: "eip712Domain",
    outputs: [
      {
        internalType: "bytes1",
        name: "fields",
        type: "bytes1"
      },
      {
        internalType: "string",
        name: "name",
        type: "string"
      },
      {
        internalType: "string",
        name: "version",
        type: "string"
      },
      {
        internalType: "uint256",
        name: "chainId",
        type: "uint256"
      },
      {
        internalType: "address",
        name: "verifyingContract",
        type: "address"
      },
      {
        internalType: "bytes32",
        name: "salt",
        type: "bytes32"
      },
      {
        internalType: "uint256[]",
        name: "extensions",
        type: "uint256[]"
      }
    ],
    stateMutability: "view",
    type: "function"
  }
];
class EIP712__factory {
  static abi = _abi$m;
  static createInterface() {
    return new Interface(_abi$m);
  }
  static connect(address, runner) {
    return new Contract(address, _abi$m, runner);
  }
}

var index$E = /*#__PURE__*/Object.freeze({
  __proto__: null,
  EIP712__factory: EIP712__factory
});

var index$D = /*#__PURE__*/Object.freeze({
  __proto__: null,
  ecdsaSol: index$F,
  eip712Sol: index$E
});

const _abi$l = [
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4"
      }
    ],
    name: "supportsInterface",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool"
      }
    ],
    stateMutability: "view",
    type: "function"
  }
];
class IERC165__factory {
  static abi = _abi$l;
  static createInterface() {
    return new Interface(_abi$l);
  }
  static connect(address, runner) {
    return new Contract(address, _abi$l, runner);
  }
}

var index$C = /*#__PURE__*/Object.freeze({
  __proto__: null,
  IERC165__factory: IERC165__factory
});

var index$B = /*#__PURE__*/Object.freeze({
  __proto__: null,
  ierc165Sol: index$C
});

const _abi$k = [
  {
    inputs: [
      {
        internalType: "uint8",
        name: "bits",
        type: "uint8"
      },
      {
        internalType: "int256",
        name: "value",
        type: "int256"
      }
    ],
    name: "SafeCastOverflowedIntDowncast",
    type: "error"
  },
  {
    inputs: [
      {
        internalType: "int256",
        name: "value",
        type: "int256"
      }
    ],
    name: "SafeCastOverflowedIntToUint",
    type: "error"
  },
  {
    inputs: [
      {
        internalType: "uint8",
        name: "bits",
        type: "uint8"
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256"
      }
    ],
    name: "SafeCastOverflowedUintDowncast",
    type: "error"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "value",
        type: "uint256"
      }
    ],
    name: "SafeCastOverflowedUintToInt",
    type: "error"
  }
];
const _bytecode$c = "0x60566037600b82828239805160001a607314602a57634e487b7160e01b600052600060045260246000fd5b30600052607381538281f3fe73000000000000000000000000000000000000000030146080604052600080fdfea2646970667358221220207a6091af3a049797b59f084651e20835d20a55fb9c41706a7a23a4dcd2008764736f6c634300081e0033";
const isSuperArgs$c = (xs) => xs.length > 1;
class SafeCast__factory extends ContractFactory {
  constructor(...args) {
    if (isSuperArgs$c(args)) {
      super(...args);
    } else {
      super(_abi$k, _bytecode$c, args[0]);
    }
  }
  getDeployTransaction(overrides) {
    return super.getDeployTransaction(overrides || {});
  }
  deploy(overrides) {
    return super.deploy(overrides || {});
  }
  connect(runner) {
    return super.connect(runner);
  }
  static bytecode = _bytecode$c;
  static abi = _abi$k;
  static createInterface() {
    return new Interface(_abi$k);
  }
  static connect(address, runner) {
    return new Contract(address, _abi$k, runner);
  }
}

var index$A = /*#__PURE__*/Object.freeze({
  __proto__: null,
  SafeCast__factory: SafeCast__factory
});

var index$z = /*#__PURE__*/Object.freeze({
  __proto__: null,
  safeCastSol: index$A
});

var index$y = /*#__PURE__*/Object.freeze({
  __proto__: null,
  addressSol: index$K,
  cryptography: index$D,
  errorsSol: index$J,
  introspection: index$B,
  math: index$z,
  noncesSol: index$I,
  shortStringsSol: index$H,
  stringsSol: index$G
});

var index$x = /*#__PURE__*/Object.freeze({
  __proto__: null,
  access: index$15,
  interfaces: index$10,
  proxy: index$W,
  token: index$L,
  utils: index$y
});

const _abi$j = [
  {
    inputs: [],
    name: "InvalidInitialization",
    type: "error"
  },
  {
    inputs: [],
    name: "NotInitializing",
    type: "error"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address"
      }
    ],
    name: "OwnableInvalidOwner",
    type: "error"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address"
      }
    ],
    name: "OwnableUnauthorizedAccount",
    type: "error"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint64",
        name: "version",
        type: "uint64"
      }
    ],
    name: "Initialized",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address"
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address"
      }
    ],
    name: "OwnershipTransferred",
    type: "event"
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address"
      }
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  }
];
class OwnableUpgradeable__factory {
  static abi = _abi$j;
  static createInterface() {
    return new Interface(_abi$j);
  }
  static connect(address, runner) {
    return new Contract(address, _abi$j, runner);
  }
}

var index$w = /*#__PURE__*/Object.freeze({
  __proto__: null,
  OwnableUpgradeable__factory: OwnableUpgradeable__factory
});

var index$v = /*#__PURE__*/Object.freeze({
  __proto__: null,
  ownableUpgradeableSol: index$w
});

const _abi$i = [
  {
    inputs: [],
    name: "InvalidInitialization",
    type: "error"
  },
  {
    inputs: [],
    name: "NotInitializing",
    type: "error"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint64",
        name: "version",
        type: "uint64"
      }
    ],
    name: "Initialized",
    type: "event"
  }
];
class Initializable__factory {
  static abi = _abi$i;
  static createInterface() {
    return new Interface(_abi$i);
  }
  static connect(address, runner) {
    return new Contract(address, _abi$i, runner);
  }
}

var index$u = /*#__PURE__*/Object.freeze({
  __proto__: null,
  Initializable__factory: Initializable__factory
});

var index$t = /*#__PURE__*/Object.freeze({
  __proto__: null,
  initializableSol: index$u
});

var index$s = /*#__PURE__*/Object.freeze({
  __proto__: null,
  utils: index$t
});

const _abi$h = [
  {
    inputs: [],
    name: "InvalidInitialization",
    type: "error"
  },
  {
    inputs: [],
    name: "NotInitializing",
    type: "error"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint64",
        name: "version",
        type: "uint64"
      }
    ],
    name: "Initialized",
    type: "event"
  }
];
class ContextUpgradeable__factory {
  static abi = _abi$h;
  static createInterface() {
    return new Interface(_abi$h);
  }
  static connect(address, runner) {
    return new Contract(address, _abi$h, runner);
  }
}

var index$r = /*#__PURE__*/Object.freeze({
  __proto__: null,
  ContextUpgradeable__factory: ContextUpgradeable__factory
});

var index$q = /*#__PURE__*/Object.freeze({
  __proto__: null,
  contextUpgradeableSol: index$r
});

var index$p = /*#__PURE__*/Object.freeze({
  __proto__: null,
  access: index$v,
  proxy: index$s,
  utils: index$q
});

var index$o = /*#__PURE__*/Object.freeze({
  __proto__: null,
  contracts: index$x,
  contractsUpgradeable: index$p
});

const _abi$g = [
  {
    inputs: [],
    name: "InvalidInitialization",
    type: "error"
  },
  {
    inputs: [],
    name: "NotInitializing",
    type: "error"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address"
      }
    ],
    name: "OwnableInvalidOwner",
    type: "error"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address"
      }
    ],
    name: "OwnableUnauthorizedAccount",
    type: "error"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "excluded",
        type: "address"
      }
    ],
    name: "AddExcludedAddress",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint64",
        name: "version",
        type: "uint64"
      }
    ],
    name: "Initialized",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "arw",
        type: "address"
      }
    ],
    name: "Initialized",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address"
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address"
      }
    ],
    name: "OwnershipTransferred",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "excluded",
        type: "address"
      }
    ],
    name: "RemoveExcludedAddress",
    type: "event"
  },
  {
    inputs: [],
    name: "ARW",
    outputs: [
      {
        internalType: "contract IERC20",
        name: "",
        type: "address"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_excluded",
        type: "address"
      }
    ],
    name: "addExcludedAddress",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "circulatingSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "excludedAddresses",
    outputs: [
      {
        internalType: "address[]",
        name: "",
        type: "address[]"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "excludedSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_ARW",
        type: "address"
      }
    ],
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_excluded",
        type: "address"
      }
    ],
    name: "removeExcludedaddress",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address"
      }
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  }
];
const _bytecode$b = "0x6080604052348015600f57600080fd5b50610eac8061001f6000396000f3fe608060405234801561001057600080fd5b506004361061009e5760003560e01c80639358928b116100665780639358928b14610139578063a9b54bcd1461014f578063c4d66de814610162578063f2fde38b14610175578063fbb9ee0d1461018857600080fd5b806352ec6716146100a357806365bd5e63146100c1578063715018a6146100d657806389df8136146100de5780638da5cb5b14610109575b600080fd5b6100ab610190565b6040516100b89190610d80565b60405180910390f35b6100d46100cf366004610dcc565b6101a1565b005b6100d461023a565b6000546100f1906001600160a01b031681565b6040516001600160a01b0390911681526020016100b8565b7f9016d09d72d40fdae2fd8ceac6b6234c7706214fd39c1cd1e609a0528c199300546001600160a01b03166100f1565b61014161024e565b6040519081526020016100b8565b6100d461015d366004610dcc565b6102d7565b6100d4610170366004610dcc565b61036c565b6100d4610183366004610dcc565b610904565b610141610942565b606061019c6001610a15565b905090565b6101a9610a29565b6101b4600182610a9f565b6101f75760405162461bcd60e51b815260206004820152600f60248201526e496e76616c6964206164647265737360881b60448201526064015b60405180910390fd5b610202600182610ac6565b506040516001600160a01b038216907f6ade7fc06752ca3786738ecc30afaa9afa43b95e4908d25f416b252537ff533c90600090a250565b610242610a29565b61024c6000610adb565b565b6000610258610942565b60008054906101000a90046001600160a01b03166001600160a01b03166318160ddd6040518163ffffffff1660e01b8152600401602060405180830381865afa1580156102a9573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906102cd9190610df5565b61019c9190610e24565b6102df610a29565b6102ea600182610a9f565b156103295760405162461bcd60e51b815260206004820152600f60248201526e496e76616c6964206164647265737360881b60448201526064016101ee565b610334600182610b4c565b506040516001600160a01b038216907f784d23afa452b9062ecb2423875d1c56e8583688921c7d56f293a0c72645216e90600090a250565b6000610376610b61565b805490915060ff600160401b820416159067ffffffffffffffff1660008115801561039e5750825b905060008267ffffffffffffffff1660011480156103bb5750303b155b9050811580156103c9575080155b156103e75760405163f92ee8a960e01b815260040160405180910390fd5b845467ffffffffffffffff19166001178555831561041157845460ff60401b1916600160401b1785555b61041a33610b8a565b600080546001600160a01b0319166001600160a01b0388169081179091556040519081527f908408e307fc569b417f6cbec5d5a06f44a0a505ac0479b47d421a4b2fd6a1e69060200160405180910390a160408051600d8082526101c08201909252600091602082016101a08036833701905050905073b8c574171ee55be2ddc98e7461f9ebd2de2f00ab816000815181106104b8576104b8610e37565b60200260200101906001600160a01b031690816001600160a01b031681525050731e54223e49ebb025c3fcaed65ce1da9c039c95658160018151811061050057610500610e37565b60200260200101906001600160a01b031690816001600160a01b031681525050732b4e8a0e5e52c65c45692fccf77f10c786bc1e0b8160028151811061054857610548610e37565b60200260200101906001600160a01b031690816001600160a01b03168152505073a0f008b3e3187b247ddc987e52735654048858c98160038151811061059057610590610e37565b60200260200101906001600160a01b031690816001600160a01b0316815250507385225ddfbcc3cd5d5333d1525cb64e43e4c77e75816004815181106105d8576105d8610e37565b60200260200101906001600160a01b031690816001600160a01b0316815250507306088f4b78bbc74570124badb3f9475410dc369a8160058151811061062057610620610e37565b60200260200101906001600160a01b031690816001600160a01b031681525050734af320d6155ac13a962048bc310ed83b1e44e4ae8160068151811061066857610668610e37565b60200260200101906001600160a01b031690816001600160a01b03168152505073754637675bbf31b07f9a114ef59bc78e65737a80816007815181106106b0576106b0610e37565b60200260200101906001600160a01b031690816001600160a01b0316815250507314a77f8656b753be4febab0f8891db0205f7d588816008815181106106f8576106f8610e37565b60200260200101906001600160a01b031690816001600160a01b031681525050732c12b7adab9f02ce1a0aa0e092c2f36487126cce8160098151811061074057610740610e37565b60200260200101906001600160a01b031690816001600160a01b0316815250507317d30a2d883d40090ac1a19a09c635fc967d7d4681600a8151811061078857610788610e37565b60200260200101906001600160a01b031690816001600160a01b031681525050732f19e9d3d3f7f7da27b6a0a2005748e295b6949d81600b815181106107d0576107d0610e37565b60200260200101906001600160a01b031690816001600160a01b031681525050734173f68528dfa76787cc8420c4e8592485456c4381600c8151811061081857610818610e37565b60200260200101906001600160a01b031690816001600160a01b03168152505060005b81518110156108b457600082828151811061085857610858610e37565b60200260200101519050610876816001610b4c90919063ffffffff16565b506040516001600160a01b038216907f784d23afa452b9062ecb2423875d1c56e8583688921c7d56f293a0c72645216e90600090a25060010161083b565b505083156108fc57845460ff60401b19168555604051600181527fc7f505b2f371ae2175ee4913f4499e1f2633a7b5936321eed1cdaeb6115181d29060200160405180910390a15b505050505050565b61090c610a29565b6001600160a01b03811661093657604051631e4fbdf760e01b8152600060048201526024016101ee565b61093f81610adb565b50565b6000808061094e610190565b905060005b8151811015610a0d5760005482516001600160a01b03909116906370a082319084908490811061098557610985610e37565b60200260200101516040518263ffffffff1660e01b81526004016109b891906001600160a01b0391909116815260200190565b602060405180830381865afa1580156109d5573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906109f99190610df5565b610a039084610e4d565b9250600101610953565b509092915050565b60606000610a2283610b9b565b9392505050565b6000610a5c7f9016d09d72d40fdae2fd8ceac6b6234c7706214fd39c1cd1e609a0528c199300546001600160a01b031690565b90506001600160a01b03811615801590610a7f57506001600160a01b0381163314155b1561093f5760405163118cdaa760e01b81523360048201526024016101ee565b6001600160a01b038116600090815260018301602052604081205415155b90505b92915050565b6000610abd836001600160a01b038416610bf7565b7f9016d09d72d40fdae2fd8ceac6b6234c7706214fd39c1cd1e609a0528c19930080546001600160a01b031981166001600160a01b03848116918217845560405192169182907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a3505050565b6000610abd836001600160a01b038416610cea565b6000807ff0c57e16840df040f15088dc2f81fe391c3923bec73e23a9662efc9c229c6a00610ac0565b610b92610d39565b61093f81610d5e565b606081600001805480602002602001604051908101604052809291908181526020018280548015610beb57602002820191906000526020600020905b815481526020019060010190808311610bd7575b50505050509050919050565b60008181526001830160205260408120548015610ce0576000610c1b600183610e24565b8554909150600090610c2f90600190610e24565b9050808214610c94576000866000018281548110610c4f57610c4f610e37565b9060005260206000200154905080876000018481548110610c7257610c72610e37565b6000918252602080832090910192909255918252600188019052604090208390555b8554869080610ca557610ca5610e60565b600190038181906000526020600020016000905590558560010160008681526020019081526020016000206000905560019350505050610ac0565b6000915050610ac0565b6000818152600183016020526040812054610d3157508154600181810184556000848152602080822090930184905584548482528286019093526040902091909155610ac0565b506000610ac0565b610d41610d66565b61024c57604051631afcd79f60e31b815260040160405180910390fd5b61090c610d39565b6000610d70610b61565b54600160401b900460ff16919050565b602080825282518282018190526000918401906040840190835b81811015610dc15783516001600160a01b0316835260209384019390920191600101610d9a565b509095945050505050565b600060208284031215610dde57600080fd5b81356001600160a01b0381168114610a2257600080fd5b600060208284031215610e0757600080fd5b5051919050565b634e487b7160e01b600052601160045260246000fd5b81810381811115610ac057610ac0610e0e565b634e487b7160e01b600052603260045260246000fd5b80820180821115610ac057610ac0610e0e565b634e487b7160e01b600052603160045260246000fdfea2646970667358221220116c24e66f3f2f816ace4f7ec2159d26c1227d5d71d5f301a8d9fc9e935648ab64736f6c634300081e0033";
const isSuperArgs$b = (xs) => xs.length > 1;
class ARWSupply__factory extends ContractFactory {
  constructor(...args) {
    if (isSuperArgs$b(args)) {
      super(...args);
    } else {
      super(_abi$g, _bytecode$b, args[0]);
    }
  }
  getDeployTransaction(overrides) {
    return super.getDeployTransaction(overrides || {});
  }
  deploy(overrides) {
    return super.deploy(overrides || {});
  }
  connect(runner) {
    return super.connect(runner);
  }
  static bytecode = _bytecode$b;
  static abi = _abi$g;
  static createInterface() {
    return new Interface(_abi$g);
  }
  static connect(address, runner) {
    return new Contract(address, _abi$g, runner);
  }
}

var index$n = /*#__PURE__*/Object.freeze({
  __proto__: null,
  ARWSupply__factory: ARWSupply__factory
});

const _abi$f = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_unlockTime",
        type: "uint256"
      }
    ],
    stateMutability: "payable",
    type: "constructor"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "when",
        type: "uint256"
      }
    ],
    name: "Withdrawal",
    type: "event"
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address payable",
        name: "",
        type: "address"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "unlockTime",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "withdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  }
];
const _bytecode$a = "0x60806040526040516102a03803806102a08339810160408190526020916097565b804210607e5760405162461bcd60e51b815260206004820152602360248201527f556e6c6f636b2074696d652073686f756c6420626520696e207468652066757460448201526275726560e81b606482015260840160405180910390fd5b600055600180546001600160a01b0319163317905560af565b60006020828403121560a857600080fd5b5051919050565b6101e2806100be6000396000f3fe608060405234801561001057600080fd5b50600436106100415760003560e01c8063251c1aa3146100465780633ccfd60b146100625780638da5cb5b1461006c575b600080fd5b61004f60005481565b6040519081526020015b60405180910390f35b61006a610097565b005b60015461007f906001600160a01b031681565b6040516001600160a01b039091168152602001610059565b6000544210156100e75760405162461bcd60e51b8152602060048201526016602482015275165bdd4818d85b89dd081dda5d1a191c985dc81e595d60521b60448201526064015b60405180910390fd5b6001546001600160a01b031633146101385760405162461bcd60e51b81526020600482015260146024820152732cb7ba9030b932b713ba103a34329037bbb732b960611b60448201526064016100de565b604080514781524260208201527fbf2ed60bd5b5965d685680c01195c9514e4382e28e3a5a2d2d5244bf59411b93910160405180910390a16001546040516001600160a01b03909116904780156108fc02916000818181858888f193505050501580156101a9573d6000803e3d6000fd5b5056fea2646970667358221220d5263116f896a3f18a47334ef21d9e8e402a28dcd2071309f446598d27cf5e6764736f6c634300081e0033";
const isSuperArgs$a = (xs) => xs.length > 1;
class Lock__factory extends ContractFactory {
  constructor(...args) {
    if (isSuperArgs$a(args)) {
      super(...args);
    } else {
      super(_abi$f, _bytecode$a, args[0]);
    }
  }
  getDeployTransaction(_unlockTime, overrides) {
    return super.getDeployTransaction(_unlockTime, overrides || {});
  }
  deploy(_unlockTime, overrides) {
    return super.deploy(_unlockTime, overrides || {});
  }
  connect(runner) {
    return super.connect(runner);
  }
  static bytecode = _bytecode$a;
  static abi = _abi$f;
  static createInterface() {
    return new Interface(_abi$f);
  }
  static connect(address, runner) {
    return new Contract(address, _abi$f, runner);
  }
}

var index$m = /*#__PURE__*/Object.freeze({
  __proto__: null,
  Lock__factory: Lock__factory
});

const _abi$e = [
  {
    inputs: [],
    name: "InvalidInitialization",
    type: "error"
  },
  {
    inputs: [],
    name: "InvalidSignatureLength",
    type: "error"
  },
  {
    inputs: [],
    name: "NotInitializing",
    type: "error"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address"
      }
    ],
    name: "OwnableInvalidOwner",
    type: "error"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address"
      }
    ],
    name: "OwnableUnauthorizedAccount",
    type: "error"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "token",
        type: "address"
      }
    ],
    name: "SafeERC20FailedOperation",
    type: "error"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "nonce",
        type: "uint256"
      },
      {
        indexed: false,
        internalType: "bool",
        name: "success",
        type: "bool"
      },
      {
        indexed: false,
        internalType: "bytes",
        name: "returnData",
        type: "bytes"
      }
    ],
    name: "BridgedCall",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "nonce",
        type: "uint256"
      },
      {
        indexed: true,
        internalType: "address",
        name: "token",
        type: "address"
      },
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address"
      },
      {
        indexed: false,
        internalType: "address",
        name: "to",
        type: "address"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256"
      },
      {
        indexed: false,
        internalType: "bytes",
        name: "data",
        type: "bytes"
      }
    ],
    name: "BridgedFrom",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "nonce",
        type: "uint256"
      },
      {
        indexed: false,
        internalType: "string",
        name: "msg",
        type: "string"
      }
    ],
    name: "BridgedMessage",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "nonce",
        type: "uint256"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "bridgeID",
        type: "uint256"
      },
      {
        indexed: true,
        internalType: "address",
        name: "token",
        type: "address"
      },
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address"
      },
      {
        indexed: false,
        internalType: "address",
        name: "to",
        type: "address"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256"
      },
      {
        indexed: false,
        internalType: "bytes",
        name: "data",
        type: "bytes"
      }
    ],
    name: "BridgedTo",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint64",
        name: "version",
        type: "uint64"
      }
    ],
    name: "Initialized",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "arbSys",
        type: "address"
      },
      {
        indexed: false,
        internalType: "address",
        name: "inbox",
        type: "address"
      },
      {
        indexed: false,
        internalType: "address",
        name: "otherGateway",
        type: "address"
      }
    ],
    name: "InitializedGateway",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address"
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address"
      }
    ],
    name: "OwnershipTransferred",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "home",
        type: "address"
      },
      {
        indexed: false,
        internalType: "address",
        name: "other",
        type: "address"
      }
    ],
    name: "SetOtherToken",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "token",
        type: "address"
      },
      {
        indexed: false,
        internalType: "bool",
        name: "shouldBurn",
        type: "bool"
      }
    ],
    name: "SetToBurn",
    type: "event"
  },
  {
    inputs: [],
    name: "arbsys",
    outputs: [
      {
        internalType: "contract ArbSys",
        name: "",
        type: "address"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint8",
        name: "tokenDecimals",
        type: "uint8"
      },
      {
        internalType: "address",
        name: "token",
        type: "address"
      },
      {
        internalType: "address",
        name: "from",
        type: "address"
      },
      {
        internalType: "address",
        name: "to",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256"
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes"
      },
      {
        internalType: "uint256",
        name: "_nonce",
        type: "uint256"
      }
    ],
    name: "bridgeFrom",
    outputs: [],
    stateMutability: "payable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_nonce",
        type: "uint256"
      },
      {
        internalType: "string",
        name: "_msg",
        type: "string"
      }
    ],
    name: "bridgeMsg",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "contract IERC20Mintable",
        name: "token",
        type: "address"
      },
      {
        internalType: "address",
        name: "to",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256"
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes"
      },
      {
        internalType: "uint256",
        name: "maxSubmissionCost",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "maxGas",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "gasPriceBid",
        type: "uint256"
      }
    ],
    name: "bridgeTo",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "payable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "contract IERC20Mintable",
        name: "token",
        type: "address"
      },
      {
        internalType: "address",
        name: "to",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256"
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes"
      },
      {
        internalType: "uint256",
        name: "maxSubmissionCost",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "maxGas",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "gasPriceBid",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "deadline",
        type: "uint256"
      },
      {
        internalType: "bytes",
        name: "signature",
        type: "bytes"
      }
    ],
    name: "bridgeToPermit",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "payable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "msgSender",
        type: "address"
      }
    ],
    name: "checkArb",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "fromValue",
        type: "uint256"
      },
      {
        internalType: "uint8",
        name: "fromDecimals",
        type: "uint8"
      },
      {
        internalType: "uint8",
        name: "toDecimals",
        type: "uint8"
      }
    ],
    name: "convertAmount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "pure",
    type: "function"
  },
  {
    inputs: [],
    name: "inbox",
    outputs: [
      {
        internalType: "contract IInbox",
        name: "",
        type: "address"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_owner",
        type: "address"
      },
      {
        internalType: "contract IInbox",
        name: "_inbox",
        type: "address"
      },
      {
        internalType: "address",
        name: "_otherGateway",
        type: "address"
      },
      {
        components: [
          {
            internalType: "address",
            name: "home",
            type: "address"
          },
          {
            internalType: "address",
            name: "other",
            type: "address"
          }
        ],
        internalType: "struct ArbGateway.OtherTokens[]",
        name: "_otherTokens",
        type: "tuple[]"
      }
    ],
    name: "initializeGateway",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "nonce",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "otherGateway",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address"
      }
    ],
    name: "otherTokens",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "homeToken",
        type: "address"
      }
    ],
    name: "setBurnToken",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "home",
        type: "address"
      },
      {
        internalType: "address",
        name: "other",
        type: "address"
      }
    ],
    name: "setOtherToken",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address"
      }
    ],
    name: "shouldBurnToken",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address"
      }
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  }
];
const _bytecode$9 = "0x6080604052348015600f57600080fd5b50611dd78061001f6000396000f3fe6080604052600436106101095760003560e01c8063b190be8511610095578063e3f30e7111610064578063e3f30e71146102a9578063eac96f23146102df578063ebde1bdb146102ff578063f2fde38b1461031f578063fb0e722b1461033f57600080fd5b8063b190be8514610226578063b44db82e14610246578063c358798014610259578063df36132b1461027957600080fd5b80638da5cb5b116100dc5780638da5cb5b1461017e57806390f7e1b3146101ab57806394ba88cb146101cb578063a51c8cb9146101fb578063affed0e01461021057600080fd5b806348875bf51461010e57806360e312a714610130578063715018a61461015657806374378d371461016b575b600080fd5b34801561011a57600080fd5b5061012e610129366004611570565b61035f565b005b61014361013e366004611610565b6103db565b6040519081526020015b60405180910390f35b34801561016257600080fd5b5061012e610700565b61012e6101793660046116a6565b610714565b34801561018a57600080fd5b506101936107fb565b6040516001600160a01b03909116815260200161014d565b3480156101b757600080fd5b50600154610193906001600160a01b031681565b3480156101d757600080fd5b506101eb6101e6366004611744565b610829565b604051901515815260200161014d565b34801561020757600080fd5b50610193606481565b34801561021c57600080fd5b5061014360045481565b34801561023257600080fd5b50610143610241366004611761565b6109fc565b6101436102543660046117a3565b610a27565b34801561026557600080fd5b5061012e610274366004611744565b610ae2565b34801561028557600080fd5b506101eb610294366004611744565b60036020526000908152604090205460ff1681565b3480156102b557600080fd5b506101936102c4366004611744565b6002602052600090815260409020546001600160a01b031681565b3480156102eb57600080fd5b5061012e6102fa366004611860565b610c6b565b34801561030b57600080fd5b5061012e61031a366004611985565b610e24565b34801561032b57600080fd5b5061012e61033a366004611744565b610e8c565b34801561034b57600080fd5b50600054610193906001600160a01b031681565b33301461039f5760405162461bcd60e51b815260206004820152600960248201526827a7262cafa9a2a62360b91b60448201526064015b60405180910390fd5b817f07ce1e2038f0bf86b874f8aa890353ddfe00ccba5e000ad4b713e9b2ce90fa72826040516103cf9190611a0e565b60405180910390a25050565b60006103f26001600160a01b038916333089610eca565b6001600160a01b03881660009081526003602052604090205460ff161561046e57604051630852cd8d60e31b8152600481018790526001600160a01b038916906342966c6890602401600060405180830381600087803b15801561045557600080fd5b505af1158015610469573d6000803e3d6000fd5b505050505b6000600454905060006374378d3760e01b8a6001600160a01b031663313ce5676040518163ffffffff1660e01b8152600401602060405180830381865afa1580156104bd573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906104e19190611a21565b6001600160a01b03808d166000908152600260205260409081902054905161051b9392919091169033908e908e908e908a90602401611a3e565b60408051601f198184030181529190526020810180516001600160e01b03166001600160e01b03199093169290921790915260008054919250906001600160a01b031615806106125760008054906101000a90046001600160a01b03166001600160a01b031663679b6ded34600160009054906101000a90046001600160a01b031660008c33338e8e8c6040518a63ffffffff1660e01b81526004016105c8989796959493929190611a96565b60206040518083038185885af11580156105e6573d6000803e3d6000fd5b50505050506040513d601f19601f8201168201806040525081019061060b9190611af5565b9150610689565b6001546040516349460b4d60e11b815260649163928c169a91610643916001600160a01b0316908790600401611b0e565b6020604051808303816000875af1158015610662573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906106869190611af5565b91505b6004805490600061069983611b48565b9190505550336001600160a01b03168c6001600160a01b0316857f9df4cc1e9776bb39b63370f1f8d003320ceeebe30547208fa83a07a3e984794b858f8f8f6040516106e89493929190611b61565b60405180910390a450919a9950505050505050505050565b610708610f37565b6107126000610f84565b565b61071d33610829565b80610740575061072b6107fb565b6001600160a01b0316336001600160a01b0316145b61077b5760405162461bcd60e51b815260206004820152600c60248201526b4e4f545f415242495452554d60a01b6044820152606401610396565b6107e28388886001600160a01b031663313ce5676040518163ffffffff1660e01b8152600401602060405180830381865afa1580156107be573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906102419190611a21565b92506107f2868686868686610ff5565b50505050505050565b7f9016d09d72d40fdae2fd8ceac6b6234c7706214fd39c1cd1e609a0528c199300546001600160a01b031690565b600080546001600160a01b031615801561088257600154610866906001600160a01b03167311110000000000000000000000000000000011110190565b6001600160a01b0316836001600160a01b031614915050919050565b60008060009054906101000a90046001600160a01b03166001600160a01b031663e78cea926040518163ffffffff1660e01b8152600401602060405180830381865afa1580156108d6573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906108fa9190611b98565b9050806001600160a01b0316846001600160a01b03161480156109f457506001546040805163ab5d894360e01b815290516001600160a01b039283169284169163ab5d89439160048083019260209291908290030181865afa158015610964573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906109889190611b98565b6001600160a01b03166380648b026040518163ffffffff1660e01b8152600401602060405180830381865afa1580156109c5573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906109e99190611b98565b6001600160a01b0316145b949350505050565b6000610a088284611bb5565b610a1390600a611cb5565b610a1d9085611cc4565b90505b9392505050565b600080600080610a36856112ca565b60405163d505accf60e01b8152336004820152306024820152604481018f9052606481018a905260ff8416608482015260a4810183905260c4810182905292955090935091506001600160a01b038e169063d505accf9060e401600060405180830381600087803b158015610aaa57600080fd5b505af1158015610abe573d6000803e3d6000fd5b50505050610ad18d8d8d8d8d8d8d6103db565b9d9c50505050505050505050505050565b610aea610f37565b6001600160a01b03811660009081526003602052604090205460ff16610b11576001610b14565b60005b6001600160a01b0382166000908152600360205260409020805460ff1916911515918217905560ff1615610c15576040516370a0823160e01b815230600482015281906000906001600160a01b038316906370a0823190602401602060405180830381865afa158015610b8b573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610baf9190611af5565b90508015610c1257604051630852cd8d60e31b8152600481018290526001600160a01b038316906342966c6890602401600060405180830381600087803b158015610bf957600080fd5b505af1158015610c0d573d6000803e3d6000fd5b505050505b50505b6001600160a01b03811660008181526003602090815260409182902054915160ff909216151582527f7740f93df62e6714ab915a82ef699f7a6db1f754498e2e363890d286aba7dcab910160405180910390a250565b6000610c75611314565b805490915060ff600160401b820416159067ffffffffffffffff16600081158015610c9d5750825b905060008267ffffffffffffffff166001148015610cba5750303b155b905081158015610cc8575080155b15610ce65760405163f92ee8a960e01b815260040160405180910390fd5b845467ffffffffffffffff191660011785558315610d1057845460ff60401b1916600160401b1785555b600080546001600160a01b03808b166001600160a01b031992831617835560018054918b16919092161790555b8651811015610d7f576000878281518110610d5a57610d5a611ce6565b60200260200101519050610d7681600001518260200151610e24565b50600101610d3d565b50610d898961133f565b60408051606481526001600160a01b038a8116602083015289168183015290517f59967eb20e0c027d0c4fe6e11fcec2273a08036e26740962b3ef3a23f107f93c9181900360600190a18315610e1957845460ff60401b19168555604051600181527fc7f505b2f371ae2175ee4913f4499e1f2633a7b5936321eed1cdaeb6115181d29060200160405180910390a15b505050505050505050565b610e2c610f37565b6001600160a01b0382811660008181526002602090815260409182902080546001600160a01b0319169486169485179055905192835290917fd7b0a59830045bcaf6233768890edf6fcda71a5654d385440db294eb92b9a7db91016103cf565b610e94610f37565b6001600160a01b038116610ebe57604051631e4fbdf760e01b815260006004820152602401610396565b610ec781610f84565b50565b6040516001600160a01b038481166024830152838116604483015260648201839052610f319186918216906323b872dd906084015b604051602081830303815290604052915060e01b6020820180516001600160e01b038381831617835250505050611350565b50505050565b6000610f416107fb565b90506001600160a01b03811615801590610f6457506001600160a01b0381163314155b15610ec75760405163118cdaa760e01b8152336004820152602401610396565b7f9016d09d72d40fdae2fd8ceac6b6234c7706214fd39c1cd1e609a0528c19930080546001600160a01b031981166001600160a01b03848116918217845560405192169182907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a3505050565b6040516370a0823160e01b8152306004820152869084906001600160a01b038316906370a0823190602401602060405180830381865afa15801561103d573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906110619190611af5565b1061107f5761107a6001600160a01b03821686866113c1565b6110e2565b6040516340c10f1960e01b81526001600160a01b038681166004830152602482018690528216906340c10f1990604401600060405180830381600087803b1580156110c957600080fd5b505af11580156110dd573d6000803e3d6000fd5b505050505b8251156112715760006348875bf560e01b6110ff858360046113f7565b61110890611cfc565b6001600160e01b03191614905080156111bb576000306001600160a01b0316856040516111359190611d3a565b6000604051808303816000865af19150503d8060008114611172576040519150601f19603f3d011682016040523d82523d6000602084013e611177565b606091505b50509050806111b55760405162461bcd60e51b815260206004820152600a6024820152691354d1d7d1905253115160b21b6044820152606401610396565b5061126f565b6001600160a01b0386163b1561126f57600080876001600160a01b0316620c3500876040516111ea9190611d3a565b60006040518083038160008787f1925050503d8060008114611228576040519150601f19603f3d011682016040523d82523d6000602084013e61122d565b606091505b5091509150847f840af9ca2ec8c881ca3de23cf221981cd4118acdefeb96233fbdf0e365d761558383604051611264929190611d56565b60405180910390a250505b505b856001600160a01b0316876001600160a01b0316837f42365fe0dfe76a5961cdef1960c9135c4097a1b6c253d8c1d74f5d27e41cbb8e8888886040516112b993929190611d71565b60405180910390a450505050505050565b600080600083516041036112f45750505060208101516040820151606083015160001a919061130d565b604051634be6321b60e01b815260040160405180910390fd5b9193909250565b6000807ff0c57e16840df040f15088dc2f81fe391c3923bec73e23a9662efc9c229c6a005b92915050565b61134761145d565b610ec781611482565b600080602060008451602086016000885af180611373576040513d6000823e3d81fd5b50506000513d9150811561138b578060011415611398565b6001600160a01b0384163b155b15610f3157604051635274afe760e01b81526001600160a01b0385166004820152602401610396565b6040516001600160a01b038381166024830152604482018390526113f291859182169063a9059cbb90606401610eff565b505050565b60608351828111611406578092505b838111611411578093505b5081831015610a205750604051828203848401601f19601f830181165b828101518582015281018061142e57505050806020830101600081526020810160405250808252509392505050565b61146561148a565b61071257604051631afcd79f60e31b815260040160405180910390fd5b610e9461145d565b6000611494611314565b54600160401b900460ff16919050565b634e487b7160e01b600052604160045260246000fd5b6040805190810167ffffffffffffffff811182821017156114dd576114dd6114a4565b60405290565b604051601f8201601f1916810167ffffffffffffffff8111828210171561150c5761150c6114a4565b604052919050565b60008067ffffffffffffffff84111561152f5761152f6114a4565b50601f8301601f1916602001611544816114e3565b91505082815283838301111561155957600080fd5b828260208301376000602084830101529392505050565b6000806040838503121561158357600080fd5b82359150602083013567ffffffffffffffff8111156115a157600080fd5b8301601f810185136115b257600080fd5b6115c185823560208401611514565b9150509250929050565b6001600160a01b0381168114610ec757600080fd5b80356115eb816115cb565b919050565b600082601f83011261160157600080fd5b610a2083833560208501611514565b600080600080600080600060e0888a03121561162b57600080fd5b8735611636816115cb565b96506020880135611646816115cb565b955060408801359450606088013567ffffffffffffffff81111561166957600080fd5b6116758a828b016115f0565b979a969950949760808101359660a0820135965060c090910135945092505050565b60ff81168114610ec757600080fd5b600080600080600080600060e0888a0312156116c157600080fd5b87356116cc81611697565b965060208801356116dc816115cb565b955060408801356116ec816115cb565b945060608801356116fc816115cb565b93506080880135925060a088013567ffffffffffffffff81111561171f57600080fd5b61172b8a828b016115f0565b979a969950949793969295929450505060c09091013590565b60006020828403121561175657600080fd5b8135610a20816115cb565b60008060006060848603121561177657600080fd5b83359250602084013561178881611697565b9150604084013561179881611697565b809150509250925092565b60008060008060008060008060006101208a8c0312156117c257600080fd5b89356117cd816115cb565b98506117db60208b016115e0565b975060408a0135965060608a013567ffffffffffffffff8111156117fe57600080fd5b61180a8c828d016115f0565b96505060808a0135945060a08a0135935060c08a0135925060e08a013591506101008a013567ffffffffffffffff81111561184457600080fd5b6118508c828d016115f0565b9150509295985092959850929598565b6000806000806080858703121561187657600080fd5b8435611881816115cb565b93506020850135611891816115cb565b925060408501356118a1816115cb565b9150606085013567ffffffffffffffff8111156118bd57600080fd5b8501601f810187136118ce57600080fd5b803567ffffffffffffffff8111156118e8576118e86114a4565b6118f760208260051b016114e3565b8082825260208201915060208360061b85010192508983111561191957600080fd5b6020840193505b82841015611977576040848b03121561193857600080fd5b6119406114ba565b843561194b816115cb565b8152602085013561195b816115cb565b8060208301525080835250602082019150604084019350611920565b969995985093965050505050565b6000806040838503121561199857600080fd5b82356119a3816115cb565b915060208301356119b3816115cb565b809150509250929050565b60005b838110156119d95781810151838201526020016119c1565b50506000910152565b600081518084526119fa8160208601602086016119be565b601f01601f19169290920160200192915050565b602081526000610a2060208301846119e2565b600060208284031215611a3357600080fd5b8151610a2081611697565b60ff881681526001600160a01b0387811660208301528681166040830152851660608201526080810184905260e060a08201819052600090611a82908301856119e2565b90508260c083015298975050505050505050565b6001600160a01b038981168252602082018990526040820188905286811660608301528516608082015260a0810184905260c0810183905261010060e08201819052600090611ae7908301846119e2565b9a9950505050505050505050565b600060208284031215611b0757600080fd5b5051919050565b6001600160a01b0383168152604060208201819052600090610a1d908301846119e2565b634e487b7160e01b600052601160045260246000fd5b600060018201611b5a57611b5a611b32565b5060010190565b84815260018060a01b0384166020820152826040820152608060608201526000611b8e60808301846119e2565b9695505050505050565b600060208284031215611baa57600080fd5b8151610a20816115cb565b60ff828116828216039081111561133957611339611b32565b6001815b6001841115611c0957808504811115611bed57611bed611b32565b6001841615611bfb57908102905b60019390931c928002611bd2565b935093915050565b600082611c2057506001611339565b81611c2d57506000611339565b8160018114611c435760028114611c4d57611c69565b6001915050611339565b60ff841115611c5e57611c5e611b32565b50506001821b611339565b5060208310610133831016604e8410600b8410161715611c8c575081810a611339565b611c996000198484611bce565b8060001904821115611cad57611cad611b32565b029392505050565b6000610a2060ff841683611c11565b600082611ce157634e487b7160e01b600052601260045260246000fd5b500490565b634e487b7160e01b600052603260045260246000fd5b805160208201516001600160e01b0319811691906004821015611d33576001600160e01b0319600483900360031b81901b82161692505b5050919050565b60008251611d4c8184602087016119be565b9190910192915050565b8215158152604060208201526000610a1d60408301846119e2565b60018060a01b0384168152826020820152606060408201526000611d9860608301846119e2565b9594505050505056fea2646970667358221220f5a3f6772b5917dc118dc5a233b9e7ab2dc0c2fae7411e5c4c87a3180def06f464736f6c634300081e0033";
const isSuperArgs$9 = (xs) => xs.length > 1;
class ArbGateway__factory extends ContractFactory {
  constructor(...args) {
    if (isSuperArgs$9(args)) {
      super(...args);
    } else {
      super(_abi$e, _bytecode$9, args[0]);
    }
  }
  getDeployTransaction(overrides) {
    return super.getDeployTransaction(overrides || {});
  }
  deploy(overrides) {
    return super.deploy(overrides || {});
  }
  connect(runner) {
    return super.connect(runner);
  }
  static bytecode = _bytecode$9;
  static abi = _abi$e;
  static createInterface() {
    return new Interface(_abi$e);
  }
  static connect(address, runner) {
    return new Contract(address, _abi$e, runner);
  }
}

var index$l = /*#__PURE__*/Object.freeze({
  __proto__: null,
  ArbGateway__factory: ArbGateway__factory
});

const _abi$d = [
  {
    inputs: [],
    name: "InvalidInitialization",
    type: "error"
  },
  {
    inputs: [],
    name: "InvalidSignatureLength",
    type: "error"
  },
  {
    inputs: [],
    name: "NotInitializing",
    type: "error"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address"
      }
    ],
    name: "OwnableInvalidOwner",
    type: "error"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address"
      }
    ],
    name: "OwnableUnauthorizedAccount",
    type: "error"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "token",
        type: "address"
      }
    ],
    name: "SafeERC20FailedOperation",
    type: "error"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "nonce",
        type: "uint256"
      },
      {
        indexed: false,
        internalType: "bool",
        name: "success",
        type: "bool"
      },
      {
        indexed: false,
        internalType: "bytes",
        name: "returnData",
        type: "bytes"
      }
    ],
    name: "BridgedCall",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "nonce",
        type: "uint256"
      },
      {
        indexed: true,
        internalType: "address",
        name: "token",
        type: "address"
      },
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address"
      },
      {
        indexed: false,
        internalType: "address",
        name: "to",
        type: "address"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256"
      },
      {
        indexed: false,
        internalType: "bytes",
        name: "data",
        type: "bytes"
      }
    ],
    name: "BridgedFrom",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "nonce",
        type: "uint256"
      },
      {
        indexed: false,
        internalType: "string",
        name: "msg",
        type: "string"
      }
    ],
    name: "BridgedMessage",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "nonce",
        type: "uint256"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "bridgeID",
        type: "uint256"
      },
      {
        indexed: true,
        internalType: "address",
        name: "token",
        type: "address"
      },
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address"
      },
      {
        indexed: false,
        internalType: "address",
        name: "to",
        type: "address"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256"
      },
      {
        indexed: false,
        internalType: "bytes",
        name: "data",
        type: "bytes"
      }
    ],
    name: "BridgedTo",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint64",
        name: "version",
        type: "uint64"
      }
    ],
    name: "Initialized",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "arbSys",
        type: "address"
      },
      {
        indexed: false,
        internalType: "address",
        name: "inbox",
        type: "address"
      },
      {
        indexed: false,
        internalType: "address",
        name: "otherGateway",
        type: "address"
      }
    ],
    name: "InitializedGateway",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address"
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address"
      }
    ],
    name: "OwnershipTransferred",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "bool",
        name: "autoSettle",
        type: "bool"
      }
    ],
    name: "SetAutoSettle",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "home",
        type: "address"
      },
      {
        indexed: false,
        internalType: "address",
        name: "other",
        type: "address"
      }
    ],
    name: "SetOtherToken",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "token",
        type: "address"
      },
      {
        indexed: false,
        internalType: "bool",
        name: "shouldBurn",
        type: "bool"
      }
    ],
    name: "SetToBurn",
    type: "event"
  },
  {
    inputs: [],
    name: "arbsys",
    outputs: [
      {
        internalType: "contract ArbSys",
        name: "",
        type: "address"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "autoSettle",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint8",
        name: "tokenDecimals",
        type: "uint8"
      },
      {
        internalType: "address",
        name: "token",
        type: "address"
      },
      {
        internalType: "address",
        name: "from",
        type: "address"
      },
      {
        internalType: "address",
        name: "to",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256"
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes"
      },
      {
        internalType: "uint256",
        name: "_nonce",
        type: "uint256"
      }
    ],
    name: "bridgeFrom",
    outputs: [],
    stateMutability: "payable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_nonce",
        type: "uint256"
      },
      {
        internalType: "string",
        name: "_msg",
        type: "string"
      }
    ],
    name: "bridgeMsg",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "contract IERC20Mintable",
        name: "token",
        type: "address"
      },
      {
        internalType: "address",
        name: "to",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256"
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes"
      },
      {
        internalType: "uint256",
        name: "maxSubmissionCost",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "maxGas",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "gasPriceBid",
        type: "uint256"
      }
    ],
    name: "bridgeTo",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "payable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "contract IERC20Mintable",
        name: "token",
        type: "address"
      },
      {
        internalType: "address",
        name: "to",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256"
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes"
      },
      {
        internalType: "uint256",
        name: "maxSubmissionCost",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "maxGas",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "gasPriceBid",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "deadline",
        type: "uint256"
      },
      {
        internalType: "bytes",
        name: "signature",
        type: "bytes"
      }
    ],
    name: "bridgeToPermit",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "payable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "msgSender",
        type: "address"
      }
    ],
    name: "checkArb",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "fromValue",
        type: "uint256"
      },
      {
        internalType: "uint8",
        name: "fromDecimals",
        type: "uint8"
      },
      {
        internalType: "uint8",
        name: "toDecimals",
        type: "uint8"
      }
    ],
    name: "convertAmount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "pure",
    type: "function"
  },
  {
    inputs: [],
    name: "inbox",
    outputs: [
      {
        internalType: "contract IInbox",
        name: "",
        type: "address"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_owner",
        type: "address"
      },
      {
        internalType: "contract IInbox",
        name: "_inbox",
        type: "address"
      },
      {
        internalType: "address",
        name: "_otherGateway",
        type: "address"
      },
      {
        components: [
          {
            internalType: "address",
            name: "home",
            type: "address"
          },
          {
            internalType: "address",
            name: "other",
            type: "address"
          }
        ],
        internalType: "struct ArbGateway.OtherTokens[]",
        name: "_otherTokens",
        type: "tuple[]"
      }
    ],
    name: "initializeGateway",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_owner",
        type: "address"
      },
      {
        internalType: "contract IInbox",
        name: "_inbox",
        type: "address"
      },
      {
        internalType: "address",
        name: "_otherGateway",
        type: "address"
      },
      {
        components: [
          {
            internalType: "address",
            name: "home",
            type: "address"
          },
          {
            internalType: "address",
            name: "other",
            type: "address"
          }
        ],
        internalType: "struct ArbGateway.OtherTokens[]",
        name: "_otherTokens",
        type: "tuple[]"
      },
      {
        internalType: "bool",
        name: "_autoSettle",
        type: "bool"
      }
    ],
    name: "initializeGatewaySettle",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "nonce",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    name: "orders",
    outputs: [
      {
        internalType: "address",
        name: "token",
        type: "address"
      },
      {
        internalType: "address",
        name: "from",
        type: "address"
      },
      {
        internalType: "address",
        name: "to",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256"
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes"
      },
      {
        internalType: "bool",
        name: "settled",
        type: "bool"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "otherGateway",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address"
      }
    ],
    name: "otherTokens",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "setAutoSettle",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "homeToken",
        type: "address"
      }
    ],
    name: "setBurnToken",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "home",
        type: "address"
      },
      {
        internalType: "address",
        name: "other",
        type: "address"
      }
    ],
    name: "setOtherToken",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_nonce",
        type: "uint256"
      }
    ],
    name: "settleOrder",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address"
      }
    ],
    name: "shouldBurnToken",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address"
      }
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  }
];
const _bytecode$8 = "0x6080604052348015600f57600080fd5b506124f18061001f6000396000f3fe6080604052600436106101405760003560e01c8063ac4cb358116100b6578063df36132b1161006f578063df36132b14610351578063e3f30e7114610381578063eac96f23146103b7578063ebde1bdb146103d7578063f2fde38b146103f7578063fb0e722b1461041757600080fd5b8063ac4cb358146102a8578063affed0e0146102c8578063b190be85146102de578063b44db82e146102fe578063b50e801d14610311578063c35879801461033157600080fd5b806374378d371161010857806374378d37146101e15780638da5cb5b146101f457806390f7e1b31461022157806394ba88cb14610241578063a51c8cb914610261578063a85c38ef1461027657600080fd5b80631f6a02671461014557806348875bf5146101745780635484f0761461019657806360e312a7146101ab578063715018a6146101cc575b600080fd5b34801561015157600080fd5b5060065461015f9060ff1681565b60405190151581526020015b60405180910390f35b34801561018057600080fd5b5061019461018f366004611a4b565b610437565b005b3480156101a257600080fd5b506101946104b3565b6101be6101b9366004611aea565b61051a565b60405190815260200161016b565b3480156101d857600080fd5b5061019461083f565b6101946101ef366004611b7f565b610853565b34801561020057600080fd5b50610209610a26565b6040516001600160a01b03909116815260200161016b565b34801561022d57600080fd5b50600154610209906001600160a01b031681565b34801561024d57600080fd5b5061015f61025c366004611c1c565b610a54565b34801561026d57600080fd5b50610209606481565b34801561028257600080fd5b50610296610291366004611c39565b610c2d565b60405161016b96959493929190611ca2565b3480156102b457600080fd5b506101946102c3366004611db0565b610cfd565b3480156102d457600080fd5b506101be60045481565b3480156102ea57600080fd5b506101be6102f9366004611e3e565b610d54565b6101be61030c366004611e80565b610d7f565b34801561031d57600080fd5b5061019461032c366004611c39565b610e3a565b34801561033d57600080fd5b5061019461034c366004611c1c565b610fc2565b34801561035d57600080fd5b5061015f61036c366004611c1c565b60036020526000908152604090205460ff1681565b34801561038d57600080fd5b5061020961039c366004611c1c565b6002602052600090815260409020546001600160a01b031681565b3480156103c357600080fd5b506101946103d2366004611f3b565b61114b565b3480156103e357600080fd5b506101946103f2366004611faf565b611302565b34801561040357600080fd5b50610194610412366004611c1c565b61136a565b34801561042357600080fd5b50600054610209906001600160a01b031681565b3330146104775760405162461bcd60e51b815260206004820152600960248201526827a7262cafa9a2a62360b91b60448201526064015b60405180910390fd5b817f07ce1e2038f0bf86b874f8aa890353ddfe00ccba5e000ad4b713e9b2ce90fa72826040516104a79190611fe8565b60405180910390a25050565b6104bb6113a8565b60065460ff166104cc5760016104cf565b60005b6006805460ff1916911515918217905560405160ff909116151581527f4caa98d8778c80a93e087168a6e45fa5369af8904ba8f828d1bbec56dfe8f35d9060200160405180910390a1565b60006105316001600160a01b0389163330896113f5565b6001600160a01b03881660009081526003602052604090205460ff16156105ad57604051630852cd8d60e31b8152600481018790526001600160a01b038916906342966c6890602401600060405180830381600087803b15801561059457600080fd5b505af11580156105a8573d6000803e3d6000fd5b505050505b6000600454905060006374378d3760e01b8a6001600160a01b031663313ce5676040518163ffffffff1660e01b8152600401602060405180830381865afa1580156105fc573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906106209190611ffb565b6001600160a01b03808d166000908152600260205260409081902054905161065a9392919091169033908e908e908e908a90602401612018565b60408051601f198184030181529190526020810180516001600160e01b03166001600160e01b03199093169290921790915260008054919250906001600160a01b031615806107515760008054906101000a90046001600160a01b03166001600160a01b031663679b6ded34600160009054906101000a90046001600160a01b031660008c33338e8e8c6040518a63ffffffff1660e01b8152600401610707989796959493929190612070565b60206040518083038185885af1158015610725573d6000803e3d6000fd5b50505050506040513d601f19601f8201168201806040525081019061074a91906120cf565b91506107c8565b6001546040516349460b4d60e11b815260649163928c169a91610782916001600160a01b03169087906004016120e8565b6020604051808303816000875af11580156107a1573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906107c591906120cf565b91505b600480549060006107d883612122565b9190505550336001600160a01b03168c6001600160a01b0316857f9df4cc1e9776bb39b63370f1f8d003320ceeebe30547208fa83a07a3e984794b858f8f8f604051610827949392919061213b565b60405180910390a450919a9950505050505050505050565b6108476113a8565b6108516000611462565b565b61085c33610a54565b8061087f575061086a610a26565b6001600160a01b0316336001600160a01b0316145b6108ba5760405162461bcd60e51b815260206004820152600c60248201526b4e4f545f415242495452554d60a01b604482015260640161046e565b6109218388886001600160a01b031663313ce5676040518163ffffffff1660e01b8152600401602060405180830381865afa1580156108fd573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906102f99190611ffb565b6040805160c0810182526001600160a01b03808a168252888116602080840191825289831684860190815260608501878152608086018a8152600060a088018190528a8152600590945296909220855181549086166001600160a01b031991821617825593516001820180549187169186169190911790559051600282018054919095169316929092179092559051600382015591519295509160048201906109ca90826121f4565b5060a091909101516005909101805460ff191691151591909117905560065460ff1615610a1d576109ff8686868686866114d3565b600081815260056020819052604090912001805460ff191660011790555b50505050505050565b7f9016d09d72d40fdae2fd8ceac6b6234c7706214fd39c1cd1e609a0528c199300546001600160a01b031690565b600080546001600160a01b0316158015610aad57600154610a91906001600160a01b03167311110000000000000000000000000000000011110190565b6001600160a01b0316836001600160a01b031614915050919050565b60008060009054906101000a90046001600160a01b03166001600160a01b031663e78cea926040518163ffffffff1660e01b8152600401602060405180830381865afa158015610b01573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610b2591906122b2565b9050806001600160a01b0316846001600160a01b0316148015610c1f57506001546040805163ab5d894360e01b815290516001600160a01b039283169284169163ab5d89439160048083019260209291908290030181865afa158015610b8f573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610bb391906122b2565b6001600160a01b03166380648b026040518163ffffffff1660e01b8152600401602060405180830381865afa158015610bf0573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610c1491906122b2565b6001600160a01b0316145b949350505050565b50919050565b600560205260009081526040902080546001820154600283015460038401546004850180546001600160a01b039586169694861695909316939192610c7190612172565b80601f0160208091040260200160405190810160405280929190818152602001828054610c9d90612172565b8015610cea5780601f10610cbf57610100808354040283529160200191610cea565b820191906000526020600020905b815481529060010190602001808311610ccd57829003601f168201915b5050506005909301549192505060ff1686565b610d098585858561114b565b6006805460ff19168215159081179091556040519081527f4caa98d8778c80a93e087168a6e45fa5369af8904ba8f828d1bbec56dfe8f35d9060200160405180910390a15050505050565b6000610d6082846122cf565b610d6b90600a6123cf565b610d7590856123de565b90505b9392505050565b600080600080610d8e856117a8565b60405163d505accf60e01b8152336004820152306024820152604481018f9052606481018a905260ff8416608482015260a4810183905260c4810182905292955090935091506001600160a01b038e169063d505accf9060e401600060405180830381600087803b158015610e0257600080fd5b505af1158015610e16573d6000803e3d6000fd5b50505050610e298d8d8d8d8d8d8d61051a565b9d9c50505050505050505050505050565b610e426113a8565b6000818152600560209081526040808320815160c08101835281546001600160a01b039081168252600183015481169482019490945260028201549093169183019190915260038101546060830152600481018054608084019190610ea690612172565b80601f0160208091040260200160405190810160405280929190818152602001828054610ed290612172565b8015610f1f5780601f10610ef457610100808354040283529160200191610f1f565b820191906000526020600020905b815481529060010190602001808311610f0257829003601f168201915b50505091835250506005919091015460ff16151560209091015260a081015190915015610f805760405162461bcd60e51b815260206004820152600f60248201526e1053149150511657d4d15515131151608a1b604482015260640161046e565b610fa281600001518260200151836040015184606001518560800151876114d3565b50600090815260056020819052604090912001805460ff19166001179055565b610fca6113a8565b6001600160a01b03811660009081526003602052604090205460ff16610ff1576001610ff4565b60005b6001600160a01b0382166000908152600360205260409020805460ff1916911515918217905560ff16156110f5576040516370a0823160e01b815230600482015281906000906001600160a01b038316906370a0823190602401602060405180830381865afa15801561106b573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061108f91906120cf565b905080156110f257604051630852cd8d60e31b8152600481018290526001600160a01b038316906342966c6890602401600060405180830381600087803b1580156110d957600080fd5b505af11580156110ed573d6000803e3d6000fd5b505050505b50505b6001600160a01b03811660008181526003602090815260409182902054915160ff909216151582527f7740f93df62e6714ab915a82ef699f7a6db1f754498e2e363890d286aba7dcab910160405180910390a250565b60006111556117f2565b805490915060ff600160401b82041615906001600160401b031660008115801561117c5750825b90506000826001600160401b031660011480156111985750303b155b9050811580156111a6575080155b156111c45760405163f92ee8a960e01b815260040160405180910390fd5b845467ffffffffffffffff1916600117855583156111ee57845460ff60401b1916600160401b1785555b600080546001600160a01b03808b166001600160a01b031992831617835560018054918b16919092161790555b865181101561125d57600087828151811061123857611238612400565b6020026020010151905061125481600001518260200151611302565b5060010161121b565b506112678961181d565b60408051606481526001600160a01b038a8116602083015289168183015290517f59967eb20e0c027d0c4fe6e11fcec2273a08036e26740962b3ef3a23f107f93c9181900360600190a183156112f757845460ff60401b19168555604051600181527fc7f505b2f371ae2175ee4913f4499e1f2633a7b5936321eed1cdaeb6115181d29060200160405180910390a15b505050505050505050565b61130a6113a8565b6001600160a01b0382811660008181526002602090815260409182902080546001600160a01b0319169486169485179055905192835290917fd7b0a59830045bcaf6233768890edf6fcda71a5654d385440db294eb92b9a7db91016104a7565b6113726113a8565b6001600160a01b03811661139c57604051631e4fbdf760e01b81526000600482015260240161046e565b6113a581611462565b50565b60006113b2610a26565b90506001600160a01b038116158015906113d557506001600160a01b0381163314155b156113a55760405163118cdaa760e01b815233600482015260240161046e565b6040516001600160a01b03848116602483015283811660448301526064820183905261145c9186918216906323b872dd906084015b604051602081830303815290604052915060e01b6020820180516001600160e01b03838183161783525050505061182e565b50505050565b7f9016d09d72d40fdae2fd8ceac6b6234c7706214fd39c1cd1e609a0528c19930080546001600160a01b031981166001600160a01b03848116918217845560405192169182907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a3505050565b6040516370a0823160e01b8152306004820152869084906001600160a01b038316906370a0823190602401602060405180830381865afa15801561151b573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061153f91906120cf565b1061155d576115586001600160a01b038216868661189f565b6115c0565b6040516340c10f1960e01b81526001600160a01b038681166004830152602482018690528216906340c10f1990604401600060405180830381600087803b1580156115a757600080fd5b505af11580156115bb573d6000803e3d6000fd5b505050505b82511561174f5760006348875bf560e01b6115dd858360046118d5565b6115e690612416565b6001600160e01b0319161490508015611699576000306001600160a01b0316856040516116139190612454565b6000604051808303816000865af19150503d8060008114611650576040519150601f19603f3d011682016040523d82523d6000602084013e611655565b606091505b50509050806116935760405162461bcd60e51b815260206004820152600a6024820152691354d1d7d1905253115160b21b604482015260640161046e565b5061174d565b6001600160a01b0386163b1561174d57600080876001600160a01b0316620c3500876040516116c89190612454565b60006040518083038160008787f1925050503d8060008114611706576040519150601f19603f3d011682016040523d82523d6000602084013e61170b565b606091505b5091509150847f840af9ca2ec8c881ca3de23cf221981cd4118acdefeb96233fbdf0e365d761558383604051611742929190612470565b60405180910390a250505b505b856001600160a01b0316876001600160a01b0316837f42365fe0dfe76a5961cdef1960c9135c4097a1b6c253d8c1d74f5d27e41cbb8e8888886040516117979392919061248b565b60405180910390a450505050505050565b600080600083516041036117d25750505060208101516040820151606083015160001a91906117eb565b604051634be6321b60e01b815260040160405180910390fd5b9193909250565b6000807ff0c57e16840df040f15088dc2f81fe391c3923bec73e23a9662efc9c229c6a005b92915050565b61182561193b565b6113a581611960565b600080602060008451602086016000885af180611851576040513d6000823e3d81fd5b50506000513d91508115611869578060011415611876565b6001600160a01b0384163b155b1561145c57604051635274afe760e01b81526001600160a01b038516600482015260240161046e565b6040516001600160a01b038381166024830152604482018390526118d091859182169063a9059cbb9060640161142a565b505050565b606083518281116118e4578092505b8381116118ef578093505b5081831015610d785750604051828203848401601f19601f830181165b828101518582015281018061190c57505050806020830101600081526020810160405250808252509392505050565b611943611968565b61085157604051631afcd79f60e31b815260040160405180910390fd5b61137261193b565b60006119726117f2565b54600160401b900460ff16919050565b634e487b7160e01b600052604160045260246000fd5b604080519081016001600160401b03811182821017156119ba576119ba611982565b60405290565b604051601f8201601f191681016001600160401b03811182821017156119e8576119e8611982565b604052919050565b6000806001600160401b03841115611a0a57611a0a611982565b50601f8301601f1916602001611a1f816119c0565b915050828152838383011115611a3457600080fd5b828260208301376000602084830101529392505050565b60008060408385031215611a5e57600080fd5b8235915060208301356001600160401b03811115611a7b57600080fd5b8301601f81018513611a8c57600080fd5b611a9b858235602084016119f0565b9150509250929050565b6001600160a01b03811681146113a557600080fd5b8035611ac581611aa5565b919050565b600082601f830112611adb57600080fd5b610d78838335602085016119f0565b600080600080600080600060e0888a031215611b0557600080fd5b8735611b1081611aa5565b96506020880135611b2081611aa5565b95506040880135945060608801356001600160401b03811115611b4257600080fd5b611b4e8a828b01611aca565b979a969950949760808101359660a0820135965060c090910135945092505050565b60ff811681146113a557600080fd5b600080600080600080600060e0888a031215611b9a57600080fd5b8735611ba581611b70565b96506020880135611bb581611aa5565b95506040880135611bc581611aa5565b94506060880135611bd581611aa5565b93506080880135925060a08801356001600160401b03811115611bf757600080fd5b611c038a828b01611aca565b979a969950949793969295929450505060c09091013590565b600060208284031215611c2e57600080fd5b8135610d7881611aa5565b600060208284031215611c4b57600080fd5b5035919050565b60005b83811015611c6d578181015183820152602001611c55565b50506000910152565b60008151808452611c8e816020860160208601611c52565b601f01601f19169290920160200192915050565b6001600160a01b0387811682528681166020830152851660408201526060810184905260c060808201819052600090611cdd90830185611c76565b905082151560a0830152979650505050505050565b600082601f830112611d0357600080fd5b81356001600160401b03811115611d1c57611d1c611982565b611d2b60208260051b016119c0565b8082825260208201915060208360061b860101925085831115611d4d57600080fd5b602085015b83811015611da65760408188031215611d6a57600080fd5b611d72611998565b8135611d7d81611aa5565b81526020820135611d8d81611aa5565b6020828101919091529084529290920191604001611d52565b5095945050505050565b600080600080600060a08688031215611dc857600080fd5b8535611dd381611aa5565b94506020860135611de381611aa5565b93506040860135611df381611aa5565b925060608601356001600160401b03811115611e0e57600080fd5b611e1a88828901611cf2565b92505060808601358015158114611e3057600080fd5b809150509295509295909350565b600080600060608486031215611e5357600080fd5b833592506020840135611e6581611b70565b91506040840135611e7581611b70565b809150509250925092565b60008060008060008060008060006101208a8c031215611e9f57600080fd5b8935611eaa81611aa5565b9850611eb860208b01611aba565b975060408a0135965060608a01356001600160401b03811115611eda57600080fd5b611ee68c828d01611aca565b96505060808a0135945060a08a0135935060c08a0135925060e08a013591506101008a01356001600160401b03811115611f1f57600080fd5b611f2b8c828d01611aca565b9150509295985092959850929598565b60008060008060808587031215611f5157600080fd5b8435611f5c81611aa5565b93506020850135611f6c81611aa5565b92506040850135611f7c81611aa5565b915060608501356001600160401b03811115611f9757600080fd5b611fa387828801611cf2565b91505092959194509250565b60008060408385031215611fc257600080fd5b8235611fcd81611aa5565b91506020830135611fdd81611aa5565b809150509250929050565b602081526000610d786020830184611c76565b60006020828403121561200d57600080fd5b8151610d7881611b70565b60ff881681526001600160a01b0387811660208301528681166040830152851660608201526080810184905260e060a0820181905260009061205c90830185611c76565b90508260c083015298975050505050505050565b6001600160a01b038981168252602082018990526040820188905286811660608301528516608082015260a0810184905260c0810183905261010060e082018190526000906120c190830184611c76565b9a9950505050505050505050565b6000602082840312156120e157600080fd5b5051919050565b6001600160a01b0383168152604060208201819052600090610d7590830184611c76565b634e487b7160e01b600052601160045260246000fd5b6000600182016121345761213461210c565b5060010190565b84815260018060a01b03841660208201528260408201526080606082015260006121686080830184611c76565b9695505050505050565b600181811c9082168061218657607f821691505b602082108103610c2757634e487b7160e01b600052602260045260246000fd5b601f8211156118d057806000526020600020601f840160051c810160208510156121cd5750805b601f840160051c820191505b818110156121ed57600081556001016121d9565b5050505050565b81516001600160401b0381111561220d5761220d611982565b6122218161221b8454612172565b846121a6565b6020601f821160018114612255576000831561223d5750848201515b600019600385901b1c1916600184901b1784556121ed565b600084815260208120601f198516915b828110156122855787850151825560209485019460019092019101612265565b50848210156122a35786840151600019600387901b60f8161c191681555b50505050600190811b01905550565b6000602082840312156122c457600080fd5b8151610d7881611aa5565b60ff82811682821603908111156118175761181761210c565b6001815b6001841115612323578085048111156123075761230761210c565b600184161561231557908102905b60019390931c9280026122ec565b935093915050565b60008261233a57506001611817565b8161234757506000611817565b816001811461235d576002811461236757612383565b6001915050611817565b60ff8411156123785761237861210c565b50506001821b611817565b5060208310610133831016604e8410600b84101617156123a6575081810a611817565b6123b360001984846122e8565b80600019048211156123c7576123c761210c565b029392505050565b6000610d7860ff84168361232b565b6000826123fb57634e487b7160e01b600052601260045260246000fd5b500490565b634e487b7160e01b600052603260045260246000fd5b805160208201516001600160e01b031981169190600482101561244d576001600160e01b0319600483900360031b81901b82161692505b5050919050565b60008251612466818460208701611c52565b9190910192915050565b8215158152604060208201526000610d756040830184611c76565b60018060a01b03841681528260208201526060604082015260006124b26060830184611c76565b9594505050505056fea26469706673582212202319d2b5d0cfffcea9cf697c1e15b5596e02941d5f2dd3f609becd517662ab7964736f6c634300081e0033";
const isSuperArgs$8 = (xs) => xs.length > 1;
class ArbGatewaySettle__factory extends ContractFactory {
  constructor(...args) {
    if (isSuperArgs$8(args)) {
      super(...args);
    } else {
      super(_abi$d, _bytecode$8, args[0]);
    }
  }
  getDeployTransaction(overrides) {
    return super.getDeployTransaction(overrides || {});
  }
  deploy(overrides) {
    return super.deploy(overrides || {});
  }
  connect(runner) {
    return super.connect(runner);
  }
  static bytecode = _bytecode$8;
  static abi = _abi$d;
  static createInterface() {
    return new Interface(_abi$d);
  }
  static connect(address, runner) {
    return new Contract(address, _abi$d, runner);
  }
}

var index$k = /*#__PURE__*/Object.freeze({
  __proto__: null,
  ArbGatewaySettle__factory: ArbGatewaySettle__factory
});

const _abi$c = [
  {
    inputs: [
      {
        internalType: "string",
        name: "_greeting",
        type: "string"
      }
    ],
    stateMutability: "nonpayable",
    type: "constructor"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "string",
        name: "greeting",
        type: "string"
      }
    ],
    name: "NewGreeting",
    type: "event"
  },
  {
    inputs: [],
    name: "greet",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_greeting",
        type: "string"
      }
    ],
    name: "setGreeting",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  }
];
const _bytecode$7 = "0x608060405234801561001057600080fd5b5060405161065c38038061065c83398101604081905261002f91610058565b600061003b82826101ad565b505061026b565b634e487b7160e01b600052604160045260246000fd5b60006020828403121561006a57600080fd5b81516001600160401b0381111561008057600080fd5b8201601f8101841361009157600080fd5b80516001600160401b038111156100aa576100aa610042565b604051601f8201601f19908116603f011681016001600160401b03811182821017156100d8576100d8610042565b6040528181528282016020018610156100f057600080fd5b60005b8281101561010f576020818501810151838301820152016100f3565b50600091810160200191909152949350505050565b600181811c9082168061013857607f821691505b60208210810361015857634e487b7160e01b600052602260045260246000fd5b50919050565b601f8211156101a857806000526020600020601f840160051c810160208510156101855750805b601f840160051c820191505b818110156101a55760008155600101610191565b50505b505050565b81516001600160401b038111156101c6576101c6610042565b6101da816101d48454610124565b8461015e565b6020601f82116001811461020e57600083156101f65750848201515b600019600385901b1c1916600184901b1784556101a5565b600084815260208120601f198516915b8281101561023e578785015182556020948501946001909201910161021e565b508482101561025c5786840151600019600387901b60f8161c191681555b50505050600190811b01905550565b6103e28061027a6000396000f3fe608060405234801561001057600080fd5b50600436106100365760003560e01c8063a41368621461003b578063cfae321714610050575b600080fd5b61004e61004936600461015d565b61006e565b005b6100586100b5565b6040516100659190610216565b60405180910390f35b600061007a82826102ed565b507f0d332ed5c7d6f1999116748c0eb99c740f276d879d025a5be6435fcf177785de816040516100aa9190610216565b60405180910390a150565b6060600080546100c490610264565b80601f01602080910402602001604051908101604052809291908181526020018280546100f090610264565b801561013d5780601f106101125761010080835404028352916020019161013d565b820191906000526020600020905b81548152906001019060200180831161012057829003601f168201915b5050505050905090565b634e487b7160e01b600052604160045260246000fd5b60006020828403121561016f57600080fd5b813567ffffffffffffffff81111561018657600080fd5b8201601f8101841361019757600080fd5b803567ffffffffffffffff8111156101b1576101b1610147565b604051601f8201601f19908116603f0116810167ffffffffffffffff811182821017156101e0576101e0610147565b6040528181528282016020018610156101f857600080fd5b81602084016020830137600091810160200191909152949350505050565b602081526000825180602084015260005b818110156102445760208186018101516040868401015201610227565b506000604082850101526040601f19601f83011684010191505092915050565b600181811c9082168061027857607f821691505b60208210810361029857634e487b7160e01b600052602260045260246000fd5b50919050565b601f8211156102e857806000526020600020601f840160051c810160208510156102c55750805b601f840160051c820191505b818110156102e557600081556001016102d1565b50505b505050565b815167ffffffffffffffff81111561030757610307610147565b61031b816103158454610264565b8461029e565b6020601f82116001811461034f57600083156103375750848201515b600019600385901b1c1916600184901b1784556102e5565b600084815260208120601f198516915b8281101561037f578785015182556020948501946001909201910161035f565b508482101561039d5786840151600019600387901b60f8161c191681555b50505050600190811b0190555056fea26469706673582212204fd9c551430330e1dc97c5ef3e2dd33232988b0c6616e7b600cbd4378ef234d064736f6c634300081e0033";
const isSuperArgs$7 = (xs) => xs.length > 1;
class Greeter__factory extends ContractFactory {
  constructor(...args) {
    if (isSuperArgs$7(args)) {
      super(...args);
    } else {
      super(_abi$c, _bytecode$7, args[0]);
    }
  }
  getDeployTransaction(_greeting, overrides) {
    return super.getDeployTransaction(_greeting, overrides || {});
  }
  deploy(_greeting, overrides) {
    return super.deploy(_greeting, overrides || {});
  }
  connect(runner) {
    return super.connect(runner);
  }
  static bytecode = _bytecode$7;
  static abi = _abi$c;
  static createInterface() {
    return new Interface(_abi$c);
  }
  static connect(address, runner) {
    return new Contract(address, _abi$c, runner);
  }
}

var index$j = /*#__PURE__*/Object.freeze({
  __proto__: null,
  Greeter__factory: Greeter__factory
});

const _abi$b = [
  {
    inputs: [
      {
        internalType: "string",
        name: "_greeting",
        type: "string"
      },
      {
        internalType: "address",
        name: "_parentTarget",
        type: "address"
      }
    ],
    stateMutability: "nonpayable",
    type: "constructor"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "withdrawalId",
        type: "uint256"
      }
    ],
    name: "ChildToParentTxCreated",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "string",
        name: "greeting",
        type: "string"
      }
    ],
    name: "NewGreeting",
    type: "event"
  },
  {
    inputs: [],
    name: "greet",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "parentTarget",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_greeting",
        type: "string"
      }
    ],
    name: "setGreeting",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_greeting",
        type: "string"
      }
    ],
    name: "setGreetingInParent",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_parentTarget",
        type: "address"
      }
    ],
    name: "updateParentTarget",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  }
];
const _bytecode$6 = "0x608060405234801561001057600080fd5b5060405161097738038061097783398101604081905261002f91610096565b81600061003c82826101fc565b5050600180546001600160a01b0319166001600160a01b0392909216919091179055506102ba565b634e487b7160e01b600052604160045260246000fd5b80516001600160a01b038116811461009157600080fd5b919050565b600080604083850312156100a957600080fd5b82516001600160401b038111156100bf57600080fd5b8301601f810185136100d057600080fd5b80516001600160401b038111156100e9576100e9610064565b604051601f8201601f19908116603f011681016001600160401b038111828210171561011757610117610064565b60405281815282820160200187101561012f57600080fd5b60005b8281101561014e57602081850181015183830182015201610132565b5060006020838301015280945050505061016a6020840161007a565b90509250929050565b600181811c9082168061018757607f821691505b6020821081036101a757634e487b7160e01b600052602260045260246000fd5b50919050565b601f8211156101f757806000526020600020601f840160051c810160208510156101d45750805b601f840160051c820191505b818110156101f457600081556001016101e0565b50505b505050565b81516001600160401b0381111561021557610215610064565b610229816102238454610173565b846101ad565b6020601f82116001811461025d57600083156102455750848201515b600019600385901b1c1916600184901b1784556101f4565b600084815260208120601f198516915b8281101561028d578785015182556020948501946001909201910161026d565b50848210156102ab5786840151600019600387901b60f8161c191681555b50505050600190811b01905550565b6106ae806102c96000396000f3fe608060405234801561001057600080fd5b50600436106100575760003560e01c806323fd78851461005c5780636d58bbd41461008c578063a4136862146100be578063cfae3217146100d1578063e16a5ff9146100e6575b600080fd5b60015461006f906001600160a01b031681565b6040516001600160a01b0390911681526020015b60405180910390f35b6100bc61009a366004610393565b600180546001600160a01b0319166001600160a01b0392909216919091179055565b005b6100bc6100cc3660046103d9565b610107565b6100d96101bb565b60405161008391906104d8565b6100f96100f43660046103d9565b61024d565b604051908152602001610083565b600154610130906001600160a01b03167311110000000000000000000000000000000011110190565b6001600160a01b0316336001600160a01b0316146101af5760405162461bcd60e51b815260206004820152603260248201527f4772656574696e67206f6e6c792075706461746561626c6520627920706172656044820152716e7420636861696e2773206164647265737360701b606482015260840160405180910390fd5b6101b88161034c565b50565b6060600080546101ca906104eb565b80601f01602080910402602001604051908101604052809291908181526020018280546101f6906104eb565b80156102435780601f1061021857610100808354040283529160200191610243565b820191906000526020600020905b81548152906001019060200180831161022657829003601f168201915b5050505050905090565b60008063a413686260e01b8360405160240161026991906104d8565b60408051601f198184030181529181526020820180516001600160e01b03166001600160e01b03199094169390931790925260015491516349460b4d60e11b815290925060009160649163928c169a916102d4916001600160a01b0391909116908690600401610525565b6020604051808303816000875af11580156102f3573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906103179190610551565b60405190915081907f70181b11a3e9262fd1d816a04c5e30d1bb0b8a453a6fe2dfd5db03a8b8fc984590600090a29392505050565b600061035882826105b9565b507f0d332ed5c7d6f1999116748c0eb99c740f276d879d025a5be6435fcf177785de8160405161038891906104d8565b60405180910390a150565b6000602082840312156103a557600080fd5b81356001600160a01b03811681146103bc57600080fd5b9392505050565b634e487b7160e01b600052604160045260246000fd5b6000602082840312156103eb57600080fd5b813567ffffffffffffffff81111561040257600080fd5b8201601f8101841361041357600080fd5b803567ffffffffffffffff81111561042d5761042d6103c3565b604051601f8201601f19908116603f0116810167ffffffffffffffff8111828210171561045c5761045c6103c3565b60405281815282820160200186101561047457600080fd5b81602084016020830137600091810160200191909152949350505050565b6000815180845260005b818110156104b85760208185018101518683018201520161049c565b506000602082860101526020601f19601f83011685010191505092915050565b6020815260006103bc6020830184610492565b600181811c908216806104ff57607f821691505b60208210810361051f57634e487b7160e01b600052602260045260246000fd5b50919050565b6001600160a01b038316815260406020820181905260009061054990830184610492565b949350505050565b60006020828403121561056357600080fd5b5051919050565b601f8211156105b457806000526020600020601f840160051c810160208510156105915750805b601f840160051c820191505b818110156105b1576000815560010161059d565b50505b505050565b815167ffffffffffffffff8111156105d3576105d36103c3565b6105e7816105e184546104eb565b8461056a565b6020601f82116001811461061b57600083156106035750848201515b600019600385901b1c1916600184901b1784556105b1565b600084815260208120601f198516915b8281101561064b578785015182556020948501946001909201910161062b565b50848210156106695786840151600019600387901b60f8161c191681555b50505050600190811b0190555056fea2646970667358221220a595f228205655b3ba3c4ac62e0c6af67802fe364f18523b5da9e56b5ab9093664736f6c634300081e0033";
const isSuperArgs$6 = (xs) => xs.length > 1;
class GreeterChild__factory extends ContractFactory {
  constructor(...args) {
    if (isSuperArgs$6(args)) {
      super(...args);
    } else {
      super(_abi$b, _bytecode$6, args[0]);
    }
  }
  getDeployTransaction(_greeting, _parentTarget, overrides) {
    return super.getDeployTransaction(
      _greeting,
      _parentTarget,
      overrides || {}
    );
  }
  deploy(_greeting, _parentTarget, overrides) {
    return super.deploy(_greeting, _parentTarget, overrides || {});
  }
  connect(runner) {
    return super.connect(runner);
  }
  static bytecode = _bytecode$6;
  static abi = _abi$b;
  static createInterface() {
    return new Interface(_abi$b);
  }
  static connect(address, runner) {
    return new Contract(address, _abi$b, runner);
  }
}

var index$i = /*#__PURE__*/Object.freeze({
  __proto__: null,
  GreeterChild__factory: GreeterChild__factory
});

const _abi$a = [
  {
    inputs: [
      {
        internalType: "string",
        name: "_greeting",
        type: "string"
      },
      {
        internalType: "address",
        name: "_childTarget",
        type: "address"
      },
      {
        internalType: "address",
        name: "_inbox",
        type: "address"
      }
    ],
    stateMutability: "nonpayable",
    type: "constructor"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "string",
        name: "greeting",
        type: "string"
      }
    ],
    name: "NewGreeting",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "ticketId",
        type: "uint256"
      }
    ],
    name: "RetryableTicketCreated",
    type: "event"
  },
  {
    inputs: [],
    name: "childTarget",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "greet",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "inbox",
    outputs: [
      {
        internalType: "contract IInbox",
        name: "",
        type: "address"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_greeting",
        type: "string"
      }
    ],
    name: "setGreeting",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_greeting",
        type: "string"
      },
      {
        internalType: "uint256",
        name: "maxSubmissionCost",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "maxGas",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "gasPriceBid",
        type: "uint256"
      }
    ],
    name: "setGreetingInChild",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "payable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_childTarget",
        type: "address"
      }
    ],
    name: "updateChildTarget",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  }
];
const _bytecode$5 = "0x608060405234801561001057600080fd5b50604051610c19380380610c1983398101604081905261002f916100a2565b82600061003c8282610218565b5050600180546001600160a01b039384166001600160a01b03199182161790915560028054929093169116179055506102d6565b634e487b7160e01b600052604160045260246000fd5b80516001600160a01b038116811461009d57600080fd5b919050565b6000806000606084860312156100b757600080fd5b83516001600160401b038111156100cd57600080fd5b8401601f810186136100de57600080fd5b80516001600160401b038111156100f7576100f7610070565b604051601f8201601f19908116603f011681016001600160401b038111828210171561012557610125610070565b60405281815282820160200188101561013d57600080fd5b60005b8281101561015c57602081850181015183830182015201610140565b5060006020838301015280955050505061017860208501610086565b915061018660408501610086565b90509250925092565b600181811c908216806101a357607f821691505b6020821081036101c357634e487b7160e01b600052602260045260246000fd5b50919050565b601f82111561021357806000526020600020601f840160051c810160208510156101f05750805b601f840160051c820191505b8181101561021057600081556001016101fc565b50505b505050565b81516001600160401b0381111561023157610231610070565b6102458161023f845461018f565b846101c9565b6020601f82116001811461027957600083156102615750848201515b600019600385901b1c1916600184901b178455610210565b600084815260208120601f198516915b828110156102a95787850151825560209485019460019092019101610289565b50848210156102c75786840151600019600387901b60f8161c191681555b50505050600190811b01905550565b610934806102e56000396000f3fe6080604052600436106100555760003560e01c80637c15beee1461005a57806382a5ea4614610080578063a4136862146100b8578063a663866a146100da578063cfae321714610117578063fb0e722b14610139575b600080fd5b61006d6100683660046105fb565b610159565b6040519081526020015b60405180910390f35b34801561008c57600080fd5b506001546100a0906001600160a01b031681565b6040516001600160a01b039091168152602001610077565b3480156100c457600080fd5b506100d86100d336600461064f565b61026b565b005b3480156100e657600080fd5b506100d86100f53660046106a4565b600180546001600160a01b0319166001600160a01b0392909216919091179055565b34801561012357600080fd5b5061012c61047d565b604051610077919061070e565b34801561014557600080fd5b506002546100a0906001600160a01b031681565b60008063a413686260e01b86604051602401610175919061070e565b60408051601f198184030181529181526020820180516001600160e01b03166001600160e01b031990941693909317909252600254600154925163679b6ded60e01b81529193506000926001600160a01b039182169263679b6ded9234926101f09291169086908c90339081908e908e908d90600401610721565b60206040518083038185885af115801561020e573d6000803e3d6000fd5b50505050506040513d601f19601f820116820180604052508101906102339190610780565b60405190915081907fde92b5b7839f4a2c640f5e3bbb66d415458dadc57a487b0c7fa562ed7c9c896f90600090a29695505050505050565b600254604080516373c6754960e11b815290516000926001600160a01b03169163e78cea929160048083019260209291908290030181865afa1580156102b5573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906102d99190610799565b9050336001600160a01b038216146103255760405162461bcd60e51b815260206004820152600a6024820152694e4f545f42524944474560b01b60448201526064015b60405180910390fd5b6000816001600160a01b031663ab5d89436040518163ffffffff1660e01b8152600401602060405180830381865afa158015610365573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906103899190610799565b90506000816001600160a01b03166380648b026040518163ffffffff1660e01b8152600401602060405180830381865afa1580156103cb573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906103ef9190610799565b6001549091506001600160a01b0380831691161461046e5760405162461bcd60e51b815260206004820152603660248201527f4772656574696e67206f6e6c792075706461746561626c65206279207468652060448201527518da1a5b190818da185a5b89dcc818dbdb9d1c9858dd60521b606482015260840161031c565b6104778461050f565b50505050565b60606000805461048c906107b6565b80601f01602080910402602001604051908101604052809291908181526020018280546104b8906107b6565b80156105055780601f106104da57610100808354040283529160200191610505565b820191906000526020600020905b8154815290600101906020018083116104e857829003601f168201915b5050505050905090565b600061051b828261083f565b507f0d332ed5c7d6f1999116748c0eb99c740f276d879d025a5be6435fcf177785de8160405161054b919061070e565b60405180910390a150565b634e487b7160e01b600052604160045260246000fd5b600082601f83011261057d57600080fd5b813567ffffffffffffffff81111561059757610597610556565b604051601f8201601f19908116603f0116810167ffffffffffffffff811182821017156105c6576105c6610556565b6040528181528382016020018510156105de57600080fd5b816020850160208301376000918101602001919091529392505050565b6000806000806080858703121561061157600080fd5b843567ffffffffffffffff81111561062857600080fd5b6106348782880161056c565b97602087013597506040870135966060013595509350505050565b60006020828403121561066157600080fd5b813567ffffffffffffffff81111561067857600080fd5b6106848482850161056c565b949350505050565b6001600160a01b03811681146106a157600080fd5b50565b6000602082840312156106b657600080fd5b81356106c18161068c565b9392505050565b6000815180845260005b818110156106ee576020818501810151868301820152016106d2565b506000602082860101526020601f19601f83011685010191505092915050565b6020815260006106c160208301846106c8565b6001600160a01b038981168252602082018990526040820188905286811660608301528516608082015260a0810184905260c0810183905261010060e08201819052600090610772908301846106c8565b9a9950505050505050505050565b60006020828403121561079257600080fd5b5051919050565b6000602082840312156107ab57600080fd5b81516106c18161068c565b600181811c908216806107ca57607f821691505b6020821081036107ea57634e487b7160e01b600052602260045260246000fd5b50919050565b601f82111561083a57806000526020600020601f840160051c810160208510156108175750805b601f840160051c820191505b818110156108375760008155600101610823565b50505b505050565b815167ffffffffffffffff81111561085957610859610556565b61086d8161086784546107b6565b846107f0565b6020601f8211600181146108a157600083156108895750848201515b600019600385901b1c1916600184901b178455610837565b600084815260208120601f198516915b828110156108d157878501518255602094850194600190920191016108b1565b50848210156108ef5786840151600019600387901b60f8161c191681555b50505050600190811b0190555056fea26469706673582212206e123d3e68ffaba3396dbed0318535c695cbd11416d5ceb6426eec2b7a5e3b8e64736f6c634300081e0033";
const isSuperArgs$5 = (xs) => xs.length > 1;
class GreeterParent__factory extends ContractFactory {
  constructor(...args) {
    if (isSuperArgs$5(args)) {
      super(...args);
    } else {
      super(_abi$a, _bytecode$5, args[0]);
    }
  }
  getDeployTransaction(_greeting, _childTarget, _inbox, overrides) {
    return super.getDeployTransaction(
      _greeting,
      _childTarget,
      _inbox,
      overrides || {}
    );
  }
  deploy(_greeting, _childTarget, _inbox, overrides) {
    return super.deploy(
      _greeting,
      _childTarget,
      _inbox,
      overrides || {}
    );
  }
  connect(runner) {
    return super.connect(runner);
  }
  static bytecode = _bytecode$5;
  static abi = _abi$a;
  static createInterface() {
    return new Interface(_abi$a);
  }
  static connect(address, runner) {
    return new Contract(address, _abi$a, runner);
  }
}

var index$h = /*#__PURE__*/Object.freeze({
  __proto__: null,
  GreeterParent__factory: GreeterParent__factory
});

var index$g = /*#__PURE__*/Object.freeze({
  __proto__: null,
  arbGatewaySettleSol: index$k,
  arbGatewaySol: index$l,
  greeterChildSol: index$i,
  greeterParentSol: index$h,
  greeterSol: index$j
});

const _abi$9 = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address"
      },
      {
        indexed: true,
        internalType: "address",
        name: "spender",
        type: "address"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256"
      }
    ],
    name: "Approval",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address"
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256"
      }
    ],
    name: "Transfer",
    type: "event"
  },
  {
    inputs: [],
    name: "DOMAIN_SEPARATOR",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address"
      },
      {
        internalType: "address",
        name: "spender",
        type: "address"
      }
    ],
    name: "allowance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256"
      }
    ],
    name: "approve",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool"
      }
    ],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address"
      }
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address"
      }
    ],
    name: "nonces",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address"
      },
      {
        internalType: "address",
        name: "spender",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "deadline",
        type: "uint256"
      },
      {
        internalType: "uint8",
        name: "v",
        type: "uint8"
      },
      {
        internalType: "bytes32",
        name: "r",
        type: "bytes32"
      },
      {
        internalType: "bytes32",
        name: "s",
        type: "bytes32"
      }
    ],
    name: "permit",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256"
      }
    ],
    name: "transfer",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool"
      }
    ],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address"
      },
      {
        internalType: "address",
        name: "to",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256"
      }
    ],
    name: "transferFrom",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool"
      }
    ],
    stateMutability: "nonpayable",
    type: "function"
  }
];
class IERC20Exp__factory {
  static abi = _abi$9;
  static createInterface() {
    return new Interface(_abi$9);
  }
  static connect(address, runner) {
    return new Contract(address, _abi$9, runner);
  }
}

const _abi$8 = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address"
      },
      {
        indexed: true,
        internalType: "address",
        name: "spender",
        type: "address"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256"
      }
    ],
    name: "Approval",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address"
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256"
      }
    ],
    name: "Transfer",
    type: "event"
  },
  {
    inputs: [],
    name: "DOMAIN_SEPARATOR",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address"
      },
      {
        internalType: "address",
        name: "spender",
        type: "address"
      }
    ],
    name: "allowance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256"
      }
    ],
    name: "approve",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool"
      }
    ],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address"
      }
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "value",
        type: "uint256"
      }
    ],
    name: "burn",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256"
      }
    ],
    name: "burnFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256"
      }
    ],
    name: "mint",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address"
      }
    ],
    name: "nonces",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address"
      },
      {
        internalType: "address",
        name: "spender",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "deadline",
        type: "uint256"
      },
      {
        internalType: "uint8",
        name: "v",
        type: "uint8"
      },
      {
        internalType: "bytes32",
        name: "r",
        type: "bytes32"
      },
      {
        internalType: "bytes32",
        name: "s",
        type: "bytes32"
      }
    ],
    name: "permit",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256"
      }
    ],
    name: "transfer",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool"
      }
    ],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address"
      },
      {
        internalType: "address",
        name: "to",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256"
      }
    ],
    name: "transferFrom",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool"
      }
    ],
    stateMutability: "nonpayable",
    type: "function"
  }
];
class IERC20Mintable__factory {
  static abi = _abi$8;
  static createInterface() {
    return new Interface(_abi$8);
  }
  static connect(address, runner) {
    return new Contract(address, _abi$8, runner);
  }
}

var index$f = /*#__PURE__*/Object.freeze({
  __proto__: null,
  IERC20Exp__factory: IERC20Exp__factory,
  IERC20Mintable__factory: IERC20Mintable__factory
});

const _abi$7 = [
  {
    inputs: [
      {
        internalType: "uint8",
        name: "tokenDecimals",
        type: "uint8"
      },
      {
        internalType: "address",
        name: "token",
        type: "address"
      },
      {
        internalType: "address",
        name: "from",
        type: "address"
      },
      {
        internalType: "address",
        name: "to",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256"
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes"
      },
      {
        internalType: "uint256",
        name: "nonce",
        type: "uint256"
      }
    ],
    name: "bridgeFrom",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "payable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "nonce",
        type: "uint256"
      },
      {
        internalType: "string",
        name: "msg",
        type: "string"
      }
    ],
    name: "bridgeMsg",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "token",
        type: "address"
      },
      {
        internalType: "address",
        name: "to",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256"
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes"
      },
      {
        internalType: "uint256",
        name: "maxSubmissionCost",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "maxGas",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "gasPriceBid",
        type: "uint256"
      }
    ],
    name: "bridgeTo",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "payable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "token",
        type: "address"
      },
      {
        internalType: "address",
        name: "to",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256"
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes"
      },
      {
        internalType: "uint256",
        name: "maxSubmissionCost",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "maxGas",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "gasPriceBid",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "deadline",
        type: "uint256"
      },
      {
        internalType: "bytes",
        name: "signature",
        type: "bytes"
      }
    ],
    name: "bridgeToPermit",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "payable",
    type: "function"
  }
];
class IGateway__factory {
  static abi = _abi$7;
  static createInterface() {
    return new Interface(_abi$7);
  }
  static connect(address, runner) {
    return new Contract(address, _abi$7, runner);
  }
}

var index$e = /*#__PURE__*/Object.freeze({
  __proto__: null,
  IGateway__factory: IGateway__factory
});

const _abi$6 = [
  {
    inputs: [],
    name: "admin",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newAdmin",
        type: "address"
      }
    ],
    name: "changeAdmin",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "implementation",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_description",
        type: "string"
      },
      {
        internalType: "address",
        name: "newAdmin",
        type: "address"
      },
      {
        internalType: "address",
        name: "newImplementation",
        type: "address"
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes"
      }
    ],
    name: "initializeProxy",
    outputs: [],
    stateMutability: "payable",
    type: "function"
  },
  {
    inputs: [],
    name: "proxyDescription",
    outputs: [
      {
        internalType: "bytes",
        name: "",
        type: "bytes"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newImplementation",
        type: "address"
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes"
      }
    ],
    name: "upgradeToAndCall",
    outputs: [],
    stateMutability: "payable",
    type: "function"
  }
];
class IInitializableProxy__factory {
  static abi = _abi$6;
  static createInterface() {
    return new Interface(_abi$6);
  }
  static connect(address, runner) {
    return new Contract(
      address,
      _abi$6,
      runner
    );
  }
}

var index$d = /*#__PURE__*/Object.freeze({
  __proto__: null,
  IInitializableProxy__factory: IInitializableProxy__factory
});

var index$c = /*#__PURE__*/Object.freeze({
  __proto__: null,
  iGatewaySol: index$e,
  iInitializableProxySol: index$d,
  ierc20Sol: index$f
});

const _abi$5 = [
  {
    inputs: [],
    name: "InvalidInitialization",
    type: "error"
  },
  {
    inputs: [],
    name: "NotInitializing",
    type: "error"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address"
      }
    ],
    name: "OwnableInvalidOwner",
    type: "error"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address"
      }
    ],
    name: "OwnableUnauthorizedAccount",
    type: "error"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint64",
        name: "version",
        type: "uint64"
      }
    ],
    name: "Initialized",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address"
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address"
      }
    ],
    name: "OwnershipTransferred",
    type: "event"
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address"
      }
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  }
];
class Ownable__factory {
  static abi = _abi$5;
  static createInterface() {
    return new Interface(_abi$5);
  }
  static connect(address, runner) {
    return new Contract(address, _abi$5, runner);
  }
}

var index$b = /*#__PURE__*/Object.freeze({
  __proto__: null,
  Ownable__factory: Ownable__factory
});

const _abi$4 = [
  {
    inputs: [],
    name: "InvalidSignatureLength",
    type: "error"
  }
];
const _bytecode$4 = "0x60566037600b82828239805160001a607314602a57634e487b7160e01b600052600060045260246000fd5b30600052607381538281f3fe73000000000000000000000000000000000000000030146080604052600080fdfea264697066735822122023c2694e5c8edbf463c9890cbb0a5478a7ddc07e3df00be79a29d6c4fdaf97b064736f6c634300081e0033";
const isSuperArgs$4 = (xs) => xs.length > 1;
class SigLib__factory extends ContractFactory {
  constructor(...args) {
    if (isSuperArgs$4(args)) {
      super(...args);
    } else {
      super(_abi$4, _bytecode$4, args[0]);
    }
  }
  getDeployTransaction(overrides) {
    return super.getDeployTransaction(overrides || {});
  }
  deploy(overrides) {
    return super.deploy(overrides || {});
  }
  connect(runner) {
    return super.connect(runner);
  }
  static bytecode = _bytecode$4;
  static abi = _abi$4;
  static createInterface() {
    return new Interface(_abi$4);
  }
  static connect(address, runner) {
    return new Contract(address, _abi$4, runner);
  }
}

var index$a = /*#__PURE__*/Object.freeze({
  __proto__: null,
  SigLib__factory: SigLib__factory
});

const _abi$3 = [
  {
    inputs: [],
    name: "InvalidInitialization",
    type: "error"
  },
  {
    inputs: [],
    name: "NotInitializing",
    type: "error"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address"
      }
    ],
    name: "OwnableInvalidOwner",
    type: "error"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address"
      }
    ],
    name: "OwnableUnauthorizedAccount",
    type: "error"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "newSettler",
        type: "address"
      }
    ],
    name: "AddSettler",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint64",
        name: "version",
        type: "uint64"
      }
    ],
    name: "Initialized",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address"
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address"
      }
    ],
    name: "OwnershipTransferred",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "oldSettler",
        type: "address"
      }
    ],
    name: "RemoveSettler",
    type: "event"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_settler",
        type: "address"
      }
    ],
    name: "addSettler",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_initOwner",
        type: "address"
      }
    ],
    name: "initializeSettler",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_settler",
        type: "address"
      }
    ],
    name: "removeSettler",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "settlers",
    outputs: [
      {
        internalType: "address[]",
        name: "",
        type: "address[]"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address"
      }
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  }
];
const _bytecode$3 = "0x6080604052348015600f57600080fd5b506108428061001f6000396000f3fe608060405234801561001057600080fd5b506004361061007c5760003560e01c8063715018a61161005b578063715018a6146100bc5780638da5cb5b146100c4578063b1da41fe14610103578063f2fde38b1461011857600080fd5b8062b105e61461008157806314d3940d14610096578063329bad17146100a9575b600080fd5b61009461008f36600461074a565b61012b565b005b6100946100a436600461074a565b6101cd565b6100946100b736600461074a565b610266565b610094610362565b7f9016d09d72d40fdae2fd8ceac6b6234c7706214fd39c1cd1e609a0528c199300546040516001600160a01b0390911681526020015b60405180910390f35b61010b610376565b6040516100fa9190610773565b61009461012636600461074a565b610387565b6101336103c5565b61013e60008261043b565b6101815760405162461bcd60e51b815260206004820152600f60248201526e24a72b20a624a22fa9a2aa2a2622a960891b60448201526064015b60405180910390fd5b61018c600082610462565b506040516001600160a01b03821681527fc75b24622d5a8552bcfe775a11d9009ac47d4c050a3af79686aebe33f902fc03906020015b60405180910390a150565b6101d56103c5565b6101e060008261043b565b156102215760405162461bcd60e51b8152602060048201526011602482015270222aa82624a1a0aa22afa9a2aa2a2622a960791b6044820152606401610178565b61022c600082610477565b506040516001600160a01b03821681527f0e8d4de8d62b8ad5b1837a4a13009121b82a40e3bdcd6e6f454a72418cc86b0e906020016101c2565b600061027061048c565b805490915060ff600160401b820416159067ffffffffffffffff166000811580156102985750825b905060008267ffffffffffffffff1660011480156102b55750303b155b9050811580156102c3575080155b156102e15760405163f92ee8a960e01b815260040160405180910390fd5b845467ffffffffffffffff19166001178555831561030b57845460ff60401b1916600160401b1785555b610314866104b5565b831561035a57845460ff60401b19168555604051600181527fc7f505b2f371ae2175ee4913f4499e1f2633a7b5936321eed1cdaeb6115181d29060200160405180910390a15b505050505050565b61036a6103c5565b61037460006104cf565b565b60606103826000610540565b905090565b61038f6103c5565b6001600160a01b0381166103b957604051631e4fbdf760e01b815260006004820152602401610178565b6103c2816104cf565b50565b60006103f87f9016d09d72d40fdae2fd8ceac6b6234c7706214fd39c1cd1e609a0528c199300546001600160a01b031690565b90506001600160a01b0381161580159061041b57506001600160a01b0381163314155b156103c25760405163118cdaa760e01b8152336004820152602401610178565b6001600160a01b038116600090815260018301602052604081205415155b90505b92915050565b6000610459836001600160a01b038416610554565b6000610459836001600160a01b038416610647565b6000807ff0c57e16840df040f15088dc2f81fe391c3923bec73e23a9662efc9c229c6a0061045c565b6001600160a01b0381166104c65750335b61022181610696565b7f9016d09d72d40fdae2fd8ceac6b6234c7706214fd39c1cd1e609a0528c19930080546001600160a01b031981166001600160a01b03848116918217845560405192169182907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a3505050565b6060600061054d836106a7565b9392505050565b6000818152600183016020526040812054801561063d5760006105786001836107bf565b855490915060009061058c906001906107bf565b90508082146105f15760008660000182815481106105ac576105ac6107e0565b90600052602060002001549050808760000184815481106105cf576105cf6107e0565b6000918252602080832090910192909255918252600188019052604090208390555b8554869080610602576106026107f6565b60019003818190600052602060002001600090559055856001016000868152602001908152602001600020600090556001935050505061045c565b600091505061045c565b600081815260018301602052604081205461068e5750815460018181018455600084815260208082209093018490558454848252828601909352604090209190915561045c565b50600061045c565b61069e610703565b6103c281610728565b6060816000018054806020026020016040519081016040528092919081815260200182805480156106f757602002820191906000526020600020905b8154815260200190600101908083116106e3575b50505050509050919050565b61070b610730565b61037457604051631afcd79f60e31b815260040160405180910390fd5b61038f610703565b600061073a61048c565b54600160401b900460ff16919050565b60006020828403121561075c57600080fd5b81356001600160a01b038116811461054d57600080fd5b602080825282518282018190526000918401906040840190835b818110156107b45783516001600160a01b031683526020938401939092019160010161078d565b509095945050505050565b8181038181111561045c57634e487b7160e01b600052601160045260246000fd5b634e487b7160e01b600052603260045260246000fd5b634e487b7160e01b600052603160045260246000fdfea26469706673582212200f78ed3435f91821fb62197d6bbfdc8af6ef3e87a7b88501f237bb71622385a164736f6c634300081e0033";
const isSuperArgs$3 = (xs) => xs.length > 1;
class WithSettler__factory extends ContractFactory {
  constructor(...args) {
    if (isSuperArgs$3(args)) {
      super(...args);
    } else {
      super(_abi$3, _bytecode$3, args[0]);
    }
  }
  getDeployTransaction(overrides) {
    return super.getDeployTransaction(overrides || {});
  }
  deploy(overrides) {
    return super.deploy(overrides || {});
  }
  connect(runner) {
    return super.connect(runner);
  }
  static bytecode = _bytecode$3;
  static abi = _abi$3;
  static createInterface() {
    return new Interface(_abi$3);
  }
  static connect(address, runner) {
    return new Contract(address, _abi$3, runner);
  }
}

var index$9 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  WithSettler__factory: WithSettler__factory
});

var index$8 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  ownableSol: index$b,
  sigLibSol: index$a,
  withSettlerSol: index$9
});

const _abi$2 = [
  {
    inputs: [
      {
        internalType: "address",
        name: "admin",
        type: "address"
      }
    ],
    name: "ERC1967InvalidAdmin",
    type: "error"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "implementation",
        type: "address"
      }
    ],
    name: "ERC1967InvalidImplementation",
    type: "error"
  },
  {
    inputs: [],
    name: "ERC1967NonPayable",
    type: "error"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "previousAdmin",
        type: "address"
      },
      {
        indexed: false,
        internalType: "address",
        name: "newAdmin",
        type: "address"
      }
    ],
    name: "AdminChanged",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "string",
        name: "description",
        type: "string"
      }
    ],
    name: "DescriptionChanged",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "implementation",
        type: "address"
      }
    ],
    name: "Upgraded",
    type: "event"
  },
  {
    stateMutability: "payable",
    type: "fallback"
  },
  {
    inputs: [],
    name: "admin",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newAdmin",
        type: "address"
      }
    ],
    name: "changeAdmin",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_description",
        type: "string"
      }
    ],
    name: "changeDescription",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "implementation",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_description",
        type: "string"
      },
      {
        internalType: "address",
        name: "newAdmin",
        type: "address"
      },
      {
        internalType: "address",
        name: "newImplementation",
        type: "address"
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes"
      }
    ],
    name: "initializeProxy",
    outputs: [],
    stateMutability: "payable",
    type: "function"
  },
  {
    inputs: [],
    name: "proxyDescription",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newImplementation",
        type: "address"
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes"
      }
    ],
    name: "upgradeToAndCall",
    outputs: [],
    stateMutability: "payable",
    type: "function"
  },
  {
    stateMutability: "payable",
    type: "receive"
  }
];
const _bytecode$2 = "0x6080604052348015600f57600080fd5b50610aac8061001f6000396000f3fe6080604052600436106100745760003560e01c8063aba001731161004e578063aba00173146100f0578063e612041314610103578063ee0530f414610123578063f851a4401461014557610083565b80634f1ef2861461008b5780635c60da1b1461009e5780638f283970146100d057610083565b366100835761008161015a565b005b61008161015a565b610081610099366004610762565b61016c565b3480156100aa57600080fd5b506100b36101bb565b6040516001600160a01b0390911681526020015b60405180910390f35b3480156100dc57600080fd5b506100816100eb3660046107b0565b6101ca565b6100816100fe3660046107d2565b61020e565b34801561010f57600080fd5b5061008161011e36600461085c565b6102a2565b34801561012f57600080fd5b506101386102e3565b6040516100c791906108bd565b34801561015157600080fd5b506100b3610394565b61016a61016561039e565b6103a8565b565b6101746103d1565b6001600160a01b0316336001600160a01b0316146101ad5760405162461bcd60e51b81526004016101a4906108f0565b60405180910390fd5b6101b782826103db565b5050565b60006101c561039e565b905090565b6101d26103d1565b6001600160a01b0316336001600160a01b0316146102025760405162461bcd60e51b81526004016101a4906108f0565b61020b81610494565b50565b600061021861039e565b6001600160a01b031614801561023e575060006102336103d1565b6001600160a01b0316145b6102805760405162461bcd60e51b81526020600482015260136024820152721053149150511657d253925512505312569151606a1b60448201526064016101a4565b61028983610494565b61029382826103db565b61029c846104e8565b50505050565b6102aa6103d1565b6001600160a01b0316336001600160a01b0316146102da5760405162461bcd60e51b81526004016101a4906108f0565b61020b816104e8565b60607ffcba12fcf625f4823c7c0c86b97ab29721afc9e784836bc00bf04553a0c8dff4805461031190610913565b80601f016020809104026020016040519081016040528092919081815260200182805461033d90610913565b801561038a5780601f1061035f5761010080835404028352916020019161038a565b820191906000526020600020905b81548152906001019060200180831161036d57829003601f168201915b5050505050905090565b60006101c56103d1565b60006101c5610555565b3660008037600080366000845af43d6000803e8080156103c7573d6000f35b3d6000fd5b505050565b60006101c5610588565b6103e4826105b0565b6040516001600160a01b038316907fbc7cd75a20ee27fd9adebab32041f755214dbc6bffa90cc0225b39da2e5c2d3b90600090a280511561048c57600080836001600160a01b03168360405161043a919061094d565b600060405180830381855af49150503d8060008114610475576040519150601f19603f3d011682016040523d82523d6000602084013e61047a565b606091505b50915091508161029c57805181602001fd5b6101b761062a565b7f7e644d79422f17c01e4894b5f4f588d331ebfa28653d42ae832dc59e38c9798f6104bd610588565b604080516001600160a01b03928316815291841660208301520160405180910390a161020b81610649565b80511561020b577ffcba12fcf625f4823c7c0c86b97ab29721afc9e784836bc00bf04553a0c8dff461051a82826109b7565b507f8a1bce929b257bfd582fa164d9b9fa4d4b0b7442b10b3aad23e2c56aa4e0d61a8160405161054a91906108bd565b60405180910390a150565b60007f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc5b546001600160a01b0316919050565b60007fb53127684a568b3173ae13b9f8a6016e243e63b6e8ee1178d6a717850b5d6103610579565b806001600160a01b03163b6000036105e657604051634c9c8ce360e01b81526001600160a01b03821660048201526024016101a4565b807f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc5b80546001600160a01b0319166001600160a01b039290921691909117905550565b341561016a5760405163b398979f60e01b815260040160405180910390fd5b6001600160a01b03811661067357604051633173bdd160e11b8152600060048201526024016101a4565b807fb53127684a568b3173ae13b9f8a6016e243e63b6e8ee1178d6a717850b5d6103610609565b80356001600160a01b03811681146106b157600080fd5b919050565b634e487b7160e01b600052604160045260246000fd5b600082601f8301126106dd57600080fd5b81356020830160008067ffffffffffffffff8411156106fe576106fe6106b6565b50604051601f19601f85018116603f0116810181811067ffffffffffffffff8211171561072d5761072d6106b6565b60405283815290508082840187101561074557600080fd5b838360208301376000602085830101528094505050505092915050565b6000806040838503121561077557600080fd5b61077e8361069a565b9150602083013567ffffffffffffffff81111561079a57600080fd5b6107a6858286016106cc565b9150509250929050565b6000602082840312156107c257600080fd5b6107cb8261069a565b9392505050565b600080600080608085870312156107e857600080fd5b843567ffffffffffffffff8111156107ff57600080fd5b61080b878288016106cc565b94505061081a6020860161069a565b92506108286040860161069a565b9150606085013567ffffffffffffffff81111561084457600080fd5b610850878288016106cc565b91505092959194509250565b60006020828403121561086e57600080fd5b813567ffffffffffffffff81111561088557600080fd5b610891848285016106cc565b949350505050565b60005b838110156108b457818101518382015260200161089c565b50506000910152565b60208152600082518060208401526108dc816040850160208701610899565b601f01601f19169190910160400192915050565b6020808252600990820152682727aa2fa0a226a4a760b91b604082015260600190565b600181811c9082168061092757607f821691505b60208210810361094757634e487b7160e01b600052602260045260246000fd5b50919050565b6000825161095f818460208701610899565b9190910192915050565b601f8211156103cc57806000526020600020601f840160051c810160208510156109905750805b601f840160051c820191505b818110156109b0576000815560010161099c565b5050505050565b815167ffffffffffffffff8111156109d1576109d16106b6565b6109e5816109df8454610913565b84610969565b6020601f821160018114610a195760008315610a015750848201515b600019600385901b1c1916600184901b1784556109b0565b600084815260208120601f198516915b82811015610a495787850151825560209485019460019092019101610a29565b5084821015610a675786840151600019600387901b60f8161c191681555b50505050600190811b0190555056fea2646970667358221220248be40a63d65cf62c84670e7a6c41e2f1489219290c7f8ebe9df7c423cd5a8f64736f6c634300081e0033";
const isSuperArgs$2 = (xs) => xs.length > 1;
class InitializableProxy__factory extends ContractFactory {
  constructor(...args) {
    if (isSuperArgs$2(args)) {
      super(...args);
    } else {
      super(_abi$2, _bytecode$2, args[0]);
    }
  }
  getDeployTransaction(overrides) {
    return super.getDeployTransaction(overrides || {});
  }
  deploy(overrides) {
    return super.deploy(overrides || {});
  }
  connect(runner) {
    return super.connect(runner);
  }
  static bytecode = _bytecode$2;
  static abi = _abi$2;
  static createInterface() {
    return new Interface(_abi$2);
  }
  static connect(address, runner) {
    return new Contract(address, _abi$2, runner);
  }
}

var index$7 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  InitializableProxy__factory: InitializableProxy__factory
});

var index$6 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  initializableProxySol: index$7
});

const _abi$1 = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor"
  },
  {
    inputs: [],
    name: "ECDSAInvalidSignature",
    type: "error"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "length",
        type: "uint256"
      }
    ],
    name: "ECDSAInvalidSignatureLength",
    type: "error"
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "s",
        type: "bytes32"
      }
    ],
    name: "ECDSAInvalidSignatureS",
    type: "error"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "allowance",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "needed",
        type: "uint256"
      }
    ],
    name: "ERC20InsufficientAllowance",
    type: "error"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "sender",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "balance",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "needed",
        type: "uint256"
      }
    ],
    name: "ERC20InsufficientBalance",
    type: "error"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "approver",
        type: "address"
      }
    ],
    name: "ERC20InvalidApprover",
    type: "error"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "receiver",
        type: "address"
      }
    ],
    name: "ERC20InvalidReceiver",
    type: "error"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "sender",
        type: "address"
      }
    ],
    name: "ERC20InvalidSender",
    type: "error"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address"
      }
    ],
    name: "ERC20InvalidSpender",
    type: "error"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "deadline",
        type: "uint256"
      }
    ],
    name: "ERC2612ExpiredSignature",
    type: "error"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "signer",
        type: "address"
      },
      {
        internalType: "address",
        name: "owner",
        type: "address"
      }
    ],
    name: "ERC2612InvalidSigner",
    type: "error"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "currentNonce",
        type: "uint256"
      }
    ],
    name: "InvalidAccountNonce",
    type: "error"
  },
  {
    inputs: [],
    name: "InvalidShortString",
    type: "error"
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "str",
        type: "string"
      }
    ],
    name: "StringTooLong",
    type: "error"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address"
      },
      {
        indexed: true,
        internalType: "address",
        name: "spender",
        type: "address"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256"
      }
    ],
    name: "Approval",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [],
    name: "EIP712DomainChanged",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address"
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256"
      }
    ],
    name: "Transfer",
    type: "event"
  },
  {
    inputs: [],
    name: "DOMAIN_SEPARATOR",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address"
      },
      {
        internalType: "address",
        name: "spender",
        type: "address"
      }
    ],
    name: "allowance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256"
      }
    ],
    name: "approve",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool"
      }
    ],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address"
      }
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "value",
        type: "uint256"
      }
    ],
    name: "burn",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256"
      }
    ],
    name: "burnFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "eip712Domain",
    outputs: [
      {
        internalType: "bytes1",
        name: "fields",
        type: "bytes1"
      },
      {
        internalType: "string",
        name: "name",
        type: "string"
      },
      {
        internalType: "string",
        name: "version",
        type: "string"
      },
      {
        internalType: "uint256",
        name: "chainId",
        type: "uint256"
      },
      {
        internalType: "address",
        name: "verifyingContract",
        type: "address"
      },
      {
        internalType: "bytes32",
        name: "salt",
        type: "bytes32"
      },
      {
        internalType: "uint256[]",
        name: "extensions",
        type: "uint256[]"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "maxSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address"
      }
    ],
    name: "nonces",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address"
      },
      {
        internalType: "address",
        name: "spender",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "deadline",
        type: "uint256"
      },
      {
        internalType: "uint8",
        name: "v",
        type: "uint8"
      },
      {
        internalType: "bytes32",
        name: "r",
        type: "bytes32"
      },
      {
        internalType: "bytes32",
        name: "s",
        type: "bytes32"
      }
    ],
    name: "permit",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256"
      }
    ],
    name: "transfer",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool"
      }
    ],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address"
      },
      {
        internalType: "address",
        name: "to",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256"
      }
    ],
    name: "transferFrom",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool"
      }
    ],
    stateMutability: "nonpayable",
    type: "function"
  }
];
const _bytecode$1 = "0x61018060405234801561001157600080fd5b506040518060400160405280600781526020016641726f77616e6160c81b81525080604051806040016040528060018152602001603160f81b8152506040518060400160405280600781526020016641726f77616e6160c81b8152506040518060400160405280600381526020016241525760e81b815250816003908161009891906103f7565b5060046100a582826103f7565b506100b59150839050600561017e565b610120526100c481600661017e565b61014052815160208084019190912060e052815190820120610100524660a05261015160e05161010051604080517f8b73c3c69bb8fe3d512ecc4cf759cc79239f7b179b0ffacaa9a75d522b39400f60208201529081019290925260608201524660808201523060a082015260009060c00160405160208183030381529060405280519060200120905090565b60805250503060c052506b019d971e4fe8401e740000006101608190526101799033906101b1565b610548565b600060208351101561019a57610193836101f0565b90506101ab565b816101a584826103f7565b5060ff90505b92915050565b6001600160a01b0382166101e05760405163ec442f0560e01b8152600060048201526024015b60405180910390fd5b6101ec6000838361022e565b5050565b600080829050601f8151111561021b578260405163305a27a960e01b81526004016101d791906104b5565b805161022682610503565b179392505050565b6001600160a01b03831661025957806002600082825461024e9190610527565b909155506102cb9050565b6001600160a01b038316600090815260208190526040902054818110156102ac5760405163391434e360e21b81526001600160a01b038516600482015260248101829052604481018390526064016101d7565b6001600160a01b03841660009081526020819052604090209082900390555b6001600160a01b0382166102e757600280548290039055610306565b6001600160a01b03821660009081526020819052604090208054820190555b816001600160a01b0316836001600160a01b03167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef8360405161034b91815260200190565b60405180910390a3505050565b634e487b7160e01b600052604160045260246000fd5b600181811c9082168061038257607f821691505b6020821081036103a257634e487b7160e01b600052602260045260246000fd5b50919050565b601f8211156103f257806000526020600020601f840160051c810160208510156103cf5750805b601f840160051c820191505b818110156103ef57600081556001016103db565b50505b505050565b81516001600160401b0381111561041057610410610358565b6104248161041e845461036e565b846103a8565b6020601f82116001811461045857600083156104405750848201515b600019600385901b1c1916600184901b1784556103ef565b600084815260208120601f198516915b828110156104885787850151825560209485019460019092019101610468565b50848210156104a65786840151600019600387901b60f8161c191681555b50505050600190811b01905550565b602081526000825180602084015260005b818110156104e357602081860181015160408684010152016104c6565b506000604082850101526040601f19601f83011684010191505092915050565b805160208083015191908110156103a25760001960209190910360031b1b16919050565b808201808211156101ab57634e487b7160e01b600052601160045260246000fd5b60805160a05160c05160e05161010051610120516101405161016051610fef6105ad6000396000610234015260006107d9015260006107ac0152600061071e015260006106f6015260006106510152600061067b015260006106a50152610fef6000f3fe608060405234801561001057600080fd5b50600436106101005760003560e01c806379cc679011610097578063a9059cbb11610066578063a9059cbb14610209578063d505accf1461021c578063d5abeb011461022f578063dd62ed3e1461025657600080fd5b806379cc6790146101c05780637ecebe00146101d357806384b0196e146101e657806395d89b411461020157600080fd5b8063313ce567116100d3578063313ce5671461016b5780633644e5151461017a57806342966c681461018257806370a082311461019757600080fd5b806306fdde0314610105578063095ea7b31461012357806318160ddd1461014657806323b872dd14610158575b600080fd5b61010d61028f565b60405161011a9190610d39565b60405180910390f35b610136610131366004610d6f565b610321565b604051901515815260200161011a565b6002545b60405190815260200161011a565b610136610166366004610d99565b61033b565b6040516012815260200161011a565b61014a61035f565b610195610190366004610dd6565b61036e565b005b61014a6101a5366004610def565b6001600160a01b031660009081526020819052604090205490565b6101956101ce366004610d6f565b61037b565b61014a6101e1366004610def565b610394565b6101ee6103b2565b60405161011a9796959493929190610e0a565b61010d6103f8565b610136610217366004610d6f565b610407565b61019561022a366004610ea2565b610415565b61014a7f000000000000000000000000000000000000000000000000000000000000000081565b61014a610264366004610f15565b6001600160a01b03918216600090815260016020908152604080832093909416825291909152205490565b60606003805461029e90610f48565b80601f01602080910402602001604051908101604052809291908181526020018280546102ca90610f48565b80156103175780601f106102ec57610100808354040283529160200191610317565b820191906000526020600020905b8154815290600101906020018083116102fa57829003601f168201915b5050505050905090565b60003361032f818585610554565b60019150505b92915050565b600033610349858285610566565b6103548585856105e5565b506001949350505050565b6000610369610644565b905090565b610378338261076f565b50565b610386823383610566565b610390828261076f565b5050565b6001600160a01b038116600090815260076020526040812054610335565b6000606080600080600060606103c66107a5565b6103ce6107d2565b60408051600080825260208201909252600f60f81b9b939a50919850469750309650945092509050565b60606004805461029e90610f48565b60003361032f8185856105e5565b8342111561043e5760405163313c898160e11b8152600481018590526024015b60405180910390fd5b60007f6e71edae12b1b97f4d1f60370fef10105fa2faae0126114a169c64845d6126c988888861048b8c6001600160a01b0316600090815260076020526040902080546001810190915590565b6040805160208101969096526001600160a01b0394851690860152929091166060840152608083015260a082015260c0810186905260e00160405160208183030381529060405280519060200120905060006104e6826107ff565b905060006104f68287878761082c565b9050896001600160a01b0316816001600160a01b03161461053d576040516325c0072360e11b81526001600160a01b0380831660048301528b166024820152604401610435565b6105488a8a8a610554565b50505050505050505050565b610561838383600161085a565b505050565b6001600160a01b038381166000908152600160209081526040808320938616835292905220546000198110156105df57818110156105d057604051637dc7a0d960e11b81526001600160a01b03841660048201526024810182905260448101839052606401610435565b6105df8484848403600061085a565b50505050565b6001600160a01b03831661060f57604051634b637e8f60e11b815260006004820152602401610435565b6001600160a01b0382166106395760405163ec442f0560e01b815260006004820152602401610435565b61056183838361092f565b6000306001600160a01b037f00000000000000000000000000000000000000000000000000000000000000001614801561069d57507f000000000000000000000000000000000000000000000000000000000000000046145b156106c757507f000000000000000000000000000000000000000000000000000000000000000090565b610369604080517f8b73c3c69bb8fe3d512ecc4cf759cc79239f7b179b0ffacaa9a75d522b39400f60208201527f0000000000000000000000000000000000000000000000000000000000000000918101919091527f000000000000000000000000000000000000000000000000000000000000000060608201524660808201523060a082015260009060c00160405160208183030381529060405280519060200120905090565b6001600160a01b03821661079957604051634b637e8f60e11b815260006004820152602401610435565b6103908260008361092f565b60606103697f00000000000000000000000000000000000000000000000000000000000000006005610a59565b60606103697f00000000000000000000000000000000000000000000000000000000000000006006610a59565b600061033561080c610644565b8360405161190160f01b8152600281019290925260228201526042902090565b60008060008061083e88888888610b04565b92509250925061084e8282610bd3565b50909695505050505050565b6001600160a01b0384166108845760405163e602df0560e01b815260006004820152602401610435565b6001600160a01b0383166108ae57604051634a1406b160e11b815260006004820152602401610435565b6001600160a01b03808516600090815260016020908152604080832093871683529290522082905580156105df57826001600160a01b0316846001600160a01b03167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b9258460405161092191815260200190565b60405180910390a350505050565b6001600160a01b03831661095a57806002600082825461094f9190610f82565b909155506109cc9050565b6001600160a01b038316600090815260208190526040902054818110156109ad5760405163391434e360e21b81526001600160a01b03851660048201526024810182905260448101839052606401610435565b6001600160a01b03841660009081526020819052604090209082900390555b6001600160a01b0382166109e857600280548290039055610a07565b6001600160a01b03821660009081526020819052604090208054820190555b816001600160a01b0316836001600160a01b03167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef83604051610a4c91815260200190565b60405180910390a3505050565b606060ff8314610a7357610a6c83610c8c565b9050610335565b818054610a7f90610f48565b80601f0160208091040260200160405190810160405280929190818152602001828054610aab90610f48565b8015610af85780601f10610acd57610100808354040283529160200191610af8565b820191906000526020600020905b815481529060010190602001808311610adb57829003601f168201915b50505050509050610335565b600080807f7fffffffffffffffffffffffffffffff5d576e7357a4501ddfe92f46681b20a0841115610b3f5750600091506003905082610bc9565b604080516000808252602082018084528a905260ff891692820192909252606081018790526080810186905260019060a0016020604051602081039080840390855afa158015610b93573d6000803e3d6000fd5b5050604051601f1901519150506001600160a01b038116610bbf57506000925060019150829050610bc9565b9250600091508190505b9450945094915050565b6000826003811115610be757610be7610fa3565b03610bf0575050565b6001826003811115610c0457610c04610fa3565b03610c225760405163f645eedf60e01b815260040160405180910390fd5b6002826003811115610c3657610c36610fa3565b03610c575760405163fce698f760e01b815260048101829052602401610435565b6003826003811115610c6b57610c6b610fa3565b03610390576040516335e2f38360e21b815260048101829052602401610435565b60606000610c9983610ccb565b604080516020808252818301909252919250600091906020820181803683375050509182525060208101929092525090565b600060ff8216601f81111561033557604051632cd44ac360e21b815260040160405180910390fd5b6000815180845260005b81811015610d1957602081850181015186830182015201610cfd565b506000602082860101526020601f19601f83011685010191505092915050565b602081526000610d4c6020830184610cf3565b9392505050565b80356001600160a01b0381168114610d6a57600080fd5b919050565b60008060408385031215610d8257600080fd5b610d8b83610d53565b946020939093013593505050565b600080600060608486031215610dae57600080fd5b610db784610d53565b9250610dc560208501610d53565b929592945050506040919091013590565b600060208284031215610de857600080fd5b5035919050565b600060208284031215610e0157600080fd5b610d4c82610d53565b60ff60f81b8816815260e060208201526000610e2960e0830189610cf3565b8281036040840152610e3b8189610cf3565b606084018890526001600160a01b038716608085015260a0840186905283810360c08501528451808252602080870193509091019060005b81811015610e91578351835260209384019390920191600101610e73565b50909b9a5050505050505050505050565b600080600080600080600060e0888a031215610ebd57600080fd5b610ec688610d53565b9650610ed460208901610d53565b95506040880135945060608801359350608088013560ff81168114610ef857600080fd5b9699959850939692959460a0840135945060c09093013592915050565b60008060408385031215610f2857600080fd5b610f3183610d53565b9150610f3f60208401610d53565b90509250929050565b600181811c90821680610f5c57607f821691505b602082108103610f7c57634e487b7160e01b600052602260045260246000fd5b50919050565b8082018082111561033557634e487b7160e01b600052601160045260246000fd5b634e487b7160e01b600052602160045260246000fdfea2646970667358221220b222bc60bc80476c2bbaf3471923005e9bffd31905a3e9aff7b22df1e1658d2264736f6c634300081e0033";
const isSuperArgs$1 = (xs) => xs.length > 1;
class Arowana__factory extends ContractFactory {
  constructor(...args) {
    if (isSuperArgs$1(args)) {
      super(...args);
    } else {
      super(_abi$1, _bytecode$1, args[0]);
    }
  }
  getDeployTransaction(overrides) {
    return super.getDeployTransaction(overrides || {});
  }
  deploy(overrides) {
    return super.deploy(overrides || {});
  }
  connect(runner) {
    return super.connect(runner);
  }
  static bytecode = _bytecode$1;
  static abi = _abi$1;
  static createInterface() {
    return new Interface(_abi$1);
  }
  static connect(address, runner) {
    return new Contract(address, _abi$1, runner);
  }
}

var index$5 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  Arowana__factory: Arowana__factory
});

const _abi = [
  {
    inputs: [
      {
        internalType: "string",
        name: "name_",
        type: "string"
      },
      {
        internalType: "string",
        name: "symbol_",
        type: "string"
      },
      {
        internalType: "uint8",
        name: "decimals_",
        type: "uint8"
      },
      {
        internalType: "uint256",
        name: "supply_",
        type: "uint256"
      }
    ],
    stateMutability: "nonpayable",
    type: "constructor"
  },
  {
    inputs: [],
    name: "ECDSAInvalidSignature",
    type: "error"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "length",
        type: "uint256"
      }
    ],
    name: "ECDSAInvalidSignatureLength",
    type: "error"
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "s",
        type: "bytes32"
      }
    ],
    name: "ECDSAInvalidSignatureS",
    type: "error"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "allowance",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "needed",
        type: "uint256"
      }
    ],
    name: "ERC20InsufficientAllowance",
    type: "error"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "sender",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "balance",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "needed",
        type: "uint256"
      }
    ],
    name: "ERC20InsufficientBalance",
    type: "error"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "approver",
        type: "address"
      }
    ],
    name: "ERC20InvalidApprover",
    type: "error"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "receiver",
        type: "address"
      }
    ],
    name: "ERC20InvalidReceiver",
    type: "error"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "sender",
        type: "address"
      }
    ],
    name: "ERC20InvalidSender",
    type: "error"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address"
      }
    ],
    name: "ERC20InvalidSpender",
    type: "error"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "deadline",
        type: "uint256"
      }
    ],
    name: "ERC2612ExpiredSignature",
    type: "error"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "signer",
        type: "address"
      },
      {
        internalType: "address",
        name: "owner",
        type: "address"
      }
    ],
    name: "ERC2612InvalidSigner",
    type: "error"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "currentNonce",
        type: "uint256"
      }
    ],
    name: "InvalidAccountNonce",
    type: "error"
  },
  {
    inputs: [],
    name: "InvalidShortString",
    type: "error"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address"
      }
    ],
    name: "OwnableInvalidOwner",
    type: "error"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address"
      }
    ],
    name: "OwnableUnauthorizedAccount",
    type: "error"
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "str",
        type: "string"
      }
    ],
    name: "StringTooLong",
    type: "error"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address"
      },
      {
        indexed: true,
        internalType: "address",
        name: "spender",
        type: "address"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256"
      }
    ],
    name: "Approval",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [],
    name: "EIP712DomainChanged",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address"
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address"
      }
    ],
    name: "OwnershipTransferred",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address"
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256"
      }
    ],
    name: "Transfer",
    type: "event"
  },
  {
    inputs: [],
    name: "DOMAIN_SEPARATOR",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address"
      },
      {
        internalType: "address",
        name: "spender",
        type: "address"
      }
    ],
    name: "allowance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256"
      }
    ],
    name: "approve",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool"
      }
    ],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address"
      }
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "value",
        type: "uint256"
      }
    ],
    name: "burn",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256"
      }
    ],
    name: "burnFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "eip712Domain",
    outputs: [
      {
        internalType: "bytes1",
        name: "fields",
        type: "bytes1"
      },
      {
        internalType: "string",
        name: "name",
        type: "string"
      },
      {
        internalType: "string",
        name: "version",
        type: "string"
      },
      {
        internalType: "uint256",
        name: "chainId",
        type: "uint256"
      },
      {
        internalType: "address",
        name: "verifyingContract",
        type: "address"
      },
      {
        internalType: "bytes32",
        name: "salt",
        type: "bytes32"
      },
      {
        internalType: "uint256[]",
        name: "extensions",
        type: "uint256[]"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256"
      }
    ],
    name: "mint",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256"
      }
    ],
    name: "mint",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address"
      }
    ],
    name: "nonces",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address"
      },
      {
        internalType: "address",
        name: "spender",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "deadline",
        type: "uint256"
      },
      {
        internalType: "uint8",
        name: "v",
        type: "uint8"
      },
      {
        internalType: "bytes32",
        name: "r",
        type: "bytes32"
      },
      {
        internalType: "bytes32",
        name: "s",
        type: "bytes32"
      }
    ],
    name: "permit",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256"
      }
    ],
    name: "transfer",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool"
      }
    ],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address"
      },
      {
        internalType: "address",
        name: "to",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256"
      }
    ],
    name: "transferFrom",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool"
      }
    ],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address"
      }
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  }
];
const _bytecode = "0x61018060405234801561001157600080fd5b506040516118a63803806118a68339810160408190526100309161045f565b338480604051806040016040528060018152602001603160f81b8152508787816003908161005e9190610571565b50600461006b8282610571565b5061007b91508390506005610175565b6101205261008a816006610175565b61014052815160208084019190912060e052815190820120610100524660a05261011760e05161010051604080517f8b73c3c69bb8fe3d512ecc4cf759cc79239f7b179b0ffacaa9a75d522b39400f60208201529081019290925260608201524660808201523060a082015260009060c00160405160208183030381529060405280519060200120905090565b60805250503060c052506001600160a01b03811661015057604051631e4fbdf760e01b8152600060048201526024015b60405180910390fd5b610159816101a8565b5060ff82166101605261016c33826101fa565b505050506106a7565b60006020835110156101915761018a83610234565b90506101a2565b8161019c8482610571565b5060ff90505b92915050565b600880546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b6001600160a01b0382166102245760405163ec442f0560e01b815260006004820152602401610147565b61023060008383610272565b5050565b600080829050601f8151111561025f578260405163305a27a960e01b8152600401610147919061062f565b805161026a82610662565b179392505050565b6001600160a01b03831661029d5780600260008282546102929190610686565b9091555061030f9050565b6001600160a01b038316600090815260208190526040902054818110156102f05760405163391434e360e21b81526001600160a01b03851660048201526024810182905260448101839052606401610147565b6001600160a01b03841660009081526020819052604090209082900390555b6001600160a01b03821661032b5760028054829003905561034a565b6001600160a01b03821660009081526020819052604090208054820190555b816001600160a01b0316836001600160a01b03167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef8360405161038f91815260200190565b60405180910390a3505050565b634e487b7160e01b600052604160045260246000fd5b60005b838110156103cd5781810151838201526020016103b5565b50506000910152565b600082601f8301126103e757600080fd5b81516001600160401b038111156104005761040061039c565b604051601f8201601f19908116603f011681016001600160401b038111828210171561042e5761042e61039c565b60405281815283820160200185101561044657600080fd5b6104578260208301602087016103b2565b949350505050565b6000806000806080858703121561047557600080fd5b84516001600160401b0381111561048b57600080fd5b610497878288016103d6565b602087015190955090506001600160401b038111156104b557600080fd5b6104c1878288016103d6565b935050604085015160ff811681146104d857600080fd5b6060959095015193969295505050565b600181811c908216806104fc57607f821691505b60208210810361051c57634e487b7160e01b600052602260045260246000fd5b50919050565b601f82111561056c57806000526020600020601f840160051c810160208510156105495750805b601f840160051c820191505b818110156105695760008155600101610555565b50505b505050565b81516001600160401b0381111561058a5761058a61039c565b61059e8161059884546104e8565b84610522565b6020601f8211600181146105d257600083156105ba5750848201515b600019600385901b1c1916600184901b178455610569565b600084815260208120601f198516915b8281101561060257878501518255602094850194600190920191016105e2565b50848210156106205786840151600019600387901b60f8161c191681555b50505050600190811b01905550565b602081526000825180602084015261064e8160408501602087016103b2565b601f01601f19169190910160400192915050565b8051602080830151919081101561051c5760001960209190910360031b1b16919050565b808201808211156101a257634e487b7160e01b600052601160045260246000fd5b60805160a05160c05160e0516101005161012051610140516101605161119a61070c600039600061019e015260006109840152600061095701526000610814015260006107ec01526000610747015260006107710152600061079b015261119a6000f3fe608060405234801561001057600080fd5b506004361061012c5760003560e01c806379cc6790116100ad578063a0712d6811610071578063a0712d681461028d578063a9059cbb146102a0578063d505accf146102b3578063dd62ed3e146102c6578063f2fde38b146102ff57600080fd5b806379cc6790146102295780637ecebe001461023c57806384b0196e1461024f5780638da5cb5b1461026a57806395d89b411461028557600080fd5b80633644e515116100f45780633644e515146101c857806340c10f19146101d057806342966c68146101e557806370a08231146101f8578063715018a61461022157600080fd5b806306fdde0314610131578063095ea7b31461014f57806318160ddd1461017257806323b872dd14610184578063313ce56714610197575b600080fd5b610139610312565b6040516101469190610ee4565b60405180910390f35b61016261015d366004610f1a565b6103a4565b6040519015158152602001610146565b6002545b604051908152602001610146565b610162610192366004610f44565b6103be565b60405160ff7f0000000000000000000000000000000000000000000000000000000000000000168152602001610146565b6101766103e2565b6101e36101de366004610f1a565b6103f1565b005b6101e36101f3366004610f81565b610407565b610176610206366004610f9a565b6001600160a01b031660009081526020819052604090205490565b6101e3610414565b6101e3610237366004610f1a565b610428565b61017661024a366004610f9a565b61043d565b61025761045b565b6040516101469796959493929190610fb5565b6008546040516001600160a01b039091168152602001610146565b6101396104a1565b6101e361029b366004610f81565b6104b0565b6101626102ae366004610f1a565b6104c2565b6101e36102c136600461104d565b6104d0565b6101766102d43660046110c0565b6001600160a01b03918216600090815260016020908152604080832093909416825291909152205490565b6101e361030d366004610f9a565b61060f565b606060038054610321906110f3565b80601f016020809104026020016040519081016040528092919081815260200182805461034d906110f3565b801561039a5780601f1061036f5761010080835404028352916020019161039a565b820191906000526020600020905b81548152906001019060200180831161037d57829003601f168201915b5050505050905090565b6000336103b281858561064a565b60019150505b92915050565b6000336103cc85828561065c565b6103d78585856106db565b506001949350505050565b60006103ec61073a565b905090565b6103f9610865565b6104038282610892565b5050565b61041133826108c8565b50565b61041c610865565b61042660006108fe565b565b61043382338361065c565b61040382826108c8565b6001600160a01b0381166000908152600760205260408120546103b8565b60006060806000806000606061046f610950565b61047761097d565b60408051600080825260208201909252600f60f81b9b939a50919850469750309650945092509050565b606060048054610321906110f3565b6104b8610865565b6104113382610892565b6000336103b28185856106db565b834211156104f95760405163313c898160e11b8152600481018590526024015b60405180910390fd5b60007f6e71edae12b1b97f4d1f60370fef10105fa2faae0126114a169c64845d6126c98888886105468c6001600160a01b0316600090815260076020526040902080546001810190915590565b6040805160208101969096526001600160a01b0394851690860152929091166060840152608083015260a082015260c0810186905260e00160405160208183030381529060405280519060200120905060006105a1826109aa565b905060006105b1828787876109d7565b9050896001600160a01b0316816001600160a01b0316146105f8576040516325c0072360e11b81526001600160a01b0380831660048301528b1660248201526044016104f0565b6106038a8a8a61064a565b50505050505050505050565b610617610865565b6001600160a01b03811661064157604051631e4fbdf760e01b8152600060048201526024016104f0565b610411816108fe565b6106578383836001610a05565b505050565b6001600160a01b038381166000908152600160209081526040808320938616835292905220546000198110156106d557818110156106c657604051637dc7a0d960e11b81526001600160a01b038416600482015260248101829052604481018390526064016104f0565b6106d584848484036000610a05565b50505050565b6001600160a01b03831661070557604051634b637e8f60e11b8152600060048201526024016104f0565b6001600160a01b03821661072f5760405163ec442f0560e01b8152600060048201526024016104f0565b610657838383610ada565b6000306001600160a01b037f00000000000000000000000000000000000000000000000000000000000000001614801561079357507f000000000000000000000000000000000000000000000000000000000000000046145b156107bd57507f000000000000000000000000000000000000000000000000000000000000000090565b6103ec604080517f8b73c3c69bb8fe3d512ecc4cf759cc79239f7b179b0ffacaa9a75d522b39400f60208201527f0000000000000000000000000000000000000000000000000000000000000000918101919091527f000000000000000000000000000000000000000000000000000000000000000060608201524660808201523060a082015260009060c00160405160208183030381529060405280519060200120905090565b6008546001600160a01b031633146104265760405163118cdaa760e01b81523360048201526024016104f0565b6001600160a01b0382166108bc5760405163ec442f0560e01b8152600060048201526024016104f0565b61040360008383610ada565b6001600160a01b0382166108f257604051634b637e8f60e11b8152600060048201526024016104f0565b61040382600083610ada565b600880546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b60606103ec7f00000000000000000000000000000000000000000000000000000000000000006005610c04565b60606103ec7f00000000000000000000000000000000000000000000000000000000000000006006610c04565b60006103b86109b761073a565b8360405161190160f01b8152600281019290925260228201526042902090565b6000806000806109e988888888610caf565b9250925092506109f98282610d7e565b50909695505050505050565b6001600160a01b038416610a2f5760405163e602df0560e01b8152600060048201526024016104f0565b6001600160a01b038316610a5957604051634a1406b160e11b8152600060048201526024016104f0565b6001600160a01b03808516600090815260016020908152604080832093871683529290522082905580156106d557826001600160a01b0316846001600160a01b03167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92584604051610acc91815260200190565b60405180910390a350505050565b6001600160a01b038316610b05578060026000828254610afa919061112d565b90915550610b779050565b6001600160a01b03831660009081526020819052604090205481811015610b585760405163391434e360e21b81526001600160a01b038516600482015260248101829052604481018390526064016104f0565b6001600160a01b03841660009081526020819052604090209082900390555b6001600160a01b038216610b9357600280548290039055610bb2565b6001600160a01b03821660009081526020819052604090208054820190555b816001600160a01b0316836001600160a01b03167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef83604051610bf791815260200190565b60405180910390a3505050565b606060ff8314610c1e57610c1783610e37565b90506103b8565b818054610c2a906110f3565b80601f0160208091040260200160405190810160405280929190818152602001828054610c56906110f3565b8015610ca35780601f10610c7857610100808354040283529160200191610ca3565b820191906000526020600020905b815481529060010190602001808311610c8657829003601f168201915b505050505090506103b8565b600080807f7fffffffffffffffffffffffffffffff5d576e7357a4501ddfe92f46681b20a0841115610cea5750600091506003905082610d74565b604080516000808252602082018084528a905260ff891692820192909252606081018790526080810186905260019060a0016020604051602081039080840390855afa158015610d3e573d6000803e3d6000fd5b5050604051601f1901519150506001600160a01b038116610d6a57506000925060019150829050610d74565b9250600091508190505b9450945094915050565b6000826003811115610d9257610d9261114e565b03610d9b575050565b6001826003811115610daf57610daf61114e565b03610dcd5760405163f645eedf60e01b815260040160405180910390fd5b6002826003811115610de157610de161114e565b03610e025760405163fce698f760e01b8152600481018290526024016104f0565b6003826003811115610e1657610e1661114e565b03610403576040516335e2f38360e21b8152600481018290526024016104f0565b60606000610e4483610e76565b604080516020808252818301909252919250600091906020820181803683375050509182525060208101929092525090565b600060ff8216601f8111156103b857604051632cd44ac360e21b815260040160405180910390fd5b6000815180845260005b81811015610ec457602081850181015186830182015201610ea8565b506000602082860101526020601f19601f83011685010191505092915050565b602081526000610ef76020830184610e9e565b9392505050565b80356001600160a01b0381168114610f1557600080fd5b919050565b60008060408385031215610f2d57600080fd5b610f3683610efe565b946020939093013593505050565b600080600060608486031215610f5957600080fd5b610f6284610efe565b9250610f7060208501610efe565b929592945050506040919091013590565b600060208284031215610f9357600080fd5b5035919050565b600060208284031215610fac57600080fd5b610ef782610efe565b60ff60f81b8816815260e060208201526000610fd460e0830189610e9e565b8281036040840152610fe68189610e9e565b606084018890526001600160a01b038716608085015260a0840186905283810360c08501528451808252602080870193509091019060005b8181101561103c57835183526020938401939092019160010161101e565b50909b9a5050505050505050505050565b600080600080600080600060e0888a03121561106857600080fd5b61107188610efe565b965061107f60208901610efe565b95506040880135945060608801359350608088013560ff811681146110a357600080fd5b9699959850939692959460a0840135945060c09093013592915050565b600080604083850312156110d357600080fd5b6110dc83610efe565b91506110ea60208401610efe565b90509250929050565b600181811c9082168061110757607f821691505b60208210810361112757634e487b7160e01b600052602260045260246000fd5b50919050565b808201808211156103b857634e487b7160e01b600052601160045260246000fd5b634e487b7160e01b600052602160045260246000fdfea264697066735822122078add9d6798a5a3e41fdaf38a266d27ce93f256d8046c8d4281c1882137b31bd64736f6c634300081e0033";
const isSuperArgs = (xs) => xs.length > 1;
class ERC20Mock__factory extends ContractFactory {
  constructor(...args) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }
  getDeployTransaction(name_, symbol_, decimals_, supply_, overrides) {
    return super.getDeployTransaction(
      name_,
      symbol_,
      decimals_,
      supply_,
      overrides || {}
    );
  }
  deploy(name_, symbol_, decimals_, supply_, overrides) {
    return super.deploy(
      name_,
      symbol_,
      decimals_,
      supply_,
      overrides || {}
    );
  }
  connect(runner) {
    return super.connect(runner);
  }
  static bytecode = _bytecode;
  static abi = _abi;
  static createInterface() {
    return new Interface(_abi);
  }
  static connect(address, runner) {
    return new Contract(address, _abi, runner);
  }
}

var index$4 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  ERC20Mock__factory: ERC20Mock__factory
});

var index$3 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  arowanaSol: index$5,
  erc20MockSol: index$4
});

var index$2 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  arbitrum: index$g,
  arwSupplySol: index$n,
  interfaces: index$c,
  libraries: index$8,
  lockSol: index$m,
  proxy: index$6,
  tokens: index$3
});

var index$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  arbitrum: index$17,
  contracts: index$2,
  openzeppelin: index$o
});

var index = /*#__PURE__*/Object.freeze({
  __proto__: null,
  ARWSupply__factory: ARWSupply__factory,
  AbsOutbox__factory: AbsOutbox__factory,
  Address__factory: Address__factory,
  ArbGatewaySettle__factory: ArbGatewaySettle__factory,
  ArbGateway__factory: ArbGateway__factory,
  ArbSys__factory: ArbSys__factory,
  Arowana__factory: Arowana__factory,
  ContextUpgradeable__factory: ContextUpgradeable__factory,
  ECDSA__factory: ECDSA__factory,
  EIP712__factory: EIP712__factory,
  ERC1967Utils__factory: ERC1967Utils__factory,
  ERC20Burnable__factory: ERC20Burnable__factory,
  ERC20Mock__factory: ERC20Mock__factory,
  ERC20Permit__factory: ERC20Permit__factory,
  ERC20__factory: ERC20__factory,
  Errors__factory: Errors__factory,
  GreeterChild__factory: GreeterChild__factory,
  GreeterParent__factory: GreeterParent__factory,
  Greeter__factory: Greeter__factory,
  IBeacon__factory: IBeacon__factory,
  IBridge__factory: IBridge__factory,
  IDelayedMessageProvider__factory: IDelayedMessageProvider__factory,
  IERC1155Errors__factory: IERC1155Errors__factory,
  IERC1363__factory: IERC1363__factory,
  IERC165__factory: IERC165__factory,
  IERC1967__factory: IERC1967__factory,
  IERC20Errors__factory: IERC20Errors__factory,
  IERC20Exp__factory: IERC20Exp__factory,
  IERC20Metadata__factory: IERC20Metadata__factory,
  IERC20Mintable__factory: IERC20Mintable__factory,
  IERC20Permit__factory: IERC20Permit__factory,
  IERC20__factory: IERC20__factory,
  IERC5267__factory: IERC5267__factory,
  IERC721Errors__factory: IERC721Errors__factory,
  IFeeTokenPricer__factory: IFeeTokenPricer__factory,
  IGasRefunder__factory: IGasRefunder__factory,
  IGateway__factory: IGateway__factory,
  IInboxBase__factory: IInboxBase__factory,
  IInbox__factory: IInbox__factory,
  IInitializableProxy__factory: IInitializableProxy__factory,
  IOutbox__factory: IOutbox__factory,
  IOwnable__factory: IOwnable__factory,
  ISequencerInbox__factory: ISequencerInbox__factory,
  InitializableProxy__factory: InitializableProxy__factory,
  Initializable__factory: Initializable__factory,
  Lock__factory: Lock__factory,
  NodeInterface__factory: NodeInterface__factory,
  Nonces__factory: Nonces__factory,
  Outbox__factory: Outbox__factory,
  OwnableUpgradeable__factory: OwnableUpgradeable__factory,
  Ownable__factory: Ownable__factory,
  Proxy__factory: Proxy__factory,
  SafeCast__factory: SafeCast__factory,
  SafeERC20__factory: SafeERC20__factory,
  ShortStrings__factory: ShortStrings__factory,
  SigLib__factory: SigLib__factory,
  Strings__factory: Strings__factory,
  WithSettler__factory: WithSettler__factory,
  factories: index$1
});

function bnToHex(bn) {
  if (!bn) {
    return "0x";
  }
  let hexString = BigInt(bn).toString(16);
  if (hexString.length % 2 !== 0) {
    hexString = "0" + hexString;
  }
  return "0x" + hexString;
}
function addressFromBigInt(bn) {
  return getAddress(toFixedHex(bn, 20));
}

const arbNetworks = {
  42161: {
    chainId: 42161,
    name: "Arbitrum One",
    parentChainId: 1,
    ethBridge: {
      bridge: "0x8315177aB297bA92A06054cE80a67Ed4DBd7ed3a",
      inbox: "0x4Dbd4fc535Ac27206064B68FfCf827b0A60BAB3f",
      sequencerInbox: "0x1c479675ad559DC151F6Ec7ed3FbF8ceE79582B6",
      outbox: "0x0B9857ae2D4A3DBe74ffE1d7DF045bb7F96E4840",
      rollup: "0x4DCeB440657f21083db8aDd07665f8ddBe1DCfc0"
    },
    gasLimitMultiplier: 1.5,
    gasPriceBidMultiplier: 10,
    baseFeeMultiplier: 25,
    submissionFeeMultiplier: 3
  },
  421614: {
    chainId: 421614,
    name: "Arbitrum Rollup Sepolia Testnet",
    parentChainId: 11155111,
    ethBridge: {
      bridge: "0x38f918D0E9F1b721EDaA41302E399fa1B79333a9",
      inbox: "0xaAe29B0366299461418F5324a79Afc425BE5ae21",
      sequencerInbox: "0x6c97864CE4bEf387dE0b3310A44230f7E3F1be0D",
      outbox: "0x65f07C7D521164a4d5DaC6eB8Fac8DA067A3B78F",
      rollup: "0xd80810638dbDF9081b72C1B33c65375e807281C8"
    },
    gasLimitMultiplier: 1.5,
    gasPriceBidMultiplier: 10,
    baseFeeMultiplier: 25,
    submissionFeeMultiplier: 3
  }
};
const NODE_INTERFACE_ADDRESS = "0x00000000000000000000000000000000000000C8";
const ARB_RETRYABLE_TX = "0x000000000000000000000000000000000000006E";
async function getArbNetwork(arbHelper) {
  const { parentProvider, childProvider } = arbHelper;
  const [parentChainId, childChainId] = await Promise.all([
    parentProvider.getNetwork().then((n) => Number(n.chainId)),
    childProvider.getNetwork().then((n) => Number(n.chainId))
  ]);
  if (arbNetworks[childChainId]?.parentChainId === parentChainId) {
    return arbNetworks[childChainId];
  }
  throw new Error("Arbitrum network config not found for given parent / child provider");
}
function submitRetryableMessageDataParser(eventData) {
  const parsed = AbiCoder.defaultAbiCoder().decode(
    [
      "uint256",
      // dest
      "uint256",
      // l2 call balue
      "uint256",
      // msg val
      "uint256",
      // max submission
      "uint256",
      // excess fee refund addr
      "uint256",
      // call value refund addr
      "uint256",
      // max gas
      "uint256",
      // gas price bid
      "uint256"
      // data length
    ],
    eventData
  );
  const destAddress = addressFromBigInt(parsed[0]);
  const l2CallValue = parsed[1];
  const l1Value = parsed[2];
  const maxSubmissionFee = parsed[3];
  const excessFeeRefundAddress = addressFromBigInt(parsed[4]);
  const callValueRefundAddress = addressFromBigInt(parsed[5]);
  const gasLimit = parsed[6];
  const maxFeePerGas = parsed[7];
  const callDataLength = parsed[8];
  const data = "0x" + eventData.substring(eventData.length - Number(callDataLength) * 2).toLowerCase();
  return {
    destAddress,
    l2CallValue,
    l1Value,
    maxSubmissionFee,
    excessFeeRefundAddress,
    callValueRefundAddress,
    gasLimit,
    maxFeePerGas,
    data
  };
}
function getRetryableCreationId({
  chainId,
  sender,
  messageNumber,
  parentBaseFee,
  messageData
}) {
  return keccak256(
    concat([
      "0x69",
      encodeRlp([
        bnToHex(chainId),
        toFixedHex(messageNumber, 32),
        sender,
        bnToHex(parentBaseFee),
        bnToHex(messageData.l1Value),
        bnToHex(messageData.maxFeePerGas),
        bnToHex(messageData.gasLimit),
        messageData.destAddress === ZeroAddress ? "0x" : messageData.destAddress,
        bnToHex(messageData.l2CallValue),
        messageData.callValueRefundAddress,
        bnToHex(messageData.maxSubmissionFee),
        messageData.excessFeeRefundAddress,
        messageData.data
      ])
    ])
  );
}
class ArbHelper {
  // L1 provider
  parentProvider;
  // L2 provider
  childProvider;
  arbNetworkConfig;
  constructor({ parentProvider, childProvider }) {
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
    data
  }) {
    const {
      ethBridge: { inbox: inboxAddress },
      gasLimitMultiplier,
      gasPriceBidMultiplier,
      baseFeeMultiplier,
      submissionFeeMultiplier
    } = await this.arbNetworkConfig;
    const inbox = IInbox__factory.connect(inboxAddress, this.parentProvider);
    const nodeInterface = NodeInterface__factory.connect(NODE_INTERFACE_ADDRESS, this.childProvider);
    const [parentBaseFee, childBaseFee] = await Promise.all([
      this.parentProvider.getBlock("latest").then((b) => b?.baseFeePerGas),
      this.childProvider.getFeeData().then((f) => f.maxFeePerGas)
    ]);
    const callDataSize = dataLength(data || "0x");
    const gasPriceBid = childBaseFee * BigInt(gasPriceBidMultiplier);
    const maxFeePerGas = childBaseFee * BigInt(baseFeeMultiplier);
    const [maxSubmissionCost, gasLimit] = await Promise.all([
      inbox.calculateRetryableSubmissionFee(callDataSize, parentBaseFee).then((f) => f * BigInt(submissionFeeMultiplier)),
      nodeInterface.estimateRetryableTicket.estimateGas(
        from,
        parseEther("1") + l2CallValue,
        to || from,
        l2CallValue,
        excessFeeRefundAddress || from,
        callValueRefundAddress || from,
        data || "0x"
      ).then((g) => Math.floor(Number(g) * gasLimitMultiplier))
    ]);
    const deposit = BigInt(gasLimit) * maxFeePerGas + maxSubmissionCost + l2CallValue;
    return {
      gasLimit,
      gasPriceBid,
      maxSubmissionCost,
      maxFeePerGas,
      deposit
    };
  }
  /**
   * Parse Cross-chain transaction info from parent chain transaction receipts
   * (Does not validate on child chain due to complexity and possible failures with eth_getLogs)
   * (It is recommended to have dedicated transfer nonce because parsing arbitrum bridge txs sucks)
   * (This function may break on ArbOs upgrade, use it with caution!)
   */
  async parseParentToChildMessage(txReceipt) {
    const {
      chainId,
      ethBridge: { bridge: bridgeAddress, inbox: inboxAddress }
    } = await this.arbNetworkConfig;
    const bridge = IBridge__factory.connect(bridgeAddress, this.parentProvider);
    const inbox = IInbox__factory.connect(inboxAddress, this.parentProvider);
    const bridgeLogs = (txReceipt?.logs || []).map((log) => {
      if (log.address !== bridgeAddress) {
        return;
      }
      const parsedLog = bridge.interface.parseLog(log);
      if (parsedLog?.name !== "MessageDelivered") {
        return;
      }
      const { messageIndex, sender, baseFeeL1 } = parsedLog.args;
      return {
        messageIndex,
        sender,
        baseFeeL1
      };
    }).filter((l) => l);
    const messages = (txReceipt?.logs || []).map((log) => {
      if (log.address !== inboxAddress) {
        return;
      }
      const parsedLog = inbox.interface.parseLog(log);
      if (parsedLog?.name !== "InboxMessageDelivered") {
        return;
      }
      const { data, messageNum } = parsedLog.args;
      const bridgeLog = bridgeLogs.find((l) => l.messageIndex === messageNum);
      if (!bridgeLog) {
        return;
      }
      const messageData = submitRetryableMessageDataParser(data);
      const messageObj = {
        chainId,
        creationId: "",
        sender: bridgeLog.sender,
        messageNumber: messageNum,
        parentBaseFee: bridgeLog.baseFeeL1,
        messageData
      };
      messageObj.creationId = getRetryableCreationId(messageObj);
      return messageObj;
    }).filter((l) => l);
    return messages;
  }
}

async function getTokenInfo(token, user) {
  const Token = token;
  const userAddress = user?.address || user;
  const [name, symbol, decimals, totalSupply, balance] = await Promise.all([
    Token.name(),
    Token.symbol(),
    Token.decimals(),
    Token.totalSupply(),
    userAddress ? Token.balanceOf(userAddress) : 0n
  ]);
  const _decimals = Number(decimals);
  return {
    name,
    symbol,
    decimals: _decimals,
    totalSupply: Number(formatUnits(totalSupply, _decimals)),
    balance: Number(formatUnits(balance, _decimals))
  };
}
async function getArwBalance(L1Token, L2Token, user) {
  const l1Token = L1Token;
  const l2Token = L2Token;
  const userAddress = user?.address || user;
  const [l1Decimals, l1Supply, l1Balance, l2Decimals, l2Supply, l2Balance] = await Promise.all([
    l1Token.decimals(),
    l1Token.totalSupply(),
    userAddress ? l1Token.balanceOf(userAddress) : 0n,
    l2Token.decimals(),
    l2Token.totalSupply(),
    userAddress ? l2Token.balanceOf(userAddress) : 0n
  ]);
  return {
    l1Supply: Number(formatUnits(l1Supply, l1Decimals)),
    l1Balance: Number(formatUnits(l1Balance, l1Decimals)),
    l2Supply: Number(formatUnits(l2Supply, l2Decimals)),
    l2Balance: Number(formatUnits(l2Balance, l2Decimals))
  };
}
async function getParentToChildMessageGasParams({
  arbHelper,
  L1Token,
  L2Token,
  L1Gateway,
  L2Gateway,
  from,
  to,
  value,
  data,
  msg
}) {
  const [nonce, l1Decimals] = await Promise.all([
    L1Gateway.nonce().then((n) => Number(n)),
    L1Token.decimals().then((d) => Number(d))
  ]);
  const _from = getAddress(from);
  const _to = getAddress(to || from);
  const _value = parseUnits(String(value), l1Decimals);
  const _msg = !msg ? void 0 : L2Gateway.interface.encodeFunctionData("bridgeMsg", [nonce, msg]);
  const _data = data || _msg || "0x";
  const msgData = L2Gateway.interface.encodeFunctionData("bridgeFrom", [
    l1Decimals,
    L2Token.target,
    _from,
    _to,
    _value,
    _data,
    nonce
  ]);
  const params = await arbHelper.estimateParentToChildFees({
    from: L1Gateway.target,
    to: L2Gateway.target,
    l2CallValue: 0n,
    excessFeeRefundAddress: _to,
    callValueRefundAddress: _to,
    data: msgData
  });
  return {
    from: _from,
    to: _to,
    value: _value,
    data: _data,
    msgData,
    params
  };
}
async function bridgeArwArb({
  arbHelper,
  L1Token,
  L2Token,
  L1Gateway,
  L2Gateway,
  from,
  to,
  value,
  data,
  msg
}) {
  const {
    to: _to,
    value: _value,
    data: _data,
    params
  } = await getParentToChildMessageGasParams({
    arbHelper,
    L1Token,
    L2Token,
    L1Gateway,
    L2Gateway,
    from,
    to,
    value,
    data,
    msg
  });
  return L1Gateway.bridgeTo.populateTransaction(
    L1Token.target,
    _to,
    _value,
    _data,
    params.maxSubmissionCost,
    params.gasLimit,
    params.gasPriceBid,
    {
      value: params.deposit,
      gasLimit: 5e5
    }
  );
}

export { ARB_RETRYABLE_TX, ArbHelper, NODE_INTERFACE_ADDRESS, addressFromBigInt, arbNetworks, bnToHex, bridgeArwArb, index as contracts, getArbNetwork, getArwBalance, getParentToChildMessageGasParams, getRetryableCreationId, getTokenInfo, submitRetryableMessageDataParser };
