import {
  Modal,
  ModalOverlay,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  Text,
  Heading,
  Divider,
} from '@chakra-ui/react'
import callAPI from '../../utils/callAPI'
import { object, string, date, mixed, number } from 'yup'
import TransactionForm from '../forms/TransactionForm'
import { useState } from 'react'

const AddTransactionModal = ({ isOpen, onClose, onUpdate }) => {
  const validationSchema = object({
    transacType: string().required('required'),
    income: number(),
    purpose: string(),
    cost: number(),
  })

  const role = sessionStorage.getItem('userRole')

  const [success, setSuccess] = useState()
  const [error, setError] = useState()
  const createTransaction = async (values, resetForm) => {
    try {
      const route = `http://localhost:3000/api/${role}/transaction/create`
      const body = {
        ID: 'something',
        transacType: values.transacType,
        purpose: values.purpose,
        income: values.income,
        cost: values.cost,
      }
      const response = await callAPI(body, 'POST', route)
      console.log(response.payload)
      if (response.result === 'OK') {
        setSuccess('Successfully Recorded Transaction!')
        setError(null)
        resetForm()
        // createNotification(response.payload)

        setTimeout(() => {
          // navigate(`/admin/transactions/${response.payload._id}`)
          navigate('/admin/transactions')
        }, 500)
      } else setError(response.payload.error)
    } catch (error) {
      console.log(error)
      setError('Connection Error')
    }
  }

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size={'xl'}
        closeOnOverlayClick={false}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader display={'flex'} justifyContent={'center'}>
            <Heading>Transaction Form</Heading>
            <ModalCloseButton />
          </ModalHeader>
          <Divider />
          <ModalBody>
            <TransactionForm
              onSubmit={(values, { setSubmitting, resetForm }) => {
                setTimeout(async () => {
                  await createTransaction(values, resetForm)
                  console.log(values)
                  setSubmitting(false)
                }, 1000)
              }}
              validationSchema={validationSchema}
              initialValues={{
                transacType: '',
                income: '',
                purpose: '',
                cost: '',
              }}
            />
            <Text display={error ? 'block' : 'none'}>{error}</Text>
            <Text display={success ? 'block' : 'none'}>{success}</Text>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default AddTransactionModal
