import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  getDoc,
  query,
  setDoc,
} from 'firebase/firestore'
import { auth, db } from '~/lib/firebase'
import { COLLECTIONS } from '~/utils/enums'

export default function useFireStore(collection_name = COLLECTIONS.BAG) {
  function getAllDocs() {
    return query(collection(db, collection_name))
  }

  async function addDoc(document, operation = 'increment') {
    const collRef = collection(db, collection_name)
    const docRef = doc(collRef, auth?.currentUser?.uid)
    const docSnapshot = await getDoc(docRef)
    if (docSnapshot?.exists()) {
      const count = docSnapshot?.data()?.count
      let value = 1
      switch (operation) {
        case 'increment':
          value = count + 1
          break
        case 'decrement':
          value = count - 1
          break
        case 'set_one':
          value = 1
        default:
          break
      }
      if (value === 0) {
        await deleteDoc(docRef, document)
      } else {
        await setDoc(docRef, { ...document, count: value })
      }
    } else {
      await setDoc(docRef, { ...document, count: 1 })
    }
  }

  async function removeDoc(document) {
    const collRef = collection(db, collection_name)
    const docRef = doc(collRef, auth?.currentUser?.uid)
    await deleteDoc(docRef, document)
  }

  async function clearAllDocs() {
    const collRef = collection(db, collection_name)
    const querySnapShot = await getDocs(collRef)

    querySnapShot.forEach(document => {
      const docRef = doc(collRef, auth?.currentUser?.uid)
      deleteDoc(docRef, document)
    })
  }

  return { getAllDocs, addDoc, removeDoc, clearAllDocs }
}
