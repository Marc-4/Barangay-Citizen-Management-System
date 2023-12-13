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
import RegisterAccountModal from '../../components/modals/RegisterAccountModal'
import EditAccountModal from '../../components/modals/EditAccountModal'
import DeleteAccountAlert from '../../components/popups/DeleteAccountAlert'
import ArchiveAccountAlert from '../../components/popups/ArchiveAccountAlert'
import RestoreAccountAlert from '../../components/popups/RestoreAccountAlert'
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
  const [refreshCounter, setRefreshCounter] = useState(0)

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
  const {
    isOpen: isArchiveOpen,
    onOpen: onArchiveOpen,
    onClose: onArchiveClose,
  } = useDisclosure()
  const {
    isOpen: isRestoreOpen,
    onOpen: onRestoreOpen,
    onClose: onRestoreClose,
  } = useDisclosure()

  useEffect(() => {
    getEmployees()
    getArchivedEmployees()
  }, [refreshCounter])

  const getEmployees = async () => {
    setIsLoading(true)
    try {
      const body = null
      const method = 'GET'
      const route = `http://localhost:3000/api/admin/employees?entries=${entries}&filter=ACTIVE`

      const data = await callAPI(body, method, route)
      if (data.result === 'OK') {
        setError(null)
        setEmployees(data.payload)
      } else setError(data.payload.err)
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
      if (data.result === 'OK') {
        setError(null)
        setArchivedEmployees(data.payload)
      } else setError(data.payload.err)
    } catch (err) {
      console.log(err)
      setError('Connection Error')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSearch = async (query) => {
    setIsLoading(true)
    const body = null
    const method = 'GET'
    const route = `http://localhost:3000/api/admin/employees/search?query=${query}&filter=${filter}`

    try {
      const data = await callAPI(body, method, route)
      if (data.result === 'OK') {
        if (filter === 'ACTIVE') setEmployees(data.payload)
        else setArchivedEmployees(data.payload)
        setError(null)
      } else {
        setError(data.payload.error)
      }
    } catch (err) {
      console.error(err)
      setError('Connection Error')
    } finally {
      setIsLoading(false)
    }
  }

  const handeUpdate = () => {
    getEmployees()
    getArchivedEmployees()
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
  const handleArchiveOpen = (user) => {
    setSelectedUser(user)
    onArchiveOpen()
  }

  const handleArchiveClose = () => {
    setSelectedUser(null)
    onArchiveClose()
  }
  const handleRestoreOpen = (user) => {
    setSelectedUser(user)
    onRestoreOpen()
  }

  const handleRestoreClose = () => {
    setSelectedUser(null)
    onRestoreClose()
  }

  return (
    <>
      <RegisterAccountModal
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
      <ArchiveAccountAlert
        {...{
          isOpen: isArchiveOpen,
          onClose: handleArchiveClose,
          cancelRef: cancelRef,
          user: selectedUser,
          onUpdate: handeUpdate,
          role: 'employee',
        }}
      />
      <RestoreAccountAlert
        {...{
          isOpen: isRestoreOpen,
          onClose: handleRestoreClose,
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
          <Searchbar searchHandler={handleSearch} />
          <RefreshButton
            refreshCounter={refreshCounter}
            setRefreshCounter={setRefreshCounter}
          />
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
          <Tab onClick={()=> setFilter('ACTIVE')}>Employee List</Tab>
          <Tab onClick={()=> setFilter('ARCHIVED')}>Archived Employees</Tab>
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
                w={'100%'}
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
                          <Button
                            colorScheme='orange'
                            onClick={() => handleArchiveOpen(employee)}
                          >
                            Archive
                          </Button>
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
                w={'100%'}
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
                            onClick={() => handleRestoreOpen(employee)}
                          >
                            Restore
                          </Button>
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
          </TabPanel>
        </TabPanels>
      </Tabs>
      {isLoading ? (
        <Spinner display={'flex'} m={'auto'} size={'xl'} mt={'25px'} />
      ) : (
        ''
      )}
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
