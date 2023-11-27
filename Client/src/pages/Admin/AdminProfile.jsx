import { Heading, Button, Text } from '@chakra-ui/react'
import ProfileCard from '../../components/cards/ProfileCard'
import { useEffect, useState } from 'react'
import callAPI from '../../utils/callAPI'
const AdminProfile = () => {
  const [profileData, setProfileData] = useState()
  const [error, setError] = useState()

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

  return (
    <>
      <Heading mt={'25px'} textAlign={'center'}>
        Profile Page
      </Heading>
      <Text
        fontSize={'2xl'}
        display={error ? 'block' : 'none'}
        color={'tomato'}
        fontWeight={'semibold'}
        textAlign={'center'}
      >
        {error}
      </Text>
      {profileData &&<ProfileCard data={profileData} />}
    </>
  )
}

export default AdminProfile
