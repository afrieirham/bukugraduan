import React, { useRef, useState } from 'react'
import { mutate } from 'swr'
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  IconButton,
  Button,
  useBreakpointValue,
} from '@chakra-ui/react'
import { Trash } from 'react-feather'

import { deleteBookRequest } from '@/utils/db'

function DeleteBookRequestButton({ requestId }) {
  const [isOpen, setIsOpen] = useState(false)
  const cancelRef = useRef()

  const onClose = () => setIsOpen(false)
  const onDelete = () => {
    deleteBookRequest(requestId)
    mutate(
      '/api/requests',
      async ({ requests }) => ({
        requests: requests.filter((request) => request.id !== requestId),
      }),
      false,
    )
    onClose()
  }

  const iconSize = useBreakpointValue({ base: '13', md: '15' })

  return (
    <>
      <IconButton
        aria-label='Delete book request'
        variant='ghost'
        icon={<Trash size={iconSize} />}
        onClick={() => setIsOpen(true)}
      />

      <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Delete Request
            </AlertDialogHeader>

            <AlertDialogBody>Are you sure? You can't undo this action afterwards.</AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme='red' onClick={onDelete} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  )
}

export default DeleteBookRequestButton
