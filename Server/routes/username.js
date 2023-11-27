import { Router } from "express"
import * as Password from '../controllers/Password/index.js'

const middlewares = [authToken, authAdmin]
const router = Router()

// router.patch('/password/user/edit', middlewares, Password.changeUserUsernameController)
// router.patch('/password/employee/edit', middlewares, Password.changeEmployeeUsernameController)
// router.patch('/password/admin/edit', middlewares, Password.changeAdminUsernameController)