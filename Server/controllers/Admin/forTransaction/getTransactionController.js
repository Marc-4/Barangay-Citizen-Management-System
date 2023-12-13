import mongoose from 'mongoose'
import { Transaction } from '../../../models/index.js'
import { sendError, sendSuccess } from '../../../utils/index.js'

const getTransaction = async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id))
    return sendError('Invalid Transaction ID', 400, res)

  let transaction
  const { filter } = req.query
  try {
    if (filter === 'FORMDATA')
      transaction = await Transaction.findById(req.params.id)
    else
      transaction = await Transaction.findById(req.params.id).select(
        '-formData'
      )
  } catch (error) {
    console.log(error)
    return sendError('Internal Server Error', 500, res)
  }

  if (!transaction) return sendError('Transaction Not Found', 404, res)

  const payload = transaction
  return sendSuccess(payload, 200, res)
}

export default getTransaction
