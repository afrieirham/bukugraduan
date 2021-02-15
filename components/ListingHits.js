import { connectHits } from 'react-instantsearch-dom'
import { Heading, Text, Box } from '@chakra-ui/react'

import Listing from './Listing'
import ListingSkeleton from './ListingSkeleton'

function ListingHits({ hits }) {
  return (
    <Box mt={8} width='800px' mx='auto'>
      {hits?.length === 0 ? (
        <Text>There are no listed books currently</Text>
      ) : (
        <Heading size='sm'>Browse for books 👇🏻</Heading>
      )}
      {!hits ? (
        <>
          <ListingSkeleton />
          <ListingSkeleton />
        </>
      ) : (
        hits.map((hit) => <Listing key={hit.objectID} id={hit.objectID} {...hit} />)
      )}
    </Box>
  )
}

export default connectHits(ListingHits)
