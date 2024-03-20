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
import { BsFillPersonBadgeFill } from 'react-icons/bs'
import { FaUser, FaUserCog } from 'react-icons/fa'
import { HiDocumentText, HiClipboardDocumentList } from 'react-icons/hi2'
import callAPI from '../../utils/callAPI'

const AdminDashboard = () => {
  const [totalUsers, setTotalUsers] = useState('-')
  const [totalEmployees, setTotalEmployees] = useState('-')
  const [lifetimeTransactions, setLifetimeTransactions] = useState('-')
  // const [totalPendingRequests, setPendingRequests] = useState('-')
  // const [totalPendingTransactions, setPendingTransactions] = useState('-')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    getUsers()
    getEmployees()
    // getRequests()
    getAllTransactions()
  }, [])

  const getUsers = async () => {
    setIsLoading(true)
    const body = null
    const method = 'GET'
    const route = `http://localhost:3000/api/admin/users/?entries=0`
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

  const getEmployees = async () => {
    setIsLoading(true)
    const body = null
    const method = 'GET'
    const route = `http://localhost:3000/api/admin/employees/?entries=0`
    try {
      const data = await callAPI(body, method, route)
      if (data && data.result === 'OK') {
        setTotalEmployees(data.payload)
        setError(null)
      }
    } catch (error) {
      console.log(error)
      setError('Connection Error')
    } finally {
      setIsLoading(false)
    }
  }
  // const getRequests = async () => {
  //   setIsLoading(true)
  //   const body = null
  //   const method = 'GET'
  //   const route = `http://localhost:3000/api/admin/requests/?entries=0`
  //   try {
  //     const data = await callAPI(body, method, route)
  //     if (data && data.result === 'OK') {
  //       setPendingRequests(data.payload)
  //       setError(null)
  //     }
  //   } catch (error) {
  //     console.log(error)
  //     setError('Connection Error')
  //   } finally {
  //     setIsLoading(false)
  //   }
  // }

  const getAllTransactions = async () => {
    setIsLoading(true)
    const body = null
    const method = 'GET'
    const route = `http://localhost:3000/api/admin/transactions/?entries=-1`
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
      m={'auto'}
        w={'87%'}
        id='stats_table'
        spacing={'50px'}
        minChildWidth={'250px'}
        p={'20px'}
        justifyContent={'space-between'}
      >
        <Card>
          <CardHeader>
            <Icon as={FaUser} boxSize={'10'} display={'inline-block'} mr={'15px'}></Icon>
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
              as={BsFillPersonBadgeFill}
              boxSize={'10'}
              display={'inline-block'}
              mr={'15px'}
            ></Icon>
            <Heading display={'inline-block'}>{totalEmployees}</Heading>
          </CardHeader>
          <CardBody>
            <Text fontSize={'xl'} fontWeight={'semibold'}>
              Total Employees
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
        {/* <Card>
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
        </Card> */}
      </SimpleGrid>
      <SimpleGrid id='transactions' textAlign={'center'} spacing={'4'} p={'10px'} rounded={'10px'}>
        <Heading>Recent Transactions</Heading>
        <Text
          fontSize={'2xl'}
          fontWeight={'semibold'}
          color={'tomato'}
          display={error ? 'block' : 'none'}
        >
          {error}
        </Text>
        <Spinner display={isLoading ? 'block' : 'none'} m={'auto'} size={'xl'} mt={'25px'} />
        <UpcomingTransactions />
      </SimpleGrid>
    </>
  )
}

export default AdminDashboard
