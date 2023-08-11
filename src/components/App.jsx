import React from 'react';
import { Section } from './Section/Section';
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';

import appCSS from './App.module.css';

import { Notification } from './Notification/Notification';
import { useSelector } from 'react-redux';
import { getContacts } from 'redux/selectors';

export const App = () => {
  const contacts = useSelector(getContacts);

  return (
    <div className={appCSS.main_container}>
      <Section
        title={'Phonebook'}
        styles={{ title: 'phonebook-title', container: 'first-container' }}
      >
        <ContactForm />
      </Section>

      <Section
        title={'Contacts'}
        styles={{ title: 'contact-title', container: 'second-container' }}
      >
        <Filter />
        {contacts && contacts.length ? (
          <ContactList />
        ) : (
          <Notification message="Phonebook is empty" />
        )}
      </Section>
    </div>
  );
};
