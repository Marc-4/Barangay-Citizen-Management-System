import { Outlet } from 'react-router-dom'
import Navbar from '../components/nav/Navbar'
import Sidebar from '../components/nav/AdminSidebar'
import { Flex, Button, Grid, GridItem, useDisclosure, Box, IconButton } from '@chakra-ui/react'

const AdminLayout = () => {
  const { isOpen, onToggle } = useDisclosure()

  return (
    <>
      <Flex h={'100vh'} flexDir={'column'}>
        <Navbar />
        <Flex h={'100%'}>
          <Flex>
            <Sidebar onToggle={onToggle} isOpen={1} />
          </Flex>
          <Flex ml={'17rem'} mt={'5rem'} w={'100vw'} h={'fit-content'} flexDir={'column'}>
            <Outlet />
          </Flex>
        </Flex>
      </Flex>
      {/* <div
        style={{ display: 'flex', minHeight: '100vh', flexDirection: 'column' }}
      >
        <Grid
          templateColumns={'repeat(18, 1fr)'}
          style={{ flex: 1 }}
          bg={'gray'}
        >
          <GridItem
            id='sidebar'
            colSpan={isOpen ? 2 : 1}
            style={{
              position: 'sticky',
              top: 0,
            }}
          >
            <Sidebar onToggle={onToggle} isOpen={isOpen} />
          </GridItem>
          <GridItem
            id='content'
            colSpan={isOpen ? 16 : 17}
            bg={'background.main'}
          >
            <Navbar />
            <Outlet />
          </GridItem>
        </Grid>
      </div> */}
    </>
  )
}

export default AdminLayout
