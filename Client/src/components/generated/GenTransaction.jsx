import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Text, Box, VStack, Button, useDisclosure } from '@chakra-ui/react'
import callAPI from '../../utils/callAPI'
import TransactionDetailCard from '../cards/TransactionDetailCard'
import TransactionContentCard from '../cards/TransactionContentCard'
import TransactionModal from '../modals/TransactionModal'

const GenTransaction = () => {
  const { id } = useParams()
  const [transactionData, setTransactionData] = useState(null)
  const [ownerAccount, setOwnerAccount] = useState(null)
  const [error, setError] = useState(null)
  const {
    isOpen: isAcceptOpen,
    onOpen: onAcceptOpen,
    onClose: onAcceptClose,
  } = useDisclosure()
  const {
    isOpen: isRejectOpen,
    onOpen: onRejectOpen,
    onClose: onRejectClose,
  } = useDisclosure()


  useEffect(() => {
    fetchTransactionData();
    console.log('fetching transaction..');

  }, [id]);


  const fetchTransactionData = async () => {
    try {
      let route
      route = `http://localhost:3000/api/admin/transaction/${id}?filter=FORMDATA`
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

  const handleUpdate = () =>{
    fetchTransactionData()
  }

  return (
    <>
      <TransactionModal
        {...{
          isOpen: isAcceptOpen,
          onClose: onAcceptClose,
          transaction: transactionData,
          onUpdate: handleUpdate,
          status: 'ACCEPTED'
        }}
      />
      <TransactionModal
        {...{
          isOpen: isRejectOpen,
          onClose: onRejectClose,
          transaction: transactionData,
          onUpdate: handleUpdate,
          status: 'REJECTED'
        }}
      />
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
            <VStack spacing={4} justifyContent={'center'}>
              <TransactionDetailCard
                title='Transaction Details'
                data={transactionData}
                name={
                  transactionData.userFirstName +
                  ', ' +
                  transactionData.userLastName
                }
              />
              <TransactionContentCard
                title='Form Data'
                data={{ ...transactionData.formData }}
                profile={ownerAccount?.profile}
              />
            </VStack>
            {transactionData.status === 'PENDING' ? (
              <Box display={'flex'} justifyContent={'center'} gap={'10px'}>
                <Button onClick={() => onAcceptOpen()} colorScheme='green'>
                  Accept
                </Button>
                <Button onClick={()=> onRejectOpen()} colorScheme='red'>Reject</Button>
              </Box>
            ) : (
              ''
            )}
          </>
        )}
      </Box>
    </>
  )
}

export default GenTransaction
