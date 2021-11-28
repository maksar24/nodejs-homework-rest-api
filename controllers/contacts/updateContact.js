const { NotFound } = require('http-errors')

const contactsOperations = require('../../model/contacts')

const updateContact = async (req, res, next) => {
  const { contactId } = req.params
  const contact = await contactsOperations.updateContact(contactId, req.body)
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
