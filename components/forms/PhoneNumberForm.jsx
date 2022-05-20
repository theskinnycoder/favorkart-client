import {
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  VStack,
} from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import usePhoneAuth from '~/hooks/use-phone-auth'

export default function PhoneNumberForm({ setOtpSent }) {
  const {
    register: formRegister,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm()

  const { generateReCaptcha, sendOTP } = usePhoneAuth()

  async function submitHandler({ phoneNum }) {
    generateReCaptcha()
    await sendOTP(phoneNum)
    reset()
    setOtpSent(true)
  }

  return (
    <VStack
      as='form'
      onSubmit={handleSubmit(data => submitHandler(data))}
      experimental_spaceY={5}
      noValidate
    >
      <FormControl
        isInvalid={errors?.phoneNum}
        isRequired
      >
        <FormLabel
          fontWeight='semibold'
          color='primary'
        >
          phone number
        </FormLabel>
        <InputGroup
          w='lg'
          size='lg'
          variant='outline'
          alignItems='center'
        >
          <InputLeftElement pointerEvents='none'>
            <Text
              color='primary'
              fontSize='lg'
              fontWeight='semibold'
              letterSpacing={1}
            >
              +91
            </Text>
          </InputLeftElement>
          <Input
            type='tel'
            placeholder='9876543210'
            autoComplete='off'
            {...formRegister('phoneNum', {
              required: {
                value: true,
                message: 'please provide your phone number.',
              },
              pattern: {
                value: /^\+?[0-9]{10,15}$/,
                message: 'please provide a valid phone number.',
              },
            })}
          />
        </InputGroup>
        {errors?.phoneNum ? (
          <FormErrorMessage>{errors?.phoneNum?.message}</FormErrorMessage>
        ) : (
          <FormHelperText>
            we will send you a verification code to verify your phone number.
          </FormHelperText>
        )}
      </FormControl>
      <Button
        type='submit'
        isLoading={isSubmitting}
        isDisabled={isSubmitting}
        size='lg'
      >
        send otp
      </Button>
    </VStack>
  )
}
