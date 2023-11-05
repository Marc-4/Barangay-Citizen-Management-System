import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import { Card, Grid, GridItem, SimpleGrid, Box } from '@chakra-ui/react'
const dashboard = () => {
  return (
    <>
      <Grid templateColumns={'repeat(5, 1fr)'}>
        <GridItem colSpan={1}>
          <Sidebar />
        </GridItem>

        <GridItem colSpan={4} bg={'gray.50'}>
          <Navbar />
          <SimpleGrid
            id='stats_table'
            spacing={'50px'}
            minChildWidth={'300px'}
            p={'20px'}
            justifyContent={'space-between'}
          >
            <Card>Card1</Card>
            <Card>Card2</Card>
            <Card>Card3</Card>
            <Card>Card4</Card>
            <Card>Card1</Card>
            <Card>Card2</Card>
            <Card>Card3</Card>
            <Card>Card4</Card>
          </SimpleGrid>
          <SimpleGrid
            id='new_transactions'
            spacing={'25px'}
            p={'20px'}
            columns={1}
            // justifyContent={'space-between'}
          >
            <Card>Transaction 1</Card>
            <Card>Transaction 1</Card>
          </SimpleGrid>
        </GridItem>
      </Grid>
    </>
  )
}

export default dashboard
