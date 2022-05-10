import { Box, Button, Flex, Heading } from '@chakra-ui/react'
import NextLink from 'next/link'
import useAuth from '~/hooks/use-auth'

export default function Header() {
  const { user, logout } = useAuth()

  return (
    <Box
      p={5}
      zIndex={10}
      position='sticky'
      boxShadow='xs'
      insetX={0}
      style={{
        top: 0,
      }}
    >
      <Flex
        justify='space-between'
        align='center'
        maxW='container.lg'
        mx='auto'
      >
        <NextLink
          href='/'
          passHref
        >
          <a>
            <Heading
              color='primary'
              size='md'
              fontWeight='bold'
            >
              FavorKart
            </Heading>
          </a>
        </NextLink>
        <Flex
          justify='center'
          align='center'
          experimental_spaceX={5}
        >
          {user ? (
            <>
              <Button onClick={logout}>Logout</Button>
            </>
          ) : (
            <>
              <NextLink
                href='/auth/login'
                passHref
              >
                <Button
                  variant='outline'
                  as='a'
                >
                  Login
                </Button>
              </NextLink>
              <NextLink
                href='/auth/register'
                passHref
              >
                <Button as='a'>Register</Button>
              </NextLink>
            </>
          )}
        </Flex>
      </Flex>
    </Box>
  )
}
