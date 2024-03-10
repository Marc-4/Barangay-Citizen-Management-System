import {
  Box,
  Heading,
  VStack,
  Text,
  Image,
  Button,
  Flex,
  Divider,
  Link as ChakraLink,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Slide,
  CloseButton,
  Icon,
  Spacer,
} from '@chakra-ui/react'
import {
  MdOutlineMenu,
  MdSettings,
  MdDashboard,
  MdQuestionMark,
} from 'react-icons/md'
import { CiLogout } from 'react-icons/ci'
import { HiDocument, HiClipboardDocumentList } from 'react-icons/hi2'
import { FaUser } from 'react-icons/fa'
import { BsFillPersonBadgeFill } from 'react-icons/bs'
import { NavLink } from 'react-router-dom'

const AdminSidebar = ({ onToggle, isOpen }) => {
  return (
    <>
      {/* <Slide in={isOpen} direction={'left'}> */}
      <Box bg='background.50' h={'100%'} w={'300px'}>
        <Flex
          minW={'210px'}
          justifyContent={'space-between'}
          alignItems={'center'}
        >
          <Box
            display={'flex'}
            ml={'25px'}
            justifyContent={'left'}
            width={'100%'}
          ></Box>
          {/* <CloseButton m={'5px'} mt={'10px'} onClick={onToggle} /> */}
        </Flex>
        <VStack
          gap={'10px'}
          pl={'15px'}
          pt={'25px'}
          pb={'25px'}
          alignItems={'left'}
          color={'brand.100'}
        >
          <ChakraLink
            as={NavLink}
            to='/admin/dashboard'
            _hover={{
              bg: 'gray.300',
            }}
            _activeLink={{
              fontWeight: 'bold',
              color: 'white',
              backgroundColor: 'primary.main',
            }}
            alignItems={'left'}
            w={'265px'}
            p={'5px'}
            pt={'10px'}
            pb={'10px'}
            borderRadius={'10px'}
          >
            <Box display={'flex'} alignItems={'center'}>
              <Icon as={MdDashboard} boxSize={'25px'} mr={'10px'} />
              <Text fontSize={'xl'}>Dashboard</Text>
            </Box>
          </ChakraLink>
          <ChakraLink
            as={NavLink}
            to='/admin/users'
            _hover={{
              bg: 'gray.300',
            }}
            _activeLink={{
              fontWeight: 'bold',
              color: 'white',
              backgroundColor: 'primary.main',
            }}
            alignItems={'left'}
            w={'265px'}
            p={'5px'}
            pt={'10px'}
            pb={'10px'}
            borderRadius={'10px'}
          >
            <Box display={'flex'} alignItems={'center'}>
              <Icon as={FaUser} boxSize={'25px'} mr={'10px'} />
              <Text fontSize={'xl'}>Residents</Text>
            </Box>
          </ChakraLink>
          <ChakraLink
            as={NavLink}
            to='/admin/employees'
            _hover={{
              bg: 'gray.300',
            }}
            _activeLink={{
              fontWeight: 'bold',
              color: 'white',
              backgroundColor: 'primary.main',
            }}
            alignItems={'left'}
            w={'265px'}
            p={'5px'}
            pt={'10px'}
            pb={'10px'}
            borderRadius={'10px'}
          >
            <Box display={'flex'} alignItems={'center'}>
              <Icon as={BsFillPersonBadgeFill} boxSize={'25px'} mr={'10px'} />
              <Text fontSize={'xl'}>Employees</Text>
            </Box>
          </ChakraLink>
          <ChakraLink
            as={NavLink}
            to='/admin/transactions'
            _hover={{
              bg: 'gray.300',
            }}
            _activeLink={{
              fontWeight: 'bold',
              color: 'white',
              backgroundColor: 'primary.main',
            }}
            alignItems={'left'}
            w={'265px'}
            p={'5px'}
            pt={'10px'}
            pb={'10px'}
            borderRadius={'10px'}
          >
            <Box display={'flex'} alignItems={'center'}>
              <Icon as={HiDocument} boxSize={'25px'} mr={'10px'} />
              <Text fontSize={'xl'}>Transactions</Text>
            </Box>
          </ChakraLink>
          {/* <ChakraLink
            as={NavLink}
            to='/admin/requests'
            _hover={{
              bg: 'gray.300',
            }}
            _activeLink={{
              fontWeight: 'bold',
              color: 'white',
              backgroundColor: 'primary.main',
            }}
            alignItems={'left'}
            w={'265px'}
            p={'5px'}
            pt={'10px'}
            pb={'10px'}
            borderRadius={'10px'}
          >
            <Box display={'flex'} alignItems={'center'}>
              <Icon as={HiClipboardDocumentList} boxSize={'25px'} mr={'10px'} />
              <Text fontSize={'xl'}>Requests</Text>
            </Box>
          </ChakraLink> */}
          <ChakraLink
            as={NavLink}
            to='/admin/about'
            _hover={{
              bg: 'gray.300',
            }}
            _activeLink={{
              fontWeight: 'bold',
              color: 'white',
              backgroundColor: 'primary.main',
            }}
            alignItems={'left'}
            w={'265px'}
            p={'5px'}
            pt={'10px'}
            pb={'10px'}
            borderRadius={'10px'}
          >
            <Box display={'flex'} alignItems={'center'}>
              <Icon as={MdQuestionMark} boxSize={'25px'} mr={'10px'} />
              <Text fontSize={'xl'}>About</Text>
            </Box>
          </ChakraLink>
        </VStack>

        <Divider borderColor={'blackAlpha.400'} mb={'25px'} />

        {/* <Button
          _hover={{
            bg: 'gray.300',
          }}
          p={'5px'}
          w={'265px'}
          ml={'15px'}
          pt={'25px'}
          pb={'25px'}
          display={'flex'}
          textAlign={'left'}
          borderRadius={'10px'}
          alignItems={'center'}
          justifyContent={'left'}
        >
          <Icon as={CiLogout} boxSize={'25px'} mr={'10px'} />
          <Text fontSize={'xl'}>Logout</Text>
        </Button> */}
      </Box>
      {/* </Slide> */}
    </>
  )
}

export default AdminSidebar
