import {
  Box,
  Heading,
  VStack,
  Text,
  IconButton,
  Flex,
  Divider,
  Link as ChakraLink,
} from '@chakra-ui/react'
import { MdOutlineMenu } from 'react-icons/md'
import { NavLink } from 'react-router-dom'

const AdminSidebar = () => {
  return (
    <>
      <Box bg='brand.400' minH={'100%'}>
        <Flex
          minW={'250px'}
          justifyContent={'space-between'}
          alignItems={'center'}
          color={'brand.100'}
        >
          <Box
            display={'flex'}
            ml={'20px'}
            justifyContent={'left'}
            width={'100%'}
          >
            <Heading display={'flex'} h={'75px'} alignItems={'center'}>
              Sidebar
            </Heading>
          </Box>
          <IconButton
            variant={'unstyled'}
            fontSize={'4xl'}
            color={'brand.200'}
            icon={<MdOutlineMenu />}
            mr={'12px'}
          ></IconButton>
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
            to='/admin/dashboard'
            _hover={{
              bg: 'gray.300',
            }}
            _activeLink={{
              fontWeight: 'semibold',
              backgroundColor: 'blue.300',
            }}
            w={'300px'}
            p={'10px'}
            borderRadius={'25px'}
          >
            <Text fontSize={'2xl'}>Dashboard</Text>
          </ChakraLink>
          <ChakraLink
            as={NavLink}
            to='/admin/notifications'
            _hover={{
              bg: 'gray.300',
            }}
            _activeLink={{
              fontWeight: 'semibold',
              backgroundColor: 'blue.300',
            }}
            w={'300px'}
            p={'10px'}
            borderRadius={'25px'}
          >
            <Text fontSize={'2xl'}>Notifications</Text>
          </ChakraLink>
          <ChakraLink
            as={NavLink}
            to='/admin/users'
            _hover={{
              bg: 'gray.300',
            }}
            _activeLink={{
              fontWeight: 'semibold',
              backgroundColor: 'blue.300',
            }}
            w={'300px'}
            p={'10px'}
            borderRadius={'25px'}
          >
            <Text fontSize={'2xl'}>Residents</Text>
          </ChakraLink>
          <ChakraLink
            as={NavLink}
            to='/admin/employees'
            _hover={{
              bg: 'gray.300',
            }}
            _activeLink={{
              fontWeight: 'semibold',
              backgroundColor: 'blue.300',
            }}
            w={'300px'}
            p={'10px'}
            borderRadius={'25px'}
          >
            <Text fontSize={'2xl'}>Employees</Text>
          </ChakraLink>
          <ChakraLink
            as={NavLink}
            to='/admin/transactions'
            _hover={{
              bg: 'gray.300',
            }}
            _activeLink={{
              fontWeight: 'semibold',
              backgroundColor: 'blue.300',
            }}
            w={'300px'}
            p={'10px'}
            borderRadius={'25px'}
          >
            <Text fontSize={'2xl'}>Transactions</Text>
          </ChakraLink>
          <ChakraLink
            as={NavLink}
            to='/admin/requests'
            _hover={{
              bg: 'gray.300',
            }}
            _activeLink={{
              fontWeight: 'semibold',
              backgroundColor: 'blue.300',
            }}
            w={'300px'}
            p={'10px'}
            borderRadius={'25px'}
          >
            <Text fontSize={'2xl'}>Requests</Text>
          </ChakraLink>
          <ChakraLink
            as={NavLink}
            to='/admin/about'
            _hover={{
              bg: 'gray.300',
            }}
            _activeLink={{
              fontWeight: 'semibold',
              backgroundColor: 'blue.300',
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

export default AdminSidebar
