import { Router } from "express";
import * as Auth from '../controllers/Auth/index.js'

const router = Router()

router.post('/auth/login/admin', Auth.adminLoginController)
router.post('/auth/logn/employee', Auth.employeeLoginController)
router.post('/auth/login/user', Auth.userLoginController)
router.post('/auth/logout', Auth.logoutController)

export default router
