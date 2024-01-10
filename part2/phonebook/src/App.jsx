import { useState, useEffect } from 'react'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newPerson, setNewPerson] = useState({name:'', number: '', id: 4})
  const [filterNames, setFilterNames] = useState('')
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  const hook = () => {
    personService
      .getAll()
      .then(response => setPersons(response.data))
    }
  useEffect(hook, [])

  const Notification = ({ message, className }) => {
    if (message === null) {
      return null
    }
    return (
      <div className={className}>
        {message}
      </div>
    )
  }

  const addPerson = (event) => {
    event.preventDefault()
    if (persons.some(x => x.name === newPerson.name)){
      confirm(`${newPerson.name} is already added to the phonebook, replace the old number with a new one?`)
      // below bug fixes after submitting the solutions to part 2 as part of completing part 3
      // copied from the example solution
      const person = persons.find(person => person.name == newPerson.name)
      personService
        .update(person.id, {
          ...person, 
          number: newPerson.number
        })
        .then((updatedPerson) => {
          setPersons(persons.map(p => p.id !== person.id ? p : updatedPerson))
        })
        .catch(error => {
          setErrorMessage(
            `Information of ${newPerson.name} has been removed from the server`
          ) 
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)}
      )
    } else {
      personService.create(newPerson)
      setPersons(persons.concat(newPerson))
      setSuccessMessage(`Added ${newPerson.name}`)
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
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
      <Notification message={successMessage} className={'success'}/>
      <Notification message={errorMessage} className={'error'}/>
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