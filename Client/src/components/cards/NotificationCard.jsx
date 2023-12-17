import { Card, CardBody, Text, Link } from '@chakra-ui/react'
import { Link as rr_Link } from 'react-router-dom'
import callAPI from '../../utils/callAPI'

const NotificationCard = ({ data, account_type, onNotificationClick }) => {
  const role = sessionStorage.getItem('userRole')
  const to =
    account_type === 'user' || role === 'user'
      ? data.notifType === 'RQ_ACCEPT' || data.notifType === 'RQ_REJECT'
        ? '/user/profile'
        : `/user/transactions/${data?.linkID}`
      : `/${role}/${data.notifType.toLowerCase() + 's'}/${data?.linkID}`

  const readNotification = async () => {
    try {
      const route = `http://localhost:3000/api/${role}/notification/${data._id}/edit`
      onNotificationClick()
      await callAPI(null, 'PATCH', route)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <Link
      as={rr_Link}
      to={to}
      _hover={{ textDecor: 'none' }}
      onClick={() => readNotification()}
    >
      <Card
        borderRadius={'5px'}
        direction='row'
        overflow='hidden'
        display={'flex'}
        fontSize={'md'}
        w={'450px'}
        minH={'50px'}
        bg={data.status === 'UNREAD' ? 'background.main' : 'background.50'}
        h={'100px'}
        shadow={'none'}
        mb={'5px'}
        // borderBottom={'1px'}
        borderColor={'secondary.main'}
        transition='all 0.2s'
        _hover={{ shadow: 'md', zIndex: '1', backgroundColor: 'blue.200' }}
      >
        <CardBody flexDirection={'row'} alignItems={'center'}>
          <Text fontWeight={'semibold'} id='notif_type'>
            {data?.notificationType}
          </Text>
          <Text
            fontWeight={data.status === 'UNREAD' ? 'bold' : 'medium'}
            color={'brand.100'}
            id='notif_message'
            ml={2}
          >
            {data?.message}
          </Text>
          <Text id='notif_timestamp' ml={'5px'} mt={'10px'}>
            {new Date(data?.timestamp).toLocaleString([], {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </Text>
        </CardBody>
      </Card>
    </Link>
  )
}

export default NotificationCard
