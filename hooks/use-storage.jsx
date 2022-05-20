import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { storage } from '~/lib/firebase'

export default function useStorage(uid) {
  async function uploadImage(image, collection_name) {
    const uploadPath = `${uid}/${collection_name}/${image?.name}`
    const imgRef = ref(storage, uploadPath)
    const { ref: newRef } = await uploadBytes(imgRef, image)
    const url = await getDownloadURL(newRef)
    return url
  }

  return { uploadImage }
}
