import { useEffect, useState } from 'react'
import callAPI from '../../utils/callAPI'
import ProfileCard from '../cards/ProfileCard'
import { useParams } from 'react-router-dom'
import { Text, Spinner } from '@chakra-ui/react'
const GenEmployee = () => {
  const { id } = useParams()
  const [account, setAccount] = useState()
  const [transactions, setTransactions] = useState([])
  const [accountError, setAccountError] = useState(null)
  const [transactionError, setTransactionError] = useState(null)
  const [entries, setEntries] = useState(20)
  const [filter, setFilter] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    getProfile()
  }, [])

  const getProfile = async () => {
    setIsLoading(true)
    try {
      const method = 'GET'
      const route = `http://localhost:3000/api/admin/employee/${id}`
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

  return (
    <>
      <Text
        fontSize={'2xl'}
        display={accountError ? 'block' : 'none'}
        color={'tomato'}
        fontWeight={'semibold'}
        textAlign={'center'}
      >
        {accountError}
      </Text>
      <Spinner m={'auto'} size={'xl'} display={isLoading ? 'block' : 'none'} />
      {isLoading ? null : !account ? (
        <Text fontSize={'2xl'}>This Employee has no Profile.</Text>
      ) : (
        <ProfileCard data={account} />
      )}
      <Text
        fontSize={'2xl'}
        display={transactionError ? 'block' : 'none'}
        color={'tomato'}
        fontWeight={'semibold'}
        textAlign={'center'}
      >
        {transactionError}
      </Text>
    </>
  )
}

export default GenEmployee
