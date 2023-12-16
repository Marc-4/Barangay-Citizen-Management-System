import { VStack, Box, Heading, Divider, Text, Link } from '@chakra-ui/react'
import { Link as rr_Link } from 'react-router-dom'

const TransactionDetailCard = ({ title, data, name }) => {
  console.log(name)
  return (
    // <VStack spacing={4} align='start'>
    <Box
      w={'1000px'}
      id='transaction_details'
      marginTop={'25px'}
      marginBottom={'25px'}
      pl={'10px'}
      p={'25px'}
      rounded={'10px'}
      bg={'gray.300'}
      textColor={'brand.100'}
    >
      <Heading textAlign={'center'} fontSize={'2xl'} marginBottom={'25px'}>
        {title}
      </Heading>
      <Divider w='100%' borderColor={'brand.100'} marginBottom={'25px'} />
      <Box display={'flex'} justifyContent={'space-around'}>
        <Box>
          <Text textAlign={'center'} fontWeight='bold'>
            ID:
          </Text>
          <Text>{data._id}</Text>
        </Box>
        {name ? (
          <Box>
            <>
              <Text textAlign={'center'} fontWeight='bold'>
                Requestor:
              </Text>
              <Link
                color={'brand.500'}
                as={rr_Link}
                to={`/admin/users/${data.accountID}`}
              >
                <Text
                  color={'primary.main'}
                  fontWeight={'semibold'}
                  textAlign={'center'}
                >
                  {name === 'undefined, undefined' ? 'no data' : name}
                </Text>
              </Link>
            </>
          </Box>
        ) : null}
        <Box>
          <Text textAlign={'center'} fontWeight='bold'>
            Date:
          </Text>
          <Text textAlign={'center'}>
            {new Date(data.timestamp).toLocaleDateString()}
          </Text>
        </Box>
        <Box>
          <Text textAlign={'center'} fontWeight='bold'>
            Transaction Type:
          </Text>
          <Text textAlign={'center'}>{data.transacType}</Text>
        </Box>
        <Box>
          <Text textAlign={'center'} fontWeight='bold'>
            Status:
          </Text>
          <Text
            textAlign={'center'}
            fontWeight={'bold'}
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
        </Box>
      </Box>
    </Box>
    // </VStack>
  )
}

export default TransactionDetailCard
