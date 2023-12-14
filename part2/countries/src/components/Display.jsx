const DisplayCountry = ({country, weather}) => {
    return (
        <>
            <h1>{country.name.common}</h1>
            <div>capital {country.capital}</div>
            <div>area {country.area}</div>
            <h3>languages:</h3>
            {Object.keys(country.languages).map(
                (language, i) =>
                <li key={i}>{country.languages[language]}</li>)
            }
            <img src={country.flags['svg']} alt="flag" />
            <h2>Weather in {country.capital}</h2>
            <div>temperature {weather.temp} Celcius</div>
            <img src={weather.iconUrl} alt="weather icon" />
            <div>wind {weather.wind} m/s</div>
        </>
    )}
  
const Button = (props) => {
    return (
        <button type="submit" onClick={props.onClick}>show</button>
    )
}

const DisplayCountries = (props) => {
    if (props.countriesFiltered.length == 1) {
        const countryToShow = props.countriesFiltered[0]
        props.addWeather(countryToShow.capital)
        return <DisplayCountry 
            country={countryToShow}
            weather={props.weather}
        /> 
    }
    return (
        <>
            {props.countriesFiltered.map(
                (country, i) => <div key={i}>
                    {country.name.common} 
                    <Button onClick={() => props.selectCountry(country.name.common)}/>
                </div>
            )}
        </>)
}

const Display = (props) => {
    if (props.countriesFiltered.length > 10) {
        return <div>Too many matches, specify another filter</div>
    }
    return <DisplayCountries 
        countriesFiltered={props.countriesFiltered}
        selectCountry={props.selectCountry}
        weather={props.weather}
        addWeather={props.addWeather}
    />
}

export default Display