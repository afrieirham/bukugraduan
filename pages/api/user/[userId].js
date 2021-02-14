import { getUserDetails } from '@/utils/db-admin'

export default async (req, res) => {
  try {
    const { user } = await getUserDetails(req.query.userId)
    res.status(200).json({ user })
  } catch (error) {
    res.status(500).json({ error })
  }
}
