import { useEffect } from 'react'
import NextLink from 'next/link'
import Router from 'next/router'
import useSWR from 'swr'

import { Button, Flex, Heading } from '@chakra-ui/react'
import { Plus } from 'react-feather'

import { useAuth } from '@/utils/auth'
import fetcher from '@/utils/fetcher'
import DashboardShell from '@/components/DashboardShell'
import BooklistEmptyState from '@/components/BooklistEmptyState'
import BooklistTableSkeleton from '@/components/BooklistTableSkeleton'
import BooklistTable from '@/components/BooklistTable'

function Booklist() {
  const { user } = useAuth()
  const { data } = useSWR(user ? ['/api/booklist', user.token] : null, fetcher)

  useEffect(() => {
    if (!user) {
      Router.push('/')
    }
  }, [user])

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
            color='teal.900'
            _hover={{ bg: 'teal.300' }}
            _active={{ bg: 'teal.400' }}
            leftIcon={<Plus size='15' />}
          >
            Add Book
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
