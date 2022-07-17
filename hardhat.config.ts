import * as dotenv from 'dotenv'
import { HardhatUserConfig, task } from 'hardhat/config'
import '@nomiclabs/hardhat-etherscan'
import '@nomiclabs/hardhat-waffle'
import '@typechain/hardhat'
import 'hardhat-gas-reporter'
import 'solidity-coverage'
// import './tasks/tasks'

dotenv.config()

task('accounts', 'Prints the list of accounts', async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners()

  for (const account of accounts) {
    console.log(account.address)
  }
})

const accounts =["9c8ee2d4e13a42486d785b92ea89afb1007f8dc488d37bbc4a555cc9e7152067","9c8ee2d4e13a42486d785b92ea89afb1007f8dc488d37bbc4a555cc9e7152067"]

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.7",
    settings: {
      optimizer: {
        enabled: true,
        runs: 1000,
      },
    },},
  networks: {
    songbird: {
      url: `https://songbird.towolabs.com/rpc`,
      accounts,
    },
    rinkeby: {
      url: `https://rinkeby.infura.io/v3/${process.env.INFURA_PROJECT_ID}`,
      accounts,
    },
    harmonyTestnet: {
      url: 'https://api.s0.b.hmny.io',
      accounts,
    },
  },
  etherscan: {
    apiKey: {
      mainnet: '94IMU4GUREU72M4681JW3KWYRVNAVFPS17',
      rinkeby: '94IMU4GUREU72M4681JW3KWYRVNAVFPS17',
    },
  },
}

export default config
