const listContacts = require('./listContacts')
const replacementContacts = require('./replacementContacts')

const removeContact = async (id) => {
  const contacts = await listContacts()
  const idx = contacts.findIndex(contact => {
    const stringId = String(contact.id)
    return stringId === String(id)
  })
  if (idx === -1) {
    return null
  }
  const filteredContacts = contacts.filter((_, index) => index !== idx)
  await replacementContacts(filteredContacts)
  return contacts[idx]
}

module.exports = removeContact
