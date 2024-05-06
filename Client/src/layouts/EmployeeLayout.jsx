import { Outlet } from 'react-router-dom'
import Navbar from '../components/nav/Navbar'
import Sidebar from '../components/nav/EmployeeSidebar'
import { Flex, Button, Grid, GridItem, useDisclosure, Box, IconButton } from '@chakra-ui/react'

const EmployeeLayout = () => {
  const { isOpen, onToggle } = useDisclosure()

  return (
    <>
      <Flex h={'100vh'} flexDir={'column'}>
        <Navbar />
        <Flex h={'100%'}>
          <Flex>
            <Sidebar onToggle={onToggle} isOpen={1} />
          </Flex>
          <Flex w={'100vw'} h={'fit-content'} flexDir={'column'}>
            <Outlet />
          </Flex>
        </Flex>
      </Flex>
    </>
  )
}

export default EmployeeLayout
