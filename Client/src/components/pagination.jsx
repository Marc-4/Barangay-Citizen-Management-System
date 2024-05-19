import { Box, Button, Input, Select, Text } from '@chakra-ui/react'
import { useEffect } from 'react'
const Pagination = ({ numOfPages, page, setPage, entries, setEntries }) => {
  useEffect(() => {
    console.log('page:' + page)
    console.log('num Of Pages: ' + numOfPages)
  }, [page])

  useEffect(() => {
    setPage(1)
  }, [entries])

  const goToPage = (page) => {
    setPage(page)
  }

  const nextPage = () => {
    setPage(Math.min(page + 1, numOfPages))
  }

  const firstPage = () => {
    setPage(1)
  }

  const prevPage = () => {
    setPage(Math.max(page - 1, 1))
  }

  const lastPage = () => {
    setPage(numOfPages)
  }

  const renderPageButtons = () => {
    const buttons = []
    for (let curPage = 1; curPage <= numOfPages; curPage++) {
      buttons.push(
        <Button
          key={curPage}
          borderRadius={'50%'}
          colorScheme={curPage === page ? 'facebook' : 'null'}
          color={curPage === page ? 'white' : 'text.main'}
          onClick={() => goToPage(curPage)}
          width={'40px'} // Set a fixed width
          height={'40px'}
        >
          {curPage}
        </Button>
      )
    }
    return (
      <>
        <Button onClick={firstPage}>&lt;&lt;</Button>
        <Button onClick={prevPage}>&lt;</Button>
        {buttons}
        <Button onClick={nextPage}>&gt;</Button>
        <Button onClick={lastPage}>&gt;&gt;</Button>
      </>
    )
  }

  return (
    <>
      <Box
        display={'flex'}
        flexWrap={'wrap'}
        gap={'5px'}
        alignItems={'center'}
        justifyContent={'center'}
      >
        {renderPageButtons()}
        <Select
          w={'80px'}
          defaultValue={entries}
          // value={entries}
          onChange={(e) => {
            setEntries(e.target.value)
          }}
        >
          {/* <option value='1'>1</option>
          <option value='3'>3</option>
          <option value='20'>10</option> */}
          <option value='20'>20</option>
          <option value='50'>50</option>
          <option value='100'>100</option>
        </Select>
      </Box>
    </>
  )
}

export default Pagination
