import { Router } from "express";
import * as User from '../controllers/User/index.js'
import { authToken, authUser } from '../middlewares/index.js'
import multer from "multer";

const middlewares = [authToken, authUser]
const router = Router()

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/account/register', upload.single('profilePhoto'), User.registerUserController)
router.get('/account/', middlewares, User.getUserProfileController)
router.patch('/account/edit', middlewares, upload.single('profilePhoto'), User.requestEditUserProfileController)
router.patch('/account/credentials/edit', middlewares, User.editUserCredentialsController)
// router.patch('/account/archive', middlewares, User.requestArchiveUserController)

router.post('/transaction/create',upload.single('attachment'), middlewares, User.createUserTransactionController)
router.get('/transactions/', middlewares, User.getUserTransactionsController)
router.get('/transaction/:id', middlewares, User.getUserTransactionController)
router.get('/transactions/search', middlewares, User.searchUserTransactionController)

//notifications
router.post('/notification/create', middlewares, User.createUserNotificationController)
router.get('/notifications/', middlewares, User.getUserNotificationsController)
router.patch('/notification/:id/edit', middlewares, User.editUserNotificationController)

export default router