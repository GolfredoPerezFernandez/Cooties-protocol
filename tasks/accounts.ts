// import { task } from 'hardhat/config'
let task: any
task(
  'accounts',
  'Prints the list of accounts',
  async (taskArgs: any, hre: any) => {
    const accounts = await hre.ethers.getSigners()

    for (const account of accounts) {
      console.log(account.address)
    }
  }
)
