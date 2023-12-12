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

const ArchiveAccountAlert = ({
  isOpen,
  onClose,
  user,
  cancelRef,
  onUpdate,
  role,
}) => {
  const [submitting, setSubmitting] = useState(false)

  const archiveAccount = async () => {
    try {
      setSubmitting(true)
      const route = `http://localhost:3000/api/admin/${role}/${user._id}/archive`
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
              Archive User
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure you want to archive {user?.username}? You can undo
              this action later.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button isDisabled={submitting} ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button
                colorScheme='orange'
                isDisabled={submitting}
                onClick={async () => {
                  await archiveAccount()
                  onClose()
                }}
                ml={3}
              >
                Archive
              </Button>
            </AlertDialogFooter>
            {/* <Text display={error ? 'block' : 'none'}>{error}</Text> */}
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  )
}

export default ArchiveAccountAlert
