import { signOut } from 'firebase/auth'
import { useState } from 'react'
import { auth } from '~/lib/firebase'

export default function useLogout() {
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  async function logout() {
    setError(null)
    setLoading(true)
    try {
      await signOut(auth)
      setError(null)
    } catch (e) {
      console.log(e?.message)
      setError(e?.message)
    } finally {
      setLoading(false)
    }
  }

  return { error, loading, logout }
}
