import { Router } from "express";
import * as Auth from '../controllers/Auth/index.js'
import { authToken } from '../middlewares/index.js'
const router = Router()

router.post('/login/admin', Auth.adminLoginController)
router.post('/login/employee', Auth.employeeLoginController)
router.post('/login/user', Auth.userLoginController)
router.post('/logout',authToken, Auth.logoutController)

export default router
