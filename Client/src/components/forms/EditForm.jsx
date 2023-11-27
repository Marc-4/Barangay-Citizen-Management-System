import React from 'react'
import {
  Box,
  Text,
  Input,
  Button,
  Heading,
  RadioGroup,
  Radio,
  Select,
} from '@chakra-ui/react'
import { Formik, Form, Field, ErrorMessage } from 'formik'

const EditForm = ({ onSubmit, validationSchema, initialValues }) => {
  return (
    <>
      <Formik
        validationSchema={validationSchema}
        initialValues={initialValues}
        onSubmit={onSubmit}
      >
        {({ isSubmitting, resetForm }) => (
          <Form>
            <Box>
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
              <Field name='sex'>
                {({ field }) => (
                  <Select {...field} placeholder='Select gender'>
                    <option value='male'>Male</option>
                    <option value='female'>Female</option>
                  </Select>
                )}
              </Field>
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
            <Button
              m={'auto'}
              mt={'25px'}
              w={'100%'}
              colorScheme='green'
              type='submit'
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

export default EditForm
