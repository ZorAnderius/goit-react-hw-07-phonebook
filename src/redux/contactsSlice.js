import { createSlice } from '@reduxjs/toolkit';
import { initialState } from './initialState';
import {
  addContactThunk,
  deleteContactThunk,
  fetchContactsThunk,
} from './thunks';
import {
  handleFulfilled,
  handleFulfilledAddContacts,
  handleFulfilledContacts,
  handleFulfilledDeleteContacts,
  handlePending,
  handleRejected,
} from './handler';

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    // addContact(state, { payload }) {
    //   state.contactList = [...state.contactList, payload];
    // },
    // deleteContact(state, { payload }) {
    //   const index = state.contactList.findIndex(task => task.id === payload);
    //   state.contactList.splice(index, 1);
    // },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchContactsThunk.fulfilled, handleFulfilledContacts)
      .addCase(addContactThunk.fulfilled, handleFulfilledAddContacts)
      .addCase(deleteContactThunk.fulfilled, handleFulfilledDeleteContacts)
      .addMatcher(action => action.type.endsWith('/fulfilled'), handleFulfilled)
      .addMatcher(action => action.type.endsWith('/pending'), handlePending)
      .addMatcher(action => action.type.endsWith('/rejected'), handleRejected);
  },
});

export const { addContact, deleteContact } = contactsSlice.actions;
export const contactReducer = contactsSlice.reducer;
