import { useEffect, useState } from 'react'
import callAPI from '../../utils/callAPI'
import ProfileCard from '../cards/ProfileCard'
import { useParams } from 'react-router-dom'
import { Text, Tabs, TabList, Tab, TabPanel, TabPanels } from '@chakra-ui/react'
import TransactionCard from '../cards/TransactionCard'

const GenUser = () => {
  const { id } = useParams()
  const [account, setAccount] = useState()
  const [transactions, setTransactions] = useState([])
  const [accountError, setAccountError] = useState(null)
  const [transactionError, setTransactionError] = useState(null)
  const [entries, setEntries] = useState(20)
  const [filter, setFilter] = useState(null)

  useEffect(() => {
    getProfile()
    getTransactions()
  }, [])

  const getProfile = async () => {
    try {
      const method = 'GET'
      const route = `http://localhost:3000/api/admin/user/${id}`
      const response = await callAPI(null, method, route)

      if (response.result === 'OK') {
        setAccountError(null)
        setAccount(response.payload)
        console.log(response.payload)
      }
      // else setAccountError(response.payload.error)
    } catch (err) {
      console.log(err)
      setAccountError('Error fetching Profile Data')
    }
  }

  const getTransactions = async () => {
    try {
      const method = 'GET'
      const route = `http://localhost:3000/api/admin/user/${id}/transactions?entries=${entries}`
      const response = await callAPI(null, method, route)

      if (response.result === 'OK') {
        setTransactionError(null)
        setTransactions(response.payload)
        // console.log(response)
      } else setTransactionError(response.payload.error)
    } catch (err) {
      console.log(err)
      setTransactionError('Error fetching Profile Data')
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
            {account ? (
              <ProfileCard data={account}/>
            ) : (
              <Text fontSize={'2xl'}>This user has no Profile.</Text>
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
