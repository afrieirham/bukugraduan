import React from 'react'

import { Table, Th, Tr } from './Table'
import BookRequestTableRow from './BookRequestTableRow'

function BookRequestTable({ requests }) {
  return (
    <Table>
      <thead>
        <Tr>
          <Th>Book Title</Th>
          <Th>User</Th>
          <Th>Contact</Th>
          <Th>Date Added</Th>
          <Th> </Th>
        </Tr>
      </thead>
      <tbody>
        {requests.map((request) => (
          <BookRequestTableRow key={request.id} {...request} />
        ))}
      </tbody>
    </Table>
  )
}

export default BookRequestTable
