import {
  Button,
  Divider,
  Heading,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Box,
  Flex,
  Tab,
  Tabs,
  TabList,
  Link
} from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import callAPI from '../../utils/callAPI'
import Searchbar from '../../components/Searchbar'
import { Link as rr_Link } from 'react-router-dom'

const AdminEmployeeAccounts = () => {
  const [employees, setEmployees] = useState([])
  const [profiles, setProfiles] = useState([])
  const [error, setError] = useState()
  const [entries, setEntries] = useState(20)
  const [filter, setFilter] = useState('ACTIVE')

  useEffect(() => {
    getEmployees()
  }, [filter])

  const getEmployees = async () => {
    const body = null
    const method = 'GET'
    const route = `http://localhost:3000/api/admin/employees?entries=${entries}&filter=${filter}`

    let data
    try {
      data = await callAPI(body, method, route)
      setEmployees(data.payload)
    } catch (err) {
      console.log(err)
      setError(data.payload.error)
    }
  }

  const getEmployeeProfile = async (id) => {
    const body = null
    const method = 'GET'
    const route = `http://localhost:3000/api/admin/employee/Profile/${id}`
    try {
      const data = await callAPI(body, method, route)
      return data
    } catch (err) {
      console.log(err)
      throw err
    }
  }

  function calculateAge(dateOfBirth) {
    const today = new Date()
    const birthDate = new Date(dateOfBirth)
    let age = today.getFullYear() - birthDate.getFullYear()
    const monthDiff = today.getMonth() - birthDate.getMonth()

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--
    }

    return age
  }

  return (
    <>
      <Box m={'auto'} display='flex' alignItems='center' w={'90%'}>
        <Flex flexDirection='row' alignItems='center' gap={'25px'}>
          <Searchbar />
          <Heading mt='25px' mb='25px' display='flex' justifyContent='center'>
            Employee Accounts
          </Heading>
        </Flex>
      </Box>
      <Divider margin={'auto'} borderColor={'brand.100'} w={'90%'} />
      <Tabs margin={'auto'} w={'90%'} variant='line'>
        <TabList mb='1em'>
          <Tab onClick={() => setFilter('ACTIVE')}>Employee List</Tab>
          <Tab onClick={() => setFilter('ARCHIVED')}>Archived Employees</Tab>
        </TabList>
      </Tabs>
      <Button colorScheme='blue'>Register Employee</Button>
      <TableContainer
        display={'flex'}
        margin={'10px'}
        alignContent={'center'}
        justifyContent={'center'}
        rounded='md'
        minW={'100%'}
      >
        <Table
          w={'1200px'}
          p={'10px'}
          rounded='md'
          bg='brand.400'
          variant={'simple'}
          style={{ borderCollapse: 'separate' }}
          borderColor={'brand.400'}
          borderWidth={'1px'}
        >
          <Thead>
            <Tr>
              <Th textAlign='center'>Employee ID</Th>
              <Th textAlign='center'>Last Name</Th>
              <Th textAlign='center'>First Name</Th>
              <Th textAlign='center'>Middle Name</Th>
              <Th textAlign='center'>Gender</Th>
              <Th textAlign='center'>Age</Th>
              <Th textAlign='center'>Date of Registration</Th>
              <Th textAlign='center'>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {employees.map((employee) => {
              const profile = employee.profile

              return (
                <Tr key={employee._id}>
                  <Td textAlign='center'>
                    <Link as={rr_Link} color={'brand.500'} to={`${employee._id}`}>
                      {employee._id}
                    </Link>
                  </Td>
                  <Td textAlign='center'>{profile?.lastName || 'N/A'}</Td>
                  <Td textAlign='center'>{profile?.firstName || 'N/A'}</Td>
                  <Td textAlign='center'>{profile?.middleName || 'N/A'}</Td>
                  <Td textAlign='center'>{profile?.sex || 'N/A'}</Td>
                  <Td textAlign='center'>
                    {calculateAge(profile?.dateOfBirth) || 'N/A'}
                  </Td>
                  <Td textAlign='center'>
                    {new Date(employee.dateOfCreation).toLocaleDateString()}
                  </Td>
                  <Td
                    textAlign='center'
                    justifyContent={'center'}
                    display={'flex'}
                    gap={'10px'}
                  >
                    <Button colorScheme='green'>Edit</Button>
                    <Button colorScheme='orange'>Archive</Button>
                    <Button colorScheme='red'>Delete</Button>
                  </Td>
                </Tr>
              )
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  )
}

export default AdminEmployeeAccounts
