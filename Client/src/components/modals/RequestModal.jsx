import {
  Textarea,
  Modal,
  ModalBody,
  ModalHeader,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  Stack,
  Button,
  Text,
  Box,
} from '@chakra-ui/react'
import { useState } from 'react'
import callAPI from '../../utils/callAPI'
import { useParams } from 'react-router-dom'

const RequestModal = ({ isOpen, onClose, onUpdate, status }) => {
  const { id } = useParams()
  const [error, setError] = useState()
  const [success, setSuccess] = useState()
  const [isLoading, setIsLoading] = useState(false)

  const role = localStorage.getItem('userRole')

  const editRequest = async () => {
    setIsLoading(true)
    try {
      const route = `${import.meta.env.VITE_API_URL}/api/${role}/request/${id}/edit`
      const body = { status: status }

      const response = await callAPI(body, 'PATCH', route)

      if (response.result === 'OK') {
        setError(null)
        {
          status === 'ACCEPTED'
            ? setSuccess('Successfully Accepted Request!')
            : setSuccess('Rejected Request!')
        }
        await editUser(response.payload)
        await createNotification(response.payload)
        if (onUpdate) {
          onUpdate()
        }
        setTimeout(() => {
          setSuccess(null)
        }, 1000)
      }
    } catch (error) {
      console.log(error)
      setError('Connection Error')
    } finally {
      setIsLoading(false)
      onClose()
    }
  }

  const editUser = async (request) => {
    setIsLoading(true)
    try {
      const formData = new FormData()

      console.log(request.requestContent)

      Object.entries(request.requestContent).forEach(([key, value]) => {
        if (key === 'profilePhoto') {
          const { fileName, data } = value
          const uint8Array = new Uint8Array(data.data)
          const blob = new Blob([uint8Array], { type: 'image/png' })
          const file = new File([blob], fileName, { type: 'image/png' })

          formData.append('profilePhoto', file);
        } else {
          formData.append(key, value)
        }
      })

      for (const pair of formData.entries()) {
        console.log(pair[0], pair[1])
      }

      const route = `${import.meta.env.VITE_API_URL}/api/${role}/user/profile/${request.accountID}/edit`
      const response = await fetch(route, {
        method: 'PATCH',
        body: formData,
        mode: 'cors',
        credentials: 'include',
      })

      const responseData = await response.json()
      console.log(responseData)
      if (responseData.ok) setSuccess(responseData.payload.message)
      else setError(responseData.payload.error)
    } catch (error) {
      console.log(error)
      setError('Connection Error')
    } finally {
      setIsLoading(false)
    }
  }

  const createNotification = async (request) => {
    try {
      const body = {
        notifType: status === 'ACCEPTED' ? 'RQ_ACCEPT' : 'RQ_REJECT',
        message:
          status === 'ACCEPTED'
            ? `Your request has been Accepted!`
            : `Your request has been Rejected.`,
        linkID: request._id,
        recipient: request.accountID,
      }
      const route = `${import.meta.env.VITE_API_URL}/api/${role}/notification/create`
      const response = await callAPI(body, 'POST', route)
      if (response === 'OK') setError(null)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <Modal size={'md'} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            pb={'0px'}
            textAlign={'center'}
            fontSize={'3xl'}
            fontWeight={'bold'}
          >
            {status === 'ACCEPTED'
              ? 'Accept User Request'
              : 'Reject User Request'}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack alignItems={'center'}>
              {status === 'ACCEPTED' ? (
                // ''
                <Box mb={'10px'}>
                  <Text>Confirm User request to edit profile:</Text>
                </Box>
              ) : (
                <>
                  <Box>
                    <Text>Reason for rejection:</Text>
                  </Box>
                  <Textarea
                    height={'100px'}
                    defaultValue={`Invalid request.`}
                  ></Textarea>
                </>
              )}

              {status === 'ACCEPTED' ? (
                <Button
                  isDisabled={isLoading}
                  isLoading={isLoading}
                  onClick={() => editRequest()}
                  colorScheme='blue'
                  type='submit'
                >
                  Accept
                </Button>
              ) : (
                <Button
                  isDisabled={isLoading}
                  isLoading={isLoading}
              onClick={() => editRequest()}
                  colorScheme='red'
                  type='submit'
                >
                  Reject
                </Button>
              )}

              <Text
                display={success ? 'block' : 'none'}
                color={'green'}
                fontSize={'xl'}
                fontWeight={'semibold'}
              >
                {success}
              </Text>
              <Text
                display={error ? 'block' : 'none'}
                color={'tomato'}
                fontSize={'xl'}
                fontWeight={'semibold'}
              >
                {error}
              </Text>
            </Stack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default RequestModal
