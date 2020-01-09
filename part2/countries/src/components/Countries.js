import React from 'react';

import Country from './Country';

const Countries = ({countries, filter}) => {
    const filtered = filter ? countries.filter(country => country.name.toLowerCase().includes(filter.toLowerCase())) : null;
    if (!filter || filtered.length > 10) {
      return <p>too many matches</p>
    }
    
    if (filtered.length === 1) {
      return filtered.map((country) => <Country key={country.name} country={country} />)
    }

    return (
      <>
        {filtered.map((country, index) => <p key={index}>{country.name}</p>)}
      </>
    )
  }

  export default Countries