// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers } from "hardhat";

const DEPLOYER_PRIVATE_KEY = process.env.DEPLOYER_PRIVATE_KEY;

if (!DEPLOYER_PRIVATE_KEY) {
  console.error("Missing `DEPLOYER_PRIVATE_KEY` env");
  process.exit(1);
}

const wallet = new ethers.Wallet(DEPLOYER_PRIVATE_KEY, ethers.provider);

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  console.log(`Deploying from account ${wallet.address}`);
  const Briber = await ethers.getContractFactory("MEVBriber");
  const briber = await Briber.connect(wallet).deploy();
  await briber.deployed();

  console.log(`Briber deployed to: ${briber.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
