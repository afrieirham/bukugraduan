import React from 'react'
import NextLink from 'next/link'

import { Box, Button, useBreakpointValue } from '@chakra-ui/react'
import { Plus } from 'react-feather'

function AddBookButton() {
  const breakpoint = useBreakpointValue({ base: 'base', sm: 'sm', md: 'md', lg: 'lg' })
  return (
    <>
      {breakpoint !== 'base' ? (
        <NextLink href='/add-book'>
          <Button
            backgroundColor='teal.200'
            color='teal.900'
            _hover={{ bg: 'teal.300' }}
            _active={{ bg: 'teal.400' }}
            leftIcon={<Plus size='15' />}
          >
            Add Book
          </Button>
        </NextLink>
      ) : (
        <Box
          position='fixed'
          bottom='0'
          p={4}
          mx={-4}
          width='full'
          zIndex='2'
          display='flex'
          justifyContent='center'
        >
          <NextLink href='/add-book'>
            <Button
              backgroundColor='teal.200'
              color='teal.900'
              _hover={{ bg: 'teal.300' }}
              _active={{ bg: 'teal.400' }}
              leftIcon={<Plus size='20' />}
              size='lg'
              borderRadius='50px'
              boxShadow='base'
            >
              Add Book
            </Button>
          </NextLink>
        </Box>
      )}
    </>
  )
}

export default AddBookButton
