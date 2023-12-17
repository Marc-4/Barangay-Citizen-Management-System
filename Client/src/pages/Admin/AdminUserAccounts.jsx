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
import { useEffect, useState, useRef } from 'react'
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

const AdminUserAccounts = () => {
  const [users, setUsers] = useState([])
  const [archivedUsers, setArchivedUsers] = useState([])
  const [error, setError] = useState()
  const [page, setPage] = useState(1)
  const [entries, setEntries] = useState(20)
  const [filter, setFilter] = useState('ACTIVE')
  const [selectedUser, setSelectedUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const cancelRef = useRef()
  const [refreshCounter, setRefreshCounter] = useState(0)
  const [sortedUsers, setSortedUsers] = useState([])
  const [sortedArchivedUsers, setSortedArchivedUsers] = useState([])

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
    isOpen: isExportOpen,
    onOpen: onExportOpen,
    onClose: onExportClose,
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
    getUsers()
    getArchivedUsers()
  }, [refreshCounter])

  useEffect(() => {
    setSortedUsers(
      [...users].sort(
        (a, b) => new Date(b.dateOfCreation) - new Date(a.dateOfCreation)
      )
    )
    setSortedArchivedUsers(
      [...archivedUsers].sort(
        (a, b) => new Date(b.dateOfCreation) - new Date(a.dateOfCreation)
      )
    )
  }, [users, archivedUsers])

  const getUsers = async () => {
    setIsLoading(true)
    const body = null
    const method = 'GET'
    const route = `http://localhost:3000/api/admin/users?entries=${entries}&filter=ACTIVE`

    let data
    try {
      data = await callAPI(body, method, route)
      if (data.result === 'OK') {
        setUsers(data.payload)
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
    const route = `http://localhost:3000/api/admin/users?entries=${entries}&filter=ARCHIVED`

    let data
    try {
      data = await callAPI(body, method, route)

      if (data.result === 'OK') {
        console.log(data.payload)
        setArchivedUsers(data.payload)
        setError(null)
      } else setError(data.payload.errro)
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
    const route = `http://localhost:3000/api/admin/users/search?query=${query}&filter=${filter}`

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

  const handeUpdate = () => {
    getUsers()
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
          users: users,
          onUpdate: handeUpdate,
          role: 'user',
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
          <Searchbar
            entries={entries}
            page={page}
            searchHandler={handleSearch}
          />
          <RefreshButton
            refreshCounter={refreshCounter}
            setRefreshCounter={setRefreshCounter}
          />
          <Button
            mt={'10px'}
            ml={'10px'}
            colorScheme='facebook'
            onClick={onRegisterOpen}
          >
            Register User
          </Button>
          <Button
            mt={'10px'}
            ml={'10px'}
            colorScheme='facebook'
            color={'white'}
            onClick={onExportOpen}
          >
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
        {isLoading ? (
          <Spinner display={'flex'} m={'auto'} size={'xl'} mt={'25px'} />
        ) : (
          ''
        )}
        <TabPanels>
          <TabPanel>
            {isLoading !== true && users.length === 0 ? (
              <Text
                fontWeight={'semibold'}
                fontSize={'2xl'}
                textAlign={'center'}
              >
                No Users
              </Text>
            ) : (
              <TableContainer
                display={'flex'}
                margin={'10px'}
                alignContent={'center'}
                justifyContent={'center'}
                rounded='md'
              >
                <Table
                  m={'auto'}
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
                    {sortedUsers.map((user) => {
                      const profile = user.profile
                      return (
                        <Tr key={user._id} fontSize={'md'}>
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
                              color={'primary.500'}
                              to={`${user._id}`}
                            >
                              {user._id}
                            </Link>
                          </Td>
                          <Td
                            p={'12px'}
                            textAlign='center '
                            style={{
                              whiteSpace: 'normal',
                              wordWrap: 'break-word',
                            }}
                          >
                            {user?.username || 'N/A'}
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
                            {new Date(user.dateOfCreation).toLocaleDateString()}
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
                              onClick={() => handleEditOpen(user)}
                              colorScheme='green'
                            >
                              Edit
                            </Button>
                            <Button
                              onClick={() => handleArchiveOpen(user)}
                              colorScheme='orange'
                            >
                              Archive
                            </Button>
                            <Button
                              onClick={() => handleDeleteOpen(user)}
                              colorScheme='red'
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
            )}
          </TabPanel>
          <TabPanel>
            {!isLoading && archivedUsers.length === 0 ? (
              <Text
                fontWeight={'semibold'}
                fontSize={'2xl'}
                textAlign={'center'}
              >
                No Archived Users
              </Text>
            ) : (
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
                    {sortedArchivedUsers.map((user) => {
                      const profile = user.profile
                      return (
                        <Tr key={user._id}>
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
                              color={'primary.500'}
                              to={`${user._id}`}
                            >
                              {user._id}
                            </Link>
                          </Td>
                          <Td
                            p={'12px'}
                            fontWeight={'semibold1'}
                            textAlign='center '
                            style={{
                              whiteSpace: 'normal',
                              wordWrap: 'break-word',
                            }}
                          >
                            {user?.username || 'N/A'}
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
                            {new Date(user.dateOfCreation).toLocaleDateString()}
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
                              onClick={() => handleRestoreOpen(user)}
                              colorScheme='green'
                            >
                              Restore
                            </Button>
                            <Button
                              onClick={() => handleDeleteOpen(user)}
                              colorScheme='red'
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
            )}
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  )
}

export default AdminUserAccounts
