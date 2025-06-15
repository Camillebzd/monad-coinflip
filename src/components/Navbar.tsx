'use client'

import {
  Box,
  Flex,
  HStack,
  Menu,
  useColorModeValue,
} from '@chakra-ui/react'
import Image from "next/image";
import styles from "@/app/page.module.css";
import { ConnectButton, darkTheme } from "thirdweb/react";
import { client } from "@/lib/client";
import { monadTestnet } from "@/lib/chain";
import { createWallet } from 'thirdweb/wallets';

const wallets = [
  createWallet("io.metamask"),
  createWallet("io.rabby"),
  createWallet("walletConnect"),
];

export default function Navbar() {
  return (
    <>
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <HStack spacing={8} alignItems={'center'}>
            <Image
              // className={styles.logo}
              src="/monad_dev_logo.jpeg"
              alt="Monad dev logo"
              width={50}
              height={50}
              priority
              style={{ borderRadius: '10%' }}
            />
          </HStack>
          <Flex alignItems={'center'}>
            <Menu>
              <div className={styles.buttonWrapper}>
                <ConnectButton
                  client={client}
                  chain={monadTestnet}
                  wallets={wallets}
                  connectModal={{
                    size: "compact",
                    showThirdwebBranding: false,
                  }}
                  theme={darkTheme({
                    colors: {
                      primaryButtonBg: "#836EF9",
                      primaryButtonText: "#FBFAF9",
                    },
                  })}
                />
              </div>
            </Menu>
          </Flex>
        </Flex>
      </Box>
    </>
  )
}