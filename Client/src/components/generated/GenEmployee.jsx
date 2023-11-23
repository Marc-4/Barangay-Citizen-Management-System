import { useEffect, useState } from 'react'
import callAPI from '../../utils/callAPI'
import ProfileCard from '../cards/ProfileCard'
import { useParams } from 'react-router-dom'
import { Text } from '@chakra-ui/react'
const GenEmployee = () => {
  const { id } = useParams()
  const [profile, setProfile] = useState()
  const [error, setError] = useState(null)

  useEffect(() => {
    getAccount()
  }, [])

  const getAccount = async () => {
    try {
      const method = 'GET'
      const route = `http://localhost:3000/api/admin/employee/profile/${id}`
      const response = await callAPI(null, method, route)

    //   console.log(response);
      if (response.result === 'OK') {
        setError(null)
        setProfile(response.payload)
      }
      else setError(response.payload.error)
    } catch (err) {
      console.log(err)
      setError('Error fetching Profile Data')
    }
  }

  return (
    <>
      <Text
        fontSize={'2xl'}
        display={error ? 'block' : 'none'}
        color={'tomato'}
        fontWeight={'semibold'}
        textAlign={'center'}
      >
        {error}
      </Text>
      {profile && <ProfileCard profileData={profile} />}
    </>
  )
}

export default GenEmployee
