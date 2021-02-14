import React from 'react'
import { Trash } from 'react-feather'
import { formatRelative, parseISO } from 'date-fns'
import { Box, IconButton, Switch } from '@chakra-ui/react'

import { Td } from './Table'

function BooklistTableRow({ title, price, isSold, createdAt }) {
  return (
    <Box as='tr'>
      <Td>{title}</Td>
      <Td>{price}</Td>
      <Td>
        <Switch colorScheme='green' isChecked={isSold} />
      </Td>
      <Td>{formatRelative(parseISO(createdAt), new Date())}</Td>
      <Td>
        <IconButton variant='ghost'>
          <Trash size='15' />
        </IconButton>
      </Td>
    </Box>
  )
}

export default BooklistTableRow
