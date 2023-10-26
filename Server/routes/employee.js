import { Router } from "express";
import * as Employee from '../controllers/Employee/index.js'
const router = Router()

router.post('/account/register', Employee.registerEmployeeController)
router.post('/account/create-profile', Employee.createEmployeeProfileController)
router.get('/account', Employee.getEmployeeController)

router.post('/user/register', Employee.registerUserController)
router.post('/user/create-profile', Employee.createUserProfileController)
router.get('/user/:id', Employee.getUserController)
router.get('/user/all', Employee.getUsersController)
router.get('user/search', Employee.searchUserController)
router.get('/user/:id/transactions', Employee.getUserTransactionsController)
router.patch('/user/:id/edit', Employee.editUserController)
router.patch('/user/:id/archive', Employee.archiveUserController)

router.get('/transaction/:id', Employee.getTransactionController)
router.get('/transaction/search', Employee.searchTransactionController)
router.get('/transaction/all', Employee.getAllTransactionsController)
router.patch('/transaction/:id/edit', Employee.editTransactionController)


export default router
