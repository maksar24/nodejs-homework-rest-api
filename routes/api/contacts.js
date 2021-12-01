const express = require('express')

const { validation, ctrlWrapper } = require('../../middlewares')
const { joiSchema, favoriteJoiSchema } = require('../../models/contact')
const { contacts: ctrl } = require('../../controllers')

const router = express.Router()

router.get('/', ctrlWrapper(ctrl.listContacts))

router.get('/:contactId', ctrlWrapper(ctrl.getContactById))

router.post('/', validation(joiSchema, 'Missing required name field'), ctrlWrapper(ctrl.addContact))

router.delete('/:contactId', ctrlWrapper(ctrl.removeContact))

router.put('/:contactId', validation(joiSchema, 'Missing fields'), ctrlWrapper(ctrl.updateContact))

router.patch('/:contactId/favorite', validation(favoriteJoiSchema, 'Missing field favorite'), ctrlWrapper(ctrl.updateStatusContact))

module.exports = router
