import { promises as fs } from "fs";
import path from "path";

const __dirname = path
  .dirname(decodeURI(new URL(import.meta.url).pathname))
  .replace(/^\/([a-zA-Z]:\/)/, "$1");
const contactsPath = path.join(__dirname, "db", "contacts.json");

async function listContacts() {
  const data = await fs.readFile(contactsPath, "utf8");
  return JSON.parse(data);
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  return contacts.find((contact) => contact.id === contactId);
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const filteredContacts = contacts.filter(
    (contact) => contact.id !== contactId
  );
  await fs.writeFile(contactsPath, JSON.stringify(filteredContacts));
}

async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const newContact = {
    id: Math.max(...contacts.map((c) => c.id)) + 1,
    email,
    phone,
  };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
}

export { listContacts, getContactById, removeContact, addContact };
