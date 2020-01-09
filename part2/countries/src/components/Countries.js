import React from 'react';

import CountryDetails from './Country';

const Countries = ({countries, filter}) => {
    const filtered = filter ? countries.filter(country => country.name.toLowerCase().includes(filter.toLowerCase())) : null;
    if (!filter || filtered.length > 10) {
      return <p>too many matches</p>
    }
    
    if (filtered.length === 1) {
      return filtered.map((country) => <CountryDetails key={country.name} country={country} show={true} />)
    }

    return (
      <>
        {filtered.map((country, index) => <CountryDetails key={country.name} country={country} show={false} />)}
      </>
    )
  }

  export default Countries