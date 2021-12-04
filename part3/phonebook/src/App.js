import React, { useState, useEffect } from 'react'
import contactService from './services/contacts'

const Search = ({ onChange }) => (
  <input onChange={onChange} />
)

const AddContactForm = ({
    onSubmit, newName, newNumber, nameOnChange, numberOnChange
  }) => {
  return (
    <form onSubmit={onSubmit}>
      <div>
        name: <input value={newName} onChange={nameOnChange} />
      </div>
      <div>
        number: <input value={newNumber} onChange={numberOnChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Contacts = ({ contacts, removeContact }) => {
  return (
    <div>
      {contacts.map(
        contact => (
          <Contact
          key={contact.id}
          contact={contact}
          removeContact={removeContact}
          />
        )
      )}
    </div>
  )
}

const Contact = ({ contact, removeContact }) => (
  <div>
    {contact.name} {contact.number}
    <button onClick={() => removeContact(contact)}>
      delete
    </button>
  </div>
)

/*
Accepted types for notificationType are strings 'error' and success'.
*/
const Notification = ({ message, notificationType }) => {
  if (message === null) {
    return null
  }
  if (notificationType !== 'error' && notificationType !== 'success' && notificationType !== null) {
    throw Error(
      `Incorrect notificationType parameter. Accepted values are `
      + `'error' and 'success' strings.`
    )
  }
  return (
    <div className={`notification ${notificationType}`}>
      {message}
    </div>
  )
}

const App = () => {
  /* States
  ========================================================================== */
  const [contacts, setContacts] = useState([])
  const [filteredContacts, setFilteredContacts] = useState([])
  const [filter, setFilter] = useState('')
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [notification, setNotificationMessage] = useState(null)
  const [notificationType, setNotificationType] = useState(null)

  /* Effects
  ========================================================================== */
  useEffect(() => {
    contactService.getAll().then(initContacts => {
      setContacts(initContacts)
    })
  }, [])

  /* Handlers
  ========================================================================== */
  const filterContacts = (searchFilter, contacts) => {
    if (searchFilter === '') {
      setFilteredContacts([])
      setFilter(searchFilter)
      return
    }
    const filteredContacts = contacts.filter(contact => {
      return contact.name.toLowerCase().includes(searchFilter.toLowerCase())
    })
    setFilteredContacts(filteredContacts)
    setFilter(searchFilter)
  }

  const addContact = e => {
    e.preventDefault()

    if (contacts.some(contact => contact.number === newNumber)) {
      return alert(`${newNumber} is already added to phonebook`)
    }

    const contactToUpdate = contacts.find(contact => contact.name === newName)
    if (contactToUpdate) {
      if (!window.confirm(
        'This contact already exists.'
        + ' Do you want update number?'
      )) {
        return
      }

      updateContact(contactToUpdate, newNumber)
      return
    }

    const newContact = {
      name: newName,
      number: newNumber
    }
    
    contactService
      .create(newContact)
      .then(returnedContact => {
        const updatedContacts = contacts.concat(returnedContact)
        setContacts(updatedContacts)
        filterContacts(filter, updatedContacts)
        setNotificationMessage('Contact added successfully')
        setNotificationType('success')
        setTimeout(() => {
          setNotificationMessage(null)
        },4000)
      })
      .catch(error => {
        setNotificationMessage(error.response.data.error)
        setNotificationType('error')
        setTimeout(() => {
          setNotificationMessage(null)
        },10000)
      })
    setNewName('')
    setNewNumber('')
  }

  const updateContact = (contact, newNumber) => {
    const updatedContact = { ...contact, number: newNumber }
    contactService
      .update(contact.id, updatedContact)
      .then(returnedContact => {
        const updatedContacts = contacts.map(elem => (
          elem.id !== contact.id ? elem : returnedContact
        ))
        setContacts(updatedContacts)
          filterContacts(filter, updatedContacts)
      })
      .catch(error => {
        setNotificationMessage(error.response.data.error)
        setNotificationType('error')
        setTimeout(() => {
          setNotificationMessage(null)
        },10000)
      })
  }
  
  const updateName = e => {
    setNewName(e.target.value)
  }

  const updateNumber = e => {
    setNewNumber(e.target.value)
  }

  const removeContact = (contact) => {
    contactService
      .remove(contact.id)
      .catch(err => {
        setNotificationMessage(`Contact ${contact.name} does not exist anymore.`)
        setNotificationType('error')
        setTimeout(() => {
          setNotificationMessage(null)
        },4000)
      })
      .finally(() => {
        const updatedContacts = contacts.filter(elem => elem.id !== contact.id)
        setContacts(updatedContacts)
        filterContacts(filter, updatedContacts)
      })
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification} notificationType={notificationType} />
      <div>
        Search: <Search onChange={e => filterContacts(e.target.value, contacts)} />
      </div>
      <h2>Add new</h2>
      <AddContactForm
        onSubmit={addContact}
        newName={newName}
        newNumber={newNumber}
        nameOnChange={updateName}
        numberOnChange={updateNumber}
      />
      <h2>Numbers</h2>
      <Contacts
        contacts={
          filter === '' ? contacts : filteredContacts
        }
        removeContact={removeContact}
      />
    </div>
  )
}

export default App