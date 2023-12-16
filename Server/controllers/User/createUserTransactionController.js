import { Transaction, User } from '../../models/index.js'
import { sendError, sendSuccess } from '../../utils/index.js'
const createUserTransaction = async (req, res) => {
  console.log(req.body)
  if (
    req.body.transacType === undefined ||
    req.body.cost === undefined ||
    req.body.purpose === undefined
  )
    return sendError('Missing Required Fields', 404, res)

    const attachment = req.file
  const formData = {
    purpose: req.body.purpose,
    income: req.body?.income,
    cost: req.body.cost,
    attachment:{
      data: attachment?.buffer,
      fileName: attachment?.originalname
    }
  }

  if (
    await Transaction.findOne({
      accountID: req.user.id,
      transacType: req.body.transacType,
      status: 'PENDING',
    })
  )
    return sendError('Similar Transaction is still pending', 400, res)

    const user = await User.findById(req.user.id)
  let transaction
  try {
    transaction = await Transaction.create({
      accountID: req.user.id,
      userFirstName: user.profile.firstName,
      userLastName: user.profile.lastName,
      transacType: req.body.transacType,
      formData: formData,
      timestamp: Date.now(),
      status: 'PENDING',
    })

    console.log(transaction);

    const payload = transaction
    return sendSuccess(payload, 200, res)
  } catch (error) {
    console.log(error)
    return sendError('Internal Server Error', 500, res)
  }
}

export default createUserTransaction
