import React, { useEffect, useState } from "react"

const Select = ({ airports, airlines }) => {
  const [airline, setAirline] = useState('All Airlines')
  const [airport, setAirport] = useState('All Airports')

  const select = (event, setter) => {
    console.log(event.target.value)
    setter(event.target.value)
  }

  useEffect(() => {
    if (airline === 'All Airlines' && airport === 'All Airports') {
      document.querySelector('.showRoutes').disabled = true
    } else {
      document.querySelector('.showRoutes').disabled = false
    }
  }, [airline, airport])

  return (
    <p>
      Show routes on
      <select id="airlines" onChange={(event) => select(event, setAirline)}>
        <option>All Airlines</option>
        {Object.keys(airlines).map( key => (
          <option key={key}>{airlines[key]}</option>
        ))}
      </select>
      flying in or out of
      <select id="airports" onChange={(event) => select(event, setAirport)}>
        <option>All Airports</option>
        {Object.keys(airports).map( key => (
          <option key={key}>{airports[key]}</option>
        ))}
      </select>
      <button className="showRoutes">Show All Routes</button>
    </p>
  )
}

export default Select