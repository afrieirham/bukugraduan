import algoliasearch from 'algoliasearch/lite'

const client = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
  process.env.NEXT_PUBLIC_ALGOLIA_API_KEY,
)

export const algoliaIndex = client.initIndex(process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME)
export const algoliaHeaders = { 'x-algolia-api-key': process.env.NEXT_PUBLIC_ALGOLIA_API_KEY }
