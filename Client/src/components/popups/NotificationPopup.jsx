import { Box, Heading, Text } from '@chakra-ui/react'
import NotificationCard from '../cards/NotificationCard'
import { motion, AnimatePresence } from 'framer-motion'
import { Component, forwardRef } from 'react'

const NotificationPopup = forwardRef(
  ({ notifications, isOpen, onNotificationClick, rightOffset }, ref) => {
    const sortedNotifications = [...notifications].sort(
      (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
    )

    const popupVariants = {
      hidden: { opacity: 0, scale: 0, x: '50%', y: '-50%' },
      visible: { opacity: 1, scale: 1, x: '0%', y: '0%', transition: { duration: 0.1 } },
    }

    return (
      <>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              key='notificationPopup'
              ref={ref}
              initial='hidden'
              animate='visible'
              exit='hidden'
              variants={popupVariants}
              transition={{ duration: 0.2 }}
              style={{
                display: 'block',
                position: 'absolute',
                top: '60px',
                right: rightOffset + 145,
                zIndex: 2,
                background: '#f2f2f2',
                padding: '10px',
                borderRadius: '10px',
                overflowY: 'auto',
                overflowX: 'clip',
                minWidth: '400px',
                height: '600px',
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
            </motion.div>
          )}
        </AnimatePresence>
      </>
    )
  }
)

export default NotificationPopup
