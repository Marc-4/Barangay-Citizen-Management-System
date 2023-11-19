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
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { register } from '../../utils/register'
import login from '../../utils/login'
import { useNavigate } from 'react-router-dom'

function RegisterModal({ isOpen, onClose }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isLoading, setIsLoading] = useState('')

  const navigate = useNavigate()
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleRegister = async (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsLoading(true)

    if (!checkConfirmPassword()) {
      setIsLoading(false)
      return setError('passwords does not match')
    }

    let data
    const route = 'hhtp://localhost:3000/api/user/account/register'

    try {
      data = await register(username, password, route)

      if (data.result === 'OK') {
        console.log('OK')
        setSuccess('Successfully Registered!')

        try {
          await login(
            username,
            password,
            'http://localhost:3000/api/auth/login/user'
          )
          sessionStorage.setItem('userRole', 'user')

          navigate('/user/profile')
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

  const checkConfirmPassword = () => {
    if (password !== confirmPassword) return false

    return true
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
                  isRequired={true}
                  name='confirm-password'
                  colorScheme={'blue'}
                  variant={'filled'}
                  maxW={'250px'}
                  placeholder='Confirm Password'
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
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
