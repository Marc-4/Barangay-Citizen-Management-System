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
  Input,
  useDisclosure,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import RegisterUserModal from '../../components/modals/registerUserModal'
import callAPI from '../../utils/callAPI'

const AdminUserAccounts = () => {
  const [users, setUsers] = useState([])
  const [profiles, setProfiles] = useState([])
  const [error, setError] = useState()
  const [page, setPage] = useState(1)
  const [entries, setEntries] = useState(20)
  const [query, setQuery] = useState('')
  const { isOpen, onOpen, onClose } = useDisclosure()

  useEffect(() => {
    getUsers()
  }, [])

  useEffect(() => {
    const fetchUserProfiles = async () => {
      try {
        const profilesArray = await Promise.all(
          users.map(async (user) => {
            try {
              const profileData = await getUserProfile(user._id)
              console.log(profileData.payload)
              return profileData.payload
            } catch (err) {
              console.log(err)
              setError('Error fetching user profile')
              return null
            }
          })
        )
        setProfiles(profilesArray)
      } catch (error) {
        console.log(error)
        setError('Error fetching user profiles')
      }
    }

    if (users.length > 0) {
      fetchUserProfiles()
    }
  }, [users])

  const getUsers = async () => {
    const body = null
    const method = 'GET'
    const route = `http://localhost:3000/api/admin/users?entries=${entries}`

    let data
    try {
      data = await callAPI(body, method, route)
      setUsers(data.payload)
    } catch (err) {
      console.log(err)
      setError(data.payload.error)
    }
  }

  const getUserProfile = async (id) => {
    const body = null
    const method = 'GET'
    const route = `http://localhost:3000/api/admin/user/Profile/${id}`
    try {
      const data = await callAPI(body, method, route)
      return data
    } catch (err) {
      console.log(err)
      throw err
    }
  }

  const search = async () => {
    const body = null
    const method = 'GET'
    const route = `http://localhost:3000/api/admin/user/search?entries=${entries}`

    let data
    try {
      data = await callAPI(body, method, route)
      setUsers(data.payload)
    } catch (err) {
      console.log(err)
      setError(data.payload.error)
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
      <RegisterUserModal {...{ isOpen, onClose }} />
      <Heading
        display={'flex'}
        mt={'25px'}
        mb={'25px'}
        justifyContent={'center'}
      >
        User Accounts
      </Heading>
      <Divider margin={'auto'} borderColor={'brand.100'} w={'90%'} />

      <Button colorScheme='blue' onClick={onOpen}>
        Register User
      </Button>
      <Button colorScheme='blue'>Search</Button>
      <Input
        w={'150px'}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      ></Input>

      <TableContainer margin={'10px'}>
        <Table
          variant={'simple'}
          style={{ borderCollapse: 'separate' }}
          borderRadius={'10px'}
          borderColor={'brand.100'}
          borderWidth={'1px'}
        >
          <Thead>
            <Tr>
              <Th textAlign='center'>User ID</Th>
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
            {users.map((user) => {
              const profile = profiles.find((p) => p.accountID === user._id)

              return (
                <Tr key={user._id}>
                  <Td textAlign='center'>{user._id}</Td>
                  <Td textAlign='center'>{profile?.lastName || 'N/A'}</Td>
                  <Td textAlign='center'>{profile?.firstName || 'N/A'}</Td>
                  <Td textAlign='center'>{profile?.middleName || 'N/A'}</Td>
                  <Td textAlign='center'>{profile?.sex || 'N/A'}</Td>
                  <Td textAlign='center'>
                    {calculateAge(profile?.dateOfBirth) || 'N/A'}
                  </Td>
                  <Td textAlign='center'>
                    {new Date(user.dateOfCreation).toLocaleDateString()}
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

export default AdminUserAccounts
