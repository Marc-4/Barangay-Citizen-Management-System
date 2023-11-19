import { Box, Container, Heading, Image, Flex, Text, Button } from '@chakra-ui/react'

import ProfileCard from '../../components/ProfileCard'
const AdminProfile = () => {
  
  return (
    <>
      <Heading mt={'25px'} textAlign={'center'}>
        Profile Page
      </Heading>
      <Button colorScheme='blue'>
        Profile
      </Button>
      <Button colorScheme='facebook'>
        Transaction History
      </Button>
      <ProfileCard />
    </>
  )
}

export default AdminProfile
