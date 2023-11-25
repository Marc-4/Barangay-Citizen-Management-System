import { VStack, Box, Heading, Divider, Text, Link } from '@chakra-ui/react'
import { Link as rr_Link } from 'react-router-dom'

const TransactionDetailCard = ({ title, data, name }) => {
  return (
    <VStack spacing={4} align='start'>
      <Box
        w={'300px'}
        id='transaction_details'
        marginTop={'25px'}
        marginBottom={'25px'}
        pl={'10px'}
        p={'25px'}
        rounded={'10px'}
        bg={'gray.300'}
        textColor={'brand.100'}
      >
        <Heading fontSize={'2xl'} marginBottom={'25px'}>
          {title}
        </Heading>
        <Divider w='100%' borderColor={'brand.100'} marginBottom={'25px'} />
        <Box>
          <Text fontWeight='bold'>ID:</Text>
          <Text>{data._id}</Text>
        </Box>
        <Box>
          <Text fontWeight='bold'>Requestor:</Text>
          <Link
            color={'brand.500'}
            as={rr_Link}
            to={`/admin/users/${data.accountID}`}
          >
            <Text>{typeof name === 'undefined' ? name : 'no data'}</Text>
          </Link>
        </Box>
        <Box>
          <Text fontWeight='bold'>Date:</Text>
          <Text>{new Date(data.timestamp).toLocaleDateString()}</Text>
        </Box>
        <Box>
          <Text fontWeight='bold'>Transaction Type:</Text>
          <Text>{data.transacType}</Text>
        </Box>
        <Box>
          <Text fontWeight='bold'>Status:</Text>
          <Text>{data.status}</Text>
        </Box>
      </Box>
    </VStack>
  )
}

export default TransactionDetailCard
