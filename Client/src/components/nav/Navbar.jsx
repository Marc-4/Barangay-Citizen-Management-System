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
import { Link as rr_link } from 'react-router-dom'

const Navbar = () => {
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
            <Button colorScheme='blue'>Logout</Button>{' '}
          </Box>
        </HStack>
      </Flex>
    </>
  )
}

export default Navbar
