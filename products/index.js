import * as contacts from "./contacts.js";
import yargs from "yargs/yargs";
import { hideBin } from "yargs/helpers";

const argv = yargs(hideBin(process.argv)).argv;

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      console.table(await contacts.listContacts());
      break;
    case "get":
      console.log(await contacts.getContactById(id));
      break;
    case "add":
      await contacts.addContact(name, email, phone);
      console.log(await contacts.listContacts());
      break;
    case "remove":
      await contacts.removeContact(Number(id));
      console.log(await contacts.listContacts());
      break;
    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
