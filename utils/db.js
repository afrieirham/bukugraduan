import firebase from '@/lib/firebase'

const firestore = firebase.firestore()

export function saveUser(user) {
  return firestore.collection('users').doc(user.uid).set(user, { merge: true })
}

export async function getFirestoreUser(uid) {
  const doc = await firestore.collection('users').doc(uid).get()
  const user = { id: doc.id, ...doc.data() }
  return user
}

export function addBook(book) {
  const newBooklist = firestore.collection('booklist').doc()
  newBooklist.set(book)
  return newBooklist
}
