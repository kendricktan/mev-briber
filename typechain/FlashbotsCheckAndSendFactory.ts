/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import { Contract, ContractFactory, Overrides } from "@ethersproject/contracts";

import type { FlashbotsCheckAndSend } from "./FlashbotsCheckAndSend";

export class FlashbotsCheckAndSendFactory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(overrides?: Overrides): Promise<FlashbotsCheckAndSend> {
    return super.deploy(overrides || {}) as Promise<FlashbotsCheckAndSend>;
  }
  getDeployTransaction(overrides?: Overrides): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): FlashbotsCheckAndSend {
    return super.attach(address) as FlashbotsCheckAndSend;
  }
  connect(signer: Signer): FlashbotsCheckAndSendFactory {
    return super.connect(signer) as FlashbotsCheckAndSendFactory;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): FlashbotsCheckAndSend {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as FlashbotsCheckAndSend;
  }
}

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_target",
        type: "address",
      },
      {
        internalType: "bytes",
        name: "_payload",
        type: "bytes",
      },
      {
        internalType: "bytes32",
        name: "_resultMatch",
        type: "bytes32",
      },
    ],
    name: "check32BytesAndSend",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address[]",
        name: "_targets",
        type: "address[]",
      },
      {
        internalType: "bytes[]",
        name: "_payloads",
        type: "bytes[]",
      },
      {
        internalType: "bytes32[]",
        name: "_resultMatches",
        type: "bytes32[]",
      },
    ],
    name: "check32BytesAndSendMulti",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_target",
        type: "address",
      },
      {
        internalType: "bytes",
        name: "_payload",
        type: "bytes",
      },
      {
        internalType: "bytes",
        name: "_resultMatch",
        type: "bytes",
      },
    ],
    name: "checkBytesAndSend",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address[]",
        name: "_targets",
        type: "address[]",
      },
      {
        internalType: "bytes[]",
        name: "_payloads",
        type: "bytes[]",
      },
      {
        internalType: "bytes[]",
        name: "_resultMatches",
        type: "bytes[]",
      },
    ],
    name: "checkBytesAndSendMulti",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b5061084d806100206000396000f3fe60806040526004361061003f5760003560e01c806324835805146100445780633676290c1461005957806386b738be1461006c5780639af96d7e1461007f575b600080fd5b61005761005236600461051b565b610092565b005b610057610067366004610667565b6100cf565b61005761007a3660046104c6565b610170565b61005761008d36600461058c565b61017b565b61009d8383836101ef565b60405141903480156108fc02916000818181858888f193505050501580156100c9573d6000803e3d6000fd5b50505050565b81518351146100dd57600080fd5b80518351146100eb57600080fd5b60005b83518110156101435761013b84828151811061010657fe5b602002602001015184838151811061011a57fe5b602002602001015184848151811061012e57fe5b60200260200101516101ef565b6001016100ee565b5060405141903480156108fc02916000818181858888f193505050501580156100c9573d6000803e3d6000fd5b61009d8383836102aa565b815183511461018957600080fd5b805183511461019757600080fd5b60005b8351811015610143576101e78482815181106101b257fe5b60200260200101518483815181106101c657fe5b60200260200101518484815181106101da57fe5b60200260200101516102aa565b60010161019a565b60006060846001600160a01b03168460405161020b91906106e1565b600060405180830381855afa9150503d8060008114610246576040519150601f19603f3d011682016040523d82523d6000602084013e61024b565b606091505b5091509150816102765760405162461bcd60e51b815260040161026d9061077c565b60405180910390fd5b80805190602001208380519060200120146102a35760405162461bcd60e51b815260040161026d9061079e565b5050505050565b60006060846001600160a01b0316846040516102c691906106e1565b600060405180830381855afa9150503d8060008114610301576040519150601f19603f3d011682016040523d82523d6000602084013e610306565b606091505b5091509150816103285760405162461bcd60e51b815260040161026d9061077c565b60208151101561034a5760405162461bcd60e51b815260040161026d9061071a565b602081015183811461036e5760405162461bcd60e51b815260040161026d90610751565b505050505050565b80356001600160a01b038116811461038d57600080fd5b919050565b600082601f8301126103a2578081fd5b81356103b56103b0826107f9565b6107d5565b8181529150602080830190848101818402860182018710156103d657600080fd5b60005b848110156103fc576103ea82610376565b845292820192908201906001016103d9565b505050505092915050565b600082601f830112610417578081fd5b81356104256103b0826107f9565b818152915060208083019084810160005b848110156103fc5761044d888484358a010161045f565b84529282019290820190600101610436565b600082601f83011261046f578081fd5b813567ffffffffffffffff81111561048357fe5b610496601f8201601f19166020016107d5565b91508082528360208285010111156104ad57600080fd5b8060208401602084013760009082016020015292915050565b6000806000606084860312156104da578283fd5b6104e384610376565b9250602084013567ffffffffffffffff8111156104fe578283fd5b61050a8682870161045f565b925050604084013590509250925092565b60008060006060848603121561052f578283fd5b61053884610376565b9250602084013567ffffffffffffffff80821115610554578384fd5b6105608783880161045f565b93506040860135915080821115610575578283fd5b506105828682870161045f565b9150509250925092565b6000806000606084860312156105a0578283fd5b833567ffffffffffffffff808211156105b7578485fd5b6105c387838801610392565b94506020915081860135818111156105d9578485fd5b6105e588828901610407565b9450506040860135818111156105f9578384fd5b86019050601f8101871361060b578283fd5b80356106196103b0826107f9565b81815283810190838501858402850186018b1015610635578687fd5b8694505b83851015610657578035835260019490940193918501918501610639565b5080955050505050509250925092565b60008060006060848603121561067b578283fd5b833567ffffffffffffffff80821115610692578485fd5b61069e87838801610392565b945060208601359150808211156106b3578384fd5b6106bf87838801610407565b935060408601359150808211156106d4578283fd5b5061058286828701610407565b60008251815b8181101561070157602081860181015185830152016106e7565b8181111561070f5782828501525b509190910192915050565b6020808252601b908201527f726573706f6e7365206c657373207468616e2033322062797465730000000000604082015260600190565b6020808252601190820152700e4cae6e0dedce6ca40dad2e6dac2e8c6d607b1b604082015260600190565b602080825260089082015267217375636365737360c01b604082015260600190565b60208082526017908201527f726573706f6e7365206279746573206d69736d61746368000000000000000000604082015260600190565b60405181810167ffffffffffffffff811182821017156107f157fe5b604052919050565b600067ffffffffffffffff82111561080d57fe5b506020908102019056fea2646970667358221220d711138d60bfb4f4aa28c17237f8f8109cca6950179079c3cc66457a087d44cb64736f6c63430007030033";
