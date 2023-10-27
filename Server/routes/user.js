import { Router } from "express";
import * as User from '../controllers/User/index.js'
import { authToken, authUser } from '../middlewares/index.js'

const middlewares = [authToken, authUser]
const router = Router()

router.post('/account/register', User.registerUserController)
router.post('/account/create-profile', middlewares, User.createUserProfileController)
router.get('/account/', middlewares, User.getUserController)

router.patch('/account/edit', middlewares, User.requestEditUserController)
router.patch('/account/archive', middlewares, User.requestEditUserController)

router.post('/transaction/create', middlewares, User.createUserTransactionController)
router.patch('/transaction/:id/edit', middlewares, User.editUserTransactionController)

export default router