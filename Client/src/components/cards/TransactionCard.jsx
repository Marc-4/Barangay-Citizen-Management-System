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
  const [account, setAccount] = useState()
  const accountRole = sessionStorage.getItem('userRole')

  useEffect(() => {
    getUser()
  }, [])
  const getUser = async () => {
    try {
      let route
      if (accountRole === 'admin')
        route = `http://localhost:3000/api/admin/user/${data.accountID}`
      if (accountRole === 'user')
        route = `http://localhost:3000/api/user/account`
      const response = await callAPI(null, 'GET', route)
      if (response.result === 'OK') setAccount(response.payload)
      
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
          bg={'background.main'}
          minW={'100%'}
          h={'125px'}
          shadow={'none'}
          borderBottom={'2px'}
          borderColor={'accent.main'}
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
              <Text id='date'> {new Date(data?.timestamp).toLocaleDateString()} </Text>-
              <Text id='time'>{new Date(data?.timestamp).toLocaleTimeString()}</Text>
            </Box>
          </CardHeader>
          <CardBody textAlign={'left'} pt={'0'} pb={'0'}>
            <Text id='name'>
              Requestor:
              {account
                ?' ' + account?.profile.firstName + ' ' + account.profile.lastName
                : ' ' + 'N/A'}
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
