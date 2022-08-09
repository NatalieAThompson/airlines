import React, { useEffect } from "react"
import Options from "./Options";

const Select = ({ airports, airlines, selected, setters, filters }) => {
  const [ airport, airline ] = selected;

  useEffect(() => {
    if (airline === 'All Airlines' && airport === 'All Airports') {
      document.querySelector('.showRoutes').disabled = true
    } else {
      document.querySelector('.showRoutes').disabled = false
    }

    const filteredAirlines = filters[0]()
    const filteredAirports = filters[1]()
    const [airlineNode, airportsNode] = document.querySelectorAll('select')
    airlineNode.childNodes.forEach( (option, i) => {
      if (filteredAirlines.includes(option.value) || filteredAirlines.length === 0 || i === 0) {
        option.disabled = false
      } else {
        option.disabled = true
      }
    });

    airportsNode.childNodes.forEach( (option, i) => {
      if (filteredAirports.includes(option.value) || filteredAirports.length === 0 || i === 0) {
        option.disabled = false
      } else {
        option.disabled = true
      }
    });


    console.log(airportsNode)
  }, [airline, airport, filters])



  return (
    <p>
      Show routes on
      <Options id="airlines" setter={setters[1]} defaultOption="All Airlines" options={airlines} currentOption={airline} />
      flying in or out of
      <Options id="airports" setter={setters[0]} defaultOption="All Airports" options={airports} currentOption={airport} />
      <button className="showRoutes">Show All Routes</button>
    </p>
  )
}

export default Select