import {
  Button,
  Divider,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Switch,
  useColorMode,
  VStack,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import useUser from '~/hooks/use-user'
import ProfileLayout from '~/layouts/ProfileLayout'
import { BASE_API_URL } from '~/utils/constants'
import { getToken } from '~/utils/functions'

export default function SettingsPage() {
  const { colorMode, toggleColorMode } = useColorMode()
  const { push } = useRouter()
  const { user, setUser } = useUser()

  useEffect(() => {
    if (!user) push('/auth')
  }, [push, user])

  return (
    <ProfileLayout>
      <VStack
        align='start'
        experimental_spaceY={5}
      >
        <Heading>site settings.</Heading>
        <Divider />
        <VStack
          experimental_spaceY={5}
          align='start'
        >
          <VStack
            align='start'
            experimental_spaceY={3}
          >
            <Heading size='sm'>1. appearence</Heading>
            <FormControl>
              <HStack align='center'>
                <FormLabel
                  htmlFor='color-mode'
                  mb='0'
                >
                  light mode?
                </FormLabel>
                <Switch
                  value={colorMode === 'light'}
                  onChange={toggleColorMode}
                  size='lg'
                  id='color-mode'
                />
              </HStack>
            </FormControl>
          </VStack>
          <Divider />
          <VStack
            align='start'
            experimental_spaceY={3}
          >
            <Heading size='sm'>2. account</Heading>
            <FormControl>
              <Button
                variant='outline'
                size='lg'
                colorScheme='red'
                onClick={async () => {
                  setUser(null)
                  const token = getToken()
                  await fetch(`${BASE_API_URL}/users`, {
                    method: 'DELETE',
                    headers: new Headers({
                      'Content-Type': 'application/json',
                      Authorization: `Bearer ${token}`,
                    }),
                    body: JSON.stringify({
                      uid: user?.uid,
                    }),
                  })
                }}
              >
                delete my account
              </Button>
            </FormControl>
          </VStack>
        </VStack>
      </VStack>
    </ProfileLayout>
  )
}
