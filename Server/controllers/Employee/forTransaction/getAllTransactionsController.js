import { Transaction } from '../../../models/index.js'
import { sendError, sendSuccess } from '../../../utils/index.js'

const getAllTransactions = async (req, res) => {
  if (req.query.entries === undefined)
    return sendError('Missing Required Fields', 404, res)

  let transactions
  try {
    if (req.query.entries === 0) transactions = await Transaction.countDocuments()
    else transactions = await Transaction.find().limit(req.query.entries)
  } catch (error) {
    console.log(error)
    return sendError('Internal Server Error', 500, res)
  }

  if (!transactions) return sendError('No Transactions Found', 404, res)

  const payload = transactions
  return sendSuccess(payload, 200, res)
}

export default getAllTransactions
