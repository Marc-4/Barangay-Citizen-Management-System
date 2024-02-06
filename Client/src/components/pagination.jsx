import { Box, Button } from '@chakra-ui/react'
const Pagination = () => {
  return (
    <>
      <Box
        display={'flex'}
        gap={'5px'}
        alignItems={'center'}
        justifyContent={'center'}
      >
        <Button>&lt;&lt;</Button>
        <Button>&lt;</Button>
        <Button borderRadius={'50%'} colorScheme='facebook'>
          1
        </Button>
        <Button borderRadius={'50%'} colorScheme='null' color={'text.main'}>
          2
        </Button>
        <Button borderRadius={'50%'} colorScheme='null' color={'text.main'}>
          3
        </Button>
        <Button>&gt;</Button>
        <Button>&gt;&gt;</Button>
      </Box>
    </>
  )
}

export default Pagination
