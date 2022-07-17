import { ethers, run } from 'hardhat'
import { nftContrParameters, whitelistWallets, network1 } from '../10.variables'
const { getContractFactory } = ethers

export const deployNFTContract = async (_network: network1) => {
  // const [_admin] = await ethers.getSigners()
  const NFTContract = await getContractFactory('CootiesV2')
  const {
    name,
    symbol,
    baseUrl,
    firstTokenId,
    mintSupply,
    mintPrice,
    feeRecipient,
    presaleStartTime,
    presaleEndTime,
    presaleSupply,
  } = nftContrParameters(_network)
  const _nftContract = await NFTContract.deploy(
    name,
    symbol,
    baseUrl,
    firstTokenId,
    mintSupply,
    mintPrice,
    feeRecipient,
    presaleStartTime,
    presaleEndTime,
    presaleSupply
  )
  await _nftContract.deployed()
  return _nftContract
}

export const updateNftWhitelist = async (
  _nftAddr: string,
  _network: network1
) => {
  const NFTToken = await getContractFactory('CootiesV2')
  const _nftToken = NFTToken.attach(_nftAddr)
  const { _walletsArr, _amountsArr } = whitelistWallets(_network)
  await _nftToken.updateWhitelist(_walletsArr, _amountsArr, true)
}

export const verifyNFTContract = async (
  nftAddr: string,
  _network: network1
) => {
  const {
    name,
    symbol,
    baseUrl,
    firstTokenId,
    mintSupply,
    mintPrice,
    feeRecipient,
    presaleStartTime,
    presaleEndTime,
    presaleSupply,
  } = nftContrParameters(_network)
  await run('verify:verify', {
    address: nftAddr,
    constructorArguments: [
      name,
      symbol,
      baseUrl,
      firstTokenId,
      mintSupply,
      mintPrice,
      feeRecipient,
      presaleStartTime,
      presaleEndTime,
      presaleSupply,
    ],
  })
}
