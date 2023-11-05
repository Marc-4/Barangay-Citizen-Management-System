import {
  Box,
  Button,
  Container,
  Heading,
  Image,
  Input,
  Stack,
  Text,
  flexbox,
} from '@chakra-ui/react'

const Login = () => {
  return (
    <>
      <Container>
        <Heading mt='30px' p='10px' textAlign={'center'}>
          Login Page
        </Heading>
        <Box>
          <Image></Image>
          <Box p={'10px'} rounded={'10px'} bg={'gray.50'} padding={'50px'}>
            <Stack alignItems={'center'}>
              <Input

                variant={'filled'}
                maxW={'250px'}
                placeholder='Username'
              ></Input>
              <Input
                colorScheme={'blue'}
                variant={'filled'}
                maxW={'250px'}
                placeholder='Password'
              ></Input>
              <Button colorScheme='blue'>Login</Button>
            </Stack>
          </Box>
        </Box>
      </Container>
    </>
  )
}

export default Login
