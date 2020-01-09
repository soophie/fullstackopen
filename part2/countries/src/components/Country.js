import React, {useState} from 'react';

import Weather from './Weather';

const CountryDetails = ({country, show, setShow}) => {
    [show, setShow] = useState(show);
    return show ?
        <>
            <h1>{country.name}</h1>
            <p>Capital: {country.capital}</p>
            <p>Population: {country.population}</p>
            <h2>Languages</h2>
            <ul>
                {country.languages.map((language, index) => <li key={index}>{language.name}</li>)}
            </ul>
            <img src={country.flag} alt="Flag" width="100" />
            {country.capital && <Weather capital={country.capital} />}
        </>
        :
        <p>{country.name} <button onClick={() => setShow(!show)}>show</button></p>
    
}
export default CountryDetails
