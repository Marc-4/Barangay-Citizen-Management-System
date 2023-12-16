import {
  VStack,
  Box,
  Heading,
  Divider,
  Text,
  Input,
  Textarea,
} from '@chakra-ui/react'
import { Buffer } from 'buffer'
import { Document, Page, pdfjs } from 'react-pdf'
import 'react-pdf/dist/Page/TextLayer.css'
import 'react-pdf/dist/Page/AnnotationLayer.css'

const TransactionContentCard = ({ title, data, profile }) => {
  pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.js',
    import.meta.url
  ).toString()
  const revertBase64 = (Buf) => {
    let base64String = Buffer.from(Buf).toString('base64')

    return `data:application/pdf;base64,${base64String}`
  }

  return (
    <>
      <VStack spacing={4} align='start'>
        <Box
          minW={'500px'}
          id='profile_details'
          marginTop={'25px'}
          marginBottom={'25px'}
          pl={'10px'}
          p={'25px'}
          rounded={'10px'}
          bg={'gray.300'}
          textColor={'brand.100'}
        >
          <Heading textAlign={'center'} fontSize={'2xl'} marginBottom={'25px'}>
            {title}
          </Heading>
          <Divider w='100%' borderColor={'brand.100'} marginBottom={'25px'} />
          <Box>
            <Text fontWeight='bold'>Purpose:</Text>

            <Textarea value={data?.purpose} isReadOnly={true} />
          </Box>
          <Box>
            {data?.income ? (
              <Box>
                <Text fontWeight='bold'>Income:</Text>
                <Text>{data?.income}</Text>
              </Box>
            ) : (
              ''
            )}
            <Box display={'flex'} gap={'5px'}>
              <Text fontWeight='bold'>Cost:</Text>
              <Text>{data?.cost}</Text>
            </Box>
          </Box>
          <Box>
            <Text fontWeight='bold'>Attachments:</Text>

            {data?.attachment ? (
              <Document file={revertBase64(data.attachment.data)}>
                <Page pageNumber={1} style={{ width: '100%' }} />
              </Document>
            ) : (
              'No attachment'
            )}
          </Box>
        </Box>
      </VStack>
    </>
  )
}

export default TransactionContentCard
