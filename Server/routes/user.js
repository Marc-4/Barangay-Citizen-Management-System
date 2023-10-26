import { Router } from "express";
import * as User from '../controllers/User/index.js'
const router = Router()

router.post('/account/register', User.registerUserController)
router.post('/account/create', User.createUserProfileController)
router.get('/account/', User.getUserController)

router.patch('/account/edit', User.requestEditUserController)
router.patch('/account/archive', User.requestEditUserController)

router.post('/transaction/create', User.createUserTransactionController)
router.patch('/transaction/:id/edit', User.editUserTransactionController)

export default router