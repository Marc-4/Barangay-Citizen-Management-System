import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Text, Box, HStack, Heading, Divider } from '@chakra-ui/react'
import callAPI from '../../utils/callAPI'
import TransactionDetailCard from '../cards/TransactionDetailCard'
import TransactionContentCard from '../cards/TransactionContentCard'

const GenTransaction = () => {
  const { id } = useParams()
  const [transactionData, setTransactionData] = useState(null)
  const [ownerProfile, setOwnerProfile] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchTransactionData()
  }, [id])

  useEffect(() => {
    fetchTransactionOwner()
  }, [transactionData])

  const fetchTransactionData = async () => {
    try {
      const route = `http://localhost:3000/api/admin/transaction/${id}`
      const data = await callAPI(null, 'GET', route)

      if (data && data.result === 'OK') {
        setError(null)
        setTransactionData(data.payload)
        console.log(transactionData)
      } else {
        setError('Error fetching transaction data')
      }
    } catch (error) {
      setError('Error fetching transaction data')
    }
  }

  const fetchTransactionOwner = async () => {
    try {
      if (transactionData) {
        console.log(transactionData.accountID)
        const route = `http://localhost:3000/api/admin/user/profile/${transactionData.accountID}`
        const data = await callAPI(null, 'GET', route)
        if (data && data.result === 'OK') {
          setError(null)
          setOwnerProfile(data.payload)
          console.log(ownerProfile)
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
              name={ownerProfile?.firstName + ', ' + ownerProfile?.lastName}
            />
            <TransactionContentCard
              title='Form Data'
              data={{ ...transactionData.formData }}
              profile={ownerProfile}
            />
          </HStack>
        </>
      )}
    </Box>
  )
}

export default GenTransaction
