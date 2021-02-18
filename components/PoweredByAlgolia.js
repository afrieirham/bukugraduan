import React from 'react'
import { Link, Text } from '@chakra-ui/react'

function PoweredByAlgolia() {
  return (
    <Text fontSize='xs' color='gray.500'>
      Search powered by{' '}
      <Link as='a' href='https://www.algolia.com' isExternal>
        Algolia
      </Link>
    </Text>
  )
}

export default PoweredByAlgolia
