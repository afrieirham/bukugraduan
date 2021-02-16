import { getListings } from '@/utils/algolia'

export default async (req, res) => {
  try {
    const { listings } = await getListings(req.query.search)
    res.status(200).json({ listings })
  } catch (error) {
    res.status(500).json({ error })
  }
}
