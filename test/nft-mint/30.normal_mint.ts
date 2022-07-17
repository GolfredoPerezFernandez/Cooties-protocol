import { expect } from 'chai'
import { ethers } from 'hardhat'
import { nftContrParameters } from '../10.variables'
import { currEvmTime } from '../13.utils'
import { deployNFTContract } from './11.deploy'

const { mintPrice, mintSupply, firstTokenId } = nftContrParameters('local')
const lastTokenId = firstTokenId + mintSupply - 1
describe('Random Mint', function () {
  let admin: any, signer1: any, signer2: any
  let nftToken: any
  it('Start system', async function () {
    const [_admin, _signer1, _signer2] = await ethers.getSigners()
    const _nftToken = await deployNFTContract('local')
    nftToken = _nftToken
    nftToken = _nftToken
    ;(admin = _admin), (signer1 = _signer1), (signer2 = _signer2)

    const _currTime = await currEvmTime()
    await _nftToken.updatePresaleDetails(_currTime - 10, _currTime, 8) // ended presale
  })

  let totalMintedAmt = 0,
    signer1MintedAmt = 0

  it('Mint should fail if insufficient payment is attached', async function () {
    // revert transaction if no ether attached
    await expect(nftToken.connect(signer1).safeMint(1)).to.be.revertedWith(
      'Insufficient purchase amount'
    )

    // minting 3 nfts while price of only 2 nfts is attached
    await expect(
      nftToken.connect(signer1).safeMint(3, { value: mintPrice.mul(2) })
    ).to.be.revertedWith('Insufficient purchase amount')

    // if mint-quantify is 0, then no nft will be minted
    nftToken.connect(signer1).safeMint(0)
    expect(await nftToken.balanceOf(signer1.address)).to.eq(signer1MintedAmt)
    expect(await nftToken.totalSupply()).to.eq(totalMintedAmt)
  })

  it('Multiple mint, NFT Price and Supply', async function () {
    // update feeRecipient
    await nftToken.updateFeeRecipient(signer2.address)

    // minted 1, 2, 3, 4, 5 nfts - total 15 NFTs
    for (let i = 1; i <= 5; i++) {
      await expect(
        await nftToken.connect(signer1).safeMint(i, { value: mintPrice.mul(i) })
      ).to.changeEtherBalances(
        [signer1, signer2],
        [mintPrice.mul(-1).mul(i), mintPrice.mul(i)]
      )

      totalMintedAmt += i
      signer1MintedAmt += i

      expect(await nftToken.totalSupply()).to.eq(totalMintedAmt)
      expect(await nftToken.balanceOf(signer1.address)).to.eq(signer1MintedAmt)
    }

    // mint remaining
    const _reminingAmt = mintSupply - totalMintedAmt
    for (let i = 0; i < _reminingAmt; i++) {
      await expect(
        // will revert with 'ERC721: token already minted'  if we mint tried to mint same tokenId
        await nftToken.connect(signer1).safeMint(1, { value: mintPrice.mul(1) })
      ).to.changeEtherBalances(
        [signer1, signer2],
        [mintPrice.mul(-1), mintPrice]
      )
    }
  })

  it('All TokenIds should be within first and last TokenId', async function () {
    // Check uniqueness
    const _allTokenIds: number[] = []
    const _tokenSet = new Set()
    for (let i = 0; i < mintSupply; i++) {
      const _currId = (await nftToken.tokenByIndex(i)).toNumber()
      _allTokenIds.push(_currId)

      // all tokenIds are unique, as if they are not unique we will get error: 'ERC721: token already minted'
      expect(_tokenSet.has(_currId)).to.eq(false)
      _tokenSet.add(_currId)

      // every tokenId should be between range of firstTokenId to lastTokenId
      expect(_currId >= firstTokenId && _currId <= lastTokenId).to.eq(true)
    }
    console.log('All TokenIds', _allTokenIds)
  })

  it('cannot mint nfts more than mintSupply', async function () {
    await expect(
      nftToken.connect(signer1).safeMint(1, { value: mintPrice })
    ).to.be.revertedWith('All tokens already minted')
  })

  it('Check Token Metadata', async function () {
    const baseUrl = await nftToken.baseUrl()
    const _tokenId0 = 0 + firstTokenId
    const _tokenId1 = 1 + firstTokenId
    expect(await nftToken.tokenURI(_tokenId0)).to.eq(`${baseUrl}${_tokenId0}`)
    expect(await nftToken.tokenURI(_tokenId1)).to.eq(`${baseUrl}${_tokenId1}`)
  })
})
