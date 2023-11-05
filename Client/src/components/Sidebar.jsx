import {
  Box,
  Heading,
  VStack,
  Text,
} from '@chakra-ui/react'
import { Link } from 'react-router-dom'

const Sidebar = () => {
  return (
    <>
      <Box bg='blue.500' minH={'100vh'}>
        <Heading h={'75px'} display={'inline-block'} margin={'auto'}>
          Sidebar
        </Heading>
        <hr
          style={{ border: '1px solid #DEDCFF', width: '90%', margin: 'auto' }}
        />
        <VStack gap={'50px'} pt={'50px'} pb={'50px'}>
          <Link>
            <Text fontWeight={'semibold'} fontSize={'3xl'} color={'white'}>
              Dashboard
            </Text>
          </Link>
          <Link>
            <Text fontWeight={'semibold'} fontSize={'3xl'} color={'white'}>
              Residents
            </Text>
          </Link>
          <Link>
            <Text fontWeight={'semibold'} fontSize={'3xl'} color={'white'}>
              Employees
            </Text>
          </Link>
          <Link>
            <Text fontWeight={'semibold'} fontSize={'3xl'} color={'white'}>
              Transactions
            </Text>
          </Link>
          <Link>
            <Text fontWeight={'semibold'} fontSize={'3xl'} color={'white'}>
              About
            </Text>
          </Link>
        </VStack>
      </Box>
    </>
  )
}

export default Sidebar
