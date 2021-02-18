import React from 'react'

import { Box, Button, useBreakpointValue } from '@chakra-ui/react'
import { Plus } from 'react-feather'
import { useValidateUser } from './Auth'

function AddBookButton() {
  const { onClick, UserErrorModal } = useValidateUser()
  const breakpoint = useBreakpointValue({ base: 'base', sm: 'sm', md: 'md', lg: 'lg' })

  return (
    <>
      {breakpoint !== 'base' ? (
        <Button
          backgroundColor='teal.200'
          color='teal.900'
          _hover={{ bg: 'teal.300' }}
          _active={{ bg: 'teal.400' }}
          leftIcon={<Plus size='15' />}
          onClick={onClick}
        >
          Add Book
        </Button>
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
          <Button
            backgroundColor='teal.200'
            color='teal.900'
            _hover={{ bg: 'teal.300' }}
            _active={{ bg: 'teal.400' }}
            leftIcon={<Plus size='20' />}
            size='lg'
            borderRadius='50px'
            boxShadow='base'
            onClick={onClick}
          >
            Add Book
          </Button>
        </Box>
      )}
      <UserErrorModal />
    </>
  )
}

export default AddBookButton
