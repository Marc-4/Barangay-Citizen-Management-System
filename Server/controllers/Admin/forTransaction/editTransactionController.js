import mongoose from 'mongoose'
import { sendSuccess, sendError } from '../../../utils/index.js'
import { Transaction } from '../../../models/index.js'

const editTransaction = async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id))
    return sendError('Invalid Transaction ID', 400, res)

  if (
    req.body.transacType === undefined &&
    req.body.formData?.purpose === undefined &&
    req.body.formData?.income === undefined &&
    req.body.formData?.cost === undefined &&
    req.body.formData?.numberOfCopies === undefined &&
    req.body.status === undefined
  )
    return sendError('Missing Required Fields', 404, res)

  let transaction
  try {
    transaction = await Transaction.findById(req.params.id)
  } catch (error) {
    console.log(error)
    return sendError('Transaction Not Found', 404, res)
  }

  const { transacType, formData, status } = req.body

  if (transacType) transaction.transacType = req.body.transacType
  if (formData.purpose) transaction.formData.purpose = req.body.formData.purpose
  if (formData.income) transaction.formData.income = req.body.formData.income
  if (formData.cost) transaction.formData.cost = req.body.formData.cost
  if (formData.numberOfCopies) transaction.formData.numberOfCopies = req.body.formData.numberOfCopies
  if (status) transaction.status = req.body.status

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
