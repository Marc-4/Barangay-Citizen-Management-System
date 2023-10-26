import { Router } from 'express'
import * as Admin from '../controllers/Admin/index.js'

const router = Router()

router.post('/account/register', Admin.registerAdminController)
router.post('/account/create-profile', Admin.createAdminProfileController)
router.get('/account', Admin.getAdminController)

router.post('/user/register', Admin.registerUserController)
router.post('/user/create-profile', Admin.createUserProfileController)
router.get('/user/:id', Admin.getUserController)
router.get('/user/all', Admin.getUsersController)
router.get('user/search', Admin.searchUserController)
router.get('/user/:id/transactions', Admin.getUserTransactionsController)
router.patch('/user/:id/edit', Admin.editUserController)
router.patch('/user/:id/archive', Admin.archiveUserController)
router.delete('/user/:id/delete', Admin.deleteUserController)

router.post('/employee/register', Admin.registerEmployeeController)
router.post('/employee/create-profile', Admin.createEmployeeController)
router.get('/employee/:id', Admin.getEmployeeController)
router.get('/employee/all', Admin.getEmployeesController)
router.get('employee/search', Admin.searchEmployeeController)
router.patch('/employee/:id/edit', Admin.editEmployeeController)
router.patch('/employee/:id/archive', Admin.archiveEmployeeController)
router.delete('/employee/:id/delete', Admin.deleteEmployeeController)

router.get('/transaction/:id', Admin.getTransactionController)
router.get('/transaction/search', Admin.searchTransactionController)
router.get('/transaction/all', Admin.getAllTransactionsController)
router.patch('/transaction/:id/edit', Admin.editTransactionController)

export default router
