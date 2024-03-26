import {
  Flex,
  Button,
  Input,
  Text,
  Box,
  InputGroup,
  InputLeftElement,
  Checkbox,
  Menu,
  MenuButton,
  MenuList,
  MenuOptionGroup,
  MenuItemOption,
  MenuDivider,
  Divider,
} from '@chakra-ui/react'
import { useState } from 'react'

const transactionSearchbar = ({ entries, page, searchHandler, options }) => {
  const [query, setQuery] = useState('')
  const initialParams = ['requestor', 'type']
  const [searchParams, setSearchParams] = useState(['requestor', 'type'])

  const handleSearch = () => {
    console.log([...searchParams])
    if (query === '') return
    const finalArray = [...searchParams]
    searchHandler(query, finalArray)
  }
  return (
    <>
      <Flex flexDir={'column'} alignContent={'center'} justifyContent='flex-start'>
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
          onChange
          <InputLeftElement w={'70px'}>
            <Button onClick={handleSearch} mt={'10px'} ml={'5px'} size='md' colorScheme='facebook'>
              Search
            </Button>
          </InputLeftElement>
        </InputGroup>
        <Menu closeOnSelect={false}>
          <MenuButton as={Button} colorScheme='facebook'>
            Filters
          </MenuButton>
          <MenuList minWidth='240px' zIndex={2}>
            <MenuOptionGroup
              defaultValue={searchParams}
              title='Search For:'
              type='checkbox'
              onChange={(e) => setSearchParams(e)}
            >
              {initialParams.map((option) => {
                return (
                  <MenuItemOption key={option} value={option}>
                    {option}
                  </MenuItemOption>
                )
              })}
            </MenuOptionGroup>
      
          </MenuList>
        </Menu>
      </Flex>
    </>
  )
}

export default transactionSearchbar
