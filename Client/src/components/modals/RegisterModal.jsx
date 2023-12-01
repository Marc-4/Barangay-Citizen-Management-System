import {
  Modal,
  ModalOverlay,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalFooter,
  Text,
  Heading,
  Divider,
  Center,
} from '@chakra-ui/react'
import { object, string, date } from 'yup'
import { useEffect, useState } from 'react'
import callAPI from '../../utils/callAPI'
import login from '../../utils/login'
import { useNavigate } from 'react-router-dom'
import RegisterForm from '../forms/RegisterForm'

function RegisterModal({ isOpen, onClose }) {
  const navigate = useNavigate()
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

  const handleRegister = async (values, setSubmitting) => {
    // e.preventDefault()
    // e.stopPropagation()
    setSubmitting(true)
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

      const route = 'http://localhost:3000/api/user/account/register'
      const response = await callAPI(body, 'POST', route)

      if (response.result === 'OK') {
        console.log(response.payload)
        setError(null)
        setSuccess('Successfully Registered!')

        setTimeout(() => {
          setSuccess('Logging in..')
        }, 500)

        setTimeout(() => {
          setSuccess('')
          handleLogin(values.username, values.password)
        }, 1200)
      } else setError(response.payload.error)
    } catch (error) {
      console.log(error)
      setError('Registration Error')
    }
  }

  const handleLogin = async (username, password) => {
    try {
      const response = await login(
        username,
        password,
        'http://localhost:3000/api/auth/login/user'
      )

      if (response.result === 'OK') {
        setError(null)
        sessionStorage.setItem('userRole', 'user')
        navigate('/user/profile')
      } else setError(response.payload.error)
    } catch (error) {
      console.log(error)
      setError('Login Error')
    }
  }

  return (
    <>
      <Modal size={'sm'} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            fontWeight={'bold'}
            fontSize={'3xl'}
            alignSelf={'center'}
          >
            Register
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <RegisterForm
              onSubmit={async (values, { setSubmitting }) => {
                await handleRegister(values, setSubmitting)
                setSubmitting(false)
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
          </ModalBody>
          <ModalFooter>
            <Text
              textAlign={'center'}
              color={'tomato'}
              fontSize={'2xl'}
              fontWeight={'semibold'}
              display={error ? 'block' : 'none'}
            >
              {error}
            </Text>
            <Text
              textAlign={'center'}
              fontSize={'2xl'}
              color={'green'}
              fontWeight={'semibold'}
              display={success ? 'block' : 'none'}
            >
              {success}
            </Text>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default RegisterModal
