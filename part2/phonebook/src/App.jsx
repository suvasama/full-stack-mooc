import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newPerson, setNewPerson] = useState({name:'', number: '', id: 4})
  const [filterNames, setFilterNames] = useState('')
  const hook = () => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => setPersons(response.data))
    }
  useEffect(hook, [])
  const addPerson = (event) => {
    event.preventDefault()
    if (persons.some(x => x.name === newPerson.name)){
      alert(`${newPerson.name} is already added to the phonebook`)
    } else {
      setPersons(persons.concat(newPerson))
    }
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
    setNewPerson({...newPerson, number: event.target.value})
  }
  const handleFilterNames = (event) => {
    setFilterNames(event.target.value)
  }
  const namesToShow = filterNames 
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
      <Persons ar={namesToShow}/>
    </div>
  )
}

export default App