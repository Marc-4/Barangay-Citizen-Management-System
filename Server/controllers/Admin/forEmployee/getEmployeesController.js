import { sendError, sendSuccess } from '../../../utils/index.js'
import { Employee } from '../../../models/index.js'

const getEmployees = async (req, res) => {
  console.log('admin accessing getEmployees')
  console.log(req.query)
  if (req.query.entries === undefined)
    return sendError('missing required parameters', 404, res)

  const skip = (req.query.page - 1) * req.query.entries
  let employees = []
  try {
    if (req.query.entries == 0)
      employees = await Employee.countDocuments({ active: true })
    else if (req.query.entries == 'ARCHIVED_COUNT')
      employees = await Employee.countDocuments({ active: false })
    else if (req.query.filter && req.query.filter === 'ARCHIVED')
      employees = await Employee.find({ active: false })
        .select('-password')
        .skip(skip)
        .limit(req.query.entries)
        // .sort({ _id: -1 })
        .sort({ dateOfCreation: -1 })
    else if (req.query.filter && req.query.filter === 'ACTIVE')
      employees = await Employee.find({ active: true })
        .select('-password')
        .skip(skip)
        .limit(req.query.entries)
        // .sort({ _id: -1 })
        .sort({ dateOfCreation: -1 })
  } catch (error) {
    console.log(error)
    return sendError('Internal Server Error', 500, res)
  }

  const payload = employees

  return sendSuccess(payload, 200, res)
}

export default getEmployees
