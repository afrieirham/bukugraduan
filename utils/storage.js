import firebase from '@/lib/firebase'

const storage = firebase.storage()

export const uploadPhoto = async (listId, file) => {
  const booklistRef = storage.ref()
  return booklistRef.child(`booklist/${listId}`).put(file)
}

export const removePhoto = async (listId) => {
  const booklistRef = storage.ref()
  return booklistRef.child(`booklist/${listId}`).delete()
}
