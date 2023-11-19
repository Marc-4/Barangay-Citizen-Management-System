import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Text,
  Box,
  Link,
} from '@chakra-ui/react'

const TransactionCard = ({ id, date, time, name, type, status }) => {
  return (
    <>
      <Link>
        <Card
          overflow='hidden'
          display={'flex'}
          fontSize={'xl'}
          minW={'1000px'}
          h={'175px'}
          boxShadow={'md'}
        >
          <CardHeader
            paddingBottom={'0px'}
            display={'flex'}
            justifyContent={'space-between'}
          >
            <Text fontWeight={'bold'} id='tr-id'>
              #{id}
            </Text>
            <Box ml={'auto'} display={'flex'} gap={'5px'}>
              <Text id='date'> {date} </Text>-<Text id='time'>{time}</Text>
            </Box>
          </CardHeader>
          <CardBody textAlign={'left'} pt={'0'} pb={'0'}>
            <Text id='name'>{name}</Text>
            <Text id='type'>{type}</Text>
          </CardBody>
          <CardFooter pt={'0'}>
            <Text fontWeight={'semibold'} id='status'>
              {status}
            </Text>
          </CardFooter>
        </Card>
      </Link>
    </>
  )
}

export default TransactionCard
