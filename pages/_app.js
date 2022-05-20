import { ChakraProvider } from '@chakra-ui/react'
import AuthProvider from '~/contexts/AuthContext'
import MainLayout from '~/layouts/MainLayout'
import theme from '~/utils/theme'
import '@fontsource/poppins/500.css'
import '@fontsource/poppins/600.css'
import '@fontsource/poppins/700.css'
import { SWRConfig } from 'swr'

function MyApp({ Component, pageProps }) {
  return (
    <SWRConfig
      value={{
        fetcher: url => fetch(url).then(res => res.json()),
        suspense: true,
      }}
    >
      <AuthProvider>
        <ChakraProvider
          theme={theme}
          resetCSS
        >
          <MainLayout>
            <Component {...pageProps} />
          </MainLayout>
        </ChakraProvider>
      </AuthProvider>
    </SWRConfig>
  )
}

export default MyApp
