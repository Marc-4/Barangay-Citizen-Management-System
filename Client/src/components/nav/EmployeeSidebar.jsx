import {
  Box,
  Heading,
  VStack,
  Text,
  Image,
  Flex,
  Divider,
  Link as ChakraLink,
} from '@chakra-ui/react'
import { MdOutlineMenu } from 'react-icons/md'
import { NavLink } from 'react-router-dom'
import { useState } from 'react'

const EmployeeSidebar = () => {
  return (
    <>
      <Box bg='background.50' minH={'100%'}>
        <Flex
          minW={'250px'}
          justifyContent={'space-between'}
          alignItems={'center'}
        >
          <Box
            display={'flex'}
            ml={'20px'}
            justifyContent={'left'}
            width={'100%'}
          >
            <Image
              alignItems={'center'}
              h={'75px'}
              src='/LOGO.png'
            />
          </Box>
        </Flex>
        <Divider
          borderColor={'brand.100'}
          borderWidth={'1px'}
          w={'90%'}
          m={'auto'}
        />
        <VStack gap={'10px'} pt={'50px'} pb={'50px'} color={'brand.100'}>
          <ChakraLink
            as={NavLink}
            to='/employee/dashboard'
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
            <Text fontSize={'2xl'}>Dashboard</Text>
          </ChakraLink>
          <ChakraLink
            as={NavLink}
            to='/employee/users'
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
            <Text fontSize={'2xl'}>Residents</Text>
          </ChakraLink>
          <ChakraLink
            as={NavLink}
            to='/employee/transactions'
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
            to='/employee/requests'
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
            <Text fontSize={'2xl'}>Requests</Text>
          </ChakraLink>
          <ChakraLink
            as={NavLink}
            to='/employee/about'
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

export default EmployeeSidebar
