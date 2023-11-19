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
import { useState } from 'react'

function AdminModal({ isOpen, onClose }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Admin Login</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack alignItems={'center'}>
              <Input
                name='username'
                variant={'filled'}
                maxW={'250px'}
                placeholder='Username'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              ></Input>
              <Input
                name='password'
                colorScheme={'blue'}
                variant={'filled'}
                maxW={'250px'}
                placeholder='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></Input>
              <Button colorScheme='blue' type='submit'>
                Login
              </Button>
              <Text color={'tomato'} fontSize={'xl'} fontWeight={'semibold'}>
                {error}
              </Text>
            </Stack>
          </ModalBody>

          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default AdminModal
