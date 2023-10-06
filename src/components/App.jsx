import { useEffect, useState } from "react";
import { ContactForm } from "./ContactForm/ContactForm";
import { ContactList } from "./ContactList/ContactList";
import { Filter } from "./SearchFilter/SearchFilter";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import {MainWrap,  Title} from './App.styled'
const LS_KEY = 'contacts'

export const App =()=>{

  const [contacts, setContacts] = useState([{id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
  {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
  {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
  {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},])

  const [filter, setFilter] = useState('')

  useEffect(()=>{
    const contactsData = localStorage.getItem(LS_KEY)
    const parsedContacts = JSON.parse(contactsData)
    if(parsedContacts){
       setContacts(parsedContacts)
         }
  }, [])


    useEffect(()=>{
      localStorage.setItem(LS_KEY, JSON.stringify(contacts))
    }, [contacts])

  const handleAddContacts = (newContact) => {
   const hasContactDuplicate = contacts.some(contact => contact.name.toLowerCase() === newContact.name.toLowerCase())
   if(hasContactDuplicate){
    Notify.failure(`${newContact.name} is already in your contacts`)
    return
   }
   setContacts((prevState) => [...prevState, newContact])
  }

  const handleDeleteContacts = (contactId) => {

      setContacts((prevState) => prevState.filter((contact) => contact.id !== contactId));
    };
    
  

  const handleFilterInputChange = (e) => {
    const value = e.target.value;
    setFilter(value);
  }

  const handleFilter = () =>{
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact => contact.name.toLowerCase().includes(normalizedFilter))
  }

  const filteredContacts = handleFilter() 

    return(
      <MainWrap>
        <Title>Phonebook</Title>
        <ContactForm handleAddContacts={handleAddContacts}/>
        <Filter value={filter} onChange={handleFilterInputChange}/>

        <Title>Contacts</Title>
        <ContactList contacts={filteredContacts} handleDeleteContacts={handleDeleteContacts}/>
      </MainWrap>
    )
    }

