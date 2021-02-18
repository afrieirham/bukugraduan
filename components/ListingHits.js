import NextLink from 'next/link'
import { connectInfiniteHits } from 'react-instantsearch-dom'
import { Heading, Text, Button, Flex, Link } from '@chakra-ui/react'

import Listing from './Listing'
import ListingSkeleton from './ListingSkeleton'

function ListingHits({ hits, hasMore, refineNext }) {
  return (
    <Flex mt={8} direction='column' maxWidth='800px' width='full' mx='auto'>
      <Heading size='sm'>Browse for books 👇🏻</Heading>
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
            <Button onClick={refineNext} variant='ghost'>
              Show more
            </Button>
          ) : (
            <Flex direction='column' justifyContent='center' alignItems='center' color='gray.500'>
              <Text>You've reached the end 👋🏻</Text>
              <Text>
                Can't find your book?{' '}
                <NextLink href='/book-request' passHref>
                  <Text as={Link} fontWeight='semibold'>
                    Make a request!
                  </Text>
                </NextLink>
              </Text>
            </Flex>
          )}
        </Flex>
      )}
    </Flex>
  )
}

export default connectInfiniteHits(ListingHits)
