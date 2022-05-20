import {
  Flex,
  Heading,
  HStack,
  IconButton,
  Image,
  SimpleGrid,
  Text,
  VStack,
} from '@chakra-ui/react'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { Fragment } from 'react'
import { HiOutlineHeart, HiOutlineShoppingBag } from 'react-icons/hi'
import useSWR from 'swr'
import useBag from '~/hooks/use-bag'
import useUser from '~/hooks/use-user'
import useWishlist from '~/hooks/use-wishlist'
import { FacebookFilledIcon, TwitterFilledIcon } from '~/icons'
import ProfileLayout from '~/layouts/ProfileLayout'
import { BASE_API_URL } from '~/utils/constants'
import ShareOnSocialMedia from './ShareOnSocialMedia'

export default function ProductGrid() {
  const { query, asPath } = useRouter()

  function WithWrapper({ children }) {
    if (query?.username) {
      return children
    } else {
      return <ProfileLayout>{children}</ProfileLayout>
    }
  }

  const { user } = useUser()
  const username = query?.username ?? user?.displayName

  const {
    data: { data: products },
  } = useSWR(`${BASE_API_URL}/products?vendor=${username}`)

  const { addToBag } = useBag()
  const { addToWishlist } = useWishlist()

  return (
    <WithWrapper>
      <Flex justify='center'>
        <Flex
          flexDir='column'
          justify='center'
          align='center'
          experimental_spaceY={4}
        >
          {query?.username && (
            <VStack
              align='center'
              experimental_spaceY={5}
            >
              <Image
                src='https://bit.ly/dan-abramov'
                alt={query?.username}
                boxSize='150px'
                border='2px solid'
                borderColor='primary'
                borderRadius='50%'
              />
              <Heading>{username}</Heading>
              <HStack
                justify='space-between'
                w='container.lg'
              >
                <HStack justify='center'>
                  <Text fontWeight='semibold'>my socials : </Text>
                  <HStack
                    justify='center'
                    experimental_spaceX={2}
                  >
                    <IconButton
                      icon={<TwitterFilledIcon />}
                      as='a'
                      href='https://twitter.com/dan_abramov'
                      variant='ghost'
                      size='lg'
                      colorScheme='twitter'
                    />
                    <IconButton
                      icon={<FacebookFilledIcon />}
                      as='a'
                      href='https://facebook.com/dan_abramov'
                      variant='ghost'
                      size='lg'
                      colorScheme='facebook'
                    />
                  </HStack>
                </HStack>
                <ShareOnSocialMedia
                  path={asPath}
                  title='I just found out this vendor on FavorKart & its awesome!'
                  hashtag='#favorkart'
                />
              </HStack>
            </VStack>
          )}
          <SimpleGrid
            columns={3}
            gap={5}
            w='full'
          >
            {products?.map(product => (
              <Fragment key={product?._id}>
                <VStack
                  w='full'
                  align='start'
                  as='a'
                  flexDir='column'
                  experimental_spaceY={2}
                  shadow='md'
                  _dark={{
                    shadow: 'dark-lg',
                  }}
                  border='2px solid'
                  borderRadius='md'
                  borderColor='transparent'
                  _hover={{
                    borderColor: 'primary',
                  }}
                >
                  <NextLink
                    href={`/${username}/products/${product._id}`}
                    passHref
                  >
                    <a>
                      <Image
                        borderTopRadius='md'
                        src={product?.primaryImage}
                        alt={product?.name}
                        align='center'
                        fit='cover'
                      />
                    </a>
                  </NextLink>
                  <HStack
                    justify='space-between'
                    w='full'
                    p={5}
                  >
                    <VStack
                      align='start'
                      experimental_spaceY={1}
                    >
                      <NextLink
                        href={`/${username}/products/${product._id}`}
                        passHref
                      >
                        <Heading
                          as='a'
                          size='md'
                          noOfLines={1}
                        >
                          {product?.name}
                        </Heading>
                      </NextLink>
                      <Text color='primary'>₹{product?.price}</Text>
                    </VStack>
                    <VStack>
                      <IconButton
                        variant='ghost'
                        onClick={() => addToWishlist(product)}
                        icon={<HiOutlineHeart />}
                      />
                      <IconButton
                        variant='ghost'
                        onClick={() => addToBag(product)}
                        icon={<HiOutlineShoppingBag />}
                      />
                    </VStack>
                  </HStack>
                </VStack>
              </Fragment>
            ))}
          </SimpleGrid>
        </Flex>
      </Flex>
    </WithWrapper>
  )
}
