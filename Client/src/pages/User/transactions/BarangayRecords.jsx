import {
  Box,
  Button,
  Center,
  Checkbox,
  Heading,
  Stack,
  Text,
  Textarea,
  Input,
} from '@chakra-ui/react'
import { Form, useNavigate } from 'react-router-dom'
import callAPI from '../../../utils/callAPI'
import { useState, useEffect } from 'react'

const BarangayRecords = () => {
  const [account, setAccount] = useState()
  const [purpose, setPurpose] = useState()
  const [success, setSuccess] = useState()
  const [error, setError] = useState()
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    getProfile()
  }, [])

  const createTransaction = async () => {
    setLoading(true)
    try {
      const formData = new FormData()

      formData.append('transacType', 'BRGY_RECORD')
      formData.append('purpose', purpose)
      formData.append('income', '')
      formData.append('cost', 150)

      const attachmentInput = document.querySelector('input[name="attachment"]')
      const file = attachmentInput.files[0]
      console.log(file.name)
      formData.append('attachment', file, file.name)

      for (const pair of formData.entries()) {
        console.log(pair[0], pair[1])
      }

      const route = `http://localhost:3000/api/user/transaction/create`

      const response = await fetch(route, {
        method: 'POST',
        body: formData,
        mode: 'cors',
        credentials: 'include',
      })

      const responseData = await response.json()
      if (responseData.result === 'OK') {
        setSuccess('Successfully Booked Transaction!')
        setError(null)
        createNotification(responseData.payload)

        setTimeout(() => {
          navigate(`/user/transactions/${responseData.payload._id}`)
        }, 1000)
      } else setError(responseData.payload.error)
    } catch (error) {
      console.log(error)
      setError('Connection Error')
    } finally {
      setLoading(false)
    }
  }

  const getProfile = async () => {
    setLoading(true)
    const body = null
    const method = 'GET'
    const route = `http://localhost:3000/api/user/account/`

    let data
    try {
      data = await callAPI(body, method, route)
      console.log(data.payload)
      if (data.result === 'OK') {
        setError(null)
        setAccount(data.payload)
      }
    } catch (err) {
      console.error(err)
      setError('An error occurred while fetching profile data')
    } finally {
      setLoading(false)
    }
  }

  const createNotification = async (transaction) => {
    console.log(transaction)
    try {
      const body = {
        notifType: 'TRANSACTION',
        message: `${account.profile.firstName} ${account.profile.lastName} booked a Baragay Record Transaction.`,
        linkID: transaction._id,
      }
      const route = `http://localhost:3000/api/user/notification/create`
      const response = await callAPI(body, 'POST', route)
      if (response === 'OK') setError(null)
    } catch (error) {
      console.log(error)
      setError('Error creating notification')
    }
  }

  return (
    <>
      <Center id='center' h={'70vh'}>
        <Stack
          shadow={'base'}
          w={'750px'}
          p={'25px'}
          id='stack'
          direction={'column'}
          borderRadius={'10px'}
          bg={'white'}
        >
          <Box display={'flex'} flexDirection={'column'}>
            <Heading textAlign={'center'}>
              Barangay Records & Documents Form
            </Heading>
            <Form onSubmit={() => createTransaction()}>
              <Box display={'flex'} flexDir={'column'} gap={'10px'}>
              <Text>Purpose:</Text>
                <Textarea
                  value={purpose}
                  onChange={(e) => setPurpose(e.target.value)}
                  isRequired={true}
                />
                <Text>Letter of Request: </Text>
                <input
                  name='attachment'
                  type='file'
                  accept='.pdf'
                  required={true}
                />
                <Checkbox size={'lg'} isRequired={true}>
                  I certify that I reside at this barangay.
                </Checkbox>
                <Text fontWeight={'semibold'} fontSize={'lg'}>
                  Processing Fee:
                </Text>
                <Input
                  isReadOnly={true}
                  fontWeight={'semibold'}
                  value={'none'}
                />

                <Button
                  isDisabled={loading}
                  size={'md'}
                  m={'auto'}
                  w={'250px'}
                  colorScheme='blue'
                  type='submit'
                >
                  Submit
                </Button>
                <Text
                  fontWeight={'semibold'}
                  fontSize={'2xl'}
                  color={'green'}
                  textAlign={'center'}
                  display={success ? 'block' : 'none'}
                >
                  {success}
                </Text>
                <Text
                  fontWeight={'semibold'}
                  fontSize={'2xl'}
                  color={'tomato'}
                  textAlign={'center'}
                  display={error ? 'block' : 'none'}
                >
                  {error}
                </Text>
              </Box>
            </Form>
          </Box>
        </Stack>
      </Center>
    </>
  )
}

export default BarangayRecords
