import React, { useEffect, useState } from 'react'
import {
  Box,
  Text,
  Input,
  Button,
  Heading,
  Select,
  Image,
  InputLeftElement,
  InputGroup,
} from '@chakra-ui/react'
import { Formik, Form, Field, ErrorMessage } from 'formik'

const EmployeeEditForm = ({ onSubmit, validationSchema, initialValues }) => {
  const [profilePhoto, setProfilePhoto] = useState()

  useEffect(() => {
    console.log(initialValues)
    setProfilePhoto(initialValues?.profilePhoto)
  }, [])

  return (
    <>
      <Formik validationSchema={validationSchema} initialValues={initialValues} onSubmit={onSubmit}>
        {({ isSubmitting, setFieldValue }) => (
          <Form>
            <Box>
              {/* <Heading fontSize={'2xl'}>Account Data</Heading>
              <Input as={Field} type='text' name='username' placeholder='username' />
              <Text as={ErrorMessage} name='username' component='div' color={'tomato'} />
              <Input as={Field} type='password' name='password' placeholder='password' /> */}
              <Text as={ErrorMessage} color={'tomato'} name='password' component='div' />
              <Heading fontSize={'xl'}>Profile Photo</Heading>
              <Image
                m={'auto'}
                id='profile_photo'
                boxSize={'250px'}
                objectFit='cover'
                display={'block'}
                borderRadius={'full'}
                fallbackSrc='https://via.placeholder.com/250'
                src={profilePhoto ? profilePhoto : null}
              />
              <input
                type='file'
                name='profilePhoto'
                accept='.jpg, .jpeg, .png'
                onChange={(event) => {
                  const file = event.currentTarget.files[0]
                  if (file) {
                    setFieldValue('profilePhoto', file)

                    const reader = new FileReader()
                    reader.onload = (e) => {
                      setProfilePhoto(e.target.result)
                    }
                    reader.readAsDataURL(file)
                  }
                }}
              />
              <Text as={ErrorMessage} name='profilePhoto' component='div' color={'tomato'} />
              <Heading fontSize={'xl'}>Full Name</Heading>
              <Input as={Field} type='text' name='firstName' placeholder='First Name' />
              <Text as={ErrorMessage} name='firstName' component='div' color={'tomato'} />
              <Input as={Field} type='text' name='middleName' placeholder='Middle Name' />
              <Text as={ErrorMessage} name='middleName' component='div' color={'tomato'} />
              <Input as={Field} type='text' name='lastName' placeholder='Last Name' />
              <Text as={ErrorMessage} name='lastName' component='div' color={'tomato'} />
              <Heading fontSize={'xl'}>Date of Birth</Heading>
              <Input as={Field} type='date' name='dateOfBirth' />
              <Text as={ErrorMessage} name='dateOfBirth' component='div' color={'tomato'} />
              <Heading fontSize={'xl'}>Place of Birth</Heading>
              <Input as={Field} type='text' name='placeOfBirth_city' placeholder='City' />
              <Text as={ErrorMessage} name='placeOfBirth_city' component='div' color={'tomato'} />
              <Input as={Field} type='text' name='placeOfBirth_province' placeholder='Province' />
              <Text
                as={ErrorMessage}
                name='placeOfBirth_province'
                component='div'
                color={'tomato'}
              />
              <Input as={Field} type='text' name='placeOfBirth_country' placeholder='Country' />
              <Text
                as={ErrorMessage}
                name='placeOfBirth_country'
                component='div'
                color={'tomato'}
              />
              <Heading fontSize={'xl'}>Sex</Heading>
              <Field name='sex'>
                {({ field }) => (
                  <Select {...field} placeholder='Select Sex'>
                    <option value='male'>Male</option>
                    <option value='female'>Female</option>
                  </Select>
                )}
              </Field>
              <Text as={ErrorMessage} name='sex' component='div' color={'tomato'} />
              <Heading fontSize={'xl'}>Civil Status</Heading>
              <Field as={Select} name='civilStatus' placeholder={'Select'}>
                <option value='single'>Single</option>
                <option value='married'>Married</option>
                <option value='legally separated'>Legally Separated</option>
                <option value='divorced'>Divorced</option>
                <option value='widowed'>Widowed</option>
              </Field>
              <Text as={ErrorMessage} name='civilStatus' component='div' color={'tomato'} />
              <Heading fontSize={'xl'}>Occupation</Heading>
              <Input as={Field} type='text' name='occupation' placeholder='occupation' />
              <Text as={ErrorMessage} name='occupation' component='div' color={'tomato'} />
              <Heading fontSize={'xl'}>Citizenship</Heading>
              <Input as={Field} type='text' name='citizenship' placeholder='citizenship' />
              <Text as={ErrorMessage} name='citizenship' component='div' color={'tomato'} />
              <Heading fontSize={'xl'}>Phone Number</Heading>
              <InputGroup>
                <InputLeftElement pointerEvents='none' color='gray.500' fontWeight={'semibold'}>
                  +63
                </InputLeftElement>
                <Input as={Field} type='text' name='phone_number' placeholder='Phone Number' />
              </InputGroup>
              <Text as={ErrorMessage} name='phone_number' component='div' color={'tomato'} />
              <Heading fontSize={'xl'}>Email</Heading>
              <Input as={Field} type='email' name='email' placeholder='email' />
              <Text as={ErrorMessage} name='email' component='div' color={'tomato'} />
              <Heading fontSize={'xl'}>Address</Heading>
              <Input as={Field} type='text' name='address_streetName' placeholder='Street Name' />
              <Text as={ErrorMessage} name='address_streetName' component='div' color={'tomato'} />
              <Input as={Field} type='text' name='address_houseNumber' placeholder='House No.' />
              <Text as={ErrorMessage} name='address_houseNumber' component='div' color={'tomato'} />
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
              <Input
                as={Field}
                type='text'
                name='address_cityMunicipality'
                placeholder='City/Municipality'
              />
              <Text
                as={ErrorMessage}
                name='address_cityMunicipality'
                component='div'
                color={'tomato'}
              />
            </Box>
            <Button
              m={'auto'}
              mt={'25px'}
              w={'100%'}
              colorScheme='green'
              type='submit'
              isLoading={isSubmitting}
              isDisabled={isSubmitting}
            >
              Confirm Update
            </Button>
          </Form>
        )}
      </Formik>
    </>
  )
}

export default EmployeeEditForm
