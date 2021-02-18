import Router from 'next/router'
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
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogCloseButton,
  AlertDialogBody,
  AlertDialogFooter,
} from '@chakra-ui/react'

import { GoogleIcon } from '@/styles/icons'
import { useAuth } from '@/utils/auth'

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
            <Flex direction='column' align='center' justify='center' p={4}>
              <Text fontWeight='semibold' textAlign='center'>
                Please login to continue
              </Text>
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

export const useValidateUser = () => {
  const { user } = useAuth()
  const { isOpen, onOpen, onClose } = useDisclosure()

  const openValidateUserModal = () => onOpen()

  const onClick = () => {
    if (user?.mobile) {
      Router.push('/add-book')
    } else {
      openValidateUserModal()
    }
  }

  function UserErrorModal() {
    const isCentered = useBreakpointValue({ base: true, lg: false })
    const modalSize = useBreakpointValue({ base: 'sm', md: 'md' })

    return (
      <AlertDialog
        motionPreset='slideInBottom'
        onClose={onClose}
        isOpen={isOpen}
        isCentered={isCentered}
        size={modalSize}
        mx={{ base: 2, md: 0 }}
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>Oops!</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>You haven't provide your mobile number yet.</AlertDialogBody>
          <AlertDialogFooter>
            <Button
              backgroundColor='teal.200'
              color='teal.900'
              _hover={{ bg: 'teal.300' }}
              _active={{ bg: 'teal.400' }}
              onClick={() => Router.push('/account')}
            >
              Go to account
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  }

  return { onClick, openValidateUserModal, UserErrorModal }
}
