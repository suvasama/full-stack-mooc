import { useState, useEffect } from 'react'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newPerson, setNewPerson] = useState({name:'', number: '', id: 4})
  const [filterNames, setFilterNames] = useState('')
  const hook = () => {
    personService
      .getAll()
      .then(response => setPersons(response.data))
    }
  useEffect(hook, [])

  const addPerson = (event) => {
    event.preventDefault()
    if (persons.some(x => x.name === newPerson.name)){
      confirm(`${newPerson.name} is already added to the phonebook, replace the old number with a new one?`)
      const personsFiltered = persons.filter(person => person.name != newPerson.name)
      setPersons([
        ...personsFiltered, 
        newPerson
      ])
      personService.update(newPerson.id, newPerson)
    } else {
      personService.create(newPerson)
      setPersons(persons.concat(newPerson))
    }
  }
  const deletePerson = (id) => {
    const personToDelete = persons.find(person => person.id == id)
    confirm(`Delete ${personToDelete.name}?`)
    setPersons(persons.filter(person => person.id != id))
    personService.remove(id)
  }
  const handleNewName = (event) => {
    const updatedId = newPerson.id + 1
    setNewPerson({
      ...newPerson,
      id: updatedId, 
      name: event.target.value
    })
  }
  const handleNewNumber = (event) => {
    setNewPerson({
      ...newPerson, 
      number: event.target.value
    })
  }
  const handleFilterNames = (event) => {
    setFilterNames(event.target.value)
  }
  const personsToShow = filterNames 
    ? persons.filter(x => x.name.toLowerCase().includes(filterNames.toLowerCase()))
    : persons

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={filterNames} onChange={handleFilterNames}/>
      <h3>add a new</h3>
      <PersonForm 
        onSubmit={addPerson}
        person={newPerson}
        changeName={handleNewName}
        changeNumber={handleNewNumber}
      />
      <h3>Numbers</h3>
      <Persons ar={personsToShow} onClick={deletePerson}/>
    </div>
  )
}

export default App