import { onSnapshot } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { COLLECTIONS } from '~/utils/enums'
import useFireStore from './use-firestore'

export default function useWishlist() {
  const [wishlistItems, setWishlistItems] = useState([])

  const { addDoc, clearAllDocs, getAllDocs, removeDoc } = useFireStore(
    COLLECTIONS.WISHLIST,
  )

  const { addDoc: addToBag } = useFireStore(COLLECTIONS.BAG)

  useEffect(() => {
    const q = getAllDocs()

    const unsubscribe = onSnapshot(q, snapshot => {
      let results = []
      snapshot.docs.forEach(doc => {
        results.push({ ...doc?.data(), id: doc?.id })
      })

      setWishlistItems(results)
    })

    return () => unsubscribe()
  }, [])

  async function addToWishlist(item) {
    await addDoc(item)
  }

  async function removeFromWishlist(item) {
    await removeDoc(item)
  }

  async function clearWishlist() {
    await clearAllDocs()
  }

  async function moveToBag(item) {
    await addToBag(item)
    await removeFromWishlist(item)
  }

  return {
    wishlistItems,
    addToWishlist,
    removeFromWishlist,
    clearWishlist,
    moveToBag,
  }
}
