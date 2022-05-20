import { Badge, Divider, Heading, Link, VStack } from '@chakra-ui/react'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import useUser from '~/hooks/use-user'
import { ROLES } from '~/utils/enums'

function ActiveLink({ href, name }) {
  const { pathname } = useRouter()

  function isActiveLink(path) {
    return pathname === path
  }

  return (
    <NextLink href={href}>
      <Link
        textUnderlineOffset={3}
        color={isActiveLink(href) && 'primary'}
        textDecorationColor='primary'
        textDecor={isActiveLink(href) ? 'underline' : 'none'}
      >
        {name}
      </Link>
    </NextLink>
  )
}

export default function ProfileSidebar() {
  const { user } = useUser()

  return (
    <VStack
      experimental_spaceY={8}
      align='start'
    >
      <VStack
        experimental_spaceY={3}
        align='start'
      >
        <Heading size='xs'>profile</Heading>
        <ActiveLink
          href='/me/profile'
          name='overview'
        />
        <ActiveLink
          href='/me/profile/edit'
          name='edit'
        />
      </VStack>

      <Divider />

      {user?.role === ROLES.VENDOR && (
        <>
          <VStack
            align='start'
            experimental_spaceY={3}
            paddingTop={5}
          >
            <Heading
              size='xs'
              alignItems='center'
              experimental_spaceX={2}
            >
              <span>products</span>
              <Badge>vendor</Badge>
            </Heading>
            <ActiveLink
              href='/me/products'
              name='your products'
            />
            <ActiveLink
              href='/me/products/new'
              name='add new product'
            />
          </VStack>

          <Divider />
        </>
      )}

      <VStack
        align='start'
        experimental_spaceY={3}
        paddingTop={5}
      >
        <Heading size='xs'>orders</Heading>
        <ActiveLink
          href='/me/orders'
          name='all orders'
        />
      </VStack>

      <Divider />

      <VStack
        align='start'
        experimental_spaceY={3}
        paddingTop={5}
      >
        <Heading size='xs'>settings</Heading>
        <ActiveLink
          href='/me/settings'
          name='settings'
        />
      </VStack>
    </VStack>
  )
}
