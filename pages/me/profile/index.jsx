import {
  Button,
  CircularProgress,
  CircularProgressLabel,
  HStack,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tr,
  VStack,
} from '@chakra-ui/react'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { HiOutlinePencil } from 'react-icons/hi'
import useUser from '~/hooks/use-user'
import ProfileLayout from '~/layouts/ProfileLayout'

export default function ProfilePage() {
  const { user } = useUser()
  const { push } = useRouter()

  useEffect(() => {
    if (!user) push('/auth')
  }, [push, user])

  return (
    <ProfileLayout>
      <VStack
        align='stretch'
        experimental_spaceY={10}
      >
        <TableContainer>
          <Table variant='striped'>
            <TableCaption
              placement='top'
              fontWeight='semibold'
            >
              <HStack justify='space-between'>
                <Text>
                  {user?.displayName || user?.phoneNumber}&apos;s profile
                </Text>
                <HStack>
                  <Text>profile completion : </Text>
                  <CircularProgress
                    value={40}
                    color='brand.300'
                  >
                    <CircularProgressLabel>40%</CircularProgressLabel>
                  </CircularProgress>
                </HStack>
              </HStack>
            </TableCaption>
            <Tbody>
              <Tr>
                <Td fontWeight='semibold'>display name</Td>
                <Td>{user?.displayName}</Td>
              </Tr>
              <Tr>
                <Td fontWeight='semibold'>phone number</Td>
                <Td>{user?.phoneNumber}</Td>
              </Tr>
              <Tr>
                <Td fontWeight='semibold'>email</Td>
                <Td>{user?.email}</Td>
              </Tr>
              <Tr>
                <Td fontWeight='semibold'>linked accounts</Td>
                <Td>
                  <HStack>
                    {user?.providerData.map(({ providerId }, idx) => {
                      if (providerId === 'password' || providerId === 'phone') {
                        return null
                      }
                      return <span key={idx}>{providerId}</span>
                    })}
                  </HStack>
                </Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>
        <NextLink
          href='/me/profile/edit'
          passHref
        >
          <Button
            as='a'
            placeSelf='end'
            leftIcon={<HiOutlinePencil />}
          >
            edit profile
          </Button>
        </NextLink>
      </VStack>
    </ProfileLayout>
  )
}
