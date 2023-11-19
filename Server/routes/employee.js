import { Router } from "express";
import * as Employee from '../controllers/Employee/index.js'
import { authToken, authEmployee } from '../middlewares/index.js'

const router = Router()
const middlewares = [authToken, authEmployee]

router.post('/account/register', Employee.registerEmployeeController)
router.post('/account/create-profile', middlewares, Employee.createEmployeeProfileController)
router.get('/account', middlewares, Employee.getEmployeeController)

router.post('/user/register', middlewares, Employee.registerUserController)
router.post('/user/create-profile', middlewares, Employee.createUserProfileController)
router.get('/user/:id', middlewares, Employee.getUserController)
router.get('/users/', middlewares, Employee.getUsersController)
router.get('/user/Profile/:id', middlewares, Employee.getUserProfileController)
router.get('/users/Profiles/', middlewares, Employee.getUserProfilesController)
// router.get('user/search', middlewares, Employee.searchUserController)
router.get('/user/:id/transactions/', middlewares, Employee.getUserTransactionsController)
router.patch('/user/:id/edit', middlewares, Employee.editUserController)
// router.patch('/user/:id/recover', middlewares, Employee.recoverUserController)
// router.patch('/user/:id/archive', middlewares, Employee.archiveUserController)

router.get('/transaction/:id', middlewares, Employee.getTransactionController)
// router.get('/transaction/search', middlewares, Employee.searchTransactionController)
router.get('/transactions/', middlewares, Employee.getAllTransactionsController)
router.patch('/transaction/:id/edit', middlewares, Employee.editTransactionController)

//requests
// router.get('/requests/', middlewares, Employee.getUserRequestsController)
// router.get('/request/:id', middlewares, Employee.getUserRequestController)
// router.get('/requests/search', middlewares, Employee.searchRequestController)
// router.patch('/request/:id/edit', middlewares, Employee.editUserRequestController)

//notifications
// router.get('/notifications/', middlewares, Employee.getUserNotificationsController)
// router.get('/notification/:id', middlewares, Employee.getNotificationController)
// router.get('/notifications/search', middlewares, Employee.searchNotificationController)
// router.patch('/notifications/:id/edit', middlewares, Employee.editUserNotificationController)

export default router
