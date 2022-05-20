import {
  Button,
  Heading,
  HStack,
  Icon,
  Image,
  Link,
  Text,
  VStack,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { HiOutlineShoppingBag, HiOutlineTrash } from 'react-icons/hi'
import useUser from '~/hooks/use-user'
import useWishlist from '~/hooks/use-wishlist'
import NextLink from 'next/link'

export default function WishlistPage() {
  const { push } = useRouter()
  const { user } = useUser()

  useEffect(() => {
    if (!user) push('/auth')
  }, [push, user])

  const { removeFromWishlist, wishlistItems, moveToBag } = useWishlist()

  return wishlistItems?.length === 0 ? (
    <Heading size='md'>
      no items saved for later. shift from{' '}
      <NextLink href='/checkout/bag'>
        <Link
          fontWeight='medium'
          color='primary'
        >
          bag
        </Link>
      </NextLink>{' '}
      if you wish (we don&apos;t advice you though, please buy. please.)
    </Heading>
  ) : (
    <VStack
      align='start'
      experimental_spaceY={5}
      w='full'
    >
      {wishlistItems.map(item => (
        <HStack
          w='full'
          key={item._id}
          justify='space-between'
          experimental_spaceX={2}
          shadow='md'
          _dark={{
            shadow: 'dark-lg',
          }}
          p={3}
          rounded='md'
        >
          <HStack>
            <Image
              src={item?.primaryImage}
              alt={item?.name}
              boxSize='75px'
              borderRadius='full'
              border='2px solid'
              borderColor='primary'
            />
            <Text fontSize='lg'>{item?.name}</Text>
          </HStack>
          <HStack>
            <Button
              variant='ghost'
              size='sm'
              onClick={() => moveToBag(item)}
            >
              <VStack
                experimental_spaceY={0.5}
                align='center'
              >
                <Icon as={HiOutlineShoppingBag} />
                <Text
                  fontSize='xs'
                  color='black'
                  _dark={{
                    color: 'white',
                  }}
                >
                  move to bag
                </Text>
              </VStack>
            </Button>
            <Button
              variant='ghost'
              size='sm'
              colorScheme='red'
              onClick={() => removeFromWishlist(item)}
            >
              <VStack
                experimental_spaceY={0.5}
                align='center'
              >
                <Icon as={HiOutlineTrash} />
                <Text
                  fontSize='xs'
                  color='black'
                  _dark={{
                    color: 'white',
                  }}
                >
                  remove from bag
                </Text>
              </VStack>
            </Button>
          </HStack>
        </HStack>
      ))}
    </VStack>
  )
}
