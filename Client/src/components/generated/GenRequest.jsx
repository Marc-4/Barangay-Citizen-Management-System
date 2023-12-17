import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Text, Box, HStack, Button, useDisclosure } from '@chakra-ui/react'
import callAPI from '../../utils/callAPI'
import RequestDetailCard from '../cards/RequestDetailCard'
import OwnerProfileCard from '../cards/OwnerProfileCard'
import RequestContentCard from '../cards/RequestContentCard'
import RequestModal from '../modals/RequestModal'
const GenRequest = () => {
  const { id } = useParams()
  const [requestData, setRequestData] = useState(null)
  const [account, setAccount] = useState(null)
  const [error, setError] = useState(null)

  const role = sessionStorage.getItem('userRole')

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
    fetchRequestData()
  }, [id])

  useEffect(() => {
    fetchRequestOwner()
  }, [requestData])

  const fetchRequestData = async () => {
    try {
      const route = `http://localhost:3000/api/${role}/request/${id}`
      const data = await callAPI(null, 'GET', route)
      if (data && data.result === 'OK') {
        setError(null)
        setRequestData(data.payload)
      } else {
        setError('Error fetching request data')
      }
    } catch (error) {
      setError('Error fetching request data')
    }
  }

  const fetchRequestOwner = async () => {
    try {
      if (requestData) {
        const route = `http://localhost:3000/api/${role}/user/${requestData.accountID}`
        const data = await callAPI(null, 'GET', route)
        if (data && data.result === 'OK') {
          setError(null)
          setAccount(data.payload)
        }
      }
    } catch (error) {
      console.log(error)
      setError('Error fetching request Owner')
    }
  }

  const handleUpdate = () => {
    fetchRequestData()
  }

  return (
    <>
      <RequestModal
        {...{
          isOpen: isAcceptOpen,
          onClose: onAcceptClose,
          request: requestData,
          onUpdate: handleUpdate,
          status: 'ACCEPTED',
        }}
      />
      <RequestModal
        {...{
          isOpen: isRejectOpen,
          onClose: onRejectClose,
          request: requestData,
          onUpdate: handleUpdate,
          status: 'REJECTED',
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
        {requestData && (
          <>
            <HStack spacing={4} align='start'>
              <RequestDetailCard
                title='Request Details'
                data={requestData}
              />
              <OwnerProfileCard title='Owner Profile' data={account?.profile} />
              {requestData.requestType == 'EDIT' && (
                <RequestContentCard
                  title='Changing To'
                  data={{ ...requestData.requestContent }}
                  profile={account?.profile}
                />
              )}
            </HStack>
            {requestData.status === 'PENDING' ? (
              <Box justifyContent={'center'} display={'flex'} gap={'10px'}>
                <Button onClick={() => onAcceptOpen()} colorScheme='green'>
                  Accept
                </Button>
                <Button onClick={() => onRejectOpen()} colorScheme='red'>
                  Reject
                </Button>
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

export default GenRequest
