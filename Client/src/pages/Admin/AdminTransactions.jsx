import {
  Box,
  Heading,
  Center,
  Flex,
  Divider,
  Text,
  Tabs,
  Tab,
  TabList,
} from '@chakra-ui/react'
import TransactionCard from '../../components/cards/TransactionCard'
import { useEffect, useState } from 'react'
import callAPI from '../../utils/callAPI'
import Searchbar from '../../components/Searchbar'
import RefreshButton from '../../components/RefreshButton'

const AdminTransactions = () => {
  const [transactions, setTransactions] = useState([])
  const [error, setError] = useState()
  const [filter, setFilter] = useState('PENDING')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    getTransactions()
  }, [filter])

  const getTransactions = async () => {
    const body = null
    const method = 'GET'
    const route = `http://localhost:3000/api/admin/transactions?entries=20&filter=${filter}`
    try {
      const data = await callAPI(body, method, route)
      if (data && data.result === 'OK') {
        setError(null)
        return setTransactions(data.payload)
      } else return setError('Connection Error, refresh page to try again')
    } catch (err) {
      return setError('Connection Error, refresh page to try again')
    }
  }

  const handleSearch = async (query) => {
    setIsLoading(true)
    const body = null
    const method = 'GET'
    const route = `http://localhost:3000/api/admin/transactions/search?query=${query}`

    try {
      const data = await callAPI(body, method, route)
      if (data.result === 'OK') {
        setTransactions(data.payload)
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
        <Flex flexDirection='row' alignItems='center' gap={'25px'}>
          <Searchbar searchHandler={handleSearch} />
          <RefreshButton />
        </Flex>
      </Box>
      <Divider margin={'auto'} borderColor={'brand.100'} w={'90%'} />
      <Tabs margin={'auto'} w={'90%'} variant='line'>
        <TabList mb='1em'>
          <Tab onClick={() => setFilter('PENDING')}>Pending Transactions</Tab>
          <Tab onClick={() => setFilter('HISTORY')}>Transaction History</Tab>
        </TabList>
      </Tabs>

      <Center p={'25px'} pt={'0px'} flexDirection={'column'}>
        <Text display={error ? 'block' : 'none'}>{error}</Text>

        {transactions.length === 0 ? (
          <Text fontWeight={'semibold'} fontSize={'2xl'}>
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
      </Center>
    </>
  )
}

export default AdminTransactions
