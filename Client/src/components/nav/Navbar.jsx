import {
  Box,
  Button,
  Flex,
  HStack,
  Heading,
  Image,
  Spacer,
  Text,
  Link,
  IconButton,
} from '@chakra-ui/react'
import { Link as rr_link, useNavigate } from 'react-router-dom'
import callAPI from '../../utils/callAPI'
import { IoIosNotifications } from 'react-icons/io'
import { useEffect, useState } from 'react'
import NotificationPopup from '../popups/NotificationPopup'
import { Buffer } from 'buffer'

const Navbar = () => {
  const navigate = useNavigate()
  const [notifications, setNotifications] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [image, setImage] = useState()
  const [username, setUsername] = useState()
  const [error, setError] = useState(null)
  const [refreshCounter, setRefreshCounter] = useState(0)
  const [toggleOpen, setToggleOpen] = useState(false)
  const role = sessionStorage.getItem('userRole')

  const revertBase64 = (imageBuf) => {
    let base64String = Buffer.from(imageBuf).toString('base64')

    return `data:image/png;base64,${base64String}`
  }

  const handleLogout = async () => {
    const route = `http://localhost:3000/api/auth/logout`

    try {
      const response = await callAPI(null, 'POST', route)
      if (response.result === 'OK') {
        sessionStorage.clear()
        navigate('/')
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getNotifications()
    getUser()
  }, [refreshCounter])

  const getUser = async () => {
    try {
      const route = `http://localhost:3000/api/${role}/account`
      const response = await callAPI(null, 'GET', route)

      if (response.result === 'OK') {
        setImage(response.payload.profile?.profilePhoto)
        setUsername(response.payload.username)
      }
    } catch (error) {
      console.log(error)
      setError('Connection Error')
    }
  }

  const getNotifications = async () => {
    setIsLoading(true)
    try {
      const route = `http://localhost:3000/api/${role}/notifications?entries=20`
      const response = await callAPI(null, 'GET', route)

      if (response.result === 'OK') {
        setError(null)
        setNotifications(response.payload)
      } else setError(response.payload.error)
    } catch (err) {
      console.log(err)
      setError('Error fetching Notifications')
    } finally {
      setIsLoading(false)
    }
  }

  const handleNotificationClick = () => {
    setToggleOpen(false)
  }

  return (
    <>
      <Flex
        as='nav'
        p={'20px'}
        bg={'background.50'}
        alignItems={'center'}
        h={'75px'}
      >
        <Spacer />

        <HStack gap={'20px'}>
          <NotificationPopup
            notifications={notifications}
            isOpen={toggleOpen}
            onNotificationClick={handleNotificationClick}
          />
          <IconButton
            onClick={() => {
              setToggleOpen(!toggleOpen)
              setRefreshCounter((prevCounter) => prevCounter + 1)
            }}
            color={'primary.main'}
            fontSize={'30px'}
            icon={<IoIosNotifications />}
          />
          <Link as={rr_link} to={'profile'}>
            <Box
              flexDirection={'row'}
              display={'flex'}
              alignItems={'center'}
              gap={'5px'}
            >
              <Image
                border={'2px'}
                borderColor={'secondary.main'}
                borderRadius={'25px'}
                fallbackSrc={'https://via.placeholder.com/250'}
                w={'50px'}
                h={'50px'}
                objectFit={'cover'}
                src={image ? revertBase64(image.data) : ''}
              ></Image>
              <Text fontWeight={'semibold'} fontSize={'xl'}>
                {username}
              </Text>
            </Box>
          </Link>
          <Box>
            <Button onClick={handleLogout} colorScheme='facebook'>
              Logout
            </Button>
          </Box>
        </HStack>
      </Flex>
    </>
  )
}

export default Navbar
