import { Router } from 'express'
import * as Admin from '../controllers/Admin/index.js'
import { authToken, authAdmin } from '../middlewares/index.js'

const middlewares = [authToken, authAdmin]
const router = Router()

router.post('/account/register', Admin.registerAdminController)
router.post('/account/create-profile', middlewares, Admin.createAdminProfileController)
router.get('/account', middlewares, Admin.getAdminController)

router.post('/user/register', middlewares,Admin.registerUserController)
router.post('/user/create-profile', middlewares,Admin.createUserProfileController)
router.get('/user/:id', middlewares, Admin.getUserController)
router.get('/user/all', middlewares, Admin.getUsersController)
router.get('user/search', middlewares, Admin.searchUserController)
router.get('/user/:id/transactions', middlewares, Admin.getUserTransactionsController)
router.patch('/user/:id/edit', middlewares, Admin.editUserController)
router.patch('/user/:id/archive', middlewares, Admin.archiveUserController)
router.delete('/user/:id/delete', middlewares, Admin.deleteUserController)

router.post('/employee/register', middlewares, Admin.registerEmployeeController)
router.post('/employee/create-profile', middlewares, Admin.createEmployeeController)
router.get('/employee/:id', middlewares, Admin.getEmployeeController)
router.get('/employee/all', middlewares, Admin.getEmployeesController)
router.get('employee/search', middlewares, Admin.searchEmployeeController)
router.patch('/employee/:id/edit', middlewares, Admin.editEmployeeController)
router.patch('/employee/:id/archive', middlewares,Admin.archiveEmployeeController)
router.delete('/employee/:id/delete', middlewares, Admin.deleteEmployeeController)

router.get('/transaction/:id', middlewares, Admin.getTransactionController)
router.get('/transaction/search', middlewares, Admin.searchTransactionController)
router.get('/transaction/all', middlewares, Admin.getAllTransactionsController)
router.patch('/transaction/:id/edit', middlewares, Admin.editTransactionController)

export default router
