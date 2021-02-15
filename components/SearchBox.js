import React from 'react'
import { Box, Button, Flex, Input } from '@chakra-ui/react'
import { connectSearchBox } from 'react-instantsearch-dom'

import PoweredByAlgolia from './PoweredByAlgolia'

function SearchBox({ currentRefinement, refine }) {
  return (
    <Box
      as='form'
      mt={16}
      position='relative'
      noValidate
      action=''
      role='search'
      onSubmit={(e) => e.preventDefault()}
    >
      <Input
        bg='white'
        variant='filled'
        px={8}
        py={10}
        placeholder='Book title that you’re looking for'
        _focus={{ bg: 'white' }}
        type='search'
        value={currentRefinement}
        onChange={(event) => refine(event.currentTarget.value)}
      />
      <Button
        position='absolute'
        right={8}
        top={5}
        size='lg'
        backgroundColor='teal.200'
        color='teal.700'
        _hover={{ bg: 'teal.300' }}
        _active={{ bg: 'teal.400' }}
      >
        Search
      </Button>
      <Flex justifyContent='flex-end' mt={4}>
        <PoweredByAlgolia />
      </Flex>
    </Box>
  )
}

export default connectSearchBox(SearchBox)
