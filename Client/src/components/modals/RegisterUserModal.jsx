import {
  Modal,
  ModalOverlay,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  Box,
  Text,
  Stack,
  Input,
  Button,
  Heading,
  Divider,
  RadioGroup,
  Radio,
} from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import callAPI from '../../utils/callAPI'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { object, string, date } from 'yup'

const RegisterUserModal = ({ isOpen, onClose }) => {
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
    // Reset success message after 3 seconds (adjust the duration as needed)
    const timeoutId = setTimeout(() => {
      setSuccess(null)
    }, 1000)

    // Clean up the timeout to prevent memory leaks
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
      const route = `http://localhost:3000/api/admin/user/register`
      const response = await callAPI(body, 'POST', route)

      if (response.result === 'OK') {
        setError(null)
        setSuccess('Successfully registered User!')
        resetForm()
      } else setError(response.payload.error)
    } catch (error) {
      console.log(error)
      setError(result.payload.error)
    }
  }

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size={'md'}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Heading>Form</Heading>
          </ModalHeader>
          <ModalCloseButton />
          <Divider m={'auto'} borderColor={'brand.100'} w={'90%'} />
          <ModalBody>
            <Formik
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
              onSubmit={(values, { setSubmitting, resetForm }) => {
                setTimeout(() => {
                  createUser(values, resetForm)
                  setSubmitting(false)
                }, 400)
              }}
            >
              {({ isSubmitting }) => (
                <Form>
                  <Heading fontSize={'2xl'}>Account Data</Heading>
                  <Input
                    as={Field}
                    type='text'
                    name='username'
                    placeholder='username'
                  />
                  <Text
                    as={ErrorMessage}
                    name='username'
                    component='div'
                    color={'tomato'}
                  />
                  <Input
                    as={Field}
                    type='password'
                    name='password'
                    placeholder='password'
                  />
                  <Text
                    as={ErrorMessage}
                    color={'tomato'}
                    name='password'
                    component='div'
                  />
                  <Box>
                    <Heading fontSize={'2xl'}>Profile Data</Heading>
                    <Heading fontSize={'xl'}>Full Name</Heading>
                    <Input
                      as={Field}
                      type='text'
                      name='firstName'
                      placeholder='First Name'
                    />
                    <Text
                      as={ErrorMessage}
                      name='firstName'
                      component='div'
                      color={'tomato'}
                    />
                    <Input
                      as={Field}
                      type='text'
                      name='middleName'
                      placeholder='Middle Name'
                    />
                    <Input
                      as={Field}
                      type='text'
                      name='lastName'
                      placeholder='Last Name'
                    />
                    <Text
                      as={ErrorMessage}
                      name='lastName'
                      component='div'
                      color={'tomato'}
                    />
                    <Heading fontSize={'xl'}>Date of Birth</Heading>
                    <Input as={Field} type='date' name='dateOfBirth' />
                    <Text
                      as={ErrorMessage}
                      name='dateOfBirth'
                      component='div'
                      color={'tomato'}
                    />
                    <Heading fontSize={'xl'}>Place of Birth</Heading>
                    <Input
                      as={Field}
                      type='text'
                      name='placeOfBirth_City'
                      placeholder='City'
                    />
                    <Text
                      as={ErrorMessage}
                      name='placeOfBirth_City'
                      component='div'
                      color={'tomato'}
                    />
                    <Input
                      as={Field}
                      type='text'
                      name='placeOfBirth_Province'
                      placeholder='Province'
                    />
                    <Text
                      as={ErrorMessage}
                      name='placeOfBirth_Province'
                      component='div'
                      color={'tomato'}
                    />
                    <Input
                      as={Field}
                      type='text'
                      name='placeOfBirth_Country'
                      placeholder='Country'
                    />
                    <Text
                      as={ErrorMessage}
                      name='placeOfBirth_Country'
                      component='div'
                      color={'tomato'}
                    />
                    <Heading fontSize={'xl'}>Gender</Heading>
                    <RadioGroup name='sex'>
                      <Field>
                        {({ field }) => (
                          <Radio {...field} value='male' type='radio'>
                            Male
                          </Radio>
                        )}
                      </Field>
                      <Field>
                        {({ field }) => (
                          <Radio {...field} value='female' type='radio'>
                            Female
                          </Radio>
                        )}
                      </Field>
                    </RadioGroup>
                    <Text
                      as={ErrorMessage}
                      name='sex'
                      component='div'
                      color={'tomato'}
                    />
                    <Heading fontSize={'xl'}>Civil Status</Heading>
                    <Input
                      as={Field}
                      type='text'
                      name='civilStatus'
                      placeholder='Civil Status'
                    />
                    <Text
                      as={ErrorMessage}
                      name='civilStatus'
                      component='div'
                      color={'tomato'}
                    />
                    <Heading fontSize={'xl'}>Occupation</Heading>
                    <Input
                      as={Field}
                      type='text'
                      name='occupation'
                      placeholder='occupation'
                    />
                    <Text
                      as={ErrorMessage}
                      name='occupation'
                      component='div'
                      color={'tomato'}
                    />
                    <Heading fontSize={'xl'}>Citizenship</Heading>
                    <Input
                      as={Field}
                      type='text'
                      name='citizenship'
                      placeholder='citizenship'
                    />
                    <Text
                      as={ErrorMessage}
                      name='citizenship'
                      component='div'
                      color={'tomato'}
                    />
                    <Heading fontSize={'xl'}>Email</Heading>
                    <Input
                      as={Field}
                      type='email'
                      name='email'
                      placeholder='email'
                    />
                    <Text
                      as={ErrorMessage}
                      name='email'
                      component='div'
                      color={'tomato'}
                    />
                    <Heading fontSize={'xl'}>Address</Heading>
                    <Input
                      as={Field}
                      type='text'
                      name='address_streetName'
                      placeholder='Street Name'
                    />
                    <Text
                      as={ErrorMessage}
                      name='address_streetName'
                      component='div'
                      color={'tomato'}
                    />
                    <Input
                      as={Field}
                      type='text'
                      name='address_houseNumber'
                      placeholder='House No.'
                    />
                    <Text
                      as={ErrorMessage}
                      name='address_houseNumber'
                      component='div'
                      color={'tomato'}
                    />
                    <Input
                      as={Field}
                      type='text'
                      name='address_subdivisionPurok'
                      placeholder='Subdivision/Purok'
                    />
                    <Text
                      as={ErrorMessage}
                      name='address_subdivisionPurok'
                      component='div'
                      color={'tomato'}
                    />
                  </Box>
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
                  <Button
                    m={'auto'}
                    mt={'25px'}
                    w={'100%'}
                    colorScheme='blue'
                    type='submit'
                    isDisabled={isSubmitting}
                  >
                    Register
                  </Button>
                </Form>
              )}
            </Formik>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default RegisterUserModal
