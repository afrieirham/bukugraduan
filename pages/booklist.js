import NextLink from 'next/link'
import { Button, Flex, Heading } from '@chakra-ui/react'

import DashboardShell from '@/components/DashboardShell'
import BooklistEmptyState from '@/components/BooklistEmptyState'

function Booklist() {
  return (
    <DashboardShell>
      <Flex
        justifyContent='space-between'
        alignItems='center'
        maxWidth='900px'
        width='full'
        mx='auto'
        mt={16}
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
      <BooklistEmptyState />
    </DashboardShell>
  )
}

export default Booklist
