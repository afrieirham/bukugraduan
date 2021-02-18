import React from 'react'
import { useBreakpointValue } from '@chakra-ui/react'

import { Table, Th, Tr } from './Table'
import BooklistTableRow from './BooklistTableRow'

function BooklistTable({ booklist }) {
  const breakpoint = useBreakpointValue({ md: 'md' })
  return (
    <Table>
      <thead>
        <Tr>
          <Th>Book Title</Th>
          <Th>Price (RM)</Th>
          <Th>Sold</Th>
          {breakpoint === 'md' && <Th>Date Added</Th>}
          <Th> </Th>
        </Tr>
      </thead>
      <tbody>
        {booklist.map((list) => (
          <BooklistTableRow key={list.id} {...list} />
        ))}
      </tbody>
    </Table>
  )
}

export default BooklistTable
