import { onSnapshot } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { COLLECTIONS } from '~/utils/enums'
import useFireStore from './use-firestore'

export default function useBag() {
  const [bagItems, setBagItems] = useState([])

  const { addDoc, clearAllDocs, getAllDocs, removeDoc } = useFireStore(
    COLLECTIONS.BAG,
  )

  const { addDoc: addToWishlist } = useFireStore(COLLECTIONS.WISHLIST)

  useEffect(() => {
    const q = getAllDocs()

    const unsubscribe = onSnapshot(q, snapshot => {
      let results = []
      snapshot.docs.forEach(doc => {
        results.push({ ...doc?.data(), id: doc?.id })
      })

      setBagItems(results)
    })

    return () => unsubscribe()
  }, [])

  async function addToBag(item, operation = 'increment') {
    await addDoc(item, operation)
  }

  async function removeFromBag(item) {
    await removeDoc(item)
  }

  async function clearBag() {
    await clearAllDocs()
  }

  async function moveToWishlist(item) {
    await addDoc(item, 'set_one')
    await addToWishlist(item)
    await removeFromBag(item)
  }

  return {
    bagItems,
    addToBag,
    removeFromBag,
    clearBag,
    moveToWishlist,
  }
}
