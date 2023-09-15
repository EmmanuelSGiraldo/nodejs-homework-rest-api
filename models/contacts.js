const fs = require('fs/promises');
const { v4: uuidv4 } = require("uuid");
const Joi = require('joi'); // Importa Joi para validación de datos

const contactsPath = "models/contacts.json";

const listContacts = async () => {
  const contactList = await fs.readFile(contactsPath);
  return JSON.parse(contactList.toString());
}

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const contact = contacts.find(contact => contact.id === contactId);
  return contact;
}

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const index = contacts.findIndex(item => item.id === contactId)
  if (index === -1) {
    return null
  }
  const [result] = contacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))
  return result
}

const addContact = async (body) => {
  const contacts = await listContacts();

  // Define un esquema de validación para la solicitud POST
  const createContactSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
  });

  const validationResult = createContactSchema.validate(body);

  if (validationResult.error) {
    throw new Error(validationResult.error.details[0].message);
  }

  const addContact = { id: uuidv4(), ...body };
  contacts.push(addContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return addContact;
}

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();

  // Define un esquema de validación para la solicitud PUT
  const updateContactSchema = Joi.object({
    name: Joi.string(),
    email: Joi.string().email(),
    phone: Joi.string(),
  });

  const validationResult = updateContactSchema.validate(body);

  if (validationResult.error) {
    throw new Error(validationResult.error.details[0].message);
  }

  const [contact] = contacts.filter(contact => contact.id === contactId);
  if (!contact) {
    throw new Error("Contact not found");
  }

  // Actualiza el contacto con los datos proporcionados
  if (body.name) contact.name = body.name;
  if (body.email) contact.email = body.email;
  if (body.phone) contact.phone = body.phone;

  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return contact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
