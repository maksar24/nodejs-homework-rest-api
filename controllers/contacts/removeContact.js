const { NotFound } = require('http-errors')

const contactsOperations = require('../../model/contacts')

const removeContact = async (req, res, next) => {
  const { contactId } = req.params
  const contact = await contactsOperations.removeContact(contactId)
  if (!contact) {
    throw new NotFound(`Product with id=${id} not found`)
  }
  res.json({
    status: 'success',
    code: 200,
    message: 'Contact deleted',
    data: {
      result: contact
    }
  })
}

module.exports = removeContact
