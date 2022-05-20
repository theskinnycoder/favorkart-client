import {
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  HStack,
  PinInput,
  PinInputField,
  VStack,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useState } from 'react'
import usePhoneAuth from '~/hooks/use-phone-auth'

export default function OTPForm() {
  const [otp, setOtp] = useState('')
  const [error, setError] = useState('')

  const { push } = useRouter()
  const { generateReCaptcha, login, error: authError, loading } = usePhoneAuth()

  async function submitHandler(e) {
    e.preventDefault()
    generateReCaptcha()
    if (authError) setError(authError)
    if (otp.length !== 6) {
      setError('Invalid OTP')
      return
    }
    await login(otp)
    push('/me/profile')
  }

  return (
    <VStack
      as='form'
      onSubmit={submitHandler}
      experimental_spaceY={5}
      noValidate
    >
      <FormControl
        isInvalid={error}
        isRequired
      >
        <FormLabel
          fontWeight='semibold'
          color='primary'
        >
          enter the otp
        </FormLabel>
        <HStack>
          <PinInput
            autoFocus
            otp
            size='lg'
            variant='filled'
            value={otp}
            onChange={val => setOtp(val)}
            required
          >
            <PinInputField />
            <PinInputField />
            <PinInputField />
            <PinInputField />
            <PinInputField />
            <PinInputField />
          </PinInput>
        </HStack>
        {error ? (
          <FormErrorMessage>{error}</FormErrorMessage>
        ) : (
          <FormHelperText>
            please enter the otp sent to your phone.
          </FormHelperText>
        )}
      </FormControl>

      <Button
        type='submit'
        size='lg'
        isDisabled={loading}
        isLoading={loading}
      >
        verify
      </Button>
    </VStack>
  )
}
