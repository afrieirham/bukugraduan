import { useEffect } from 'react'
import Router from 'next/router'
import useSWR from 'swr'
import { Flex, Heading } from '@chakra-ui/react'

import { useAuth } from '@/utils/auth'
import fetcher from '@/utils/fetcher'
import DashboardShell from '@/components/DashboardShell'
import BooklistEmptyState from '@/components/BooklistEmptyState'
import BooklistTableSkeleton from '@/components/BooklistTableSkeleton'
import BooklistTable from '@/components/BooklistTable'
import AddBookButton from '@/components/AddBookButton'
import { useSEO } from '@/hooks/useSEO'

function Booklist() {
  const { user } = useAuth()
  const { data } = useSWR(user ? ['/api/booklist', user.token] : null, fetcher)
  const { CustomNextSeo } = useSEO()

  useEffect(() => {
    if (!user) {
      Router.push('/')
    }
  }, [user])

  return (
    <DashboardShell>
      <CustomNextSeo />
      <Flex
        justifyContent='space-between'
        alignItems='center'
        maxWidth='900px'
        width='full'
        mx='auto'
        mt={{ base: 4, md: 16 }}
        mb={{ base: 4, md: 8 }}
      >
        <Heading as='h1' fontSize={{ base: '2xl', md: '3xl' }}>
          My Booklist
        </Heading>
        <AddBookButton />
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
