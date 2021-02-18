import React from 'react'
import useSWR from 'swr'
import { Box, Flex, Heading, useBreakpointValue } from '@chakra-ui/react'

import fetcher from '@/utils/fetcher'
import DashboardShell from '@/components/DashboardShell'
import BookRequestModal from '@/components/BookRequestModal'
import BookRequestTable from '@/components/BookRequestTable'
import BookRequestTableSkeleton from '@/components/BookRequestTableSkeleton'
import BookRequestEmptyState from '@/components/BookRequestEmptyState'
import { useSEO } from '@/hooks/useSEO'

function BookRequest() {
  const { CustomNextSeo } = useSEO()
  const { data } = useSWR('/api/requests', fetcher)
  const breakpoint = useBreakpointValue({ base: 'base', sm: 'sm', md: 'md', lg: 'lg' })
  return (
    <DashboardShell>
      <CustomNextSeo />
      <Flex
        justifyContent='space-between'
        alignItems='center'
        maxWidth='900px'
        width='full'
        mx='auto'
        mt={{ base: 2, md: 16 }}
        mb={{ base: 2, md: 8 }}
      >
        <Heading as='h1' fontSize={{ base: '2xl', md: '3xl' }}>
          Book Request
        </Heading>
        {breakpoint !== 'base' ? (
          <BookRequestModal>Request a book</BookRequestModal>
        ) : (
          <Box
            position='fixed'
            bottom='0'
            p={4}
            mx={-4}
            width='full'
            zIndex='2'
            display='flex'
            justifyContent='center'
          >
            <BookRequestModal size='lg' borderRadius='50px' boxShadow='base'>
              Request a book
            </BookRequestModal>
          </Box>
        )}
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
