import { Notification } from 'components/Notification/Notification';
import contactListCSS from './ContactList.module.css';
import { deleteContact } from 'redux/contactsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { getContacts, getFilterQuery } from 'redux/selectors';

export const ContactList = () => {
  const contacts = useSelector(getContacts);
  const dispatch = useDispatch();

  const filterQuery = useSelector(getFilterQuery);

  const checkSameContact = () => {
    const normalaizedFilter = filterQuery.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalaizedFilter)
    );
  };

  const filterList = checkSameContact();

  const onRemoveContact = contactID => {
    dispatch(deleteContact(contactID));
  };

  const isFilterListEmpty = filterList.length;
  return isFilterListEmpty ? (
    <ul className={contactListCSS.contact_list}>
      {filterList.map(({ id, name, number }) => (
        <li key={id} className={contactListCSS.contact_item}>
          <div className={contactListCSS.contact_text_wrap}>
            <p className={contactListCSS.contact_name}>{name}</p>
            <p className={contactListCSS.contact_number}>{number}</p>
          </div>
          <button
            className={contactListCSS.contact_delete_btn}
            onClick={() => onRemoveContact(id)}
          >
            Remove
          </button>
        </li>
      ))}
    </ul>
  ) : (
    <Notification message="No matches found" />
  );
};
