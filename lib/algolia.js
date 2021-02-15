import algoliasearch from 'algoliasearch/lite'

export const INDEX_NAME = process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME

export const searchClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
  process.env.NEXT_PUBLIC_ALGOLIA_ADMIN_KEY,
)
