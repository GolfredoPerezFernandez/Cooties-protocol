- Frontend: https://www.cootiesv2.xyz/

### NFT Deploy

- Steps

  1. Create `.env` file and define `PRIVATE_KEY`(deployer), `PRIVATE_KEY_1`(user), `INFURA_PROJECT_ID`(for rinkeby) in it
  1. Confirm constructor parameters in `test/10.variables.ts`, update objects - `nftVarMainnet` (for official-contract), `nftVarTestnet`(for test-contract)
  1. Confirm script in `scripts/nftDeploy.ts` and Deploy contract using: `npx hardhat run scripts/nftDeploy.ts --network rinkeby`

## Improvements

## Solutions for problem which may occur

## Current system

- Network: Rinkeby and Songbird
- NFT-Mint (random TokenIds)
  - Pre-sale
    - only whitelist wallets can mint
    - every whitelist wallet have have a limit of maximum amount they can mint
    - nft minting is free
    - max: 2500 NFTs can be minted
  - Public-sale
    - any wallet can mint
  - Both presale and public sale
    - Total: 8888
    - NFT price: 3000 SGB each
    - unlimited mints, with maximum 50 in each transaction

## Hardhat Project

```shell
npx hardhat test  # test contracts
npx prettier '**/*.{sol,md,ts}' --write # format code
```

## References

### Random number generation

- Random Number data-structure: https://stackoverflow.com/questions/196017/unique-non-repeating-random-numbers-in-o1
- Random Number implementation: https://github.com/1001-digital/erc721-extensions/blob/main/contracts/RandomlyAssigned.sol
