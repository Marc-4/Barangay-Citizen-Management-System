import {
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
import { useEffect, useState, useRef, Suspense, lazy, startTransition } from 'react'
import callAPI from '../../utils/callAPI'
import Searchbar from '../../components/Searchbar'
import { Link as rr_Link } from 'react-router-dom'
import RegisterAccountModal from '../../components/modals/RegisterAccountModal'
import EditAccountModal from '../../components/modals/EditAccountModal'
import ExportModal from '../../components/modals/ExportModal'
import DeleteAccountAlert from '../../components/popups/DeleteAccountAlert'
import ArchiveAccountAlert from '../../components/popups/ArchiveAccountAlert'
import RestoreAccountAlert from '../../components/popups/RestoreAccountAlert'
import RefreshButton from '../../components/RefreshButton'
import Pagination from '../../components/pagination'
import CustomTable from '../../components/CustomTable'

const AdminUserAccounts = () => {
  const [users, setUsers] = useState([])
  const [archivedUsers, setArchivedUsers] = useState([])
  const [error, setError] = useState()
  const [page, setPage] = useState(1)
  const [archivedPage, setArchivedPage] = useState(1)
  const [entries, setEntries] = useState(20)
  const [filter, setFilter] = useState('ACTIVE')
  const [selectedUser, setSelectedUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const cancelRef = useRef()
  const [refreshCounter, setRefreshCounter] = useState(0)
  const [activeUserCount, setActiveUserCount] = useState()
  const [archivedUserCount, setArchivedUserCount] = useState()

  const {
    isOpen: isRegisterOpen,
    onOpen: onRegisterOpen,
    onClose: onRegisterClose,
  } = useDisclosure()
  const { isOpen: isEditOpen, onOpen: onEditOpen, onClose: onEditClose } = useDisclosure()
  const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure()
  const { isOpen: isExportOpen, onOpen: onExportOpen, onClose: onExportClose } = useDisclosure()
  const { isOpen: isArchiveOpen, onOpen: onArchiveOpen, onClose: onArchiveClose } = useDisclosure()
  const { isOpen: isRestoreOpen, onOpen: onRestoreOpen, onClose: onRestoreClose } = useDisclosure()

  useEffect(() => {
    getUsers()
    getUsersCount()
    console.log('active user count: ' + activeUserCount)
    console.log(users)
  }, [page, entries])

  useEffect(() => {
    getArchivedUsers()
  }, [archivedPage])

  useEffect(() => {
    getUsers()
    getArchivedUsers()
    console.log(users)
  }, [refreshCounter])

  //calculate count on client side function instead, this is stupid
  //nvm im stupid
  const getUsersCount = async () => {
    const body = null
    const method = 'GET'
    const route = `${import.meta.env.VITE_API_URL}/api/admin/users?entries=${0}&filter=ACTIVE`
    const route2 = `${import.meta.env.VITE_API_URL}/api/admin/users?entries=ARCHIVED_COUNT&filter=ARCHIVED`

    let activeCount, archivedCount
    try {
      activeCount = await callAPI(body, method, route)
      archivedCount = await callAPI(body, method, route2)

      if (activeCount.result === 'OK') {
        setActiveUserCount(activeCount.payload)
        setError(null)
      } else setError(data.payload.err)

      if (archivedCount.result === 'OK') {
        setArchivedUserCount(archivedCount.payload)
        setError(null)
      } else setError(data.payload.err)
    } catch (err) {
      console.log(err)
      setError('Connection Error')
    }
  }

  const getUsers = async () => {
    setIsLoading(true)
    const body = null
    const method = 'GET'
    const route = `${import.meta.env.VITE_API_URL}/api/admin/users?page=${page}&entries=${entries}&filter=ACTIVE`

    let data
    try {
      data = await callAPI(body, method, route)
      if (data.result === 'OK') {
        const payload = data.payload
        setUsers(payload)
        setError(null)
      } else setError(data.payload.err)
    } catch (err) {
      console.log(err)
      setError('Connection Error')
    } finally {
      setIsLoading(false)
    }
  }

  const getArchivedUsers = async () => {
    setIsLoading(true)
    const body = null
    const method = 'GET'
    const route = `${import.meta.env.VITE_API_URL}/api/admin/users?page=${archivedPage}&entries=${entries}&filter=ARCHIVED`

    let data
    try {
      data = await callAPI(body, method, route)

      if (data.result === 'OK') {
        setArchivedUsers(data.payload)
        setError(null)
      } else setError(data.payload.error)
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
    const route = `${import.meta.env.VITE_API_URL}/api/admin/users/search?query=${query}&params=${values}&sex=${sex}&filter=${filter}`
    try {
      const data = await callAPI(body, method, route)
      if (data.result === 'OK') {
        if (filter === 'ACTIVE') setUsers(data.payload)
        else setArchivedUsers(data.payload)
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

  const sortColumnAscending = (column, users) => {
    console.log('sorting asc...')
    users.sort((a, b) => {
      if (column === 'subdivisionPurok') {
        return a.profile.address[column].localeCompare(b.profile.address[column], undefined, {
          sensitivity: 'base',
        })
      } else if (column !== '_id' && column !== 'username' && column !== 'dateOfCreation') {
        // Use case-insensitive comparison
        return a.profile[column].localeCompare(b.profile[column], undefined, {
          sensitivity: 'base',
        })
      } else {
        // Compare directly if column is id or username
        return a[column].localeCompare(b[column], undefined, { sensitivity: 'base' })
      }
    })
  }

  const sortColumnDescending = (column, users) => {
    console.log('sorting desc...')
    users.sort((a, b) => {
      if (column === 'subdivisionPurok') {
        return b.profile.address[column].localeCompare(a.profile.address[column], undefined, {
          sensitivity: 'base',
        })
      } else if (column !== '_id' && column !== 'username' && column !== 'dateOfCreation') {
        // Use case-insensitive comparison
        return b.profile[column].localeCompare(a.profile[column], undefined, {
          sensitivity: 'base',
        })
      } else {
        // Compare directly if column is id or username
        return b[column].localeCompare(a[column], undefined, { sensitivity: 'base' })
      }
    })
  }

  const handeUpdate = () => {
    getUsers()
    getUsersCount()
    getArchivedUsers()
  }

  const handleEditOpen = (user) => {
    setSelectedUser(user)
    onEditOpen()
  }

  const handleEditClose = () => {
    setSelectedUser(null)
    onEditClose()
  }
  const handleDeleteOpen = (user) => {
    setSelectedUser(user)
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
          role: 'user',
        }}
      />
      <EditAccountModal
        {...{
          isOpen: isEditOpen,
          onClose: handleEditClose,
          user: selectedUser,
          onUpdate: handeUpdate,
          role: 'user',
        }}
      />
      <ExportModal
        {...{
          isOpen: isExportOpen,
          onClose: onExportClose,
          cancelRef: cancelRef,
        }}
      />
      <DeleteAccountAlert
        {...{
          isOpen: isDeleteOpen,
          onClose: handleDeleteClose,
          cancelRef: cancelRef,
          user: selectedUser,
          onUpdate: handeUpdate,
          role: 'user',
        }}
      />
      <ArchiveAccountAlert
        {...{
          isOpen: isArchiveOpen,
          onClose: handleArchiveClose,
          cancelRef: cancelRef,
          user: selectedUser,
          onUpdate: handeUpdate,
          role: 'user',
        }}
      />
      <RestoreAccountAlert
        {...{
          isOpen: isRestoreOpen,
          onClose: handleRestoreClose,
          cancelRef: cancelRef,
          user: selectedUser,
          onUpdate: handeUpdate,
          role: 'user',
        }}
      />
      <Box m={'auto'} display='flex' alignItems='center' w={'90%'}>
        <Flex flexDirection='row' gap={'10px'} mt={'15px'} mb={'15px'}>
          <Searchbar entries={entries} page={page} searchHandler={handleSearch} />
          <RefreshButton refreshCounter={refreshCounter} setRefreshCounter={setRefreshCounter} />
          <Button mt={'5px'} colorScheme='facebook' onClick={onRegisterOpen}>
            Register User
          </Button>
          <Button mt={'5px'} colorScheme='facebook' color={'white'} onClick={onExportOpen}>
            Export to PDF
          </Button>
        </Flex>
      </Box>
      <Divider margin={'auto'} borderColor={'brand.100'} w={'90%'} />
      <Tabs margin={'auto'} w={'90%'} variant='line'>
        <TabList>
          <Tab
            onClick={() => {
              setFilter('ACTIVE')
            }}
          >
            User List
          </Tab>
          <Tab
            onClick={() => {
              setFilter('ARCHIVED')
            }}
          >
            Archived Users
          </Tab>
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
            <Box display={'flex'} justifyContent={'right'} mr={'0.5rem'}>
              <Pagination
                numOfPages={Math.round(Math.max(activeUserCount / entries, 1))}
                page={page}
                setPage={setPage}
                entries={entries}
                setEntries={setEntries}
              />
            </Box>
            <CustomTable
              users={users}
              handleArchiveOpen={handleArchiveOpen}
              handleDeleteOpen={handleDeleteOpen}
              handleEditOpen={handleEditOpen}
              hasEditButton={true}
              hasArchiveButton={true}
              sortColumnDesc={sortColumnDescending}
              sortColumnAsc={sortColumnAscending}
            />
          </TabPanel>
          <TabPanel>
            <Box display={'flex'} justifyContent={'right'} mr={'0.5rem'}>
              <Pagination
                numOfPages={Math.round(Math.max(archivedUserCount / entries, 1))}
                page={archivedPage}
                setPage={setArchivedPage}
                entries={entries}
                setEntries={setEntries}
              />
            </Box>
            <CustomTable
              users={archivedUsers}
              handleDeleteOpen={handleDeleteOpen}
              handleRestoreOpen={handleRestoreOpen}
              hasRestoreButton={true}
              hasDeleteButton={true}
              sortColumnDesc={sortColumnDescending}
              sortColumnAsc={sortColumnAscending}
            />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  )
}

export default AdminUserAccounts
