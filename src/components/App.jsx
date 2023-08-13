import React, { useEffect } from 'react';
import { Section } from './Section/Section';
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';

import appCSS from './App.module.css';

import { Notification } from './Notification/Notification';
import { useDispatch, useSelector } from 'react-redux';
import { filterContacts, getContacts } from 'redux/selectors';
import { addContactThunk, fetchContactsThunk } from 'redux/thunks';
import { Loader } from './Loader/Loader';
import { Error } from './Error/Error';
import { ScrollUp } from './ScrollUp/ScrollUp';

export const App = () => {
  const { items, isLoading, error } = useSelector(getContacts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContactsThunk());
  }, [dispatch]);

  const addContact = body => {
    const isInclude = items.find(
      ({ name }) => name.toLowerCase() === body.name.toLowerCase()
    );

    if (isInclude) {
      alert(
        `Sorry, but the contact ${body.name} is already in your phone book `
      );
    } else {
      dispatch(addContactThunk(body));
    }
  };

  const filterList = useSelector(filterContacts);

  return (
    <div className={appCSS.main_container}>
      <Section
        title={'Phonebook'}
        styles={{ title: 'phonebook-title', container: 'first-container' }}
      >
        <ContactForm addContact={addContact} />
      </Section>

      {error ? (
        <Error error={error} />
      ) : (
        <Section
          title={'Contacts'}
          styles={{ title: 'contact-title', container: 'second-container' }}
        >
          <Filter />
          {isLoading ? (
            <Loader />
          ) : items?.length ? (
            <ContactList contacts={filterList} />
          ) : (
            <Notification message="Phonebook is empty" />
          )}
        </Section>
      )}
      <ScrollUp />
    </div>
  );
};
