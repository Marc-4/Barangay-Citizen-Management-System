import { Box, Heading, Text } from '@chakra-ui/react'
import NotificationCard from '../cards/NotificationCard'

const NotificationPopup = ({ notifications, isOpen, onNotificationClick }) => {
  const sortedNotifications = [...notifications].sort(
    (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
  )
  
  return (
    <>
      <Box
        display={isOpen ? 'block' : 'none'}
        zIndex={2}
        p={'10px'}
        bg={'background.50'}
        h={'600px'}
        minW={'400px'}
        borderRadius={'10px'}
        overflowY={'auto'}
        overflowX={'clip'}
        position={'absolute'}
        top={'60px'}
        right={'265px'}
        css={{
          '::-webkit-scrollbar': {
            width: '1px',
          },
        }}
      >
        <Heading textColor={'text.main'}>Notifications</Heading>
        {notifications.length !== 0 ? (
          sortedNotifications.map((notification) => (
            <NotificationCard
              key={notification._id}
              data={notification}
              onNotificationClick={onNotificationClick}
            />
          ))
        ) : (
          <Text
            fontWeight={'semibold'}
            fontSize={'xl'}
            mt={'25px'}
            textAlign={'center'}
          >
            No notifications found
          </Text>
        )}
      </Box>
    </>
  )
}

export default NotificationPopup
