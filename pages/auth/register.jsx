import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
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

export default function LoginPage() {
  const {
    register: formRegister,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = useForm()
  const { push } = useRouter()

  const { register } = useAuth()
  const toast = useToast()

  async function submitHandler({ displayName, email, password }) {
    const { user, error } = await register(displayName, email, password)
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
        description: 'You have successfully registered.',
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
        p={10}
        mx='auto'
        align='center'
        flexDir='column'
        experimental_spaceY={10}
        shadow='2xl'
        noValidate
        onSubmit={handleSubmit(data => submitHandler(data))}
      >
        <Heading size='3xl'>Register!</Heading>
        <Flex
          experimental_spaceX={1}
          mr='auto'
        >
          <Text>Already have an account?</Text>
          <NextLink
            href='/auth/login'
            passHref
          >
            <Link
              fontWeight='semibold'
              color='primary'
            >
              Login
            </Link>
          </NextLink>
        </Flex>

        {/* Display Name Field */}
        <FormControl
          isInvalid={errors?.displayName}
          isRequired
        >
          <FormLabel
            fontWeight='semibold'
            color='primary'
          >
            Display Name
          </FormLabel>
          <InputGroup
            w='lg'
            size='lg'
            variant='outline'
          >
            <Input
              type='text'
              placeholder='Ex: Rahul SriRam'
              autoComplete='off'
              {...formRegister('displayName', {
                required: {
                  value: true,
                  message: 'A display name is Required',
                },
                minLength: {
                  value: 4,
                  message: 'Display name must be at least 4 characters',
                },
              })}
            />
          </InputGroup>
          <FormErrorMessage>{errors?.displayName?.message}</FormErrorMessage>
        </FormControl>

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
              autoComplete='off'
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
      </Flex>
    </Flex>
  )
}
