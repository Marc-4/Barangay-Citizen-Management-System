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
import Pagination from '../pagination'
import 'react-pdf/dist/Page/TextLayer.css'
import 'react-pdf/dist/Page/AnnotationLayer.css'

const ExportModal = ({ isOpen, onClose, onUpdate, role }) => {
  pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`

  const pdfUrls = { ' ': '', single: '/BarangayForms-5.pdf', family: '/BarangayForms-4.pdf' }
  const [pdfUrl, setPdfUrl] = useState('')
  const [numPages, setNumPages] = useState(null)
  const [userList, setUserList] = useState()
  const [selectedUsers, setSelectedUsers] = useState([])
  const [pageNumber, setPageNumber] = useState(1)
  const [type, setType] = useState('')
  const toast = useToast()

  const [error, setError] = useState()
  const [isLoading, setIsLoading] = useState(true)

  const [page, setPage] = useState(1)
  const [entries, setEntries] = useState(20)
  const [userCount, setUserCount] = useState()

  const [refreshCounter, setRefreshCounter] = useState(0)
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

  // useEffect(() => {
  //   setUserList(users)
  // }, [users])

  useEffect(() => {
    getUsers()
    getUsersCount()
    console.log('active user count: ' + userCount)
    console.log(userList)
  }, [page, entries])

  useEffect(() => {
    setUserList(userList)
    setPdfUrl('')
    setSelectedUsers([])
    setType('')
  }, [refreshCounter])

  const getUsersCount = async () => {
    const body = null
    const method = 'GET'
    const route = `http://localhost:3000/api/admin/users?entries=${0}&filter=ACTIVE`
    const route2 = `http://localhost:3000/api/admin/users?entries=ARCHIVED_COUNT&filter=ARCHIVED`

    let activeCount, archivedCount
    try {
      activeCount = await callAPI(body, method, route)
      // archivedCount = await callAPI(body, method, route2)

      if (activeCount.result === 'OK') {
        setUserCount(activeCount.payload)
        setError(null)
      } else setError(data.payload.err)
    } catch (err) {
      console.log(err)
      setError('Connection Error')
    }
  }

  const getUsers = async () => {
    setIsLoading(true)
    const body = null
    const method = 'GET'
    const route = `http://localhost:3000/api/admin/users?page=${page}&entries=${entries}&filter=ACTIVE`

    let data
    try {
      data = await callAPI(body, method, route)
      if (data.result === 'OK') {
        const payload = data.payload
        setUserList(payload)
        setError(null)
      } else setError(data.payload.err)
    } catch (err) {
      console.log(err)
      setError('Connection Error')
    } finally {
      setIsLoading(false)
    }
  }

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages)
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
  const sortColumnAscending = (column) => {
    console.log('sorting asc...')
    users.sort((a, b) => {
      if (column === 'subdivisionPurok') {
        return a.profile.address[column].localeCompare(b.profile.address[column], undefined, {
          sensitivity: 'base',
        })
      } else if (column !== '_id' && column !== 'username' && column !== 'dateOfCreation') {
        // Use case-insensitive comparison
        return a.profile[column].localeCompare(b.profile[column], undefined, {
          sensitivity: 'base',
        })
      } else {
        // Compare directly if column is id or username
        return a[column].localeCompare(b[column], undefined, { sensitivity: 'base' })
      }
    })
  }

  const sortColumnDescending = (column) => {
    console.log('sorting desc...')

    users.sort((a, b) => {
      if (column === 'subdivisionPurok') {
        return b.profile.address[column].localeCompare(a.profile.address[column], undefined, {
          sensitivity: 'base',
        })
      } else if (column !== '_id' && column !== 'username' && column !== 'dateOfCreation') {
        // Use case-insensitive comparison
        return b.profile[column].localeCompare(a.profile[column], undefined, {
          sensitivity: 'base',
        })
      } else {
        // Compare directly if column is id or username
        return b[column].localeCompare(a[column], undefined, { sensitivity: 'base' })
      }
    })
  }

  const resetColumn = () => {
    console.log('resetting column...')
    setUserList([...users])
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} size={'full'} closeOnOverlayClick={false}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader fontSize={'3xl'} fontWeight={'bold'}>
          Export to PDF
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody px={'5rem'} pb={'3rem'}>
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
          <Box display={'flex'} justifyContent={'right'} mr={'.5rem'}>
            <Pagination
              numOfPages={Math.round(Math.max(userCount / entries, 1))}
              page={page}
              setPage={setPage}
              entries={entries}
              setEntries={setEntries}
            />
          </Box>
          <CustomTable
            forFilter
            type={type}
            users={userList}
            selectedUsers={selectedUsers}
            setSelectedUsers={setSelectedUsers}
            sortColumnAsc={sortColumnAscending}
            sortColumnDesc={sortColumnDescending}
            resetColumn={resetColumn}
          />
          <Menu closeOnSelect={false}>
            <MenuButton as={Button} colorScheme='facebook' w={'200px'}>
              Fields to Include
            </MenuButton>
            <MenuList w={'fit-content'}>
              <MenuOptionGroup
                defaultValue={includedFields}
                title='Select Fields: '
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
            <Document file={pdfUrl} onLoadSuccess={onDocumentLoadSuccess}>
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
