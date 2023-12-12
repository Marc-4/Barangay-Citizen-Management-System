import { Router } from 'express'
import * as Admin from '../controllers/Admin/index.js'
import { authToken, authAdmin } from '../middlewares/index.js'

const middlewares = [authToken, authAdmin]
const router = Router()

router.post('/account/register', Admin.registerAdminController)
router.post('/account/create-profile', middlewares, Admin.createAdminProfileController)
router.get('/account', middlewares, Admin.getAdminController)

router.post('/user/register', middlewares,Admin.registerUserController)
router.get('/user/:id', middlewares, Admin.getUserController)
router.get('/users/', middlewares, Admin.getUsersController)
router.get('/users/search', middlewares, Admin.searchUserController)
router.get('/user/:id/transactions/', middlewares, Admin.getUserTransactionsController)
router.patch('/user/profile/:id/edit', middlewares, Admin.editUserController)
router.patch('/user/:id/archive', middlewares, Admin.archiveUserController)
router.patch('/user/:id/restore', middlewares, Admin.restoreUserController)
router.delete('/user/:id/delete', middlewares, Admin.deleteUserController)

router.post('/employee/register', middlewares, Admin.registerEmployeeController)
router.get('/employee/:id', middlewares, Admin.getEmployeeController)
router.get('/employees/', middlewares, Admin.getEmployeesController)
// router.get('employee/search', middlewares, Admin.searchEmployeeController)
router.patch('/employee/profile/:id/edit', middlewares, Admin.editEmployeeController)
// router.patch('/employee/:id/archive', middlewares,Admin.archiveEmployeeController)
// router.patch('/user/:id/recover', middlewares, Admin.recoverEmployeeController)
router.delete('/employee/:id/delete', middlewares, Admin.deleteEmployeeController)

//transactions
router.get('/transaction/:id', middlewares, Admin.getTransactionController)
router.get('/transactions/', middlewares, Admin.getAllTransactionsController)
router.get('/transactions/search', middlewares, Admin.searchTransactionController)
router.patch('/transaction/:id/edit', middlewares, Admin.editTransactionController)

//requests
router.get('/request/:id', middlewares, Admin.getUserRequestController)
router.get('/requests/', middlewares, Admin.getUserRequestsController)
// router.get('/requests/search', middlewares, Admin.searchRequestController)
router.patch('/request/:id/edit', middlewares, Admin.editUserRequestController)

//notifications
router.post('/notification/create', middlewares, Admin.createNotificationController)
router.get('/notifications/', middlewares, Admin.getNotificationsController)
router.get('/notification/:id', middlewares, Admin.getNotificationController)
// router.get('/notifications/search', middlewares, Admin.searchNotificationController)
router.patch('/notifications/:id/edit', middlewares, Admin.editNotificationController)
router.delete('/notifications/:id/edit', middlewares, Admin.deleteNotificationController)


export default router
