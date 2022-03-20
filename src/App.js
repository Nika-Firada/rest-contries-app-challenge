import { useState, useEffect, useRef } from 'react';
import React from 'react';
import "./App.css"
import SearchIcon from '@mui/icons-material/Search';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from './Header';
import Country from './Country';
import CountryDetail from './CountryDetail';
import { useNavigate}  from 'react-router-dom';





function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [countries, setCountrise] = useState([]);
  const countriesInputRef = useRef();
  const regionRef = useRef();
  // const navigate = useNavigate();

  const noCountries = countries.status || countries.message;
  

  const switchMode = () =>{
    setDarkMode((prevState) => !prevState);
  };

  useEffect(()=>{
    try {
      fetchData()
    } catch (error){
      console.log(error)
    }
  }, []);

  const fetchData = async () => {
    const response = await fetch('https://restcountries.com/v2/all');
    const data = await response.json();
    setCountrise(data);
  }

  const searchCountries = () =>{
    const searchValue = countriesInputRef.current.value;
    if(searchValue.trim()){
      const fetchSearch = async () => {
        const response = await fetch(`https://restcountries.com/v2/name/${searchValue}`)
        const data = await response.json();
        setCountrise(data);
      }
      try {
        fetchSearch()
      } catch (error){
        console.log(error);
      }
    } else {
      fetchData();
    }
  };

  const selectRegion = () =>{
    const regionValue = regionRef.current.value;
    if(regionValue.trim()){
      const fetchSelect = async () =>{
        const response = await fetch(`https://restcountries.com/v2/region/${regionValue}`);
        const data = await response.json();
        
        if(regionValue === 'All'){
          try {
            fetchData()
          } catch (error) {
            console.log(error);
          }
          return;
        }
        setCountrise(data);
      };
      try {
        fetchSelect();
      } catch (error){
        console.log(error);
      }
    }
  }
  const showDetails = (code) =>{

  }
  return (
    <BrowserRouter>
      <div className={`app ${darkMode ? `darkMode` : ""}`}>
        <Header onClick={switchMode} darkMode={darkMode} />
        <Routes>
          <Route path='/' element={
            <div className="app_body">
              <div className="inputs">
                <div className={`search_input ${darkMode ? `darkMode` : ""}`}>
                  <SearchIcon />
                  <input type="text" placeholder='Search for a country...' ref={countriesInputRef} onChange={searchCountries}/>
                </div>
                <div className={`select_region ${darkMode ? `darkMode` : ""}`}>
                  <select ref={regionRef} onChange={selectRegion}>
                    <option>All</option>
                    <option>Africa</option>
                    <option>Americas</option>
                    <option>Asia</option>
                    <option>Europe</option>
                    <option>Oceania</option>
                  </select>
                </div>
              </div>
              <div className="countries">
                {
                  !noCountries ? (
                    countries.map((country )=>(
                      <Country
                        darkMode={darkMode}
                        key={country.name} 
                        code={country.apha3code}
                        name={country.name}
                        capital={country.capital}
                        population={country.population}
                        region={country.region}
                        flag={country.flag}
                        showDetails={showDetails}
                      />
                    ))
                  ) : (
                    <p>No Contries found...</p>
                  )
                }
              </div>
            </div>
          } />
          <Route path='country-details' element={<CountryDetail darkMode={darkMode} />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App;
