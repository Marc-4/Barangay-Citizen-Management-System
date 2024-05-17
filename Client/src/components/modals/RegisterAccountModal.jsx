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
import { object, string, date, mixed, number } from 'yup'
import RegisterForm from '../forms/RegisterForm'
import EmployeeRegisterForm from '../forms/EmployeeRegisterForm'

const RegisterAccountModal = ({ isOpen, onClose, onUpdate, role }) => {
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const userRole = localStorage.getItem('userRole')
  const userValidationSchema = object({
    firstName: string()
      .required('required')
      .matches(/^[A-Za-z\s.'-]+$/, 'First Name must not contain symbols'),
    middleName: string().matches(/^[A-Za-z\s.'-]+$/, 'Middle Name must not contain symbols'),
    lastName: string()
      .required('required')
      .matches(/^[A-Za-z\s.'-]+$/, 'Last Name must not contain symbols'),
    dateOfBirth: date()
      .required('required')
      .max(new Date(), 'Date of Birth cannot be in the future')
      .min(new Date('1900-01-01'), 'Date of Birth cannot be before 1900'),
    placeOfBirth_city: string().required('required'),
    placeOfBirth_province: string().required('required'),
    placeOfBirth_country: string().required('required'),
    sex: string().required('required'),
    civilStatus: string().required('required'),
    occupation: string().required('required'),
    citizenship: string().required('required'),
    phone_number: string()
      .required('required')
      .matches(/^9\d{9}$/, 'phone number must follow format "9xxxxxxxxx"'),
    email: string().email(),
    address_streetName: string().required('required'),
    address_houseNumber: string().required('required'),
    address_subdivisionPurok: string().required('required'),
    address_cityMunicipality: string().required('required'),
    profilePhoto: mixed(),
  })

  const EmployeeValidationSchema = object({
    username: string().required('required'),
    password: string().required('required').min(8),
    firstName: string()
      .required('required')
      .matches(/^[A-Za-z\s.'-]+$/, 'First Name must not contain symbols'),
    middleName: string().matches(/^[A-Za-z\s.'-]+$/, 'Middle Name must not contain symbols'),
    lastName: string()
      .required('required')
      .matches(/^[A-Za-z\s.'-]+$/, 'Last Name must not contain symbols'),
    dateOfBirth: date()
      .required('required')
      .max(new Date(), 'Date of Birth cannot be in the future')
      .min(new Date('1900-01-01'), 'Date of Birth cannot be before 1900'),
    placeOfBirth_city: string().required('required'),
    placeOfBirth_province: string().required('required'),
    placeOfBirth_country: string().required('required'),
    sex: string().required('required'),
    civilStatus: string().required('required'),
    occupation: string().required('required'),
    citizenship: string().required('required'),
    phone_number: string()
      .required('required')
      .matches(/^9\d{9}$/, 'phone number must follow format "9xxxxxxxxx"'),
    email: string().email(),
    address_streetName: string().required('required'),
    address_houseNumber: string().required('required'),
    address_subdivisionPurok: string().required('required'),
    address_cityMunicipality: string().required('required'),
    profilePhoto: mixed(),
  })

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setSuccess(null)
    }, 1000)

    return () => clearTimeout(timeoutId)
  }, [success])

  const createUser = async (values, resetForm) => {
    try {
      const formData = new FormData()

      // Append form data
      Object.entries(values).forEach(([key, value]) => {
        if (key === 'profilePhoto' && value instanceof File) {
          formData.append(key, value)
        } else {
          formData.append(key, value)
        }
      })

      for (const pair of formData.entries()) {
        console.log(pair[0], pair[1])
      }

      const route = `http://localhost:3000/api/${userRole}/${role}/register`
      const response = await fetch(route, {
        method: 'POST',
        body: formData,
        mode: 'cors',
        credentials: 'include',
      })

      const responseBody = await response.json()

      if (response.ok) {
        setError(null)
        setSuccess('Successfully registered User!')
        resetForm()
        if (onUpdate) {
          onUpdate()
        }
      } else setError(responseBody.payload.error)
    } catch (err) {
      console.log(err)
      setError('Connection Error')
    }
  }

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size={'md'} closeOnOverlayClick={false}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Heading>Registration Form</Heading>
          </ModalHeader>
          <ModalCloseButton />
          <Divider m={'auto'} borderColor={'brand.100'} w={'90%'} />
          <ModalBody>
            {role == 'user' ? (
              <RegisterForm
                onSubmit={(values, { setSubmitting, resetForm }) => {
                  setTimeout(async () => {
                    await createUser(values, resetForm)
                    // console.log(values)
                    setSubmitting(false)
                  }, 1000)
                }}
                validationSchema={userValidationSchema}
                initialValues={{
                  firstName: '',
                  middleName: '',
                  lastName: '',
                  dateOfBirth: '',
                  placeOfBirth_city: '',
                  placeOfBirth_province: '',
                  placeOfBirth_country: '',
                  sex: '',
                  civilStatus: '',
                  occupation: '',
                  citizenship: '',
                  phone_number: '',
                  email: '',
                  address_streetName: '',
                  address_houseNumber: '',
                  address_subdivisionPurok: '',
                  address_cityMunicipality: '',
                  profilePhoto: '',
                }}
              />
            ) : (
              <EmployeeRegisterForm
                onSubmit={(values, { setSubmitting, resetForm }) => {
                  setTimeout(async () => {
                    await createUser(values, resetForm)
                    setSubmitting(false)
                  }, 1000)
                }}
                validationSchema={EmployeeValidationSchema}
                initialValues={{
                  username: '',
                  password: '',
                  firstName: '',
                  middleName: '',
                  lastName: '',
                  dateOfBirth: '',
                  placeOfBirth_city: '',
                  placeOfBirth_province: '',
                  placeOfBirth_country: '',
                  sex: '',
                  civilStatus: '',
                  occupation: '',
                  citizenship: '',
                  phone_number: '',
                  email: '',
                  address_streetName: '',
                  address_houseNumber: '',
                  address_subdivisionPurok: '',
                  address_cityMunicipality: '',
                  profilePhoto: '',
                }}
              />
            )}

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
