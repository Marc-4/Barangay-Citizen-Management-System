import { Box, Image, Text } from '@chakra-ui/react'

const profile = () => {
  return (
    <>
      <p>Profile Page</p>
      <Box>
        <Image w={'50px'} h={'50px'} />
        <Box id='profile_details'>
          <Box id='name'>
            <label style={{fontSize:'24px', fontWeight:'bold'}} >First Name</label>
            <Text>Marc Kenneth</Text>
            <label style={{fontSize:'24px', fontWeight:'bold'}}>Last Name</label>
            <Text>Verdugo</Text>
            <label style={{fontSize:'24px', fontWeight:'bold'}}>Middle Name</label>
            <Text>Sioquim</Text>
          </Box>
          <Box id='date_of_birth'>
            <label style={{fontSize:'24px', fontWeight:'bold'}}>Month</label>
            <Text>February</Text>
            <label style={{fontSize:'24px', fontWeight:'bold'}}>Day</label>
            <Text>18</Text>
            <label style={{fontSize:'24px', fontWeight:'bold'}}>Year</label>
            <Text>2001</Text>
          </Box>
          <Box id='place_of_birth'>
            <label style={{fontSize:'24px', fontWeight:'bold'}}>Place of Birth</label>
            <Text>Apple Valley CA</Text>
          </Box>
          <Box id='Sex'>
            <label style={{fontSize:'24px', fontWeight:'bold'}}>Sex</label>
            <Text>yes please</Text>
          </Box>
          <Box id='civil_status'>
            <label style={{fontSize:'24px', fontWeight:'bold'}}>Civil Status</label>
            <Text>Single</Text>
          </Box>
          <Box id='occupation'>
            <label style={{fontSize:'24px', fontWeight:'bold'}}>Occupation</label>
            <Text>Student</Text>
          </Box>
          <Box id='citizenship'>
            <label style={{fontSize:'24px', fontWeight:'bold'}}>Citizenship</label>
            <Text>Filipino</Text>
          </Box>
          <Box id='email'>
            <label style={{fontSize:'24px', fontWeight:'bold'}}>E-mail</label>
            <Text>blaze.verdugo.s@gmail.com</Text>
          </Box>
          <Box id='residency'>
            <label style={{fontSize:'24px', fontWeight:'bold'}}>House Number</label>
            <Text>1</Text>
            <label style={{fontSize:'24px', fontWeight:'bold'}}>Street</label>
            <Text>WWII heroes street</Text>
            <label style={{fontSize:'24px', fontWeight:'bold'}}>Subdivision/Purok</label>
            <Text>purok 2</Text>
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default profile
