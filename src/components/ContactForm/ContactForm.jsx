import { Component } from 'react';
import {Form, Label, Input, AddButton} from './ContactForm.styled'
import { nanoid } from 'nanoid';

export class ContactForm extends Component {
  state = {
    name: '',
    number: ''
  };

  handleChange = (e) =>{
    const {name, value} = e.target
    this.setState({
        [name]: value
    })
  }

  handleSubmision = (e) =>{
    e.preventDefault();
    const { name, number } = this.state;
    const newContact = {
      id: nanoid(),
      name,
      number,
    };
    this.props.handleAddContacts(newContact);
    this.setState({
        name: '',
        number: ''
    })
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmision}>
      <Label>Name
        <Input
          value={this.state.name}
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan."
          required
          onChange={this.handleChange}
        /></Label>
        <Label>Number
        <Input
          value={this.state.number}
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[ .\-\s]?\(?\d{1,3}?\)?[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          onChange={this.handleChange}
        /></Label>
        <AddButton type='submit'>Add contacts</AddButton>
      </Form>
    );
  }
}
