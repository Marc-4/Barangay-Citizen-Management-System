import callAPI from '../../utils/callAPI'
import { useState, useEffect } from 'react'
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
  Text,
} from '@chakra-ui/react'

const DeleteAccountAlert = ({ isOpen, onClose, user, cancelRef, onUpdate, role }) => {
  // const [error, setError] = useState(null)
  // const [success, setSuccess] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const userRole = localStorage.getItem('userRole')

  const deleteAccount = async () => {
    try {
      setSubmitting(true)
      const route = `${import.meta.env.VITE_API_URL}/api/${userRole}/${role}/${user._id}/delete`
      const response = await callAPI(null, 'DELETE', route)

      if (response.result === 'OK') {
        // setError(null)
        if (onUpdate) {
          onUpdate()
        }
      }
      // else setError(response.payload.error)
    } catch (error) {
      console.log(error)
      // setError('Connection Error')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Delete User
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure you want to delete {user?.username}? This action is permanent.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button
                isDisabled={submitting}
                isLoading={submitting}
                ref={cancelRef}
                onClick={onClose}
              >
                Cancel
              </Button>
              <Button
                colorScheme='red'
                isDisabled={submitting}
                isLoading={submitting}
                onClick={async () => {
                  await deleteAccount()
                  onClose()
                }}
                ml={3}
              >
                Delete
              </Button>
            </AlertDialogFooter>
            {/* <Text display={error ? 'block' : 'none'}>{error}</Text> */}
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  )
}

export default DeleteAccountAlert
