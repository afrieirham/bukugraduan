import firebase from '@/lib/firebase'
import { removePhoto } from './storage'

const firestore = firebase.firestore()

export function saveUser(user) {
  return firestore.collection('users').doc(user.uid).set(user, { merge: true })
}

export async function getFirestoreUser(uid) {
  const doc = await firestore.collection('users').doc(uid).get()
  const user = { id: doc.id, ...doc.data() }
  return user
}

export function addBook(listId, book) {
  const newBooklist = firestore.collection('booklist').doc(listId)
  newBooklist.set(book)
  return newBooklist
}

export function updateListing(listId, newValues) {
  return firestore.collection('booklist').doc(listId).update(newValues)
}

export function deleteListing(listId) {
  // Remove photo from storage
  removePhoto(listId)

  // Remove listing in firestore
  return firestore.collection('booklist').doc(listId).delete()
}
