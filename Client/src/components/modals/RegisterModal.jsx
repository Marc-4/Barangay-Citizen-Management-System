import {
  Modal,
  ModalOverlay,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalFooter,
  Text,
} from '@chakra-ui/react'
import { object, string, date, mixed } from 'yup'
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
    placeOfBirth_city: string().required('required'),
    placeOfBirth_province: string().required('required'),
    placeOfBirth_country: string().required('required'),
    sex: string().required('required'),
    civilStatus: string().required('required'),
    occupation: string().required('required'),
    citizenship: string().required('required'),
    email: string().email(),
    address_streetName: string().required('required'),
    address_houseNumber: string().required('required'),
    address_subdivisionPurok: string().required('required'),
    profilePhoto: mixed().required('required'),
    g_recaptcha_response: mixed().required('required'),
  })

  const handleRegister = async (values, setSubmitting) => {
    const recaptchaResponse = values['g_recaptcha_response']

    const validateEmail = await fetch(
      `https://open.kickbox.com/v1/disposable/${values.email}`,
      {
        method: 'GET',
      }
    )

    const data = await validateEmail.json()

    console.log(data)

    if (data.disposable)
      return setError(
        'Disposable email detected. Please enter a valid Email address.'
      )
    setSubmitting(true)
    try {
      const formData = new FormData()

      // Append form data
      Object.entries(values).forEach(([key, value]) => {
        if (key === 'profilePhoto' && value instanceof File) {
          // If the field is profilePhoto and it's a File, append it to the FormData
          formData.append(key, value)
        } else {
          // Otherwise, append other fields normally
          formData.append(key, value)
        }
      })

      for (const pair of formData.entries()) {
        console.log(pair[0], pair[1])
      }
      const route = 'http://localhost:3000/api/user/account/register'

      const response = await fetch(route, {
        method: 'POST',
        body: formData,
        mode: 'cors',
        credentials: 'include',
      })

      const responseBody = await response.json()

      if (responseBody.result === 'OK') {
        console.log(responseBody.payload)
        setError(null)
        setSuccess('Successfully Registered!')

        setTimeout(() => {
          setSuccess('Logging in..')
        }, 500)

        setTimeout(() => {
          setSuccess('')
          handleLogin(values.username, values.password)
        }, 1200)
      } else setError(responseBody.payload.error)
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
      <Modal
        closeOnOverlayClick={false}
        size={'sm'}
        isOpen={isOpen}
        onClose={onClose}
      >
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
                placeOfBirth_city: '',
                placeOfBirth_province: '',
                placeOfBirth_country: '',
                sex: '',
                civilStatus: '',
                occupation: '',
                citizenship: '',
                email: '',
                address_streetName: '',
                address_houseNumber: '',
                address_subdivisionPurok: '',
                profilePhoto: '',
                g_recaptcha_response: '',
              }}
            />
          </ModalBody>
          <ModalFooter justifyContent={'center'}>
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
              mr={'50px'}
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
