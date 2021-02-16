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
} from '@chakra-ui/react'
import { Trash } from 'react-feather'
import { useAuth } from '@/utils/auth'
import { deleteListing } from '@/utils/db'

function DeleteBooklistButton({ booklistId }) {
  const [isOpen, setIsOpen] = useState(false)
  const cancelRef = useRef()
  const { user } = useAuth()

  const onClose = () => setIsOpen(false)
  const onDelete = () => {
    deleteListing(booklistId)
    mutate(
      ['/api/booklist', user.token],
      async ({ booklist }) => {
        console.log(booklist)
        console.log(booklist.filter((booklist) => booklist.id !== booklistId))
        return {
          booklist: booklist.filter((booklist) => booklist.id !== booklistId),
        }
      },
      false,
    )
    onClose()
  }

  return (
    <>
      <IconButton
        aria-label='Delete booklist'
        variant='ghost'
        icon={<Trash size='15' />}
        onClick={() => setIsOpen(true)}
      />

      <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Delete Booklist
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards. If the item is sold, just mark it
              as sold.
            </AlertDialogBody>

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

export default DeleteBooklistButton
