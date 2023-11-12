import { Link } from 'react-router-dom'
import { Flex, Heading, Text } from '@chakra-ui/react'
const notFound = () => {
  return (
    <>
      <Heading>Page not Found</Heading>
      <Flex>
        <Text mr={'5px'}>Go to</Text>
        <Text color={'brand.500'} textDecor={'underline'}>
          <Link to={'/'}>home</Link>
        </Text>
      </Flex>
    </>
  )
}

export default notFound
