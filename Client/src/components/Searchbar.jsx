import {
  Flex,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react'
import { useState } from 'react'

const Searchbar = ({ entries, page, searchHandler }) => {
  const [query, setQuery] = useState('')

  const handleSearch = () => {
    if (query === '') return
    searchHandler(query)
  }
  return (
    <>
      <Flex gap={'10px'} alignContent={'center'} justifyContent='flex-start'>
        <InputGroup>
          <Input
            w={'300px'}
            h={'50px'}
            pl={'75px'}
            mb={'5px'}
            placeholder='Enter a keyword'
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <InputLeftElement w={'70px'}>
            <Button
              onClick={handleSearch}
              mt={'10px'}
              ml={'5px'}
              size='md'
              colorScheme='facebook'
            >
              Search
            </Button>
          </InputLeftElement>
        </InputGroup>
      </Flex>
    </>
  )
}

export default Searchbar
