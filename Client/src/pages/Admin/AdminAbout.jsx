import { Flex, Heading, Image, Text, Box } from '@chakra-ui/react'
const AdminAbout = () => {
  return (
    <>
      <Flex
        w={'100%'}
        h={'90vh'}
        flexDir={'column'}
        p={'25px'}
        alignItems={'center'}
        // justifyContent={'center'}
      >
        {/* <Image
          mt={'25px'}
          w={'250px'}
          h={'250px'}
          src='../../barangay2logo.png'
        /> */}
        <Box
          display={'flex'}
          flexDir={'column'}
          alignItems={'center'}
          mt={'200px'}
        >
          <Heading fontSize={'2xl'}>About BRMS</Heading>
          <Text
            fontWeight={'semibold'}
            textAlign={'center'}
            w={'60%'}
            mb={'10px'}
          >
            The Barangay-Management-System (BRMS) is a web-based application
            that aims to streamline and improve the delivery of services to
            citizens of Barangays in the Philippines. It provides a platform for
            citizens to access services online, and for Barangay officials to
            manage their operations more efficiently.
          </Text>
          <Heading fontSize={'2xl'}>Vision</Heading>
          <Text
            fontWeight={'semibold'}
            textAlign={'center'}
            w={'60%'}
            mb={'10px'}
          >
            Our vision is to create a system that is used by all Barangays in
            the city of Malaybalay to deliver high-quality services to their
            citizens.
          </Text>
          <Heading fontSize={'2xl'}>Mission</Heading>
          <Text
            fontWeight={'semibold'}
            textAlign={'center'}
            w={'60%'}
            mb={'10px'}
          >
            To develop and implement an easy to use, efficient, and effective
            management system for barangay 2.
          </Text>
          <Heading fontSize={'2xl'}>Values</Heading>
          <Text fontWeight={'semibold'} textAlign={'center'} w={'60%'}>
            Citizen-Centricity: We believe that the BCMS should be designed and
            implemented with the needs of citizens in mind.
          </Text>
          <Text fontWeight={'semibold'} textAlign={'center'} w={'60%'}>
            Efficiency: We believe that the BRMS should help Barangay officials
            to manage their operations more efficiently.
          </Text>
          <Text fontWeight={'semibold'} textAlign={'center'} w={'60%'}>
            Transparency: We believe that the BRMS should help to increase
            transparency in Barangay government.
          </Text>
        </Box>
      </Flex>
    </>
  )
}

export default AdminAbout
