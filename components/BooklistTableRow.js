import React from 'react'
import { Trash } from 'react-feather'
import { format, parseISO } from 'date-fns'
import { Box, IconButton, Switch } from '@chakra-ui/react'

import { Td } from './Table'
import { useAuth } from '@/utils/auth'

function BooklistTableRow({ title, price, isSold, createdAt }) {
  return (
    <Box as='tr'>
      <Td>{title}</Td>
      <Td>{price}</Td>
      <Td>
        <Switch colorScheme='green' />
      </Td>
      <Td>{format(parseISO(createdAt), 'd/MM/yyyy')}</Td>
      <Td>
        <IconButton variant='ghost'>
          <Trash size='15' />
        </IconButton>
      </Td>
    </Box>
  )
}

export default BooklistTableRow
