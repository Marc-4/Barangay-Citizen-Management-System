import { Outlet } from 'react-router-dom'
import Navbar from '../components/nav/Navbar'
import Sidebar from '../components/nav/UserSidebar'
import { Grid, GridItem } from '@chakra-ui/react'

const UserLayout = () => {
  return (
    <>
      <div style={{ display: 'flex', minHeight: '100vh' }}>
        <Grid templateColumns={'repeat(6, 1fr)'} style={{ flex: 1 }}>
          <GridItem
            id='sidebar'
            colSpan={1}
            style={{ position: 'sticky', top: 0 }}
          >
            <Sidebar />
          </GridItem>

          <GridItem id='content' colSpan={5} bg={'brand.200'}>
            <Navbar />
            <Outlet />
          </GridItem>
        </Grid>
      </div>
    </>
  )
}

export default UserLayout
