import { VStack, Box, Heading, Divider, Text, Input, Textarea, Button } from '@chakra-ui/react'
import { Buffer } from 'buffer'
import { Document, Page, pdfjs } from 'react-pdf'


const TransactionContentCard = ({ title, data, profile }) => {
  pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.js',
    import.meta.url
  ).toString()

  const revertBase64 = (Buf) => {
    let base64String = Buffer.from(Buf).toString('base64')

    return `data:application/pdf;base64,${base64String}`
  }

  const handleDownload = () => {
    if (data?.attachment) {
      const base64String = Buffer.from(data.attachment.data).toString('base64')
      const pdfBlob = new Blob([Buffer.from(base64String, 'base64')], {
        type: 'application/pdf',
      })

      const url = URL.createObjectURL(pdfBlob)

      const a = document.createElement('a')
      a.href = url
      a.download = 'download.pdf'
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)

      // Optionally, revoke the Object URL to free up resources
      // URL.revokeObjectURL(url);
    }
  }

  return (
    <>
      <VStack spacing={4} align='start'>
        <Box
          minW={'600px'}
          id='profile_details'
        
          pl={'10px'}
          p={'25px'}
          rounded={'10px'}
          bg={'gray.300'}
          textColor={'brand.100'}
        >
          <Box
            w={'100%'}
            alignItems={'center'}
            justifyContent={'center'}
            display={'flex'}
            gap={'10px'}
            mb={'15px'}
          >
            <Heading textAlign={'center'} fontSize={'2xl'}>
              {title}
            </Heading>
          </Box>

          <Divider w='100%' borderColor={'brand.100'} marginBottom={'25px'} />
          <Box>
            <Text fontWeight='bold'>Purpose:</Text>

            <Textarea
              value={data?.purpose}
              isReadOnly={true}
              borderColor={'primary.main'}
              _hover={{ borderColor: 'secondary.main' }}
            />
          </Box>
          <Box>
            
            {/* <Box display={'flex'} gap={'5px'}>
              <Text fontWeight='bold'>Cost:</Text>
              <Text>{data?.cost || 'N/A'}</Text>
            </Box>
            <Box display={'flex'} gap={'5px'}>
              <Text fontWeight='bold'>Income:</Text>
              <Text>{data?.income || 'N/A'}</Text>
            </Box> */}
          </Box>
          {/* <Box>
            <Text fontWeight='bold'>Attachments:</Text>

            {data?.attachment ? (
              <VStack w={'100%'} overflow={'auto'}>
                <Document file={revertBase64(data.attachment.data)}>
                  <Page pageNumber={1} style={{ width: '100%' }} />
                </Document>
                <Button
                  onClick={() => handleDownload()}
                  colorScheme='facebook'
                  mt={'15px'}
                  alignSelf={'center'}
                >
                  Download
                </Button>
              </VStack>
            ) : (
              'No attachment'
            )}
          </Box> */}
        </Box>
      </VStack>
    </>
  )
}

export default TransactionContentCard
