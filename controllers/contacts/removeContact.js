const { NotFound } = require('http-errors')

const { Contact } = require('../../models')

const removeContact = async (req, res, next) => {
  const { contactId } = req.params
  const contact = await Contact.findByIdAndRemove(contactId)
  if (!contact) {
    throw new NotFound(`Product with id=${contactId} not found`)
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
