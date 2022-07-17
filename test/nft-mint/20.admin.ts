import { expect } from 'chai'
import { ethers } from 'hardhat'
import { nftContrParameters } from '../10.variables'
import { currEvmTime } from '../13.utils'
import { deployNFTContract } from './11.deploy'

const {
  mintPrice,
  mintSupply,
  presaleStartTime,
  presaleSupply,
  presaleEndTime,
  feeRecipient,
  baseUrl,
} = nftContrParameters('local')
describe('Admin', function () {
  let admin: any, signer1: any, signer2: any
  let nftToken: any
  it('Start system', async function () {
    const [_admin, _signer1, _signer2] = await ethers.getSigners()
    const _nftToken = await deployNFTContract('local')
    nftToken = _nftToken
    ;(admin = _admin), (signer1 = _signer1), (signer2 = _signer2)
  })

  it('Default', async function () {
    expect(await nftToken.presaleStartTime()).to.eq(presaleStartTime)
    expect(await nftToken.presaleEndTime()).to.eq(presaleEndTime)
    expect(await nftToken.presaleSupply()).to.eq(presaleSupply)

    expect(await nftToken.mintPrice()).to.eq(mintPrice)
    expect(await nftToken.mintSupply()).to.eq(mintSupply)
    expect(await nftToken.feeRecipient()).to.eq(feeRecipient)
    expect(await nftToken.baseUrl()).to.eq(baseUrl)
  })

  it('PresaleDetails', async function () {
    // non-owner cannot update presale details
    await expect(
      nftToken
        .connect(signer1)
        .updatePresaleDetails(presaleEndTime - 2000, presaleEndTime - 1000, 10)
    ).to.be.revertedWith('Ownable: caller is not the owner')

    const _currTime = await currEvmTime()
    await nftToken.updatePresaleDetails(_currTime - 10, _currTime + 10000, 9)
    expect(await nftToken.presaleStartTime()).to.eq(_currTime - 10)
    expect(await nftToken.presaleEndTime()).to.eq(_currTime + 10000)
    expect(await nftToken.presaleSupply()).to.eq(9)
  })

  // NOTE: Do not create update mint-supply as it will break the random-index-generation algorithm
  it('Whitelisting', async function () {
    // signer1 cannot mint as he is not part of whitelist
    await expect(nftToken.connect(signer1).safeMint(1)).to.be.revertedWith(
      'You does not have enough free mints'
    )

    //---------------------------------------------------------------------
    // only owner can add user to whitelist
    await expect(
      nftToken.connect(signer1).updateWhitelist([signer1.address], [1], true)
    ).to.be.revertedWith('Ownable: caller is not the owner')
    await nftToken.updateWhitelist([signer1.address], [1], true)

    // user can mint as he is part of whitelist
    nftToken.connect(signer1).safeMint(1)
  })

  it('BaseUrl and TokenUrl', async function () {
    const _tokenId0 = await nftToken.tokenByIndex(0)

    // non-owner cannot update baseUrl
    await expect(
      nftToken.connect(signer1).updateBaseUrl('maya/')
    ).to.be.revertedWith('Ownable: caller is not the owner')

    expect(await nftToken.tokenURI(_tokenId0)).not.eq(
      'maya/' + _tokenId0.toString()
    )

    // owner can update baseUrl
    await nftToken.updateBaseUrl('maya/')
    expect(await nftToken.tokenURI(_tokenId0)).eq(
      'maya/' + _tokenId0.toString()
    )
  })

  it('MintPrice', async function () {
    // non-owner cannot update mint-price
    await expect(
      nftToken.connect(signer1).updateMintPrice(30000)
    ).to.be.revertedWith('Ownable: caller is not the owner')
    expect(await nftToken.mintPrice()).to.eq(mintPrice)

    // owner can update mint-price
    await nftToken.updateMintPrice(30000)
    expect(await nftToken.mintPrice()).to.eq(30000)
  })

  it('FeeRecipient', async function () {
    // non-owner cannot update feeRecipient
    await expect(
      nftToken.connect(signer1).updateFeeRecipient(signer1.address)
    ).to.be.revertedWith('Ownable: caller is not the owner')
    expect(await nftToken.feeRecipient()).to.eq(feeRecipient)

    // owner can update feeRecipient
    await nftToken.updateFeeRecipient(signer1.address)
    expect(await nftToken.feeRecipient()).to.eq(signer1.address)
  })

  it('TransferOwnership', async function () {
    // non owner cannot transfer ownership
    await expect(
      nftToken.connect(signer1).transferOwnership(signer2.address)
    ).to.be.revertedWith('Ownable: caller is not the owner')

    // owner can transfer ownership
    await nftToken.transferOwnership(signer2.address)
  })
})
