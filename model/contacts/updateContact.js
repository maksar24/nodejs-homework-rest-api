const listContacts = require('./listContacts')
const replacementContacts = require('./replacementContacts')

const updateContact = async(id, body) => {
  const contacts = await listContacts()
  const idx = contacts.findIndex(contact => {
    const stringId = String(contact.id)
    return stringId === String(id)
  })
  if (idx === -1) {
    return null
  }
  contacts[idx] = { ...body, id }
  await replacementContacts(contacts)
  return contacts[idx]
}

module.exports = updateContact
