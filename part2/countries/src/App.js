import React, {useState, useEffect} from 'react';
import axios from 'axios';

import Filter from './components/Filter';
import Countries from './components/Countries';

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2/all').then(response => {
      setCountries(response.data)
    })
  }, [])
  
  const handleFilter = (event) => {
    setFilter(event.target.value)
  }

  return (
    <div className="App">
      <Filter filter={filter} onChange={handleFilter} />
      <Countries countries={countries} filter={filter} />
    </div>
  );
}

export default App;
