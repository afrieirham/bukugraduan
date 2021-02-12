import firebase from '@/lib/firebase'

const firestore = firebase.firestore()

export function saveUser(user) {
  return firestore.collection('users').doc(user.uid).set(user, { merge: true })
}
