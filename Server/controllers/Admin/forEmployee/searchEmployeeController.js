import { Employee } from "../../../models/index.js";
import { sendSuccess, sendError } from "../../../utils/index.js";
const searchEmployee = async (req, res) => {
    console.log('searching for employee..')
    try {
      const { query, filter } = req.query
  
      const escapedQuery = query.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");

      const queryFilter = {
        $or: [
          { username: { $regex: escapedQuery, $options: 'i' } },
          { 'profile.firstName': { $regex: escapedQuery, $options: 'i' } },
          { 'profile.lastName': { $regex: escapedQuery, $options: 'i' } },
          { 'profile.middleName': { $regex: escapedQuery, $options: 'i' } },
          { 'profile.sex': { $regex: escapedQuery, $options: 'i' } },
          { 'profile.civilStatus': { $regex: escapedQuery, $options: 'i' } },
        ],
      }
  
      if (filter === 'ACTIVE') {
        queryFilter.active = true
      } else if (filter === 'ARCHIVED') {
        queryFilter.active = false
      }
  
      const employees = await Employee.find(queryFilter)
  
      const payload = employees
  
      return sendSuccess(payload, 200, res)
    } catch (error) {
      console.error(error)
      sendError('Internal Server Error', 500, res)
    }
}

export default searchEmployee