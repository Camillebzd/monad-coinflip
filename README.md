# Monad Coinflip

This repo contains a Nextjs application plugged on the [Monad Testnet](https://testnet.monad.xyz/) to play the Coinflip game. All the logic is on-chain for a transparent and fair experience: [coinflip contract](https://testnet.monadexplorer.com/address/0xdf62DdF15273acB9D7E2942b9981eb4a6A604fae). The entropy system used is [Pyth](https://docs.pyth.network/entropy). The repo used for the smart contract is [here](https://github.com/Camillebzd/coinflip-contract).

## Rules & how to play

The rules are simple: choose a face of the coin and let chance decide. If you are right, then you double your bet. Otherwise, you lose everything!

How to play:
1. Connect your wallet
2. Select Heads or Tails
3. Enter the amount you want to bet
4. Click on the "Flip a coin" button

Note: you can't bet more than what the contract can give you if you win. It means that you can bet a maximum of half the contract's balance.

## Run locally

First, install the dependencies:
```bash
npm i
```

Then, create a `.env` file following the `.env.example` file.

Finally, run:
```bash
npm run dev
```

## Future improvements

1. Add an history system of the user's bets
2. Add a leader board for the best winners and loosers
3. Add a max button to facilitate max bet