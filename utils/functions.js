import { getIdToken, getIdTokenResult } from 'firebase/auth'
import Cookies from 'js-cookie'
import { ROLES } from './enums'

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

export async function formatUser(user) {
  const { claims } = await getIdTokenResult(user)

  return {
    uid: user?.uid,
    phoneNumber: user?.phoneNumber ?? '',
    email: user?.email ?? '',
    displayName: user?.displayName ?? '',
    photoURL: user?.photoURL ?? '',
    providerData: user?.providerData ?? [],
    role: claims?.role ?? ROLES.CUSTOMER,
  }
}
