import firebase from '@/lib/firebase'

const firestore = firebase.firestore()

export function saveUser(user) {
  return firestore.collection('users').doc(user.uid).set(user, { merge: true })
}

export function addBook(book) {
  const newBooklist = firestore.collection('booklist').doc()
  newBooklist.set(book)
  return newBooklist
}
