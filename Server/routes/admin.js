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
router.get('/users/:id', middlewares, Admin.getUserController)
router.get('/users/', middlewares, Admin.getUsersController)
router.get('/user/Profile/:id', middlewares, Admin.getUserProfileController)
router.get('/user/Profiles/', middlewares, Admin.getUserProfilesController)
// router.get('user/search', middlewares, Admin.searchUserController)
router.get('/user/:id/transactions', middlewares, Admin.getUserTransactionsController)
router.patch('/user/Profile/:id/edit', middlewares, Admin.editUserController)
// router.patch('/user/:id/archive', middlewares, Admin.archiveUserController) //test
// router.patch('/user/:id/recover', middlewares, Admin.recoverUserController)
// router.delete('/user/Profile/:id/delete', middlewares, Admin.deleteUserController) //test

router.post('/employee/register', middlewares, Admin.registerEmployeeController)
router.post('/employee/create-profile', middlewares, Admin.createEmployeeController)
router.get('/employees/:id', middlewares, Admin.getEmployeeController)
router.get('/employees', middlewares, Admin.getEmployeesController)
router.get('/employee/Profiles/:id', middlewares, Admin.getEmployeeProfileController)
router.get('/employee/Profiles', middlewares, Admin.getEmployeeProfilesController)
// router.get('employee/search', middlewares, Admin.searchEmployeeController)
router.patch('/employee/:id/edit', middlewares, Admin.editEmployeeController)
// router.patch('/employee/:id/archive', middlewares,Admin.archiveEmployeeController)
// router.patch('/user/:id/recover', middlewares, Admin.recoverEmployeeController)
// router.delete('/employee/:id/delete', middlewares, Admin.deleteEmployeeController)

//transactions
router.get('/transactions/:id', middlewares, Admin.getTransactionController)
router.get('/transactions', middlewares, Admin.getAllTransactionsController)
// router.get('/transactions/search', middlewares, Admin.searchTransactionController)
router.patch('/transaction/:id/edit', middlewares, Admin.editTransactionController)

//requests
router.get('/requests', middlewares, Admin.getUserRequestsController)
router.get('/requests/:id', middlewares, Admin.getUserRequestController)
// router.get('/requests/search', middlewares, Admin.searchRequestController)
router.patch('/request/:id/edit', middlewares, Admin.editUserRequestController)

//notifications

export default router
