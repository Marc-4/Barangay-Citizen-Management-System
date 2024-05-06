import {
  Box,
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
import TransactionSearchbar from '../../components/TransactionSearchbar'
import RefreshButton from '../../components/RefreshButton'
import Pagination from '../../components/pagination'

const EmployeeTransactions = () => {
  const [transactions, setTransactions] = useState([])
  // const [pastTransactions, setPastTransactions] = useState([])
  const [error, setError] = useState()
  const [page, setPage] = useState(1)
  const [filter, setFilter] = useState('PENDING')
  const [isLoading, setIsLoading] = useState(true)
  const [refreshCounter, setRefreshCounter] = useState(0)
  const [entries, setEntries] = useState(10)
  const [transactionCount, setTransactionCount] = useState()

  useEffect(() => {
    getTransactions()
    // getPastTransactions()
  }, [refreshCounter])

  useEffect(() => {
    getTransactions()
    getTransactionsCount()
    console.log('transaction count: ' + transactionCount)
  }, [page, entries])

  const getTransactions = async () => {
    setIsLoading(true)
    try {
      const body = null
      const method = 'GET'
      const route = `http://localhost:3000/api/employee/transactions?page=${page}&entries=${entries}&filter=PENDING`
      const data = await callAPI(body, method, route)
      if (data.result === 'OK') {
        setError(null)
        setTransactions(data.payload)
      } else setError(data.payload.error)
    } catch (err) {
      setError('Connection Error, refresh page to try again')
    } finally {
      setIsLoading(false)
    }
  }

  // const getPastTransactions = async () => {
  //   setIsLoading(true)
  //   try {
  //     const body = null
  //     const method = 'GET'
  //     const route = `http://localhost:3000/api/employee/transactions?entries=20&filter=HISTORY`
  //     const data = await callAPI(body, method, route)
  //     if (data && data.result === 'OK') {
  //       setError(null)
  //       setPastTransactions(data.payload)
  //     } else setError(data.payload.error)
  //   } catch (err) {
  //     setError('Connection Error, refresh page to try again')
  //   } finally {
  //     setIsLoading(false)
  //   }
  // }

  const getTransactionsCount = async () => {
    const body = null
    const method = 'GET'
    const route = `http://localhost:3000/api/employee/transactions?entries=${0}&filter=PENDING`

    try {
      let result = await callAPI(body, method, route)

      console.log(result)
      if (result.result == 'OK') {
        setTransactionCount(result.payload)
        setError(null)
      } else setError(result.payload.err)
    } catch (error) {
      console.log(error)
      setError('Connection Error')
    }
  }

  const handleSearch = async (query) => {
    setIsLoading(true)

    try {
      const body = null
      const method = 'GET'
      const route = `http://localhost:3000/api/employee/transactions/search?query=${query}&filter=${filter}`
      const data = await callAPI(body, method, route)
      if (data.result === 'OK') {
        console.log(data.payload)
        setTransactions(data.payload)
        // if (filter === 'PENDING')
        // else setPastTransactions(data.payload)
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
        <Flex flexDirection='row' gap={'10px'} mt={'15px'} mb={'15px'}>
          <TransactionSearchbar searchHandler={handleSearch} />
          <RefreshButton refreshCounter={refreshCounter} setRefreshCounter={setRefreshCounter} />
        </Flex>
      </Box>
      <Divider margin={'auto'} borderColor={'brand.100'} w={'90%'} />
      {/* <Tabs margin={'auto'} w={'90%'} variant='line'> */}
      {/* <TabList mb='1em'>
        <Tab onClick={() => setFilter('PENDING')}>Pending Transactions</Tab>
        <Tab onClick={() => setFilter('HISTORY')}>Transaction History</Tab>
      </TabList> */}
      <Box display={'flex'} ml={'5rem'} paddingTop={'10px'}>
        <Pagination
          numOfPages={Math.round(Math.max(transactionCount / entries, 1))}
          page={page}
          setPage={setPage}
          setEntries={setEntries}
        />
      </Box>
      <Box m={'auto'} w={'90%'} pt={'10px'}>
        {error ? (
          <Text fontSize={'2xl'} fontWeight={'semibold'} color={'tomato'} textAlign={'center'}>
            {error}
          </Text>
        ) : (
          ''
        )}
        <Spinner display={isLoading ? 'block' : 'none'} size={'xl'} m={'auto'} />
        {/* <TabPanels>
        <TabPanel> */}
        {!isLoading && transactions.length === 0 ? (
          <Text fontWeight={'semibold'} fontSize={'2xl'} textAlign={'center'}>
            No Transactions
          </Text>
        ) : (
          transactions.map((transaction) => (
            <TransactionCard
              key={transaction._id}
              data={transaction}
              basepath={'/employee/transactions'}
            />
          ))
        )}
      </Box>
      {/* </TabPanel>
        <TabPanel> */}
      {/* {!isLoading && pastTransactions.length === 0 ? (
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
          )} */}
      {/* </TabPanel>
      </TabPanels> */}
      {/* </Tabs> */}
    </>
  )
}

export default EmployeeTransactions
