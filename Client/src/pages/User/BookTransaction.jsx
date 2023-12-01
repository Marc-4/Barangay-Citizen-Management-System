import { Card, CardBody, CardHeader, Stack, Center } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
const BookTransaction = () => {
  return (
    <>
      <Center>
        <Stack
          mt={'25px'}
          spacing={4}
          direction='column'
          w={'1000px'}
          pl={'25px'}
        >
          <Link style={{ width: '100%' }} to={'barangay_certification'}>
            <Card borderColor={'brand.100'} height='125px'>
              <CardHeader
                pt={'10px'}
                pb={'10px'}
                fontWeight={'bold'}
                fontSize={'2xl'}
              >
                Barangay Certification
              </CardHeader>
              <CardBody pt={'0px'} pb={'10px'} fontSize={'lg'}>
                A Barangay Certification serves as a confirmation or
                verification of specific information about an individual or a
                particular circumstance within the jurisdiction of the Barangay.
              </CardBody>
            </Card>
          </Link>
          <Link style={{ width: '100%' }} to={'barangay_clearance'}>
            <Card height='125px'>
              <CardHeader
                pt={'10px'}
                pb={'10px'}
                fontWeight={'bold'}
                fontSize={'2xl'}
              >
                Barangay Clearance
              </CardHeader>
              <CardBody pt={'0px'} pb={'0px'} fontSize={'lg'}>
                A Barangay Clearance is an official document issued by the
                Barangay certifying that a person is of good moral character and
                is cleared of any obligations or liabilities to the community.
              </CardBody>
            </Card>
          </Link>
          <Link style={{ width: '100%' }} to={'community_tax_certificate'}>
            <Card height='125px'>
              <CardHeader
                pt={'10px'}
                pb={'10px'}
                fontWeight={'bold'}
                fontSize={'2xl'}
              >
                Community Tax Certificate (Cedula)
              </CardHeader>
              <CardBody pt={'0px'} pb={'10px'} fontSize={'lg'}>
                A Community Tax Certificate (CTC), commonly known as "cedula,"
                is a mandatory document issued to individuals as proof that they
                have paid the community tax, which is a local tax imposed by the
                municipal or city government.
              </CardBody>
            </Card>
          </Link>
          <Link style={{ width: '100%' }} to={'barangay_records'}>
            <Card height='125px'>
              <CardHeader
                pt={'10px'}
                pb={'10px'}
                fontWeight={'bold'}
                fontSize={'2xl'}
              >
                Barangay Records/Documents
              </CardHeader>
              <CardBody pt={'0px'} pb={'10px'} fontSize={'lg'}>
                Barangay records and documents are official papers that the
                barangay keeps. These documents contain information ranging from
                the barangay's residents, what the barangay is doing, and how it
                is spending its funds.
              </CardBody>
            </Card>
          </Link>
          <Link style={{ width: '100%' }} to={'certificate_of_residency'}>
            <Card height='125px'>
              <CardHeader
                pt={'10px'}
                pb={'10px'}
                fontWeight={'bold'}
                fontSize={'2xl'}
              >
                Certificate of Residency
              </CardHeader>
              <CardBody pt={'0px'} pb={'10px'} fontSize={'lg'}>
                A Certificate of Residency is an official document issued by the
                Barangay certifying that an individual resides in a the
                afforementioned barangay.
              </CardBody>
            </Card>
          </Link>
          <Link style={{ width: '100%' }} to={'business_clearance'}>
            <Card height='125px'>
              <CardHeader
                pt={'10px'}
                pb={'10px'}
                fontWeight={'bold'}
                fontSize={'2xl'}
              >
                Business Clearance
              </CardHeader>
              <CardBody pt={'0px'} pb={'10px'} fontSize={'lg'}>
                This clearance signifies that the business owner has obtained
                the necessary approval from their local community and has
                complied with all the barangay's rules and regulations.
              </CardBody>
            </Card>
          </Link>
        </Stack>
      </Center>
    </>
  )
}

export default BookTransaction
