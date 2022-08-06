import React from "react";

const Footer = ({ current, perPage, setCurrent }) => {
  const next = () => {
    setCurrent(current + perPage);
  }

  const prev = () => {
    setCurrent(current - perPage)
  }

  return (
    <footer>
      <p>Showing {current}-{current + (perPage - 1)} of <span className="totalNumber"></span> routes</p>
      <button className="prev" onClick={prev}>Previous Page</button>
      <button className="next" onClick={next}>Next Page</button>
    </footer>
  )
}

export default Footer;