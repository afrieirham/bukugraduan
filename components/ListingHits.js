import { connectInfiniteHits } from 'react-instantsearch-dom'
import { Heading, Text, Button, Flex } from '@chakra-ui/react'

import Listing from './Listing'
import ListingSkeleton from './ListingSkeleton'

function ListingHits({ hits, hasMore, refineNext }) {
  return (
    <Flex direction='column' mt={8} width='800px' mx='auto'>
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
      {hits && (
        <Flex justifyContent='center' my={8}>
          {hasMore ? (
            <Button onClick={refineNext} variant='solid' colorScheme='teal'>
              Show more
            </Button>
          ) : (
            <Text>You've reached the end 👋🏻</Text>
          )}
        </Flex>
      )}
    </Flex>
  )
}

export default connectInfiniteHits(ListingHits)
