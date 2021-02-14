import firebase from '@/lib/firebase'
import { v4 as uuidv4 } from 'uuid'

const storage = firebase.storage()

export const uploadPhoto = async (file) => {
  const booklistRef = storage.ref()
  const fileExt = file.name.split('.').pop()
  return booklistRef.child(`booklist/${uuidv4()}.${fileExt}`).put(file)
}
