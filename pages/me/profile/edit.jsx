import {
  Avatar,
  Button,
  Divider,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  HStack,
  Icon,
  IconButton,
  Input,
  InputGroup,
  Tag,
  TagLabel,
  VStack,
} from '@chakra-ui/react'
import {
  EmailAuthProvider,
  GoogleAuthProvider,
  linkWithCredential,
  linkWithPopup,
  TwitterAuthProvider,
  unlink,
  updateProfile,
} from 'firebase/auth'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { FcGoogle } from 'react-icons/fc'
import { FiTwitter } from 'react-icons/fi'
import { HiOutlineTrash } from 'react-icons/hi'
import useUser from '~/hooks/use-user'
import ProfileLayout from '~/layouts/ProfileLayout'
import { auth } from '~/lib/firebase'
import { BASE_API_URL } from '~/utils/constants'
import { formatUser, getToken } from '~/utils/functions'

export default function ProfileEditPage() {
  const { user, setUser } = useUser()
  const {
    register: formRegister,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm()

  const { push } = useRouter()

  useEffect(() => {
    if (!user) push('/auth')
  }, [push, user])

  async function submitHandler({ displayName, email }) {
    const token = getToken()

    if (email) {
      await Promise.all([
        linkWithCredential(
          auth?.currentUser,
          EmailAuthProvider.credential(email),
        ),
        fetch(`${BASE_API_URL}/users`, {
          method: 'PATCH',
          headers: new Headers({
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          }),
          body: JSON.stringify({
            email,
          }),
        }),
      ])
    }
    if (displayName) {
      await Promise.all([
        updateProfile(auth?.currentUser, { displayName }),
        fetch(`${BASE_API_URL}/users`, {
          method: 'PATCH',
          headers: new Headers({
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          }),
          body: JSON.stringify({
            displayName,
          }),
        }),
      ])
    }
  }

  return (
    <ProfileLayout>
      <VStack
        align='start'
        w='full'
        experimental_spaceY={10}
      >
        <VStack
          align='start'
          experimental_spaceY={8}
        >
          <Heading>complete your profile.</Heading>
          <Divider />
          <VStack
            align='stretch'
            experimental_spaceY={5}
            as='form'
            onSubmit={handleSubmit(data => submitHandler(data))}
            noValidate
          >
            <Heading size='sm'>1. basic profile info.</Heading>
            <FormControl isInvalid={errors?.displayName}>
              <FormLabel
                color='primary'
                fontWeight='semibold'
              >
                display name
              </FormLabel>
              <InputGroup
                w='lg'
                size='lg'
              >
                <Input
                  autoComplete='off'
                  {...formRegister('displayName', {
                    value: user?.displayName,
                  })}
                />
              </InputGroup>
              <FormErrorMessage>
                {errors?.displayName?.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors?.email}>
              <FormLabel
                color='primary'
                fontWeight='semibold'
              >
                email
              </FormLabel>
              <InputGroup
                w='lg'
                size='lg'
              >
                <Input
                  type='email'
                  autoComplete='off'
                  {...formRegister('email', {
                    value: user?.email,
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'invalid email address.',
                    },
                  })}
                />
              </InputGroup>
              <FormErrorMessage>{errors?.email?.message}</FormErrorMessage>
            </FormControl>

            <Button
              type='submit'
              alignSelf='start'
              isDisabled={isSubmitting}
              isLoading={isSubmitting}
            >
              update
            </Button>
          </VStack>
        </VStack>
        <Divider />
        <VStack
          align='start'
          experimental_spaceY={5}
          paddingTop={7}
        >
          <Heading size='sm'>2. linked social accounts.</Heading>
          <VStack
            experimental_spaceY={5}
            w='full'
            align='start'
          >
            <HStack experimental_spaceX={10}>
              <Icon
                as={FcGoogle}
                fontSize='2xl'
              />
              {user?.providerData?.find(
                provider => provider.providerId === 'google.com',
              ) ? (
                <>
                  <Tag
                    size='lg'
                    colorScheme='gray'
                    borderRadius='full'
                  >
                    <Avatar
                      src={
                        user?.providerData?.find(
                          provider => provider.providerId === 'google.com',
                        )?.photoURL
                      }
                      size='xs'
                      name={
                        user?.providerData?.find(
                          provider => provider.providerId === 'google.com',
                        )?.displayName
                      }
                      ml={-1}
                      mr={2}
                    />
                    <TagLabel>
                      {
                        user?.providerData?.find(
                          provider => provider.providerId === 'google.com',
                        )?.displayName
                      }
                    </TagLabel>
                  </Tag>
                  <IconButton
                    variant='ghost'
                    colorScheme='red'
                    icon={<HiOutlineTrash />}
                    onClick={async () => {
                      await unlink(auth?.currentUser, 'google.com')
                      setUser(await formatUser(auth?.currentUser))
                    }}
                  />
                </>
              ) : (
                <Button
                  colorScheme='gray'
                  onClick={async () => {
                    await linkWithPopup(
                      auth?.currentUser,
                      new GoogleAuthProvider(),
                    )
                    setUser(await formatUser(auth?.currentUser))
                  }}
                >
                  + link now
                </Button>
              )}
            </HStack>
            <Divider />
            <HStack experimental_spaceX={10}>
              <Icon
                as={FiTwitter}
                color='twitter.500'
                fontSize='2xl'
              />
              {user?.providerData?.find(
                provider => provider.providerId === 'twitter.com',
              ) ? (
                <>
                  <Tag
                    size='lg'
                    colorScheme='gray'
                    borderRadius='full'
                  >
                    <Avatar
                      src={
                        user?.providerData?.find(
                          provider => provider.providerId === 'twitter.com',
                        )?.photoURL
                      }
                      size='xs'
                      name={
                        user?.providerData?.find(
                          provider => provider.providerId === 'twitter.com',
                        )?.displayName
                      }
                      ml={-1}
                      mr={2}
                    />
                    <TagLabel>
                      {
                        user?.providerData?.find(
                          provider => provider.providerId === 'twitter.com',
                        )?.displayName
                      }
                    </TagLabel>
                  </Tag>
                  <IconButton
                    variant='ghost'
                    colorScheme='red'
                    icon={<HiOutlineTrash />}
                    onClick={async () => {
                      await unlink(auth?.currentUser, 'twitter.com')
                      setUser(await formatUser(auth?.currentUser))
                    }}
                  />
                </>
              ) : (
                <Button
                  colorScheme='gray'
                  onClick={async () => {
                    await linkWithPopup(
                      auth?.currentUser,
                      new TwitterAuthProvider(),
                    )
                    setUser(await formatUser(auth?.currentUser))
                  }}
                >
                  + link now
                </Button>
              )}
            </HStack>
          </VStack>
        </VStack>
      </VStack>
      <div id='recaptcha'></div>
    </ProfileLayout>
  )
}
