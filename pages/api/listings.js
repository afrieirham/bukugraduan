import { getAllListings } from '@/utils/db-admin'

export default async (_, res) => {
  try {
    const { listings } = await getAllListings()
    res.status(200).json({ listings })
  } catch (error) {
    res.status(500).json({ error })
  }
}
