import React, { useState } from 'react'
import {
  Box,
  Text,
  Input,
  Button,
  Heading,
  RadioGroup,
  Radio,
  Image,
} from '@chakra-ui/react'
import ReCAPTCHA from 'react-google-recaptcha'
import { Formik, Form, Field, ErrorMessage } from 'formik'

const RegisterForm = ({ onSubmit, validationSchema, initialValues }) => {
  const [profilePhoto, setProfilePhoto] = useState()
  const role = sessionStorage.getItem('userRole')
  console.log(role);
  return (
    <>
      <Formik
        validationSchema={validationSchema}
        initialValues={initialValues}
        onSubmit={onSubmit}
      >
        {({ isSubmitting, setFieldValue }) => (
          <Form encType={'multipart/form-data'}>
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
              <Box>
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
                <Text
                  as={ErrorMessage}
                  name='profilePhoto'
                  component='div'
                  color={'tomato'}
                />
              </Box>
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
                name='placeOfBirth_city'
                placeholder='City'
              />
              <Text
                as={ErrorMessage}
                name='placeOfBirth_city'
                component='div'
                color={'tomato'}
              />
              <Input
                as={Field}
                type='text'
                name='placeOfBirth_province'
                placeholder='Province'
              />
              <Text
                as={ErrorMessage}
                name='placeOfBirth_province'
                component='div'
                color={'tomato'}
              />
              <Input
                as={Field}
                type='text'
                name='placeOfBirth_country'
                placeholder='Country'
              />
              <Text
                as={ErrorMessage}
                name='placeOfBirth_country'
                component='div'
                color={'tomato'}
              />
              <Heading fontSize={'xl'}>Gender</Heading>
              <RadioGroup name='sex' display={'flex'} flexDirection={'column'}>
                <Field>
                  {({ field }) => (
                    <Radio {...field} value='male' type='radio' size={'md'}>
                      Male
                    </Radio>
                  )}
                </Field>
                <Field>
                  {({ field }) => (
                    <Radio {...field} value='female' type='radio' size={'md'}>
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
              <Input as={Field} type='email' name='email' placeholder='email' />
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
            {role === null ? (
              <ReCAPTCHA
              sitekey='6LcLQywpAAAAAGJJwgJxWQAY40QFBLsLAJDwgXra'
              onChange={(value) =>
                setFieldValue('g_recaptcha_response', value)
              }
            />
            ) : (
              ''
            )}

            <Field type='hidden' name='g_recaptcha_response' />
            <Text
              as={ErrorMessage}
              name='g_recaptcha_response'
              component='div'
              color={'tomato'}
            />
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
    </>
  )
}

export default RegisterForm
