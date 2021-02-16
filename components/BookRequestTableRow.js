import React from 'react'
import useSWR from 'swr'
import { formatRelative, parseISO } from 'date-fns'
import { Box, Link } from '@chakra-ui/react'

import { Td, Tr } from './Table'
import { useAuth } from '@/utils/auth'
import fetcher from '@/utils/fetcher'
import DeleteBookRequestButton from './DeleteBookRequestButton'

function BookRequestTableRow({ id, title, createdAt, authorId }) {
  const { user } = useAuth()
  const { data } = useSWR(user ? [`/api/user/${authorId}`, user.token] : null, fetcher)

  return (
    <Box key={id} as={Tr}>
      <Td fontWeight='semibold'>{title}</Td>
      <Td>{data?.user?.name || 'Anonymous'}</Td>
      <Td>
        {data?.user?.mobile ? (
          <Link color='blue.500'>{data.user.mobile}</Link>
        ) : user ? (
          'Not Provided'
        ) : (
          'Login to view'
        )}
      </Td>
      <Td>{formatRelative(parseISO(createdAt), new Date())}</Td>
      <Td>{user?.uid === authorId && <DeleteBookRequestButton requestId={id} />}</Td>
    </Box>
  )
}

export default BookRequestTableRow
