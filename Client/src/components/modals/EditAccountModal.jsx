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
import EditForm from '../forms/EditForm'

const EditAccountModal = ({ isOpen, onClose, user, onUpdate, role }) => {
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const accountRole = sessionStorage.getItem('userRole')

  const validationSchema = object({
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

  const editProfile = async (values, resetForm) => {
    try {
      const initialProfile = user?.profile
      const valuesObject = {
        firstName: values.firstName,
        middleName: values.middleName,
        lastName: values.lastName,
        sex: values.sex,
        occupation: values.occupation,
        citizenship: values.citizenship,
        civilStatus: values.civilStatus,
        email: values.email,
        placeOfBirth: {
          city: values.placeOfBirth_City,
          country: values.placeOfBirth_Country,
          province: values.placeOfBirth_Province,
        },
        address: {
          houseNumber: values.address_houseNumber,
          streetName: values.address_streetName,
          subdivisionPurok: values.address_subdivisionPurok,
        },
      }
      const changedValues = Object.entries(valuesObject).reduce(
        (acc, [key, value]) => {
          if (key === 'dateOfBirth') {
            const dateValue = new Date(value)
            if (
              dateValue.getTime() !== new Date(initialProfile[key])?.getTime()
            ) {
              acc[key] = dateValue
            }
          } else if (!areObjectsEqual(value, initialProfile[key])) {
            acc[key] = value
          }
          return acc
        },
        {}
      )

      if (Object.keys(changedValues).length === 0) {
        setError('No values to be updated')
        return
      }
      // console.log('initial profile: ' + JSON.stringify(initialProfile, null, 2))
      // console.log('values in form: ' + JSON.stringify(valuesObject, null, 2))
      // console.log('changed values: ' + JSON.stringify(changedValues, null, 2))
      const body = { ...changedValues }

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

        createNotification(response.payload.request)
        if (onUpdate) {
          onUpdate()
        }
      } else setError(response.payload.error || 'Connection Error')
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
              onSubmit={(values, { setSubmitting, resetForm }) => {
                setTimeout(async () => {
                  await editProfile(values, resetForm)
                  setSubmitting(false)
                }, 1000)
              }}
              validationSchema={validationSchema}
              initialValues={{
                firstName: user?.profile?.firstName,
                middleName: user?.profile?.middleName,
                lastName: user?.profile?.lastName,
                dateOfBirth:
                  user?.profile?.dateOfBirth &&
                  !isNaN(new Date(user?.profile?.dateOfBirth))
                    ? new Date(user?.profile?.dateOfBirth)
                        .toISOString()
                        .slice(0, 10)
                    : null,
                placeOfBirth_City: user?.profile?.placeOfBirth.city,
                placeOfBirth_Province: user?.profile?.placeOfBirth.province,
                placeOfBirth_Country: user?.profile?.placeOfBirth.country,
                sex: user?.profile?.sex,
                civilStatus: user?.profile?.civilStatus,
                occupation: user?.profile?.occupation,
                citizenship: user?.profile?.citizenship,
                email: user?.profile?.email,
                address_streetName: user?.profile?.address.streetName,
                address_houseNumber: user?.profile?.address.houseNumber,
                address_subdivisionPurok:
                  user?.profile?.address.subdivisionPurok,
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
