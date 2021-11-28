const contactsOperations = require('../../model/contacts')

const listContacts = async (req, res, next) => {
  const contacts = await contactsOperations.listContacts()
  res.json({
    status: 'success',
    code: 200,
    message: 'Get contacts',
    data: {
      result: contacts
    },
  })
}

module.exports = listContacts
