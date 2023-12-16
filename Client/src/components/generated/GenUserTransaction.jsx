import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Text, Box, VStack, Button, Heading } from '@chakra-ui/react'
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

      if (data.result === 'OK') {
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
          <VStack spacing={5} align='center'>
            <TransactionDetailCard
              title='Transaction Details'
              data={transactionData}
            />
            {transactionData.status === 'PENDING' ? (
              ''
            ) : (
              <Box
                borderRadius={'10px'}
                p={'10px'}
                bg={
                  transactionData.status === 'ACCEPTED'
                    ? 'green.300'
                    : 'red.300'
                }
                minW={'50%'}
                minH={'100px'}
              >
                <Heading fontSize={'xl'} fontWeight={'bold'}>
                  Response:{' '}
                </Heading>
                <Text fontWeight={'semibold'} display={'flex'}>
                  {transactionData.message}
                </Text>
                {transactionData.status === 'ACCEPTED' ? (
                  <iframe
                    src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3949.455299434878!2d125.12644883750801!3d8.156798071489188!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x32ffaa29fc390227%3A0x730ebefe42350cd0!2sBarangay%202%20Barangay%20Hall!5e0!3m2!1sen!2sph!4v1702746882363!5m2!1sen!2sph'
                    width='600'
                    height='450'
                    style={{border:0}}
                    allowfullscreen=''
                    loading='lazy'
                    referrerpolicy='no-referrer-when-downgrade'
                  ></iframe>
                ) : (
                  ''
                )}
              </Box>
            )}

            <TransactionContentCard
              title='Form Data'
              data={{ ...transactionData.formData }}
              profile={ownerAccount?.profile}
            />
          </VStack>
        </>
      )}
    </Box>
  )
}

export default GenUserTransaction
