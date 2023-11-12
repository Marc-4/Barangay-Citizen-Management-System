import { Heading } from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import { Text, Flex } from '@chakra-ui/react'
import { Link, useNavigate } from 'react-router-dom'

const unauthorized = () => {
  const navigate = useNavigate()
  const [secs, setSecs] = useState(3)

    useEffect(() => {
      const timer = secs > 0 && setTimeout(() => setSecs(secs - 1), 1000)
      return () => clearTimeout(timer)
    }, [secs])

  useEffect(() => {
    if (secs === 0) {
      navigate('/')
    }
  }, [secs])

  return (
    <>
      <Heading>Unauthorized</Heading>
      <Flex>
        <Text mr={'5px'}>Go to </Text>
        <Text color={'brand.500'} textDecor={'underline'}>
          <Link to={'/'}>Home</Link>
        </Text>
      </Flex>
      <Text>Redirecting to home page in {secs}</Text>
    </>
  )
}

export default unauthorized
