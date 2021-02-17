import { GoogleIcon } from '@/styles/icons'
import { useAuth } from '@/utils/auth'
import {
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  useDisclosure,
  useToast,
  Text,
  Button,
  useBreakpointValue,
} from '@chakra-ui/react'

export const withAuthModal = (Component) => (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { signInWithGoogle } = useAuth()
  const toast = useToast()

  const signIn = () => {
    signInWithGoogle()
      .then(() => {
        toast({
          title: 'Success!',
          description: 'Welcome to Buku Graduan!',
          status: 'success',
          duration: 3000,
          isClosable: true,
        })
        onClose()
      })
      .catch((error) => {
        toast({
          title: 'An error occurred.',
          description: error.message,
          status: 'error',
          duration: 9000,
          isClosable: true,
        })
      })
  }

  const isCentered = useBreakpointValue({ base: true, lg: false })

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} isCentered={isCentered} size='xs'>
        <ModalOverlay />
        <ModalContent borderRadius={4}>
          <ModalCloseButton />
          <ModalBody>
            <Flex direction='column' align='center' justify='center' p={12}>
              <Text fontWeight='semibold'>Pleas login to continue</Text>
              <Button
                onClick={signIn}
                backgroundColor='white'
                color='gray.900'
                variant='outline'
                mt={4}
                h='50px'
                _hover={{ bg: 'gray.100' }}
                _active={{ bg: 'gray.100' }}
                leftIcon={<GoogleIcon />}
              >
                Continue with Google
              </Button>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
      <Component openAuthModal={onOpen} {...props} />
    </>
  )
}
