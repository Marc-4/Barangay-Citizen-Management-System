import { Transaction, User } from '../../models/index.js'
import { sendError, sendSuccess } from '../../utils/index.js'
const createUserTransaction = async (req, res) => {
  if (
    req.body.transacType === undefined ||
    req.body.formData.purpose === undefined ||
    req.body.formData.income === undefined ||
    req.body.formData.cost === undefined
  )
    return sendError('Missing Required Fields', 404, res)

  const formData = {
    purpose: req.body.formData.purpose,
    income: req.body.formData.income,
    cost: req.body.formData.cost,
  }

  // const user = await User.findById(req.user.id)
  console.log(req.body);
  if (
    await Transaction.findOne({
      accountID: req.user.id,
      transacType: req.body.transacType,
      status: 'PENDING',
    })
  )
    return sendError('Similar Transaction is still pending', 400, res)

  let transaction
  try {
    transaction = await Transaction.create({
      accountID: req.user.id,
      transacType: req.body.transacType,
      formData: formData,
      timestamp: Date.now(),
      status: 'PENDING',
    })

    const payload = transaction
    return sendSuccess(payload, 200, res)
  } catch (error) {
    console.log(error)
    return sendError('Internal Server Error', 500, res)
  }
}

export default createUserTransaction
