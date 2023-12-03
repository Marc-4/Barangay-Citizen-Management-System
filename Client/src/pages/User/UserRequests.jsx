import { Box, Heading, Center, Flex, Divider, Text } from '@chakra-ui/react'
import TransactionCard from '../../components/cards/TransactionCard'
import { useEffect, useState } from 'react'
import callAPI from '../../utils/callAPI'
import Searchbar from '../../components/Searchbar'

const UserTransactions = () => {
  const [transactions, setTransactions] = useState([])
  const [error, setError] = useState()
  const [filter, setFilter] = useState('PENDING')

  useEffect(() => {
    getTransactions()
  }, [filter])

  const getTransactions = async () => {
    const body = null
    const method = 'GET'
    const route = `http://localhost:3000/api/user/transactions?entries=20`
    try {
      const data = await callAPI(body, method, route)
      if (data.result === 'OK') {
        setError(null)
        setTransactions(data.payload)
      } else return setError(data.payload.error)
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
            Transactions
          </Heading>
        </Flex>
      </Box>
      <Divider margin={'auto'} borderColor={'brand.100'} w={'90%'} />

      <Center p={'25px'} pt={'0px'} flexDirection={'column'}>
        <Text display={error ? 'block' : 'none'}>{error}</Text>
        {transactions.length === 0 ? (
          <Text fontWeight={'semibold'} fontSize={'2xl'} mt={'25px'}>
            No Transactions Made
          </Text>
        ) : (
          transactions.map((transaction) => (
            <TransactionCard
              key={transaction._id}
              data={transaction}
              basepath={'/user/transactions'}
            />
          ))
        )}
      </Center>
    </>
  )
}

export default UserTransactions
