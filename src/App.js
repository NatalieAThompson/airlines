import React, { useEffect, useState } from 'react';
import './App.css';
import data from './data'

import AirRoutes from './components/AirRoutes';
import Footer from './components/Footer';
import Select from './components/Select';

const PerPage = 25

const App = () => {
  const [allColumns, setAllColumns] = useState([])
  const [selectedColumns, setSelectedColumns] = useState(allColumns)
  const [currentEle, setCurrentEle] = useState(1)
  const [columns, setColumns] = useState([])
  const [airlines, setAirlines] = useState({})
  const [airports, setAirports] = useState({})
  const [airline, setAirline] = useState('All Airlines')
  const [airport, setAirport] = useState('All Airports')

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
    document.querySelector(".totalNumber").innerText = selectedColumns.length
  }, [selectedColumns])

  useEffect(() => {
    setColumns(selectedColumns.slice(currentEle - 1, currentEle - 1 + PerPage))

    if (currentEle - 1 === 0) {
      document.querySelector('.prev').disabled = true
    } else if (currentEle + PerPage >= selectedColumns.length) {
      document.querySelector('.next').disabled = true
    } else {
      document.querySelector('.prev').disabled = false
      document.querySelector('.next').disabled = false
    }
  }, [selectedColumns, currentEle])

  useEffect(() => {
    if (airline === "All Airlines" && airport === "All Airports") {
      setSelectedColumns(allColumns)
      return
    }

    let selected;

    if (airline === "All Airlines") {
      selected = allColumns.filter(subAr => {
        return (subAr[1].name === airport || subAr[2].name === airport)
      });
    } else if (airport === "All Airports") {
      selected = allColumns.filter(subAr => {
        return subAr[0].name === airline
      });
    } else {
      selected = allColumns.filter(subAr => {
        return subAr[0].name === airline && (subAr[1].name === airport || subAr[2].name === airport)
      });
    }

    setSelectedColumns(selected);
  }, [airline, airport, allColumns])

  const avaliableAirports = () => {
    const airports = new Set()

    columns.forEach(route => {
      if (route[0].name === airline) {
        airports.add(route[1].name)
        airports.add(route[2].name)
      }
    })

    return [...airports]
  }

  const avaliableAirlines = () => {
    const airlines = new Set()

    columns.forEach(route => {
      if (route[1].name === airport || route[2].name === airport) {
        airlines.add(route[0].name)
      }
    })

    return [...airlines]
  }

  return (
    <div className="app">
      <header className="header">
        <h1 className="title">Airline Routes</h1>
      </header>
      <section>
        <Select airports={airports} airlines={airlines} selected={[airport, airline]} setters={[setAirport, setAirline]} filters={[avaliableAirlines, avaliableAirports]}/>
        <AirRoutes className="routes-table" columns={columns} />
        <Footer perPage={PerPage} current={currentEle} setCurrent={setCurrentEle} />
      </section>
    </div>
  )
}

export default App;