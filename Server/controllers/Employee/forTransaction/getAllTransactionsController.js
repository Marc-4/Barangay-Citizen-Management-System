import { Transaction } from '../../../models/index.js'
import { sendError, sendSuccess } from '../../../utils/index.js'

const getAllTransactions = async (req, res) => {
  if (req.body.entries === undefined)
    return sendError('Missing Required Fields', 404, res)

  let transactions
  try {
    transactions = await Transaction.find().limit(req.body.entries)
  } catch (error) {
    console.log(error)
    return sendError('Internal Server Error', 500, res)
  }

  if (!transactions) return sendError('No Transactions Found', 404, res)

  const payload = transactions
  return sendSuccess(payload, 200, res)
}

export default getAllTransactions