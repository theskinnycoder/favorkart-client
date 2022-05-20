import { FcGoogle } from 'react-icons/fc'
import { FiTwitter } from 'react-icons/fi'

export const ROLES = Object.freeze({
  ADMIN: 'ADMIN',
  VENDOR: 'VENDOR',
  CUSTOMER: 'CUSTOMER',
})

export const OAUTH_PROVIDERS = Object.freeze({
  GOOGLE: {
    name: 'google.com',
    icon: FcGoogle,
  },
  TWITTER: {
    name: 'twitter.com',
    icon: FiTwitter,
  },
})

export const COLLECTIONS = Object.freeze({
  BAG: 'bag',
  WISHLIST: 'wishlist',
})
