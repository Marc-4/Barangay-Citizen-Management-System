import {
  Box,
  Button,
  Container,
  Heading,
  Image,
  Input,
  Text,
  Stack,
  Select,
  Divider,
  useDisclosure,
} from '@chakra-ui/react'
import RegisterModal from '../components/modals/RegisterModal'
import login from '../utils/login'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import { jwtDecode } from 'jwt-decode'

const Home = () => {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('')
  const [cookieRole, setCookieRole] = useState('')
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [isLoading, setIsLoading] = useState('')
  const [error, setError] = useState('')

  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const cookie = Cookies.get('authorization')

    if (cookie) {
      const decodedToken = jwtDecode(cookie)
      setCookieRole(decodedToken.role)
    }
    if (cookie && cookie !== undefined) setIsAuthenticated(true)
  }, [isLoading])

  useEffect(() => {
    if (isAuthenticated) navigate(`/${cookieRole}`)
  }, [isAuthenticated])

  const handleLogin = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      console.log(username)
      const data = await login(
        username,
        password,
        'http://localhost:3000/api/auth/login/' + role
      )

      if (data.result === 'OK') {
        console.log('OK')

        const decodedToken = jwtDecode(data.payload)
        setCookieRole(decodedToken.role)
        if (decodedToken.role === 'admin') {
          navigate('/admin/dashboard')
        }
        if (decodedToken.role === 'employee') {
          navigate('/employee/dashboard')
        }
        if (decodedToken.role === 'user') {
          navigate('/user/profile')
        }
      } else {
        console.log('ERR')
        setError(data.payload.error)
      }
    } catch (error) {
      console.log(error)
      setError('connection error')
    }
    setIsLoading(false)
  }

  return (
    <>
      <Container>
        <Heading mt='30px' p='10px' textAlign={'center'}>
          Home Page
        </Heading>
        <Box>
          <Image></Image>
          <Box
            boxShadow={'lg'}
            p={'10px'}
            rounded={'10px'}
            bg={'brand.400'}
            padding={'25px'}
          >
            <form onSubmit={(e) => handleLogin(e)}>
              <Stack alignItems={'center'}>
                <Input
                  isRequired={true}
                  bg={'brand.200'}
                  name='username'
                  variant={'filled'}
                  maxW={'250px'}
                  placeholder='Username'
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                ></Input>
                <Input
                  isRequired={true}
                  bg={'brand.200'}
                  name='password'
                  variant={'filled'}
                  maxW={'250px'}
                  placeholder='Password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                ></Input>
                <Select
                  name='login-role-select'
                  isRequired={true}
                  onChange={(e) => setRole(e.target.value)}
                  bg={'brand.200'}
                  variant={'filled'}
                  maxW={'150px'}
                  placeholder='Select Role'
                >
                  <option value={'User'}>User</option>
                  <option value={'Employee'}>Employee</option>
                  <option value={'Admin'}>Admin</option>
                </Select>
                <Button
                  w={'250px'}
                  mt={'10px'}
                  isDisabled={isLoading}
                  colorScheme='blue'
                  type='submit'
                >
                  Log in
                </Button>
                <Text color={'tomato'} fontSize={'xl'} fontWeight={'semibold'}>
                  {error}
                </Text>
                <Divider margin={'10px'} borderColor='brand.500' />
                <Button w={'150px'} onClick={onOpen} colorScheme='green'>
                  Register
                </Button>
                <RegisterModal isOpen={isOpen} onClose={onClose} />
              </Stack>
            </form>
          </Box>
        </Box>
      </Container>
    </>
  )
}
export default Home
