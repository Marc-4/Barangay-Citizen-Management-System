// GenericCard.jsx
import { VStack, Box, Heading, Divider, Text } from '@chakra-ui/react'

const OwnerProfileCard = ({ title, data }) => {
  return (
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
          <Text>{data?.firstName || 'N/A'}</Text>
        </Box>
        <Box>
          <Text fontWeight='bold'>Middle Name:</Text>
          <Text>{data?.middleName || 'N/A'}</Text>
        </Box>
        <Box>
          <Text fontWeight='bold'>Last Name:</Text>
          <Text>{data?.lastName || 'N/A'}</Text>
        </Box>
        <Box>
          <Text fontWeight='bold'>Email:</Text>
          <Text>{data?.email || 'N/A'}</Text>
        </Box>
        <Box>
          <Text fontWeight='bold'>Gender:</Text>
          <Text>{data?.sex || 'N/A'}</Text>
        </Box>
        <Box>
          <Text fontWeight='bold'>Occupation:</Text>
          <Text>{data?.occupation || 'N/A'}</Text>
        </Box>
        <Box>
          <Text fontWeight='bold'>Date of Birth:</Text>
          <Text>{data?.dateOfBirth ? new Date(data?.dateOfBirth).toLocaleDateString() : 'N/A' }</Text>
        </Box>
        <Box>
          <Text fontWeight='bold'>Civil Status:</Text>
          <Text>{data?.civilStatus || 'N/A'}</Text>
        </Box>
        <Box>
          <Text fontWeight='bold'>Address:</Text>
          <Text ml={'10px'} fontWeight='bold'>
            House Number:
          </Text>
          <Text ml={'10px'}>{data?.address?.houseNumber || 'N/A'}</Text>
          <Text ml={'10px'} fontWeight='bold'>
            Street Name:
          </Text>
          <Text ml={'10px'}>{data?.address?.streetName || 'N/A'}</Text>
          <Text ml={'10px'} fontWeight='bold'>
            Subdivision/Purok:
          </Text>
          <Text ml={'10px'}>{data?.address?.subdivisionPurok || 'N/A'}</Text>
        </Box>
      </Box>
    </VStack>
  )
}

export default OwnerProfileCard
