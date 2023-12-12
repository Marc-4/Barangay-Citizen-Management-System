import { Transaction } from '../../../models/index.js'
import sendError from '../../../utils/sendError.js'
import sendSuccess from '../../../utils/sendSuccess.js'

const searchTransactions = async (req, res) => {
  console.log('searching for transactions..')
  try {
    const { query, filter } = req.query

    console.log(query)
    console.log(filter)

    const queryFilter = {
      $or: [
        { transacType: { $regex: query, $options: 'i' } },
        { userFirstName: { $regex: query, $options: 'i' } },
        { userLastName: { $regex: query, $options: 'i' } },
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
