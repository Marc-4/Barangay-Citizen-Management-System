import {
  Box,
  Button,
  Flex,
  HStack,
  Heading,
  Image,
  Spacer,
  Text,
  Link,
} from '@chakra-ui/react'
import { Link as rr_link, useNavigate } from 'react-router-dom'
import callAPI from '../../utils/callAPI'

const Navbar = () => {
  const navigate = useNavigate()

  const handleLogout = async () => {
    const route = `http://localhost:3000/api/auth/logout`

    try {
      const response = await callAPI(null, 'POST', route)
      if (response.result === 'OK') {
        sessionStorage.clear()
        navigate('/')
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
      <Flex
        as='nav'
        p={'20px'}
        bg={'brand.400'}
        alignItems={'center'}
        h={'75px'}
      >
        <Heading as={'h1'}>BRMS</Heading>

        <Spacer />

        <HStack gap={'20px'}>
          <Image h={'50px'} w={'50px'}></Image>
          <Link as={rr_link} to={'profile'}>
            <Text>Username</Text>
          </Link>
          <Box>
            <Button onClick={handleLogout} colorScheme='blue'>
              Logout
            </Button>
          </Box>
        </HStack>
      </Flex>
    </>
  )
}

export default Navbar
