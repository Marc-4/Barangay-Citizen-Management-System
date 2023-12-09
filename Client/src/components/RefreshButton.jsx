import { IconButton } from '@chakra-ui/react'
import { RiRefreshLine } from 'react-icons/ri'

const RefreshButton = () => {

  const refreshPage = () => {
    window.location.reload()
  }

  return (
    <>
      <IconButton
        size={'lg'}
        colorScheme='facebook'
        icon={<RiRefreshLine />}
        onClick={() => refreshPage()}
      />
    </>
  )
}

export default RefreshButton
