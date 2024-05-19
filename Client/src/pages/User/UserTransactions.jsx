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

const UserTransactions = () => {
  const [transactions, setTransactions] = useState([])
  const [pastTransactions, setPastTransactions] = useState([])
  const [error, setError] = useState()
  const [filter, setFilter] = useState('PENDING')
  const [transactionSorted, setTransactionSorted] = useState([])
  const [pastTransactionSorted, setPastTransactionSorted] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [refreshCounter, setRefreshCounter] = useState(0)

  useEffect(() => {
    getTransactions()
    getPastTransactions()
    console.log(transactions)
    console.log(pastTransactions)
  }, [refreshCounter])

  useEffect(() => {
    setTransactionSorted(
      [...transactions].sort(
        (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
      )
    )
    setPastTransactionSorted(
      [...pastTransactions].sort(
        (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
      )
    )
  }, [transactions])

  const getTransactions = async () => {
    setIsLoading(true)
    const body = null
    const method = 'GET'
    const route = `${import.meta.env.VITE_API_URL}/api/user/transactions?entries=20&filter=PENDING`
    try {
      const data = await callAPI(body, method, route)
      if (data.result === 'OK') {
        setError(null)
        setTransactions(data.payload)
      } else return setError(data.payload.error)
    } catch (err) {
      return setError('Connection Error, refresh page to try again')
    } finally {
      setIsLoading(false)
    }
  }

  const getPastTransactions = async () => {
    setIsLoading(true)
    try {
      const body = null
      const method = 'GET'
      const route = `${import.meta.env.VITE_API_URL}/api/user/transactions?entries=20&filter=HISTORY`
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

    try {
      const body = null
      const method = 'GET'
      const route = `${import.meta.env.VITE_API_URL}/api/user/transactions/search?query=${query}&filter=${filter}`
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
          // alignItems='center'
          gap={'15px'}
          pt={'15px'}
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
      <Tabs w={'90%'} m={'auto'}>
        <TabList mb='1em'>
          <Tab onClick={() => setFilter('PENDING')}>Pending Transactions</Tab>
          <Tab onClick={() => setFilter('HISTORY')}>Transaction History</Tab>
        </TabList>
        <Text
          fontSize={'2xl'}
          fontWeight={'semibold'}
          color={'tomato'}
          textAlign={'center'}
          display={error ? 'block' : 'none'}
        >
          {error}
        </Text>
        <Spinner
          mt={'25px'}
          m={'auto'}
          size={'xl'}
          display={isLoading ? 'block' : 'none'}
        />
        <TabPanels>
          <TabPanel>
            <Center p={'25px'} pt={'0px'} flexDirection={'column'}>
              {isLoading !== true && transactions.length === 0 ? (
                <Text fontWeight={'semibold'} fontSize={'2xl'} mt={'25px'}>
                  No Transactions Made
                </Text>
              ) : (
                transactionSorted.map((transaction) => (
                  <TransactionCard
                    key={transaction._id}
                    data={transaction}
                    basepath={'/user/transactions'}
                  />
                ))
              )}
            </Center>
          </TabPanel>
          <TabPanel>
            <Center p={'25px'} pt={'0px'} flexDirection={'column'}>
              {isLoading !== true && pastTransactions.length === 0 ? (
                <Text fontWeight={'semibold'} fontSize={'2xl'} mt={'25px'}>
                  No Past Transactions Made
                </Text>
              ) : (
                pastTransactionSorted.map((transaction) => (
                  <TransactionCard
                    key={transaction._id}
                    data={transaction}
                    basepath={'/user/transactions'}
                  />
                ))
              )}
            </Center>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  )
}

export default UserTransactions
