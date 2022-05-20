import { Divider, Heading, HStack, VStack } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import OTPForm from '~/components/forms/OTPForm'
import PhoneNumberForm from '~/components/forms/PhoneNumberForm'
import useUser from '~/hooks/use-user'

export default function AuthPage() {
  const { push } = useRouter()
  const { user } = useUser()

  useEffect(() => {
    if (user) push('/me/profile')
  }, [push, user])

  const [otpSent, setOtpSent] = useState(false)

  return (
    <>
      <HStack justify='center'>
        <VStack
          experimental_spaceY={10}
          shadow='2xl'
          _dark={{
            shadow: 'dark-lg',
          }}
          p={10}
          rounded='md'
          align='flex-start'
        >
          <Heading size='xl'>login.</Heading>
          <Divider />
          {!otpSent ? <PhoneNumberForm setOtpSent={setOtpSent} /> : <OTPForm />}
        </VStack>
      </HStack>
      <div id='recaptcha'></div>
    </>
  )
}
