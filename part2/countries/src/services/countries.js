import axios from 'axios'

const getAll = () => {
    const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/'
    return axios.get(baseUrl.concat('api/all'))
}
const getWeather = (capital) => {
    const apiKey = import.meta.env.VITE_API_KEY
    const baseUrl = 'http://api.openweathermap.org/data/2.5/weather'
    return axios.get(baseUrl.concat(`?q=${capital}&units=metric&APPID=${apiKey}`))
}

export default {getAll, getWeather}