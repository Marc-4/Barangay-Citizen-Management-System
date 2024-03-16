import { Transaction } from '../../../models/index.js'
import { sendError, sendSuccess } from '../../../utils/index.js'

const getAllTransactions = async (req, res) => {
  console.log('admin accessing getAllTransactions..')
  if (req.query.entries === undefined) return sendError('Missing Required Fields', 404, res)

  var skip = (req.query.page - 1) * req.query.entries

  if (req.query.page % 1 != 0) skip++

  console.log(req.query)
  // console.log('page: ' + req.query.page)
  // console.log('entries: ' + req.query.entries)
  // console.log('skip: ' + skip)

  let transactions
  try {
    if (req.query.entries && req.query.entries == 0)
      transactions = await Transaction.countDocuments()
    else if (req.query.entries && req.query.entries == -1)
      transactions = await Transaction.countDocuments()
    // else if (req.query.filter && req.query.filter == 'PENDING')
    //   transactions = await Transaction.find({ status: 'PENDING' })
    //     .select('-formData')
    //     .limit(req.query.entries)
    //     .sort({ _id: -1 })
    else
      transactions = await Transaction.find()
        .select('-formData')
        .skip(skip)
        .limit(req.query.entries)
        .sort({ timestamp: -1 })
  } catch (error) {
    console.log(error)
    return sendError('Internal Server Error', 500, res)
  }

  // if (!transactions) return sendError('No Transactions Found', 404, res)

  const payload = transactions
  console.log(payload)
  return sendSuccess(payload, 200, res)
}

export default getAllTransactions
