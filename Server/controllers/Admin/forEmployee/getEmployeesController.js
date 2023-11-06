import { sendError, sendSuccess } from '../../../utils/index.js'
import { Employee } from '../../../models/index.js'

const getEmployees = async (req, res) => {
  if (req.body.entries === undefined)
    return sendError('missing required parameters', 404, res)

  let employees
  try {
    employees = await Employee.find().limit(10)
  } catch (error) {
    console.log(error)
    return sendError('Internal Server Error', 500, res)
  }

  if (!employees) return sendError('no employees found', 404, res)

  const payload = employees

  return sendSuccess(payload, 200, res)
}

export default getEmployees
