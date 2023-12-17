import {
  Card,
  Icon,
  SimpleGrid,
  Text,
  CardHeader,
  CardBody,
  Heading,
  Spinner,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import UpcomingTransactions from '../../components/UpcomingTransactions'
import { FaUser, FaUserCog, FaUserSlash } from 'react-icons/fa'
import { HiDocumentText, HiClipboardDocumentList } from 'react-icons/hi2'
import callAPI from '../../utils/callAPI'

const EmployeeDashboard = () => {
  const [totalUsers, setTotalUsers] = useState('-')
  const [totalEmployees, setTotalEmployees] = useState('-')
  const [lifetimeTransactions, setLifetimeTransactions] = useState('-')
  const [totalPendingRequests, setPendingRequests] = useState('-')
  const [totalPendingTransactions, setPendingTransactions] = useState('-')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    getUsers()
    getRequests()
    getTransactions()
    getAllTransactions()
  }, [])

  const getUsers = async () => {
    setIsLoading(true)
    const body = null
    const method = 'GET'
    const route = `http://localhost:3000/api/employee/users/?entries=0`
    try {
      const data = await callAPI(body, method, route)
      if (data && data.result === 'OK') {
        setTotalUsers(data.payload)
        setError(null)
      }
    } catch (error) {
      console.log(error)
      setError('Connection Error')
    } finally {
      setIsLoading(false)
    }
  }

  const getRequests = async () => {
    setIsLoading(true)
    const body = null
    const method = 'GET'
    const route = `http://localhost:3000/api/employee/requests/?entries=0`
    try {
      const data = await callAPI(body, method, route)
      if (data && data.result === 'OK') {
        setPendingRequests(data.payload)
        setError(null)
      }
    } catch (error) {
      console.log(error)
      setError('Connection Error')
    } finally {
      setIsLoading(false)
    }
  }
  const getTransactions = async () => {
    setIsLoading(true)
    const body = null
    const method = 'GET'
    const route = `http://localhost:3000/api/employee/transactions/?entries=0`
    try {
      const data = await callAPI(body, method, route)
      if (data && data.result === 'OK') {
        setError(null)
        setPendingTransactions(data.payload)
      }
    } catch (error) {
      console.log(error)
      setError('Connection Error')
    } finally {
      setIsLoading(false)
    }
  }

  const getAllTransactions = async () => {
    setIsLoading(true)
    const body = null
    const method = 'GET'
    const route = `http://localhost:3000/api/employee/transactions/?entries=-1`
    try {
      const data = await callAPI(body, method, route)
      if (data && data.result === 'OK') {
        setError(null)
        setLifetimeTransactions(data.payload)
      }
    } catch (error) {
      console.log(error)
      setError('Connection Error')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <SimpleGrid
        id='stats_table'
        spacing={'50px'}
        minChildWidth={'250px'}
        p={'20px'}
        justifyContent={'space-between'}
      >
        <Card>
          <CardHeader>
            <Icon
              as={FaUser}
              boxSize={'10'}
              display={'inline-block'}
              mr={'15px'}
            ></Icon>
            <Heading display={'inline-block'}>{totalUsers}</Heading>
          </CardHeader>
          <CardBody>
            <Text fontSize={'xl'} fontWeight={'semibold'}>
              Total Users
            </Text>
          </CardBody>
        </Card>
        <Card>
          <CardHeader>
            <Icon
              as={HiClipboardDocumentList}
              boxSize={'10'}
              display={'inline-block'}
              mr={'15px'}
            ></Icon>
            <Heading display={'inline-block'}>{lifetimeTransactions}</Heading>
          </CardHeader>
          <CardBody>
            <Text fontSize={'xl'} fontWeight={'semibold'}>
              Lifetime Transactions
            </Text>
          </CardBody>
        </Card>
        <Card>
          <CardHeader>
            <Icon
              as={HiDocumentText}
              boxSize={'10'}
              display={'inline-block'}
              mr={'15px'}
            ></Icon>
            <Heading display={'inline-block'}>
              {totalPendingTransactions}
            </Heading>
          </CardHeader>
          <CardBody>
            <Text fontSize={'xl'} fontWeight={'semibold'}>
              Pending Transactions
            </Text>
          </CardBody>
        </Card>
        <Card>
          <CardHeader>
            <Icon
              as={HiDocumentText}
              boxSize={'10'}
              display={'inline-block'}
              mr={'15px'}
            ></Icon>
            <Heading display={'inline-block'}>
              {totalPendingRequests || '0'}
            </Heading>
          </CardHeader>
          <CardBody>
            <Text fontSize={'xl'} fontWeight={'semibold'}>
              Pending User Requests
            </Text>
          </CardBody>
        </Card>
      </SimpleGrid>
      <SimpleGrid
        id='transactions'
        textAlign={'center'}
        spacing={'4'}
        p={'10px'}
        rounded={'10px'}
      >
        <Heading>Upcoming Transactions</Heading>
        <Text
          fontSize={'2xl'}
          fontWeight={'semibold'}
          color={'tomato'}
          display={error ? 'block' : 'none'}
        >
          {error}
        </Text>
        <Spinner
          display={isLoading ? 'block' : 'none'}
          m={'auto'}
          size={'xl'}
          mt={'25px'}
        />
        <UpcomingTransactions />
      </SimpleGrid>
    </>
  )
}

export default EmployeeDashboard
