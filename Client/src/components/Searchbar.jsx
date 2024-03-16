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
} from '@chakra-ui/react'
import { useState } from 'react'

const Searchbar = ({ entries, page, searchHandler, options }) => {
  const [query, setQuery] = useState('')
  const [firstSearchOptions, setFirstSearchOptions] = useState([
    'username',
    'firstName',
    'middleName',
    'lastName',
    // 'dateOfBirth',
    'placeOfBirth',
  ])
  const [secondSearchOptions, setSecondSearchOptions] = useState([
    'civilStatus',
    'occupation',
    'citizenship',
    'email',
    // 'address',
  ])

  const [sex, setSex] = useState('All')

  const handleSearch = () => {
    console.log([...firstSearchOptions, ...secondSearchOptions, sex])
    if (query === '') return
    const finalArray = [...firstSearchOptions, ...secondSearchOptions]
    searchHandler(query, finalArray, sex)
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
            <Flex>
              <MenuOptionGroup
                defaultValue={firstSearchOptions}
                title='Search For:'
                type='checkbox'
                onChange={(e) => setFirstSearchOptions(e)}
              >
                <MenuItemOption value='username'>Username</MenuItemOption>
                <MenuItemOption value='firstName'>First Name</MenuItemOption>
                <MenuItemOption value='middleName'>Middle Name</MenuItemOption>
                <MenuItemOption value='lastName'>Last Name</MenuItemOption>
                {/* <MenuItemOption value='dateOfBirth'>Date Of Birth</MenuItemOption> */}
                <MenuItemOption value='placeOfBirth'>Place Of Birth</MenuItemOption>
              </MenuOptionGroup>
              <MenuOptionGroup
                defaultValue={secondSearchOptions}
                type='checkbox'
                onChange={(e) => setSecondSearchOptions(e)}
              >
                <Box mt={'39px'} />
                <MenuItemOption value='civilStatus'>Civil Status</MenuItemOption>
                <MenuItemOption value='occupation'>Occupation</MenuItemOption>
                <MenuItemOption value='citizenship'>Citizenship</MenuItemOption>
                <MenuItemOption value='email'>Email</MenuItemOption>
                {/* <MenuItemOption value='address'>Address</MenuItemOption> */}
              </MenuOptionGroup>
            </Flex>
            <MenuOptionGroup
              defaultValue={sex}
              onChange={(e) => setSex(e)}
              title='Gender'
              type='radio'
            >
              <MenuItemOption type='radio' value='All'>
                All
              </MenuItemOption>
              <MenuItemOption type='radio' value='Male'>
                Male
              </MenuItemOption>
              <MenuItemOption type='radio' value='Female'>
                Female
              </MenuItemOption>
            </MenuOptionGroup>
          </MenuList>
        </Menu>
      </Flex>
    </>
  )
}

export default Searchbar
