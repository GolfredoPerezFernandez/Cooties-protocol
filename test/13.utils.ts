import { ethers, network, run } from 'hardhat'
export const BNF = ethers.BigNumber.from
export const ZERO_ADDR = '0x0000000000000000000000000000000000000000'

export const getSigners = async () => {}

export const increaseEVMTime = async (_increaseSec: number) => {
  await network.provider.send('evm_increaseTime', [_increaseSec])
  await network.provider.send('evm_mine')
}

export const setEvmTime = async (_evmTime: number) => {
  await network.provider.send('evm_setNextBlockTimestamp', [_evmTime])
  await network.provider.send('evm_mine')
}

export const stopEvmAutomine = async () => {
  await network.provider.send('evm_setAutomine', [false])
}

export const startEvmAutomine = async () => {
  await network.provider.send('evm_setAutomine', [true])
}

export const currEvmTime = async () => {
  const currBlockNum = await ethers.provider.getBlockNumber()
  const currBlock = await ethers.provider.getBlock(currBlockNum)
  return currBlock.timestamp
}
