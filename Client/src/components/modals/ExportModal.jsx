import {
  Modal,
  ModalOverlay,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  Text,
  Box,
  Button,
  Select,
  useToast,
  Toast,
  MenuList,
  MenuOptionGroup,
  MenuItemOption,
  Menu,
  MenuButton,
  Flex,
} from '@chakra-ui/react'

import { useState, useEffect } from 'react'
import callAPI from '../../utils/callAPI'
import Searchbar from '../Searchbar'
import { pdfjs, Document, Page } from 'react-pdf'
import { View } from '@react-pdf/renderer'
import { PDFDocument, rgb, rotateInPlace } from 'pdf-lib'
import CustomTable from '../CustomTable'
import RefreshButton from '../RefreshButton'
import { drawPDF4, drawPDF5 } from '../../utils/drawPdfText'

const ExportModal = ({ isOpen, onClose, users, onUpdate, role }) => {
  pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`

  const pdfUrls = { ' ': '', single: '/BarangayForms-5.pdf', family: '/BarangayForms-4.pdf' }
  const [pdfUrl, setPdfUrl] = useState('')
  const [numPages, setNumPages] = useState(null)
  const [userList, setUserList] = useState(users)
  const [selectedUsers, setSelectedUsers] = useState([])
  const [pageNumber, setPageNumber] = useState(1)
  const [type, setType] = useState('')
  const toast = useToast()
  const [refreshCounter, setRefreshCounter] = useState(0)
  const [pdfText, setPdfText] = useState('')
  const [includedFields, setIncludedFields] = useState([
    'name',
    'dateOfBirth',
    'sex',
    'civilStatus',
    'occupation',
    'citizenship',
    'placeOfBirth',
    'address',
  ])

  useEffect(() => {
    setUserList(users)
  }, [users])

  useEffect(() => {
    setUserList(users)
    setPdfUrl('')
    setSelectedUsers([])
    setType('')
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
  // render data to pdf try using react-pdf
  const populate = async () => {
    let bytes = await fetch(pdfUrls.single).then((res) => res.arrayBuffer())
    const singlePDF = await PDFDocument.load(bytes)
    bytes = await fetch(pdfUrls.family).then((res) => res.arrayBuffer())
    const familyPDF = await PDFDocument.load(bytes)
    try {
      const existingPdfBytes = await fetch(pdfUrl).then((res) => res.arrayBuffer())
      const pdfDoc = await PDFDocument.load(existingPdfBytes)
      let copiedPages

      if (type == 'single') copiedPages = await pdfDoc.copyPages(singlePDF, [0])
      else copiedPages = await pdfDoc.copyPages(familyPDF, [0])

      const [page] = copiedPages

      pdfDoc.removePage(0)
      pdfDoc.addPage(page)

      if (type == 'single') drawPDF4(pdfDoc, selectedUsers[0], includedFields)
      else drawPDF5(pdfDoc, selectedUsers, includedFields)

      const modifiedPdfBytes = await pdfDoc.save()
      const modifiedPdfBlob = new Blob([modifiedPdfBytes], { type: 'application/pdf' })
      // Create a URL for the modified PDF blob
      const modifiedPdfUrl = URL.createObjectURL(modifiedPdfBlob)
      setPdfUrl(modifiedPdfUrl)
    } catch (error) {
      console.log('Error populating pdf', error)
      toast({
        title: 'error',
        description: 'make sure you have selected a pdf type and at least 1 user.',
        status: 'error',
        duration: '3000',
        isClosable: 'true',
        position: 'bottom-right',
      })
    }
  }

  useEffect(() => {
    console.log('included fields:', includedFields)
  }, [includedFields])

  const downloadPdf = async () => {
    try {
      const existingPdfBytes = await fetch(pdfUrl).then((res) => res.arrayBuffer())

      // Create a blob from the modified PDF bytes
      const blob = new Blob([existingPdfBytes], { type: 'application/pdf' })

      // Download the blob as a PDF file
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'BarangayForm.pdf'
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
    } catch (error) {
      console.error('Error downloading PDF:', error)
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} size={'full'} closeOnOverlayClick={false}>
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
              value={type}
              onChange={(e) => {
                setType(e.target.value)
                setPdfUrl(pdfUrls[e.target.value])
              }}
            >
              <option value='single'>Single</option>
              <option value='family'>Family</option>
            </Select>
          </Box>

          <CustomTable
            forFilter
            type={type}
            users={userList}
            selectedUsers={selectedUsers}
            setSelectedUsers={setSelectedUsers}
          />
          <Menu closeOnSelect={false}>
            <MenuButton as={Button} colorScheme='facebook' w={'200px'}>
              Filters
            </MenuButton>
            <MenuList w={'fit-content'}>
              <MenuOptionGroup
                defaultValue={includedFields}
                title='fields to include'
                type='checkbox'
                onChange={(e) => setIncludedFields(e)}
              >
                <MenuItemOption value='name'>name</MenuItemOption>

                <MenuItemOption value='dateOfBirth'>date of birth</MenuItemOption>
                <MenuItemOption value='placeOfBirth'>place of birth</MenuItemOption>
                <MenuItemOption value='sex'>sex</MenuItemOption>

                <MenuItemOption value='civilStatus'>civil status</MenuItemOption>
                <MenuItemOption value='citizenship'>citizenship</MenuItemOption>
                <MenuItemOption value='occupation'>occupation</MenuItemOption>
                <MenuItemOption value='address'>address</MenuItemOption>
              </MenuOptionGroup>
            </MenuList>
          </Menu>
          <Box mt={'10px'}>
            <Button onClick={populate} colorScheme='facebook'>
              Populate PDF
            </Button>
          </Box>
          <Box
            display={'flex'}
            flexDir={'column'}
            w={'100%'}
            justifyContent={'center'}
            alignItems={'center'}
          >
            <Document
              file={pdfUrl}
              onLoadSuccess={onDocumentLoadSuccess}
            >
              <Page pageNumber={pageNumber} scale={1.5} />
            </Document>
            <Box>
              {pdfUrl && (
                <Button onClick={downloadPdf} colorScheme='blue'>
                  Download PDF
                </Button>
              )}
            </Box>
          </Box>
          {/* {pdfUrl != '' && pdfUrl != null && (
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
          )} */}
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default ExportModal
