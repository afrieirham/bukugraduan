import { ChakraProvider } from '@chakra-ui/react'
import { DefaultSeo } from 'next-seo'
import 'react-perfect-scrollbar/dist/css/styles.css'

import { AuthProvider } from '@/utils/auth'
import { customTheme } from '@/styles/theme'
import SEO from 'next-seo.config'

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={customTheme}>
      <AuthProvider>
        <DefaultSeo {...SEO} />
        <Component {...pageProps} />
      </AuthProvider>
    </ChakraProvider>
  )
}

export default MyApp
