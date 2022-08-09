import React from "react"

const Options = ({ id, defaultOption, options, setter, currentOption }) => {
  const select = (event, setter) => {
    setter(event.target.value)
  }

  const allSelectable = () => {
    return Object.keys(options).map( key => (
      <option key={key}>{options[key]}</option>
    ))
  }

  const onlySelected = () => {
    return Object.keys(options).map( key => {
      if (options[key] === currentOption) {
        return <option key={key}>{options[key]}</option>
      }
      return <option key={key} disabled>{options[key]}</option>
    })
  }

  const choices = defaultOption === currentOption ? allSelectable() : onlySelected();

  return (
    <select id={id} onChange={(event) => select(event, setter)}>
        <option>{defaultOption}</option>
        {choices}
    </select>
  )
}

export default Options