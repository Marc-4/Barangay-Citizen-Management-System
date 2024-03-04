import { Box, Heading, Text } from '@chakra-ui/react'
import NotificationCard from '../cards/NotificationCard'
import { motion } from 'framer-motion'

const NotificationPopup = ({ notifications, isOpen, onNotificationClick, rightOffset }) => {
  const sortedNotifications = [...notifications].sort(
    (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
  )

  return (
    <>
      {/* <motion.div
        initial={{ height: 0, zIndex: 1, translateY: -100 }}
        animate={{
          height: isOpen ? '600px' : 0,
          zIndex: isOpen ? 1 : 0,
          translateY: isOpen ? 270 : -100,
        }}
        transition={{ type: 'spring' }}
      > */}
        <Box
          display={isOpen ? 'block' : 'none'}
          p={'10px'}
          zIndex={2}
          bg={'background.50'}
          h={'600px'}
          minW={'400px'}
          borderRadius={'10px'}
          overflowY={'auto'}
          overflowX={'clip'}
          position={'absolute'}
          top={'60px'}
          right={rightOffset + 145}
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
            <Text fontWeight={'semibold'} fontSize={'xl'} mt={'25px'} textAlign={'center'}>
              No notifications found
            </Text>
          )}
        </Box>
      {/* </motion.div> */}
    </>
  )
}

export default NotificationPopup
