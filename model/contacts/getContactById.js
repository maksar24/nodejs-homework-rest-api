const listContacts = require('./listContacts')

const getContactById = async (id) => {
  const contacts = await listContacts()
  const result = contacts.find(contact => {
    const stringId = String(contact.id)
    return stringId === String(id)
  })
  if (!result) {
    return null
  }
  return result
}

module.exports = getContactById
