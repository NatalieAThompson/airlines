import React from 'react'

const AirRoutes = ({ columns, className }) => {
  return (
    <table className={className}>
      <thead>
        <tr>
          <th>Airline</th>
          <th>Source Airport</th>
          <th>Destination Airport</th>
        </tr>
      </thead>
      <tbody>
        {columns.map((route, index) =>
          (<tr key={index}>
            {route.map((info, index) =>
                <td key={index} className={info.property}>{info.name}</td>
            )}
          </tr>)
        )}
      </tbody>
    </table>
  )
}

export default AirRoutes