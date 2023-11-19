import { useState, useEffect } from 'react'
import { Flex } from '@chakra-ui/react'
import TransactionCard from './TransactionCard'
import callAPI from '../utils/callAPI'

const UpcomingTransactions = () => {
  const [transactions, setTransactions] = useState([])
  const [filter, setFilter] = useState('PENDING')

  const [entries, setEntries] = useState(20)

  useEffect(() => {
    getTransactionsData()
  }, [])

  const getTransactionsData = async () => {
    const body = null
    const method = 'GET'
    const route =
      `http://localhost:3000/api/admin/transactions?entries=${entries}&filter=${filter}`
    try {
      const data = await callAPI(body, method, route)
      if (data && data.result === 'OK') setTransactions(data.payload)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <Flex
        flexDirection={'column'}
        gap={'25px'}
        minW={'750px'}
        align={'center'}
      >
        {transactions.map((transaction) => {
          return (
            <TransactionCard
              key={transaction._id}
              id={transaction._id}
              date={new Date(transaction.timestamp).toLocaleDateString()}
              time={new Date(transaction.timestamp).toLocaleTimeString()}
              name={'Marc Kenneth S. Verdugo'}
              type={transaction.transacType}
              status={transaction.status}
            ></TransactionCard>
          )
        })}
      </Flex>
    </>
  )
}

export default UpcomingTransactions
