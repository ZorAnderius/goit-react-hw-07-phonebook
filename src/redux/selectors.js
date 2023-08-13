import { createSelector } from '@reduxjs/toolkit';

export const getContacts = state => state.contacts;

export const getFilterQuery = state => state.filter;

// export const filterContacts = state => {
//   const normalaizedFilter = state.filter.toLowerCase();
//   return state.contacts.items?.filter(contact =>
//     contact.name.toLowerCase().includes(normalaizedFilter)
//   );
// };

export const filterContacts = createSelector(
  [getContacts, getFilterQuery],
  (contacts, filter) =>
    contacts.items?.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    )
);
