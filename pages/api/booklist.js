import { getUserBooklist } from '@/utils/db-admin'
import { auth } from '@/lib/firebase-admin'

export default async (req, res) => {
  try {
    const { uid } = await auth.verifyIdToken(req.headers.token)
    const { booklist } = await getUserBooklist(uid)
    res.status(200).json({ booklist })
  } catch (error) {
    res.status(500).json({ error })
  }
}
