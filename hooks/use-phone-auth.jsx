import {
  reauthenticateWithPhoneNumber,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from 'firebase/auth'
import { useState } from 'react'
import { auth } from '~/lib/firebase'
import { BASE_API_URL } from '~/utils/constants'
import { ROLES } from '~/utils/enums'
import { formatUser } from '~/utils/functions'
import useUser from './use-user'

const ADMIN_PHONE_NUMBERS = ['+917670885993']

const VENDOR_PHONE_NUMBERS = ['+919676229778', '+917013099762']

export default function usePhoneAuth() {
  const { setUser } = useUser()
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  function generateReCaptcha() {
    window.recaptchaVerifier = new RecaptchaVerifier(
      'recaptcha',
      {
        size: 'invisible',
        callback: _res => {},
      },
      auth,
    )
  }

  async function sendOTP(phoneNum) {
    setError(null)
    setLoading(true)
    try {
      const appVerifier = window?.recaptchaVerifier
      window.confirmationResult = await signInWithPhoneNumber(
        auth,
        `+91${phoneNum}`,
        appVerifier,
      )
      setError(null)
    } catch (e) {
      console.log(e?.message)
      setError(e?.message)
    } finally {
      setLoading(false)
    }
  }

  async function login(otp) {
    setError(null)
    setLoading(true)
    try {
      const confirmationResult = window?.confirmationResult
      const { user } = await confirmationResult.confirm(otp)

      const role =
        user?.phoneNumber === ADMIN_PHONE_NUMBERS[0]
          ? ROLES.ADMIN
          : VENDOR_PHONE_NUMBERS.some(num => num === user?.phoneNumber)
          ? ROLES.VENDOR
          : ROLES.USER

      await fetch(`${BASE_API_URL}/users`, {
        method: 'POST',
        headers: new Headers({
          'Content-Type': 'application/json',
        }),
        body: JSON.stringify({
          uid: user?.uid,
          phoneNumber: user?.phoneNumber,
          role,
        }),
      })

      setUser(await formatUser(user))

      setError(null)
      return user
    } catch (e) {
      console.log(e?.message)
      setError(e?.message)
    } finally {
      setLoading(false)
    }
  }

  async function reAuthenticate() {
    setError(null)
    setLoading(true)
    try {
      const appVerifier = window?.recaptchaVerifier
      window.confirmationResult = await reauthenticateWithPhoneNumber(
        auth?.currentUser,
        `${auth?.currentUser?.phoneNumber}`,
        appVerifier,
      )
      setError(null)
    } catch (e) {
      console.log(e?.message)
      setError(e?.message)
    } finally {
      setLoading(false)
    }
  }

  return {
    generateReCaptcha,
    sendOTP,
    reAuthenticate,
    login,
    error,
    loading,
  }
}
