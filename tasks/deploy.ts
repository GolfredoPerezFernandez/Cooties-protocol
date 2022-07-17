// import { task } from 'hardhat/config'
// import '@nomiclabs/hardhat-waffle'
import { deployNFTContract } from '../test/nft-mint/11.deploy'
let task: any
task('deploy')
  .addParam('variables')
  .setAction(async (taskArgs: any) => {
    console.log('variables is: ', taskArgs.variables)

    const { variables } = taskArgs
    if (variables !== 'test' && variables !== 'main' && variables !== 'local') {
      return console.log(
        'variables type should be: "test" or "main" or "local"'
      )
    }

    const nftToken = await deployNFTContract(variables)
    console.log('Deployed NFTContract at:', nftToken.address)
  })
