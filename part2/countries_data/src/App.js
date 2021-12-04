import React, { useState, useEffect } from 'react'
import axios from 'axios'

const CountryList = ({ countries }) => (
  countries.map(country =>
    <div key={country.name}>{country.name}</div>
  )
)

const Weather = ({ country }) => {
  const [weather, setWeather] = useState(false)

  useEffect(() => {
    const apiKey = process.env.REACT_APP_API_KEY
    axios
      .get(
        'http://api.weatherstack.com/current'
        + `?query=${country.capital}`
        +`,${country.name}`
        + `&units=m`
        + `&access_key=${apiKey}`
      )
      .then(r => {
        setWeather(r.data)
      })
  }, [country])

  return !weather
    ? ''
    : (
      <div>
        <h3>Weather in {country.name}</h3>
        <div>
          <b>temperature</b>: {weather.current.temperature} celcius
        </div>
        <div>
          <img alt="weather" src={weather.current.weather_icons} />
        </div>
        <div>
          <b>wind:</b> {weather.current.wind_speed} km/h, direction {weather.current.wind_dir}
        </div>
      </div>
    )
}

const CountryDescription = ({ country }) => {
  return (
    <div>
      <h2>{country.name}</h2>
      <div>capital {country.capital}</div>
      <div>population {country.population}</div>
      <h3>languages</h3>
      <ul>
        {country.languages.map(
          lang => <li key={lang.iso639_1}>{lang.name}</li>
        )}
      </ul>
      <img alt="flag" src={country.flag} width="100" height="100" />
      <Weather country={country} />
    </div>
  )
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])
  const [query, setQuery] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(r => {
        setCountries(r.data)
      })
  }, [])

  const filter = e => {
    const filteredCountries = countries.filter(
      country => {
        return country.name.toLowerCase().includes(e.target.value.toLowerCase())
      }
    )
    setFilteredCountries(filteredCountries)
    setQuery(e.target.value)
  }

  const chooseCountryView = () => {
    if (!query || filteredCountries.length === 0)
      return
    if (filteredCountries.length > 10)
      return <div>Too many matches. specify another filter</div>
    if (filteredCountries.length > 1) {
      return <CountryList countries={filteredCountries} />
    }
    const country = filteredCountries[0]
    return <CountryDescription country={country} />
  }
  
  return (
    <>
    find countries <input onChange={filter} />
    {chooseCountryView()}
    </>
  )
}

export default App