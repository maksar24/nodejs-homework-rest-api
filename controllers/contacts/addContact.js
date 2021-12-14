const { Contact } = require('../../models')

const addContact = async (req, res) => {
  const { _id } = req.user
  const newContact = await Contact.create({ ...req.body, owner: _id })
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
