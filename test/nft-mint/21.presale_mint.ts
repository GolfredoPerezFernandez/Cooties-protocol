import { expect } from 'chai'
import { ethers } from 'hardhat'
import { currEvmTime } from '../13.utils'
import { deployNFTContract } from './11.deploy'

describe('Presale Mint', function () {
  let admin: any, signer1: any, signer2: any
  let nftToken: any
  it('Start system', async function () {
    const [_admin, _signer1, _signer2] = await ethers.getSigners()
    const _nftToken = await deployNFTContract('local')
    nftToken = _nftToken
    nftToken = _nftToken
    ;(admin = _admin), (signer1 = _signer1), (signer2 = _signer2)
  })

  let totalMintedAmt = 0,
    signer1MintedAmt = 0
  it('Presale Mint', async function () {
    const _currTime = await currEvmTime()
    await nftToken.updatePresaleDetails(_currTime, _currTime + 1000, 8) // current time is presale-time

    // can mint nfts for free during presale
    await nftToken.updateWhitelist([signer1.address], [6], true)
    await nftToken.connect(signer1).safeMint(5)
    totalMintedAmt += 5
    signer1MintedAmt += 5

    expect(await nftToken.totalSupply()).to.eq(totalMintedAmt)
    expect(await nftToken.balanceOf(signer1.address)).to.eq(signer1MintedAmt)
  })

  it('Cannot mint if mint-limit is exceeded', async function () {
    await expect(nftToken.connect(signer1).safeMint(3)).to.be.revertedWith(
      'You does not have enough free mints'
    )
  })

  it('Cannot mint NFTs if not whitelisted', async function () {
    await expect(nftToken.connect(signer2).safeMint(1)).to.be.revertedWith(
      'You does not have enough free mints'
    )
  })

  it('cannot mint nfts more than presaleSupply', async function () {
    await nftToken.updateWhitelist([signer2.address], [10], true)
    await expect(nftToken.connect(signer2).safeMint(7)).to.be.revertedWith(
      'All presale NFTs are minted'
    )
  })
})
