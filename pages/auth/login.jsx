import {
  Button,
  Divider,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  IconButton,
  Input,
  InputGroup,
  Link,
  Text,
  useToast,
} from '@chakra-ui/react'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import useAuth from '~/hooks/use-auth'
import { FcGoogle } from 'react-icons/fc'
import { FiTwitter } from 'react-icons/fi'

export default function LoginPage() {
  const {
    register: formRegister,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = useForm()
  const { push } = useRouter()

  const { login, loginWithSocials } = useAuth()
  const toast = useToast()

  async function submitHandler({ email, password }) {
    const { user, error } = await login(email, password)
    if (error && !user) {
      toast({
        title: 'Error',
        description: error,
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top',
      })
    } else {
      toast({
        title: 'Success',
        description: 'You are now logged in.',
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'top',
      })
      reset()
      push('/app/profile')
    }
  }

  return (
    <Flex justify='center'>
      <Flex
        as='form'
        onSubmit={handleSubmit(data => submitHandler(data))}
        experimental_spaceY={10}
        shadow='2xl'
        p={10}
        flexDir='column'
        align='center'
        noValidate
      >
        <Heading size='3xl'>Login!</Heading>
        <Flex
          experimental_spaceX={1}
          mr='auto'
        >
          <Text>Don&apos;t have an account?</Text>
          <NextLink
            href='/auth/register'
            passHref
          >
            <Link
              fontWeight='semibold'
              color='primary'
            >
              Register
            </Link>
          </NextLink>
        </Flex>

        {/* Email Field */}
        <FormControl
          isInvalid={errors?.email}
          isRequired
        >
          <FormLabel
            fontWeight='semibold'
            color='primary'
          >
            Email Address
          </FormLabel>
          <InputGroup
            w='lg'
            size='lg'
            variant='outline'
          >
            <Input
              type='email'
              placeholder='Ex: elonmusk@gmail.com'
              autoComplete='off'
              {...formRegister('email', {
                required: {
                  value: true,
                  message: 'An Email is Required',
                },
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: 'Invalid Email Address',
                },
              })}
            />
          </InputGroup>
          <FormErrorMessage>{errors?.email?.message}</FormErrorMessage>
        </FormControl>

        {/* Password */}
        <FormControl
          isInvalid={errors?.password}
          isRequired
        >
          <FormLabel
            fontWeight='semibold'
            color='primary'
          >
            Password
          </FormLabel>
          <InputGroup
            w='lg'
            size='lg'
            variant='outline'
          >
            <Input
              type='password'
              {...formRegister('password', {
                required: {
                  value: true,
                  message: 'A Password is Required',
                },
              })}
            />
          </InputGroup>
          <FormErrorMessage>{errors?.password?.message}</FormErrorMessage>
        </FormControl>

        {/* Submit Button */}
        <Button
          type='submit'
          size='lg'
          isDisabled={isSubmitting || errors?.email || errors?.password}
        >
          Login
        </Button>

        <Divider />

        <Flex
          flexDir='column'
          justify='center'
          align='center'
          experimental_spaceY={4}
        >
          <Text>Or continue with :</Text>
          <Flex
            justify='center'
            align='center'
            w='full'
            h={10}
            experimental_spaceX={2}
          >
            <IconButton
              colorScheme='gray'
              size='lg'
              variant='ghost'
              onClick={() => {
                loginWithSocials('GOOGLE')
              }}
              icon={<FcGoogle />}
            />
            <Divider orientation='vertical' />
            <IconButton
              colorScheme='gray'
              size='lg'
              color='twitter.500'
              variant='ghost'
              onClick={() => {
                loginWithSocials('TWITTER')
              }}
              icon={<FiTwitter />}
            />
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  )
}
