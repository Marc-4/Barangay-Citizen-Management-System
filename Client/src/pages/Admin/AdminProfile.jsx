import { Heading, Button, Text, useDisclosure, Box } from '@chakra-ui/react'
import ProfileCard from '../../components/cards/ProfileCard'
import { useEffect, useState } from 'react'
import callAPI from '../../utils/callAPI'
import EditAccountModal from '../../components/modals/EditAccountModal'
import EditCredentialsModal from '../../components/modals/EditCredentialsModal'

const AdminProfile = () => {
  const [profileData, setProfileData] = useState()
  const [error, setError] = useState()

  const { isOpen: isProfileOpen, onOpen: onProfileOpen, onClose: onProfileClose } = useDisclosure()

  const {
    isOpen: isCredentialsOpen,
    onOpen: onCredentialsOpen,
    onClose: onCredentialsClose,
  } = useDisclosure()

  useEffect(() => {
    getProfile()
  }, [])

  const getProfile = async () => {
    const body = null
    const method = 'GET'
    const route = `http://localhost:3000/api/admin/account/`

    let data
    try {
      data = await callAPI(body, method, route)
      if (data.result === 'OK') {
        setError(null)
        setProfileData(data.payload)
      }
    } catch (err) {
      console.error(err)
      setError('An error occurred while fetching profile data')
    }

    console.log(profileData)
  }

  useEffect(() => {
    console.log(profileData)
  })

  const handeUpdate = () => {
    getProfile()
  }

  return (
    <>
      <EditAccountModal
        {...{
          isOpen: isProfileOpen,
          onClose: onProfileClose,
          onUpdate: handeUpdate,
          user: profileData,
          role: 'admin',
          editingSelf: true,
        }}
      />
      <EditCredentialsModal
        {...{
          isOpen: isCredentialsOpen,
          onClose: onCredentialsClose,
          user: profileData,
          onUpdate: handeUpdate,
          role: 'admin',
        }}
      />
      <Text
        fontSize={'2xl'}
        display={error ? 'block' : 'none'}
        color={'tomato'}
        fontWeight={'semibold'}
        textAlign={'center'}
      >
        {error}
      </Text>
      <Box m={'auto'} display={'flex'} width={'950px'} gap={'10px'} p={'10px'} mt={'25px'} pb={0} >
        <Button onClick={() => onProfileOpen()} colorScheme='facebook'>
          Edit Profile
        </Button>
        <Button onClick={() => onCredentialsOpen()} colorScheme='facebook'>
          Edit Credentials
        </Button>
      </Box>
      {profileData && <ProfileCard data={profileData} onProfileOpen={onProfileOpen} />}
    </>
  )
}

export default AdminProfile
