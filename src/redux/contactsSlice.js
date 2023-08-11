import { createSlice } from '@reduxjs/toolkit';
import contactsData from '../components/contacts_data.json';

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState: { contactList: [...contactsData] },
  reducers: {
    addContact(state, { payload }) {
      state.contactList = [...state.contactList, payload];
    },
    deleteContact(state, { payload }) {
      const index = state.contactList.findIndex(task => task.id === payload);
      state.contactList.splice(index, 1);
    },
  },
});

export const { addContact, deleteContact } = contactsSlice.actions;
export const contactReducer = contactsSlice.reducer;
