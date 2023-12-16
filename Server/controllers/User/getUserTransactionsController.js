import { Transaction } from '../../models/index.js'
import { sendError, sendSuccess } from '../../utils/index.js'

const getUserTransactions = async (req, res) => {
  console.log('user getting transactions..')
  if (req.query.entries === undefined)
    return sendError('Missing required fields', 404, res)

  let transactions
  try {
    if (req.query.filter && req.query.filter == 'PENDING')
      transactions = await Transaction.find({
        accountID: req.user.id,
        status: 'PENDING',
      })
        .select('-formData')
        .limit(req.query.entries)
    else
      transactions = await Transaction.find({
        accountID: req.user.id,
        status: { $ne: 'PENDING' },
      })
        .select('-formData')
        .limit(req.query.entries)
  } catch (error) {
    console.log(error)
    return sendError('Internal Server Error', 500, res)
  }

  return sendSuccess(transactions, 200, res)
}

export default getUserTransactions
