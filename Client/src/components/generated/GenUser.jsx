import { useEffect, useState } from 'react'
import callAPI from '../../utils/callAPI'
import ProfileCard from '../cards/ProfileCard'
import { useParams } from 'react-router-dom'
import {
  Text,
  Tabs,
  TabList,
  Tab,
  TabPanel,
  TabPanels,
  Spinner,
} from '@chakra-ui/react'
import TransactionCard from '../cards/TransactionCard'

const GenUser = () => {
  const { id } = useParams()
  const [account, setAccount] = useState()
  const [transactions, setTransactions] = useState([])
  const [accountError, setAccountError] = useState(null)
  const [transactionError, setTransactionError] = useState(null)
  const [entries, setEntries] = useState(20)
  const [filter, setFilter] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const role = sessionStorage.getItem('userRole')

  useEffect(() => {
    getProfile()
    getTransactions()
  }, [])

  const getProfile = async () => {
    setIsLoading(true)
    try {
      const method = 'GET'
      const route = `http://localhost:3000/api/${role}/user/${id}`
      const response = await callAPI(null, method, route)

      if (response.result === 'OK') {
        setAccountError(null)
        setAccount(response.payload)
        console.log(response.payload)
      }
      // else setAccountError(response.payload.error)
    } catch (err) {
      console.log(err)
      setAccountError('Error fetching Account Data')
    } finally {
      setIsLoading(false)
    }
  }

  const getTransactions = async () => {
    setIsLoading(true)
    try {
      const method = 'GET'
      const route = `http://localhost:3000/api/${role}/user/${id}/transactions?entries=${entries}`
      const response = await callAPI(null, method, route)

      if (response.result === 'OK') {
        setTransactionError(null)
        setTransactions(response.payload)
        // console.log(response)
      } else setTransactionError(response.payload.error)
    } catch (err) {
      console.log(err)
      setTransactionError('Error fetching Profile Data')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Tabs margin={'auto'} w={'90%'} variant='line' mt={'25px'}>
        <TabList mb='1em'>
          <Tab onClick={() => setFilter('PROFILE')}>Profile</Tab>
          <Tab onClick={() => setFilter('TRANSACTIONS')}>Transactions</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Text
              fontSize={'2xl'}
              display={accountError ? 'block' : 'none'}
              color={'tomato'}
              fontWeight={'semibold'}
              textAlign={'center'}
            >
              {accountError}
            </Text>
            <Spinner
              m={'auto'}
              size={'xl'}
              display={isLoading ? 'block' : 'none'}
            />
            {isLoading ? null : !account ? (
              <Text fontSize={'2xl'}>This user has no Profile.</Text>
            ) : (
              <ProfileCard data={account} />
            )}
          </TabPanel>
          <TabPanel>
            <Text
              fontSize={'2xl'}
              display={transactionError ? 'block' : 'none'}
              color={'tomato'}
              fontWeight={'semibold'}
              textAlign={'center'}
            >
              {transactionError}
            </Text>
            {transactions && transactions.length > 0 ? (
              transactions.map((transaction) => (
                <TransactionCard
                  key={transaction?._id}
                  data={transaction}
                  basepath={'/admin/transactions'}
                />
              ))
            ) : (
              <Text fontSize={'2xl'}>This user has made no transactions.</Text>
            )}
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  )
}

export default GenUser
