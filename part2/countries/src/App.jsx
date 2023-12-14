import { useState, useEffect } from 'react'
import CountryService from './services/countries'
import Display from './components/Display'

const App = () => {
  const [countries, setCountries] = useState([])
  const [findCountries, setFindCountries] = useState('')
  const [weather, setWeather] = useState({})

  const hook = () => {
    CountryService
      .getAll()
      .then(response => {
        setCountries(response.data)
      })
  }
  useEffect(hook, [])

  const handleFindCountry = (event) => {
    setFindCountries(event.target.value)
  }
  const selectCountry = (name) => {
    setFindCountries(name)
  }
  const addWeather = (capital) => {
    const hook = () => {
      CountryService
        .getWeather(capital)
        .then(response => 
          setWeather({
            'temp': response.data.main.temp, 
            'iconUrl': `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
            'wind': response.data.wind.speed
          })
      )}
    useEffect(hook, [])
  }

  const countriesFiltered = findCountries
    ? countries.filter(
      x => (
        x.name.common.toLowerCase().includes(findCountries.toLowerCase()) |
        x.name.official.toLowerCase().includes(findCountries.toLowerCase())
      )
    )
    : []

  return (
    <>
      <div>
        find countries <input type="text"
          id={1}
          value={findCountries}
          onChange={handleFindCountry}
        />
      </div>
      <Display
        countriesFiltered={countriesFiltered}
        selectCountry={selectCountry}
        addWeather={addWeather}
        weather={weather}
      />
    </>
  )
}

export default App
