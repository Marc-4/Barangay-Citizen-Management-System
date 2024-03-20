import mongoose from 'mongoose'
import { sendSuccess, sendError } from '../../../utils/index.js'
import { Transaction } from '../../../models/index.js'

const editTransaction = async (req, res) => {
  console.log('admin accesing editTransaction...')
  if (!mongoose.isValidObjectId(req.params.id)) return sendError('Invalid Transaction ID', 400, res)

  let transaction
  try {
    transaction = await Transaction.findById(req.params.id)
  } catch (error) {
    console.log(error)
    return sendError('Transaction Not Found', 404, res)
  }

  console.log(req.body);
  const {transacType, purpose, cost, income} = req.body

  if(transacType) transaction.transacType = transacType
  if(purpose) transaction.formData.purpose = purpose
  if(cost) transaction.formData.cost = cost
  if(income) transaction.formData.income = income

  // if (req.body.message) transaction.message = req.body.message
  // transaction.status = req.body.status

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
