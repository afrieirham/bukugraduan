import React from 'react'
import useSWR from 'swr'
import { Flex, Heading } from '@chakra-ui/react'

import fetcher from '@/utils/fetcher'
import DashboardShell from '@/components/DashboardShell'
import BookRequestModal from '@/components/BookRequestModal'
import BookRequestTable from '@/components/BookRequestTable'
import BookRequestTableSkeleton from '@/components/BookRequestTableSkeleton'
import BookRequestEmptyState from '@/components/BookRequestEmptyState'

function BookRequest() {
  const { data } = useSWR('/api/requests', fetcher)
  return (
    <DashboardShell>
      <Flex
        justifyContent='space-between'
        alignItems='center'
        maxWidth='900px'
        width='full'
        mx='auto'
        mt={16}
        mb={8}
      >
        <Heading as='h1' size='xl'>
          Book Request
        </Heading>
        <BookRequestModal>Request a book</BookRequestModal>
      </Flex>

      {!data ? (
        <BookRequestTableSkeleton />
      ) : data.requests.length === 0 ? (
        <BookRequestEmptyState />
      ) : (
        <BookRequestTable requests={data.requests} />
      )}
    </DashboardShell>
  )
}

export default BookRequest
