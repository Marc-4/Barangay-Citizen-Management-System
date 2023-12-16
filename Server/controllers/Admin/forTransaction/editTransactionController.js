import mongoose from 'mongoose'
import { sendSuccess, sendError } from '../../../utils/index.js'
import { Transaction } from '../../../models/index.js'

const editTransaction = async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id))
    return sendError('Invalid Transaction ID', 400, res)

  if (req.body.status === undefined)
    return sendError('Missing Required Fields', 404, res)

  let transaction
  try {
    transaction = await Transaction.findById(req.params.id)
  } catch (error) {
    console.log(error)
    return sendError('Transaction Not Found', 404, res)
  }

  if (req.body.message) transaction.message = req.body.message
  transaction.status = req.body.status

  try {
    await transaction.save()
  } catch (error) {
    console.log(error)
    sendError('Internal Server Error', 500, res)
  }
  const payload = transaction
  return sendSuccess(payload, 200, res)
}

export default editTransaction
