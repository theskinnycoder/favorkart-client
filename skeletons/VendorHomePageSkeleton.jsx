import {
  Flex,
  SimpleGrid,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
} from '@chakra-ui/react'

export default function VendorHomePageSkeleton() {
  return (
    <Flex justify='center'>
      <Flex
        flexDir='column'
        justify='center'
        align='center'
        experimental_spaceY={4}
      >
        <SkeletonCircle size='20' />
        <SkeletonText
          fontSize='xl'
          mt='2'
          noOfLines={1}
        />
        <SimpleGrid
          columns={3}
          gap={5}
        >
          {[...Array(9)].map(x => (
            <Flex
              key={x}
              justify='center'
              align='center'
              flexDir='column'
              experimental_spaceY={2}
              shadow='sm'
              borderRadius='md'
            >
              <Skeleton />
              <Flex
                flexDir='column'
                p={5}
                experimental_spaceY={1}
              >
                <SkeletonText />
                <SkeletonText />
              </Flex>
            </Flex>
          ))}
        </SimpleGrid>
      </Flex>
    </Flex>
  )
}
