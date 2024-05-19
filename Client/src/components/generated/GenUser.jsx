import { useEffect, useState } from 'react'
import callAPI from '../../utils/callAPI'
import ProfileCard from '../cards/ProfileCard'
import { useParams } from 'react-router-dom'
import {
  Text,
  Tabs,
  TabList,
  Tab,
  Box,
  TabPanel,
  Button,
  TabPanels,
  Spinner,
  useDisclosure,
} from '@chakra-ui/react'
import AddTransactionModal from '../modals/AddTransactionModal'
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
  const {
    isOpen: isTransactionOpen,
    onOpen: onTransactionOpen,
    onClose: onTransactionClose,
  } = useDisclosure()
  const role = localStorage.getItem('userRole')

  useEffect(() => {
    getProfile()
    getTransactions()
  }, [])

  const getProfile = async () => {
    setIsLoading(true)
    try {
      const method = 'GET'
      const route = `${import.meta.env.VITE_API_URL}/api/${role}/user/${id}`
      const response = await callAPI(null, method, route)

      console.log('account: ', response.payload)
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
      const route = `${import.meta.env.VITE_API_URL}/api/${role}/user/${id}/transactions?entries=${entries}`
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

  const handeUpdate = () => {
    getTransactions()
  }

  return (
    <>
      <AddTransactionModal
        {...{
          isOpen: isTransactionOpen,
          onClose: onTransactionClose,
          onUpdate: handeUpdate,
        }}
      />
      <Tabs margin={'auto'} w={'90%'} variant='line' mt={'25px'}>
        <TabList mb='1em'>
          <Tab onClick={() => setFilter('PROFILE')}>Profile</Tab>
          <Tab onClick={() => setFilter('TRANSACTIONS')}>Transactions</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            {isLoading && <Spinner m={'auto'} mt={'5rem'} display={'flex'} size={'xl'} />}
            {isLoading == false && account && (
              <>
                <Box display={'flex'} w={'950px'} margin={'auto'}>
                  <Button mt={'5px'} colorScheme='facebook' onClick={onTransactionOpen}>
                    Add transaction
                  </Button>
                </Box>
                <Text
                  fontSize={'2xl'}
                  display={accountError ? 'block' : 'none'}
                  color={'tomato'}
                  fontWeight={'semibold'}
                  textAlign={'center'}
                >
                  {accountError}
                </Text>

                <ProfileCard data={account} />
              </>
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
                  basepath={`/${role}/transactions`}
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
