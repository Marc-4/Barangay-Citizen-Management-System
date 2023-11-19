import { Box, Heading, Text, Divider, Center } from '@chakra-ui/react'
import NotificationCard from '../../components/NotificationCard'
const AdminNotifications = () => {
  return (
    <>
      <Heading
        display={'flex'}
        mt={'25px'}
        mb={'25px'}
        justifyContent={'center'}
      >
        Notifications Page
      </Heading>
      <Divider margin={'auto'} borderColor={'brand.100'} w={'90%'} />
      <Center margin={'10px'} p={'25px'} flexDirection={'column'} gap={'25px'}>
        <NotificationCard
          heading={'Marco S. Ogudrev wants something'}
          text={'the user Marco S. Ogudrev with id 2e1d10d has requested asd'}
          time={'12:35AM'}
        ></NotificationCard>
        <NotificationCard
          heading={'Marco S. Ogudrev wants something'}
          text={'the user Marco S. Ogudrev with id 2e1d10d has requested asd '}
          time={'12:35AM'}
        ></NotificationCard>
      </Center>
    </>
  )
}

export default AdminNotifications
