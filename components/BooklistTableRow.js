import React from 'react'
import NextLink from 'next/link'
import { mutate } from 'swr'
import { formatRelative, parseISO } from 'date-fns'
import { Box, Link, Switch, useBreakpointValue } from '@chakra-ui/react'

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

  const breakpoint = useBreakpointValue({ md: 'md' })
  const switchSize = useBreakpointValue({ base: 'sm', md: 'md' })

  return (
    <Box as='tr'>
      <Td fontWeight='semibold' fontSize={{ base: 'sm', md: 'md' }}>
        <NextLink href={`/listing/${id}`} passHref>
          <Link isTruncated noOfLines={1}>
            {title}
          </Link>
        </NextLink>
      </Td>
      <Td fontSize={{ base: 'sm', md: 'md' }}>{price}</Td>
      <Td>
        <Switch colorScheme='green' isChecked={isSold} onChange={onToggle} size={switchSize} />
      </Td>
      {breakpoint === 'md' && <Td>{formatRelative(parseISO(createdAt), new Date())}</Td>}
      <Td>
        <DeleteBooklistButton booklistId={id} />
      </Td>
    </Box>
  )
}

export default BooklistTableRow
