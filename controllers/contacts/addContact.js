const contactsOperations = require('../../model/contacts')

const addContact = async (req, res, next) => {
  const newContact = await contactsOperations.addContact(req.body)
  res.status(201).json({
    status: 'success',
    code: 201,
    message: 'New contact added',
    data: {
      result: newContact
    },
  })
}

module.exports = addContact
