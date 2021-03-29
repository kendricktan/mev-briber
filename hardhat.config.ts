require("dotenv").config(); // eslint-disable-line
import { HardhatUserConfig } from "hardhat/config";

import "@nomiclabs/hardhat-waffle";
import "@nomiclabs/hardhat-ethers";
import "hardhat-typechain";

const config: HardhatUserConfig = {
  solidity: "0.7.3",
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545",
    },
    remote: {
      url: process.env.REMOTE_URL
        ? process.env.REMOTE_URL
        : "http://127.0.0.1:8545",
    },
    hardhat: {
      forking: {
        enabled: true,
        url: process.env.RPC_URL
          ? process.env.RPC_URL
          : "http://127.0.0.1:8545",
      },
      blockGasLimit: 20000000,
      chainId: 1,
    },
  },
  mocha: {
    timeout: 60000,
  },
};

export default config;
