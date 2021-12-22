const express = require('express')

const { validation, ctrlWrapper, auth, upload } = require('../../middlewares')
const { users: ctrl } = require('../../controllers')
const {
  joiSignUpSchema,
  joiLogInSchema,
  joiSubscriptionSchema,
  joiVerifySchema
} = require('../../models/user')

const router = express.Router()

router.get('/current', auth, ctrlWrapper(ctrl.getCurrent))

router.post('/signup', validation(joiSignUpSchema), ctrlWrapper(ctrl.register))

router.post('/login', validation(joiLogInSchema), ctrlWrapper(ctrl.login))

router.get('/logout', auth, ctrlWrapper(ctrl.logout))

router.patch('/', auth, validation(joiSubscriptionSchema, 'Invalid data'), ctrlWrapper(ctrl.updateSubscription))

router.patch('/avatars', auth, upload.single('avatar'), ctrlWrapper(ctrl.updateAvatar))

router.get('/verify/:verificationToken', ctrlWrapper(ctrl.verifyMessage))

router.post('/verify', validation(joiVerifySchema, 'Invalid data'), ctrlWrapper(ctrl.reVerify))

module.exports = router
