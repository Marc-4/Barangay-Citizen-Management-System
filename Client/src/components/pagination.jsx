  import { Box, Button } from '@chakra-ui/react'
  const Pagination = ({ numOfPages, page, setPage }) => {
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
            width={'40px'}  // Set a fixed width
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
        </Box>
      </>
    )
  }

  export default Pagination
