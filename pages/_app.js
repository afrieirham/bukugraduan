import { ChakraProvider } from '@chakra-ui/react'

import { AuthProvider } from '@/utils/auth'
import { customTheme } from '@/styles/theme'

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={customTheme}>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </ChakraProvider>
  )
}

export default MyApp
