import { Card, CardBody, CardFooter, CardHeader, Text, Box, Link } from '@chakra-ui/react'
import { Link as rr_link } from 'react-router-dom'
import callAPI from '../../utils/callAPI'
import { useEffect, useState } from 'react'

const TransactionCard = ({ data, basepath }) => {
  // const accountRole = localStorage.getItem('userRole')

  return (
    <>
      <Link as={rr_link} w={'90%'} to={`${basepath}/${data._id}`} _hover={{ textDecor: 'none' }}>
        <Card
          m={'auto'}
          overflow='hidden'
          display={'flex'}
          fontSize={'md'}
          bg={'background.main'}
          w={'full'}
          h={'100px'}
          // shadow={'md'}
          // mb={'5px'}
          borderBottom={'solid 1px rgba(0, 0, 0, 0.2)'}
          transition='all 0.1s'
          _hover={{ zIndex: '1', backgroundColor: 'background.50', shadow: 'md' }}
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
              {' ' + data?.userFirstName + ' ' + data.userLastName}
            </Text>
            <Text id='type'>Type: {data?.transacType ? data.transacType : data.requestType}</Text>
          </CardBody>
          {/* <CardFooter pt={'0'}>
            <Text
              fontWeight={'semibold'}
              id='status'
              color={
                data.status === 'PENDING'
                  ? 'orange.400'
                  : data.status === 'ACCEPTED'
                  ? 'green'
                  : 'red'
              }
            >
              {data.status}
            </Text>
          </CardFooter> */}
        </Card>
      </Link>
    </>
  )
}

export default TransactionCard
