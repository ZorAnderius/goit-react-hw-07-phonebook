import { useState } from 'react';
import { nanoid } from 'nanoid';

import contactFormCSS from './ContsctForm.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { addContact } from 'redux/contactsSlice';
import { getContacts } from 'redux/selectors';

export const ContactForm = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const nameFormID = nanoid();
  const numberFormID = nanoid();

  const contactsFromStore = useSelector(getContacts);
  const dispatch = useDispatch();

  const handelChange = e => {
    const { name, value } = e.target;
    if (name === 'name') {
      setName(value);
    }
    if (name === 'number') {
      setNumber(value);
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    addContactToList({ id: nanoid(), name, number });
    reset();
  };

  const addContactToList = contact => {
    const isInclude = contactsFromStore.find(
      ({ name }) => name.toLowerCase() === contact.name.toLowerCase()
    );

    if (isInclude) {
      alert(
        `Sorry, but the contact ${contact.name} is already in your phone book `
      );
    } else {
      dispatch(addContact(contact));
    }
  };

  const reset = () => {
    setName('');
    setNumber('');
  };

  return (
    <form className={contactFormCSS.contact_form} onSubmit={handleSubmit}>
      <label className={contactFormCSS.contact_label} htmlFor={nameFormID}>
        Name
      </label>
      <input
        className={contactFormCSS.contact_name_input}
        type="text"
        name="name"
        pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        id={nameFormID}
        value={name}
        onChange={handelChange}
        required
      />

      <label className={contactFormCSS.contact_label} htmlFor={numberFormID}>
        Number
      </label>
      <input
        className={contactFormCSS.contact_number_input}
        type="tel"
        name="number"
        id={numberFormID}
        pattern="\+?\d{1,4}?[ .\-\s]?\(?\d{1,3}?\)?[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,9}"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        value={number}
        onChange={handelChange}
        required
      />

      <button className={contactFormCSS.contact_submit_btn} type="submit">
        Add contact
      </button>
    </form>
  );
};
