import {
  Box,
  Button,
  Center,
  Checkbox,
  Heading,
  Input,
  Radio,
  RadioGroup,
  Stack,
  Text,
  Textarea,
} from '@chakra-ui/react'
import { Form, useNavigate } from 'react-router-dom'
import callAPI from '../../../utils/callAPI'
import { useState, useEffect } from 'react'

const CommunityTaxCertificate = () => {
  const [account, setAccount] = useState()
  const [purpose, setPurpose] = useState('')
  const [income, setIncome] = useState('')
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
      const route = `${import.meta.env.VITE_API_URL}/api/user/transaction/create`
      const body = {
        transacType: 'COM_TAX_CERT',
        purpose: purpose,
        income: income,
        cost: 'Variable',
      }
      console.log(body)

      const response = await callAPI(body, 'POST', route)

      if (response.result === 'OK') {
        setSuccess('Successfully Booked Transaction!')
        setError(null)
        createNotification(response.payload)

        setTimeout(() => {
          navigate(`/user/transactions/${response.payload._id}`)
        }, 1000)
      } else setError(response.payload.error)
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
    const route = `${import.meta.env.VITE_API_URL}/api/user/account/`

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
        message: `${account.profile.firstName} ${account.profile.lastName} booked a Community Tax Certificate Transaction.`,
        linkID: transaction._id,
      }

      const route = `${import.meta.env.VITE_API_URL}/api/user/notification/create`
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
              Community Tax Certificate Form
            </Heading>
            <Form onSubmit={() => createTransaction()}>
              <Box display={'flex'} flexDir={'column'} gap={'10px'}>
                <Text>Purpose:</Text>
                <Textarea
                  value={purpose}
                  onChange={(e) => setPurpose(e.target.value)}
                  isRequired={true}
                />
                <Text>Monthly Income: </Text>
                <Input
                  isRequired={true}
                  type='number'
                  onChange={(e) => setIncome(e.target.value)}
                  value={income}
                  placeholder='income'
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
                  value={'Variable'}
                ></Input>

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

export default CommunityTaxCertificate
