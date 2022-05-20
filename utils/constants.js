export const BASE_API_URL =
  process?.env?.NODE_ENV === 'production' ? '' : 'http://localhost:4001/api'

export const FIREBASE_API_KEY = process?.env?.NEXT_PUBLIC_FIREBASE_API_KEY
export const FIREBASE_PROJECT_ID = process?.env?.NEXT_PUBLIC_FIREBASE_PROJECT_ID
export const FIREBASE_APP_ID = process?.env?.NEXT_PUBLIC_FIREBASE_APP_ID
export const FIREBASE_MESSAGE_SENDER_ID =
  process?.env?.NEXT_PUBLIC_FIREBASE_MESSAGE_SENDER_ID
