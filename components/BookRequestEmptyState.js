import { Flex, Heading, Text } from '@chakra-ui/react'

function BookRequestEmptyState() {
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
        There are no book request
      </Heading>
      <Text mb={8}>You can request for books if you can't find it in the listing.</Text>
    </Flex>
  )
}

export default BookRequestEmptyState
