import {
  Modal,
  Button,
  Text,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalFooter,
  ModalBody,
  Stack,
  Input,
  Select,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import {
  registerUser,
  registerAdmin,
  registerEmployee,
} from '../utils/register'
import login from '../utils/login'
import { useNavigate } from 'react-router-dom'

function RegisterModal({ isOpen, onClose }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [display, setDisplay] = useState('')
  const [secret, setSecret] = useState('')
  const [isLoading, setIsLoading] = useState('')

  const navigate = useNavigate()
  const [role, setRole] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    setDisplay(role === 'User' || role === '' ? 'None' : 'Flex')
  }, [role])

  const handleRegister = async (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsLoading(true)

    let data
    const route = 'hhtp://localhost:3000/api' + role + '/account/register'

    try {
      if (role === 'User') data = await registerUser(username, password, route)
      if (role === 'Employee') data = await registerEmployee(username, password, secret, route)
      if (role === 'Admin') data = await registerAdmin(username, password, secret, route)

      if (data.result === 'OK') {
        console.log('OK')
        setSuccess('Successfully Registered!')

        try {
          await login(
            username,
            password,
            'http://localhost:3000/api/auth/login/' + role
          )
          sessionStorage.setItem('userRole', role)

          navigate('/' + role + '/profile')
        } catch (error) {
          console.log(error)
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
      <Modal size={'sm'} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            fontWeight={'bold'}
            fontSize={'3xl'}
            alignSelf={'center'}
          >
            Register
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={(e) => handleRegister(e)}>
              <Stack alignItems={'center'}>
                <Input
                  isRequired={true}
                  name='username'
                  variant={'filled'}
                  maxW={'250px'}
                  placeholder='Username'
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                ></Input>
                <Input
                  isRequired={true}
                  name='password'
                  colorScheme={'blue'}
                  variant={'filled'}
                  maxW={'250px'}
                  placeholder='Password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                ></Input>
                <Input
                  name='confirm-password'
                  colorScheme={'blue'}
                  variant={'filled'}
                  maxW={'250px'}
                  placeholder='Confirm Password'
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                ></Input>
                <Select
                  name='register-role-select'
                  maxW={'150px'}
                  isRequired={true}
                  onChange={(e) => setRole(e.target.value)}
                  placeholder='Select Role'
                >
                  <option value={'User'}>User</option>
                  <option value={'Employee'}>Employee</option>
                  <option value={'Admin'}>Admin</option>
                </Select>
                <Input
                  display={display}
                  isRequired={role !== 'User'}
                  name='secret'
                  colorScheme={'blue'}
                  variant={'filled'}
                  maxW={'250px'}
                  placeholder='Staff Code'
                  value={secret}
                  onChange={(e) => setSecret(e.target.value)}
                ></Input>
                <Button
                  isDisabled={isLoading}
                  w={'250px'}
                  colorScheme='green'
                  type='submit'
                >
                  Register
                </Button>
                <Text color={'tomato'} fontSize={'xl'} fontWeight={'semibold'}>
                  {error}
                </Text>
                <Text color={'green'} fontSize={'xl'} fontWeight={'semibold'}>
                  {success}
                </Text>
              </Stack>
            </form>
          </ModalBody>

          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default RegisterModal
