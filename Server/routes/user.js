import { Router } from "express";
import * as User from '../controllers/User/index.js'
import { authToken, authUser } from '../middlewares/index.js'

const middlewares = [authToken, authUser]
const router = Router()

router.post('/account/register', User.registerUserController)
router.post('/account/create-profile', middlewares, User.requestCreateUserProfileController)
router.get('/account/', middlewares, User.getUserProfileController)
router.patch('/account/edit', middlewares, User.requestEditUserProfileController)
// router.patch('/account/archive', middlewares, User.requestArchiveUserController)

router.post('/transaction/create', middlewares, User.createUserTransactionController)
router.get('/transactions/', middlewares, User.getUserTransactionsController)
router.get('/transaction/:id', middlewares, User.getUserTransactionController) //works
// router.patch('/transaction/:id/edit', middlewares, User.editUserTransactionController)

//notifications
router.post('/notification/create', middlewares, User.createUserNotificationController)
router.get('/notifications/', middlewares, User.getUserNotificationsController)
// router.get('/notification/:id', middlewares, User.getNotificationController)
// router.patch('/notifications/:id/edit', middlewares, User.editUserNotificationController)

export default router