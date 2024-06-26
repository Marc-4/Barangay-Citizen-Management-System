import {
  Box,
  Heading,
  Center,
  Flex,
  Divider,
  Spinner,
  Text,
} from '@chakra-ui/react'
import NotificationCard from '../../components/cards/NotificationCard'
import Searchbar from '../../components/Searchbar'
import { useEffect, useState } from 'react'
import callAPI from '../../utils/callAPI'

const AdminNotifications = () => {
  const [notifications, setNotifications] = useState([])
  const [error, setError] = useState(null)
  const [entries, setEntries] = useState(20)
  const [filter, setFilter] = useState('UNREAD')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    getNotification()
  }, [filter])

  const getNotification = async () => {
    setIsLoading(true)
    try {
      const method = 'GET'
      const route = `${import.meta.env.VITE_API_URL}/api/admin/notifications?entries=${entries}&filter=${filter}`
      const response = await callAPI(null, method, route)

      if (response.result === 'OK') {
        setError(null)
        setNotifications(response.payload)
        console.log(response.payload)
      } else setError(response.payload.error)
    } catch (err) {
      console.log(err)
      setError('Error fetching Notifications')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Box m={'auto'} display='flex' alignItems='center' w={'90%'}>
        <Flex flexDirection='row' alignItems='center' gap={'25px'}>
          <Heading mt='25px' mb='25px' display='flex' justifyContent='center'>
            Notifications
          </Heading>
        </Flex>
      </Box>
      <Divider margin={'auto'} borderColor={'brand.100'} w={'90%'} />
      <Center margin={'10px'} p={'25px'} flexDirection={'column'}>
        <Text
          fontSize={'2xl'}
          fontWeight={'semibold'}
          color={'tomato'}
          display={error ? 'block' : 'none'}
        >
          {error}
        </Text>
        {isLoading ? (
          <Spinner size='xl' m={'auto'} mt={'25px'} />
        ) : notifications.length === 0 && !error ? (
          <Text fontWeight={'semibold'} fontSize={'2xl'}>
            No Notifications
          </Text>
        ) : (
          notifications.map((notification) => (
            <NotificationCard
              data={notification}
              key={notification._id}
              account_type='admin'
            ></NotificationCard>
          ))
        )}
      </Center>
    </>
  )
}

export default AdminNotifications
