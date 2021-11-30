const { NotFound } = require('http-errors')

const { Contact } = require('../../models')

const updateStatusContact = async (req, res, next) => {
  const { contactId } = req.params
  const { favorite } = req.body
  const contact = await Contact.findByIdAndUpdate(contactId, { favorite }, { new: true })
  if (!contact) {
    throw new NotFound(`Contact with id=${contactId} not found`)
  }
  res.json({
    status: 'success',
    code: 200,
    data: {
      result: contact
    },
    message: 'Contact status changed'
  })
}

module.exports = updateStatusContact
