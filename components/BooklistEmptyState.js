import { Button, Flex, Heading, Text } from '@chakra-ui/react'

import { useAuth } from '@/utils/auth'
import { useValidateUser } from './Auth'

function BooklistEmptyState() {
  const { onClick, UserErrorModal } = useValidateUser()

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
        You haven’t listed any books yet
      </Heading>
      <Text mb={8}>Look up books that you have no use for, and list it!</Text>

      <Button
        backgroundColor='teal.200'
        color='teal.800'
        _hover={{ bg: 'teal.300' }}
        _active={{ bg: 'teal.400' }}
        onClick={onClick}
      >
        List My First Book
      </Button>
      <UserErrorModal />
    </Flex>
  )
}

export default BooklistEmptyState
