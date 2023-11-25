import { Router } from 'express'
import * as Admin from '../controllers/Admin/index.js'
import { authToken, authAdmin } from '../middlewares/index.js'

const middlewares = [authToken, authAdmin]
const router = Router()

router.post('/account/register', Admin.registerAdminController)
router.post('/account/create-profile', middlewares, Admin.createAdminProfileController)
router.get('/account', middlewares, Admin.getAdminController)

router.post('/user/register', middlewares,Admin.registerUserController)
// router.post('/user/create-profile', middlewares,Admin.createUserProfileController)
router.get('/user/:id', middlewares, Admin.getUserController)
router.get('/users/', middlewares, Admin.getUsersController)
// router.get('/user/profile/:id', middlewares, Admin.getUserProfileController)
// router.get('/users/profiles/', middlewares, Admin.getUserProfilesController)
router.get('user/search', middlewares, Admin.searchUserController)
router.get('/user/:id/transactions/', middlewares, Admin.getUserTransactionsController)
router.patch('/user/Profile/:id/edit', middlewares, Admin.editUserController)
// router.patch('/user/:id/archive', middlewares, Admin.archiveUserController) //test
// router.patch('/user/:id/recover', middlewares, Admin.recoverUserController)
// router.delete('/user/Profile/:id/delete', middlewares, Admin.deleteUserController) //test

router.post('/employee/register', middlewares, Admin.registerEmployeeController)
// router.post('/employee/create-profile', middlewares, Admin.createEmployeeController)
router.get('/employee/:id', middlewares, Admin.getEmployeeController)
router.get('/employees/', middlewares, Admin.getEmployeesController)
// router.get('/employee/Profile/:id', middlewares, Admin.getEmployeeProfileController)
// router.get('/employees/Profiles/', middlewares, Admin.getEmployeeProfilesController)
// router.get('employee/search', middlewares, Admin.searchEmployeeController)
router.patch('/employee/:id/edit', middlewares, Admin.editEmployeeController)
// router.patch('/employee/:id/archive', middlewares,Admin.archiveEmployeeController)
// router.patch('/user/:id/recover', middlewares, Admin.recoverEmployeeController)
// router.delete('/employee/:id/delete', middlewares, Admin.deleteEmployeeController)

//transactions
router.get('/transaction/:id', middlewares, Admin.getTransactionController)
router.get('/transactions/', middlewares, Admin.getAllTransactionsController)
// router.get('/transactions/search', middlewares, Admin.searchTransactionController)
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
router.get('/notifications/search', middlewares, Admin.searchNotificationController)
router.patch('/notifications/:id/edit', middlewares, Admin.editNotificationController)
router.delete('/notifications/:id/edit', middlewares, Admin.deleteNotificationController)


export default router
