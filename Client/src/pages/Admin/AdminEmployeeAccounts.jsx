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
  TabPanels,
  TabPanel,
} from '@chakra-ui/react'
import { useEffect, useState, useRef } from 'react'
import callAPI from '../../utils/callAPI'
import Searchbar from '../../components/Searchbar'
import { Link as rr_Link } from 'react-router-dom'
import RegisterUserModal from '../../components/modals/RegisterAccountModal'
import EditAccountModal from '../../components/modals/EditAccountModal'
import DeleteAccountAlert from '../../components/popups/DeleteAccountAlert'
import RefreshButton from '../../components/RefreshButton'

const AdminEmployeeAccounts = () => {
  const [employees, setEmployees] = useState([])
  const [archivedEmployees, setArchivedEmployees] = useState([])
  const [error, setError] = useState()
  const [entries, setEntries] = useState(20)
  const [filter, setFilter] = useState('ACTIVE')
  const [selectedUser, setSelectedUser] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const cancelRef = useRef()
  const [showText, setShowText] = useState(false)
  const [showArchivedText, setShowArchivedText] = useState(false)

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
    getArchivedEmployees()
  }, [])

  useEffect(() => {
    if (employees.length === 0) {
      const employeeTimer = setTimeout(() => {
        setShowText(true)
      }, 1000)

      return () => clearTimeout(employeeTimer)
    }
    if (archivedEmployees.length === 0) {
      const archivedEmployeeTimer = setTimeout(() => {
        setShowArchivedText(true)
      }, 1000)

      return () => clearTimeout(archivedEmployeeTimer)
    }
  }, [employees, archivedEmployees])

  const getEmployees = async () => {
    setIsLoading(true)
    try {
      const body = null
      const method = 'GET'
      const route = `http://localhost:3000/api/admin/employees?entries=${entries}&filter=ACTIVE`

      const data = await callAPI(body, method, route)
      if (data.ok) setEmployees(data.payload)
      else setError(data.payload.err)
    } catch (err) {
      console.log(err)
      setError('Connection Error')
    } finally {
      setIsLoading(false)
    }
  }

  const getArchivedEmployees = async () => {
    setIsLoading(true)
    try {
      const body = null
      const method = 'GET'
      const route = `http://localhost:3000/api/admin/employees?entries=${entries}&filter=ARCHIVED`

      const data = await callAPI(body, method, route)
      if (data.ok) setArchivedEmployees(data.payload)
      else setError(data.payload.err)
    } catch (err) {
      console.log(err)
      setError('Connection Error')
    } finally {
      setIsLoading(false)
    }
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
        <Flex
          flexDirection='row'
          alignItems='center'
          gap={'10px'}
          mt={'25px'}
          mb={'25px'}
        >
          <Searchbar />
          <RefreshButton />
          <Button
            mt={'10px'}
            ml={'10px'}
            colorScheme='blue'
            onClick={onRegisterOpen}
          >
            Register Employee
          </Button>
        </Flex>
      </Box>
      <Divider margin={'auto'} borderColor={'brand.100'} w={'90%'} />
      <Tabs margin={'auto'} w={'90%'} variant='line'>
        <TabList>
          <Tab>Employee List</Tab>
          <Tab>Archived Employees</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
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
                          style={{
                            whiteSpace: 'normal',
                            wordWrap: 'break-word',
                          }}
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
                          style={{
                            whiteSpace: 'normal',
                            wordWrap: 'break-word',
                          }}
                        >
                          {employee.username || 'N/A'}
                        </Td>
                        <Td
                          p={'12px'}
                          textAlign='center'
                          style={{
                            whiteSpace: 'normal',
                            wordWrap: 'break-word',
                          }}
                        >
                          {profile?.lastName || 'N/A'}
                        </Td>
                        <Td
                          p={'12px'}
                          textAlign='center'
                          style={{
                            whiteSpace: 'normal',
                            wordWrap: 'break-word',
                          }}
                        >
                          {profile?.firstName || 'N/A'}
                        </Td>
                        <Td
                          p={'12px'}
                          textAlign='center'
                          style={{
                            whiteSpace: 'normal',
                            wordWrap: 'break-word',
                          }}
                        >
                          {profile?.middleName || 'N/A'}
                        </Td>
                        <Td
                          p={'12px'}
                          textAlign='center'
                          style={{
                            whiteSpace: 'normal',
                            wordWrap: 'break-word',
                          }}
                        >
                          {profile?.sex || 'N/A'}
                        </Td>
                        <Td
                          p={'12px'}
                          textAlign='center'
                          style={{
                            whiteSpace: 'normal',
                            wordWrap: 'break-word',
                          }}
                        >
                          {new Date(
                            employee.dateOfCreation
                          ).toLocaleDateString()}
                        </Td>
                        <Td
                          p={'12px'}
                          textAlign='center'
                          justifyContent={'center'}
                          display={'flex'}
                          gap={'10px'}
                          style={{
                            whiteSpace: 'normal',
                            wordWrap: 'break-word',
                          }}
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
            ) : showText ? (
              <Text
                fontWeight={'semibold'}
                fontSize={'3xl'}
                textAlign={'center'}
              >
                No Employees yet
              </Text>
            ) : (
              ''
            )}
          </TabPanel>
          <TabPanel>
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
                    <Th p={'12px'} textAlign='center'>
                      Date of Registration
                    </Th>
                    <Th p={'12px'} textAlign='center' w={'15%'}>
                      Actions
                    </Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {archivedEmployees.map((employee) => {
                    const profile = employee.profile

                    return (
                      <Tr key={employee._id}>
                        <Td
                          p={'12px'}
                          textAlign='center'
                          style={{
                            whiteSpace: 'normal',
                            wordWrap: 'break-word',
                          }}
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
                          style={{
                            whiteSpace: 'normal',
                            wordWrap: 'break-word',
                          }}
                        >
                          {employee.username || 'N/A'}
                        </Td>
                        <Td
                          p={'12px'}
                          textAlign='center'
                          style={{
                            whiteSpace: 'normal',
                            wordWrap: 'break-word',
                          }}
                        >
                          {profile?.lastName || 'N/A'}
                        </Td>
                        <Td
                          p={'12px'}
                          textAlign='center'
                          style={{
                            whiteSpace: 'normal',
                            wordWrap: 'break-word',
                          }}
                        >
                          {profile?.firstName || 'N/A'}
                        </Td>
                        <Td
                          p={'12px'}
                          textAlign='center'
                          style={{
                            whiteSpace: 'normal',
                            wordWrap: 'break-word',
                          }}
                        >
                          {profile?.middleName || 'N/A'}
                        </Td>
                        <Td
                          p={'12px'}
                          textAlign='center'
                          style={{
                            whiteSpace: 'normal',
                            wordWrap: 'break-word',
                          }}
                        >
                          {profile?.sex || 'N/A'}
                        </Td>
                        <Td
                          p={'12px'}
                          textAlign='center'
                          style={{
                            whiteSpace: 'normal',
                            wordWrap: 'break-word',
                          }}
                        >
                          {new Date(
                            employee.dateOfCreation
                          ).toLocaleDateString()}
                        </Td>
                        <Td
                          p={'12px'}
                          textAlign='center'
                          justifyContent={'center'}
                          display={'flex'}
                          gap={'10px'}
                          style={{
                            whiteSpace: 'normal',
                            wordWrap: 'break-word',
                          }}
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
            ) : showArchivedText ? (
              <Text
                fontWeight={'semibold'}
                fontSize={'3xl'}
                textAlign={'center'}
              >
                no Archived Employees yet
              </Text>
            ) : (
              ''
            )}
          </TabPanel>
        </TabPanels>
      </Tabs>

      {error ? (
        <Text
          fontSize={'2xl'}
          fontWeight={'semibold'}
          color={'tomato'}
          textAlign={'center'}
        >
          {error}
        </Text>
      ) : (
        ''
      )}
    </>
  )
}

export default AdminEmployeeAccounts
