import Navbar from '../../components/Navbar'
import Sidebar from '../../components/AdminSidebar'
import {
  Card,
  Grid,
  GridItem,
  Icon,
  SimpleGrid,
  Text,
  CardHeader,
  CardBody,
  Heading,
  VStack,
} from '@chakra-ui/react'
import { FaUser, FaUserCog, FaUserSlash } from 'react-icons/fa'
import { HiDocumentText } from 'react-icons/hi2'
const AdminDashboard = () => {
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
            <Heading display={'inline-block'}>442</Heading>
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
            <Heading display={'inline-block'}>7</Heading>
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
            <Heading display={'inline-block'}>9</Heading>
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
            <Heading display={'inline-block'}>16</Heading>
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
            <Heading display={'inline-block'}>72</Heading>
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
        <VStack>
          <Card minW={'1000px'}>
            <CardHeader>Transaction 1 </CardHeader>
          </Card>
          <Card>
            <CardHeader minW={'1000px'}>Transaction 2</CardHeader>
          </Card>
        </VStack>
      </SimpleGrid>
    </>
  )
}

export default AdminDashboard
