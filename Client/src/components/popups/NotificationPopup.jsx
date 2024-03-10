import { Box, Heading, Text } from '@chakra-ui/react'
import NotificationCard from '../cards/NotificationCard'
import { motion } from 'framer-motion'
import { Component, forwardRef } from 'react'

const NotificationPopup = forwardRef(
  ({ notifications, isOpen, onNotificationClick, rightOffset }, ref) => {
    const sortedNotifications = [...notifications].sort(
      (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
    )

    return (
      <>
        <Box
          ref={ref}
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
      </>
    )
  }
)

export default NotificationPopup
