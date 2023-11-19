import { Box, Heading, Center, Button, Divider, Text } from '@chakra-ui/react'
import TransactionCard from '../../components/TransactionCard'
import { useEffect, useState } from 'react'
import callAPI from '../../utils/callAPI'

const AdminTransactions = () => {
  const [transactions, setTransactions] = useState([])
  const [error, setError] = useState()
  const [filter, setFilter] = useState('PENDING')

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

  return (
    <>
      <Heading
        display={'flex'}
        mt={'25px'}
        mb={'25px'}
        justifyContent={'center'}
      >
        Transactions Page
      </Heading>
      <Divider margin={'auto'} borderColor={'brand.100'} w={'90%'} />

      <Center margin={'10px'} p={'25px'} flexDirection={'column'} gap={'25px'}>
        <Box>
          <Button
            mr={'12px'}
            colorScheme='facebook'
            size={'lg'}
            onClick={() => setFilter('HISTORY')}
          >
            Transaction History
          </Button>
          <Button
            ml={'12px'}
            colorScheme='blue'
            size={'lg'}
            onClick={() => setFilter('PENDING')}
          >
            Pending Transactions
          </Button>
        </Box>

        <Text display={error ? 'block' : 'none'}>{error}</Text>

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
      </Center>
    </>
  )
}

export default AdminTransactions
