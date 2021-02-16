import { compareDesc, parseISO } from 'date-fns'
import { db } from '@/lib/firebase-admin'

export async function getUserBooklist(uid) {
  const snapshot = await db.collection('booklist').where('authorId', '==', uid).get()

  const booklist = []
  snapshot.forEach((doc) => {
    booklist.push({ id: doc.id, ...doc.data() })
  })

  const sortedList = booklist.sort((a, b) =>
    compareDesc(parseISO(a.createdAt), parseISO(b.createdAt)),
  )

  return { booklist: sortedList }
}

export async function getAllListings() {
  const snapshot = await db.collection('booklist').where('isSold', '==', false).get()

  const listings = []
  snapshot.forEach((doc) => {
    listings.push({ id: doc.id, ...doc.data() })
  })

  const sortedList = listings.sort((a, b) =>
    compareDesc(parseISO(a.createdAt), parseISO(b.createdAt)),
  )

  return { listings: sortedList }
}

export async function getListing(listId) {
  const doc = await db.collection('booklist').doc(listId).get()
  const listing = { id: doc.id, ...doc.data() }
  return { listing }
}

export async function getUserDetails(uid) {
  const doc = await db.collection('users').doc(uid).get()
  const user = { id: doc.id, ...doc.data() }
  return { user }
}

export async function getAllBookRequest() {
  const snapshot = await db.collection('requests').where('status', '!=', 'deleted').get()

  const requests = []
  snapshot.forEach((doc) => {
    requests.push({ id: doc.id, ...doc.data() })
  })

  const sortedRequests = requests.sort((a, b) =>
    compareDesc(parseISO(a.createdAt), parseISO(b.createdAt)),
  )

  return { requests: sortedRequests }
}
