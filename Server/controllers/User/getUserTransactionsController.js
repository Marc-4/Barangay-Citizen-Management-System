import { Transaction } from '../../models/index.js'
import { sendError, sendSuccess } from '../../utils/index.js'

const getUserTransactions = async (req, res) => {
  console.log('user getting transactions..')
  if (req.query.entries === undefined)
    return sendError('Missing required fields', 404, res)

  let transactions
  try {
    transactions = await Transaction.find({ accountID: req.user.id }).limit(
      req.query.entries
    )
  } catch (error) {
    console.log(error)
    return sendError('Internal Server Error', 500, res)
  }

  let payload
  if (transactions) payload = transactions

  return sendSuccess(payload, 200, res)
}

export default getUserTransactions
