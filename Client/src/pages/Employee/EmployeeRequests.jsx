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
  Spinner,
} from '@chakra-ui/react'
import TransactionCard from '../../components/cards/TransactionCard'
import { useEffect, useState } from 'react'
import callAPI from '../../utils/callAPI'
import Searchbar from '../../components/Searchbar'
import RefreshButton from '../../components/RefreshButton'

const AdminRequests = () => {
  const [requests, setRequests] = useState([])
  const [pastRequests, setPastRequests] = useState([])
  const [error, setError] = useState()
  const [filter, setFilter] = useState('PENDING')
  const [isLoading, setIsLoading] = useState(true)
  const [refreshCounter, setRefreshCounter] = useState(0)

  useEffect(() => {
    getRequests()
    getPastRequests()
  }, [refreshCounter])

  const getRequests = async () => {
    setIsLoading(true)
    try {
      const body = null
      const method = 'GET'
      const route = `http://localhost:3000/api/employee/requests?entries=20&filter=PENDING`
      console.log('calling API..')
      const data = await callAPI(body, method, route)
      if (data && data.result === 'OK') {
        setError(null)
        return setRequests(data.payload)
      } else return setError(data.payload.error)
    } catch (err) {
      return setError('Connection Error, refresh page to try again')
    } finally {
      setIsLoading(false)
    }
  }
  const getPastRequests = async () => {
    setIsLoading(true)
    try {
      const body = null
      const method = 'GET'
      const route = `http://localhost:3000/api/employee/requests?entries=20&filter=HISTORY`
      console.log('calling API..')
      const data = await callAPI(body, method, route)
      if (data && data.result === 'OK') {
        setError(null)
        return setPastRequests(data.payload)
      } else return setError(data.payload.error)
    } catch (err) {
      return setError('Connection Error, refresh page to try again')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSearch = async (query) => {
    setIsLoading(true)
    
    try {
      const body = null
      const method = 'GET'
      const route = `http://localhost:3000/api/employee/requests/search?query=${query}&filter=${filter}`
      const data = await callAPI(body, method, route)
      if (data.result === 'OK') {
        if (filter === 'PENDING') setRequests(data.payload)
        else setPastRequests(data.payload)
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

  return (
    <>
      <Box m={'auto'} display='flex' alignItems='center' w={'90%'}>
        <Flex
          flexDirection='row'
          gap={'10px'}
          mt={'15px'}
          mb={'15px'}
        >
          <Searchbar searchHandler={handleSearch} />
          <RefreshButton
            refreshCounter={refreshCounter}
            setRefreshCounter={setRefreshCounter}
          />
        </Flex>
      </Box>
      <Divider margin={'auto'} borderColor={'brand.100'} w={'90%'} />
      <Tabs margin={'auto'} w={'90%'} variant='line'>
        <TabList mb='1em'>
          <Tab onClick={() => setFilter('PENDING')}>Pending Requests</Tab>
          <Tab onClick={() => setFilter('HISTORY')}>Request History</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Center
              margin={'10px'}
              p={'25px'}
              pt={'0px'}
              flexDirection={'column'}
              gap={'25px'}
            >
              <Text display={error ? 'block' : 'none'}>{error}</Text>

              {!isLoading && requests.length === 0 ? (
                <Text fontWeight={'semibold'} fontSize={'2xl'}>
                  No Requests
                </Text>
              ) : (
                requests.map((request) => {
                  return (
                    <TransactionCard
                      key={request._id}
                      data={request}
                      basepath={'/employee/requests'}
                    ></TransactionCard>
                  )
                })
              )}
            </Center>
          </TabPanel>
          <TabPanel>
            <Center
              margin={'10px'}
              p={'25px'}
              pt={'0px'}
              flexDirection={'column'}
              gap={'25px'}
            >
              <Text display={error ? 'block' : 'none'}>{error}</Text>

              {!isLoading && pastRequests.length === 0 ? (
                <Text fontWeight={'semibold'} fontSize={'2xl'}>
                  No Past Requests
                </Text>
              ) : (
                pastRequests.map((request) => {
                  return (
                    <TransactionCard
                      key={request._id}
                      data={request}
                      basepath={'/employee/requests'}
                    ></TransactionCard>
                  )
                })
              )}
            </Center>
          </TabPanel>
          <Spinner
            display={isLoading ? 'block' : 'none'}
            size={'xl'}
            m={'auto'}
          />
        </TabPanels>
      </Tabs>
    </>
  )
}

export default AdminRequests
