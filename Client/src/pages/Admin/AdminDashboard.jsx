import {
  Card,
  Icon,
  SimpleGrid,
  Text,
  CardHeader,
  CardBody,
  Heading,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import UpcomingTransactions from '../../components/UpcomingTransactions'
import { FaUser, FaUserCog, FaUserSlash } from 'react-icons/fa'
import { HiDocumentText } from 'react-icons/hi2'
import callAPI from '../../utils/callAPI'

const AdminDashboard = () => {
  const [totalUsers, setTotalUsers] = useState('-')
  const [totalEmployees, setTotalEmployees] = useState('-')
  const [totalArchived, setTotalArchived] = useState('-')
  const [totalPendingRequests, setPendingRequests] = useState('-')
  const [totalPendingTransactions, setPendingTransactions] = useState('-')

  useEffect(() => {
    getUsers()
    getEmployees()
    getRequests()
    getTransactions()
  }, [])

  const getUsers = async () => {
    const body = null
    const method = 'GET'
    const route = `http://localhost:3000/api/admin/users/?entries=0`
    try {
      const data = await callAPI(body, method, route)
      if (data && data.result === 'OK') setTotalUsers(data.payload)
    } catch (error) {
      console.log(error)
    }
  }

  const getEmployees = async () => {
    const body = null
    const method = 'GET'
    const route = `http://localhost:3000/api/admin/employees/?entries=0`
    try {
      const data = await callAPI(body, method, route)
      if (data && data.result === 'OK') setTotalEmployees(data.payload)
    } catch (error) {
      console.log(error)
    }
  }
  const getRequests = async () => {
    const body = null
    const method = 'GET'
    const route = `http://localhost:3000/api/admin/requests/?entries=0`
    try {
      const data = await callAPI(body, method, route)
      if (data && data.result === 'OK') setPendingRequests(data.payload)
    } catch (error) {
      console.log(error)
    }
  }
  const getTransactions = async () => {
    const body = null
    const method = 'GET'
    const route = `http://localhost:3000/api/admin/transactions/?entries=0`
    try {
      const data = await callAPI(body, method, route)
      if (data && data.result === 'OK') setPendingTransactions(data.payload)
    } catch (error) {
      console.log(error)
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
              as={FaUserCog}
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
              as={FaUserSlash}
              boxSize={'10'}
              display={'inline-block'}
              mr={'15px'}
            ></Icon>
            <Heading display={'inline-block'}>{totalArchived}</Heading>
          </CardHeader>
          <CardBody>
            <Text fontSize={'xl'} fontWeight={'semibold'}>
              Total Archived Accounts
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
            <Heading display={'inline-block'}>{totalPendingRequests}</Heading>
          </CardHeader>
          <CardBody>
            <Text fontSize={'xl'} fontWeight={'semibold'}>
              Pending User Requests
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
      </SimpleGrid>
      <SimpleGrid
        id='transactions'
        textAlign={'center'}
        spacing={'4'}
        p={'10px'}
        rounded={'10px'}
      >
        <Heading>Upcoming Transactions</Heading>
        <UpcomingTransactions />
      </SimpleGrid>
    </>
  )
}

export default AdminDashboard
