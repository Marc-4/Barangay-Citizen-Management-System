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
} from '@chakra-ui/react'

const RestoreAccountAlert = ({
  isOpen,
  onClose,
  user,
  cancelRef,
  onUpdate,
  role,
}) => {
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)
  const userRole = localStorage.getItem('userRole')

  const restoreAccount = async () => {
    try {
      setSubmitting(true)
      const route = `http://localhost:3000/api/${userRole}/${role}/${user._id}/restore`
      const response = await callAPI(null, 'PATCH', route)

      if (response.result === 'OK') {
        if (onUpdate) {
          onUpdate()
        }
      } else setError(response.payload.error)
    } catch (error) {
      console.log(error)
      setError('Connection Error')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Restore User
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure you want to restore {user?.username}?
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button isDisabled={submitting} ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button
                colorScheme='green'
                isDisabled={submitting}
                onClick={async () => {
                  await restoreAccount()
                  onClose()
                }}
                ml={3}
              >
                Restore
              </Button>
            </AlertDialogFooter>
            {/* <Text display={error ? 'block' : 'none'}>{error}</Text> */}
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  )
}

export default RestoreAccountAlert
