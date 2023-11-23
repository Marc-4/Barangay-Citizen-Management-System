import { Card, CardFooter, CardBody, Link, Text } from '@chakra-ui/react'
import { Link as rr_Link } from 'react-router-dom'
const NotificationDetailCard = ({ data }) => {
  return (
    <>
      <Card>
        <CardBody>
          <Text>{data && data.message}</Text>
          Open the {data.notifType.toLowerCase() + ' '}
          <Link
            color={'brand.500'}
            as={rr_Link}
            to={`/admin/${data.notifType.toLowerCase() + 's'}/${data._id}`}
          >
            here
          </Link>
          .
        </CardBody>
        <CardFooter>
          <Text>
            On {new Date(data.timestamp).toLocaleDateString()}
            {' ' + new Date(data.timestamp).toLocaleTimeString()}
          </Text>
        </CardFooter>
      </Card>
    </>
  )
}

export default NotificationDetailCard
