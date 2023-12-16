import {
  Box,
  Heading,
  VStack,
  Text,
  IconButton,
  Flex,
  Link as ChakraLink,
} from '@chakra-ui/react'
import { NavLink } from 'react-router-dom'

const UserSidebar = () => {
  return (
    <>
      <Box bg='background.50' minH={'100%'} rounded={'5px'}>
        <Flex
          justifyContent={'space-between'}
          alignItems={'center'}
          color={'text.main'}
        >
          <Box
            display={'flex'}
            ml={'20px'}
            justifyContent={'left'}
            width={'100%'}
          >
            <Heading
              color={'text.main'}
              display={'flex'}
              h={'75px'}
              alignItems={'center'}
            >
              BRMS
            </Heading>
          </Box>
        </Flex>
        <hr style={{ border: '1px solid ', width: '90%', margin: 'auto' }} />
        <VStack gap={'10px'} pt={'50px'} pb={'50px'}>
          <ChakraLink
            as={NavLink}
            to='/user/profile'
            _hover={{
              bg: 'gray.300',
            }}
            _activeLink={{
              fontWeight: 'bold',
              color: 'white',
              backgroundColor: 'primary.main',
            }}
            w={'300px'}
            p={'10px'}
            borderRadius={'25px'}
          >
            <Text fontSize={'2xl'}>Profile</Text>
          </ChakraLink>
          {/* <ChakraLink
            as={NavLink}
            to='/user/notifications'
            _hover={{
              bg: 'gray.300',
            }}
            _activeLink={{
              fontWeight: 'bold',
              color:'white',
              backgroundColor: 'primary.main',
            }}
            w={'300px'}
            p={'10px'}
            borderRadius={'25px'}
          >
            <Text fontSize={'2xl'}>Notifications</Text>
          </ChakraLink> */}
          <ChakraLink
            as={NavLink}
            to='/user/transactions'
            _hover={{
              bg: 'gray.300',
            }}
            _activeLink={{
              fontWeight: 'bold',
              color: 'white',
              backgroundColor: 'primary.main',
            }}
            w={'300px'}
            p={'10px'}
            borderRadius={'25px'}
          >
            <Text fontSize={'2xl'}>Transactions</Text>
          </ChakraLink>
          <ChakraLink
            as={NavLink}
            to='/user/book'
            _hover={{
              bg: 'gray.300',
            }}
            _activeLink={{
              fontWeight: 'bold',
              color: 'white',
              backgroundColor: 'primary.main',
            }}
            w={'300px'}
            p={'10px'}
            borderRadius={'25px'}
          >
            <Text fontSize={'2xl'}>Book Transaction</Text>
          </ChakraLink>
          <ChakraLink
            as={NavLink}
            to='/user/about'
            _hover={{
              bg: 'gray.300',
            }}
            _activeLink={{
              fontWeight: 'bold',
              color: 'white',
              backgroundColor: 'primary.main',
            }}
            w={'300px'}
            p={'10px'}
            borderRadius={'25px'}
          >
            <Text fontSize={'2xl'}>About</Text>
          </ChakraLink>
        </VStack>
      </Box>
    </>
  )
}

export default UserSidebar
