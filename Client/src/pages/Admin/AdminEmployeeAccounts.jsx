import {
  Heading,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Button,
  Divider,
  Tabs,
  TabList,
  Tab,
  useDisclosure,
  Box,
  Flex,
  Link,
  Spinner,
  Text,
} from '@chakra-ui/react'
import { useEffect, useState, useRef } from 'react'
import callAPI from '../../utils/callAPI'
import Searchbar from '../../components/Searchbar'
import { Link as rr_Link } from 'react-router-dom'
import RegisterUserModal from '../../components/modals/RegisterAccountModal'
import EditAccountModal from '../../components/modals/EditAccountModal'
import DeleteAccountAlert from '../../components/popups/DeleteAccountAlert'

const AdminEmployeeAccounts = () => {
  const [employees, setEmployees] = useState([])
  const [profiles, setProfiles] = useState([])
  const [error, setError] = useState()
  const [entries, setEntries] = useState(20)
  const [filter, setFilter] = useState('ACTIVE')
  const [selectedUser, setSelectedUser] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const cancelRef = useRef()

  const {
    isOpen: isRegisterOpen,
    onOpen: onRegisterOpen,
    onClose: onRegisterClose,
  } = useDisclosure()
  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onClose: onEditClose,
  } = useDisclosure()
  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure()

  useEffect(() => {
    getEmployees()
  }, [filter])

  const getEmployees = async () => {
    setIsLoading(true)
    try {
      const body = null
      const method = 'GET'
      const route = `http://localhost:3000/api/admin/employees?entries=${entries}&filter=${filter}`

      let data
      data = await callAPI(body, method, route)
      setEmployees(data.payload)
    } catch (err) {
      console.log(err)
      setError(data.payload.error)
    } finally {
      setIsLoading(false)
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

  const handeUpdate = () => {
    getEmployees()
  }

  const handleEditOpen = (employee) => {
    setSelectedUser(employee)
    onEditOpen()
  }

  const handleEditClose = () => {
    setSelectedUser(null)
    onEditClose()
  }
  const handleDeleteOpen = (employee) => {
    setSelectedUser(employee)
    onDeleteOpen()
  }

  const handleDeleteClose = () => {
    setSelectedUser(null)
    onDeleteClose()
  }

  return (
    <>
      <RegisterUserModal
        {...{
          isOpen: isRegisterOpen,
          onClose: onRegisterClose,
          onUpdate: handeUpdate,
          role: 'employee',
        }}
      />
      <EditAccountModal
        {...{
          isOpen: isEditOpen,
          onClose: handleEditClose,
          user: selectedUser,
          onUpdate: handeUpdate,
          role: 'employee',
        }}
      />
      <DeleteAccountAlert
        {...{
          isOpen: isDeleteOpen,
          onClose: handleDeleteClose,
          cancelRef: cancelRef,
          user: selectedUser,
          onUpdate: handeUpdate,
          role: 'employee',
        }}
      />
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
      <Button colorScheme='blue' onClick={onRegisterOpen}>
        Register Employee
      </Button>
      <TableContainer
        display={'flex'}
        margin={'10px'}
        alignContent={'center'}
        justifyContent={'center'}
        rounded='md'
      >
        <Table
          w={'90%'}
          p={'10px'}
          rounded='md'
          bg='brand.400'
          variant={'simple'}
          style={{ borderCollapse: 'separate', tableLayout: 'fixed' }}
          borderColor={'gray.400'}
          borderWidth={'1px'}
        >
          <Thead>
            <Tr>
              <Th p={'12px'} textAlign='center' w={'17%'}>
                User ID
              </Th>
              <Th p={'12px'} textAlign='center'>
                Username
              </Th>
              <Th p={'12px'} textAlign='center'>
                Last Name
              </Th>
              <Th p={'12px'} textAlign='center'>
                First Name
              </Th>
              <Th p={'12px'} textAlign='center'>
                Middle Name
              </Th>
              <Th p={'12px'} textAlign='center' w={'7%'}>
                Gender
              </Th>
              {/* <Th textAlign='center' w={'6%'}>
                Age
              </Th> */}
              <Th p={'12px'} textAlign='center'>
                Date of Registration
              </Th>
              <Th p={'12px'} textAlign='center' w={'15%'}>
                Actions
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {employees.map((employee) => {
              const profile = employee.profile

              return (
                <Tr key={employee._id}>
                  <Td
                    p={'12px'}
                    textAlign='center'
                    style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}
                  >
                    <Link
                      as={rr_Link}
                      color={'brand.500'}
                      to={`${employee._id}`}
                    >
                      {employee._id}
                    </Link>
                  </Td>
                  <Td
                    p={'12px'}
                    textAlign='center'
                    style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}
                  >
                    {employee.username || 'N/A'}
                  </Td>
                  <Td
                    p={'12px'}
                    textAlign='center'
                    style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}
                  >
                    {profile?.lastName || 'N/A'}
                  </Td>
                  <Td
                    p={'12px'}
                    textAlign='center'
                    style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}
                  >
                    {profile?.firstName || 'N/A'}
                  </Td>
                  <Td
                    p={'12px'}
                    textAlign='center'
                    style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}
                  >
                    {profile?.middleName || 'N/A'}
                  </Td>
                  <Td
                    p={'12px'}
                    textAlign='center'
                    style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}
                  >
                    {profile?.sex || 'N/A'}
                  </Td>
                  {/* <Td p={'12px'} textAlign='center'>
                    {calculateAge(profile?.dateOfBirth) || 'N/A'}
                  </Td> */}
                  <Td
                    p={'12px'}
                    textAlign='center'
                    style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}
                  >
                    {new Date(employee.dateOfCreation).toLocaleDateString()}
                  </Td>
                  <Td
                    p={'12px'}
                    textAlign='center'
                    justifyContent={'center'}
                    display={'flex'}
                    gap={'10px'}
                    style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}
                  >
                    <Button
                      colorScheme='green'
                      onClick={() => handleEditOpen(employee)}
                    >
                      Edit
                    </Button>
                    <Button colorScheme='orange'>Archive</Button>
                    <Button
                      colorScheme='red'
                      onClick={() => handleDeleteOpen(employee)}
                    >
                      Delete
                    </Button>
                  </Td>
                </Tr>
              )
            })}
          </Tbody>
        </Table>
      </TableContainer>

      {isLoading ? (
        <Spinner display={'flex'} m={'auto'} size={'xl'} mt={'25px'} />
      ) : !error && employees.length === 0 ? (
        <Text
        mt={'25px'}
          fontSize={'2xl'}
          fontWeight={'semibold'}
          color={'brand.100'}
          textAlign={'center'}
        >
          No Employees yet
        </Text>
      ) : (
        <Text
          fontSize={'2xl'}
          fontWeight={'semibold'}
          color={'tomato'}
          textAlign={'center'}
        >
          {error}
        </Text>
      )}
    </>
  )
}

export default AdminEmployeeAccounts
