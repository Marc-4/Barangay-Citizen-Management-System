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
import Pagination from '../../components/pagination'
import CustomTable from '../../components/CustomTable'

const AdminEmployeeAccounts = () => {
  const [employees, setEmployees] = useState([])
  const [archivedEmployees, setArchivedEmployees] = useState([])
  const [error, setError] = useState()
  const [page, setPage] = useState(1)
  const [archivedPage, setArchivedPage] = useState(1)
  const [entries, setEntries] = useState(10)
  const [filter, setFilter] = useState('ACTIVE')
  const [selectedUser, setSelectedUser] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const cancelRef = useRef()
  const [refreshCounter, setRefreshCounter] = useState(0)
  const [activeEmployeeCount, setActiveEmployeeCount] = useState()
  const [archivedEmployeeCount, setArchivedEmployeeCount] = useState()

  const {
    isOpen: isRegisterOpen,
    onOpen: onRegisterOpen,
    onClose: onRegisterClose,
  } = useDisclosure()
  const { isOpen: isEditOpen, onOpen: onEditOpen, onClose: onEditClose } = useDisclosure()
  const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure()
  const { isOpen: isArchiveOpen, onOpen: onArchiveOpen, onClose: onArchiveClose } = useDisclosure()
  const { isOpen: isRestoreOpen, onOpen: onRestoreOpen, onClose: onRestoreClose } = useDisclosure()

  useEffect(() => {
    getEmployees()
  }, [page])

  useEffect(() => {
    getArchivedEmployees()
  }, [archivedPage])

  useEffect(() => {
    getEmployeesCount()
  }, [])

  useEffect(() => {
    getEmployees()
    getArchivedEmployees()
  }, [refreshCounter])

  const getEmployeesCount = async () => {
    const body = null
    const method = 'GET'
    const route = `http://localhost:3000/api/admin/employees?entries=0&filter=ACTIVE`
    const route2 = `http://localhost:3000/api/admin/employees?entries=ARCHIVED_COUNT&filter=ARCHIVED`

    let activeCount, archivedCount
    try {
      activeCount = await callAPI(body, method, route)
      archivedCount = await callAPI(body, method, route2)

      if (activeCount.result === 'OK') {
        setActiveEmployeeCount(activeCount.payload)
        setError(null)
      } else setError(data.payload.err)

      if (archivedCount.result === 'OK') {
        setArchivedEmployeeCount(archivedCount.payload)
        setError(null)
      } else setError(data.payload.err)
    } catch (err) {
      console.log(err)
      setError('Connection Error')
    }
  }

  const getEmployees = async () => {
    setIsLoading(true)
    try {
      const body = null
      const method = 'GET'
      const route = `http://localhost:3000/api/admin/employees?page=${page}&entries=${entries}&filter=ACTIVE`

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
      const route = `http://localhost:3000/api/admin/employees?page=${archivedPage}&entries=${entries}&filter=ARCHIVED`

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

  const handleSearch = async (query, values, sex) => {
    setIsLoading(true)
    const body = null
    const method = 'GET'
    const route = `http://localhost:3000/api/admin/employees/search?query=${query}&params=${values}&sex=${sex}&filter=${filter}`

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
    getEmployeesCount()
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
        <Flex flexDirection='row' gap={'10px'} mt={'15px'} mb={'15px'}>
          <Searchbar searchHandler={handleSearch} />
          <RefreshButton refreshCounter={refreshCounter} setRefreshCounter={setRefreshCounter} />
          <Button mt={'5px'} colorScheme='facebook' onClick={onRegisterOpen}>
            Register Employee
          </Button>
        </Flex>
      </Box>
      <Divider margin={'auto'} borderColor={'brand.100'} w={'90%'} />
      <Tabs margin={'auto'} w={'90%'} variant='line'>
        <TabList>
          <Tab onClick={() => setFilter('ACTIVE')}>Employee List</Tab>
          <Tab onClick={() => setFilter('ARCHIVED')}>Archived Employees</Tab>
        </TabList>
        {error ? (
          <Text fontSize={'2xl'} fontWeight={'semibold'} color={'tomato'} textAlign={'center'}>
            {error}
          </Text>
        ) : (
          ''
        )}
        {isLoading ? <Spinner display={'flex'} m={'auto'} size={'xl'} mt={'25px'} /> : ''}
        <TabPanels>
          <TabPanel>
            {/* {isLoading !== true && employees.length === 0 ? (
              <Text fontWeight={'semibold'} fontSize={'2xl'} textAlign={'center'}>
                No Employees
              </Text>
            ) : ( */}
            <>
              <CustomTable
                users={employees}
                handleArchiveOpen={handleArchiveOpen}
                handleDeleteOpen={handleDeleteOpen}
                handleEditOpen={handleEditOpen}
                hasEditButton={true}
                hasArchiveButton={true}
              />
              <Pagination
              numOfPages={Math.round(Math.max(activeEmployeeCount / entries, 1))}
                setPage={setPage}
                page={page}
                setEntries={setEntries}
              />
            </>
          </TabPanel>
          <TabPanel>
            <>
              <CustomTable
                users={archivedEmployees}
                handleDeleteOpen={handleDeleteOpen}
                handleRestoreOpen={handleRestoreOpen}
                hasDeleteButton
                hasRestoreButton
              />
              <Pagination
              numOfPages={Math.round(Math.max(archivedEmployeeCount / entries, 1))}
                page={archivedPage}
                setPage={setArchivedPage}
                setEntries={setEntries}
              />
            </>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  )
}

export default AdminEmployeeAccounts
