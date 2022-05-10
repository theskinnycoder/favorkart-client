import { Box } from '@chakra-ui/react'
import Header from '~/components/Header'

export default function MainLayout({ children }) {
  return (
    <>
      <Header />
      <Box
        maxW='container.lg'
        mx='auto'
        my={10}
      >
        {children}
      </Box>
    </>
  )
}
