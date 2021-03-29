import { ethers } from "hardhat";
import { expect } from "chai";

import { MevBriber } from "../typechain/MevBriber";
import { Iweth } from "../typechain/Iweth";
import { BigNumberish } from "ethers";
import { parseUnits } from "ethers/lib/utils";

import { signTypedData_v4, TypedMessage } from "eth-sig-util";

const WETH_ADDRESS = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";

type PermitMessage = {
  owner: string;
  spender: string;
  value: BigNumberish;
  nonce: number;
  deadline: number;
};

const domain = [
  { name: "name", type: "string" },
  { name: "version", type: "string" },
  { name: "chainId", type: "uint256" },
  { name: "verifyingContract", type: "address" },
];

const permit = [
  { name: "owner", type: "address" },
  { name: "spender", type: "address" },
  { name: "value", type: "uint256" },
  { name: "nonce", type: "uint256" },
  { name: "deadline", type: "uint256" },
];

async function signPermit(
  contractAddress: string,
  privateKey: string,
  message: PermitMessage
) {
  const domainData = {
    name: "MEVBriber",
    version: "1",
    chainId: "1",
    verifyingContract: contractAddress,
  };

  const data = {
    types: {
      EIP712Domain: domain,
      Permit: permit,
    },
    domain: domainData,
    primaryType: "Permit",
    message,
  };

  const pk = Buffer.from(privateKey.substring(2), "hex");

  // eslint-disable-next-line
  const sig = signTypedData_v4(pk, { data } as any);

  return {
    v: parseInt(sig.substring(130, 132), 16),
    r: Buffer.from(sig.substring(2, 66), "hex"),
    s: Buffer.from(sig.substring(66, 130), "hex"),
  };
}

const getFuture = async () => {
  const blockNum = await ethers.provider.getBlockNumber();
  const block = await ethers.provider.getBlock(blockNum);
  return block.timestamp + 100;
};

describe("MEV Briber", function () {
  it("Bribe logic", async function () {
    const userThatCanSign = ethers.Wallet.createRandom().connect(
      ethers.provider
    );

    const Briber = await ethers.getContractFactory("MEVBriber");
    const briber = (await Briber.deploy()) as MevBriber;
    await briber.deployed();

    const bribeAmount = parseUnits("1");

    const weth = (await ethers.getContractAt("IWETH", WETH_ADDRESS)) as Iweth;
    await weth.deposit({ value: bribeAmount });
    await weth.transfer(userThatCanSign.address, bribeAmount);
    await weth
      .connect(userThatCanSign)
      .approve(briber.address, bribeAmount, { gasPrice: 0 });

    const target = WETH_ADDRESS;
    const payload = weth.interface.encodeFunctionData("balanceOf", [
      userThatCanSign.address,
    ]);
    const resultMatch = weth.interface.encodeFunctionResult("balanceOf", [
      bribeAmount,
    ]);

    const deadline = await getFuture();

    const signature = await signPermit(
      briber.address,
      userThatCanSign.privateKey,
      {
        owner: userThatCanSign.address,
        spender: briber.address,
        value: bribeAmount.toString(),
        nonce: 0,
        deadline,
      }
    );

    const tx = await briber.check32BytesAndSendWETH(
      userThatCanSign.address,
      briber.address,
      bribeAmount,
      deadline,
      signature.v,
      signature.r,
      signature.s,
      target,
      payload,
      resultMatch
    );
    const txResp = await tx.wait();

    const blockData = await ethers.provider.getBlock(txResp.blockNumber);

    expect(txResp.logs[2].topics[2].toLowerCase()).to.be.include(
      blockData.miner.slice(2).toLowerCase()
    );

    try {
      await briber.check32BytesAndSendWETH(
        userThatCanSign.address,
        briber.address,
        bribeAmount,
        deadline,
        signature.v,
        signature.r,
        signature.s,
        target,
        payload,
        resultMatch
      );
      throw new Error("Cannot use same nonce twice");
    } catch (e) {
      expect(e.toString()).to.include('invalid signature')
    }
  });
});
