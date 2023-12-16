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

const TransactionModal = ({
  isOpen,
  onClose,
  transaction,
  onUpdate,
  status,
}) => {
  const { id } = useParams()
  const [error, setError] = useState()
  const [success, setSuccess] = useState()
  const [message, setMessage] = useState(
    status === 'ACCEPTED'
      ? `Go to the barangay hall to get your requested document(s). Prepare a sum of P${transaction?.formData?.cost} to pay to the treasurer.`
      : `Invalid requirements.`
  )
  const [isLoading, setIsLoading] = useState(false)

  const editTransaction = async () => {
    setIsLoading(true)
    try {
      const route = `http://localhost:3000/api/admin/transaction/${id}/edit`
      const body = { status: status, message: message }
      console.log(body)

      const response = await callAPI(body, 'PATCH', route)
      if (response.result === 'OK') {
        setError(null)
        {
          status === 'ACCEPTED'
            ? setSuccess('Successfully Accepted Transaction!')
            : setSuccess('Rejected Transaction!')
        }
        createNotification(response.payload)
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

  const createNotification = async (transaction) => {
    try {
      const body = {
        notifType: status === 'ACCEPTED' ? 'TR_ACCEPT' : 'TR_REJECT',
        message:
          status === 'ACCEPTED'
            ? `Your transaction has been Accepted!`
            : `Your transaction has been Rejected.`,
        linkID: transaction._id,
        recipient: transaction.accountID,
      }
      const route = `http://localhost:3000/api/admin/notification/create`
      const response = await callAPI(body, 'POST', route)
      if (response === 'OK') setError(null)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <Modal size={'xl'} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            pb={0}
            textAlign={'center'}
            fontSize={'3xl'}
            fontWeight={'bold'}
          >
            {status === 'ACCEPTED'
              ? 'Accept User Transaction'
              : 'Reject User Transaction'}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack alignItems={'center'}>
              <Box>
                {status === 'ACCEPTED' ? (
                  <Text>Approval Message:</Text>
                ) : (
                  <Text>Reason for rejection:</Text>
                )}
              </Box>
              <Textarea
                height={'100px'}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              ></Textarea>
              {status === 'ACCEPTED' ? (
                <Button
                  isDisabled={isLoading}
                  onClick={(e) => {
                    setMessage()
                    editTransaction()
                  }}
                  colorScheme='blue'
                  type='submit'
                >
                  Accept
                </Button>
              ) : (
                <Button
                  isDisabled={isLoading}
                  onClick={() => editTransaction()}
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

export default TransactionModal
