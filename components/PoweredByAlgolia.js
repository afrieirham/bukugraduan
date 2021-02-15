import React from 'react'
import { Link, Text } from '@chakra-ui/react'
import { connectPoweredBy } from 'react-instantsearch-dom'

function PoweredByAlgolia({ url }) {
  return (
    <Text fontSize='xs' color='gray.500'>
      Search powered by{' '}
      <Link as='a' href={url}>
        Algolia
      </Link>
    </Text>
  )
}

export default connectPoweredBy(PoweredByAlgolia)
