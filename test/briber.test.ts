import { ethers } from "hardhat";
import { expect } from "chai";

import { MevBriber } from "../typechain/MevBriber";
import { Iweth } from "../typechain/Iweth";
import { parseUnits } from "ethers/lib/utils";

const WETH_ADDRESS = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";

describe("MEV Briber", function () {
  it("Should be able to bribe", async function () {
    const [user] = await ethers.getSigners();

    const Briber = await ethers.getContractFactory("MEVBriber");
    const briber = (await Briber.deploy()) as MevBriber;
    await briber.deployed();

    const bribeAmount = parseUnits("1");

    const weth = (await ethers.getContractAt("IWETH", WETH_ADDRESS)) as Iweth;
    await weth.deposit({ value: bribeAmount });

    const target = WETH_ADDRESS;
    const payload = weth.interface.encodeFunctionData("balanceOf", [
      user.address,
    ]);
    const resultMatch = weth.interface.encodeFunctionResult("balanceOf", [
      bribeAmount,
    ]);

    await weth.approve(briber.address, bribeAmount);
    await briber.check32BytesAndSendWETH(
      bribeAmount,
      target,
      payload,
      resultMatch
    );
  });
});
