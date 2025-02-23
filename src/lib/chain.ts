import { defineChain } from "thirdweb/chains";

export const monadTestnet = defineChain({
    id: 10143,
    name: 'Monad Testnet',
    nativeCurrency: {
        decimals: 18,
        name: 'Mon',
        symbol: 'MON',
    },
    rpcUrls: {
        default: { http: ['https://testnet-rpc.monad.xyz'] },
    },
    blockExplorers: {
        default: {
            name: 'Monad Testnet',
            url: 'https://testnet.monadexplorer.com/',
        },
    },
    testnet: true,
});