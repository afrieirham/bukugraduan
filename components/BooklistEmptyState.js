import NextLink from 'next/link'
import { Button, Flex, Heading, Text } from '@chakra-ui/react'

function BooklistEmptyState() {
  return (
    <Flex
      width='100%'
      backgroundColor='white'
      borderRadius='8px'
      p={16}
      justify='center'
      align='center'
      direction='column'
    >
      <Heading size='lg' mb={2}>
        You haven’t list any books yet
      </Heading>
      <Text mb={8}>Look up books that you have no use for, and list it!</Text>
      <NextLink href='/add-book'>
        <Button
          backgroundColor='teal.200'
          color='teal.800'
          _hover={{ bg: 'teal.300' }}
          _active={{ bg: 'teal.400' }}
        >
          List My First Book
        </Button>
      </NextLink>
    </Flex>
  )
}

export default BooklistEmptyState
