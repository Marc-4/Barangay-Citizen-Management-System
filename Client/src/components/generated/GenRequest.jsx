import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Text, Box, HStack, VStack, Button, Center } from '@chakra-ui/react'
import callAPI from '../../utils/callAPI'
import RequestDetailCard from '../cards/RequestDetailCard'
import OwnerProfileCard from '../cards/OwnerProfileCard'
import RequestContentCard from '../cards/RequestContentCard'

const GenRequest = () => {
  const { id } = useParams()
  const [requestData, setRequestData] = useState(null)
  const [account, setAccount] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchRequestData()
  }, [id])

  useEffect(() => {
    fetchRequestOwner()
  }, [requestData])

  const fetchRequestData = async () => {
    try {
      const route = `http://localhost:3000/api/admin/request/${id}`
      const data = await callAPI(null, 'GET', route)

      if (data && data.result === 'OK') {
        setError(null)
        setRequestData(data.payload)
        console.log(requestData)
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
        const route = `http://localhost:3000/api/admin/user/${requestData.accountID}`
        const data = await callAPI(null, 'GET', route)
        if (data && data.result === 'OK') {
          setError(null)
          setAccount(data.payload)
          console.log(account)
        }
      }
    } catch (error) {
      console.log(error)
      setError('Error fetching request Owner')
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
      {requestData && (
        <>
          <HStack spacing={4} align='start'>
            <RequestDetailCard
              title='Request Details'
              data={requestData}
              name={
                account?.profile.firstName + ', ' + account?.profile.lastName
              }
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
          <Box justifyContent={'center'} display={'flex'} gap={'10px'}>
            <Button colorScheme='green'>Accept</Button>
            <Button colorScheme='red'>Reject</Button>
          </Box>
        </>
      )}
    </Box>
  )
}

export default GenRequest
