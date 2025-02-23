// app/providers.tsx
'use client'

import { CacheProvider } from '@chakra-ui/next-js'
import { ChakraProvider } from '@chakra-ui/react'
import { ThirdwebProvider } from "thirdweb/react";
import theme from './theme';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThirdwebProvider>
      <CacheProvider>
        <ChakraProvider theme={theme}>
          {children}
        </ChakraProvider>
      </CacheProvider>
    </ThirdwebProvider>
  )
}