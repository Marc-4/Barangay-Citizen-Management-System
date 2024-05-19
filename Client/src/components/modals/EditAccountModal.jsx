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
import { object, string, date, mixed } from 'yup'
import EditForm from '../forms/EditForm'
import EmployeeEditForm from '../forms/EmployeeEditForm'

const EditAccountModal = ({ isOpen, onClose, user, onUpdate, role, editingSelf }) => {
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const accountRole = localStorage.getItem('userRole')

  const validationSchema = object({
    firstName: string()
      .matches(/^[A-Za-z\s.'-]+$/, 'First Name must not contain symbols')
      .required('required'),
    middleName: string()
      .matches(/^[A-Za-z\s.'-]+$/, 'Middle Name must not contain symbols')
      .required('required'),
    lastName: string()
      .matches(/^[A-Za-z\s.'-]+$/, 'Last Name must not contain symbols')
      .required('required'),
    dateOfBirth: date()
      .max(new Date(), 'Date of Birth cannot be in the future')
      .min(new Date('1900-01-01'), 'Date of Birth cannot be before 1900')
      .required('required'),
    placeOfBirth_city: string().required('required'),
    placeOfBirth_province: string().required('required'),
    placeOfBirth_country: string().required('required'),
    sex: string().required('Please specify the Sex.').required('required'),
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

  const editProfile = async (values) => {
    try {
      if (!Object.values(values).some((value) => value)) {
        setError('No Fields to update')
        return
      }

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

      let route
      console.log(editingSelf)
      if (!editingSelf)
        route = `${import.meta.env.VITE_API_URL}/api/${accountRole}/${role}/profile/${user._id}/edit`
      if (editingSelf) route = `${import.meta.env.VITE_API_URL}/api/${accountRole}/account/edit`

      console.log(route)

      const response = await fetch(route, {
        method: 'PATCH',
        body: formData,
        mode: 'cors',
        credentials: 'include',
      })

      const responseBody = await response.json()

      if (responseBody.result === 'OK') {
        setError(null)
        if (accountRole === 'user') setSuccess('Successfuly Requested Profile Update!')
        else setSuccess('Successfully Updated User!')

        if (accountRole === 'user') createNotification(responseBody.payload.request)
        if (onUpdate) {
          onUpdate()
        }
      } else setError(responseBody.payload.error)
    } catch (error) {
      console.log(error)
      setError('Connection Error')
    }
  }

  const createNotification = async (request) => {
    try {
      const body = {
        notifType: 'REQUEST',
        message: `${user.profile.firstName} ${user.profile.lastName} is requesting a Profile update.`,
        linkID: request._id,
      }

      const route = `${import.meta.env.VITE_API_URL}/api/${role}/notification/create`
      const response = await callAPI(body, 'POST', route)
      if (response === 'OK') setError(null)
    } catch (error) {
      console.log(error)
      setError('Error creating notification')
    }
  }

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size={'md'} closeOnOverlayClick={false}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Heading>Update Profile</Heading>
          </ModalHeader>
          <ModalCloseButton />
          <Divider m={'auto'} borderColor={'brand.100'} w={'90%'} />
          <ModalBody>
            {role == 'user' ? (
              <EditForm
                onSubmit={(values, { setSubmitting }) => {
                  setTimeout(async () => {
                    await editProfile(values)
                    setSubmitting(false)
                  }, 1000)
                }}
                validationSchema={validationSchema}
                initialValues={{
                  firstName: user?.profile?.firstName,
                  middleName: user?.profile?.middleName,
                  lastName: user?.profile?.lastName,
                  dateOfBirth: !isNaN(new Date(user?.profile?.dateOfBirth).getTime())
                    ? new Date(user?.profile?.dateOfBirth).toISOString().split('T')[0]
                    : null,
                  placeOfBirth_city: user?.profile?.placeOfBirth.city,
                  placeOfBirth_province: user?.profile?.placeOfBirth.province,
                  placeOfBirth_country: user?.profile?.placeOfBirth.country,
                  sex: user?.profile?.sex,
                  civilStatus: user?.profile?.civilStatus,
                  occupation: user?.profile?.occupation,
                  citizenship: user?.profile?.citizenship,
                  phone_number: user?.profile?.phone_number,
                  email: user?.profile?.email,
                  address_streetName: user?.profile?.address.streetName,
                  address_houseNumber: user?.profile?.address.houseNumber,
                  address_subdivisionPurok: user?.profile?.address.subdivisionPurok,
                  address_cityMunicipality: user?.profile?.address.cityMunicipality,
                  profilePhoto: user?.profile?.profilePhoto,
                }}
              />
            ) : (
              <EmployeeEditForm
                onSubmit={(values, { setSubmitting }) => {
                  setTimeout(async () => {
                    await editProfile(values)
                    setSubmitting(false)
                  }, 1000)
                }}
                validationSchema={validationSchema}
                initialValues={{
                  username: user?.username,
                  password: '',
                  firstName: user?.profile?.firstName,
                  middleName: user?.profile?.middleName,
                  lastName: user?.profile?.lastName,
                  dateOfBirth: !isNaN(new Date(user?.profile?.dateOfBirth).getTime())
                    ? new Date(user?.profile?.dateOfBirth).toISOString().split('T')[0]
                    : null,
                  placeOfBirth_city: user?.profile?.placeOfBirth.city,
                  placeOfBirth_province: user?.profile?.placeOfBirth.province,
                  placeOfBirth_country: user?.profile?.placeOfBirth.country,
                  sex: user?.profile?.sex,
                  civilStatus: user?.profile?.civilStatus,
                  occupation: user?.profile?.occupation,
                  citizenship: user?.profile?.citizenship,
                  phone_number: user?.profile?.phone_number,
                  email: user?.profile?.email,
                  address_streetName: user?.profile?.address.streetName,
                  address_houseNumber: user?.profile?.address.houseNumber,
                  address_subdivisionPurok: user?.profile?.address.subdivisionPurok,
                  address_cityMunicipality: user?.profile?.address.cityMunicipality,
                  profilePhoto: user?.profile?.profilePhoto,
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

export default EditAccountModal
