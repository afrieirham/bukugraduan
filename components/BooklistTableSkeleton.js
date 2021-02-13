import React from 'react'
import { Box, Skeleton } from '@chakra-ui/react'
import { Table, Td, Th, Tr } from './Table'

const SkeletonRow = ({ width }) => (
  <Box as='tr'>
    <Td>
      <Skeleton height='10px' w={width} my={4} />
    </Td>
    <Td>
      <Skeleton height='10px' w={width} my={4} />
    </Td>
    <Td>
      <Skeleton height='10px' w={width} my={4} />
    </Td>
    <Td>
      <Skeleton height='10px' w={width} my={4} />
    </Td>
  </Box>
)

function BooklistTableSkeleton() {
  return (
    <Table>
      <thead>
        <Tr>
          <Th>Book Title</Th>
          <Th>Price (RM)</Th>
          <Th>Status</Th>
          <Th>Date Added</Th>
          <Th> </Th>
        </Tr>
      </thead>
      <tbody>
        <SkeletonRow width='75px' />
        <SkeletonRow width='125px' />
        <SkeletonRow width='50px' />
        <SkeletonRow width='100px' />
        <SkeletonRow width='75px' />
      </tbody>
    </Table>
  )
}

export default BooklistTableSkeleton
