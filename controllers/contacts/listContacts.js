const { BadRequest } = require('http-errors')

const { Contact } = require('../../models')

const listContacts = async (req, res, next) => {
  const { _id } = req.user
  const { page, limit, favorite = null } = req.query
  const searchItems = { owner: _id }
  if (favorite !== null) {
    searchItems.favorite = favorite
  }
  if (isNaN(page) || isNaN(limit)) {
    throw new BadRequest('Bad request')
  }
  const skip = (page - 1) * limit
  const contacts = await Contact.find(searchItems, '', { skip, limit: Number(limit) }).populate('owner', '_id email subscription')
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
