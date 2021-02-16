import React from 'react'
import NextLink from 'next/link'
import { mutate } from 'swr'
import { formatRelative, parseISO } from 'date-fns'
import { Box, Link, Switch } from '@chakra-ui/react'

import { Td } from './Table'
import { useAuth } from '@/utils/auth'
import { updateListing } from '@/utils/db'
import DeleteBooklistButton from './DeleteBooklistButton'

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
      <Td fontWeight='semibold'>
        <NextLink href={`/listing/${id}`} passHref>
          <Link>{title}</Link>
        </NextLink>
      </Td>
      <Td>{price}</Td>
      <Td>
        <Switch colorScheme='green' isChecked={isSold} onChange={onToggle} />
      </Td>
      <Td>{formatRelative(parseISO(createdAt), new Date())}</Td>
      <Td>
        <DeleteBooklistButton booklistId={id} />
      </Td>
    </Box>
  )
}

export default BooklistTableRow
