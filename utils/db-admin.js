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
