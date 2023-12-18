import mongoose from 'mongoose'
import { User, Transaction, ProfileRequest } from '../../../models/index.js'
import { sendError, sendSuccess } from '../../../utils/index.js'

const deleteUser = async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id))
    return sendError('invalid user ID', 400, res)

  let user
  try {
    user = await User.findById(req.params.id)
  } catch (error) {
    console.log(error)
    return sendError('Internal Server Error', 500, res)
  }

  if (!user) return sendError('user not found', 404, res)

  let transactions
  try {
    transactions = await Transaction.find({ accountID: req.params.id })
  } catch (error) {
    console.log(error)
    return sendError('Internal Server Error', 500, res)
  }

  let requests
  try {
    requests = await ProfileRequest.find({ accountID: req.params.id })
  } catch (error) {
    console.log(error)
    return sendError('Internal Server Error', 500, res)
  }

  let payload = {
    'deleted account': user,
    'deleted transactions': transactions,
    'deleted requests': requests,
  }
  console.log(payload)
  if (transactions.length !== 0) Transaction.deleteMany(transactions)
  if (requests.length !== 0) ProfileRequest.deleteMany(requests)
  user.deleteOne()

  return sendSuccess(payload, 200, res)
}

export default deleteUser
