import { Outlet } from 'react-router-dom'
import Navbar from '../components/nav/Navbar'
import Sidebar from '../components/nav/EmployeeSidebar'
import { Grid, GridItem } from '@chakra-ui/react'

const EmployeeLayout = () => {
  return (
    <>
      <Grid templateColumns={'repeat(5, 1fr)'}>
        <GridItem colSpan={1}>
          <Sidebar />
        </GridItem>

        <GridItem colSpan={4} bg={'brand.200'}>
          <Navbar />
          <Outlet />
        </GridItem>
      </Grid>
    </>
  )
}

export default EmployeeLayout
