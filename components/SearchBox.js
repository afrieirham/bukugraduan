import React from 'react'
import { Box, Button, Flex, Input, useBreakpointValue } from '@chakra-ui/react'
import { connectSearchBox } from 'react-instantsearch-dom'

import PoweredByAlgolia from './PoweredByAlgolia'

function SearchBox({ currentRefinement, refine }) {
  const buttonSize = useBreakpointValue({ base: 'sm', sm: 'lg' })
  return (
    <Box
      as='form'
      mt={{ base: 8, sm: 16 }}
      position='relative'
      noValidate
      action=''
      role='search'
      onSubmit={(e) => e.preventDefault()}
    >
      <Input
        bg='white'
        variant='filled'
        px={{ base: 4, sm: 8 }}
        py={{ base: 8, sm: 10 }}
        placeholder='Book title that you’re looking for'
        _focus={{ bg: 'white' }}
        type='search'
        value={currentRefinement}
        onChange={(event) => refine(event.currentTarget.value)}
        fontSize={{ base: 'sm', sm: 'md' }}
      />
      <Button
        position='absolute'
        right={{ base: 4, sm: 8 }}
        top={5}
        size={buttonSize}
        backgroundColor='teal.200'
        color='teal.900'
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
