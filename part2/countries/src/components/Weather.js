import React, {useState} from 'react';
import axios from 'axios';

const Weather = ({capital}) => {
    const [weather, setWeather] = useState([])
    useState(() => {
        axios.get('http://api.weatherstack.com/current', {
            params: {
                access_key: process.env.REACT_APP_WEATHER_KEY,
                query: capital
            }
        }).then(response => {
            setWeather(response.data.current)
        }, [])
    })
    return (
        <>
            <h1>Weather in {capital}</h1>
            <p>Temperature: {weather.temperature} Celsius</p>
            <img src={weather.weather_icons} alt={weather.weather_descriptions} />
        </>
    )
}

export default Weather