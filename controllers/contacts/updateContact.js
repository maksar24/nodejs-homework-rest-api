const { NotFound } = require('http-errors')
const ObjectID = require('mongoose').Types.ObjectId

const { Contact } = require('../../models')

const updateContact = async (req, res, next) => {
  const { contactId } = req.params
  const validationId = ObjectID.isValid(contactId)
  if (validationId === false) {
    throw new NotFound(`Contact with id=${contactId} not found`)
  }
  const contact = await Contact.findByIdAndUpdate(contactId, req.body, { new: true })
  if (!contact) {
    throw new NotFound(`Contact with id=${contactId} not found`)
  }
  res.json({
    status: 'success',
    code: 200,
    data: {
      result: contact
    },
    message: 'New contact added'
  })
}

module.exports = updateContact
