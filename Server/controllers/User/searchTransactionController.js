import { Transaction } from '../../models/index.js'
import { sendError, sendSuccess } from '../../utils/index.js'

const searchTransactions = async (req, res) => {
  console.log('searching for transactions..')
  try {
    const { query, filter } = req.query

    console.log(query)
    console.log(filter)

    const escapedQuery = query.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");

    const queryFilter = {
      $or: [
        { transacType: { $regex: escapedQuery, $options: 'i' } },
        { userFirstName: { $regex: escapedQuery, $options: 'i' } },
        { userLastName: { $regex: escapedQuery, $options: 'i' } },
      ],
    }

    if (filter === 'PENDING') {
      queryFilter.status = 'PENDING'
    } else if (filter === 'HISTORY') {
      queryFilter.status = { $ne: 'PENDING' }
    }

    const transactions = await Transaction.find(queryFilter)

    const payload = transactions

    return sendSuccess(payload, 200, res)
  } catch (error) {
    console.error(error)
    sendError('Internal Server Error', 500, res)
  }
}

export default searchTransactions
