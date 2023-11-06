import mongoose from 'mongoose'
import { sendError } from '../../utils/index.js'
import { Transaction } from '../../models/index.js'

const getUserTransaction = async (req, res) => {
  if (mongoose.isValidObjectId(req.params.id))
    return sendError('Invalid Transaction ID', 400, res)

  if (req.body.entries === undefined)
    return sendError('Missing required fields', 404, res)

  let transaction
  try {
    transaction = await Transaction.findOne({
      _id: req.params.id,
      accountID: req.user.id,
    })
  } catch (error) {
    console.log(error)
    return sendError('Internal Server Error', 500, res)
  }

  if (!transaction) return sendError('No Transaction Found', 404, res)

  const payload = transaction
  return sendSuccess(payload, 200, res)
}

export default getUserTransaction
