import { ContactListItem } from 'components/ContactListItem/ContactListItem';
import {ContactsList} from "./ContactList.styled"

export const ContactList = ({ contacts, handleDeleteContacts }) => {
  return (
    <ContactsList>
      {contacts.map(contact => (
        <ContactListItem key={contact.id} contact={contact} handleDeleteContacts={handleDeleteContacts}/>
      ))}
    </ContactsList>
  );
};
