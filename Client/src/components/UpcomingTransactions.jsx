import { useState, useEffect } from 'react'
import { Flex, Text } from '@chakra-ui/react'
import TransactionCard from './cards/TransactionCard'
import callAPI from '../utils/callAPI'

const UpcomingTransactions = () => {
  const [transactions, setTransactions] = useState([])
  const [filter, setFilter] = useState('PENDING')
  const [entries, setEntries] = useState(5)
  const [isLoading, setIsLoading] = useState(true)

  const userRole = localStorage.getItem('userRole')
  useEffect(() => {
    getTransactionsData()
  }, [])

  const getTransactionsData = async () => {
    setIsLoading(true)
    const body = null
    const method = 'GET'
    const route = `http://localhost:3000/api/${userRole}/transactions?entries=${entries}&filter=${filter}`
    try {
      const data = await callAPI(body, method, route)
      if (data && data.result === 'OK') setTransactions(data.payload)
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Flex flexDirection={'column'} minW={'750px'} align={'center'}>
        {!isLoading && transactions.length === 0 ? (
          <Text fontWeight={'semibold'} fontSize={'2xl'}>
            No Transactions
          </Text>
        ) : (
          transactions.map((transaction) => {
            return (
              <TransactionCard
                key={transaction._id}
                data={transaction}
                basepath={'/admin/transactions'}
              ></TransactionCard>
            )
          })
        )}
      </Flex>
    </>
  )
}

export default UpcomingTransactions
