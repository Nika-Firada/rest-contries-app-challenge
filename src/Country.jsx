import React from 'react'

function Country({darkMode, flag, name, population, region, capital, showDetails, code}) {
  // const showDetailsHandler = () => {
  //   showDetails(code);
  // };
  return (
    <div className={`country ${darkMode ? `darkMode` : ""}`}>
        <div className="flag_container">
            <img src={flag} alt="Flag" />
        </div>
        <div className="details">
            <h3 className='name'>{name}</h3>
            <p>Population:{" "}<span className={`values ${darkMode ? `darkMode` : ""}`}>{population}</span></p>
            <p>Region:{" "}<span className={`values ${darkMode ? `darkMode` : ""}`}>{region}</span></p>
            <p>Capital:{" "}<span className={`values ${darkMode ? `darkMode` : ""}`}>{capital}</span></p>
        </div>
    </div>
  )
}

export default Country;