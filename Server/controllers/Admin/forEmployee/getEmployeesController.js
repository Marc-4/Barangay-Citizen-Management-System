import { sendError, sendSuccess } from '../../../utils/index.js'
import { Employee } from '../../../models/index.js'

const getEmployees = async (req, res) => {
  if (req.query.entries === undefined)
    return sendError('missing required parameters', 404, res)

  let employees
  try {
    if (req.query.entries == 0) employees = await Employee.countDocuments()
    else employees = await Employee.find({active: true}).limit(req.query.entries)
  } catch (error) {
    console.log(error)
    return sendError('Internal Server Error', 500, res)
  }

  if (!employees) return sendError('no employees found', 404, res)

  const payload = employees

  return sendSuccess(payload, 200, res)
}

export default getEmployees
