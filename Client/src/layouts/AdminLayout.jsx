import { Outlet } from 'react-router-dom'
import Navbar from '../components/nav/Navbar'
import Sidebar from '../components/nav/AdminSidebar'
import { Grid, GridItem } from '@chakra-ui/react'

const AdminLayout = () => {
  return (
    <>
      <Grid templateColumns={'repeat(5, 1fr)'}>
        <GridItem colSpan={1}>
          <Sidebar />
        </GridItem>

        <GridItem colSpan={4} bg={'gray.50'}>
          <Navbar />
          <Outlet />
        </GridItem>
      </Grid>
    </>
  )
}

export default AdminLayout
