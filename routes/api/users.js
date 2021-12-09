const express = require('express')

const { validation, ctrlWrapper, auth } = require('../../middlewares')
const { users: ctrl } = require('../../controllers')
const { joiSignUpSchema, joiLogInSchema, joiSubscriptionSchema } = require('../../models/user')

const router = express.Router()

router.get('/current', auth, ctrlWrapper(ctrl.getCurrent))

router.post('/signup', validation(joiSignUpSchema), ctrlWrapper(ctrl.register))

router.post('/login', validation(joiLogInSchema), ctrlWrapper(ctrl.login))

router.get('/logout', auth, ctrlWrapper(ctrl.logout))

router.patch('/', auth, validation(joiSubscriptionSchema, 'Invalid data'), ctrlWrapper(ctrl.updateSubscription))

module.exports = router
