import React from 'react'
import { Box, Skeleton, useBreakpointValue } from '@chakra-ui/react'
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
  const width_1 = useBreakpointValue({ base: '20px', md: '75px' })
  const width_2 = useBreakpointValue({ base: '20px', md: '125px' })
  const width_3 = useBreakpointValue({ base: '20px', md: '50px' })
  const width_4 = useBreakpointValue({ base: '20px', md: '100px' })
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
        <SkeletonRow width={width_1} />
        <SkeletonRow width={width_2} />
        <SkeletonRow width={width_3} />
        <SkeletonRow width={width_4} />
        <SkeletonRow width={width_1} />
      </tbody>
    </Table>
  )
}

export default BooklistTableSkeleton
