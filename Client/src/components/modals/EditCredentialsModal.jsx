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
import { object, string } from 'yup'
import EditForm from '../forms/EditForm'

const EditCredentialsModal = ({ isOpen, onClose, user, onUpdate, role }) => {
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const accountRole = sessionStorage.getItem('userRole')

  const validationSchema = object({
    username: string().required('required').min(5),
    password: string().min(8),
  })

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setSuccess(null)
    }, 1000)

    return () => clearTimeout(timeoutId)
  }, [success])

  const editProfile = async (values, resetForm) => {
    try {
      const body = {
        username: values.username,
        password: values.password
      }
      console.log(body)
      let route
      if (accountRole === 'admin')
        route = `http://localhost:3000/api/admin/${role}/profile/${user._id}/edit`
      if (accountRole === 'user')
        route = `http://localhost:3000/api/user/account/edit`

      const response = await callAPI(body, 'PATCH', route)

      if (response.result === 'OK') {
        setError(null)
        if (accountRole === 'admin') setSuccess('Successfully Updated User!')
        if (accountRole === 'user')
          setSuccess('Successfuly Requested Profile Update!')
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
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size={'md'}
        closeOnOverlayClick={false}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Heading>Update Account</Heading>
          </ModalHeader>
          <ModalCloseButton />
          <Divider m={'auto'} borderColor={'brand.100'} w={'90%'} />
          <ModalBody>
            <EditForm
              onSubmit={(values, { setSubmitting, resetForm }) => {
                setTimeout(async () => {
                  await editProfile(values, resetForm)
                  setSubmitting(false)
                }, 1000)
              }}
              validationSchema={validationSchema}
              initialValues={{
                username: user?.profile?.username,
                password: '',
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
