import React, { useState } from 'react'
import {
  Box,
  Text,
  Input,
  Button,
  Heading,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { Buffer } from 'buffer'

const EditCredentialsForm = ({ onSubmit, validationSchema, initialValues }) => {
  console.log(initialValues)
  const [showOld, setShowOld] = useState(false)
  const [showNew, setShowNew] = useState(false)
  const handleOldClick = () => setShowOld(!showOld)
  const handleNewClick = () => setShowNew(!showNew)
  return (
    <>
      <Formik
        validationSchema={validationSchema}
        initialValues={initialValues}
        onSubmit={onSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <Box>
              <Heading fontSize={'xl'}>Username</Heading>
              <Input
                as={Field}
                type='text'
                name='username'
                placeholder='Username'
              />
              <Text
                as={ErrorMessage}
                name='username'
                component='div'
                color={'tomato'}
              />
              <Heading fontSize={'xl'}>Old Password</Heading>
              <InputGroup size='md'>
                <Input
                  as={Field}
                  pr='4.5rem'
                  type={showOld ? 'text' : 'password'}
                  placeholder='Enter old password'
                  name='old_password'
                />
                <InputRightElement width='4.5rem'>
                  <Button h='1.75rem' size='sm' onClick={handleOldClick}>
                    {showOld ? 'Hide' : 'Show'}
                  </Button>
                </InputRightElement>
              </InputGroup>
              <Text
                as={ErrorMessage}
                name='old_password'
                component='div'
                color={'tomato'}
              />
              <Heading fontSize={'xl'}>New Password</Heading>
              <InputGroup size='md'>
                <Input
                  as={Field}
                  pr='4.5rem'
                  type={showNew ? 'text' : 'password'}
                  placeholder='Enter new password'
                  name='new_password'
                />
                <InputRightElement width='4.5rem'>
                  <Button h='1.75rem' size='sm' onClick={handleNewClick}>
                    {showNew ? 'Hide' : 'Show'}
                  </Button>
                </InputRightElement>
              </InputGroup>
              <Text
                as={ErrorMessage}
                name='new_password'
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

export default EditCredentialsForm
