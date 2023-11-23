import {
  Flex,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react'
import { useState } from 'react'

const Searchbar = (entries, page) => {
  const [query, setQuery] = useState()

  const search = async () => {
    const body = null
    const method = 'GET'
    const route = `http://localhost:3000/api/admin/user/search?entries=${entries}`

    let data
    try {
      data = await callAPI(body, method, route)
      setUsers(data.payload)
    } catch (err) {
      console.log(err)
      setError(data.payload.error)
    }
  }

  return (
    <>
      <Flex gap={'10px'} alignContent={'center'} justifyContent='flex-start'>
        <InputGroup>
          <Input
            w={'300px'}
            h={'50px'}
            pl={'75px'}
            placeholder='Enter a keyword'
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <InputLeftElement w={'70px'}>
            <Button mt={'10px'} ml={'5px'} size='md' colorScheme='facebook'>
              Search
            </Button>
          </InputLeftElement>
        </InputGroup>
      </Flex>
    </>
  )
}

export default Searchbar
