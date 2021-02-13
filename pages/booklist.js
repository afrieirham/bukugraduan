import NextLink from 'next/link'
import useSWR from 'swr'

import { Button, Flex, Heading } from '@chakra-ui/react'

import DashboardShell from '@/components/DashboardShell'
import BooklistEmptyState from '@/components/BooklistEmptyState'
import fetcher from '@/utils/fetcher'
import BooklistTableSkeleton from '@/components/BooklistTableSkeleton'
import BooklistTable from '@/components/BooklistTable'
import { useAuth } from '@/utils/auth'

function Booklist() {
  const { user } = useAuth()
  const { data } = useSWR(user ? ['/api/booklist', user.token] : null, fetcher)

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
          My Booklist
        </Heading>
        <NextLink href='/add-book'>
          <Button
            backgroundColor='teal.200'
            color='teal.800'
            _hover={{ bg: 'teal.300' }}
            _active={{ bg: 'teal.400' }}
          >
            + Add Book
          </Button>
        </NextLink>
      </Flex>
      {!data ? (
        <BooklistTableSkeleton />
      ) : data.booklist.length === 0 ? (
        <BooklistEmptyState />
      ) : (
        <BooklistTable booklist={data.booklist} />
      )}
    </DashboardShell>
  )
}

export default Booklist
