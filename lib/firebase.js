import { getApp, getApps, initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
import {
  FIREBASE_API_KEY,
  FIREBASE_APP_ID,
  FIREBASE_MESSAGE_SENDER_ID,
  FIREBASE_PROJECT_ID,
} from '~/utils/constants'

if (getApps().length === 0) {
  initializeApp({
    apiKey: FIREBASE_API_KEY,
    projectId: FIREBASE_PROJECT_ID,
    appId: FIREBASE_APP_ID,
    authDomain: `${FIREBASE_PROJECT_ID}.firebaseapp.com`,
    storageBucket: `${FIREBASE_PROJECT_ID}.appspot.com`,
    messagingSenderId: FIREBASE_MESSAGE_SENDER_ID,
  })
}

const app = getApp()
export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)
