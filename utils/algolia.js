import { algoliaHeaders, algoliaIndex } from '@/lib/algolia'

export const getListings = async (searchField) => {
  const result = await algoliaIndex.search(searchField, { headers: algoliaHeaders })
  return { listings: result.hits }
}
