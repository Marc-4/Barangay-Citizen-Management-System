// import { useState, useEffect } from 'react'
// import { useParams } from 'react-router-dom'
// import {
//   Text,
//   Box,
//   HStack,
//   VStack,
//   Button,
//   Flex,
//   Card,
//   CardFooter,
// } from '@chakra-ui/react'
// import callAPI from '../../utils/callAPI'
// import NotificationDetailCard from '../cards/NotificationDetailCard'
// const GenNotification = () => {
//   const { id } = useParams()
//   const [notificationData, setNotificationData] = useState()
//   const [error, setError] = useState(null)

//   useEffect(() => {
//     getNotification()
//   }, [])

//   const getNotification = async () => {
//     try {
//       const method = 'GET'
//       const route = `${import.meta.env.VITE_API_URL}/api/admin/notification/${id}`
//       const response = await callAPI(null, method, route)

//       console.log(response)
//       if (response.result === 'OK') {
//         setError(null)
//         setNotificationData(response.payload)
//       } else setError(response.payload.error)
//     } catch (err) {
//       console.log(err)
//       setError('Error fetching Notification Data')
//     }
//   }

//   return (
//     <Flex mt={'100px'}  justifyContent={'center'}>
//       <Box borderRadius={'10px'} maxW={'1000px'} padding={'25px'}>
//         {error && (
//           <Text
//             fontSize={'2xl'}
//             color={'tomato'}
//             fontWeight={'semibold'}
//             textAlign={'center'}
//           >
//             {error}
//           </Text>
//         )}
//         {notificationData && (
//           <>
//             <HStack spacing={4} align='start'>
//               <NotificationDetailCard data={notificationData} />
//             </HStack>
//           </>
//         )}
//       </Box>
//     </Flex>
//   )
// }

// export default GenNotification
