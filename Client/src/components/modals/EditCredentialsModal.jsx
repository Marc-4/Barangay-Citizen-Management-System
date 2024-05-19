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
import { useState, useEffect } from 'react'
import callAPI from '../../utils/callAPI'
import { object, string, ref } from 'yup'
import EditCredentialsForm from '../forms/EditCredentialsForm'

const EditCredentialsModal = ({ isOpen, onClose, user, onUpdate, role }) => {
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const accountRole = localStorage.getItem('userRole')

  const validationSchema = object({
    username: string().required('username is required').min(5),
    old_password: string()
      .min(8, 'password must be at least 8 characters')
      .required('password is required'),
    new_password: string()
      .min(8, 'the new password must be at least 8 characters')
      .notOneOf([ref('old_password')], 'New password must not be the same as old password'),
  })

  useEffect

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setSuccess(null)
    }, 1000)

    return () => clearTimeout(timeoutId)
  }, [success])

  const editCredentials = async (values) => {
    try {
      const body = {
        username: values.username,
        new_password: values.new_password,
        old_password: values.old_password,
      }
      console.log(body)
      let route
      route = `${import.meta.env.VITE_API_URL}/api/${accountRole}/account/credentials/edit`

      const response = await callAPI(body, 'PATCH', route)

      if (response.result === 'OK') {
        setError(null)
        if (accountRole === 'admin') setSuccess('Successfully Updated User!')
        if (accountRole === 'user') setSuccess('Successfuly Requested Profile Update!')
        if (onUpdate) {
          onUpdate()
        }
      } else setError(response.payload.error || 'Connection Error')
    } catch (error) {
      console.log(error)
      setError('Connection Error')
    }
  }

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size={'md'} closeOnOverlayClick={false}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Heading>Update Account Credentials</Heading>
          </ModalHeader>
          <ModalCloseButton />
          <Divider m={'auto'} borderColor={'brand.100'} w={'90%'} />
          <ModalBody>
            <EditCredentialsForm
              onSubmit={(values, { setSubmitting, resetForm }) => {
                setTimeout(async () => {
                  console.log(values)
                  await editCredentials(values, resetForm)
                  setSubmitting(false)
                }, 1000)
              }}
              validationSchema={validationSchema}
              initialValues={{
                username: user?.username,
                old_password: '',
                new_password: '',
              }}
            />
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
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default EditCredentialsModal
