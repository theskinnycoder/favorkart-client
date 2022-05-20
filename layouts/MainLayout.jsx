import { Box, Flex, Spinner } from '@chakra-ui/react'
import { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import Header from '~/components/Header'

export default function MainLayout({ children }) {
  return (
    <ErrorBoundary fallback='Something went wrong...'>
      <Suspense
        fallback={
          <Flex
            minH='100vh'
            justify='center'
            align='center'
          >
            <Spinner />
          </Flex>
        }
      >
        <Header />
        <Box
          maxW='container.lg'
          mx='auto'
          my={10}
        >
          {children}
        </Box>
      </Suspense>
    </ErrorBoundary>
  )
}
