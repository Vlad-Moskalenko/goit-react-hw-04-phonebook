import { useState } from 'react';
import { nanoid } from 'nanoid';

import { Section } from './Section/Section';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactsList } from './ContactsList/ContactsList';
import { Filter } from './Filter/Filter';
import { useLocalStorage } from 'hooks/useLocalStorage';

export const App = () => {
  const [contacts, setContacts] = useLocalStorage('contacts', []);
  const [filter, setFilter] = useState('');

  const onSearch = e => setFilter(e.target.value);

  const isNotUniqueContact = newContactName => {
    return contacts.find(
      ({ name }) => name.toLowerCase() === newContactName.toLowerCase()
    );
  };

  const onAddContact = ({ name, number }) => {
    if (isNotUniqueContact(name)) {
      return alert(`${name} is already in contacts`);
    }

    const newContact = {
      id: nanoid(),
      name: name,
      number: number,
    };

    setContacts(prevState => [...prevState, newContact]);
  };

  const onDeleteContact = contactId => {
    setContacts(prevState => prevState.filter(({ id }) => id !== contactId));
  };

  return (
    <main className="app-wrapper">
      <Section title="Phonebook">
        <ContactForm onAddContact={onAddContact} />
      </Section>
      <Section title="Contacts">
        {contacts.length > 0 ? (
          <>
            <Filter onSearch={onSearch} filter={filter} />
            <ContactsList
              contactsList={contacts}
              filter={filter}
              onDeleteContact={onDeleteContact}
            />
          </>
        ) : (
          <p>There are no contacts yet...</p>
        )}
      </Section>
    </main>
  );
};
