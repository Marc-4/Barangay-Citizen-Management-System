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
} from '@chakra-ui/react'

import { useState, useEffect } from 'react'
import callAPI from '../../utils/callAPI'
import Searchbar from '../Searchbar'
import { pdfjs, Document, Page } from 'react-pdf'
import { PDFDocument, rgb } from 'pdf-lib'
const ExportModal = ({ isOpen, onClose, user, onUpdate, role }) => {
  // pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  //   'pdfjs-dist/build/pdf.worker.min.js',
  //   import.meta.url
  // ).toString()

  pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`
  const [pdfUrl, setPdfUrl] = useState('/BarangayForms.pdf')
  const [numPages, setNumPages] = useState(null)
  const [pageNumber, setPageNumber] = useState(1)
  const [userData, setUserData] = useState(null)
  const accountRole = localStorage.getItem('userRole')

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
      const templatePdfBytes = await fetch('/BarangayForms.pdf').then((res) => res.arrayBuffer())
      const modifiedPdfBytes = await populatePdfWithData(templatePdfBytes, userData)

      // Convert modified PDF bytes to a Blob and create a URL for rendering
      const modifiedPdfBlob = new Blob([modifiedPdfBytes], { type: 'application/pdf' })
      const modifiedPdfUrl = URL.createObjectURL(modifiedPdfBlob)

      setPdfUrl(modifiedPdfUrl)
    } catch (error) {
      console.error('Error populating PDF with user data:', error)
    }
  }

  useEffect(() => {
    if (userData) {
      renderPdfWithUserData()
    }
  }, [userData])

  return (
    <Modal isOpen={isOpen} onClose={onClose} size={'2xl'} closeOnOverlayClick={false}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Export to PDF</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Document file={pdfUrl} onLoadSuccess={onDocumentLoadSuccess}>
            <Page pageNumber={pageNumber} />
          </Document>
          <p>
            Page {pageNumber} of {numPages}
          </p>
          <Box>
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
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default ExportModal
