import { Box, Container, Heading, Image, Flex, Text } from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import callAPI from '../utils/callAPI'

const ProfileCard = () => {
  const [profileData, setProfileData] = useState(null)
  const [error, setError] = useState()

  useEffect(() => {
    getProfile()
  }, [])

  const getProfile = async () => {
    const body = null
    const method = 'GET'
    const route = `http://localhost:3000/api/admin/account/`

    let data
    try {
      data = await callAPI(body, method, route)
      if (data.result === 'OK') {
        setError(null)
        setProfileData(data.payload)
      }
    } catch (err) {
      console.error(err)
      setError('An error occurred while fetching profile data')
    }

    console.log(profileData)
  }

  return (
    <>
      <Container
        borderRadius={'10px'}
        maxW={'1000px'}
        padding={'25px'}
        textColor={'brand.100'}
      >
        <Text
          fontSize={'2xl'}
          display={error ? 'block' : 'none'}
          color={'tomato'}
          fontWeight={'semibold'}
          textAlign={'center'}
        >
          {error}
        </Text>
        <Box
          id='profile_photo'
          display={'flex'}
          gap={'20px'}
          marginTop={'25px'}
          marginBottom={'25px'}
          alignItems={'center'}
          justifyContent={'center'}
          bg={'brand.300'}
          textColor={'brand.200'}
          rounded={'10px'}
          p={'20px'}
        >
          <Image w={'250px'} h={'250px'} display={'block'} />
          <Text fontSize={'3xl'} fontWeight={'semibold'}>
            {profileData
              ? `${profileData.lastName || ''}, ${
                  profileData.firstName || ''
                } ${profileData.middleName || ''}`
              : 'Loading...'}
          </Text>
        </Box>

        <Box
          id='profile_details'
          marginTop={'25px'}
          marginBottom={'25px'}
          pl={'10px'}
          p={'25px'}
          rounded={'10px'}
        >
          <Heading marginBottom={'25px'}>Profile Details</Heading>
          <Flex pl={'10px'} justify={'space-between'} wrap={'wrap'}>
            <Box bg={'brand.400'} p={'10px'} rounded={'10px'}>
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
                    {profileData
                      ? `${profileData.firstName || ''}`
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
                    {profileData
                      ? `${profileData.lastName || ''}`
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
                    {profileData
                      ? `${profileData.middleName || 'N/A'}`
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
                  {profileData
                    ? `${
                        profileData.dateOfBirth
                          ? new Date(
                              profileData.dateOfBirth
                            ).toLocaleDateString('en-US', {
                              month: 'long',
                            }) || ''
                          : ''
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
                  {profileData
                    ? `${
                        profileData.dateOfBirth
                          ? new Date(
                              profileData.dateOfBirth
                            ).toLocaleDateString('en-US', {
                              day: '2-digit',
                            }) || ''
                          : ''
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
                  {profileData
                    ? `${
                        profileData.dateOfBirth
                          ? new Date(
                              profileData.dateOfBirth
                            ).toLocaleDateString('en-US', {
                              year: 'numeric',
                            }) || ''
                          : ''
                      }`
                    : 'Loading...'}
                </Text>
              </Box>
              <Box id='place_of_birth' w={'200px'} marginBottom={'25px'}>
                <Heading fontSize={'2xl'}>Place Of Birth</Heading>
                <Text>
                  {profileData
                    ? `${profileData.placeOfBirth || 'N/A'}`
                    : 'Loading...'}
                </Text>
              </Box>
            </Box>
            <Box bg={'brand.400'} p={'10px'} rounded={'10px'}>
              <Box id='Sex' w={'200px'} marginBottom={'25px'}>
                <Heading fontSize={'2xl'}>Gender</Heading>
                <Text>
                  {profileData ? `${profileData.sex || 'N/A'}` : 'Loading...'}
                </Text>
              </Box>
              <Box id='civil_status' w={'200px'} marginBottom={'25px'}>
                <Heading fontSize={'2xl'}>Civil Status</Heading>
                <Text>
                  {profileData
                    ? `${profileData.civilStatus || 'N/A'}`
                    : 'Loading...'}
                </Text>
              </Box>
              <Box id='occupation' w={'200px'} marginBottom={'25px'}>
                <Heading fontSize={'2xl'}>Occupation</Heading>
                <Text>
                  {profileData
                    ? `${profileData.occupation || 'N/A'}`
                    : 'Loading...'}
                </Text>
              </Box>
              <Box id='citizenship' w={'200px'} marginBottom={'25px'}>
                <Heading fontSize={'2xl'}>Citizenship</Heading>
                <Text>
                  {profileData
                    ? `${profileData.citizenship || 'N/A'}`
                    : 'Loading...'}
                </Text>
              </Box>
            </Box>
            <Box bg={'brand.400'} p={'10px'} rounded={'10px'}>
              <Box id='email' w={'200px'} marginBottom={'25px'}>
                <Heading fontSize={'2xl'}>E-mail</Heading>
                <Text>
                  {profileData ? `${profileData.email || 'N/A'}` : 'Loading...'}
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
                  {profileData
                    ? `${profileData.houseNumber || 'N/A'}`
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
                  {profileData
                    ? `${profileData.streetName || 'N/A'}`
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
                  {profileData
                    ? `${profileData.subdivisionPurok || 'N/A'}`
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
