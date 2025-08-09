'use strict';

var ethers = require('ethers');
var ethersOpt = require('ethers-opt');

const _abi$U = [
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
  static abi = _abi$U;
  static createInterface() {
    return new ethers.Interface(_abi$U);
  }
  static connect(address, runner) {
    return new ethers.Contract(address, _abi$U, runner);
  }
}

var index$1n = /*#__PURE__*/Object.freeze({
  __proto__: null,
  AbsOutbox__factory: AbsOutbox__factory
});

const _abi$T = [
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
  static abi = _abi$T;
  static createInterface() {
    return new ethers.Interface(_abi$T);
  }
  static connect(address, runner) {
    return new ethers.Contract(address, _abi$T, runner);
  }
}

var index$1m = /*#__PURE__*/Object.freeze({
  __proto__: null,
  IBridge__factory: IBridge__factory
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
  }
];
class IDelayedMessageProvider__factory {
  static abi = _abi$S;
  static createInterface() {
    return new ethers.Interface(_abi$S);
  }
  static connect(address, runner) {
    return new ethers.Contract(
      address,
      _abi$S,
      runner
    );
  }
}

var index$1l = /*#__PURE__*/Object.freeze({
  __proto__: null,
  IDelayedMessageProvider__factory: IDelayedMessageProvider__factory
});

const _abi$R = [
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
  static abi = _abi$R;
  static createInterface() {
    return new ethers.Interface(_abi$R);
  }
  static connect(address, runner) {
    return new ethers.Contract(address, _abi$R, runner);
  }
}

var index$1k = /*#__PURE__*/Object.freeze({
  __proto__: null,
  IInbox__factory: IInbox__factory
});

const _abi$Q = [
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
  static abi = _abi$Q;
  static createInterface() {
    return new ethers.Interface(_abi$Q);
  }
  static connect(address, runner) {
    return new ethers.Contract(address, _abi$Q, runner);
  }
}

var index$1j = /*#__PURE__*/Object.freeze({
  __proto__: null,
  IInboxBase__factory: IInboxBase__factory
});

const _abi$P = [
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
  static abi = _abi$P;
  static createInterface() {
    return new ethers.Interface(_abi$P);
  }
  static connect(address, runner) {
    return new ethers.Contract(address, _abi$P, runner);
  }
}

var index$1i = /*#__PURE__*/Object.freeze({
  __proto__: null,
  IOutbox__factory: IOutbox__factory
});

const _abi$O = [
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
  static abi = _abi$O;
  static createInterface() {
    return new ethers.Interface(_abi$O);
  }
  static connect(address, runner) {
    return new ethers.Contract(address, _abi$O, runner);
  }
}

var index$1h = /*#__PURE__*/Object.freeze({
  __proto__: null,
  IOwnable__factory: IOwnable__factory
});

const _abi$N = [
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
  static abi = _abi$N;
  static createInterface() {
    return new ethers.Interface(_abi$N);
  }
  static connect(address, runner) {
    return new ethers.Contract(address, _abi$N, runner);
  }
}

const _abi$M = [
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
  static abi = _abi$M;
  static createInterface() {
    return new ethers.Interface(_abi$M);
  }
  static connect(address, runner) {
    return new ethers.Contract(address, _abi$M, runner);
  }
}

var index$1g = /*#__PURE__*/Object.freeze({
  __proto__: null,
  IFeeTokenPricer__factory: IFeeTokenPricer__factory,
  ISequencerInbox__factory: ISequencerInbox__factory
});

const _abi$L = [
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
const _bytecode$j = "0x60a060405230608052348015601357600080fd5b506080516116b66100366000396000818161066a015261088a01526116b66000f3fe608060405234801561001057600080fd5b506004361061012b5760003560e01c806395fcea78116100ad578063c4d66de811610071578063c4d66de81461023e578063c75184df14610251578063cb23bcb514610271578063d5b5cc2314610284578063e78cea92146102a457600080fd5b806395fcea78146101e85780639f0c04bf146101f0578063a04cee6014610203578063ae6dead714610216578063b0f305371461023657600080fd5b80635a129efe116100f45780635a129efe1461018d5780636ae71f12146101b057806372f2a8c7146101b857806380648b02146101c05780638515bc6a146101e057600080fd5b80627436d31461013057806308635a9514610156578063119852711461016b578063288e5b10146101725780634654779014610185575b600080fd5b61014361013e366004610f90565b6102b7565b6040519081526020015b60405180910390f35b6101696101643660046110be565b6102f4565b005b6000610143565b6101696101803660046111bb565b610367565b6101436103a2565b6101a061019b366004611257565b6103d6565b604051901515815260200161014d565b6101696103f3565b6101436105df565b6101c86105fa565b6040516001600160a01b03909116815260200161014d565b610143610620565b610169610660565b6101436101fe366004611270565b61078f565b6101696102113660046112ff565b6107d4565b610143610224366004611257565b60036020526000908152604090205481565b610143610853565b61016961024c366004611321565b610880565b610259600281565b6040516001600160801b03909116815260200161014d565b6000546101c8906001600160a01b031681565b610143610292366004611257565b60026020526000908152604090205481565b6001546101c8906001600160a01b031681565b60006102ec8484846040516020016102d191815260200190565b60405160208183030381529060405280519060200120610a0f565b949350505050565b6000610306898989898989898961078f565b90506103488c8c808060200260200160405190810160405280939291908181526020018383602002808284376000920191909152508e9250859150610ab19050565b6103598a8a8a8a8a8a8a8a8a610bba565b505050505050505050505050565b331561038657604051630e13b69d60e01b815260040160405180910390fd5b610397898989898989898989610bba565b505050505050505050565b6004546000906001600160801b03166002600160801b031981016103c857600091505090565b6001600160801b0316919050565b60008060006103e484610e44565b92509250506102ec8282610e81565b60008054906101000a90046001600160a01b03166001600160a01b0316638da5cb5b6040518163ffffffff1660e01b8152600401602060405180830381865afa158015610444573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906104689190611345565b6001600160a01b0316336001600160a01b03161461051e5760005460408051638da5cb5b60e01b8152905133926001600160a01b031691638da5cb5b9160048083019260209291908290030181865afa1580156104c9573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906104ed9190611345565b604051631194af8760e11b81526001600160a01b039283166004820152911660248201526044015b60405180910390fd5b6001546040805163cb23bcb560e01b815290516000926001600160a01b03169163cb23bcb59160048083019260209291908290030181865afa158015610568573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061058c9190611345565b6000549091506001600160a01b038083169116036105bd5760405163d054909f60e01b815260040160405180910390fd5b600080546001600160a01b0319166001600160a01b0392909216919091179055565b600554600090600181016105f557506000919050565b919050565b6006546000906001600160a01b03166002600160a01b031981016105f557600091505090565b600654600090600160a01b90046001600160601b03166bfffffffffffffffffffffffe19810161065257600091505090565b6001600160601b0316919050565b6001600160a01b037f00000000000000000000000000000000000000000000000000000000000000001630036106a85760405162461bcd60e51b815260040161051590611362565b7fb53127684a568b3173ae13b9f8a6016e243e63b6e8ee1178d6a717850b5d61038054336001600160a01b0382161461070557604051631194af8760e11b81523360048201526001600160a01b0382166024820152604401610515565b6004546001600160801b03908116146107315760405163d0afb66160e01b815260040160405180910390fd5b50506040805160c0810182526001600160801b0380825260208201526000199181018290526001600160a01b0360608201526001600160601b036080820152600060a090910181905260048290556005829055600691909155600755565b600088888888888888886040516020016107b09897969594939291906113ae565b60405160208183030381529060405280519060200120905098975050505050505050565b6000546001600160a01b0316331461081457600054604051630e4cf1bf60e21b81523360048201526001600160a01b039091166024820152604401610515565b60008281526003602052604080822083905551829184917fb4df3847300f076a369cd76d2314b470a1194d9e8a6bb97f1860aee88a5f67489190a35050565b600454600090600160801b90046001600160801b03166002600160801b031981016103c857600091505090565b6001600160a01b037f00000000000000000000000000000000000000000000000000000000000000001630036108c85760405162461bcd60e51b815260040161051590611362565b6001600160a01b0381166108ef57604051631ad0f74360e01b815260040160405180910390fd5b6001546001600160a01b03161561091957604051633bcd329760e21b815260040160405180910390fd5b6040805160c0810182526001600160801b038082526020808301919091526000198284018190526001600160a01b03606084018190526001600160601b036080850152600060a090940184905260048281556005839055600692909255600793909355600180546001600160a01b0319169386169384179055835163cb23bcb560e01b81529351929363cb23bcb593818301939290918290030181865afa1580156109c8573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906109ec9190611345565b600080546001600160a01b0319166001600160a01b039290921691909117905550565b8251600090610100811115610a4257604051637ed6198f60e11b8152600481018290526101006024820152604401610515565b8260005b82811015610aa7576000878281518110610a6257610a62611405565b60200260200101519050816001901b8716600003610a8e57826000528060205260406000209250610a9e565b8060005282602052604060002092505b50600101610a46565b5095945050505050565b610100835110610ad957825160405163ab6a068360e01b815260040161051591815260200190565b8251610ae6906002611518565b8210610b1d578183516002610afb9190611518565b604051630b8a724b60e01b815260048101929092526024820152604401610515565b6000610b2a8484846102b7565b600081815260036020526040902054909150610b5c576040516310e61af960e31b815260048101829052602401610515565b6000806000610b6a86610e44565b925092509250610b7a8282610e81565b15610b9b57604051639715b8d360e01b815260048101879052602401610515565b600092835260026020526040909220600190911b909117905550505050565b6000886001600160a01b0316886001600160a01b03167f20af7f3bbfe38132b8900ae295cd9c8d1914be7052d061a511f3f728dab189648c604051610c0191815260200190565b60405180910390a46000839050600060046040518060c00160405290816000820160009054906101000a90046001600160801b03166001600160801b03166001600160801b031681526020016000820160109054906101000a90046001600160801b03166001600160801b03166001600160801b03168152602001600182015481526020016002820160009054906101000a90046001600160a01b03166001600160a01b03166001600160a01b031681526020016002820160149054906101000a90046001600160601b03166001600160601b03166001600160601b0316815260200160038201548152505090506040518060c00160405280896001600160801b03168152602001876001600160801b031681526020018c60001b81526020018b6001600160a01b03168152602001886001600160601b03168152602001610d47600090565b905280516020808301516001600160801b03908116600160801b02921691909117600455604080830151600555606083015160808401516001600160601b0316600160a01b026001600160a01b039091161760065560a0909201516007558151601f8601829004820281018201909252848252610de3918b918591908890889081908401838280828437600092019190915250610e9092505050565b805160208201516001600160801b03908116600160801b029116176004556040810151600555606081015160808201516001600160601b0316600160a01b026001600160a01b039091161760065560a0015160075550505050505050505050565b6000808080610e5460ff8661153a565b90506000610e6360ff8761154e565b60008381526002602052604090205492979096509194509092505050565b80821c60011615155b92915050565b600154604051639e5d4c4960e01b815260009182916001600160a01b0390911690639e5d4c4990610ec990889088908890600401611586565b6000604051808303816000875af1158015610ee8573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f19168201604052610f1091908101906115cf565b9150915081610f4257805115610f295780518082602001fd5b604051631bb7daad60e11b815260040160405180910390fd5b5050505050565b634e487b7160e01b600052604160045260246000fd5b604051601f8201601f1916810167ffffffffffffffff81118282101715610f8857610f88610f49565b604052919050565b600080600060608486031215610fa557600080fd5b833567ffffffffffffffff811115610fbc57600080fd5b8401601f81018613610fcd57600080fd5b803567ffffffffffffffff811115610fe757610fe7610f49565b8060051b610ff760208201610f5f565b9182526020818401810192908101908984111561101357600080fd5b6020850194505b838510156110395784358083526020958601959093509091019061101a565b9960208901359950604090980135979650505050505050565b6001600160a01b038116811461106757600080fd5b50565b80356105f581611052565b60008083601f84011261108757600080fd5b50813567ffffffffffffffff81111561109f57600080fd5b6020830191508360208285010111156110b757600080fd5b9250929050565b60008060008060008060008060008060006101208c8e0312156110e057600080fd5b8b3567ffffffffffffffff8111156110f757600080fd5b8c01601f81018e1361110857600080fd5b803567ffffffffffffffff81111561111f57600080fd5b8e60208260051b840101111561113457600080fd5b60209182019c509a508c0135985061114e60408d0161106a565b975061115c60608d0161106a565b965060808c0135955060a08c0135945060c08c0135935060e08c013592506101008c013567ffffffffffffffff81111561119557600080fd5b6111a18e828f01611075565b915080935050809150509295989b509295989b9093969950565b60008060008060008060008060006101008a8c0312156111da57600080fd5b8935985060208a01356111ec81611052565b975060408a01356111fc81611052565b965060608a0135955060808a0135945060a08a0135935060c08a0135925060e08a013567ffffffffffffffff81111561123457600080fd5b6112408c828d01611075565b915080935050809150509295985092959850929598565b60006020828403121561126957600080fd5b5035919050565b60008060008060008060008060e0898b03121561128c57600080fd5b883561129781611052565b975060208901356112a781611052565b965060408901359550606089013594506080890135935060a0890135925060c089013567ffffffffffffffff8111156112df57600080fd5b6112eb8b828c01611075565b999c989b5096995094979396929594505050565b6000806040838503121561131257600080fd5b50508035926020909101359150565b60006020828403121561133357600080fd5b813561133e81611052565b9392505050565b60006020828403121561135757600080fd5b815161133e81611052565b6020808252602c908201527f46756e6374696f6e206d7573742062652063616c6c6564207468726f7567682060408201526b19195b1959d85d1958d85b1b60a21b606082015260800190565b6001600160601b03198960601b1681526001600160601b03198860601b166014820152866028820152856048820152846068820152836088820152818360a88301376000910160a801908152979650505050505050565b634e487b7160e01b600052603260045260246000fd5b634e487b7160e01b600052601160045260246000fd5b6001815b600184111561146c578085048111156114505761145061141b565b600184161561145e57908102905b60019390931c928002611435565b935093915050565b60008261148357506001610e8a565b8161149057506000610e8a565b81600181146114a657600281146114b0576114cc565b6001915050610e8a565b60ff8411156114c1576114c161141b565b50506001821b610e8a565b5060208310610133831016604e8410600b84101617156114ef575081810a610e8a565b6114fc6000198484611431565b80600019048211156115105761151061141b565b029392505050565b600061133e8383611474565b634e487b7160e01b600052601260045260246000fd5b60008261154957611549611524565b500490565b60008261155d5761155d611524565b500690565b60005b8381101561157d578181015183820152602001611565565b50506000910152565b60018060a01b038416815282602082015260606040820152600082518060608401526115b9816080850160208701611562565b601f01601f191691909101608001949350505050565b600080604083850312156115e257600080fd5b825180151581146115f257600080fd5b602084015190925067ffffffffffffffff81111561160f57600080fd5b8301601f8101851361162057600080fd5b805167ffffffffffffffff81111561163a5761163a610f49565b61164d601f8201601f1916602001610f5f565b81815286602083850101111561166257600080fd5b611673826020830160208601611562565b809350505050925092905056fea26469706673582212207104442fadc9a7521ef8f71e8ef2efdd1998a3762860253a98a2366fe5a1cd3464736f6c634300081e0033";
const isSuperArgs$j = (xs) => xs.length > 1;
class Outbox__factory extends ethers.ContractFactory {
  constructor(...args) {
    if (isSuperArgs$j(args)) {
      super(...args);
    } else {
      super(_abi$L, _bytecode$j, args[0]);
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
  static abi = _abi$L;
  static createInterface() {
    return new ethers.Interface(_abi$L);
  }
  static connect(address, runner) {
    return new ethers.Contract(address, _abi$L, runner);
  }
}

var index$1f = /*#__PURE__*/Object.freeze({
  __proto__: null,
  Outbox__factory: Outbox__factory
});

var index$1e = /*#__PURE__*/Object.freeze({
  __proto__: null,
  absOutboxSol: index$1n,
  iBridgeSol: index$1m,
  iDelayedMessageProviderSol: index$1l,
  iInboxBaseSol: index$1j,
  iInboxSol: index$1k,
  iOutboxSol: index$1i,
  iOwnableSol: index$1h,
  iSequencerInboxSol: index$1g,
  outboxSol: index$1f
});

const _abi$K = [
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
  static abi = _abi$K;
  static createInterface() {
    return new ethers.Interface(_abi$K);
  }
  static connect(address, runner) {
    return new ethers.Contract(address, _abi$K, runner);
  }
}

var index$1d = /*#__PURE__*/Object.freeze({
  __proto__: null,
  IGasRefunder__factory: IGasRefunder__factory
});

var index$1c = /*#__PURE__*/Object.freeze({
  __proto__: null,
  iGasRefunderSol: index$1d
});

const _abi$J = [
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
  static abi = _abi$J;
  static createInterface() {
    return new ethers.Interface(_abi$J);
  }
  static connect(address, runner) {
    return new ethers.Contract(address, _abi$J, runner);
  }
}

var index$1b = /*#__PURE__*/Object.freeze({
  __proto__: null,
  NodeInterface__factory: NodeInterface__factory
});

var index$1a = /*#__PURE__*/Object.freeze({
  __proto__: null,
  nodeInterfaceSol: index$1b
});

const _abi$I = [
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
  static abi = _abi$I;
  static createInterface() {
    return new ethers.Interface(_abi$I);
  }
  static connect(address, runner) {
    return new ethers.Contract(address, _abi$I, runner);
  }
}

var index$19 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  ArbSys__factory: ArbSys__factory
});

var index$18 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  arbSysSol: index$19
});

var index$17 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  bridge: index$1e,
  libraries: index$1c,
  nodeInterface: index$1a,
  precompiles: index$18
});

var index$16 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  src: index$17
});

var index$15 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  nitroContracts: index$16
});

const _abi$H = [
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
class Ownable__factory {
  static abi = _abi$H;
  static createInterface() {
    return new ethers.Interface(_abi$H);
  }
  static connect(address, runner) {
    return new ethers.Contract(address, _abi$H, runner);
  }
}

var index$14 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  Ownable__factory: Ownable__factory
});

var index$13 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  ownableSol: index$14
});

const _abi$G = [
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
  static abi = _abi$G;
  static createInterface() {
    return new ethers.Interface(_abi$G);
  }
  static connect(address, runner) {
    return new ethers.Contract(address, _abi$G, runner);
  }
}

var index$12 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  IERC1363__factory: IERC1363__factory
});

const _abi$F = [
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
  static abi = _abi$F;
  static createInterface() {
    return new ethers.Interface(_abi$F);
  }
  static connect(address, runner) {
    return new ethers.Contract(address, _abi$F, runner);
  }
}

var index$11 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  IERC1967__factory: IERC1967__factory
});

const _abi$E = [
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
  static abi = _abi$E;
  static createInterface() {
    return new ethers.Interface(_abi$E);
  }
  static connect(address, runner) {
    return new ethers.Contract(address, _abi$E, runner);
  }
}

var index$10 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  IERC5267__factory: IERC5267__factory
});

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
  static abi = _abi$D;
  static createInterface() {
    return new ethers.Interface(_abi$D);
  }
  static connect(address, runner) {
    return new ethers.Contract(address, _abi$D, runner);
  }
}

const _abi$C = [
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
  static abi = _abi$C;
  static createInterface() {
    return new ethers.Interface(_abi$C);
  }
  static connect(address, runner) {
    return new ethers.Contract(address, _abi$C, runner);
  }
}

const _abi$B = [
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
  static abi = _abi$B;
  static createInterface() {
    return new ethers.Interface(_abi$B);
  }
  static connect(address, runner) {
    return new ethers.Contract(address, _abi$B, runner);
  }
}

var index$$ = /*#__PURE__*/Object.freeze({
  __proto__: null,
  IERC1155Errors__factory: IERC1155Errors__factory,
  IERC20Errors__factory: IERC20Errors__factory,
  IERC721Errors__factory: IERC721Errors__factory
});

var index$_ = /*#__PURE__*/Object.freeze({
  __proto__: null,
  draftIerc6093Sol: index$$,
  ierc1363Sol: index$12,
  ierc1967Sol: index$11,
  ierc5267Sol: index$10
});

const _abi$A = [
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
const _bytecode$i = "0x60566037600b82828239805160001a607314602a57634e487b7160e01b600052600060045260246000fd5b30600052607381538281f3fe73000000000000000000000000000000000000000030146080604052600080fdfea264697066735822122062776a869569e45e8d20c4c1c7f91dfce5d4593da7e5cc85b15f9a451abdabb364736f6c634300081e0033";
const isSuperArgs$i = (xs) => xs.length > 1;
class ERC1967Utils__factory extends ethers.ContractFactory {
  constructor(...args) {
    if (isSuperArgs$i(args)) {
      super(...args);
    } else {
      super(_abi$A, _bytecode$i, args[0]);
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
  static abi = _abi$A;
  static createInterface() {
    return new ethers.Interface(_abi$A);
  }
  static connect(address, runner) {
    return new ethers.Contract(address, _abi$A, runner);
  }
}

var index$Z = /*#__PURE__*/Object.freeze({
  __proto__: null,
  ERC1967Utils__factory: ERC1967Utils__factory
});

var index$Y = /*#__PURE__*/Object.freeze({
  __proto__: null,
  erc1967UtilsSol: index$Z
});

const _abi$z = [
  {
    stateMutability: "payable",
    type: "fallback"
  }
];
class Proxy__factory {
  static abi = _abi$z;
  static createInterface() {
    return new ethers.Interface(_abi$z);
  }
  static connect(address, runner) {
    return new ethers.Contract(address, _abi$z, runner);
  }
}

var index$X = /*#__PURE__*/Object.freeze({
  __proto__: null,
  Proxy__factory: Proxy__factory
});

const _abi$y = [
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
  static abi = _abi$y;
  static createInterface() {
    return new ethers.Interface(_abi$y);
  }
  static connect(address, runner) {
    return new ethers.Contract(address, _abi$y, runner);
  }
}

var index$W = /*#__PURE__*/Object.freeze({
  __proto__: null,
  IBeacon__factory: IBeacon__factory
});

var index$V = /*#__PURE__*/Object.freeze({
  __proto__: null,
  iBeaconSol: index$W
});

var index$U = /*#__PURE__*/Object.freeze({
  __proto__: null,
  beacon: index$V,
  erc1967: index$Y,
  proxySol: index$X
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
  static abi = _abi$x;
  static createInterface() {
    return new ethers.Interface(_abi$x);
  }
  static connect(address, runner) {
    return new ethers.Contract(address, _abi$x, runner);
  }
}

var index$T = /*#__PURE__*/Object.freeze({
  __proto__: null,
  ERC20__factory: ERC20__factory
});

const _abi$w = [
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
  static abi = _abi$w;
  static createInterface() {
    return new ethers.Interface(_abi$w);
  }
  static connect(address, runner) {
    return new ethers.Contract(address, _abi$w, runner);
  }
}

var index$S = /*#__PURE__*/Object.freeze({
  __proto__: null,
  IERC20__factory: IERC20__factory
});

const _abi$v = [
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
  static abi = _abi$v;
  static createInterface() {
    return new ethers.Interface(_abi$v);
  }
  static connect(address, runner) {
    return new ethers.Contract(address, _abi$v, runner);
  }
}

var index$R = /*#__PURE__*/Object.freeze({
  __proto__: null,
  ERC20Burnable__factory: ERC20Burnable__factory
});

const _abi$u = [
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
  static abi = _abi$u;
  static createInterface() {
    return new ethers.Interface(_abi$u);
  }
  static connect(address, runner) {
    return new ethers.Contract(address, _abi$u, runner);
  }
}

var index$Q = /*#__PURE__*/Object.freeze({
  __proto__: null,
  ERC20Permit__factory: ERC20Permit__factory
});

const _abi$t = [
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
  static abi = _abi$t;
  static createInterface() {
    return new ethers.Interface(_abi$t);
  }
  static connect(address, runner) {
    return new ethers.Contract(address, _abi$t, runner);
  }
}

var index$P = /*#__PURE__*/Object.freeze({
  __proto__: null,
  IERC20Metadata__factory: IERC20Metadata__factory
});

const _abi$s = [
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
  static abi = _abi$s;
  static createInterface() {
    return new ethers.Interface(_abi$s);
  }
  static connect(address, runner) {
    return new ethers.Contract(address, _abi$s, runner);
  }
}

var index$O = /*#__PURE__*/Object.freeze({
  __proto__: null,
  IERC20Permit__factory: IERC20Permit__factory
});

var index$N = /*#__PURE__*/Object.freeze({
  __proto__: null,
  erc20BurnableSol: index$R,
  erc20PermitSol: index$Q,
  ierc20MetadataSol: index$P,
  ierc20PermitSol: index$O
});

const _abi$r = [
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
const _bytecode$h = "0x60566037600b82828239805160001a607314602a57634e487b7160e01b600052600060045260246000fd5b30600052607381538281f3fe73000000000000000000000000000000000000000030146080604052600080fdfea2646970667358221220e709be9238eded8c5ce30132794d91665a511fb09147507d7f8c19ae6ef6505e64736f6c634300081e0033";
const isSuperArgs$h = (xs) => xs.length > 1;
class SafeERC20__factory extends ethers.ContractFactory {
  constructor(...args) {
    if (isSuperArgs$h(args)) {
      super(...args);
    } else {
      super(_abi$r, _bytecode$h, args[0]);
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
  static abi = _abi$r;
  static createInterface() {
    return new ethers.Interface(_abi$r);
  }
  static connect(address, runner) {
    return new ethers.Contract(address, _abi$r, runner);
  }
}

var index$M = /*#__PURE__*/Object.freeze({
  __proto__: null,
  SafeERC20__factory: SafeERC20__factory
});

var index$L = /*#__PURE__*/Object.freeze({
  __proto__: null,
  safeErc20Sol: index$M
});

var index$K = /*#__PURE__*/Object.freeze({
  __proto__: null,
  erc20Sol: index$T,
  extensions: index$N,
  ierc20Sol: index$S,
  utils: index$L
});

var index$J = /*#__PURE__*/Object.freeze({
  __proto__: null,
  erc20: index$K
});

const _abi$q = [
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
const _bytecode$g = "0x60566037600b82828239805160001a607314602a57634e487b7160e01b600052600060045260246000fd5b30600052607381538281f3fe73000000000000000000000000000000000000000030146080604052600080fdfea26469706673582212206de8b6da1f7e1361f3e61a0d1791ee4faa460ea45f2bb4b1232be4410a7a08fa64736f6c634300081e0033";
const isSuperArgs$g = (xs) => xs.length > 1;
class Address__factory extends ethers.ContractFactory {
  constructor(...args) {
    if (isSuperArgs$g(args)) {
      super(...args);
    } else {
      super(_abi$q, _bytecode$g, args[0]);
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
  static abi = _abi$q;
  static createInterface() {
    return new ethers.Interface(_abi$q);
  }
  static connect(address, runner) {
    return new ethers.Contract(address, _abi$q, runner);
  }
}

var index$I = /*#__PURE__*/Object.freeze({
  __proto__: null,
  Address__factory: Address__factory
});

const _abi$p = [
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
const _bytecode$f = "0x60566037600b82828239805160001a607314602a57634e487b7160e01b600052600060045260246000fd5b30600052607381538281f3fe73000000000000000000000000000000000000000030146080604052600080fdfea26469706673582212201e25921bb3bb33c02f503ebc76a3e2d0809c19bc2515b63a154c18598b05a8f664736f6c634300081e0033";
const isSuperArgs$f = (xs) => xs.length > 1;
class Errors__factory extends ethers.ContractFactory {
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
    return new ethers.Interface(_abi$p);
  }
  static connect(address, runner) {
    return new ethers.Contract(address, _abi$p, runner);
  }
}

var index$H = /*#__PURE__*/Object.freeze({
  __proto__: null,
  Errors__factory: Errors__factory
});

const _abi$o = [
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
  static abi = _abi$o;
  static createInterface() {
    return new ethers.Interface(_abi$o);
  }
  static connect(address, runner) {
    return new ethers.Contract(address, _abi$o, runner);
  }
}

var index$G = /*#__PURE__*/Object.freeze({
  __proto__: null,
  Nonces__factory: Nonces__factory
});

const _abi$n = [
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
const _bytecode$e = "0x60566037600b82828239805160001a607314602a57634e487b7160e01b600052600060045260246000fd5b30600052607381538281f3fe73000000000000000000000000000000000000000030146080604052600080fdfea26469706673582212201021e5bd6290c490792798a5d7780b2eb00b28234ab94a5f1cd3ed1b6c522cac64736f6c634300081e0033";
const isSuperArgs$e = (xs) => xs.length > 1;
class ShortStrings__factory extends ethers.ContractFactory {
  constructor(...args) {
    if (isSuperArgs$e(args)) {
      super(...args);
    } else {
      super(_abi$n, _bytecode$e, args[0]);
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
  static abi = _abi$n;
  static createInterface() {
    return new ethers.Interface(_abi$n);
  }
  static connect(address, runner) {
    return new ethers.Contract(address, _abi$n, runner);
  }
}

var index$F = /*#__PURE__*/Object.freeze({
  __proto__: null,
  ShortStrings__factory: ShortStrings__factory
});

const _abi$m = [
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
const _bytecode$d = "0x60566037600b82828239805160001a607314602a57634e487b7160e01b600052600060045260246000fd5b30600052607381538281f3fe73000000000000000000000000000000000000000030146080604052600080fdfea26469706673582212207a4658386d5cb676fc8cc05d1582db7eeab07718866a46fe4771cd9b580ef2f864736f6c634300081e0033";
const isSuperArgs$d = (xs) => xs.length > 1;
class Strings__factory extends ethers.ContractFactory {
  constructor(...args) {
    if (isSuperArgs$d(args)) {
      super(...args);
    } else {
      super(_abi$m, _bytecode$d, args[0]);
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
  static abi = _abi$m;
  static createInterface() {
    return new ethers.Interface(_abi$m);
  }
  static connect(address, runner) {
    return new ethers.Contract(address, _abi$m, runner);
  }
}

var index$E = /*#__PURE__*/Object.freeze({
  __proto__: null,
  Strings__factory: Strings__factory
});

const _abi$l = [
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
const _bytecode$c = "0x60566037600b82828239805160001a607314602a57634e487b7160e01b600052600060045260246000fd5b30600052607381538281f3fe73000000000000000000000000000000000000000030146080604052600080fdfea2646970667358221220f1adc27ed30b57b4e3c6a01873376280f8171108123c0cd1ae6dda9ab1d9b1a864736f6c634300081e0033";
const isSuperArgs$c = (xs) => xs.length > 1;
class ECDSA__factory extends ethers.ContractFactory {
  constructor(...args) {
    if (isSuperArgs$c(args)) {
      super(...args);
    } else {
      super(_abi$l, _bytecode$c, args[0]);
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
  static abi = _abi$l;
  static createInterface() {
    return new ethers.Interface(_abi$l);
  }
  static connect(address, runner) {
    return new ethers.Contract(address, _abi$l, runner);
  }
}

var index$D = /*#__PURE__*/Object.freeze({
  __proto__: null,
  ECDSA__factory: ECDSA__factory
});

const _abi$k = [
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
  static abi = _abi$k;
  static createInterface() {
    return new ethers.Interface(_abi$k);
  }
  static connect(address, runner) {
    return new ethers.Contract(address, _abi$k, runner);
  }
}

var index$C = /*#__PURE__*/Object.freeze({
  __proto__: null,
  EIP712__factory: EIP712__factory
});

var index$B = /*#__PURE__*/Object.freeze({
  __proto__: null,
  ecdsaSol: index$D,
  eip712Sol: index$C
});

const _abi$j = [
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
  static abi = _abi$j;
  static createInterface() {
    return new ethers.Interface(_abi$j);
  }
  static connect(address, runner) {
    return new ethers.Contract(address, _abi$j, runner);
  }
}

var index$A = /*#__PURE__*/Object.freeze({
  __proto__: null,
  IERC165__factory: IERC165__factory
});

var index$z = /*#__PURE__*/Object.freeze({
  __proto__: null,
  ierc165Sol: index$A
});

const _abi$i = [
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
const _bytecode$b = "0x60566037600b82828239805160001a607314602a57634e487b7160e01b600052600060045260246000fd5b30600052607381538281f3fe73000000000000000000000000000000000000000030146080604052600080fdfea2646970667358221220e38525ca395593e23413b273284deb502430764865341426f419c80a3cb3523664736f6c634300081e0033";
const isSuperArgs$b = (xs) => xs.length > 1;
class SafeCast__factory extends ethers.ContractFactory {
  constructor(...args) {
    if (isSuperArgs$b(args)) {
      super(...args);
    } else {
      super(_abi$i, _bytecode$b, args[0]);
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
  static abi = _abi$i;
  static createInterface() {
    return new ethers.Interface(_abi$i);
  }
  static connect(address, runner) {
    return new ethers.Contract(address, _abi$i, runner);
  }
}

var index$y = /*#__PURE__*/Object.freeze({
  __proto__: null,
  SafeCast__factory: SafeCast__factory
});

var index$x = /*#__PURE__*/Object.freeze({
  __proto__: null,
  safeCastSol: index$y
});

var index$w = /*#__PURE__*/Object.freeze({
  __proto__: null,
  addressSol: index$I,
  cryptography: index$B,
  errorsSol: index$H,
  introspection: index$z,
  math: index$x,
  noncesSol: index$G,
  shortStringsSol: index$F,
  stringsSol: index$E
});

var index$v = /*#__PURE__*/Object.freeze({
  __proto__: null,
  access: index$13,
  interfaces: index$_,
  proxy: index$U,
  token: index$J,
  utils: index$w
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
  static abi = _abi$h;
  static createInterface() {
    return new ethers.Interface(_abi$h);
  }
  static connect(address, runner) {
    return new ethers.Contract(address, _abi$h, runner);
  }
}

var index$u = /*#__PURE__*/Object.freeze({
  __proto__: null,
  OwnableUpgradeable__factory: OwnableUpgradeable__factory
});

var index$t = /*#__PURE__*/Object.freeze({
  __proto__: null,
  ownableUpgradeableSol: index$u
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
  static abi = _abi$g;
  static createInterface() {
    return new ethers.Interface(_abi$g);
  }
  static connect(address, runner) {
    return new ethers.Contract(address, _abi$g, runner);
  }
}

var index$s = /*#__PURE__*/Object.freeze({
  __proto__: null,
  Initializable__factory: Initializable__factory
});

var index$r = /*#__PURE__*/Object.freeze({
  __proto__: null,
  initializableSol: index$s
});

var index$q = /*#__PURE__*/Object.freeze({
  __proto__: null,
  utils: index$r
});

const _abi$f = [
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
  static abi = _abi$f;
  static createInterface() {
    return new ethers.Interface(_abi$f);
  }
  static connect(address, runner) {
    return new ethers.Contract(address, _abi$f, runner);
  }
}

var index$p = /*#__PURE__*/Object.freeze({
  __proto__: null,
  ContextUpgradeable__factory: ContextUpgradeable__factory
});

var index$o = /*#__PURE__*/Object.freeze({
  __proto__: null,
  contextUpgradeableSol: index$p
});

var index$n = /*#__PURE__*/Object.freeze({
  __proto__: null,
  access: index$t,
  proxy: index$q,
  utils: index$o
});

var index$m = /*#__PURE__*/Object.freeze({
  __proto__: null,
  contracts: index$v,
  contractsUpgradeable: index$n
});

const _abi$e = [
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
const _bytecode$a = "0x60806040526040516102a03803806102a08339810160408190526020916097565b804210607e5760405162461bcd60e51b815260206004820152602360248201527f556e6c6f636b2074696d652073686f756c6420626520696e207468652066757460448201526275726560e81b606482015260840160405180910390fd5b600055600180546001600160a01b0319163317905560af565b60006020828403121560a857600080fd5b5051919050565b6101e2806100be6000396000f3fe608060405234801561001057600080fd5b50600436106100415760003560e01c8063251c1aa3146100465780633ccfd60b146100625780638da5cb5b1461006c575b600080fd5b61004f60005481565b6040519081526020015b60405180910390f35b61006a610097565b005b60015461007f906001600160a01b031681565b6040516001600160a01b039091168152602001610059565b6000544210156100e75760405162461bcd60e51b8152602060048201526016602482015275165bdd4818d85b89dd081dda5d1a191c985dc81e595d60521b60448201526064015b60405180910390fd5b6001546001600160a01b031633146101385760405162461bcd60e51b81526020600482015260146024820152732cb7ba9030b932b713ba103a34329037bbb732b960611b60448201526064016100de565b604080514781524260208201527fbf2ed60bd5b5965d685680c01195c9514e4382e28e3a5a2d2d5244bf59411b93910160405180910390a16001546040516001600160a01b03909116904780156108fc02916000818181858888f193505050501580156101a9573d6000803e3d6000fd5b5056fea2646970667358221220a93f9750b41045a0886faa30e4f1ebf5ef528da2bc1728e8ff29afadc5ddf96c64736f6c634300081e0033";
const isSuperArgs$a = (xs) => xs.length > 1;
class Lock__factory extends ethers.ContractFactory {
  constructor(...args) {
    if (isSuperArgs$a(args)) {
      super(...args);
    } else {
      super(_abi$e, _bytecode$a, args[0]);
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
  static abi = _abi$e;
  static createInterface() {
    return new ethers.Interface(_abi$e);
  }
  static connect(address, runner) {
    return new ethers.Contract(address, _abi$e, runner);
  }
}

var index$l = /*#__PURE__*/Object.freeze({
  __proto__: null,
  Lock__factory: Lock__factory
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
const _bytecode$9 = "0x6080604052348015600f57600080fd5b50611e3b8061001f6000396000f3fe6080604052600436106100fe5760003560e01c8063b190be8511610095578063e3f30e7111610064578063e3f30e71146102a2578063eac96f23146102d8578063ebde1bdb146102f8578063f2fde38b14610318578063fb0e722b1461033857600080fd5b8063b190be851461020f578063b44db82e1461022f578063c358798014610242578063df36132b1461026257600080fd5b80638da5cb5b116100d15780638da5cb5b1461017357806390f7e1b3146101c4578063a51c8cb9146101e4578063affed0e0146101f957600080fd5b806348875bf51461010357806360e312a714610125578063715018a61461014b57806374378d3714610160575b600080fd5b34801561010f57600080fd5b5061012361011e3660046115d4565b610358565b005b610138610133366004611674565b6103d4565b6040519081526020015b60405180910390f35b34801561015757600080fd5b506101236106f9565b61012361016e36600461170a565b61070d565b34801561017f57600080fd5b507f9016d09d72d40fdae2fd8ceac6b6234c7706214fd39c1cd1e609a0528c199300546001600160a01b03165b6040516001600160a01b039091168152602001610142565b3480156101d057600080fd5b506001546101ac906001600160a01b031681565b3480156101f057600080fd5b506101ac606481565b34801561020557600080fd5b5061013860045481565b34801561021b57600080fd5b5061013861022a3660046117a8565b61078d565b61013861023d3660046117ea565b6107b8565b34801561024e57600080fd5b5061012361025d3660046118a7565b610873565b34801561026e57600080fd5b5061029261027d3660046118a7565b60036020526000908152604090205460ff1681565b6040519015158152602001610142565b3480156102ae57600080fd5b506101ac6102bd3660046118a7565b6002602052600090815260409020546001600160a01b031681565b3480156102e457600080fd5b506101236102f33660046118c4565b6109fc565b34801561030457600080fd5b506101236103133660046119e9565b610c14565b34801561032457600080fd5b506101236103333660046118a7565b610c7c565b34801561034457600080fd5b506000546101ac906001600160a01b031681565b3330146103985760405162461bcd60e51b815260206004820152600960248201526827a7262cafa9a2a62360b91b60448201526064015b60405180910390fd5b817f07ce1e2038f0bf86b874f8aa890353ddfe00ccba5e000ad4b713e9b2ce90fa72826040516103c89190611a72565b60405180910390a25050565b60006103eb6001600160a01b038916333089610cba565b6001600160a01b03881660009081526003602052604090205460ff161561046757604051630852cd8d60e31b8152600481018790526001600160a01b038916906342966c6890602401600060405180830381600087803b15801561044e57600080fd5b505af1158015610462573d6000803e3d6000fd5b505050505b6000600454905060006374378d3760e01b8a6001600160a01b031663313ce5676040518163ffffffff1660e01b8152600401602060405180830381865afa1580156104b6573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906104da9190611a85565b6001600160a01b03808d16600090815260026020526040908190205490516105149392919091169033908e908e908e908a90602401611aa2565b60408051601f198184030181529190526020810180516001600160e01b03166001600160e01b03199093169290921790915260008054919250906001600160a01b0316158061060b5760008054906101000a90046001600160a01b03166001600160a01b031663679b6ded34600160009054906101000a90046001600160a01b031660008c33338e8e8c6040518a63ffffffff1660e01b81526004016105c1989796959493929190611afa565b60206040518083038185885af11580156105df573d6000803e3d6000fd5b50505050506040513d601f19601f820116820180604052508101906106049190611b59565b9150610682565b6001546040516349460b4d60e11b815260649163928c169a9161063c916001600160a01b0316908790600401611b72565b6020604051808303816000875af115801561065b573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061067f9190611b59565b91505b6004805490600061069283611bac565b9190505550336001600160a01b03168c6001600160a01b0316857f9df4cc1e9776bb39b63370f1f8d003320ceeebe30547208fa83a07a3e984794b858f8f8f6040516106e19493929190611bc5565b60405180910390a450919a9950505050505050505050565b610701610d27565b61070b6000610d82565b565b6107748388886001600160a01b031663313ce5676040518163ffffffff1660e01b8152600401602060405180830381865afa158015610750573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061022a9190611a85565b9250610784868686868686610df3565b50505050505050565b60006107998284611bfc565b6107a490600a611cfc565b6107ae9085611d0b565b90505b9392505050565b6000806000806107c78561132e565b60405163d505accf60e01b8152336004820152306024820152604481018f9052606481018a905260ff8416608482015260a4810183905260c4810182905292955090935091506001600160a01b038e169063d505accf9060e401600060405180830381600087803b15801561083b57600080fd5b505af115801561084f573d6000803e3d6000fd5b505050506108628d8d8d8d8d8d8d6103d4565b9d9c50505050505050505050505050565b61087b610d27565b6001600160a01b03811660009081526003602052604090205460ff166108a25760016108a5565b60005b6001600160a01b0382166000908152600360205260409020805460ff1916911515918217905560ff16156109a6576040516370a0823160e01b815230600482015281906000906001600160a01b038316906370a0823190602401602060405180830381865afa15801561091c573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906109409190611b59565b905080156109a357604051630852cd8d60e31b8152600481018290526001600160a01b038316906342966c6890602401600060405180830381600087803b15801561098a57600080fd5b505af115801561099e573d6000803e3d6000fd5b505050505b50505b6001600160a01b03811660008181526003602090815260409182902054915160ff909216151582527f7740f93df62e6714ab915a82ef699f7a6db1f754498e2e363890d286aba7dcab910160405180910390a250565b6000610a06611378565b805490915060ff600160401b820416159067ffffffffffffffff16600081158015610a2e5750825b905060008267ffffffffffffffff166001148015610a4b5750303b155b905081158015610a59575080155b15610a775760405163f92ee8a960e01b815260040160405180910390fd5b845467ffffffffffffffff191660011785558315610aa157845460ff60401b1916600160401b1785555b610aaa896113a3565b600080546001600160a01b038a81166001600160a01b0319928316811790935560018054918b16919092168117909155604080516064815260208101939093528201527f59967eb20e0c027d0c4fe6e11fcec2273a08036e26740962b3ef3a23f107f93c9060600160405180910390a160005b8651811015610bc2576000878281518110610b3a57610b3a611d2d565b602090810291909101810151808201805182516001600160a01b0390811660009081526002865260409081902080546001600160a01b0319169383169390931790925583519251915191811682529294509116917fd7b0a59830045bcaf6233768890edf6fcda71a5654d385440db294eb92b9a7db910160405180910390a250600101610b1d565b508315610c0957845460ff60401b19168555604051600181527fc7f505b2f371ae2175ee4913f4499e1f2633a7b5936321eed1cdaeb6115181d29060200160405180910390a15b505050505050505050565b610c1c610d27565b6001600160a01b0382811660008181526002602090815260409182902080546001600160a01b0319169486169485179055905192835290917fd7b0a59830045bcaf6233768890edf6fcda71a5654d385440db294eb92b9a7db91016103c8565b610c84610d27565b6001600160a01b038116610cae57604051631e4fbdf760e01b81526000600482015260240161038f565b610cb781610d82565b50565b6040516001600160a01b038481166024830152838116604483015260648201839052610d219186918216906323b872dd906084015b604051602081830303815290604052915060e01b6020820180516001600160e01b0383818316178352505050506113b4565b50505050565b33610d597f9016d09d72d40fdae2fd8ceac6b6234c7706214fd39c1cd1e609a0528c199300546001600160a01b031690565b6001600160a01b03161461070b5760405163118cdaa760e01b815233600482015260240161038f565b7f9016d09d72d40fdae2fd8ceac6b6234c7706214fd39c1cd1e609a0528c19930080546001600160a01b031981166001600160a01b03848116918217845560405192169182907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a3505050565b6000546001600160a01b0316158015610e8257600154610e2f906001600160a01b03167311110000000000000000000000000000000011110190565b6001600160a01b0316336001600160a01b031614610e7d5760405162461bcd60e51b815260206004820152600b60248201526a4e4f545f4741544557415960a81b604482015260640161038f565b611058565b60008060009054906101000a90046001600160a01b03166001600160a01b031663e78cea926040518163ffffffff1660e01b8152600401602060405180830381865afa158015610ed6573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610efa9190611d43565b9050336001600160a01b03821614610f415760405162461bcd60e51b815260206004820152600a6024820152694e4f545f42524944474560b01b604482015260640161038f565b6001546040805163ab5d894360e01b815290516001600160a01b039283169284169163ab5d89439160048083019260209291908290030181865afa158015610f8d573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610fb19190611d43565b6001600160a01b03166380648b026040518163ffffffff1660e01b8152600401602060405180830381865afa158015610fee573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906110129190611d43565b6001600160a01b0316146110565760405162461bcd60e51b815260206004820152600b60248201526a4e4f545f4741544557415960a81b604482015260640161038f565b505b6040516370a0823160e01b8152306004820152879085906001600160a01b038316906370a0823190602401602060405180830381865afa1580156110a0573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906110c49190611b59565b106110e2576110dd6001600160a01b0382168787611425565b611145565b6040516340c10f1960e01b81526001600160a01b038781166004830152602482018790528216906340c10f1990604401600060405180830381600087803b15801561112c57600080fd5b505af1158015611140573d6000803e3d6000fd5b505050505b8351156112d45760006348875bf560e01b6111628683600461145b565b61116b90611d60565b6001600160e01b031916149050801561121e576000306001600160a01b0316866040516111989190611d9e565b6000604051808303816000865af19150503d80600081146111d5576040519150601f19603f3d011682016040523d82523d6000602084013e6111da565b606091505b50509050806112185760405162461bcd60e51b815260206004820152600a6024820152691354d1d7d1905253115160b21b604482015260640161038f565b506112d2565b6001600160a01b0387163b156112d257600080886001600160a01b0316620c35008860405161124d9190611d9e565b60006040518083038160008787f1925050503d806000811461128b576040519150601f19603f3d011682016040523d82523d6000602084013e611290565b606091505b5091509150857f840af9ca2ec8c881ca3de23cf221981cd4118acdefeb96233fbdf0e365d7615583836040516112c7929190611dba565b60405180910390a250505b505b866001600160a01b0316886001600160a01b0316847f42365fe0dfe76a5961cdef1960c9135c4097a1b6c253d8c1d74f5d27e41cbb8e89898960405161131c93929190611dd5565b60405180910390a45050505050505050565b600080600083516041036113585750505060208101516040820151606083015160001a9190611371565b604051634be6321b60e01b815260040160405180910390fd5b9193909250565b6000807ff0c57e16840df040f15088dc2f81fe391c3923bec73e23a9662efc9c229c6a005b92915050565b6113ab6114c1565b610cb7816114e6565b600080602060008451602086016000885af1806113d7576040513d6000823e3d81fd5b50506000513d915081156113ef5780600114156113fc565b6001600160a01b0384163b155b15610d2157604051635274afe760e01b81526001600160a01b038516600482015260240161038f565b6040516001600160a01b0383811660248301526044820183905261145691859182169063a9059cbb90606401610cef565b505050565b6060835182811161146a578092505b838111611475578093505b50818310156107b15750604051828203848401601f19601f830181165b828101518582015281018061149257505050806020830101600081526020810160405250808252509392505050565b6114c96114ee565b61070b57604051631afcd79f60e31b815260040160405180910390fd5b610c846114c1565b60006114f8611378565b54600160401b900460ff16919050565b634e487b7160e01b600052604160045260246000fd5b6040805190810167ffffffffffffffff8111828210171561154157611541611508565b60405290565b604051601f8201601f1916810167ffffffffffffffff8111828210171561157057611570611508565b604052919050565b60008067ffffffffffffffff84111561159357611593611508565b50601f8301601f19166020016115a881611547565b9150508281528383830111156115bd57600080fd5b828260208301376000602084830101529392505050565b600080604083850312156115e757600080fd5b82359150602083013567ffffffffffffffff81111561160557600080fd5b8301601f8101851361161657600080fd5b61162585823560208401611578565b9150509250929050565b6001600160a01b0381168114610cb757600080fd5b803561164f8161162f565b919050565b600082601f83011261166557600080fd5b6107b183833560208501611578565b600080600080600080600060e0888a03121561168f57600080fd5b873561169a8161162f565b965060208801356116aa8161162f565b955060408801359450606088013567ffffffffffffffff8111156116cd57600080fd5b6116d98a828b01611654565b979a969950949760808101359660a0820135965060c090910135945092505050565b60ff81168114610cb757600080fd5b600080600080600080600060e0888a03121561172557600080fd5b8735611730816116fb565b965060208801356117408161162f565b955060408801356117508161162f565b945060608801356117608161162f565b93506080880135925060a088013567ffffffffffffffff81111561178357600080fd5b61178f8a828b01611654565b979a969950949793969295929450505060c09091013590565b6000806000606084860312156117bd57600080fd5b8335925060208401356117cf816116fb565b915060408401356117df816116fb565b809150509250925092565b60008060008060008060008060006101208a8c03121561180957600080fd5b89356118148161162f565b985061182260208b01611644565b975060408a0135965060608a013567ffffffffffffffff81111561184557600080fd5b6118518c828d01611654565b96505060808a0135945060a08a0135935060c08a0135925060e08a013591506101008a013567ffffffffffffffff81111561188b57600080fd5b6118978c828d01611654565b9150509295985092959850929598565b6000602082840312156118b957600080fd5b81356107b18161162f565b600080600080608085870312156118da57600080fd5b84356118e58161162f565b935060208501356118f58161162f565b925060408501356119058161162f565b9150606085013567ffffffffffffffff81111561192157600080fd5b8501601f8101871361193257600080fd5b803567ffffffffffffffff81111561194c5761194c611508565b61195b60208260051b01611547565b8082825260208201915060208360061b85010192508983111561197d57600080fd5b6020840193505b828410156119db576040848b03121561199c57600080fd5b6119a461151e565b84356119af8161162f565b815260208501356119bf8161162f565b8060208301525080835250602082019150604084019350611984565b969995985093965050505050565b600080604083850312156119fc57600080fd5b8235611a078161162f565b91506020830135611a178161162f565b809150509250929050565b60005b83811015611a3d578181015183820152602001611a25565b50506000910152565b60008151808452611a5e816020860160208601611a22565b601f01601f19169290920160200192915050565b6020815260006107b16020830184611a46565b600060208284031215611a9757600080fd5b81516107b1816116fb565b60ff881681526001600160a01b0387811660208301528681166040830152851660608201526080810184905260e060a08201819052600090611ae690830185611a46565b90508260c083015298975050505050505050565b6001600160a01b038981168252602082018990526040820188905286811660608301528516608082015260a0810184905260c0810183905261010060e08201819052600090611b4b90830184611a46565b9a9950505050505050505050565b600060208284031215611b6b57600080fd5b5051919050565b6001600160a01b03831681526040602082018190526000906107ae90830184611a46565b634e487b7160e01b600052601160045260246000fd5b600060018201611bbe57611bbe611b96565b5060010190565b84815260018060a01b0384166020820152826040820152608060608201526000611bf26080830184611a46565b9695505050505050565b60ff828116828216039081111561139d5761139d611b96565b6001815b6001841115611c5057808504811115611c3457611c34611b96565b6001841615611c4257908102905b60019390931c928002611c19565b935093915050565b600082611c675750600161139d565b81611c745750600061139d565b8160018114611c8a5760028114611c9457611cb0565b600191505061139d565b60ff841115611ca557611ca5611b96565b50506001821b61139d565b5060208310610133831016604e8410600b8410161715611cd3575081810a61139d565b611ce06000198484611c15565b8060001904821115611cf457611cf4611b96565b029392505050565b60006107b160ff841683611c58565b600082611d2857634e487b7160e01b600052601260045260246000fd5b500490565b634e487b7160e01b600052603260045260246000fd5b600060208284031215611d5557600080fd5b81516107b18161162f565b805160208201516001600160e01b0319811691906004821015611d97576001600160e01b0319600483900360031b81901b82161692505b5050919050565b60008251611db0818460208701611a22565b9190910192915050565b82151581526040602082015260006107ae6040830184611a46565b60018060a01b0384168152826020820152606060408201526000611dfc6060830184611a46565b9594505050505056fea26469706673582212203ad667bd704c5733be943ea6faead7394ad540bddc64fd916f4a1554eadf7d8964736f6c634300081e0033";
const isSuperArgs$9 = (xs) => xs.length > 1;
class ArbGateway__factory extends ethers.ContractFactory {
  constructor(...args) {
    if (isSuperArgs$9(args)) {
      super(...args);
    } else {
      super(_abi$d, _bytecode$9, args[0]);
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
  static abi = _abi$d;
  static createInterface() {
    return new ethers.Interface(_abi$d);
  }
  static connect(address, runner) {
    return new ethers.Contract(address, _abi$d, runner);
  }
}

var index$k = /*#__PURE__*/Object.freeze({
  __proto__: null,
  ArbGateway__factory: ArbGateway__factory
});

const _abi$c = [
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
const _bytecode$8 = "0x6080604052348015600f57600080fd5b506125558061001f6000396000f3fe6080604052600436106101355760003560e01c8063affed0e0116100ab578063df36132b1161006f578063df36132b1461034a578063e3f30e711461037a578063eac96f23146103b0578063ebde1bdb146103d0578063f2fde38b146103f0578063fb0e722b1461041057600080fd5b8063affed0e0146102c1578063b190be85146102d7578063b44db82e146102f7578063b50e801d1461030a578063c35879801461032a57600080fd5b806374378d37116100fd57806374378d37146101d65780638da5cb5b146101e957806390f7e1b31461023a578063a51c8cb91461025a578063a85c38ef1461026f578063ac4cb358146102a157600080fd5b80631f6a02671461013a57806348875bf5146101695780635484f0761461018b57806360e312a7146101a0578063715018a6146101c1575b600080fd5b34801561014657600080fd5b506006546101549060ff1681565b60405190151581526020015b60405180910390f35b34801561017557600080fd5b50610189610184366004611aa9565b610430565b005b34801561019757600080fd5b506101896104ac565b6101b36101ae366004611b48565b610513565b604051908152602001610160565b3480156101cd57600080fd5b50610189610838565b6101896101e4366004611bdd565b61084c565b3480156101f557600080fd5b507f9016d09d72d40fdae2fd8ceac6b6234c7706214fd39c1cd1e609a0528c199300546001600160a01b03165b6040516001600160a01b039091168152602001610160565b34801561024657600080fd5b50600154610222906001600160a01b031681565b34801561026657600080fd5b50610222606481565b34801561027b57600080fd5b5061028f61028a366004611c7a565b6109b8565b60405161016096959493929190611ce3565b3480156102ad57600080fd5b506101896102bc366004611df1565b610a88565b3480156102cd57600080fd5b506101b360045481565b3480156102e357600080fd5b506101b36102f2366004611e7f565b610adf565b6101b3610305366004611ec1565b610b0a565b34801561031657600080fd5b50610189610325366004611c7a565b610bc5565b34801561033657600080fd5b50610189610345366004611f7c565b610d4d565b34801561035657600080fd5b50610154610365366004611f7c565b60036020526000908152604090205460ff1681565b34801561038657600080fd5b50610222610395366004611f7c565b6002602052600090815260409020546001600160a01b031681565b3480156103bc57600080fd5b506101896103cb366004611f99565b610ed6565b3480156103dc57600080fd5b506101896103eb36600461200d565b6110ec565b3480156103fc57600080fd5b5061018961040b366004611f7c565b611154565b34801561041c57600080fd5b50600054610222906001600160a01b031681565b3330146104705760405162461bcd60e51b815260206004820152600960248201526827a7262cafa9a2a62360b91b60448201526064015b60405180910390fd5b817f07ce1e2038f0bf86b874f8aa890353ddfe00ccba5e000ad4b713e9b2ce90fa72826040516104a09190612046565b60405180910390a25050565b6104b4611192565b60065460ff166104c55760016104c8565b60005b6006805460ff1916911515918217905560405160ff909116151581527f4caa98d8778c80a93e087168a6e45fa5369af8904ba8f828d1bbec56dfe8f35d9060200160405180910390a1565b600061052a6001600160a01b0389163330896111ed565b6001600160a01b03881660009081526003602052604090205460ff16156105a657604051630852cd8d60e31b8152600481018790526001600160a01b038916906342966c6890602401600060405180830381600087803b15801561058d57600080fd5b505af11580156105a1573d6000803e3d6000fd5b505050505b6000600454905060006374378d3760e01b8a6001600160a01b031663313ce5676040518163ffffffff1660e01b8152600401602060405180830381865afa1580156105f5573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906106199190612059565b6001600160a01b03808d16600090815260026020526040908190205490516106539392919091169033908e908e908e908a90602401612076565b60408051601f198184030181529190526020810180516001600160e01b03166001600160e01b03199093169290921790915260008054919250906001600160a01b0316158061074a5760008054906101000a90046001600160a01b03166001600160a01b031663679b6ded34600160009054906101000a90046001600160a01b031660008c33338e8e8c6040518a63ffffffff1660e01b81526004016107009897969594939291906120ce565b60206040518083038185885af115801561071e573d6000803e3d6000fd5b50505050506040513d601f19601f82011682018060405250810190610743919061212d565b91506107c1565b6001546040516349460b4d60e11b815260649163928c169a9161077b916001600160a01b0316908790600401612146565b6020604051808303816000875af115801561079a573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906107be919061212d565b91505b600480549060006107d183612180565b9190505550336001600160a01b03168c6001600160a01b0316857f9df4cc1e9776bb39b63370f1f8d003320ceeebe30547208fa83a07a3e984794b858f8f8f6040516108209493929190612199565b60405180910390a450919a9950505050505050505050565b610840611192565b61084a600061125a565b565b6108b38388886001600160a01b031663313ce5676040518163ffffffff1660e01b8152600401602060405180830381865afa15801561088f573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906102f29190612059565b6040805160c0810182526001600160a01b03808a168252888116602080840191825289831684860190815260608501878152608086018a8152600060a088018190528a8152600590945296909220855181549086166001600160a01b0319918216178255935160018201805491871691861691909117905590516002820180549190951693169290921790925590516003820155915192955091600482019061095c9082612258565b5060a091909101516005909101805460ff191691151591909117905560065460ff16156109af576109918686868686866112cb565b600081815260056020819052604090912001805460ff191660011790555b50505050505050565b600560205260009081526040902080546001820154600283015460038401546004850180546001600160a01b0395861696948616959093169391926109fc906121d0565b80601f0160208091040260200160405190810160405280929190818152602001828054610a28906121d0565b8015610a755780601f10610a4a57610100808354040283529160200191610a75565b820191906000526020600020905b815481529060010190602001808311610a5857829003601f168201915b5050506005909301549192505060ff1686565b610a9485858585610ed6565b6006805460ff19168215159081179091556040519081527f4caa98d8778c80a93e087168a6e45fa5369af8904ba8f828d1bbec56dfe8f35d9060200160405180910390a15050505050565b6000610aeb8284612316565b610af690600a612416565b610b009085612425565b90505b9392505050565b600080600080610b1985611806565b60405163d505accf60e01b8152336004820152306024820152604481018f9052606481018a905260ff8416608482015260a4810183905260c4810182905292955090935091506001600160a01b038e169063d505accf9060e401600060405180830381600087803b158015610b8d57600080fd5b505af1158015610ba1573d6000803e3d6000fd5b50505050610bb48d8d8d8d8d8d8d610513565b9d9c50505050505050505050505050565b610bcd611192565b6000818152600560209081526040808320815160c08101835281546001600160a01b039081168252600183015481169482019490945260028201549093169183019190915260038101546060830152600481018054608084019190610c31906121d0565b80601f0160208091040260200160405190810160405280929190818152602001828054610c5d906121d0565b8015610caa5780601f10610c7f57610100808354040283529160200191610caa565b820191906000526020600020905b815481529060010190602001808311610c8d57829003601f168201915b50505091835250506005919091015460ff16151560209091015260a081015190915015610d0b5760405162461bcd60e51b815260206004820152600f60248201526e1053149150511657d4d15515131151608a1b6044820152606401610467565b610d2d81600001518260200151836040015184606001518560800151876112cb565b50600090815260056020819052604090912001805460ff19166001179055565b610d55611192565b6001600160a01b03811660009081526003602052604090205460ff16610d7c576001610d7f565b60005b6001600160a01b0382166000908152600360205260409020805460ff1916911515918217905560ff1615610e80576040516370a0823160e01b815230600482015281906000906001600160a01b038316906370a0823190602401602060405180830381865afa158015610df6573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610e1a919061212d565b90508015610e7d57604051630852cd8d60e31b8152600481018290526001600160a01b038316906342966c6890602401600060405180830381600087803b158015610e6457600080fd5b505af1158015610e78573d6000803e3d6000fd5b505050505b50505b6001600160a01b03811660008181526003602090815260409182902054915160ff909216151582527f7740f93df62e6714ab915a82ef699f7a6db1f754498e2e363890d286aba7dcab910160405180910390a250565b6000610ee0611850565b805490915060ff600160401b82041615906001600160401b0316600081158015610f075750825b90506000826001600160401b03166001148015610f235750303b155b905081158015610f31575080155b15610f4f5760405163f92ee8a960e01b815260040160405180910390fd5b845467ffffffffffffffff191660011785558315610f7957845460ff60401b1916600160401b1785555b610f828961187b565b600080546001600160a01b038a81166001600160a01b0319928316811790935560018054918b16919092168117909155604080516064815260208101939093528201527f59967eb20e0c027d0c4fe6e11fcec2273a08036e26740962b3ef3a23f107f93c9060600160405180910390a160005b865181101561109a57600087828151811061101257611012612447565b602090810291909101810151808201805182516001600160a01b0390811660009081526002865260409081902080546001600160a01b0319169383169390931790925583519251915191811682529294509116917fd7b0a59830045bcaf6233768890edf6fcda71a5654d385440db294eb92b9a7db910160405180910390a250600101610ff5565b5083156110e157845460ff60401b19168555604051600181527fc7f505b2f371ae2175ee4913f4499e1f2633a7b5936321eed1cdaeb6115181d29060200160405180910390a15b505050505050505050565b6110f4611192565b6001600160a01b0382811660008181526002602090815260409182902080546001600160a01b0319169486169485179055905192835290917fd7b0a59830045bcaf6233768890edf6fcda71a5654d385440db294eb92b9a7db91016104a0565b61115c611192565b6001600160a01b03811661118657604051631e4fbdf760e01b815260006004820152602401610467565b61118f8161125a565b50565b336111c47f9016d09d72d40fdae2fd8ceac6b6234c7706214fd39c1cd1e609a0528c199300546001600160a01b031690565b6001600160a01b03161461084a5760405163118cdaa760e01b8152336004820152602401610467565b6040516001600160a01b0384811660248301528381166044830152606482018390526112549186918216906323b872dd906084015b604051602081830303815290604052915060e01b6020820180516001600160e01b03838183161783525050505061188c565b50505050565b7f9016d09d72d40fdae2fd8ceac6b6234c7706214fd39c1cd1e609a0528c19930080546001600160a01b031981166001600160a01b03848116918217845560405192169182907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a3505050565b6000546001600160a01b031615801561135a57600154611307906001600160a01b03167311110000000000000000000000000000000011110190565b6001600160a01b0316336001600160a01b0316146113555760405162461bcd60e51b815260206004820152600b60248201526a4e4f545f4741544557415960a81b6044820152606401610467565b611530565b60008060009054906101000a90046001600160a01b03166001600160a01b031663e78cea926040518163ffffffff1660e01b8152600401602060405180830381865afa1580156113ae573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906113d2919061245d565b9050336001600160a01b038216146114195760405162461bcd60e51b815260206004820152600a6024820152694e4f545f42524944474560b01b6044820152606401610467565b6001546040805163ab5d894360e01b815290516001600160a01b039283169284169163ab5d89439160048083019260209291908290030181865afa158015611465573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611489919061245d565b6001600160a01b03166380648b026040518163ffffffff1660e01b8152600401602060405180830381865afa1580156114c6573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906114ea919061245d565b6001600160a01b03161461152e5760405162461bcd60e51b815260206004820152600b60248201526a4e4f545f4741544557415960a81b6044820152606401610467565b505b6040516370a0823160e01b8152306004820152879085906001600160a01b038316906370a0823190602401602060405180830381865afa158015611578573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061159c919061212d565b106115ba576115b56001600160a01b03821687876118fd565b61161d565b6040516340c10f1960e01b81526001600160a01b038781166004830152602482018790528216906340c10f1990604401600060405180830381600087803b15801561160457600080fd5b505af1158015611618573d6000803e3d6000fd5b505050505b8351156117ac5760006348875bf560e01b61163a86836004611933565b6116439061247a565b6001600160e01b03191614905080156116f6576000306001600160a01b03168660405161167091906124b8565b6000604051808303816000865af19150503d80600081146116ad576040519150601f19603f3d011682016040523d82523d6000602084013e6116b2565b606091505b50509050806116f05760405162461bcd60e51b815260206004820152600a6024820152691354d1d7d1905253115160b21b6044820152606401610467565b506117aa565b6001600160a01b0387163b156117aa57600080886001600160a01b0316620c35008860405161172591906124b8565b60006040518083038160008787f1925050503d8060008114611763576040519150601f19603f3d011682016040523d82523d6000602084013e611768565b606091505b5091509150857f840af9ca2ec8c881ca3de23cf221981cd4118acdefeb96233fbdf0e365d76155838360405161179f9291906124d4565b60405180910390a250505b505b866001600160a01b0316886001600160a01b0316847f42365fe0dfe76a5961cdef1960c9135c4097a1b6c253d8c1d74f5d27e41cbb8e8989896040516117f4939291906124ef565b60405180910390a45050505050505050565b600080600083516041036118305750505060208101516040820151606083015160001a9190611849565b604051634be6321b60e01b815260040160405180910390fd5b9193909250565b6000807ff0c57e16840df040f15088dc2f81fe391c3923bec73e23a9662efc9c229c6a005b92915050565b611883611999565b61118f816119be565b600080602060008451602086016000885af1806118af576040513d6000823e3d81fd5b50506000513d915081156118c75780600114156118d4565b6001600160a01b0384163b155b1561125457604051635274afe760e01b81526001600160a01b0385166004820152602401610467565b6040516001600160a01b0383811660248301526044820183905261192e91859182169063a9059cbb90606401611222565b505050565b60608351828111611942578092505b83811161194d578093505b5081831015610b035750604051828203848401601f19601f830181165b828101518582015281018061196a57505050806020830101600081526020810160405250808252509392505050565b6119a16119c6565b61084a57604051631afcd79f60e31b815260040160405180910390fd5b61115c611999565b60006119d0611850565b54600160401b900460ff16919050565b634e487b7160e01b600052604160045260246000fd5b604080519081016001600160401b0381118282101715611a1857611a186119e0565b60405290565b604051601f8201601f191681016001600160401b0381118282101715611a4657611a466119e0565b604052919050565b6000806001600160401b03841115611a6857611a686119e0565b50601f8301601f1916602001611a7d81611a1e565b915050828152838383011115611a9257600080fd5b828260208301376000602084830101529392505050565b60008060408385031215611abc57600080fd5b8235915060208301356001600160401b03811115611ad957600080fd5b8301601f81018513611aea57600080fd5b611af985823560208401611a4e565b9150509250929050565b6001600160a01b038116811461118f57600080fd5b8035611b2381611b03565b919050565b600082601f830112611b3957600080fd5b610b0383833560208501611a4e565b600080600080600080600060e0888a031215611b6357600080fd5b8735611b6e81611b03565b96506020880135611b7e81611b03565b95506040880135945060608801356001600160401b03811115611ba057600080fd5b611bac8a828b01611b28565b979a969950949760808101359660a0820135965060c090910135945092505050565b60ff8116811461118f57600080fd5b600080600080600080600060e0888a031215611bf857600080fd5b8735611c0381611bce565b96506020880135611c1381611b03565b95506040880135611c2381611b03565b94506060880135611c3381611b03565b93506080880135925060a08801356001600160401b03811115611c5557600080fd5b611c618a828b01611b28565b979a969950949793969295929450505060c09091013590565b600060208284031215611c8c57600080fd5b5035919050565b60005b83811015611cae578181015183820152602001611c96565b50506000910152565b60008151808452611ccf816020860160208601611c93565b601f01601f19169290920160200192915050565b6001600160a01b0387811682528681166020830152851660408201526060810184905260c060808201819052600090611d1e90830185611cb7565b905082151560a0830152979650505050505050565b600082601f830112611d4457600080fd5b81356001600160401b03811115611d5d57611d5d6119e0565b611d6c60208260051b01611a1e565b8082825260208201915060208360061b860101925085831115611d8e57600080fd5b602085015b83811015611de75760408188031215611dab57600080fd5b611db36119f6565b8135611dbe81611b03565b81526020820135611dce81611b03565b6020828101919091529084529290920191604001611d93565b5095945050505050565b600080600080600060a08688031215611e0957600080fd5b8535611e1481611b03565b94506020860135611e2481611b03565b93506040860135611e3481611b03565b925060608601356001600160401b03811115611e4f57600080fd5b611e5b88828901611d33565b92505060808601358015158114611e7157600080fd5b809150509295509295909350565b600080600060608486031215611e9457600080fd5b833592506020840135611ea681611bce565b91506040840135611eb681611bce565b809150509250925092565b60008060008060008060008060006101208a8c031215611ee057600080fd5b8935611eeb81611b03565b9850611ef960208b01611b18565b975060408a0135965060608a01356001600160401b03811115611f1b57600080fd5b611f278c828d01611b28565b96505060808a0135945060a08a0135935060c08a0135925060e08a013591506101008a01356001600160401b03811115611f6057600080fd5b611f6c8c828d01611b28565b9150509295985092959850929598565b600060208284031215611f8e57600080fd5b8135610b0381611b03565b60008060008060808587031215611faf57600080fd5b8435611fba81611b03565b93506020850135611fca81611b03565b92506040850135611fda81611b03565b915060608501356001600160401b03811115611ff557600080fd5b61200187828801611d33565b91505092959194509250565b6000806040838503121561202057600080fd5b823561202b81611b03565b9150602083013561203b81611b03565b809150509250929050565b602081526000610b036020830184611cb7565b60006020828403121561206b57600080fd5b8151610b0381611bce565b60ff881681526001600160a01b0387811660208301528681166040830152851660608201526080810184905260e060a082018190526000906120ba90830185611cb7565b90508260c083015298975050505050505050565b6001600160a01b038981168252602082018990526040820188905286811660608301528516608082015260a0810184905260c0810183905261010060e0820181905260009061211f90830184611cb7565b9a9950505050505050505050565b60006020828403121561213f57600080fd5b5051919050565b6001600160a01b0383168152604060208201819052600090610b0090830184611cb7565b634e487b7160e01b600052601160045260246000fd5b6000600182016121925761219261216a565b5060010190565b84815260018060a01b03841660208201528260408201526080606082015260006121c66080830184611cb7565b9695505050505050565b600181811c908216806121e457607f821691505b60208210810361220457634e487b7160e01b600052602260045260246000fd5b50919050565b601f82111561192e57806000526020600020601f840160051c810160208510156122315750805b601f840160051c820191505b81811015612251576000815560010161223d565b5050505050565b81516001600160401b03811115612271576122716119e0565b6122858161227f84546121d0565b8461220a565b6020601f8211600181146122b957600083156122a15750848201515b600019600385901b1c1916600184901b178455612251565b600084815260208120601f198516915b828110156122e957878501518255602094850194600190920191016122c9565b50848210156123075786840151600019600387901b60f8161c191681555b50505050600190811b01905550565b60ff82811682821603908111156118755761187561216a565b6001815b600184111561236a5780850481111561234e5761234e61216a565b600184161561235c57908102905b60019390931c928002612333565b935093915050565b60008261238157506001611875565b8161238e57506000611875565b81600181146123a457600281146123ae576123ca565b6001915050611875565b60ff8411156123bf576123bf61216a565b50506001821b611875565b5060208310610133831016604e8410600b84101617156123ed575081810a611875565b6123fa600019848461232f565b806000190482111561240e5761240e61216a565b029392505050565b6000610b0360ff841683612372565b60008261244257634e487b7160e01b600052601260045260246000fd5b500490565b634e487b7160e01b600052603260045260246000fd5b60006020828403121561246f57600080fd5b8151610b0381611b03565b805160208201516001600160e01b03198116919060048210156124b1576001600160e01b0319600483900360031b81901b82161692505b5050919050565b600082516124ca818460208701611c93565b9190910192915050565b8215158152604060208201526000610b006040830184611cb7565b60018060a01b03841681528260208201526060604082015260006125166060830184611cb7565b9594505050505056fea2646970667358221220866237bc4ecf2a69470e774a5e78d0dc0df6cde94e6bb49cb0152c6d9ba9ac1b64736f6c634300081e0033";
const isSuperArgs$8 = (xs) => xs.length > 1;
class ArbGatewaySettle__factory extends ethers.ContractFactory {
  constructor(...args) {
    if (isSuperArgs$8(args)) {
      super(...args);
    } else {
      super(_abi$c, _bytecode$8, args[0]);
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
  static abi = _abi$c;
  static createInterface() {
    return new ethers.Interface(_abi$c);
  }
  static connect(address, runner) {
    return new ethers.Contract(address, _abi$c, runner);
  }
}

var index$j = /*#__PURE__*/Object.freeze({
  __proto__: null,
  ArbGatewaySettle__factory: ArbGatewaySettle__factory
});

const _abi$b = [
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
const _bytecode$7 = "0x608060405234801561001057600080fd5b5060405161065c38038061065c83398101604081905261002f91610058565b600061003b82826101ad565b505061026b565b634e487b7160e01b600052604160045260246000fd5b60006020828403121561006a57600080fd5b81516001600160401b0381111561008057600080fd5b8201601f8101841361009157600080fd5b80516001600160401b038111156100aa576100aa610042565b604051601f8201601f19908116603f011681016001600160401b03811182821017156100d8576100d8610042565b6040528181528282016020018610156100f057600080fd5b60005b8281101561010f576020818501810151838301820152016100f3565b50600091810160200191909152949350505050565b600181811c9082168061013857607f821691505b60208210810361015857634e487b7160e01b600052602260045260246000fd5b50919050565b601f8211156101a857806000526020600020601f840160051c810160208510156101855750805b601f840160051c820191505b818110156101a55760008155600101610191565b50505b505050565b81516001600160401b038111156101c6576101c6610042565b6101da816101d48454610124565b8461015e565b6020601f82116001811461020e57600083156101f65750848201515b600019600385901b1c1916600184901b1784556101a5565b600084815260208120601f198516915b8281101561023e578785015182556020948501946001909201910161021e565b508482101561025c5786840151600019600387901b60f8161c191681555b50505050600190811b01905550565b6103e28061027a6000396000f3fe608060405234801561001057600080fd5b50600436106100365760003560e01c8063a41368621461003b578063cfae321714610050575b600080fd5b61004e61004936600461015d565b61006e565b005b6100586100b5565b6040516100659190610216565b60405180910390f35b600061007a82826102ed565b507f0d332ed5c7d6f1999116748c0eb99c740f276d879d025a5be6435fcf177785de816040516100aa9190610216565b60405180910390a150565b6060600080546100c490610264565b80601f01602080910402602001604051908101604052809291908181526020018280546100f090610264565b801561013d5780601f106101125761010080835404028352916020019161013d565b820191906000526020600020905b81548152906001019060200180831161012057829003601f168201915b5050505050905090565b634e487b7160e01b600052604160045260246000fd5b60006020828403121561016f57600080fd5b813567ffffffffffffffff81111561018657600080fd5b8201601f8101841361019757600080fd5b803567ffffffffffffffff8111156101b1576101b1610147565b604051601f8201601f19908116603f0116810167ffffffffffffffff811182821017156101e0576101e0610147565b6040528181528282016020018610156101f857600080fd5b81602084016020830137600091810160200191909152949350505050565b602081526000825180602084015260005b818110156102445760208186018101516040868401015201610227565b506000604082850101526040601f19601f83011684010191505092915050565b600181811c9082168061027857607f821691505b60208210810361029857634e487b7160e01b600052602260045260246000fd5b50919050565b601f8211156102e857806000526020600020601f840160051c810160208510156102c55750805b601f840160051c820191505b818110156102e557600081556001016102d1565b50505b505050565b815167ffffffffffffffff81111561030757610307610147565b61031b816103158454610264565b8461029e565b6020601f82116001811461034f57600083156103375750848201515b600019600385901b1c1916600184901b1784556102e5565b600084815260208120601f198516915b8281101561037f578785015182556020948501946001909201910161035f565b508482101561039d5786840151600019600387901b60f8161c191681555b50505050600190811b0190555056fea2646970667358221220a0c727299c8dd8aa49c1d26d2e9e631eea4e4864edc0434e30887ee8fb28958c64736f6c634300081e0033";
const isSuperArgs$7 = (xs) => xs.length > 1;
class Greeter__factory extends ethers.ContractFactory {
  constructor(...args) {
    if (isSuperArgs$7(args)) {
      super(...args);
    } else {
      super(_abi$b, _bytecode$7, args[0]);
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
  static abi = _abi$b;
  static createInterface() {
    return new ethers.Interface(_abi$b);
  }
  static connect(address, runner) {
    return new ethers.Contract(address, _abi$b, runner);
  }
}

var index$i = /*#__PURE__*/Object.freeze({
  __proto__: null,
  Greeter__factory: Greeter__factory
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
const _bytecode$6 = "0x608060405234801561001057600080fd5b5060405161097738038061097783398101604081905261002f91610096565b81600061003c82826101fc565b5050600180546001600160a01b0319166001600160a01b0392909216919091179055506102ba565b634e487b7160e01b600052604160045260246000fd5b80516001600160a01b038116811461009157600080fd5b919050565b600080604083850312156100a957600080fd5b82516001600160401b038111156100bf57600080fd5b8301601f810185136100d057600080fd5b80516001600160401b038111156100e9576100e9610064565b604051601f8201601f19908116603f011681016001600160401b038111828210171561011757610117610064565b60405281815282820160200187101561012f57600080fd5b60005b8281101561014e57602081850181015183830182015201610132565b5060006020838301015280945050505061016a6020840161007a565b90509250929050565b600181811c9082168061018757607f821691505b6020821081036101a757634e487b7160e01b600052602260045260246000fd5b50919050565b601f8211156101f757806000526020600020601f840160051c810160208510156101d45750805b601f840160051c820191505b818110156101f457600081556001016101e0565b50505b505050565b81516001600160401b0381111561021557610215610064565b610229816102238454610173565b846101ad565b6020601f82116001811461025d57600083156102455750848201515b600019600385901b1c1916600184901b1784556101f4565b600084815260208120601f198516915b8281101561028d578785015182556020948501946001909201910161026d565b50848210156102ab5786840151600019600387901b60f8161c191681555b50505050600190811b01905550565b6106ae806102c96000396000f3fe608060405234801561001057600080fd5b50600436106100575760003560e01c806323fd78851461005c5780636d58bbd41461008c578063a4136862146100be578063cfae3217146100d1578063e16a5ff9146100e6575b600080fd5b60015461006f906001600160a01b031681565b6040516001600160a01b0390911681526020015b60405180910390f35b6100bc61009a366004610393565b600180546001600160a01b0319166001600160a01b0392909216919091179055565b005b6100bc6100cc3660046103d9565b610107565b6100d96101bb565b60405161008391906104d8565b6100f96100f43660046103d9565b61024d565b604051908152602001610083565b600154610130906001600160a01b03167311110000000000000000000000000000000011110190565b6001600160a01b0316336001600160a01b0316146101af5760405162461bcd60e51b815260206004820152603260248201527f4772656574696e67206f6e6c792075706461746561626c6520627920706172656044820152716e7420636861696e2773206164647265737360701b606482015260840160405180910390fd5b6101b88161034c565b50565b6060600080546101ca906104eb565b80601f01602080910402602001604051908101604052809291908181526020018280546101f6906104eb565b80156102435780601f1061021857610100808354040283529160200191610243565b820191906000526020600020905b81548152906001019060200180831161022657829003601f168201915b5050505050905090565b60008063a413686260e01b8360405160240161026991906104d8565b60408051601f198184030181529181526020820180516001600160e01b03166001600160e01b03199094169390931790925260015491516349460b4d60e11b815290925060009160649163928c169a916102d4916001600160a01b0391909116908690600401610525565b6020604051808303816000875af11580156102f3573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906103179190610551565b60405190915081907f70181b11a3e9262fd1d816a04c5e30d1bb0b8a453a6fe2dfd5db03a8b8fc984590600090a29392505050565b600061035882826105b9565b507f0d332ed5c7d6f1999116748c0eb99c740f276d879d025a5be6435fcf177785de8160405161038891906104d8565b60405180910390a150565b6000602082840312156103a557600080fd5b81356001600160a01b03811681146103bc57600080fd5b9392505050565b634e487b7160e01b600052604160045260246000fd5b6000602082840312156103eb57600080fd5b813567ffffffffffffffff81111561040257600080fd5b8201601f8101841361041357600080fd5b803567ffffffffffffffff81111561042d5761042d6103c3565b604051601f8201601f19908116603f0116810167ffffffffffffffff8111828210171561045c5761045c6103c3565b60405281815282820160200186101561047457600080fd5b81602084016020830137600091810160200191909152949350505050565b6000815180845260005b818110156104b85760208185018101518683018201520161049c565b506000602082860101526020601f19601f83011685010191505092915050565b6020815260006103bc6020830184610492565b600181811c908216806104ff57607f821691505b60208210810361051f57634e487b7160e01b600052602260045260246000fd5b50919050565b6001600160a01b038316815260406020820181905260009061054990830184610492565b949350505050565b60006020828403121561056357600080fd5b5051919050565b601f8211156105b457806000526020600020601f840160051c810160208510156105915750805b601f840160051c820191505b818110156105b1576000815560010161059d565b50505b505050565b815167ffffffffffffffff8111156105d3576105d36103c3565b6105e7816105e184546104eb565b8461056a565b6020601f82116001811461061b57600083156106035750848201515b600019600385901b1c1916600184901b1784556105b1565b600084815260208120601f198516915b8281101561064b578785015182556020948501946001909201910161062b565b50848210156106695786840151600019600387901b60f8161c191681555b50505050600190811b0190555056fea2646970667358221220d9dac1a2b81c21b3c387cebf782c629f57497aaea067bb247bb087689765491d64736f6c634300081e0033";
const isSuperArgs$6 = (xs) => xs.length > 1;
class GreeterChild__factory extends ethers.ContractFactory {
  constructor(...args) {
    if (isSuperArgs$6(args)) {
      super(...args);
    } else {
      super(_abi$a, _bytecode$6, args[0]);
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
  static abi = _abi$a;
  static createInterface() {
    return new ethers.Interface(_abi$a);
  }
  static connect(address, runner) {
    return new ethers.Contract(address, _abi$a, runner);
  }
}

var index$h = /*#__PURE__*/Object.freeze({
  __proto__: null,
  GreeterChild__factory: GreeterChild__factory
});

const _abi$9 = [
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
const _bytecode$5 = "0x608060405234801561001057600080fd5b50604051610c19380380610c1983398101604081905261002f916100a2565b82600061003c8282610218565b5050600180546001600160a01b039384166001600160a01b03199182161790915560028054929093169116179055506102d6565b634e487b7160e01b600052604160045260246000fd5b80516001600160a01b038116811461009d57600080fd5b919050565b6000806000606084860312156100b757600080fd5b83516001600160401b038111156100cd57600080fd5b8401601f810186136100de57600080fd5b80516001600160401b038111156100f7576100f7610070565b604051601f8201601f19908116603f011681016001600160401b038111828210171561012557610125610070565b60405281815282820160200188101561013d57600080fd5b60005b8281101561015c57602081850181015183830182015201610140565b5060006020838301015280955050505061017860208501610086565b915061018660408501610086565b90509250925092565b600181811c908216806101a357607f821691505b6020821081036101c357634e487b7160e01b600052602260045260246000fd5b50919050565b601f82111561021357806000526020600020601f840160051c810160208510156101f05750805b601f840160051c820191505b8181101561021057600081556001016101fc565b50505b505050565b81516001600160401b0381111561023157610231610070565b6102458161023f845461018f565b846101c9565b6020601f82116001811461027957600083156102615750848201515b600019600385901b1c1916600184901b178455610210565b600084815260208120601f198516915b828110156102a95787850151825560209485019460019092019101610289565b50848210156102c75786840151600019600387901b60f8161c191681555b50505050600190811b01905550565b610934806102e56000396000f3fe6080604052600436106100555760003560e01c80637c15beee1461005a57806382a5ea4614610080578063a4136862146100b8578063a663866a146100da578063cfae321714610117578063fb0e722b14610139575b600080fd5b61006d6100683660046105fb565b610159565b6040519081526020015b60405180910390f35b34801561008c57600080fd5b506001546100a0906001600160a01b031681565b6040516001600160a01b039091168152602001610077565b3480156100c457600080fd5b506100d86100d336600461064f565b61026b565b005b3480156100e657600080fd5b506100d86100f53660046106a4565b600180546001600160a01b0319166001600160a01b0392909216919091179055565b34801561012357600080fd5b5061012c61047d565b604051610077919061070e565b34801561014557600080fd5b506002546100a0906001600160a01b031681565b60008063a413686260e01b86604051602401610175919061070e565b60408051601f198184030181529181526020820180516001600160e01b03166001600160e01b031990941693909317909252600254600154925163679b6ded60e01b81529193506000926001600160a01b039182169263679b6ded9234926101f09291169086908c90339081908e908e908d90600401610721565b60206040518083038185885af115801561020e573d6000803e3d6000fd5b50505050506040513d601f19601f820116820180604052508101906102339190610780565b60405190915081907fde92b5b7839f4a2c640f5e3bbb66d415458dadc57a487b0c7fa562ed7c9c896f90600090a29695505050505050565b600254604080516373c6754960e11b815290516000926001600160a01b03169163e78cea929160048083019260209291908290030181865afa1580156102b5573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906102d99190610799565b9050336001600160a01b038216146103255760405162461bcd60e51b815260206004820152600a6024820152694e4f545f42524944474560b01b60448201526064015b60405180910390fd5b6000816001600160a01b031663ab5d89436040518163ffffffff1660e01b8152600401602060405180830381865afa158015610365573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906103899190610799565b90506000816001600160a01b03166380648b026040518163ffffffff1660e01b8152600401602060405180830381865afa1580156103cb573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906103ef9190610799565b6001549091506001600160a01b0380831691161461046e5760405162461bcd60e51b815260206004820152603660248201527f4772656574696e67206f6e6c792075706461746561626c65206279207468652060448201527518da1a5b190818da185a5b89dcc818dbdb9d1c9858dd60521b606482015260840161031c565b6104778461050f565b50505050565b60606000805461048c906107b6565b80601f01602080910402602001604051908101604052809291908181526020018280546104b8906107b6565b80156105055780601f106104da57610100808354040283529160200191610505565b820191906000526020600020905b8154815290600101906020018083116104e857829003601f168201915b5050505050905090565b600061051b828261083f565b507f0d332ed5c7d6f1999116748c0eb99c740f276d879d025a5be6435fcf177785de8160405161054b919061070e565b60405180910390a150565b634e487b7160e01b600052604160045260246000fd5b600082601f83011261057d57600080fd5b813567ffffffffffffffff81111561059757610597610556565b604051601f8201601f19908116603f0116810167ffffffffffffffff811182821017156105c6576105c6610556565b6040528181528382016020018510156105de57600080fd5b816020850160208301376000918101602001919091529392505050565b6000806000806080858703121561061157600080fd5b843567ffffffffffffffff81111561062857600080fd5b6106348782880161056c565b97602087013597506040870135966060013595509350505050565b60006020828403121561066157600080fd5b813567ffffffffffffffff81111561067857600080fd5b6106848482850161056c565b949350505050565b6001600160a01b03811681146106a157600080fd5b50565b6000602082840312156106b657600080fd5b81356106c18161068c565b9392505050565b6000815180845260005b818110156106ee576020818501810151868301820152016106d2565b506000602082860101526020601f19601f83011685010191505092915050565b6020815260006106c160208301846106c8565b6001600160a01b038981168252602082018990526040820188905286811660608301528516608082015260a0810184905260c0810183905261010060e08201819052600090610772908301846106c8565b9a9950505050505050505050565b60006020828403121561079257600080fd5b5051919050565b6000602082840312156107ab57600080fd5b81516106c18161068c565b600181811c908216806107ca57607f821691505b6020821081036107ea57634e487b7160e01b600052602260045260246000fd5b50919050565b601f82111561083a57806000526020600020601f840160051c810160208510156108175750805b601f840160051c820191505b818110156108375760008155600101610823565b50505b505050565b815167ffffffffffffffff81111561085957610859610556565b61086d8161086784546107b6565b846107f0565b6020601f8211600181146108a157600083156108895750848201515b600019600385901b1c1916600184901b178455610837565b600084815260208120601f198516915b828110156108d157878501518255602094850194600190920191016108b1565b50848210156108ef5786840151600019600387901b60f8161c191681555b50505050600190811b0190555056fea264697066735822122019ec35faf92c244e9268120e92f2ea5da91b7c8014860c67c236a6f6b08504cd64736f6c634300081e0033";
const isSuperArgs$5 = (xs) => xs.length > 1;
class GreeterParent__factory extends ethers.ContractFactory {
  constructor(...args) {
    if (isSuperArgs$5(args)) {
      super(...args);
    } else {
      super(_abi$9, _bytecode$5, args[0]);
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
  static abi = _abi$9;
  static createInterface() {
    return new ethers.Interface(_abi$9);
  }
  static connect(address, runner) {
    return new ethers.Contract(address, _abi$9, runner);
  }
}

var index$g = /*#__PURE__*/Object.freeze({
  __proto__: null,
  GreeterParent__factory: GreeterParent__factory
});

var index$f = /*#__PURE__*/Object.freeze({
  __proto__: null,
  arbGatewaySettleSol: index$j,
  arbGatewaySol: index$k,
  greeterChildSol: index$h,
  greeterParentSol: index$g,
  greeterSol: index$i
});

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
  static abi = _abi$8;
  static createInterface() {
    return new ethers.Interface(_abi$8);
  }
  static connect(address, runner) {
    return new ethers.Contract(address, _abi$8, runner);
  }
}

const _abi$7 = [
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
  static abi = _abi$7;
  static createInterface() {
    return new ethers.Interface(_abi$7);
  }
  static connect(address, runner) {
    return new ethers.Contract(address, _abi$7, runner);
  }
}

var index$e = /*#__PURE__*/Object.freeze({
  __proto__: null,
  IERC20Exp__factory: IERC20Exp__factory,
  IERC20Mintable__factory: IERC20Mintable__factory
});

const _abi$6 = [
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
  static abi = _abi$6;
  static createInterface() {
    return new ethers.Interface(_abi$6);
  }
  static connect(address, runner) {
    return new ethers.Contract(address, _abi$6, runner);
  }
}

var index$d = /*#__PURE__*/Object.freeze({
  __proto__: null,
  IGateway__factory: IGateway__factory
});

const _abi$5 = [
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
    stateMutability: "nonpayable",
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
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
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
  static abi = _abi$5;
  static createInterface() {
    return new ethers.Interface(_abi$5);
  }
  static connect(address, runner) {
    return new ethers.Contract(
      address,
      _abi$5,
      runner
    );
  }
}

var index$c = /*#__PURE__*/Object.freeze({
  __proto__: null,
  IInitializableProxy__factory: IInitializableProxy__factory
});

var index$b = /*#__PURE__*/Object.freeze({
  __proto__: null,
  iGatewaySol: index$d,
  iInitializableProxySol: index$c,
  ierc20Sol: index$e
});

const _abi$4 = [
  {
    inputs: [],
    name: "InvalidSignatureLength",
    type: "error"
  }
];
const _bytecode$4 = "0x60566037600b82828239805160001a607314602a57634e487b7160e01b600052600060045260246000fd5b30600052607381538281f3fe73000000000000000000000000000000000000000030146080604052600080fdfea2646970667358221220741593d28771aef74fd7a1d0f1fc5149dae0241ac4989549a457170a48b508b764736f6c634300081e0033";
const isSuperArgs$4 = (xs) => xs.length > 1;
class SigLib__factory extends ethers.ContractFactory {
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
    return new ethers.Interface(_abi$4);
  }
  static connect(address, runner) {
    return new ethers.Contract(address, _abi$4, runner);
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
const _bytecode$3 = "0x6080604052348015600f57600080fd5b506108278061001f6000396000f3fe608060405234801561001057600080fd5b506004361061007c5760003560e01c80638da5cb5b1161005b5780638da5cb5b146100b1578063b1da41fe146100f0578063c4d66de814610105578063f2fde38b1461011857600080fd5b8062b105e61461008157806314d3940d14610096578063715018a6146100a9575b600080fd5b61009461008f36600461072f565b61012b565b005b6100946100a436600461072f565b6101cd565b610094610266565b7f9016d09d72d40fdae2fd8ceac6b6234c7706214fd39c1cd1e609a0528c199300546040516001600160a01b0390911681526020015b60405180910390f35b6100f861027a565b6040516100e79190610758565b61009461011336600461072f565b61028b565b61009461012636600461072f565b610387565b6101336103c5565b61013e600082610420565b6101815760405162461bcd60e51b815260206004820152600f60248201526e24a72b20a624a22fa9a2aa2a2622a960891b60448201526064015b60405180910390fd5b61018c600082610447565b506040516001600160a01b03821681527fc75b24622d5a8552bcfe775a11d9009ac47d4c050a3af79686aebe33f902fc03906020015b60405180910390a150565b6101d56103c5565b6101e0600082610420565b156102215760405162461bcd60e51b8152602060048201526011602482015270222aa82624a1a0aa22afa9a2aa2a2622a960791b6044820152606401610178565b61022c60008261045c565b506040516001600160a01b03821681527f0e8d4de8d62b8ad5b1837a4a13009121b82a40e3bdcd6e6f454a72418cc86b0e906020016101c2565b61026e6103c5565b6102786000610471565b565b606061028660006104e2565b905090565b60006102956104f6565b805490915060ff600160401b820416159067ffffffffffffffff166000811580156102bd5750825b905060008267ffffffffffffffff1660011480156102da5750303b155b9050811580156102e8575080155b156103065760405163f92ee8a960e01b815260040160405180910390fd5b845467ffffffffffffffff19166001178555831561033057845460ff60401b1916600160401b1785555b6103398661051f565b831561037f57845460ff60401b19168555604051600181527fc7f505b2f371ae2175ee4913f4499e1f2633a7b5936321eed1cdaeb6115181d29060200160405180910390a15b505050505050565b61038f6103c5565b6001600160a01b0381166103b957604051631e4fbdf760e01b815260006004820152602401610178565b6103c281610471565b50565b336103f77f9016d09d72d40fdae2fd8ceac6b6234c7706214fd39c1cd1e609a0528c199300546001600160a01b031690565b6001600160a01b0316146102785760405163118cdaa760e01b8152336004820152602401610178565b6001600160a01b038116600090815260018301602052604081205415155b90505b92915050565b600061043e836001600160a01b038416610539565b600061043e836001600160a01b03841661062c565b7f9016d09d72d40fdae2fd8ceac6b6234c7706214fd39c1cd1e609a0528c19930080546001600160a01b031981166001600160a01b03848116918217845560405192169182907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a3505050565b606060006104ef8361067b565b9392505050565b6000807ff0c57e16840df040f15088dc2f81fe391c3923bec73e23a9662efc9c229c6a00610441565b6001600160a01b0381166105305750335b610221816106d7565b6000818152600183016020526040812054801561062257600061055d6001836107a4565b8554909150600090610571906001906107a4565b90508082146105d6576000866000018281548110610591576105916107c5565b90600052602060002001549050808760000184815481106105b4576105b46107c5565b6000918252602080832090910192909255918252600188019052604090208390555b85548690806105e7576105e76107db565b600190038181906000526020600020016000905590558560010160008681526020019081526020016000206000905560019350505050610441565b6000915050610441565b600081815260018301602052604081205461067357508154600181810184556000848152602080822090930184905584548482528286019093526040902091909155610441565b506000610441565b6060816000018054806020026020016040519081016040528092919081815260200182805480156106cb57602002820191906000526020600020905b8154815260200190600101908083116106b7575b50505050509050919050565b6106df6106e8565b6103c28161070d565b6106f0610715565b61027857604051631afcd79f60e31b815260040160405180910390fd5b61038f6106e8565b600061071f6104f6565b54600160401b900460ff16919050565b60006020828403121561074157600080fd5b81356001600160a01b03811681146104ef57600080fd5b602080825282518282018190526000918401906040840190835b818110156107995783516001600160a01b0316835260209384019390920191600101610772565b509095945050505050565b8181038181111561044157634e487b7160e01b600052601160045260246000fd5b634e487b7160e01b600052603260045260246000fd5b634e487b7160e01b600052603160045260246000fdfea26469706673582212202fcaf371f37bd190823a30049e4c10435befbdf51fd078116285c0acbde8e08464736f6c634300081e0033";
const isSuperArgs$3 = (xs) => xs.length > 1;
class WithSettler__factory extends ethers.ContractFactory {
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
    return new ethers.Interface(_abi$3);
  }
  static connect(address, runner) {
    return new ethers.Contract(address, _abi$3, runner);
  }
}

var index$9 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  WithSettler__factory: WithSettler__factory
});

var index$8 = /*#__PURE__*/Object.freeze({
  __proto__: null,
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
const _bytecode$2 = "0x6080604052348015600f57600080fd5b506106f18061001f6000396000f3fe60806040526004361061004e5760003560e01c80634f1ef286146100655780635c60da1b146100785780638f283970146100a9578063dce95104146100c9578063f851a440146100dc5761005d565b3661005d5761005b6100f1565b005b61005b6100f1565b61005b6100733660046105be565b610103565b34801561008457600080fd5b5061008d61016a565b6040516001600160a01b03909116815260200160405180910390f35b3480156100b557600080fd5b5061005b6100c436600461060c565b610179565b61005b6100d736600461062e565b6101d9565b3480156100e857600080fd5b5061008d610263565b6101016100fc61026d565b610277565b565b61010b61029b565b6001600160a01b0316336001600160a01b03161461015c5760405162461bcd60e51b81526020600482015260096024820152682727aa2fa0a226a4a760b91b60448201526064015b60405180910390fd5b61016682826102a5565b5050565b600061017461026d565b905090565b61018161029b565b6001600160a01b0316336001600160a01b0316146101cd5760405162461bcd60e51b81526020600482015260096024820152682727aa2fa0a226a4a760b91b6044820152606401610153565b6101d681610364565b50565b60006101e361026d565b6001600160a01b0316148015610209575060006101fe61029b565b6001600160a01b0316145b61024b5760405162461bcd60e51b81526020600482015260136024820152721053149150511657d253925512505312569151606a1b6044820152606401610153565b61025483610364565b61025e82826102a5565b505050565b600061017461029b565b60006101746103b8565b3660008037600080366000845af43d6000803e808015610296573d6000f35b3d6000fd5b60006101746103eb565b6102ae82610413565b6040516001600160a01b038316907fbc7cd75a20ee27fd9adebab32041f755214dbc6bffa90cc0225b39da2e5c2d3b90600090a280511561035c57600080836001600160a01b031683604051610304919061068c565b600060405180830381855af49150503d806000811461033f576040519150601f19603f3d011682016040523d82523d6000602084013e610344565b606091505b50915091508161035657805181602001fd5b50505050565b61016661048d565b7f7e644d79422f17c01e4894b5f4f588d331ebfa28653d42ae832dc59e38c9798f61038d6103eb565b604080516001600160a01b03928316815291841660208301520160405180910390a16101d6816104ac565b60007f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc5b546001600160a01b0316919050565b60007fb53127684a568b3173ae13b9f8a6016e243e63b6e8ee1178d6a717850b5d61036103dc565b806001600160a01b03163b60000361044957604051634c9c8ce360e01b81526001600160a01b0382166004820152602401610153565b807f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc5b80546001600160a01b0319166001600160a01b039290921691909117905550565b34156101015760405163b398979f60e01b815260040160405180910390fd5b6001600160a01b0381166104d657604051633173bdd160e11b815260006004820152602401610153565b807fb53127684a568b3173ae13b9f8a6016e243e63b6e8ee1178d6a717850b5d610361046c565b80356001600160a01b038116811461051457600080fd5b919050565b634e487b7160e01b600052604160045260246000fd5b600082601f83011261054057600080fd5b813567ffffffffffffffff81111561055a5761055a610519565b604051601f8201601f19908116603f0116810167ffffffffffffffff8111828210171561058957610589610519565b6040528181528382016020018510156105a157600080fd5b816020850160208301376000918101602001919091529392505050565b600080604083850312156105d157600080fd5b6105da836104fd565b9150602083013567ffffffffffffffff8111156105f657600080fd5b6106028582860161052f565b9150509250929050565b60006020828403121561061e57600080fd5b610627826104fd565b9392505050565b60008060006060848603121561064357600080fd5b61064c846104fd565b925061065a602085016104fd565b9150604084013567ffffffffffffffff81111561067657600080fd5b6106828682870161052f565b9150509250925092565b6000825160005b818110156106ad5760208186018101518583015201610693565b50600092019182525091905056fea26469706673582212202a459f62cd1d03e8ebe48fa74b557bd32eb39e272122fd7a4602a8b38ec2dc7564736f6c634300081e0033";
const isSuperArgs$2 = (xs) => xs.length > 1;
class InitializableProxy__factory extends ethers.ContractFactory {
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
    return new ethers.Interface(_abi$2);
  }
  static connect(address, runner) {
    return new ethers.Contract(address, _abi$2, runner);
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
const _bytecode$1 = "0x61018060405234801561001157600080fd5b506040518060400160405280600781526020016641726f77616e6160c81b81525080604051806040016040528060018152602001603160f81b8152506040518060400160405280600781526020016641726f77616e6160c81b8152506040518060400160405280600381526020016241525760e81b815250816003908161009891906103f7565b5060046100a582826103f7565b506100b59150839050600561017e565b610120526100c481600661017e565b61014052815160208084019190912060e052815190820120610100524660a05261015160e05161010051604080517f8b73c3c69bb8fe3d512ecc4cf759cc79239f7b179b0ffacaa9a75d522b39400f60208201529081019290925260608201524660808201523060a082015260009060c00160405160208183030381529060405280519060200120905090565b60805250503060c052506b019d971e4fe8401e740000006101608190526101799033906101b1565b610548565b600060208351101561019a57610193836101f0565b90506101ab565b816101a584826103f7565b5060ff90505b92915050565b6001600160a01b0382166101e05760405163ec442f0560e01b8152600060048201526024015b60405180910390fd5b6101ec6000838361022e565b5050565b600080829050601f8151111561021b578260405163305a27a960e01b81526004016101d791906104b5565b805161022682610503565b179392505050565b6001600160a01b03831661025957806002600082825461024e9190610527565b909155506102cb9050565b6001600160a01b038316600090815260208190526040902054818110156102ac5760405163391434e360e21b81526001600160a01b038516600482015260248101829052604481018390526064016101d7565b6001600160a01b03841660009081526020819052604090209082900390555b6001600160a01b0382166102e757600280548290039055610306565b6001600160a01b03821660009081526020819052604090208054820190555b816001600160a01b0316836001600160a01b03167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef8360405161034b91815260200190565b60405180910390a3505050565b634e487b7160e01b600052604160045260246000fd5b600181811c9082168061038257607f821691505b6020821081036103a257634e487b7160e01b600052602260045260246000fd5b50919050565b601f8211156103f257806000526020600020601f840160051c810160208510156103cf5750805b601f840160051c820191505b818110156103ef57600081556001016103db565b50505b505050565b81516001600160401b0381111561041057610410610358565b6104248161041e845461036e565b846103a8565b6020601f82116001811461045857600083156104405750848201515b600019600385901b1c1916600184901b1784556103ef565b600084815260208120601f198516915b828110156104885787850151825560209485019460019092019101610468565b50848210156104a65786840151600019600387901b60f8161c191681555b50505050600190811b01905550565b602081526000825180602084015260005b818110156104e357602081860181015160408684010152016104c6565b506000604082850101526040601f19601f83011684010191505092915050565b805160208083015191908110156103a25760001960209190910360031b1b16919050565b808201808211156101ab57634e487b7160e01b600052601160045260246000fd5b60805160a05160c05160e05161010051610120516101405161016051610fef6105ad6000396000610234015260006107d9015260006107ac0152600061071e015260006106f6015260006106510152600061067b015260006106a50152610fef6000f3fe608060405234801561001057600080fd5b50600436106101005760003560e01c806379cc679011610097578063a9059cbb11610066578063a9059cbb14610209578063d505accf1461021c578063d5abeb011461022f578063dd62ed3e1461025657600080fd5b806379cc6790146101c05780637ecebe00146101d357806384b0196e146101e657806395d89b411461020157600080fd5b8063313ce567116100d3578063313ce5671461016b5780633644e5151461017a57806342966c681461018257806370a082311461019757600080fd5b806306fdde0314610105578063095ea7b31461012357806318160ddd1461014657806323b872dd14610158575b600080fd5b61010d61028f565b60405161011a9190610d39565b60405180910390f35b610136610131366004610d6f565b610321565b604051901515815260200161011a565b6002545b60405190815260200161011a565b610136610166366004610d99565b61033b565b6040516012815260200161011a565b61014a61035f565b610195610190366004610dd6565b61036e565b005b61014a6101a5366004610def565b6001600160a01b031660009081526020819052604090205490565b6101956101ce366004610d6f565b61037b565b61014a6101e1366004610def565b610394565b6101ee6103b2565b60405161011a9796959493929190610e0a565b61010d6103f8565b610136610217366004610d6f565b610407565b61019561022a366004610ea2565b610415565b61014a7f000000000000000000000000000000000000000000000000000000000000000081565b61014a610264366004610f15565b6001600160a01b03918216600090815260016020908152604080832093909416825291909152205490565b60606003805461029e90610f48565b80601f01602080910402602001604051908101604052809291908181526020018280546102ca90610f48565b80156103175780601f106102ec57610100808354040283529160200191610317565b820191906000526020600020905b8154815290600101906020018083116102fa57829003601f168201915b5050505050905090565b60003361032f818585610554565b60019150505b92915050565b600033610349858285610566565b6103548585856105e5565b506001949350505050565b6000610369610644565b905090565b610378338261076f565b50565b610386823383610566565b610390828261076f565b5050565b6001600160a01b038116600090815260076020526040812054610335565b6000606080600080600060606103c66107a5565b6103ce6107d2565b60408051600080825260208201909252600f60f81b9b939a50919850469750309650945092509050565b60606004805461029e90610f48565b60003361032f8185856105e5565b8342111561043e5760405163313c898160e11b8152600481018590526024015b60405180910390fd5b60007f6e71edae12b1b97f4d1f60370fef10105fa2faae0126114a169c64845d6126c988888861048b8c6001600160a01b0316600090815260076020526040902080546001810190915590565b6040805160208101969096526001600160a01b0394851690860152929091166060840152608083015260a082015260c0810186905260e00160405160208183030381529060405280519060200120905060006104e6826107ff565b905060006104f68287878761082c565b9050896001600160a01b0316816001600160a01b03161461053d576040516325c0072360e11b81526001600160a01b0380831660048301528b166024820152604401610435565b6105488a8a8a610554565b50505050505050505050565b610561838383600161085a565b505050565b6001600160a01b038381166000908152600160209081526040808320938616835292905220546000198110156105df57818110156105d057604051637dc7a0d960e11b81526001600160a01b03841660048201526024810182905260448101839052606401610435565b6105df8484848403600061085a565b50505050565b6001600160a01b03831661060f57604051634b637e8f60e11b815260006004820152602401610435565b6001600160a01b0382166106395760405163ec442f0560e01b815260006004820152602401610435565b61056183838361092f565b6000306001600160a01b037f00000000000000000000000000000000000000000000000000000000000000001614801561069d57507f000000000000000000000000000000000000000000000000000000000000000046145b156106c757507f000000000000000000000000000000000000000000000000000000000000000090565b610369604080517f8b73c3c69bb8fe3d512ecc4cf759cc79239f7b179b0ffacaa9a75d522b39400f60208201527f0000000000000000000000000000000000000000000000000000000000000000918101919091527f000000000000000000000000000000000000000000000000000000000000000060608201524660808201523060a082015260009060c00160405160208183030381529060405280519060200120905090565b6001600160a01b03821661079957604051634b637e8f60e11b815260006004820152602401610435565b6103908260008361092f565b60606103697f00000000000000000000000000000000000000000000000000000000000000006005610a59565b60606103697f00000000000000000000000000000000000000000000000000000000000000006006610a59565b600061033561080c610644565b8360405161190160f01b8152600281019290925260228201526042902090565b60008060008061083e88888888610b04565b92509250925061084e8282610bd3565b50909695505050505050565b6001600160a01b0384166108845760405163e602df0560e01b815260006004820152602401610435565b6001600160a01b0383166108ae57604051634a1406b160e11b815260006004820152602401610435565b6001600160a01b03808516600090815260016020908152604080832093871683529290522082905580156105df57826001600160a01b0316846001600160a01b03167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b9258460405161092191815260200190565b60405180910390a350505050565b6001600160a01b03831661095a57806002600082825461094f9190610f82565b909155506109cc9050565b6001600160a01b038316600090815260208190526040902054818110156109ad5760405163391434e360e21b81526001600160a01b03851660048201526024810182905260448101839052606401610435565b6001600160a01b03841660009081526020819052604090209082900390555b6001600160a01b0382166109e857600280548290039055610a07565b6001600160a01b03821660009081526020819052604090208054820190555b816001600160a01b0316836001600160a01b03167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef83604051610a4c91815260200190565b60405180910390a3505050565b606060ff8314610a7357610a6c83610c8c565b9050610335565b818054610a7f90610f48565b80601f0160208091040260200160405190810160405280929190818152602001828054610aab90610f48565b8015610af85780601f10610acd57610100808354040283529160200191610af8565b820191906000526020600020905b815481529060010190602001808311610adb57829003601f168201915b50505050509050610335565b600080807f7fffffffffffffffffffffffffffffff5d576e7357a4501ddfe92f46681b20a0841115610b3f5750600091506003905082610bc9565b604080516000808252602082018084528a905260ff891692820192909252606081018790526080810186905260019060a0016020604051602081039080840390855afa158015610b93573d6000803e3d6000fd5b5050604051601f1901519150506001600160a01b038116610bbf57506000925060019150829050610bc9565b9250600091508190505b9450945094915050565b6000826003811115610be757610be7610fa3565b03610bf0575050565b6001826003811115610c0457610c04610fa3565b03610c225760405163f645eedf60e01b815260040160405180910390fd5b6002826003811115610c3657610c36610fa3565b03610c575760405163fce698f760e01b815260048101829052602401610435565b6003826003811115610c6b57610c6b610fa3565b03610390576040516335e2f38360e21b815260048101829052602401610435565b60606000610c9983610ccb565b604080516020808252818301909252919250600091906020820181803683375050509182525060208101929092525090565b600060ff8216601f81111561033557604051632cd44ac360e21b815260040160405180910390fd5b6000815180845260005b81811015610d1957602081850181015186830182015201610cfd565b506000602082860101526020601f19601f83011685010191505092915050565b602081526000610d4c6020830184610cf3565b9392505050565b80356001600160a01b0381168114610d6a57600080fd5b919050565b60008060408385031215610d8257600080fd5b610d8b83610d53565b946020939093013593505050565b600080600060608486031215610dae57600080fd5b610db784610d53565b9250610dc560208501610d53565b929592945050506040919091013590565b600060208284031215610de857600080fd5b5035919050565b600060208284031215610e0157600080fd5b610d4c82610d53565b60ff60f81b8816815260e060208201526000610e2960e0830189610cf3565b8281036040840152610e3b8189610cf3565b606084018890526001600160a01b038716608085015260a0840186905283810360c08501528451808252602080870193509091019060005b81811015610e91578351835260209384019390920191600101610e73565b50909b9a5050505050505050505050565b600080600080600080600060e0888a031215610ebd57600080fd5b610ec688610d53565b9650610ed460208901610d53565b95506040880135945060608801359350608088013560ff81168114610ef857600080fd5b9699959850939692959460a0840135945060c09093013592915050565b60008060408385031215610f2857600080fd5b610f3183610d53565b9150610f3f60208401610d53565b90509250929050565b600181811c90821680610f5c57607f821691505b602082108103610f7c57634e487b7160e01b600052602260045260246000fd5b50919050565b8082018082111561033557634e487b7160e01b600052601160045260246000fd5b634e487b7160e01b600052602160045260246000fdfea2646970667358221220f6302ce700503012fb4cecbe365e0546ba2dd870985fdb4d122a49653c9a8a6764736f6c634300081e0033";
const isSuperArgs$1 = (xs) => xs.length > 1;
class Arowana__factory extends ethers.ContractFactory {
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
    return new ethers.Interface(_abi$1);
  }
  static connect(address, runner) {
    return new ethers.Contract(address, _abi$1, runner);
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
const _bytecode = "0x61018060405234801561001157600080fd5b506040516118a63803806118a68339810160408190526100309161045f565b338480604051806040016040528060018152602001603160f81b8152508787816003908161005e9190610571565b50600461006b8282610571565b5061007b91508390506005610175565b6101205261008a816006610175565b61014052815160208084019190912060e052815190820120610100524660a05261011760e05161010051604080517f8b73c3c69bb8fe3d512ecc4cf759cc79239f7b179b0ffacaa9a75d522b39400f60208201529081019290925260608201524660808201523060a082015260009060c00160405160208183030381529060405280519060200120905090565b60805250503060c052506001600160a01b03811661015057604051631e4fbdf760e01b8152600060048201526024015b60405180910390fd5b610159816101a8565b5060ff82166101605261016c33826101fa565b505050506106a7565b60006020835110156101915761018a83610234565b90506101a2565b8161019c8482610571565b5060ff90505b92915050565b600880546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b6001600160a01b0382166102245760405163ec442f0560e01b815260006004820152602401610147565b61023060008383610272565b5050565b600080829050601f8151111561025f578260405163305a27a960e01b8152600401610147919061062f565b805161026a82610662565b179392505050565b6001600160a01b03831661029d5780600260008282546102929190610686565b9091555061030f9050565b6001600160a01b038316600090815260208190526040902054818110156102f05760405163391434e360e21b81526001600160a01b03851660048201526024810182905260448101839052606401610147565b6001600160a01b03841660009081526020819052604090209082900390555b6001600160a01b03821661032b5760028054829003905561034a565b6001600160a01b03821660009081526020819052604090208054820190555b816001600160a01b0316836001600160a01b03167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef8360405161038f91815260200190565b60405180910390a3505050565b634e487b7160e01b600052604160045260246000fd5b60005b838110156103cd5781810151838201526020016103b5565b50506000910152565b600082601f8301126103e757600080fd5b81516001600160401b038111156104005761040061039c565b604051601f8201601f19908116603f011681016001600160401b038111828210171561042e5761042e61039c565b60405281815283820160200185101561044657600080fd5b6104578260208301602087016103b2565b949350505050565b6000806000806080858703121561047557600080fd5b84516001600160401b0381111561048b57600080fd5b610497878288016103d6565b602087015190955090506001600160401b038111156104b557600080fd5b6104c1878288016103d6565b935050604085015160ff811681146104d857600080fd5b6060959095015193969295505050565b600181811c908216806104fc57607f821691505b60208210810361051c57634e487b7160e01b600052602260045260246000fd5b50919050565b601f82111561056c57806000526020600020601f840160051c810160208510156105495750805b601f840160051c820191505b818110156105695760008155600101610555565b50505b505050565b81516001600160401b0381111561058a5761058a61039c565b61059e8161059884546104e8565b84610522565b6020601f8211600181146105d257600083156105ba5750848201515b600019600385901b1c1916600184901b178455610569565b600084815260208120601f198516915b8281101561060257878501518255602094850194600190920191016105e2565b50848210156106205786840151600019600387901b60f8161c191681555b50505050600190811b01905550565b602081526000825180602084015261064e8160408501602087016103b2565b601f01601f19169190910160400192915050565b8051602080830151919081101561051c5760001960209190910360031b1b16919050565b808201808211156101a257634e487b7160e01b600052601160045260246000fd5b60805160a05160c05160e0516101005161012051610140516101605161119a61070c600039600061019e015260006109840152600061095701526000610814015260006107ec01526000610747015260006107710152600061079b015261119a6000f3fe608060405234801561001057600080fd5b506004361061012c5760003560e01c806379cc6790116100ad578063a0712d6811610071578063a0712d681461028d578063a9059cbb146102a0578063d505accf146102b3578063dd62ed3e146102c6578063f2fde38b146102ff57600080fd5b806379cc6790146102295780637ecebe001461023c57806384b0196e1461024f5780638da5cb5b1461026a57806395d89b411461028557600080fd5b80633644e515116100f45780633644e515146101c857806340c10f19146101d057806342966c68146101e557806370a08231146101f8578063715018a61461022157600080fd5b806306fdde0314610131578063095ea7b31461014f57806318160ddd1461017257806323b872dd14610184578063313ce56714610197575b600080fd5b610139610312565b6040516101469190610ee4565b60405180910390f35b61016261015d366004610f1a565b6103a4565b6040519015158152602001610146565b6002545b604051908152602001610146565b610162610192366004610f44565b6103be565b60405160ff7f0000000000000000000000000000000000000000000000000000000000000000168152602001610146565b6101766103e2565b6101e36101de366004610f1a565b6103f1565b005b6101e36101f3366004610f81565b610407565b610176610206366004610f9a565b6001600160a01b031660009081526020819052604090205490565b6101e3610414565b6101e3610237366004610f1a565b610428565b61017661024a366004610f9a565b61043d565b61025761045b565b6040516101469796959493929190610fb5565b6008546040516001600160a01b039091168152602001610146565b6101396104a1565b6101e361029b366004610f81565b6104b0565b6101626102ae366004610f1a565b6104c2565b6101e36102c136600461104d565b6104d0565b6101766102d43660046110c0565b6001600160a01b03918216600090815260016020908152604080832093909416825291909152205490565b6101e361030d366004610f9a565b61060f565b606060038054610321906110f3565b80601f016020809104026020016040519081016040528092919081815260200182805461034d906110f3565b801561039a5780601f1061036f5761010080835404028352916020019161039a565b820191906000526020600020905b81548152906001019060200180831161037d57829003601f168201915b5050505050905090565b6000336103b281858561064a565b60019150505b92915050565b6000336103cc85828561065c565b6103d78585856106db565b506001949350505050565b60006103ec61073a565b905090565b6103f9610865565b6104038282610892565b5050565b61041133826108c8565b50565b61041c610865565b61042660006108fe565b565b61043382338361065c565b61040382826108c8565b6001600160a01b0381166000908152600760205260408120546103b8565b60006060806000806000606061046f610950565b61047761097d565b60408051600080825260208201909252600f60f81b9b939a50919850469750309650945092509050565b606060048054610321906110f3565b6104b8610865565b6104113382610892565b6000336103b28185856106db565b834211156104f95760405163313c898160e11b8152600481018590526024015b60405180910390fd5b60007f6e71edae12b1b97f4d1f60370fef10105fa2faae0126114a169c64845d6126c98888886105468c6001600160a01b0316600090815260076020526040902080546001810190915590565b6040805160208101969096526001600160a01b0394851690860152929091166060840152608083015260a082015260c0810186905260e00160405160208183030381529060405280519060200120905060006105a1826109aa565b905060006105b1828787876109d7565b9050896001600160a01b0316816001600160a01b0316146105f8576040516325c0072360e11b81526001600160a01b0380831660048301528b1660248201526044016104f0565b6106038a8a8a61064a565b50505050505050505050565b610617610865565b6001600160a01b03811661064157604051631e4fbdf760e01b8152600060048201526024016104f0565b610411816108fe565b6106578383836001610a05565b505050565b6001600160a01b038381166000908152600160209081526040808320938616835292905220546000198110156106d557818110156106c657604051637dc7a0d960e11b81526001600160a01b038416600482015260248101829052604481018390526064016104f0565b6106d584848484036000610a05565b50505050565b6001600160a01b03831661070557604051634b637e8f60e11b8152600060048201526024016104f0565b6001600160a01b03821661072f5760405163ec442f0560e01b8152600060048201526024016104f0565b610657838383610ada565b6000306001600160a01b037f00000000000000000000000000000000000000000000000000000000000000001614801561079357507f000000000000000000000000000000000000000000000000000000000000000046145b156107bd57507f000000000000000000000000000000000000000000000000000000000000000090565b6103ec604080517f8b73c3c69bb8fe3d512ecc4cf759cc79239f7b179b0ffacaa9a75d522b39400f60208201527f0000000000000000000000000000000000000000000000000000000000000000918101919091527f000000000000000000000000000000000000000000000000000000000000000060608201524660808201523060a082015260009060c00160405160208183030381529060405280519060200120905090565b6008546001600160a01b031633146104265760405163118cdaa760e01b81523360048201526024016104f0565b6001600160a01b0382166108bc5760405163ec442f0560e01b8152600060048201526024016104f0565b61040360008383610ada565b6001600160a01b0382166108f257604051634b637e8f60e11b8152600060048201526024016104f0565b61040382600083610ada565b600880546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b60606103ec7f00000000000000000000000000000000000000000000000000000000000000006005610c04565b60606103ec7f00000000000000000000000000000000000000000000000000000000000000006006610c04565b60006103b86109b761073a565b8360405161190160f01b8152600281019290925260228201526042902090565b6000806000806109e988888888610caf565b9250925092506109f98282610d7e565b50909695505050505050565b6001600160a01b038416610a2f5760405163e602df0560e01b8152600060048201526024016104f0565b6001600160a01b038316610a5957604051634a1406b160e11b8152600060048201526024016104f0565b6001600160a01b03808516600090815260016020908152604080832093871683529290522082905580156106d557826001600160a01b0316846001600160a01b03167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92584604051610acc91815260200190565b60405180910390a350505050565b6001600160a01b038316610b05578060026000828254610afa919061112d565b90915550610b779050565b6001600160a01b03831660009081526020819052604090205481811015610b585760405163391434e360e21b81526001600160a01b038516600482015260248101829052604481018390526064016104f0565b6001600160a01b03841660009081526020819052604090209082900390555b6001600160a01b038216610b9357600280548290039055610bb2565b6001600160a01b03821660009081526020819052604090208054820190555b816001600160a01b0316836001600160a01b03167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef83604051610bf791815260200190565b60405180910390a3505050565b606060ff8314610c1e57610c1783610e37565b90506103b8565b818054610c2a906110f3565b80601f0160208091040260200160405190810160405280929190818152602001828054610c56906110f3565b8015610ca35780601f10610c7857610100808354040283529160200191610ca3565b820191906000526020600020905b815481529060010190602001808311610c8657829003601f168201915b505050505090506103b8565b600080807f7fffffffffffffffffffffffffffffff5d576e7357a4501ddfe92f46681b20a0841115610cea5750600091506003905082610d74565b604080516000808252602082018084528a905260ff891692820192909252606081018790526080810186905260019060a0016020604051602081039080840390855afa158015610d3e573d6000803e3d6000fd5b5050604051601f1901519150506001600160a01b038116610d6a57506000925060019150829050610d74565b9250600091508190505b9450945094915050565b6000826003811115610d9257610d9261114e565b03610d9b575050565b6001826003811115610daf57610daf61114e565b03610dcd5760405163f645eedf60e01b815260040160405180910390fd5b6002826003811115610de157610de161114e565b03610e025760405163fce698f760e01b8152600481018290526024016104f0565b6003826003811115610e1657610e1661114e565b03610403576040516335e2f38360e21b8152600481018290526024016104f0565b60606000610e4483610e76565b604080516020808252818301909252919250600091906020820181803683375050509182525060208101929092525090565b600060ff8216601f8111156103b857604051632cd44ac360e21b815260040160405180910390fd5b6000815180845260005b81811015610ec457602081850181015186830182015201610ea8565b506000602082860101526020601f19601f83011685010191505092915050565b602081526000610ef76020830184610e9e565b9392505050565b80356001600160a01b0381168114610f1557600080fd5b919050565b60008060408385031215610f2d57600080fd5b610f3683610efe565b946020939093013593505050565b600080600060608486031215610f5957600080fd5b610f6284610efe565b9250610f7060208501610efe565b929592945050506040919091013590565b600060208284031215610f9357600080fd5b5035919050565b600060208284031215610fac57600080fd5b610ef782610efe565b60ff60f81b8816815260e060208201526000610fd460e0830189610e9e565b8281036040840152610fe68189610e9e565b606084018890526001600160a01b038716608085015260a0840186905283810360c08501528451808252602080870193509091019060005b8181101561103c57835183526020938401939092019160010161101e565b50909b9a5050505050505050505050565b600080600080600080600060e0888a03121561106857600080fd5b61107188610efe565b965061107f60208901610efe565b95506040880135945060608801359350608088013560ff811681146110a357600080fd5b9699959850939692959460a0840135945060c09093013592915050565b600080604083850312156110d357600080fd5b6110dc83610efe565b91506110ea60208401610efe565b90509250929050565b600181811c9082168061110757607f821691505b60208210810361112757634e487b7160e01b600052602260045260246000fd5b50919050565b808201808211156103b857634e487b7160e01b600052601160045260246000fd5b634e487b7160e01b600052602160045260246000fdfea2646970667358221220ce45c62bed66623730be98422a9267b4a12c5e9b1730188d6b07e35e1629afea64736f6c634300081e0033";
const isSuperArgs = (xs) => xs.length > 1;
class ERC20Mock__factory extends ethers.ContractFactory {
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
    return new ethers.Interface(_abi);
  }
  static connect(address, runner) {
    return new ethers.Contract(address, _abi, runner);
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
  arbitrum: index$f,
  interfaces: index$b,
  libraries: index$8,
  lockSol: index$l,
  proxy: index$6,
  tokens: index$3
});

var index$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  arbitrum: index$15,
  contracts: index$2,
  openzeppelin: index$m
});

var index = /*#__PURE__*/Object.freeze({
  __proto__: null,
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
  return ethers.getAddress(ethersOpt.toFixedHex(bn, 20));
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
    gasLimitMultiplier: 1.3,
    gasPriceBidMultiplier: 2,
    baseFeeMultiplier: 5,
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
    gasLimitMultiplier: 1.3,
    gasPriceBidMultiplier: 2,
    baseFeeMultiplier: 5,
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
  const parsed = ethers.AbiCoder.defaultAbiCoder().decode(
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
  return ethers.keccak256(
    ethers.concat([
      "0x69",
      ethers.encodeRlp([
        bnToHex(chainId),
        ethersOpt.toFixedHex(messageNumber, 32),
        sender,
        bnToHex(parentBaseFee),
        bnToHex(messageData.l1Value),
        bnToHex(messageData.maxFeePerGas),
        bnToHex(messageData.gasLimit),
        messageData.destAddress === ethers.ZeroAddress ? "0x" : messageData.destAddress,
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
    const callDataSize = ethers.dataLength(data || "0x");
    const gasPriceBid = childBaseFee * BigInt(gasPriceBidMultiplier);
    const maxFeePerGas = childBaseFee * BigInt(baseFeeMultiplier);
    const [maxSubmissionCost, gasLimit] = await Promise.all([
      inbox.calculateRetryableSubmissionFee(callDataSize, parentBaseFee).then((f) => f * BigInt(submissionFeeMultiplier)),
      nodeInterface.estimateRetryableTicket.estimateGas(
        from,
        ethers.parseEther("1") + l2CallValue,
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
    totalSupply: Number(ethers.formatUnits(totalSupply, _decimals)),
    balance: Number(ethers.formatUnits(balance, _decimals))
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
    l1Supply: Number(ethers.formatUnits(l1Supply, l1Decimals)),
    l1Balance: Number(ethers.formatUnits(l1Balance, l1Decimals)),
    l2Supply: Number(ethers.formatUnits(l2Supply, l2Decimals)),
    l2Balance: Number(ethers.formatUnits(l2Balance, l2Decimals))
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
  const _from = ethers.getAddress(from);
  const _to = ethers.getAddress(to || from);
  const _value = ethers.parseUnits(String(value), l1Decimals);
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

exports.ARB_RETRYABLE_TX = ARB_RETRYABLE_TX;
exports.ArbHelper = ArbHelper;
exports.NODE_INTERFACE_ADDRESS = NODE_INTERFACE_ADDRESS;
exports.addressFromBigInt = addressFromBigInt;
exports.arbNetworks = arbNetworks;
exports.bnToHex = bnToHex;
exports.bridgeArwArb = bridgeArwArb;
exports.contracts = index;
exports.getArbNetwork = getArbNetwork;
exports.getArwBalance = getArwBalance;
exports.getParentToChildMessageGasParams = getParentToChildMessageGasParams;
exports.getRetryableCreationId = getRetryableCreationId;
exports.getTokenInfo = getTokenInfo;
exports.submitRetryableMessageDataParser = submitRetryableMessageDataParser;
