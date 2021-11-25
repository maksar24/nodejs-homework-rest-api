const shortid = require('shortid')

const listContacts = require('./listContacts')
const replacementContacts = require('./replacementContacts')

const addContact = async(data) => {
  const contacts = await listContacts()
  const newContacts = { id: shortid.generate(), ...data }
  contacts.push(newContacts)
  await replacementContacts(contacts)
  return newContacts
}

module.exports = addContact
