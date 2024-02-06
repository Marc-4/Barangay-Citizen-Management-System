import {
  Flex,
  Button,
  Input,
  Text,
  InputGroup,
  InputLeftElement,
  Checkbox,
  Menu,
  MenuButton,
  MenuList,
  MenuOptionGroup,
  MenuItemOption,
  MenuDivider,
} from '@chakra-ui/react'
import { useState } from 'react'

const Searchbar = ({ entries, page, searchHandler }) => {
  const [query, setQuery] = useState('')
  const [searchOptions, setSearchOptions] = useState({
    'Username': true,
    'First Name': true,
    'Middle Name': true,
    'Last Name': true,
  })

  const handleSearch = () => {
    if (query === '') return
    searchHandler(query)
  }
  return (
    <>
      <Flex
        flexDir={'column'}
        alignContent={'center'}
        justifyContent='flex-start'
      >
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
        <Menu closeOnSelect={false}>
          <MenuButton as={Button} colorScheme='facebook'>
            Filters
          </MenuButton>
          <MenuList minWidth='240px'>
            <MenuOptionGroup
              defaultValue={[
                'Username',
                'First Name',
                'Middle Name',
                'Last Name',
              ]}
              title='Search For:'
              type='checkbox'
            >
              <MenuItemOption defaultChecked={true} value='Username'>
                Username
              </MenuItemOption>
              <MenuItemOption value='First Name'>First Name</MenuItemOption>
              <MenuItemOption value='Middle Name'>Middle Name</MenuItemOption>
              <MenuItemOption value='Last Name'>Last Name</MenuItemOption>
            </MenuOptionGroup>
            <MenuDivider />
            <MenuOptionGroup
              defaultValue={['Male', 'Female']}
              title='Gender'
              type='checkbox'
            >
              <MenuItemOption value='Male'>Male</MenuItemOption>
              <MenuItemOption value='Female'>Female</MenuItemOption>
            </MenuOptionGroup>
          </MenuList>
        </Menu>
      </Flex>
    </>
  )
}

export default Searchbar
