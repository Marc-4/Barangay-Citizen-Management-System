import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Text, Box, HStack, Button } from '@chakra-ui/react'
import callAPI from '../../utils/callAPI'
import TransactionDetailCard from '../cards/TransactionDetailCard'
import TransactionContentCard from '../cards/TransactionContentCard'

const GenTransaction = () => {
  const { id } = useParams()
  const [transactionData, setTransactionData] = useState(null)
  const [ownerAccount, setOwnerAccount] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchTransactionData()
  }, [id])

  useEffect(() => {
    fetchTransactionOwner()
  }, [transactionData])

  const fetchTransactionData = async () => {
    try {
      let route
      route = `http://localhost:3000/api/admin/transaction/${id}`
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

  const fetchTransactionOwner = async () => {
    try {
      if (transactionData) {
        const route = `http://localhost:3000/api/admin/user/${transactionData.accountID}`
        const data = await callAPI(null, 'GET', route)
        if (data && data.result === 'OK') {
          setError(null)
          setOwnerAccount(data.payload)
        }
      }
    } catch (error) {
      console.log(error)
      setError('Error fetching transaction Owner')
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
              name={
                ownerAccount?.profile?.firstName +
                ', ' +
                ownerAccount?.profile?.lastName
              }
            />
            <TransactionContentCard
              title='Form Data'
              data={{ ...transactionData.formData }}
              profile={ownerAccount?.profile}
            />
          </HStack>
          {transactionData.status === 'PENDING' ? (
            <Box display={'flex'} justifyContent={'center'} gap={'10px'}>
              <Button colorScheme='green'>Accept</Button>
              <Button colorScheme='red'>Reject</Button>
            </Box>
          ) : (
            ''
          )}
        </>
      )}
    </Box>
  )
}

export default GenTransaction
