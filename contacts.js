const { log } = require("console");
const fs = require("fs/promises");
const { nanoid } = require("nanoid");

const path = require("path");
const contactsPath = path.join(__dirname, "db", "contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath, "utf-8");
  return JSON.parse(data);
};

// listContacts();

const getContactById = async (id) => {
  const contactId = String(id);
  const contactsAll = await listContacts();
  const result = contactsAll.find((contact) => contact.id === contactId);
  return result || null;
};

const addContact = async (data) => {
  const allNewContacts = await listContacts();
  const newContact = {
    id: nanoid(),
    ...data,
  };
  allNewContacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(allNewContacts, null, 2));
  return newContact;
};

const removeContact = async (id) => {
  const contactId = String(id);
  const allNewContacts = await listContacts();
  const index = allNewContacts.findIndex((contact) => contact.id === contactId);
  if (index === -1) {
    return null;
  }
  const [result] = allNewContacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(allNewContacts, null, 2));

  return result;
};

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
};
