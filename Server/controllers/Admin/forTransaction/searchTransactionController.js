import { Transaction } from '../../../models/index.js'
import sendError from '../../../utils/sendError.js'
import sendSuccess from '../../../utils/sendSuccess.js'

const searchTransactions = async (req, res) => {
  console.log('searching for transactions..')
  try {
    const { query } = req.query

    console.log(query)
    const transactions = await Transaction.find({
      $or: [
        { transacType: { $regex: query, $options: 'i' } },
        // { accountID: { $regex: query, $options: 'i' } },
      ],
    })

    const payload = transactions

    return sendSuccess(payload, 200, res)
  } catch (error) {
    console.error(error)
    sendError('Internal Server Error', 500, res)
  }
}

export default searchTransactions
