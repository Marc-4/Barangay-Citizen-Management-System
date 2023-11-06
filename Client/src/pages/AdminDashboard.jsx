import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
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
const dashboard = () => {
  return (
    <>
      <Grid templateColumns={'repeat(5, 1fr)'}>
        <GridItem colSpan={1}>
          <Sidebar />
        </GridItem>

        <GridItem colSpan={4} bg={'gray.50'}>
          <Navbar />
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
            <VStack >
                <Card minW={'1000px'}>
                  <CardHeader>Transaction 1 </CardHeader>
                </Card>
                <Card>
                  <CardHeader minW={'1000px'}>Transaction 2</CardHeader>
                </Card>
            </VStack>
          </SimpleGrid>
        </GridItem>
      </Grid>
    </>
  )
}

export default dashboard
