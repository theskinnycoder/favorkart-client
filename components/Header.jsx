import {
  Box,
  Button,
  CircularProgress,
  CircularProgressLabel,
  Flex,
  Heading,
  HStack,
  Icon,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
  Text,
  VStack,
} from '@chakra-ui/react'
import NextLink from 'next/link'
import {
  HiOutlineAdjustments,
  HiOutlineBookmark,
  HiOutlineClipboardList,
  HiOutlineHeart,
  HiOutlineLogin,
  HiOutlineLogout,
  HiOutlinePencil,
  HiOutlinePlus,
  HiOutlineShoppingBag,
  HiOutlineUser,
} from 'react-icons/hi'
import useLogout from '~/hooks/use-logout'
import useUser from '~/hooks/use-user'
import { ROLES } from '~/utils/enums'

export default function Header() {
  const { user } = useUser()
  const { logout } = useLogout()

  return (
    <>
      <Box
        p={5}
        zIndex={10}
        position='sticky'
        insetX={0}
        _dark={{
          backgroundColor: 'transparent',
          backdropFilter: 'blur(20px)',
        }}
        backgroundColor='white'
        boxShadow='sm'
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
                fontWeight='semibold'
              >
                favorkart
              </Heading>
            </a>
          </NextLink>
          <Flex
            justify='center'
            align='center'
            experimental_spaceX={5}
          >
            <>
              <NextLink
                href='/wishlist'
                passHref
              >
                <Button
                  variant='ghost'
                  as='a'
                >
                  <VStack
                    experimental_spaceY={0.5}
                    align='center'
                  >
                    <Icon as={HiOutlineHeart} />
                    <Text
                      color='black'
                      _dark={{
                        color: 'white',
                      }}
                    >
                      wishlist
                    </Text>
                  </VStack>
                </Button>
              </NextLink>
              <NextLink
                href='/checkout/bag'
                passHref
              >
                <Button
                  variant='ghost'
                  as='a'
                >
                  <VStack
                    experimental_spaceY={0.5}
                    align='center'
                  >
                    <Icon as={HiOutlineShoppingBag} />
                    <Text
                      color='black'
                      _dark={{
                        color: 'white',
                      }}
                    >
                      bag
                    </Text>
                  </VStack>
                </Button>
              </NextLink>
              <Menu>
                <MenuButton
                  autoFocus={false}
                  as={Button}
                  _focus={{
                    boxShadow: 'none',
                  }}
                  variant='ghost'
                >
                  <VStack
                    experimental_spaceY={0.5}
                    align='center'
                  >
                    <Icon as={HiOutlineUser} />
                    <Text
                      color='black'
                      _dark={{
                        color: 'white',
                      }}
                    >
                      profile
                    </Text>
                  </VStack>
                </MenuButton>
                <MenuList>
                  {!user && (
                    <>
                      <HStack p={2}>
                        <NextLink
                          href='/auth'
                          passHref
                        >
                          <MenuItem
                            as='a'
                            fontWeight='semibold'
                          >
                            <HStack experimental_spaceX={2}>
                              <Icon as={HiOutlineLogin} />
                              <Text>login</Text>
                            </HStack>
                          </MenuItem>
                        </NextLink>
                      </HStack>
                      <MenuDivider />
                    </>
                  )}
                  <MenuGroup
                    title={
                      user && `hello, ${user?.displayName || user?.phoneNumber}`
                    }
                  >
                    <NextLink
                      href='/wishlist'
                      passHref
                    >
                      <MenuItem as='a'>
                        <HStack experimental_spaceX={2}>
                          <Icon as={HiOutlineHeart} />
                          <Text>wishlist</Text>
                        </HStack>
                      </MenuItem>
                    </NextLink>
                    <NextLink
                      href='/me/profile'
                      passHref
                    >
                      <MenuItem as='a'>
                        <HStack experimental_spaceX={2}>
                          <Icon as={HiOutlineUser} />
                          <Text>profile</Text>
                          <CircularProgress
                            size='30px'
                            value={40}
                            color='brand.300'
                          >
                            <CircularProgressLabel>40%</CircularProgressLabel>
                          </CircularProgress>
                        </HStack>
                      </MenuItem>
                    </NextLink>
                    <NextLink
                      href='/me/settings'
                      passHref
                    >
                      <MenuItem as='a'>
                        <HStack experimental_spaceX={2}>
                          <Icon as={HiOutlineAdjustments} />
                          <Text>settings</Text>
                        </HStack>
                      </MenuItem>
                    </NextLink>
                    <NextLink
                      href='/me/orders'
                      passHref
                    >
                      <MenuItem as='a'>
                        <HStack experimental_spaceX={2}>
                          <Icon as={HiOutlineBookmark} />
                          <Text>orders</Text>
                        </HStack>
                      </MenuItem>
                    </NextLink>
                  </MenuGroup>
                  {user?.role === ROLES.VENDOR && (
                    <>
                      <MenuDivider />
                      <MenuGroup title='products'>
                        <NextLink
                          href='/me/products'
                          passHref
                        >
                          <MenuItem as='a'>
                            <HStack experimental_spaceX={2}>
                              <Icon as={HiOutlineClipboardList} />
                              <Text>all products</Text>
                            </HStack>
                          </MenuItem>
                        </NextLink>
                        <NextLink
                          href='/me/products/new'
                          passHref
                        >
                          <MenuItem as='a'>
                            <HStack experimental_spaceX={2}>
                              <Icon as={HiOutlinePlus} />
                              <Text>add product</Text>
                            </HStack>
                          </MenuItem>
                        </NextLink>
                      </MenuGroup>
                    </>
                  )}
                  {user && (
                    <>
                      <MenuDivider />
                      <MenuGroup>
                        <NextLink
                          href='/me/profile/edit'
                          passHref
                        >
                          <MenuItem as='a'>
                            <HStack experimental_spaceX={2}>
                              <Icon as={HiOutlinePencil} />
                              <Text>edit profile</Text>
                            </HStack>
                          </MenuItem>
                        </NextLink>
                        <MenuItem onClick={logout}>
                          <HStack experimental_spaceX={2}>
                            <Icon as={HiOutlineLogout} />
                            <Text>logout</Text>
                          </HStack>
                        </MenuItem>
                      </MenuGroup>
                    </>
                  )}
                </MenuList>
              </Menu>
            </>
          </Flex>
        </Flex>
      </Box>
    </>
  )
}
