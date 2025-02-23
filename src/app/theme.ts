// theme.ts

// 1. import `extendTheme` function
import { extendTheme, type ThemeConfig } from '@chakra-ui/react'

// 2. Add your color mode config
const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
  
}

// 3. extend the theme
const theme = extendTheme({ 
  config,
  colors: {
    monadoffwhite: "#FBFAF9",
    monadpurple: "#836EF9",
    monadblue: "#200052",
    monadberry: "#A0055D",
    monadblack: "#0E100F",
    monadwhite: "#FFFFFF"
  }
})

export default theme