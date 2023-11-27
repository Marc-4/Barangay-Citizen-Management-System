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
import { object, string, date } from 'yup'
import RegisterForm from '../forms/RegisterForm'

const RegisterAccountModal = ({ isOpen, onClose, onUpdate, role }) => {
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const validationSchema = object({
    username: string().required('required'),
    password: string().required('required').min(8),
    firstName: string()
      .required('required')
      .matches(/^[A-Za-z\s.'-]+$/, 'First Name must not contain symbols'),
    middleName: string().matches(
      /^[A-Za-z\s.'-]+$/,
      'Middle Name must not contain symbols'
    ),
    lastName: string()
      .required('required')
      .matches(/^[A-Za-z\s.'-]+$/, 'Last Name must not contain symbols'),
    dateOfBirth: date()
      .required('required')
      .max(new Date(), 'Date of Birth cannot be in the future')
      .min(new Date('1900-01-01'), 'Date of Birth cannot be before 1900'),
    placeOfBirth_City: string().required('required'),
    placeOfBirth_Province: string().required('required'),
    placeOfBirth_Country: string().required('required'),
    sex: string().required('required'),
    civilStatus: string().required('required'),
    occupation: string().required('required'),
    citizenship: string().required('required'),
    email: string().email(),
    address_streetName: string().required('required'),
    address_houseNumber: string().required('required'),
    address_subdivisionPurok: string().required('required'),
  })

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setSuccess(null)
    }, 1000)

    return () => clearTimeout(timeoutId)
  }, [success])

  const createUser = async (values, resetForm) => {
    try {
      const body = {
        username: values.username,
        password: values.password,
        firstName: values.firstName,
        middleName: values.middleName,
        lastName: values.lastName,
        dateOfBirth: values.dateOfBirth,
        placeOfBirth: {
          city: values.placeOfBirth_City,
          province: values.placeOfBirth_Province,
          country: values.placeOfBirth_Country,
        },
        sex: values.sex,
        civilStatus: values.civilStatus,
        occupation: values.occupation,
        citizenship: values.citizenship,
        email: values.email,
        address: {
          streetName: values.address_streetName,
          houseNumber: values.address_houseNumber,
          subdivisionPurok: values.address_subdivisionPurok,
        },
      }
      const route = `http://localhost:3000/api/admin/${role}/register`
      const response = await callAPI(body, 'POST', route)

      if (response.result === 'OK') {
        setError(null)
        setSuccess('Successfully registered User!')
        resetForm()
        if (onUpdate) {
          onUpdate();
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
            <Heading>Registration Form</Heading>
          </ModalHeader>
          <ModalCloseButton />
          <Divider m={'auto'} borderColor={'brand.100'} w={'90%'} />
          <ModalBody>
            <RegisterForm
              onSubmit={(values, { setSubmitting, resetForm }) => {
                setTimeout(async () => {
                  await createUser(values, resetForm)
                  console.log(values);
                  setSubmitting(false)
                }, 1000)
              }}
              validationSchema={validationSchema}
              initialValues={{
                username: '',
                password: '',
                firstName: '',
                middleName: '',
                lastName: '',
                dateOfBirth: '',
                placeOfBirth_City: '',
                placeOfBirth_Province: '',
                placeOfBirth_Country: '',
                sex: '',
                civilStatus: '',
                occupation: '',
                citizenship: '',
                email: '',
                address_streetName: '',
                address_houseNumber: '',
                address_subdivisionPurok: '',
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

export default RegisterAccountModal
