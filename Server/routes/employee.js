import { Router } from "express";
import * as Employee from '../controllers/Employee/index.js'
import { authToken, authEmployee } from '../middlewares/index.js'
import multer from 'multer'

const router = Router()
const middlewares = [authToken, authEmployee]

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// router.post('/account/register', Employee.registerEmployeeController)
router.get('/account', middlewares, Employee.getEmployeeController)
router.patch('/account/edit', middlewares, upload.single('profilePhoto'), Employee.editEmployeeController)
router.patch('/account/credentials/edit', middlewares, Employee.editEmployeeCredentialsController)

router.post('/user/register', middlewares, upload.single('profilePhoto'), Employee.registerUserController)
router.get('/user/:id', middlewares, Employee.getUserController)
router.get('/users/', middlewares, Employee.getUsersController)
router.get('/users/search', middlewares, Employee.searchUserController)
router.get('/user/:id/transactions/', middlewares, Employee.getUserTransactionsController)
router.patch('/user/profile/:id/edit', middlewares, upload.single('profilePhoto'), Employee.editUserController)
router.patch('/user/:id/archive', middlewares, Employee.archiveUserController)
router.patch('/user/:id/restore', middlewares, Employee.restoreUserController)

router.get('/transaction/:id', middlewares, Employee.getTransactionController)
router.get('/transactions/search', middlewares, Employee.searchTransactionController)
router.get('/transactions/', middlewares, Employee.getAllTransactionsController)
router.patch('/transaction/:id/edit', middlewares, Employee.editTransactionController)

//requests
router.get('/requests/', middlewares, Employee.getUserRequestsController)
router.get('/request/:id', middlewares, Employee.getUserRequestController)
router.get('/requests/search', middlewares, Employee.searchRequestController)
router.patch('/request/:id/edit', middlewares, Employee.editUserRequestController)

//notifications
router.post('/notification/create', middlewares, Employee.createNotificationController)
router.get('/notifications/', middlewares, Employee.getNotificationsController)
router.get('/notification/:id', middlewares, Employee.getNotificationController)
// router.get('/notifications/search', middlewares, Employee.searchNotificationController)
router.patch('/notification/:id/edit', middlewares, Employee.editNotificationController)

export default router
