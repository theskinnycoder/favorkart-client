import {
  Button,
  Flex,
  Grid,
  GridItem,
  Heading,
  HStack,
  Image,
  Link,
  Text,
} from '@chakra-ui/react'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { FaCartPlus, FaRegHeart } from 'react-icons/fa'
import useSWR from 'swr'
import useBag from '~/hooks/use-bag'
import useWishlist from '~/hooks/use-wishlist'
import { BASE_API_URL } from '~/utils/constants'

export default function ProductDetails() {
  const { query } = useRouter()
  const { username } = query

  const {
    data: { data: product },
  } = useSWR(`${BASE_API_URL}/products/${query.id}`)

  const { addToBag } = useBag()
  const { addToWishlist } = useWishlist()

  return (
    <Grid
      templateColumns='repeat(5, 1fr)'
      gap={5}
    >
      <GridItem
        w='full'
        colSpan={2}
      >
        <Flex
          flexDir='column'
          experimental_spaceY={3}
        >
          <Image
            src={product.primaryImage}
            alt={product?.name}
            boxSize='300px'
            border='2px solid'
            borderColor='primary'
            borderRadius='full'
            align='center'
            fit='cover'
          />
          <Flex
            justify='center'
            align='center'
          ></Flex>
        </Flex>
      </GridItem>
      <GridItem colSpan={3}>
        <Flex
          flexDir='column'
          experimental_spaceY={4}
        >
          <Heading>{product?.name}</Heading>
          <Text>{product?.description}</Text>
          <Text fontSize='md'>
            <b>Price : </b>₹{product?.price}
          </Text>
          <Text fontSize='md'>
            {product?.countInStock ? (
              <>
                <b>In Stock : </b>
                {product?.countInStock}
              </>
            ) : (
              <Text
                colorScheme='gray'
                fontStyle='italic'
              >
                Not in stock
              </Text>
            )}
          </Text>
          <Text>
            <b>Vendor : </b>
            <NextLink
              href={`/${username}`}
              passHref
            >
              <Link>{username}</Link>
            </NextLink>
          </Text>
          <HStack
            align='center'
            marginLeft='-6'
          >
            <Button
              rightIcon={<FaRegHeart />}
              colorScheme='facebook'
              variant='ghost'
              size='lg'
              onClick={async () => {
                await addToWishlist(product)
              }}
            >
              Add to Wishlist
            </Button>
            <Button
              rightIcon={<FaCartPlus />}
              variant='ghost'
              disabled={!product?.countInStock}
              size='lg'
              onClick={async () => {
                await addToBag(product)
              }}
            >
              Add to Bag
            </Button>
          </HStack>
        </Flex>
      </GridItem>
    </Grid>
  )
}
