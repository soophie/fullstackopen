import React, {useState, useEffect} from 'react';
import './App.css';
import axios from 'axios'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [message, setMessage] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:1337/persons').then(response => {
      setPersons(response.data)
    })
  }, [])
  const addName = (event) => {
    event.preventDefault()
    const doublette = persons.filter(person => person.name === newName);
    if (doublette.length > 0) {
      window.alert(`${newName} is already added to phonebook`)
      return false
    }
    setMessage(
      `Added ${newName}`
    )
    setTimeout(() => {
      setMessage(null)
    }, 5000)
    const personObject = {
      name: newName,
      number: newNumber
    }
    setPersons(persons.concat(personObject));
    setNewName('')
    setNewNumber('')
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
      <Persons persons={filtered} />
    </div>
  )
}

export default App;
