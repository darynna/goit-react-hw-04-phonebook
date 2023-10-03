import { useState } from 'react';
import {Form, Label, Input, AddButton} from './ContactForm.styled'
import { nanoid } from 'nanoid';

export const ContactForm =({handleAddContacts})=> {

  const [name, setName] = useState('')
  const [number, setNumber] = useState('')

 const handleChange = (e) =>{
    const {name, value} = e.target
    switch (name) {
      case 'name':
        setName(value);
        break;
    
      case 'number':
        setNumber(value);
        break;
      default:
        return  
    }
  }

  const handleSubmision = (e) =>{
    e.preventDefault();
    const newContact = {
      id: nanoid(),
      name,
      number,
    };
    handleAddContacts(newContact);
    setName('')
    setNumber("")
  }

    return (
      <Form onSubmit={handleSubmision}>
      <Label>Name
        <Input
          value={name}
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan."
          required
          onChange={handleChange}
        /></Label>
        <Label>Number
        <Input
          value={number}
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[ .\-\s]?\(?\d{1,3}?\)?[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          onChange={handleChange}
        /></Label>
        <AddButton type='submit'>Add contacts</AddButton>
      </Form>
    );
  }
