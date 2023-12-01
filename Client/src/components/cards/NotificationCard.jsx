import { Card, CardBody, Text, Link } from '@chakra-ui/react'
import { Link as rr_Link } from 'react-router-dom'

const NotificationCard = ({ data }) => {
  return (
    <Link as={rr_Link} to={`/admin/${data.notifType.toLowerCase() + 's'}/${data?.linkID}`}>
      <Card
        direction='row'
        overflow='hidden'
        display={'flex'}
        fontSize={'xl'}
        minW={'1000px'}
        maxW={'1000px'}
        minH={'100px'}
        boxShadow={'md'}
      >
        <CardBody flexDirection={'row'} alignItems={'center'}>
          <Text fontWeight={'semibold'} id='notif_type'>
            {data?.notificationType}
          </Text>
          <Text fontWeight={'semibold'} color={'brand.100'} id='notif_message' ml={2}>
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
