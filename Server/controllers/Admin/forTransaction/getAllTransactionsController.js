import { Transaction } from '../../../models/index.js'
import { sendError, sendSuccess } from '../../../utils/index.js'

const getAllTransactions = async (req, res) => {
  console.log('admin accessing getAllTransactions..')
  if (req.query.entries === undefined)
    return sendError('Missing Required Fields', 404, res)

  let transactions
  try {
    if (req.query.entries == 0)
      transactions = await Transaction.countDocuments({ status: 'PENDING' })
    else if (req.query.entries == -1)
      transactions = await Transaction.countDocuments()
    else if (req.query.filter && req.query.filter == 'PENDING')
      transactions = await Transaction.find({ status: 'PENDING' })
        .select('-formData')
        .limit(req.query.entries)
    else
      transactions = await Transaction.find({
        status: { $ne: 'PENDING' },
      })
        .select('-formData')
        .limit(req.query.entries)
  } catch (error) {
    console.log(error)
    return sendError('Internal Server Error', 500, res)
  }

  // if (!transactions) return sendError('No Transactions Found', 404, res)

  const payload = transactions
  return sendSuccess(payload, 200, res)
}

export default getAllTransactions
