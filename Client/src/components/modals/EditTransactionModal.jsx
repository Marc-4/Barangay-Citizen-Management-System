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
  Select,
  Button,
  Textarea,
  Input,
  Box,
  useToast,
} from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import callAPI from '../../utils/callAPI'
import { object, string, date, mixed, number } from 'yup'
import { Field, Form, Formik } from 'formik'
const EditTransactionModal = ({ isOpen, onClose, transaction, onUpdate }) => {
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState('')
  const accountRole = localStorage.getItem('userRole')
  const toast = useToast()

  const validationSchema = object({
    transacType: string().required('Please select a transaction type.'),
    purpose: string().required('purpose cannot be blank.'),
    cost: number().required('cost cannot be blank.'),
    income: number().required('income cannot be blank.'),
  })

  const editTransaction = async (values) => {
    try {
      const route = `http://localhost:3000/api/${accountRole}//transaction/${transaction._id}/edit`

      console.log(values)

      const response = await callAPI(values, 'PATCH', route)

      if (response.result === 'OK') {
        setError(null)
        toast({
          title: 'success',
          description: 'successfully edited Transaction!',
          status: 'success',
          duration: '5000',
          isClosable: 'true',
          position: 'bottom-right',
        })
        onUpdate()
      } else
        toast({
          title: 'error',
          description: response.payload.error,
          status: 'error',
          duration: '5000',
          isClosable: 'true',
          position: 'bottom-right',
        })
    } catch (error) {
      console.log(error)
      toast({
        title: 'error',
        description: 'Connection error. Please try again.',
        status: 'error',
        duration: '5000',
        isClosable: 'true',
        position: 'bottom-right',
      })
    }
  }

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size={'md'} closeOnOverlayClick={false}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Heading>Edit Transaction</Heading>
          </ModalHeader>
          <ModalCloseButton />
          <Divider m={'auto'} borderColor={'brand.100'} w={'90%'} />
          <ModalBody>
            <Formik
              validationSchema={validationSchema}
              initialValues={{
                transacType: transaction?.transacType,
                purpose: transaction?.formData?.purpose || '',
                cost: transaction?.formData?.cost || '',
                income: transaction?.formData?.income || '',
              }}
              onSubmit={(values, { setSubmitting }) => {
                setTimeout(async () => {
                  console.log('Submitting...')
                  await editTransaction(values)
                  onClose()
                }, 1000)
              }}
            >
              {({ isSubmitting, setFieldValue, errors }) => (
                <Form>
                  <Heading fontSize={'xl'} display={'flex'}>
                    Transaction Type
                    {errors.transacType && (
                      <>
                        <Text color='red'>*</Text>
                        <Text color='red' fontWeight={'normal'} fontSize={'md'}>
                          {errors.transacType}
                        </Text>
                      </>
                    )}
                  </Heading>
                  <Field name='transacType'>
                    {({ field }) => (
                      <Select {...field} placeholder='Select Transaction Type'>
                        <option value='option1'>Option1</option>
                        <option value='option2'>Option2</option>
                        <option value='option3'>Option3</option>
                      </Select>
                    )}
                  </Field>

                  <Heading fontSize={'xl'} display={'flex'}>
                    Purpose
                    {errors.purpose && (
                      <>
                        <Text color='red'>*</Text>
                        <Text color='red' fontWeight={'normal'} fontSize={'md'}>
                          {errors.purpose}
                        </Text>
                      </>
                    )}
                  </Heading>
                  <Field as={Textarea} name='purpose' />
                  <Heading fontSize={'xl'} display={'flex'}>
                    Cost
                    {errors.cost && (
                      <>
                        <Text color='red'>*</Text>
                        <Text color='red' fontWeight={'normal'} fontSize={'md'}>
                          {errors.cost}
                        </Text>
                      </>
                    )}
                  </Heading>
                  <Input as={Field} name='cost' type={'number'} />
                  <Heading fontSize={'xl'} display={'flex'}>
                    Income
                    {errors.income && (
                      <>
                        <Text color='red'>*</Text>
                        <Text color='red' fontWeight={'normal'} fontSize={'md'}>
                          {errors.income}
                        </Text>
                      </>
                    )}
                  </Heading>
                  <Input as={Field} name='income' type={'number'} />
                  <div>
                    <Text
                      fontWeight={'semibold'}
                      fontSize={'2xl'}
                      color={'tomato'}
                      id='error_msg'
                      display={error ? 'block' : 'none'}
                    >
                      {error}
                    </Text>
                    <Text
                      fontWeight={'semibold'}
                      fontSize={'2xl'}
                      color={'green'}
                      id='success_msg'
                      display={success ? 'block' : 'none'}
                    >
                      {success}
                    </Text>
                  </div>
                  <Box m={'auto'} w={'fit-content'} mt={'10px'}>
                    <Button
                      colorScheme='green'
                      type='submit'
                      isLoading={isSubmitting}
                      isDisabled={isSubmitting}
                    >
                      Confirm
                    </Button>
                  </Box>
                </Form>
              )}
            </Formik>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default EditTransactionModal
