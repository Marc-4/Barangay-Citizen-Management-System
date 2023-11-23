import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Text,
  Box,
  Link,
} from '@chakra-ui/react'
import { Link as rr_link } from 'react-router-dom'
import callAPI from '../../utils/callAPI'
import { useEffect, useState } from 'react'

const TransactionCard = ({ data, basepath }) => {
  const [profile, setProfile] = useState()

  useEffect(() => {
    getUser()
  }, [])
  const getUser = async () => {
    try {
      const route = `http://localhost:3000/api/admin/user/profile/${data.accountID}`
      const response = await callAPI(null, 'GET', route)

      if (response.result === 'OK') setProfile(response.payload)
      console.log(profile)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
      <Link
        as={rr_link}
        w={'95%'}
        to={`${basepath}/${data._id}`}
        _hover={{ textDecor: 'none' }}
      >
        <Card
          overflow='hidden'
          display={'flex'}
          fontSize={'md'}
          bg={'brand.200'}
          minW={'100%'}
          h={'125px'}
          shadow={'none'}
          borderBottom={'2px'}
          borderColor={'brand.400'}
          transition='all 0.2s'
          _hover={{ shadow: 'md', zIndex: '1' }}
        >
          <CardHeader
            paddingTop={'15px'}
            paddingBottom={'0px'}
            display={'flex'}
            justifyContent={'space-between'}
          >
            <Text fontWeight={'bold'} id='tr-id'>
              #{data._id}
            </Text>
            <Box ml={'auto'} display={'flex'} gap={'5px'}>
              <Text id='date'> {data?.date} </Text>-
              <Text id='time'>{data?.time}</Text>
            </Box>
          </CardHeader>
          <CardBody textAlign={'left'} pt={'0'} pb={'0'}>
            <Text id='name'>
              Requestor:{' '}
              {profile ? profile?.firstName + ' ' + profile.lastName : 'N/A'}
            </Text>
            <Text id='type'>
              Type: {data?.transacType ? data.transacType : data.requestType}
            </Text>
          </CardBody>
          <CardFooter pt={'0'}>
            <Text fontWeight={'semibold'} id='status'>
              {data.status}
            </Text>
          </CardFooter>
        </Card>
      </Link>
    </>
  )
}

export default TransactionCard
