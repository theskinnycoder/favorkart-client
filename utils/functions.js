import { getIdToken } from 'firebase/auth'
import Cookies from 'js-cookie'

// LocalStorage can also be used
export async function createToken(user) {
  const token = await getIdToken(user)
  Cookies.set('token', token, {
    expires: 7,
    sameSite: 'lax',
  })
}

export function destroyToken() {
  return Cookies.remove('token')
}

export function getToken() {
  return Cookies.get('token')
}
