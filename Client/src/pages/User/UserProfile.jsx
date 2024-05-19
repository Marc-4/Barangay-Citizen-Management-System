import {
  Heading,
  Button,
  Text,
  useDisclosure,
  Spinner,
  Box,
} from '@chakra-ui/react'
import ProfileCard from '../../components/cards/ProfileCard'
import { useEffect, useState } from 'react'
import callAPI from '../../utils/callAPI'
import EditAccountModal from '../../components/modals/EditAccountModal'
import EditCredentialsModal from '../../components/modals/EditCredentialsModal'

const UserProfile = () => {
  const [account, setAccount] = useState()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState()
  const [selectedUser, setSelectedUser] = useState(null)

  const {
    isOpen: isProfileOpen,
    onOpen: onProfileOpen,
    onClose: onProfileClose,
  } = useDisclosure()

  const {
    isOpen: isCredentialsOpen,
    onOpen: onCredentialsOpen,
    onClose: onCredentialsClose,
  } = useDisclosure()

  useEffect(() => {
    getProfile()
  }, [])

  const getProfile = async () => {
    setLoading(true)
    const body = null
    const method = 'GET'
    const route = `${import.meta.env.VITE_API_URL}/api/user/account/`

    let data
    try {
      data = await callAPI(body, method, route)
      console.log(data.payload)
      if (data.result === 'OK') {
        setError(null)
        setAccount(data.payload)
      }
    } catch (err) {
      console.error(err)
      setError('An error occurred while fetching profile data')
    } finally {
      setLoading(false)
    }
  }

  const handeUpdate = () => {
    getProfile()
  }

  return (
    <>
      <EditAccountModal
        {...{
          isOpen: isProfileOpen,
          onClose: onProfileClose,
          user: account,
          role: 'user',
          editingSelf: true
        }}
      />
      <EditCredentialsModal
        {...{
          isOpen: isCredentialsOpen,
          onClose: onCredentialsClose,
          user: account,
          onUpdate: handeUpdate,
          role: 'user',
        }}
      />
      {loading && (
        <Spinner size='xl' marginY={3} mx={'auto'} display={'block'} />
      )}
      {!loading && error && (
        <Text
          fontSize={'2xl'}
          color={'tomato'}
          fontWeight={'semibold'}
          textAlign={'center'}
        >
          {error}
        </Text>
      )}
      {!loading && !error && !account && (
        <Text
          fontSize={'2xl'}
          color={'gray.600'}
          fontWeight={'semibold'}
          textAlign={'center'}
        >
          No profile found.
        </Text>
      )}
      {!loading && !error && account && (
        <>
          <Box mt={'25px'} ml={'25px'}>
            <Button onClick={() => onProfileOpen()} colorScheme='facebook'>
              Update Profile
            </Button>
            <Button
              onClick={() => onCredentialsOpen()}
              colorScheme='facebook'
              marginLeft={4}
            >
              Update Credentials
            </Button>
          </Box>
          <ProfileCard data={account} />
        </>
      )}
    </>
  )
}

export default UserProfile
