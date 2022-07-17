import { parseEther } from 'ethers/lib/utils'
import fs from 'fs'
import path from 'path'

export type network1 = 'main' | 'test' | 'local'

// https://www.epochconverter.com/
// https://savvytime.com/converter/est-to-gmt/jul-6-2022/9am

// songbird
const nftVarMainnet = {
  name: 'CootiesV2',
  symbol: 'CTS',
  firstTokenId: 1,
  mintSupply: 8888, // should be >= 20, (1000 is default for shuna)  as test-cases loop runs min 15 times
  mintPrice: parseEther('3000'),
  feeRecipient: '0x069dFfD8D5E00952D956aEF824D3E3DcDadeEA63',
  baseUrl:
    'https://ipfs.moralis.io:2053/ipfs/QmfW7uDNXbFKK4rHYCPc5GkRnH6fmxPBtQEZ4jB6tCgE7q/metadata/',
  presaleSupply: 2500,
  presaleStartTime: 1657092600, //  6 july 3:30 est -> 6 july 7:30 gmt -> 1657092600
  presaleEndTime: 1657130400, // 6 july 14:00 est -> 6 july 18:00 gmt -> 1657130400
}

// rinkeby
const nftVarTestnet = {
  name: 'TESTCOOTIES',
  symbol: 'CTS',
  firstTokenId: 1,
  mintSupply: 8888, // should be >= 20, (1000 is default for shuna)  as test-cases loop runs min 15 times
  mintPrice: parseEther('0.03'),
  feeRecipient: '0xd47e77851537557d22eaB0A9179D69C99D98A8be',
  baseUrl:
    'https://ipfs.moralis.io:2053/ipfs/QmfW7uDNXbFKK4rHYCPc5GkRnH6fmxPBtQEZ4jB6tCgE7q/metadata/',
  presaleSupply: 2500,
  presaleStartTime: 1657072796, // 6th July 9am EST == 6 July 2022 13:00:00 GMT
  presaleEndTime: 1657074796, // 6th July 2pm EST == 6 July 2022 18:00:00 GMT
}

const nftVarLocalnet = {
  name: 'CootiesV2',
  symbol: 'CTS',
  firstTokenId: 0,
  mintSupply: 20, // should be >= 20, (1000 is default for shuna)  as test-cases loop runs min 15 times
  mintPrice: parseEther('0.1'),
  feeRecipient: '0xd47e77851537557d22eaB0A9179D69C99D98A8be',
  baseUrl:
    'https://ipfs.moralis.io:2053/ipfs/QmfW7uDNXbFKK4rHYCPc5GkRnH6fmxPBtQEZ4jB6tCgE7q/metadata/',
  presaleSupply: 8,
  presaleStartTime: Math.floor(Date.now() / 1000),
  presaleEndTime: Math.floor(Date.now() / 1000) + 10000,
}

export const nftContrParameters = (_network: network1) => {
  if (_network === 'main') return nftVarMainnet
  if (_network === 'test') return nftVarTestnet
  return nftVarLocalnet
}

export const whitelistMain = () => {
  const text = fs.readFileSync(
    path.join(__dirname, '3.ownerToTokensAmts.txt'),
    {
      encoding: 'utf8',
    }
  )
  const arr0 = text
    .trim()
    .split('\n')
    .map((line) => line.split(',').map((part) => part.trim()))
  const walletsArr = []
  const amountsArr = []
  for (let i = 0; i < arr0.length; i++) {
    walletsArr.push(arr0[i][0])
    amountsArr.push(arr0[i][1])
  }
  console.log('parsed whitelist wallets and amounts')
  return { _walletsArr: walletsArr, _amountsArr: amountsArr }
}

export const whitelistLocal = () => {
  const _walletsArr: string[] = []
  const _amountsArr: string[] = []
  return { _walletsArr, _amountsArr }
}

export const whitelistWallets = (_network: network1) => {
  if (_network === 'main' || _network === 'test') return whitelistMain()
  return whitelistLocal()
}
