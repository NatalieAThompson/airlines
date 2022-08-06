import React, { useEffect, useState } from 'react';
import './App.css';
import data from './data'

import AirRoutes from './components/AirRoutes';
import Footer from './components/Footer';
import Select from './components/Select';

const PerPage = 25

const App = () => {
  const [allColumns, setAllColumns] = useState([])
  const [currentEle, setCurrentEle] = useState(1)
  const [columns, setColumns] = useState([])
  const [airlines, setAirlines] = useState([])
  const [airports, setAirports] = useState([])

  useEffect(() => {
    function createAirlinesHash() {
      const airlines = {}
      data.airlines.forEach(air => {
        airlines[air.id] = air.name
      })
      return airlines
    }

    function createAirportHash() {
      const airports = {}
      data.airports.forEach(port => {
        airports[port.code] = port.name
      })

      return airports
    }

    setAirlines(createAirlinesHash());
    setAirports(createAirportHash());
  }, [])

  useEffect(() => {
    function createColumns() {
      const columns = [];

      data.routes.forEach( route => {
        columns.push([
         { name: airlines[route.airline], property: 'airline' },
         { name: airports[route.src], property: 'src'},
         { name: airports[route.dest], property: 'dest' }
        ])
      })

      return columns
    }

    setAllColumns(createColumns())
  }, [airlines, airports])

  useEffect(() => {
    document.querySelector(".totalNumber").innerText = allColumns.length
  }, [allColumns])

  useEffect(() => {
    setColumns(allColumns.slice(currentEle - 1, currentEle - 1 + PerPage))

    if (currentEle - 1 === 0) {
      document.querySelector('.prev').disabled = true
    } else if (currentEle + PerPage >= allColumns.length) {
      document.querySelector('.next').disabled = true
    } else {
      document.querySelector('.prev').disabled = false
      document.querySelector('.next').disabled = false
    }
  }, [allColumns, currentEle])

  return (
    <div className="app">
      <header className="header">
        <h1 className="title">Airline Routes</h1>
      </header>
      <section>
        <Select airports={airports} airlines={airlines}/>
        <AirRoutes className="routes-table" columns={columns} />
        <Footer perPage={PerPage} current={currentEle} setCurrent={setCurrentEle} />
      </section>
    </div>
  )
}

export default App;