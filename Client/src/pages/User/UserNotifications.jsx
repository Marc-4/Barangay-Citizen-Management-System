import {
  Box,
  Heading,
  Center,
  Flex,
  Divider,
  Tabs,
  Tab,
  TabList,
  Text,
  Spinner,
} from '@chakra-ui/react'
import NotificationCard from '../../components/cards/NotificationCard'
import Searchbar from '../../components/Searchbar'
import { useEffect, useState } from 'react'
import callAPI from '../../utils/callAPI'

const UserNotifications = () => {
  const [notifications, setNotifications] = useState([])
  const [error, setError] = useState(null)
  const [entries, setEntries] = useState(20)
  const [filter, setFilter] = useState('UNREAD')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    getNotification()
  }, [filter])

  const getNotification = async () => {
    setLoading(true)
    try {
      const method = 'GET'
      const route = `http://localhost:3000/api/user/notifications?entries=${entries}&filter=${filter}`
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
      setLoading(false)
    }
  }

  return (
    <>
      <Box m={'auto'} display='flex' alignItems='center' w={'90%'}>
        <Flex flexDirection='row' alignItems='center' gap={'25px'}>
          <Searchbar />
          <Heading mt='25px' mb='25px' display='flex' justifyContent='center'>
            Notifications
          </Heading>
        </Flex>
      </Box>
      <Divider margin={'auto'} borderColor={'brand.100'} w={'90%'} />
      <Tabs margin={'auto'} w={'90%'} variant='line'>
        <TabList mb='1em'>
          <Tab onClick={() => setFilter('UNREAD')}>Unread</Tab>
          <Tab onClick={() => setFilter('READ')}>Read</Tab>
        </TabList>
      </Tabs>
      <Center margin={'10px'} p={'25px'} flexDirection={'column'} gap={'25px'}>
        <Text
          color={'tomato'}
          fontWeight={'semibold'}
          fontSize={'2xl'}
          display={error ? 'block' : 'none'}
        >
          {error}
        </Text>
        {loading ? (
          <Spinner size='lg' />
        ) : notifications.length === 0 && !error ? (
          <Text fontWeight={'semibold'} fontSize={'2xl'}>
            No Notifications
          </Text>
        ) : (
          notifications.map((notification) => (
            <NotificationCard
              data={notification}
              key={notification._id}
            ></NotificationCard>
          ))
        )}
      </Center>
    </>
  )
}

export default UserNotifications
