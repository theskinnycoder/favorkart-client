import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth'
import { useContext } from 'react'
import { AuthContext } from '~/contexts/AuthContext'
import { auth } from '~/lib/firebase'
import { createToken, destroyToken } from '~/utils/functions'

export default function useAuth() {
  const { user, setUser } = useContext(AuthContext)

  async function register(displayName, email, password) {
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      )
      await updateProfile(user, { displayName })
      await createToken(user)
      setUser(user)
      return {
        user,
        error: null,
      }
    } catch (error) {
      console.log(error.message)
      return {
        user: null,
        error: error.message,
      }
    }
  }

  async function login(email, password) {
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password)
      await createToken(user)
      return {
        user,
        error: null,
      }
    } catch (error) {
      console.log(error.message)
      return {
        user: null,
        error: error.message,
      }
    }
  }

  async function logout() {
    await signOut(auth)
    destroyToken()
  }

  return { user, register, login, logout }
}
