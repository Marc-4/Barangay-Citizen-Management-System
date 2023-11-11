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

function RegisterModal({ isOpen, onClose }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [display, setDisplay] = useState('')
  const [secret, setSecret] = useState('')
  const [isLoading, setIsLoading] = useState('')

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
    let route = ''
    if (role === 'Admin') route = 'http://localhost:3000/api/auth/login/admin'
    if (role === 'Employee')
      route = 'http://localhost:3000/api/auth/login/employee'
    if (role === 'User') route = 'http://localhost:3000/api/auth/login/user'

    try {
      if (role === 'User') data = await registerUser(username, password, route)
      if (role === 'Employee')
        data = await registerEmployee(username, password, secret, route)
      if (role === 'Admin')
        data = await registerAdmin(username, password, secret, route)

      if (data.result === 'OK') {
        console.log('OK')
        await new Promise((resolve) => setTimeout(resolve, 2000))
        setSuccess('Successfully Registered!')
        navigate('/')
        // if (role === 'Admin') navigate('/admin/profile')
        // if (role === 'Employee') navigate('/employee/profile')
        // if (role === 'User') navigate('/user/profile')
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
