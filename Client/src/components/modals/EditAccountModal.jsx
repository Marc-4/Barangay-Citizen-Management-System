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

const EditAccountModal = ({ isOpen, onClose, user, onUpdate, role }) => {
  // console.log('user: ' + JSON.stringify(user, null, 2))
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const accountRole = sessionStorage.getItem('userRole')

  const validationSchema = object({
    firstName: string().matches(
      /^[A-Za-z\s.'-]+$/,
      'First Name must not contain symbols'
    ),
    middleName: string().matches(
      /^[A-Za-z\s.'-]+$/,
      'Middle Name must not contain symbols'
    ),
    lastName: string().matches(
      /^[A-Za-z\s.'-]+$/,
      'Last Name must not contain symbols'
    ),
    dateOfBirth: date()
      .max(new Date(), 'Date of Birth cannot be in the future')
      .min(new Date('1900-01-01'), 'Date of Birth cannot be before 1900'),
    placeOfBirth_city: string(),
    placeOfBirth_province: string(),
    placeOfBirth_country: string(),
    sex: string(),
    civilStatus: string(),
    occupation: string(),
    citizenship: string(),
    email: string().email(),
    address_streetName: string(),
    address_houseNumber: string(),
    address_subdivisionPurok: string(),
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

      if(!Object.values(values).some(value => value)){
        setError('No Fields to update')
        return
      }

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

      // console.log('initial profile: ' + JSON.stringify(initialProfile, null, 2))
      // console.log('values in form: ' + JSON.stringify(valuesObject, null, 2))
      // console.log('changed values: ' + JSON.stringify(changedValues, null, 2))
      let route
      if (accountRole === 'admin')
        route = `http://localhost:3000/api/admin/${role}/profile/${user._id}/edit`
      if (accountRole === 'user')
        route = `http://localhost:3000/api/user/account/edit`

      const response = await fetch(route, {
        method: 'PATCH',
        body: formData,
        mode: 'cors',
        credentials: 'include',
      })

      const responseBody = await response.json()

      if (response.ok) {
        setError(null)
        if (accountRole === 'admin') setSuccess('Successfully Updated User!')
        if (accountRole === 'user')
          setSuccess('Successfuly Requested Profile Update!')

        if (accountRole === 'user')
          createNotification(responseBody.payload.request)
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

      const route = `http://localhost:3000/api/${role}/notification/create`
      const response = await callAPI(body, 'POST', route)
      if (response === 'OK') setError(null)
    } catch (error) {
      console.log(error)
      setError('Error creating notification')
    }
  }

  const areObjectsEqual = (obj1, obj2) => {
    const keys1 = Object.keys(obj1)
    const keys2 = Object.keys(obj2)

    if (keys1.length !== keys2.length) {
      return false
    }

    for (const key of keys1) {
      const val1 = obj1[key]
      const val2 = obj2[key]

      if (typeof val1 === 'object' && typeof val2 === 'object') {
        if (!areObjectsEqual(val1, val2)) {
          return false
        }
      } else if (val1 !== val2) {
        return false
      }
    }

    return true
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
            <Heading>Update Profile</Heading>
          </ModalHeader>
          <ModalCloseButton />
          <Divider m={'auto'} borderColor={'brand.100'} w={'90%'} />
          <ModalBody>
            <EditForm
              onSubmit={(values, { setSubmitting }) => {
                setTimeout(async () => {
                  await editProfile(values)
                  setSubmitting(false)
                }, 1000)
              }}
              validationSchema={validationSchema}
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
                email: '',
                address_streetName: '',
                address_houseNumber: '',
                address_subdivisionPurok: '',
                profilePhoto: '',
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

export default EditAccountModal
