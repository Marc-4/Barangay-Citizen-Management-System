import { IconButton } from '@chakra-ui/react'
import { RiRefreshLine } from 'react-icons/ri'

const RefreshButton = ({ refreshCounter, setRefreshCounter }) => {
  const refreshComponent = () => {
    setRefreshCounter((prevCounter) => prevCounter + 1)
  }

  return (
    <>
      <IconButton
        size={'lg'}
        colorScheme='facebook'
        icon={<RiRefreshLine />}
        onClick={refreshComponent}
      />
    </>
  )
}

export default RefreshButton
