import { Card, CardBody, Text, Link } from '@chakra-ui/react'
import { Link as rr_Link } from 'react-router-dom'

const NotificationCard = ({ data, account_type }) => {
  console.log(data)
  const to =
    account_type === 'user'
      ? data.notifType === 'RQ_ACCEPT' || data.notifType === 'RQ_REJECT'
        ? '/user/profile'
        : `/user/transactions/${data?.linkID}`
      : `/admin/${data.notifType.toLowerCase() + 's'}/${data?.linkID}`
  return (
    <Link as={rr_Link} to={to} _hover={{ textDecor: 'none' }}>
      <Card
        direction='row'
        overflow='hidden'
        display={'flex'}
        fontSize={'xl'}
        w={'1000px'}
        minH={'100px'}
        bg={'white'}
        h={'125px'}
        shadow={'none'}
        borderBottom={'2px'}
        borderColor={'brand.400'}
        transition='all 0.2s'
        _hover={{ shadow: 'md', zIndex: '1' }}
      >
        <CardBody flexDirection={'row'} alignItems={'center'}>
          <Text fontWeight={'semibold'} id='notif_type'>
            {data?.notificationType}
          </Text>
          <Text
            fontWeight={'semibold'}
            color={'brand.100'}
            id='notif_message'
            ml={2}
          >
            {data?.message}
          </Text>
          <Text id='notif_timestamp' ml={'5px'} mt={'10px'}>
            {new Date(data?.timestamp).toLocaleDateString()}
            {' ' + new Date(data?.timestamp).toLocaleTimeString()}
          </Text>
        </CardBody>
      </Card>
    </Link>
  )
}

export default NotificationCard
