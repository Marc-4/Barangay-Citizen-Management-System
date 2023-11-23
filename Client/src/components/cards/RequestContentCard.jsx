// RequestContentCard.jsx
import { VStack, Box, Heading, Divider, Text } from '@chakra-ui/react'

const ContentCard = ({ title, data, profile }) => {
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
          <Box>
            <Text fontWeight='bold'>Middle Name:</Text>
            <Text>{data?.middleName || profile?.middleName}</Text>
          </Box>
          <Box>
            <Text fontWeight='bold'>Last Name:</Text>
            <Text>{data?.lastName || profile?.lastName}</Text>
          </Box>
          <Box>
            <Text fontWeight='bold'>Email:</Text>
            <Text>{data?.email || profile?.email}</Text>
          </Box>
          <Box>
            <Text fontWeight='bold'>Gender:</Text>
            <Text>{data?.sex || profile?.sex}</Text>
          </Box>
          <Box>
            <Text fontWeight='bold'>Occupation:</Text>
            <Text>{data?.occupation || profile?.occupation}</Text>
          </Box>
          <Box>
            <Text fontWeight='bold'>Date of Birth:</Text>
            <Text>
              {new Date(data?.dateOfBirth).toLocaleDateString() ||
                new Date(profile?.dateOfBirth).toLocaleDateString()}
            </Text>
          </Box>
          <Box>
            <Text fontWeight='bold'>Civil Status:</Text>
            <Text>{data?.civilStatus || profile?.civilStatus}</Text>
          </Box>
          <Box>
            <Text fontWeight='bold'>Address:</Text>
            <Text ml={'10px'} fontWeight='bold'>
              House Number:
            </Text>
            <Text ml={'10px'}>
              {data?.address.houseNumber || profile?.address.houseNumber}
            </Text>
            <Text ml={'10px'} fontWeight='bold'>
              Street Name:
            </Text>
            <Text ml={'10px'}>
              {data?.address.streetName || profile?.address.streetName}
            </Text>
            <Text ml={'10px'} fontWeight='bold'>
              Subdivision/Purok:
            </Text>
            <Text ml={'10px'}>
              {data?.address.subdivisionPurok ||
                profile?.address.subdivisionPurok}
            </Text>
          </Box>
        </Box>
      </VStack>
    </>
  )
}

export default ContentCard
