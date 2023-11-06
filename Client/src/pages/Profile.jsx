import {
  Box,
  Container,
  Heading,
  Image,
  Flex,
  Text,
  Card,
  CardHeader,
  SimpleGrid,
} from '@chakra-ui/react'

const profile = () => {
  return (
    <>
      <Container maxW={'1000px'} padding={'25px'} textColor={'brand.100'}>
        <Heading textAlign={'center'}>Profile Page</Heading>
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
          <Text fontSize={'3xl'} fontWeight={'semibold'}>Marc Kenneth S. Verdugo</Text>
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
          <Flex pl={'10px'} justify={'space-between'} wrap={'wrap'} >
            <Box bg={'brand.400'} p={'10px'} rounded={'10px'}>
              <Box id='name' w={'250px'} marginBottom={'25px'}>
                <Heading fontSize={'2xl'}>Name</Heading>
                <Heading
                  mr={'10px'}
                  display={'inline-block'}
                  fontSize={'large'}
                  fontWeight={'semibold'}
                >
                  First Name:
                </Heading>
                <Text display={'inline-block'}>Marc Kenneth</Text>
                <Heading
                  mr={'10px'}
                  display={'inline-block'}
                  fontSize={'large'}
                  fontWeight={'semibold'}
                >
                  Last Name:
                </Heading>
                <Text display={'inline-block'}>Verdugo</Text>
                <Heading
                  mr={'10px'}
                  display={'inline-block'}
                  fontSize={'large'}
                  fontWeight={'semibold'}
                >
                  Middle Name:
                </Heading>
                <Text display={'inline-block'}>Sioquim</Text>
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
                <Text display={'inline-block'}>February</Text> <br />
                <Heading
                  mr={'10px'}
                  display={'inline-block'}
                  fontSize={'large'}
                  fontWeight={'semibold'}
                >
                  Day:
                </Heading>
                <Text display={'inline-block'}>18</Text> <br />
                <Heading
                  mr={'10px'}
                  display={'inline-block'}
                  fontSize={'large'}
                  fontWeight={'semibold'}
                >
                  Year:
                </Heading>
                <Text display={'inline-block'}>2001</Text>
              </Box>
              <Box id='place_of_birth' w={'200px'} marginBottom={'25px'}>
                <Heading fontSize={'2xl'}>Place Of Birth</Heading>
                <Text>Apple Valley CA</Text>
              </Box>
            </Box>
            <Box bg={'brand.400'} p={'10px'} rounded={'10px'}>
              <Box id='Sex' w={'200px'} marginBottom={'25px'}>
                <Heading fontSize={'2xl'}>Sex</Heading>
                <Text>Male</Text>
              </Box>
              <Box id='civil_status' w={'200px'} marginBottom={'25px'}>
                <Heading fontSize={'2xl'}>Civil Status</Heading>
                <Text>Single</Text>
              </Box>
              <Box id='occupation' w={'200px'} marginBottom={'25px'}>
                <Heading fontSize={'2xl'}>Occupation</Heading>
                <Text>Student</Text>
              </Box>
              <Box id='citizenship' w={'200px'} marginBottom={'25px'}>
                <Heading fontSize={'2xl'}>Citizenship</Heading>
                <Text>Filipino</Text>
              </Box>
            </Box>
            <Box bg={'brand.400'} p={'10px'} rounded={'10px'}>
              <Box id='email' w={'200px'} marginBottom={'25px'}>
                <Heading fontSize={'2xl'}>E-mail</Heading>
                <Text>blaze.verdugo.s@gmail.com</Text>
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
                <Text display={'inline-block'}>1</Text> <br />
                <Heading
                  fontSize={'large'}
                  fontWeight={'semibold'}
                  mr={'10px'}
                  display={'inline-block'}
                >
                  Street:
                </Heading>
                <Text display={'inline-block'}>WWII heroes street</Text> <br />
                <Heading
                  fontSize={'large'}
                  fontWeight={'semibold'}
                  mr={'10px'}
                  display={'inline-block'}
                >
                  Subdivision/Purok:
                </Heading>
                <Text display={'inline-block'}>purok 2</Text> <br />
              </Box>
            </Box>
          </Flex>
        </Box>
        <SimpleGrid
          id='transactions'
          textAlign={'center'}
          spacing={'4'}
          bg={'brand.400'}
          p={'10px'}
          rounded={'10px'}
          
        >
          <Heading color={'brand.500'}>Transactions</Heading>
          <Card>
            <CardHeader>Transaction 1 </CardHeader>
          </Card>
          <Card>
            <CardHeader>Transaction 2</CardHeader>
          </Card>
        </SimpleGrid>
      </Container>
    </>
  )
}

export default profile
