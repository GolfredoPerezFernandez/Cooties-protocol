import { getContractFactory } from '@nomiclabs/hardhat-ethers/types'
import { ethers } from 'hardhat'

async function main() {
  const [admin, signer1] = await ethers.getSigners()

  const NFTToken = await ethers.getContractFactory('CootiesV2')
  const nftToken = NFTToken.attach('0xd4d427D30abA626c138B49eFeC799f933B20F35f')

  let txn
  await nftToken.updateBaseUrl('https://ipfs.moralis.io:2053/ipfs/QmecTSNCwYjMiobkPTKrQsyB1xu4wR8eTqTu7oPgGEPCdM/metadata/')
  await nftToken.updatePresaleDetails(1657085149, 1657195149, 2500)

  // will fail if presale is not started or user is not whitelisted or user's limit is expired
const txnW = await nftToken.updateWhitelist([signer1.address], [101], true)
 console.log('whitelist updated', txnW.hash)
  txn = await nftToken.connect(signer1).safeMint(50)
 const rem = await nftToken.whitelistAccounts(signer1.address)
  console.log(rem.toNumber())
  const freeMints = await nftToken.freeMintsRem(
    '0xa694754b17f8465D4724f709d1B0B599E24Cf3A6'
  )
  console.log('freemints-balance:', freeMints.toNumber())
   const uri = await nftToken.tokenURI(4502)
 console.log('uri', uri)
  mint after presale
  const mintPrice = await nftToken.mintPrice()
 const txnM = await nftToken.connect(signer1).safeMint(5, {value: mintPrice.mul(5)})
  console.log('nft minted', txnM.hash)

   console.log('txn:', txn.hash)
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
