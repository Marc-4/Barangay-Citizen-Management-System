import {
  Box,
  Button,
  Flex,
  HStack,
  Heading,
  Image,
  Spacer,
  Text,
} from '@chakra-ui/react'

const Navbar = () => {
  return (
    <>
      <Flex
        as='nav'
        p={'10px'}
        bg={'gray.200'}
        alignItems={'center'}
        h={'75px'}
      >
        <Heading as={'h1'}>BRMS</Heading>

        <Spacer />

        <HStack gap={'20px'}>
          <Image h={'50px'} w={'50px'}></Image>
          <Text>Username</Text>
          <Box>
            <Button colorScheme='blue'>Logout</Button>{' '}
          </Box>
        </HStack>
      </Flex>
    </>
  )
}

export default Navbar
