// RequestContentCard.jsx
import { VStack, Box, Heading, Divider, Text, Image } from '@chakra-ui/react'
import { Buffer } from 'buffer'

const ContentCard = ({ title, data, profile }) => {
  console.log(data)

  const revertBase64 = (imageBuf) => {
    let base64String = Buffer.from(imageBuf).toString('base64')

    return `data:image/png;base64,${base64String}`
  }

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
            <Text
              color={data?.firstName ? 'brand.300' : 'brand.100'}
              fontWeight='bold'
            >
              Profile Photo:
            </Text>
            <Image
              src={
                data?.profilePhoto.data.data.length !== 0
                  ? revertBase64(data.profilePhoto.data)
                  : profile?.profilePhoto.data
                  ? revertBase64(profile.profilePhoto.data)
                  : ''
              }
              m={'auto'}
              boxSize={'200px'}
              objectFit={'cover'}
            />
            <Text
              color={data?.firstName ? 'brand.300' : 'brand.100'}
              fontWeight='bold'
            >
              First Name:
            </Text>
            <Text>{data?.firstName || profile?.firstName}</Text>
          </Box>
          <Box>
            <Text
              color={data?.middleName ? 'brand.300' : 'brand.100'}
              fontWeight='bold'
            >
              Middle Name:
            </Text>
            <Text>{data?.middleName || profile?.middleName}</Text>
          </Box>
          <Box>
            <Text
              color={data?.lastName ? 'brand.300' : 'brand.100'}
              fontWeight='bold'
            >
              Last Name:
            </Text>
            <Text>{data?.lastName || profile?.lastName}</Text>
          </Box>
          <Box>
            <Text
              color={data?.email ? 'brand.300' : 'brand.100'}
              fontWeight='bold'
            >
              Email:
            </Text>
            <Text>{data?.email || profile?.email}</Text>
          </Box>
          <Box>
            <Text
              color={data?.sex ? 'brand.300' : 'brand.100'}
              fontWeight='bold'
            >
              Gender:
            </Text>
            <Text>{data?.sex || profile?.sex}</Text>
          </Box>
          <Box>
            <Text
              color={data?.occupation ? 'brand.300' : 'brand.100'}
              fontWeight='bold'
            >
              Occupation:
            </Text>
            <Text>{data?.occupation || profile?.occupation}</Text>
          </Box>
          <Box>
            <Text
              color={data?.dateOfBirth ? 'brand.300' : 'brand.100'}
              fontWeight='bold'
            >
              Date of Birth:
            </Text>
            <Text>
              {data.dateOfBirth !== null
                ? new Date(data?.dateOfBirth).toLocaleDateString()
                : new Date(profile?.dateOfBirth).toLocaleDateString()}
            </Text>
          </Box>
          <Box>
            <Text
              color={data?.civilStatus ? 'brand.300' : 'brand.100'}
              fontWeight='bold'
            >
              Civil Status:
            </Text>
            <Text>{data?.civilStatus || profile?.civilStatus}</Text>
          </Box>
          <Box>
            <Text fontWeight='bold'>Address:</Text>
            <Text
              color={data?.address?.houseNumber ? 'brand.300' : 'brand.100'}
              ml={'10px'}
              fontWeight='bold'
            >
              House Number:
            </Text>
            <Text ml={'10px'}>
              {data?.address.houseNumber || profile?.address.houseNumber}
            </Text>
            <Text
              color={data?.address?.streetName ? 'brand.300' : 'brand.100'}
              ml={'10px'}
              fontWeight='bold'
            >
              Street Name:
            </Text>
            <Text ml={'10px'}>
              {data?.address.streetName || profile?.address.streetName}
            </Text>
            <Text
              color={
                data?.address?.subdivisionPurok ? 'brand.300' : 'brand.100'
              }
              ml={'10px'}
              fontWeight='bold'
            >
              Subdivision/Purok:
            </Text>
            <Text ml={'10px'}>
              {data?.address.subdivision_purok ||
                profile?.address.subdivisionPurok}
            </Text>
          </Box>
        </Box>
      </VStack>
    </>
  )
}

export default ContentCard
