import {
  Button,
  Grid,
  GridItem,
  Heading,
  HStack,
  Icon,
  Image,
  Link,
  Text,
  VStack,
} from '@chakra-ui/react'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import {
  HiOutlineFastForward,
  HiOutlineHeart,
  HiOutlineTrash,
} from 'react-icons/hi'
import useBag from '~/hooks/use-bag'
import useUser from '~/hooks/use-user'

export default function BagPage() {
  const { push } = useRouter()
  const { user } = useUser()

  useEffect(() => {
    if (!user) push('/auth')
  }, [push, user])

  const { bagItems, removeFromBag, addToBag, moveToWishlist, clearBag } =
    useBag()

  return bagItems.length === 0 ? (
    <Heading size='md'>
      no items in the bag. shift from{' '}
      <NextLink href='/wishlist'>
        <Link
          fontWeight='medium'
          color='primary'
        >
          wishlist
        </Link>
      </NextLink>{' '}
      if you <i>wish</i> (no pun intended.)
    </Heading>
  ) : (
    <Grid
      w='full'
      templateColumns='repeat(7, 1fr)'
      alignItems='center'
      justifyContent='space-between'
      gap={5}
    >
      <GridItem colSpan={5}>
        <VStack
          align='start'
          experimental_spaceY={5}
          w='full'
        >
          {bagItems.map(item => (
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
                />
                <Text fontSize='sm'>{item?.name}</Text>
              </HStack>
              <HStack>
                <Button
                  size='xs'
                  variant='ghost'
                  onClick={() => {
                    addToBag(item, 'decrement')
                  }}
                >
                  -
                </Button>
                <Text>{item?.count}</Text>
                <Button
                  size='xs'
                  variant='ghost'
                  onClick={() => {
                    addToBag(item, 'increment')
                  }}
                >
                  +
                </Button>
              </HStack>
              <HStack>
                <Button
                  variant='ghost'
                  size='sm'
                  onClick={() => moveToWishlist(item)}
                >
                  <VStack
                    experimental_spaceY={0.5}
                    align='center'
                  >
                    <Icon as={HiOutlineHeart} />
                    <Text
                      fontSize='xs'
                      color='black'
                      _dark={{
                        color: 'white',
                      }}
                    >
                      move to wishlist
                    </Text>
                  </VStack>
                </Button>
                <Button
                  variant='ghost'
                  size='sm'
                  colorScheme='red'
                  onClick={() => removeFromBag(item)}
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
      </GridItem>
      <GridItem
        colSpan={2}
        justifySelf='flex-end'
      >
        <VStack align='flex-end'>
          <NextLink
            href='/checkout/shipping'
            passHref
          >
            <Button
              as='a'
              variant='ghost'
              size='lg'
              leftIcon={<HiOutlineFastForward />}
            >
              move to checkout
            </Button>
          </NextLink>
          <Button
            variant='ghost'
            size='lg'
            colorScheme='red'
            leftIcon={<HiOutlineTrash />}
            onClick={clearBag}
          >
            clear bag
          </Button>
        </VStack>
      </GridItem>
    </Grid>
  )
}
