const { NotFound } = require('http-errors')

const contactsOperations = require('../../model/contacts')

const getContactById = async (req, res, next) => {
  const { contactId } = req.params
  const contact = await contactsOperations.getContactById(contactId)
  if (!contact) {
    throw new NotFound(`Contact with id=${contactId} not found`)
  }
  res.json({
    status: 'success',
    code: 200,
    message: 'Get contact by id',
    data: {
      result: contact
    },
  })
}

module.exports = getContactById
