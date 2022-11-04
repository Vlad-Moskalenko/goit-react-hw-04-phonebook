import PropTypes from 'prop-types';

import { ContactForm } from './ContactForm';
import { Filter } from './Filter';
import { ContactList } from './ContactList';
import { useState, useEffect } from 'react';

export function App() {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const contactsList = localStorage.getItem('contactsList');
    if (contactsList) setContacts(JSON.parse(contactsList));
  }, []);

  useEffect(() => {
    localStorage.setItem('contactsList', JSON.stringify(contacts));
  }, [contacts]);

  const onFormSubmit = e => {
    e.preventDefault();

    const contact = {
      name: e.target.elements.name.value,
      id: e.target.elements.name.id,
      number: e.target.elements.number.value,
    };

    onAddContact(contact);

    e.target.reset();
  };

  const onAddContact = contactObj => {
    if (isUniqueContact(contactObj.name))
      return alert(`${contactObj.name} is already in contacts`);

    setContacts([...contacts, contactObj]);
  };

  const isUniqueContact = uniqueParam =>
    contacts.find(
      contact => contact.name.toLowerCase() === uniqueParam.toLowerCase()
    );

  const findContact = e => setFilter(e.target.value);

  const deleteContact = e =>
    setContacts(contacts.filter(({ id }) => id !== e.target.parentElement.id));

  return (
    <div className="app-wrapper">
      <h1>Phonebook</h1>
      <ContactForm onSubmit={onFormSubmit} />
      <h2>Contacts</h2>
      <Filter onChange={findContact} />
      <ContactList
        contacts={contacts}
        filter={filter}
        deleteContact={deleteContact}
      />
    </div>
  );
}

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      number: PropTypes.string,
    })
  ),
  filter: PropTypes.string,
};
