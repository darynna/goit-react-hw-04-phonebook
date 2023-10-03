import { Component } from "react";
import { ContactForm } from "./ContactForm/ContactForm";
import { ContactList } from "./ContactList/ContactList";
import { Filter } from "./SearchFilter/SearchFilter";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import {MainWrap,  Title} from './App.styled'

export class App extends Component{
  state = {
    contacts: [{id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
    {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
    {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
    {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},],
    filter: ''
  }

  handleAddContacts = (newContact) => {
   const hasContactDuplicate = this.state.contacts.some(contact => contact.name.toLowerCase() === newContact.name.toLowerCase())
   if(hasContactDuplicate){
    Notify.failure(`${newContact.name} is already in your contacts`)
    return
   }
   this.setState((prevState) => ({
    contacts: [...prevState.contacts, newContact]
   }))
  }

  handleDeleteContacts = (contactId) => {
    this.setState(prevState => {
      return{
        contacts: prevState.contacts.filter((contact) => contact.id !== contactId)
      }
    })
  }

  handleFilterInputChange = (e) => {
    this.setState({
      filter: e.target.value
    })
  }

  handleFilter = () =>{
    const normalizedFilter = this.state.filter.toLowerCase();
    return this.state.contacts.filter(contact => contact.name.toLowerCase().includes(normalizedFilter))
  }

  render(){
    const filteredContacts = this.handleFilter()
    return(
      <MainWrap>
        <Title>Phonebook</Title>
        <ContactForm handleAddContacts={this.handleAddContacts}/>
        <Filter value={this.state.filter} onChange={this.handleFilterInputChange}/>

        <Title>Contacts</Title>
        <ContactList contacts={filteredContacts} handleDeleteContacts={this.handleDeleteContacts}/>
      </MainWrap>
    )
  }
}
