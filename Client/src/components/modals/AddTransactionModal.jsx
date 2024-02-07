import { useParams } from 'react-router-dom'
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
  useToast,
} from '@chakra-ui/react'
import callAPI from '../../utils/callAPI'
import { object, string, date, mixed, number } from 'yup'
import TransactionForm from '../forms/TransactionForm'
import { useState } from 'react'

const AddTransactionModal = ({ isOpen, onClose, onUpdate }) => {
  const { id } = useParams()
  const toast = useToast()
  const role = sessionStorage.getItem('userRole')
  const validationSchema = object({
    transacType: string().required('required'),
    income: number(),
    purpose: string(),
    cost: number(),
  })

  const createTransaction = async (values, resetForm) => {
    try {
      const route = `http://localhost:3000/api/${role}/transaction/create`
      const body = {
        ID: id,
        transacType: values.transacType,
        purpose: values.purpose,
        income: values.income,
        cost: values.cost,
      }
      const response = await callAPI(body, 'POST', route)
      console.log(response.payload)
      if (response.result === 'OK') {
        resetForm()
        // createNotification(response.payload)

        // navigate(`/admin/transactions/${response.payload._id}`)
        toast({
          title: 'success',
          description: 'successfully recorded transaction!',
          status: 'success',
          duration: '5000',
          isClosable: 'true',
          position: 'bottom-right',
        })
        onUpdate
      } else {
        toast({
          title: 'error',
          description: response.payload.error,
          status: 'error',
          duration: '5000',
          isClosable: 'true',
          position: 'bottom-right',
        })
      }
    } catch (error) {
      console.log(error)
      toast({
        title: 'error',
        description: 'connection error',
        status: 'error',
        duration: '5000',
        isClosable: 'true',
        position: 'bottom-right',
      })
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
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default AddTransactionModal
