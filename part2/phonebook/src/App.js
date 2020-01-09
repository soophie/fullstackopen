import React, {useState, useEffect} from 'react';
import './App.css';

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'

import phonebookService from './services/phonebook';

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [message, setMessage] = useState(null);

  useEffect(() => {
    phonebookService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])
  const addName = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }
    const doublette = persons.filter(person => person.name === newName);
    if (doublette.length > 0) {
      const updateDialog = window.confirm(`${newName} is already added to phonebook. Do you want to update the number?`)
      if (updateDialog) {
        phonebookService.update(doublette[0].id, personObject).then(response => {
          setPersons(persons.map(person => (person.name === newName) ? response : person));
          setMessage(`Successfully updated ${newName}`)
          setTimeout(() => {setMessage(null)}, 5000)
        })
      }
      return false
    }
    setMessage(
      `Added ${newName}`
    )
    setTimeout(() => {
      setMessage(null)
    }, 5000)
    
    phonebookService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson));
        setNewName('')
        setNewNumber('')
      })
    
  }
  const addNewName = (event) => 
    setNewName(event.target.value)
  
  const addNewNumber = (event) =>
    setNewNumber(event.target.value)

  const [filter, setFilter] = useState('')
  const handleFilter = (event) => {
    setFilter(event.target.value)
  }
  const filtered = filter ? persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase())) : persons 
  
  const removePersonOf = (person) => {
    const confirmDialog = window.confirm(`Are you sure you want to delete ${person.name}?`)
    if (confirmDialog) {
      phonebookService.remove(person.id).then(response => {
        setPersons(persons.filter(p => p.id !== person.id))
        setMessage(`Successfully deleted ${person.name}`)
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      })
    }
    
  }
  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={message} />
      <Filter filter={filter} onChange={handleFilter} />
      <h2>Add new entry</h2>
      <PersonForm 
        onSubmit={addName} 
        name={newName} 
        number={newNumber} 
        onNameChange={addNewName} 
        onNumberChange={addNewNumber} 
      />
      <h2>Numbers</h2>
      <Persons persons={filtered} removePerson={removePersonOf} />
    </div>
  )
}

export default App;
