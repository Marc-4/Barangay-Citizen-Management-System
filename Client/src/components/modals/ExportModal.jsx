import {
  Modal,
  ModalOverlay,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  Text,
  Heading,
  Box,
  Divider,
  Tabs,
  Tab,
  TabList,
  TabPanels,
  TabPanel,
  Button,
} from '@chakra-ui/react'
import {
  Page,
  Text as PDFText,
  View,
  Document,
  StyleSheet,
} from '@react-pdf/renderer'
import ReactDOM from 'react-dom'

import { useState, useEffect } from 'react'
import callAPI from '../../utils/callAPI'
import Searchbar from '../Searchbar'

const ExportModal = ({ isOpen, onClose, user, onUpdate, role }) => {
  // pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  //   'pdfjs-dist/build/pdf.worker.min.js',
  //   import.meta.url
  // ).toString()

  const styles = StyleSheet.create({
    page: {
      flexDirection: 'row',
      backgroundColor: '#E4E4E4',
    },
    section: {
      margin: 10,
      padding: 10,
      flexGrow: 1,
    },
  })

  const [error, setError] = useState('')
  const [users, setUsers] = useState()
  const [success, setSuccess] = useState('')
  const [numPages, setNumPages] = useState(null)
  const [pageNumber, setPageNumber] = useState(1)
  const [pdfContent, setPdfContent] = useState(null)

  const accountRole = localStorage.getItem('userRole')

  const addToExport = async () => {
    try {
      const route = `http://localhost:3000/api/admin/user/${id}`
      const response = await callAPI(null, 'GET', route)

      if (response.result === 'OK') setUsers(response.payload)
      else setError(response.payload.error)
    } catch (error) {
      console.log(error)
      setError(error)
    }
  }

  const MyDocument = () => (
    <Document>
      <Page size='letter' style={styles.page}>
        <View style={styles.section}>
          <Text>Section #1</Text>
        </View>
        <View style={styles.section}>
          <Text>Section #2</Text>
        </View>
      </Page>
    </Document>
  )

  const handleDownload = () => {
    // Implement download logic here
    // You can use the react-pdf library to generate a blob URL and trigger a download
    // Example: window.open(pdfBlobUrl, '_blank');
  }

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages)
  }

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size={'md'}
        closeOnOverlayClick={false}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Heading>Export Users</Heading>
          </ModalHeader>
          <ModalCloseButton />
          <Divider m={'auto'} borderColor={'brand.100'} w={'90%'} />
          <ModalBody>
            <Text
              fontWeight={'semibold'}
              fontSize={'2xl'}
              color={'tomato'}
              id='error_msg'
              display={error ? 'block' : 'none'}
            >
              {error}
            </Text>
            <Text
              fontWeight={'semibold'}
              fontSize={'2xl'}
              color={'green'}
              id='success_msg'
              display={success ? 'block' : 'none'}
            >
              {success}
            </Text>
            <Box>
              <Tabs>
                <TabList>
                  <Tab>Individual</Tab>
                  <Tab>By Household</Tab>
                </TabList>
                <TabPanels>
                  <TabPanel>
                    <Box>
                      <Searchbar />
                      <Box>
                        <MyDocument />
                      </Box>
                      <Button onClick={handleDownload} mt={4}>
                        Download
                      </Button>
                    </Box>
                  </TabPanel>
                  <TabPanel>2</TabPanel>
                </TabPanels>
              </Tabs>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default ExportModal
