import {
  Box,
  Container,
  Heading,
  Image,
  Flex,
  Text,
  Stack,
  Spacer,
  Input,
  Button,
} from '@chakra-ui/react'

import { Buffer } from 'buffer'
import { useState } from 'react'

const ProfileCard = (data, onProfileOpen) => {
  const revertBase64 = (imageBuf) => {
    let base64String = Buffer.from(imageBuf).toString('base64')

    return `data:image/png;base64,${base64String}`
  }

  const [isEditing, setIsEditing] = useState(false)

  const sendRequest = () => {}
  return (
    <>
      <Container borderRadius={'10px'} maxW={'1000px'} padding={'25px'} textColor={'brand.100'}>
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
              data.data.profile?.profilePhoto?.data
                ? revertBase64(data.data.profile.profilePhoto.data)
                : null
            }
          />
          <Stack>
            <Text fontSize={'3xl'} fontWeight={'semibold'}>
              {data
                ? data.data.profile
                  ? `${data.data.profile?.lastName || ''}, ${data.data.profile?.firstName || ''} ${
                      data.data.profile?.middleName || ''
                    }`
                  : 'N/A'
                : 'Loading...'}
            </Text>
            <Text fontSize={'xl'} fontWeight={'semibold'}>
              Username: {data.data.username}
            </Text>
            <Text color={'gray.400'}>#{data.data._id}</Text>
            <Spacer mt={'50px'} mb={'45px'} />
            <Text fontSize={'md'}>
              Registered On: {new Date(data.data.dateOfCreation).toDateString()}
            </Text>
          </Stack>
        </Box>

        <Box
          bg={'gray.100'}
          id='profile_details'
          pl={'10px'}
          p={'25px'}
          mt={'25px'}
          rounded={'10px'}
          shadow={'md'}
        >
          <Box display={'flex'} gap={'10px'} alignItems={'normal'}>
            <Heading marginBottom={'25px'}>General Information</Heading>
            {/* <Button
              display={!isEditing ? 'block' : 'none'}
              colorScheme='green'
              onClick={() => setIsEditing(true)}
            >
              Edit
            </Button> */}
          </Box>
          <Flex pl={'10px'} justify={'space-between'} gap={'10px'} wrap={'wrap'} flexDir={'column'}>
            <Box bg={'white'} p={'10px'} rounded={'10px'} shadow={'base'}>
              <Heading fontSize={'2xl'} mb={'10px'} textColor={'facebook.800'}>
                Name
              </Heading>
              <Box id='name' w={'100%'} marginBottom={'25px'} display={'flex'} gap={'10px'}>
                <div>
                  <Heading
                    mr={'10px'}
                    display={'inline-block'}
                    fontSize={'large'}
                    fontWeight={'semibold'}
                    mb={'5px'}
                  >
                    First Name
                  </Heading>
                  <Input
                    readOnly
                    value={data ? `${data.data.profile?.firstName || 'N/A'}` : 'Loading...'}
                  />
                </div>
                <div>
                  <Heading
                    mr={'10px'}
                    display={'inline-block'}
                    fontSize={'large'}
                    fontWeight={'semibold'}
                    mb={'5px'}
                  >
                    Last Name
                  </Heading>
                  <Input
                    readOnly
                    value={data ? `${data.data.profile?.lastName || 'N/A'}` : 'Loading...'}
                  />
                </div>
                <div>
                  <Heading
                    mr={'10px'}
                    display={'inline-block'}
                    fontSize={'large'}
                    fontWeight={'semibold'}
                    mb={'5px'}
                  >
                    Middle Name
                  </Heading>
                  <Input
                    readOnly
                    value={data ? `${data.data.profile?.middleName || 'N/A'}` : 'Loading...'}
                  />
                </div>
              </Box>
              <Heading fontSize={'2xl'} mb={'10px'} textColor={'facebook.800'}>
                Date of Birth
              </Heading>
              <Box
                id='date_of_birth'
                w={'100%'}
                marginBottom={'25px'}
                display={'flex'}
                gap={'10px'}
              >
                <div>
                  <Input
                    type='date'
                    readOnly
                    value={
                      data
                        ? `${
                            data.data.profile?.dateOfBirth
                              ? new Date(data.data.profile?.dateOfBirth)
                                  .toISOString('en-US', {
                                    month: 'long',
                                  })
                                  .split('T')[0] || ''
                              : 'N/A'
                          }`
                        : 'Loading...'
                    }
                  />
                </div>
              </Box>
              <Heading fontSize={'2xl'} mb={'10px'} textColor={'facebook.800'}>
                Place Of Birth
              </Heading>
              <Box
                id='place_of_birth'
                w={'100%'}
                marginBottom={'25px'}
                display={'flex'}
                gap={'10px'}
              >
                <div>
                  <Heading
                    mr={'10px'}
                    display={'inline-block'}
                    fontSize={'large'}
                    fontWeight={'semibold'}
                    mb={'5px'}
                  >
                    City
                  </Heading>
                  <Input
                    readOnly
                    value={
                      data
                        ? data.data.profile
                          ? `${data.data.profile?.placeOfBirth?.city}`
                          : 'N/A'
                        : 'Loading...'
                    }
                  />
                </div>
                <div>
                  <Heading
                    mr={'10px'}
                    display={'inline-block'}
                    fontSize={'large'}
                    fontWeight={'semibold'}
                    mb={'5px'}
                  >
                    Province
                  </Heading>
                  <Input
                    readOnly
                    value={
                      data
                        ? data.data.profile
                          ? `${data.data.profile?.placeOfBirth?.province}`
                          : 'N/A'
                        : 'Loading...'
                    }
                  />
                </div>
                <div>
                  <Heading
                    mr={'10px'}
                    display={'inline-block'}
                    fontSize={'large'}
                    fontWeight={'semibold'}
                    mb={'5px'}
                  >
                    Country
                  </Heading>
                  <Input
                    readOnly
                    value={
                      data
                        ? data.data.profile
                          ? `${data.data.profile?.placeOfBirth?.country}`
                          : 'N/A'
                        : 'Loading...'
                    }
                  />
                </div>
              </Box>
            </Box>

            <Box
              justifyContent={'center'}
              bg={'white'}
              p={'10px'}
              rounded={'10px'}
              shadow={'base'}
              display={'flex'}
              gap={'10px'}
            >
              <Box>
                <Heading fontSize={'2xl'} mb={'10px'} textColor={'facebook.800'}>
                  Gender
                </Heading>
                <Box id='Sex' w={'200px'} marginBottom={'25px'}>
                  <Input
                    readOnly
                    value={
                      data
                        ? data.data.profile
                          ? `${data.data.profile?.sex}`
                          : 'N/A'
                        : 'Loading...'
                    }
                  />
                </Box>
              </Box>
              <Box id='civil_status' w={'200px'} marginBottom={'25px'}>
                <Heading fontSize={'2xl'} mb={'10px'} textColor={'facebook.800'}>
                  Civil Status
                </Heading>
                <Input
                  readOnly
                  value={
                    data
                      ? data.data.profile
                        ? `${data.data.profile?.civilStatus}`
                        : 'N/A'
                      : 'Loading...'
                  }
                />
              </Box>
              <Box id='occupation' w={'200px'} marginBottom={'25px'}>
                <Heading fontSize={'2xl'} mb={'10px'} textColor={'facebook.800'}>
                  Occupation
                </Heading>
                <Input
                  readOnly
                  value={data ? `${data.data.profile?.occupation || 'N/A'}` : 'Loading...'}
                />
              </Box>
              <Box id='citizenship' w={'200px'} marginBottom={'25px'}>
                <Heading fontSize={'2xl'} mb={'10px'} textColor={'facebook.800'}>
                  Citizenship
                </Heading>
                <Input
                  readOnly
                  value={data ? `${data.data.profile?.citizenship || 'N/A'}` : 'Loading...'}
                />
              </Box>
            </Box>
            <Box bg={'white'} p={'10px'} rounded={'10px'} shadow={'base'}>
              <Box display={'flex'} gap={'3'}>
                <Box id='email' w={'200px'} marginBottom={'25px'}>
                  <Heading fontSize={'2xl'} mb={'10px'} textColor={'facebook.800'}>
                    Phone Number
                  </Heading>
                  <Input
                    type='text'
                    readOnly
                    value={data ? `${data.data.profile?.phone_number || 'N/A'}` : 'Loading...'}
                  />
                </Box>
                <Box id='email' w={'200px'} marginBottom={'25px'}>
                  <Heading fontSize={'2xl'} mb={'10px'} textColor={'facebook.800'}>
                    Email
                  </Heading>
                  <Input
                    type='email'
                    readOnly
                    value={data ? `${data.data.profile?.email || 'N/A'}` : 'Loading...'}
                  />
                </Box>
              </Box>
              <Heading fontSize={'2xl'} mb={'10px'} textColor={'facebook.800'}>
                Address
              </Heading>
              <Box id='residency' w={'100%'} marginBottom={'25px'} display={'flex'} gap={'10px'}>
                <div>
                  <Heading
                    fontSize={'large'}
                    fontWeight={'semibold'}
                    mr={'10px'}
                    display={'inline-block'}
                  >
                    House Number
                  </Heading>
                  <Input
                    readOnly
                    value={
                      data ? `${data.data.profile?.address.houseNumber || 'N/A'}` : 'Loading...'
                    }
                  />
                </div>
                <div>
                  <Heading
                    fontSize={'large'}
                    fontWeight={'semibold'}
                    mr={'10px'}
                    display={'inline-block'}
                  >
                    Street
                  </Heading>
                  <Input
                    readOnly
                    value={
                      data ? `${data.data.profile?.address.streetName || 'N/A'}` : 'Loading...'
                    }
                  />
                </div>
                <div>
                  <Heading
                    fontSize={'large'}
                    fontWeight={'semibold'}
                    mr={'10px'}
                    display={'inline-block'}
                  >
                    Subdivision/Purok
                  </Heading>
                  <Input
                    readOnly
                    value={
                      data
                        ? `${data.data.profile?.address.subdivisionPurok || 'N/A'}`
                        : 'Loading...'
                    }
                  />
                </div>
              </Box>
              <Box display={isEditing ? 'flex' : 'none'} gap={'10px'} justifyContent={'end'}>
                <Button colorScheme='green' onClick={() => sendRequest()}>
                  Save
                </Button>
                <Button colorScheme='orange' onClick={() => setIsEditing(false)}>
                  Cancel
                </Button>
              </Box>
            </Box>
          </Flex>
        </Box>
      </Container>
    </>
  )
}

export default ProfileCard
