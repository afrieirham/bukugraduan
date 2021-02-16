import { getUserDetails } from '@/utils/db-admin'
import { auth } from '@/lib/firebase-admin'

export default async (req, res) => {
  try {
    await auth.verifyIdToken(req.headers.token)
    const { user } = await getUserDetails(req.query.userId)
    res.status(200).json({ user })
  } catch (error) {
    res.status(500).json({ error })
  }
}
