import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Text, Box, HStack, Button } from '@chakra-ui/react'
import callAPI from '../../utils/callAPI'
import TransactionDetailCard from '../cards/TransactionDetailCard'
import TransactionContentCard from '../cards/TransactionContentCard'

const GenUserTransaction = () => {
  const { id } = useParams()
  const [transactionData, setTransactionData] = useState(null)
  const [ownerAccount, setOwnerAccount] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchTransactionData()
  }, [id])

  const fetchTransactionData = async () => {
    try {
      let route
        route = `http://localhost:3000/api/user/transaction/${id}?filter=FORMDATA`
      const data = await callAPI(null, 'GET', route)

      if (data && data.result === 'OK') {
        setError(null)
        setTransactionData(data.payload)
      } else {
        setError(data.payload.error)
      }
    } catch (error) {
      setError('Error fetching transaction data')
    }
  }

  return (
    <Box borderRadius={'10px'} maxW={'1000px'} padding={'25px'} m={'auto'}>
      {error && (
        <Text
          fontSize={'2xl'}
          color={'tomato'}
          fontWeight={'semibold'}
          textAlign={'center'}
        >
          {error}
        </Text>
      )}
      {transactionData && (
        <>
          <HStack spacing={4} align='start'>
            <TransactionDetailCard
              title='Transaction Details'
              data={transactionData}
            />
            <TransactionContentCard
              title='Form Data'
              data={{ ...transactionData.formData }}
              profile={ownerAccount?.profile}
            />
          </HStack>
        </>
      )}
    </Box>
  )
}

export default GenUserTransaction
