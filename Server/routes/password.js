import { Router } from "express"
import * as Password from '../controllers/Password/index.js'

const middlewares = [authToken, authAdmin]
const router = Router()

router.patch('/password/user/edit', middlewares, Password.changeUserPasswordController)
router.patch('/password/employee/edit', middlewares, Password.changeEmployeePasswordController)
router.patch('/password/admin/edit', middlewares, Password.changeAdminPasswordController)