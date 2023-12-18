import { sendError, sendSuccess } from '../../../utils/index.js'
import { Transaction, User } from '../../../models/index.js'
import mongoose from 'mongoose'

const getUserProfileTransactions = async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id))
    return sendError('Invalid User ID', 400, res)

  if (req.query.entries === undefined)
    return sendError('Missing Required Parameters', 404, res)

  let user
  try {
    user = await User.findById(req.params.id)
  } catch (error) {
    console.log(error)
    sendError('Internal Server Error', 500, res)
  }

  if (!user) return sendError('User Not Found', 404, res)

  let transanctions
  try {
    transanctions = await Transaction.find({ accountID: req.params.id }).limit(
      req.query.entries
    ).sort({_id: -1})
  } catch (error) {
    console.log(error)
    return sendError('Internal Server Error', 500, res)
  }
  let payload
  if (transanctions) payload = transanctions
  console.log(payload);
  return sendSuccess(payload, 200, res)
}

export default getUserProfileTransactions
