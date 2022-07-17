import { deployAuctionContract } from '../test/auction/11.deploy'
// main
// 0xd4d427D30abA626c138B49eFeC799f933B20F35f (6 July 13:04) - songbird
async function main() {
  const nftToken = await deployAuctionContract('main')
   console.log('Deployed MINTContract at:', nftToken.address)
  const nftAddr = '0xd4d427D30abA626c138B49eFeC799f933B20F35f'
  // 0xC6b5a7060DE0A10db2b59e832153227C1755372b (5 July) - rinkeby
  // 0xe903956E41fcB635ad8cB88A16d350454c10E279 (6 July 7:31) - rinkeby
  // 0xc0cCa478dbEB0f7825eaD687bc609FedEb723A71 (6 July 8:01) - songbird
  // 0xeAA919a670D4fd210C1eeeeceDbf6021b9FD73d0 (6 July 10:10) - songbird

  console.log('updated whitelist')
  // Note: run after more than 10 blocks (normally 3 minutes) confirmation of deploy-transaction

}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
