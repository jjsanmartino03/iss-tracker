import '../styles/globals.css'
import {ChakraProvider, extendTheme, useTheme} from "@chakra-ui/react";

function MyApp({Component, pageProps}) {
  const config = {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  }

// 3. extend the theme
  const theme = extendTheme({ config })


  return (<ChakraProvider theme={theme}>

    <Component {...pageProps} />
  </ChakraProvider>)
}

export default MyApp
