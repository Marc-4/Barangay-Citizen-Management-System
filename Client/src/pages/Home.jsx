import {
  Box,
  Button,
  Container,
  Heading,
  Input,
  Text,
  Stack,
  Select,
  Divider,
  useDisclosure,
  Image,
} from '@chakra-ui/react'
import parseToken from '../utils/parseJWT'
// import RegisterModal from '../components/modals/RegisterModal'
import login from '../utils/login'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'

const Home = () => {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('')
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [isLoading, setIsLoading] = useState('')
  const [error, setError] = useState('')
  const sessionRole = localStorage.getItem('userRole')

  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const user = Cookies.get('authorization')
    if (user && user !== undefined) setIsAuthenticated(true)
  }, [isLoading])

  useEffect(() => {
    if (isAuthenticated) navigate(`${sessionRole}`)
  }, [isAuthenticated])

  const handleLogin = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const data = await login(
        username,
        password,
        `${import.meta.env.VITE_API_URL}/api/auth/login/` + role
      )

      if (data.result === 'OK') {
        console.log('OK')
        console.log(data)

        const token = Cookies.get('authorization')
        if (token) {
          const decodedToken = parseToken(token)

          switch (decodedToken.role) {
            case 'admin':
              navigate('/admin/dashboard')
              break
            case 'employee':
              navigate('/employee/dashboard')
              break
            case 'user':
              navigate('/user/dashboard')
              break

            default:
              setError('Invalid User Role')
          }
          localStorage.setItem('userRole', decodedToken.role)
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
        <Box display={'flex'} m={'25px'} alignItems={'center'} color={'primary.main'}>
          <Heading p='10px' textAlign={'center'} fontSize={'4xl'}>
            Welcome
          </Heading>
          <Heading
            p='10px'
            textAlign={'center'}
            // padding={'10px'}
            fontSize={'4xl'}
          >
            to
          </Heading>
          <Image w={'200px'} src='/LOGO.png' />
        </Box>
        <Box>
          <Box boxShadow={'lg'} p={'10px'} rounded={'10px'} bg={'background.50'} padding={'25px'}>
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
                  type='password'
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
                  <option value={'Employee'}>Employee</option>
                  <option value={'Admin'}>Admin</option>
                </Select>
                <Button
                  w={'250px'}
                  mt={'10px'}
                  isDisabled={isLoading}
                  isLoading={isLoading}
                  colorScheme='blue'
                  type='submit'
                >
                  Log in
                </Button>
                <Text color={'tomato'} fontSize={'xl'} fontWeight={'semibold'}>
                  {error}
                </Text>
                {/* <Divider margin={'10px'} borderColor='brand.500' />
                <Button w={'150px'} onClick={onOpen} colorScheme='green'>
                  Register
                </Button> */}
                {/* <RegisterModal isOpen={isOpen} onClose={onClose} /> */}
              </Stack>
            </form>
          </Box>
        </Box>
      </Container>
    </>
  )
}
export default Home
