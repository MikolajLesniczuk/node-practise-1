const fs = require("fs");
const path = require("path");

const contactsPath = path.join(__dirname, "contacts.json");
console.log(contactsPath);

async function listContacts() {
  try {
    const data = await fs.promises.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(data);
    return contacts;
  } catch (error) {
    console.log(error.toString());
    return [];
  }
}

async function getContactById(contactId) {
  try {
    const data = await listContacts();
    const contact = data.find((el) => el.id === contactId);
    return contact;
  } catch (error) {
    console.log(error.toString());
    return null;
  }
}

async function removeContact(contactId) {
  try {
    const contacts = await listContacts();
    const updatedContacts = contacts.filter((item) => item.id !== contactId);
    await fs.promises.writeFile(
      contactsPath,
      JSON.stringify(updatedContacts, null, 2)
    );
    console.log("Contact removed successfully.");
  } catch (error) {
    console.error("Error removing contact:", error.message);
  }
}

async function addContact(name, email, phone) {
  try {
    const contacts = await listContacts();
    const newContact = { id: Date.now(), name, email, phone };
    const updatedContacts = [...contacts, newContact];
    await fs.promises.writeFile(
      contactsPath,
      JSON.stringify(updatedContacts, null, 2)
    );
    console.log("Contact added successfully.");
  } catch (error) {
    console.error("Error adding contact:", error.message);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
