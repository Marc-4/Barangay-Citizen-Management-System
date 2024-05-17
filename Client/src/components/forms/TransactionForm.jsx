import { Formik, Form, Field, ErrorMessage } from 'formik'
import { Heading, Box, Text, Input, Button, Flex, Select, Textarea } from '@chakra-ui/react'
const TransactionForm = ({ onSubmit, validationSchema, initialValues }) => {
  const transactions = ['']
  return (
    <>
      <Formik validationSchema={validationSchema} initialValues={initialValues} onSubmit={onSubmit}>
        {({ isSubmitting }) => (
          <Form encType={'multipart/form-data'}>
            <Heading mb={'10px'} fontSize={'2xl'}>
              Transaction Details
            </Heading>
            <Flex flexDir={'column'} gap={'15px'}>
              <Box display={'flex'} gap={'10px'} alignItems={'center'}>
                <Text mr={'15px'} fontWeight={'bold'} fontSize={'xl'}>
                  Transaction Type:
                </Text>
                <Field
                  as={Select}
                  w={'fit-content'}
                  name='transacType'
                  placeholder='Transaction Type'
                >
                  <option value='Barangay Clearance'>Barangay Clearance</option>
                  <option value='Community Tax Certificate'>Community Tax Certificate</option>
                  <option value='Barangay Records'>Barangay Records</option>
                  <option value='Certificate of Residency'>Certification of Residency</option>
                  <option value='Business Clearance'>Business Clearance</option>
                </Field>
                <Text as={ErrorMessage} name='transacType' component='div' color={'tomato'} />
              </Box>
              <Box display={'flex'} gap={'10px'} alignItems={'center'}>
                <Text mr={'97px'} fontSize={'xl'} fontWeight={'bold'}>
                  Purpose:
                </Text>
                <Field as={Textarea} name='purpose' w={'300px'} />
                <Text as={ErrorMessage} name='purpose' component='div' color={'tomato'} />
              </Box>
              {/* <Box display={'flex'} gap={'10px'} alignItems={'center'}>
                <Text mr={'70px'} fontSize={'xl'} fontWeight={'bold'}>
                  Income (₱):
                </Text>
                <Input as={Field} type='number' name='income' maxW={'300px'} />
                <Text as={ErrorMessage} name='income' component='div' color={'tomato'} />
              </Box> */}
              {/* <Box display={'flex'} gap={'10px'} alignItems={'center'}>
                <Text mr={'97px'} fontWeight={'bold'} fontSize={'xl'}>
                  Cost (₱):
                </Text>
                <Input as={Field} type='number' name='cost' maxW={'300px'} />
                <Text as={ErrorMessage} name='cost' component='div' color={'tomato'} />
              </Box> */}
              <Button
                m={'auto'}
                w={'fit-content'}
                type='submit'
                isLoading={isSubmitting}
                isDisabled={isSubmitting}
              >
                Submit
              </Button>
            </Flex>
          </Form>
        )}
      </Formik>
    </>
  )
}

export default TransactionForm
