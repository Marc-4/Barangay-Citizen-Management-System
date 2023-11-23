import { VStack, Box, Heading, Divider, Text } from '@chakra-ui/react'

const TransactionContentCard = ({ title, data, profile }) => {
  return (
    <>
      <VStack spacing={4} align='start'>
        <Box
          w={'300px'}
          id='profile_details'
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
            <Text fontWeight='bold'>First Name:</Text>
            <Text>{data?.firstName || profile?.firstName}</Text>
          </Box>
        </Box>
      </VStack>
    </>
  )
}

export default TransactionContentCard
