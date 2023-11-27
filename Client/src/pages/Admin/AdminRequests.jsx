import {
  Heading,
  Center,
  Divider,
  Text,
  Tabs,
  Tab,
  TabPanels,
  TabPanel,
  TabList,
  Flex,
  Box,
} from '@chakra-ui/react'
import TransactionCard from '../../components/cards/TransactionCard'
import { useEffect, useState } from 'react'
import callAPI from '../../utils/callAPI'
import Searchbar from '../../components/Searchbar'

const AdminRequests = () => {
  const [Requests, setRequests] = useState([])
  const [error, setError] = useState()
  const [filter, setFilter] = useState('PENDING')

  useEffect(() => {
    getRequests()
  }, [filter])

  const getRequests = async () => {
    const body = null
    const method = 'GET'
    const route = `http://localhost:3000/api/admin/requests?entries=20&filter=${filter}`
    try {
      console.log('calling API..')
      const data = await callAPI(body, method, route)
      if (data && data.result === 'OK') {
        setError(null)
        return setRequests(data.payload)
      } else return setError('Connection Error, refresh page to try again')
    } catch (err) {
      return setError('Connection Error, refresh page to try again')
    }
  }

  return (
    <>
      <Box m={'auto'} display='flex' alignItems='center' w={'90%'}>
        <Flex flexDirection='row' alignItems='center' gap={'25px'}>
          <Searchbar />
          <Heading mt='25px' mb='25px' display='flex' justifyContent='center'>
            Requests
          </Heading>
        </Flex>
      </Box>
      <Divider margin={'auto'} borderColor={'brand.100'} w={'90%'} />
      <Tabs margin={'auto'} w={'90%'} variant='line'>
        <TabList mb='1em'>
          <Tab onClick={() => setFilter('PENDING')}>Pending Requests</Tab>
          <Tab onClick={() => setFilter('HISTORY')}>Request History</Tab>
        </TabList>
      </Tabs>

      <Center
        margin={'10px'}
        p={'25px'}
        pt={'0px'}
        flexDirection={'column'}
        gap={'25px'}
      >
        <Text display={error ? 'block' : 'none'}>{error}</Text>

        {Requests.map((request) => {
          return (
            <TransactionCard
              key={request._id}
              data={request}
              basepath={'/admin/requests'}
            ></TransactionCard>
          )
        })}
      </Center>
    </>
  )
}

export default AdminRequests
