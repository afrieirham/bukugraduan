import React from 'react'
import { mutate } from 'swr'
import { Trash } from 'react-feather'
import { formatRelative, parseISO } from 'date-fns'
import { Box, IconButton, Switch } from '@chakra-ui/react'

import { Td } from './Table'
import { useAuth } from '@/utils/auth'
import { updateListing } from '@/utils/db'

function BooklistTableRow({ id, title, price, isSold, createdAt }) {
  const { user } = useAuth()

  const onToggle = (e) => {
    const isSold = e.target.checked

    const mutateBooklist = ({ booklist }) => {
      return {
        booklist: booklist.map((list) => (list.id === id ? { ...list, isSold } : list)),
      }
    }

    mutate(['/api/booklist', user.token], mutateBooklist, false)
    updateListing(id, { isSold })
  }

  return (
    <Box as='tr'>
      <Td>{title}</Td>
      <Td>{price}</Td>
      <Td>
        <Switch colorScheme='green' isChecked={isSold} onChange={onToggle} />
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
