import {
  Box,
  Heading,
  VStack,
  Text,
  IconButton,
  Flex,
} from '@chakra-ui/react'
import { MdOutlineMenu } from 'react-icons/md'
import { Link } from 'react-router-dom'

const EmployeeSidebar = () => {
  return (
    <>
      <Box bg='brand.300' minH={'100vh'} rounded={'5px'}>
        <Flex
          justifyContent={'space-between'}
          alignItems={'center'}
          color={'brand.200'}
        >
          <Box display={'flex'} justifyContent={'center'} width={'100%'}>
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
        <hr
          style={{ border: '1px solid #DEDCFF', width: '90%', margin: 'auto' }}
        />
        <VStack gap={'50px'} pt={'50px'} pb={'50px'}>
          <Link to={'/employee/dashboard'}>
            <Text fontWeight={'semibold'} fontSize={'3xl'} color={'white'}>
              Dashboard
            </Text>
          </Link>
          <Link to={'/employee/notifications'}>
            <Text fontWeight={'semibold'} fontSize={'3xl'} color={'white'}>
              Notifications
            </Text>
          </Link>
          <Link to={'/employee/users'}>
            <Text fontWeight={'semibold'} fontSize={'3xl'} color={'white'}>
              Residents
            </Text>
          </Link>
          <Link to={'/employee/transactions'}>
            <Text fontWeight={'semibold'} fontSize={'3xl'} color={'white'}>
              Transactions
            </Text>
          </Link>
          <Link to={'/employee/about'}>
            <Text fontWeight={'semibold'} fontSize={'3xl'} color={'white'}>
              About
            </Text>
          </Link>
        </VStack>
      </Box>
    </>
  )
}

export default EmployeeSidebar
