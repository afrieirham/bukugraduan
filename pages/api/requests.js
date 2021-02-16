import { getAllBookRequest } from '@/utils/db-admin'

export default async (_, res) => {
  try {
    const { requests } = await getAllBookRequest()
    res.status(200).json({ requests })
  } catch (error) {
    res.status(500).json({ error })
  }
}
