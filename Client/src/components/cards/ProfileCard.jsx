import {
  Box,
  Container,
  Heading,
  Image,
  Flex,
  Text,
  Stack,
  Spacer,
} from '@chakra-ui/react'

import { Buffer } from 'buffer'

const ProfileCard = (data) => {
  const revertBase64 = (imageBuf) => {
    let base64String = Buffer.from(imageBuf).toString('base64')

    return `data:image/png;base64,${base64String}`
  }

  return (
    <>
      <Container
        borderRadius={'10px'}
        maxW={'1000px'}
        padding={'25px'}
        textColor={'brand.100'}
      >
        <Box
          id='profile_photo'
          display={'flex'}
          gap={'20px'}
          border={'1px'}
          shadow={'md'}
          borderColor={'background.100'}
          alignItems={'center'}
          justifyContent={'center'}
          bg={'background.main'}
          textColor={'text.main'}
          rounded={'10px'}
          p={'20px'}
        >
          <Image
            border={'4px'}
            borderColor={'primary.main'}
            id='profile_photo'
            boxSize={'250px'}
            objectFit='cover'
            display={'block'}
            borderRadius={'full'}
            fallbackSrc='https://via.placeholder.com/250'
            src={
              data.data.profile?.profilePhoto
                ? revertBase64(data.data.profile.profilePhoto.data)
                : null
            }
          />
          <Stack>
            <Text fontSize={'3xl'} fontWeight={'semibold'}>
              {data
                ? data.data.profile
                  ? `${data.data.profile?.lastName || ''}, ${
                      data.data.profile?.firstName || ''
                    } ${data.data.profile?.middleName || ''}`
                  : 'N/A'
                : 'Loading...'}
            </Text>
            <Text fontSize={'xl'}>Username: {data.data.username}</Text>
            <Text color={'brand.400'}>#{data.data._id}</Text>
            <Spacer mt={'50px'} mb={'45px'} />
            <Text fontSize={'xl'}>
              Registered On:{' '}
              {new Date(data.data.dateOfCreation).toLocaleDateString()}
            </Text>
          </Stack>
        </Box>

        <Box id='profile_details' pl={'10px'} p={'25px'} rounded={'10px'}>
          <Heading marginBottom={'25px'}>Profile Details</Heading>
          <Flex pl={'10px'} justify={'space-between'} wrap={'wrap'}>
            <Box
              p={'10px'}
              rounded={'10px'}
              bg={'primary.100'}
            >
              <Box id='name' w={'250px'} marginBottom={'25px'}>
                <div>
                  <Heading fontSize={'2xl'}>Name</Heading>
                  <Heading
                    mr={'10px'}
                    display={'inline-block'}
                    fontSize={'large'}
                    fontWeight={'semibold'}
                  >
                    First Name:
                  </Heading>
                  <Text display={'inline-block'}>
                    {data
                      ? `${data.data.profile?.firstName || 'N/A'}`
                      : 'Loading...'}
                  </Text>
                </div>
                <div>
                  <Heading
                    mr={'10px'}
                    display={'inline-block'}
                    fontSize={'large'}
                    fontWeight={'semibold'}
                  >
                    Last Name:
                  </Heading>
                  <Text display={'inline-block'}>
                    {data
                      ? `${data.data.profile?.lastName || 'N/A'}`
                      : 'Loading...'}
                  </Text>
                </div>
                <div>
                  <Heading
                    mr={'10px'}
                    display={'inline-block'}
                    fontSize={'large'}
                    fontWeight={'semibold'}
                  >
                    Middle Name:
                  </Heading>
                  <Text display={'inline-block'}>
                    {data
                      ? `${data.data.profile?.middleName || 'N/A'}`
                      : 'Loading...'}
                  </Text>
                </div>
              </Box>
              <Box id='date_of_birth' w={'250px'} marginBottom={'25px'}>
                <Heading fontSize={'2xl'}>Date Of Birth</Heading>
                <Heading
                  mr={'10px'}
                  display={'inline-block'}
                  fontSize={'large'}
                  fontWeight={'semibold'}
                >
                  Month:
                </Heading>
                <Text display={'inline-block'}>
                  {data
                    ? `${
                        data.data.profile?.dateOfBirth
                          ? new Date(
                              data.data.profile?.dateOfBirth
                            ).toLocaleDateString('en-US', {
                              month: 'long',
                            }) || ''
                          : 'N/A'
                      }`
                    : 'Loading...'}
                </Text>
                <br />
                <Heading
                  mr={'10px'}
                  display={'inline-block'}
                  fontSize={'large'}
                  fontWeight={'semibold'}
                >
                  Day:
                </Heading>
                <Text display={'inline-block'}>
                  {' '}
                  {data
                    ? `${
                        data.data.profile?.dateOfBirth
                          ? new Date(
                              data.data.profile?.dateOfBirth
                            ).toLocaleDateString('en-US', {
                              day: '2-digit',
                            }) || 'N/A'
                          : 'N/A'
                      }`
                    : 'Loading...'}
                </Text>{' '}
                <br />
                <Heading
                  mr={'10px'}
                  display={'inline-block'}
                  fontSize={'large'}
                  fontWeight={'semibold'}
                >
                  Year:
                </Heading>
                <Text display={'inline-block'}>
                  {' '}
                  {data
                    ? `${
                        data.data.profile?.dateOfBirth
                          ? new Date(
                              data.data.profile?.dateOfBirth
                            ).toLocaleDateString('en-US', {
                              year: 'numeric',
                            }) || 'N/A'
                          : 'N/A'
                      }`
                    : 'Loading...'}
                </Text>
              </Box>
              <Box id='place_of_birth' w={'200px'} marginBottom={'25px'}>
                <Heading fontSize={'2xl'}>Place Of Birth</Heading>
                <Text>
                  {data
                    ? data.data.profile
                      ? `${
                          data.data.profile?.placeOfBirth?.city +
                          ' ' +
                          data.data.profile?.placeOfBirth?.province +
                          ', ' +
                          data.data.profile?.placeOfBirth?.country
                        }`
                      : 'N/A'
                    : 'Loading...'}
                </Text>
              </Box>
            </Box>
            <Box bg={'primary.100'} p={'10px'} rounded={'10px'}>
              <Box id='Sex' w={'200px'} marginBottom={'25px'}>
                <Heading fontSize={'2xl'}>Gender</Heading>
                <Text>
                  {data ? `${data.data.profile?.sex || 'N/A'}` : 'Loading...'}
                </Text>
              </Box>
              <Box id='civil_status' w={'200px'} marginBottom={'25px'}>
                <Heading fontSize={'2xl'}>Civil Status</Heading>
                <Text>
                  {data
                    ? `${data.data.profile?.civilStatus || 'N/A'}`
                    : 'Loading...'}
                </Text>
              </Box>
              <Box id='occupation' w={'200px'} marginBottom={'25px'}>
                <Heading fontSize={'2xl'}>Occupation</Heading>
                <Text>
                  {data
                    ? `${data.data.profile?.occupation || 'N/A'}`
                    : 'Loading...'}
                </Text>
              </Box>
              <Box id='citizenship' w={'200px'} marginBottom={'25px'}>
                <Heading fontSize={'2xl'}>Citizenship</Heading>
                <Text>
                  {data
                    ? `${data.data.profile?.citizenship || 'N/A'}`
                    : 'Loading...'}
                </Text>
              </Box>
            </Box>
            <Box bg={'primary.100'} p={'10px'} rounded={'10px'}>
              <Box id='email' w={'200px'} marginBottom={'25px'}>
                <Heading fontSize={'2xl'}>E-mail</Heading>
                <Text>
                  {data ? `${data.data.profile?.email || 'N/A'}` : 'Loading...'}
                </Text>
              </Box>
              <Box id='residency' w={'250px'} marginBottom={'25px'}>
                <Heading fontSize={'2xl'}>Address</Heading>
                <Heading
                  fontSize={'large'}
                  fontWeight={'semibold'}
                  mr={'10px'}
                  display={'inline-block'}
                >
                  House Number:
                </Heading>
                <Text display={'inline-block'}>
                  {data
                    ? `${data.data.profile?.address.houseNumber || 'N/A'}`
                    : 'Loading...'}
                </Text>{' '}
                <br />
                <Heading
                  fontSize={'large'}
                  fontWeight={'semibold'}
                  mr={'10px'}
                  display={'inline-block'}
                >
                  Street:
                </Heading>
                <Text display={'inline-block'}>
                  {data
                    ? `${data.data.profile?.address.streetName || 'N/A'}`
                    : 'Loading...'}
                </Text>{' '}
                <br />
                <Heading
                  fontSize={'large'}
                  fontWeight={'semibold'}
                  mr={'10px'}
                  display={'inline-block'}
                >
                  Subdivision/Purok:
                </Heading>
                <Text display={'inline-block'}>
                  {data
                    ? `${data.data.profile?.address.subdivisionPurok || 'N/A'}`
                    : 'Loading...'}
                </Text>{' '}
                <br />
              </Box>
            </Box>
          </Flex>
        </Box>
      </Container>
    </>
  )
}

export default ProfileCard
