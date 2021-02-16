import { useForm } from 'react-hook-form'
import { mutate } from 'swr'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Button,
  useDisclosure,
  useToast,
} from '@chakra-ui/react'

import { useAuth } from '@/utils/auth'
import { makeRequest } from '@/utils/db'

function BookRequestModal({ children }) {
  const toast = useToast()
  const { user } = useAuth()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { handleSubmit, register } = useForm()

  const onSubmit = async ({ title }) => {
    const newRequest = {
      title,
      status: 'active',
      authorId: user.uid,
      createdAt: new Date().toISOString(),
    }

    const { id } = await makeRequest(newRequest)

    mutate(
      '/api/requests',
      async ({ requests }) => ({ requests: [{ id, ...newRequest }, ...requests] }),
      false,
    )

    toast({
      title: 'Success!',
      description: "We've added your request to the list.",
      status: 'success',
      duration: 5000,
      isClosable: true,
    })
    onClose()
  }

  return (
    <>
      <Button
        onClick={onOpen}
        backgroundColor='teal.200'
        color='teal.900'
        _hover={{ bg: 'teal.300' }}
        _active={{ bg: 'teal.400' }}
      >
        {children}
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent as='form' onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader>Request a book</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Book Title</FormLabel>
              <Input
                name='title'
                autoComplete='off'
                ref={register({ required: true })}
                placeholder='Business and Accounting 101'
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button onClick={onClose} mr={3}>
              Cancel
            </Button>
            <Button
              backgroundColor='teal.200'
              color='teal.900'
              _hover={{ bg: 'teal.300' }}
              _active={{ bg: 'teal.400' }}
              type='submit'
            >
              Submit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default BookRequestModal
