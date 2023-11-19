import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Text,
  Box,
  Icon,
  Link,
} from '@chakra-ui/react'

const NotificationCard = ({heading, text, time }) => {
  return (
    <>
      <Link>
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
          <Icon boxSize={'24'}></Icon>
          <CardBody flexDirection={'row'}>
            <Text fontWeight={'semibold'} id='name'>{heading}</Text>
            <Text color={'gray.500'} id='name'>{text}</Text>
            <Text id='type'>{time}</Text>
          </CardBody>
        </Card>
      </Link>
    </>
  )
}

export default NotificationCard
