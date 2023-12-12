import {
  Box,
  Center,
  Flex,
  Divider,
  Text,
  Tabs,
  Tab,
  TabList,
  TabPanels,
  TabPanel,
  Spinner,
} from '@chakra-ui/react'
import TransactionCard from '../../components/cards/TransactionCard'
import { useEffect, useState } from 'react'
import callAPI from '../../utils/callAPI'
import Searchbar from '../../components/Searchbar'
import RefreshButton from '../../components/RefreshButton'

const AdminTransactions = () => {
  const [transactions, setTransactions] = useState([])
  const [pastTransactions, setPastTransactions] = useState([])
  const [error, setError] = useState()
  const [filter, setFilter] = useState('PENDING')
  const [isLoading, setIsLoading] = useState(true)
  const [refreshCounter, setRefreshCounter] = useState(0)

  useEffect(() => {
    getTransactions()
    getPastTransactions()
  }, [refreshCounter])

  const getTransactions = async () => {
    setIsLoading(true)
    try {
      const body = null
      const method = 'GET'
      const route = `http://localhost:3000/api/admin/transactions?entries=20&filter=PENDING`
      const data = await callAPI(body, method, route)
      if (data.result === 'OK') {
        setError(null)
        setTransactions(data.payload)
      } else setError(data.payload.error)
    } catch (err) {
      setError('Connection Error, refresh page to try again')
    } finally {
      setIsLoading(true)
    }
  }

  const getPastTransactions = async () => {
    setIsLoading(true)

    try {
      const body = null
      const method = 'GET'
      const route = `http://localhost:3000/api/admin/transactions?entries=20&filter=HISTORY`
      const data = await callAPI(body, method, route)
      if (data && data.result === 'OK') {
        setError(null)
        setPastTransactions(data.payload)
      } else setError(data.payload.error)
    } catch (err) {
      setError('Connection Error, refresh page to try again')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSearch = async (query) => {
    setIsLoading(true)
    const body = null
    const method = 'GET'
    const route = `http://localhost:3000/api/admin/transactions/search?query=${query}&filter=${filter}`
    console.log(filter)
    console.log(query)

    try {
      const data = await callAPI(body, method, route)
      if (data.result === 'OK') {
        if (filter === 'PENDING') setTransactions(data.payload)
        else setPastTransactions(data.payload)
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
          alignItems='center'
          gap={'10px'}
          mt={'25px'}
          mb={'25px'}
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
          <Tab onClick={() => setFilter('PENDING')}>Pending Transactions</Tab>
          <Tab onClick={() => setFilter('HISTORY')}>Transaction History</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            {!isLoading && transactions.length === 0 ? (
              <Text
                fontWeight={'semibold'}
                fontSize={'2xl'}
                textAlign={'center'}
              >
                No Transactions
              </Text>
            ) : (
              transactions.map((transaction) => (
                <TransactionCard
                  key={transaction._id}
                  data={transaction}
                  basepath={'/admin/transactions'}
                />
              ))
            )}
          </TabPanel>
          <TabPanel>
            {!isLoading && pastTransactions.length === 0 ? (
              <Text
                fontWeight={'semibold'}
                fontSize={'2xl'}
                textAlign={'center'}
              >
                No Past Transactions
              </Text>
            ) : (
              pastTransactions.map((transaction) => (
                <TransactionCard
                  key={transaction._id}
                  data={transaction}
                  basepath={'/admin/transactions'}
                />
              ))
            )}
          </TabPanel>
          <Spinner
            display={isLoading ? 'block' : 'none'}
            size={'xl'}
            m={'auto'}
          />
          {error ? (
            <Text
              fontSize={'2xl'}
              fontWeight={'semibold'}
              color={'tomato'}
              textAlign={'center'}
            >
              {error}
            </Text>
          ) : (
            ''
          )}
        </TabPanels>
      </Tabs>
    </>
  )
}

export default AdminTransactions
