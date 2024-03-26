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
  TableContainer,
  Table,
  Thead,
  Tbody,
  Th,
  Td,
  Select,
  useToast,
  Toast,
} from '@chakra-ui/react'

import { useState, useEffect } from 'react'
import callAPI from '../../utils/callAPI'
import Searchbar from '../Searchbar'
import { pdfjs, Document, Page } from 'react-pdf'
import { PDFDocument, rgb, rotateInPlace } from 'pdf-lib'
import CustomTable from '../CustomTable'
import RefreshButton from '../RefreshButton'
const ExportModal = ({ isOpen, onClose, users, onUpdate, role }) => {
  // pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  //   'pdfjs-dist/build/pdf.worker.min.js',
  //   import.meta.url
  // ).toString()

  pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`

  const pdfUrls = { ' ': '', single: '/BarangayForms-5.pdf', family: '/BarangayForms-4.pdf' }
  const [pdfUrl, setPdfUrl] = useState('')
  const [numPages, setNumPages] = useState(null)
  const [userList, setUserList] = useState(users)
  const [pageNumber, setPageNumber] = useState(1)
  const toast = useToast()
  const [refreshCounter, setRefreshCounter] = useState(0)

  useEffect(() => {
    setUserList(users)
  }, [users])

  useEffect(() => {
    setUserList(users)
  }, [refreshCounter])

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages)
  }

  const goToPreviousPage = () => {
    setPageNumber((prevPage) => Math.max(prevPage - 1, 1))
  }

  const goToNextPage = () => {
    setPageNumber((prevPage) => Math.min(prevPage + 1, numPages))
  }

  const handlePageInputChange = (event) => {
    const newPageNumber = parseInt(event.target.value, 10)
    if (!isNaN(newPageNumber) && newPageNumber >= 1 && newPageNumber <= numPages) {
      setPageNumber(newPageNumber)
    }
  }

  const populatePdfWithData = async (templatePdfBytes, userData) => {
    const pdfDoc = await PDFDocument.load(templatePdfBytes)
    const form = pdfDoc.getForm()

    // Access fields in the PDF form and set values based on user data
    form.getTextField('userName').setText(userData.name)
    form.getTextField('userEmail').setText(userData.email)
    // Add more fields as needed

    const modifiedPdfBytes = await pdfDoc.save()
    return modifiedPdfBytes
  }

  const renderPdfWithUserData = async () => {
    try {
      const templatePdfBytes = await fetch(pdfUrl).then((res) => res.arrayBuffer())
      const modifiedPdfBytes = await populatePdfWithData(templatePdfBytes, userData)

      // Convert modified PDF bytes to a Blob and create a URL for rendering
      const modifiedPdfBlob = new Blob([modifiedPdfBytes], { type: 'application/pdf' })
      const modifiedPdfUrl = URL.createObjectURL(modifiedPdfBlob)

      setPdfUrl(modifiedPdfUrl)
    } catch (error) {
      console.error('Error populating PDF with user data:', error)
    }
  }

  const filterTable = async (query, values, sex) => {
    const route = `http://localhost:3000/api/admin/users/search?query=${query}&params=${values}&sex=${sex}`
    const method = 'GET'

    try {
      const response = await callAPI(null, method, route)

      if (response.result == 'OK') {
        console.log(response.payload)
        setUserList(response.payload)
      } else {
        toast({
          title: 'error',
          description: 'Connection Error. Please try again.',
          status: 'error',
          duration: '5000',
          isClosable: 'true',
          position: 'bottom-right',
        })
      }
    } catch (error) {
      toast({
        title: 'error',
        description: error,
        status: 'error',
        duration: '5000',
        isClosable: 'true',
        position: 'bottom-right',
      })
    }
  }

  // useEffect(() => {
  //   if (userList) {
  //     renderPdfWithUserData()
  //   }
  // }, [userList])

  return (
    <Modal isOpen={isOpen} onClose={onClose} size={'6xl'} closeOnOverlayClick={false}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader fontSize={'3xl'} fontWeight={'bold'}>
          Export to PDF
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box display={'flex'} gap={'25px'}>
            <Searchbar forFilter searchHandler={filterTable} />
            <RefreshButton refreshCounter={refreshCounter} setRefreshCounter={setRefreshCounter} />
            <Select
              w={'200px'}
              placeholder='Select Type of PDF'
              onChange={(e) => {
                setPdfUrl(pdfUrls[e.target.value])
              }}
            >
              <option value='single'>Single</option>
              <option value='family'>Family</option>
            </Select>
          </Box>

          <CustomTable forFilter users={userList} />
          <Document
            rotate={pdfUrl == '/BarangayForms-4.pdf' ? 90 : 0}
            file={pdfUrl}
            onLoadSuccess={onDocumentLoadSuccess}
          >
            <Page pageNumber={pageNumber} />
          </Document>
          {pdfUrl != '' && pdfUrl != null && (
            <Box>
              <p>
                Page {pageNumber} of {numPages}
              </p>
              <Button onClick={goToPreviousPage} disabled={pageNumber === 1}>
                Previous Page
              </Button>
              <Button onClick={goToNextPage} disabled={pageNumber === numPages}>
                Next Page
              </Button>
              <Text>Go to Page:</Text>
              <input
                type='number'
                value={pageNumber}
                onChange={handlePageInputChange}
                min={1}
                max={numPages}
              />
            </Box>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default ExportModal
