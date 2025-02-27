'use client'

import { ReactNode } from 'react'
import {
  Box,
  Container,
  Stack,
  // SimpleGrid,
  Text,
  VisuallyHidden,
  chakra,
  useColorModeValue,
} from '@chakra-ui/react'
import { FaXTwitter, FaDiscord, FaGithub, FaTelegram } from "react-icons/fa6";
import { SiRarible } from "react-icons/si";

// const ListHeader = ({ children }: { children: ReactNode }) => {
//   return (
//     <Text fontWeight={'500'} fontSize={'lg'} mb={2}>
//       {children}
//     </Text>
//   )
// }

const SocialButton = ({
  children,
  label,
  href,
}: {
  children: ReactNode
  label: string
  href: string
}) => {
  return (
    <chakra.button
      bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
      rounded={'full'}
      w={8}
      h={8}
      cursor={'pointer'}
      as={'a'}
      href={href}
      display={'inline-flex'}
      alignItems={'center'}
      justifyContent={'center'}
      transition={'background 0.3s ease'}
      _hover={{
        bg: useColorModeValue('blackAlpha.200', 'whiteAlpha.200'),
      }}>
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  )
}

export default function Footer() {
  return (
    <Box
      as="footer" 
      // py={5} 
      borderTopWidth={1}
      borderStyle={'solid'}
      borderColor={useColorModeValue('gray.200', 'gray.700')}
      mt="auto"
      bg={useColorModeValue('gray.50', 'gray.900')}
      color={useColorModeValue('gray.700', 'gray.200')}>
      {/* <Container as={Stack} maxW={'6xl'} py={10}>
        <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} spacing={8}>
          <Stack align={'flex-start'}>
            <ListHeader>Company</ListHeader>
            <Box as="a" href={'#'}>
              About Us
            </Box>
            <Box as="a" href={'#'}>
              Blog
            </Box>
            <Box as="a" href={'#'}>
              Careers
            </Box>
            <Box as="a" href={'#'}>
              Contact Us
            </Box>
          </Stack>

          <Stack align={'flex-start'}>
            <ListHeader>Support</ListHeader>
            <Box as="a" href={'#'}>
              Help Center
            </Box>
            <Box as="a" href={'#'}>
              Safety Center
            </Box>
            <Box as="a" href={'#'}>
              Community Guidelines
            </Box>
          </Stack>

          <Stack align={'flex-start'}>
            <ListHeader>Legal</ListHeader>
            <Box as="a" href={'#'}>
              Cookies Policy
            </Box>
            <Box as="a" href={'#'}>
              Privacy Policy
            </Box>
            <Box as="a" href={'#'}>
              Terms of Service
            </Box>
            <Box as="a" href={'#'}>
              Law Enforcement
            </Box>
          </Stack>
        </SimpleGrid>
      </Container> */}

      <Box
        // borderTopWidth={1}
        // borderStyle={'solid'}
        // borderColor={useColorModeValue('gray.200', 'gray.700')}
      >
        <Container
          as={Stack}
          maxW={'6xl'}
          py={4}
          direction={{ base: 'column', md: 'row' }}
          spacing={4}
          justify={{ md: 'space-between' }}
          align={{ md: 'center' }}>
          <Text>© 2025 Coinflip Monad testnet. No rights reserved, use me to build better things!</Text>
          <Stack direction={'row'} spacing={6}>
            <SocialButton label={'Twitter'} href={'https://x.com/monad_dev'}>
              <FaXTwitter />
            </SocialButton>
            <SocialButton label={'Discord'} href={'https://discord.gg/monaddev'}>
              <FaDiscord />
            </SocialButton>
            <SocialButton label={'Telegram'} href={'#'}>
              <FaTelegram />
            </SocialButton>
            <SocialButton label={'Github'} href={'https://github.com/Camillebzd/monad-coinflip'}>
              <FaGithub />
            </SocialButton>
          </Stack>
        </Container>
      </Box>
    </Box>
  )
}