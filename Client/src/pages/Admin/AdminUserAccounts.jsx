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
import RegisterAccountModal from '../../components/modals/RegisterAccountModal'
import EditAccountModal from '../../components/modals/EditAccountModal'
import DeleteAccountAlert from '../../components/popups/DeleteAccountAlert'

const AdminUserAccounts = () => {
  const [users, setUsers] = useState([])
  const [error, setError] = useState()
  const [page, setPage] = useState(1)
  const [entries, setEntries] = useState(20)
  const [filter, setFilter] = useState('ACTIVE')
  const [selectedUser, setSelectedUser] = useState(null)
  const [isLoading, setIsLoading] = useState()
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
    getUsers()
  }, [filter])

  const getUsers = async () => {
    setIsLoading(true)
    const body = null
    const method = 'GET'
    const route = `http://localhost:3000/api/admin/users?entries=${entries}&filter=${filter}`

    let data
    try {
      data = await callAPI(body, method, route)
      if (data.result === 'OK') {
        setUsers(data.payload)
        setError(null)
      } else setError(data.payload.errro)
    } catch (err) {
      console.log(err)
      setError('Connection Error')
    } finally {
      setIsLoading(false)
    }
  }

  const handeUpdate = () => {
    getUsers()
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
      <Box m={'auto'} display='flex' alignItems='center' w={'90%'}>
        <Flex flexDirection='row' alignItems='center' gap={'25px'}>
          <Searchbar entries={entries} page={page} />
          <Heading mt='25px' mb='25px' display='flex' justifyContent='center'>
            User Accounts
          </Heading>
        </Flex>
      </Box>
      <Divider margin={'auto'} borderColor={'brand.100'} w={'90%'} />
      <Tabs margin={'auto'} w={'90%'} variant='line'>
        <TabList mb='1em'>
          <Tab onClick={() => setFilter('ACTIVE')}>User List</Tab>
          <Tab onClick={() => setFilter('ARCHIVED')}>Archived Users</Tab>
        </TabList>
      </Tabs>
      <Button colorScheme='blue' onClick={onRegisterOpen}>
        Register User
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
            {users.map((user) => {
              const profile = user.profile
              return (
                <Tr key={user._id}>
                  <Td
                    p={'12px'}
                    textAlign='center'
                    style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}
                  >
                    <Link as={rr_Link} color={'brand.500'} to={`${user._id}`}>
                      {user._id}
                    </Link>
                  </Td>
                  <Td
                    p={'12px'}
                    fontWeight={'semibold1'}
                    textAlign='center '
                    style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}
                  >
                    {user?.username || 'N/A'}
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
                  {/* <Td
                      textAlign='center'
                      style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}
                    >
                      {calculateAge(profile?.dateOfBirth) || 'N/A'}
                    </Td> */}
                  <Td
                    p={'12px'}
                    textAlign='center'
                    style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}
                  >
                    {new Date(user.dateOfCreation).toLocaleDateString()}
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
                      onClick={() => handleEditOpen(user)}
                      colorScheme='green'
                    >
                      Edit
                    </Button>
                    <Button colorScheme='orange'>Archive</Button>
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
      <Text
        fontSize={'2xl'}
        fontWeight={'semibold'}
        color={'tomato'}
        display={error ? 'block' : 'none'}
        textAlign={'center'}
      >
        {error}
      </Text>
      <Spinner
        display={isLoading ? 'block' : 'none'}
        m={'auto'}
        size={'xl'}
        mt={'25px'}
      />
    </>
  )
}

export default AdminUserAccounts
