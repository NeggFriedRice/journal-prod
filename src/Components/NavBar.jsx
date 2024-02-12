import React, { useRef } from "react"
import { Link } from "react-router-dom"

const NavBar = () => {
  const navBarRef = useRef()

  function toggleHamburger(evt) {
    console.log(evt.target.classList.toggle)
    console.log(navBarRef.current.classList.toggle)
    evt.target.classList.toggle('is-active')
    navBarRef.current.classList.toggle('is-active')
  }

  return (
        <nav className="navbar has-background-info-light" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
                <Link to='/'>
                    <h1>Journal</h1>
                </Link>

                <a role="button" onClick={toggleHamburger} className="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </a>
            </div>

            <div id="navbarBasicExample" onClick={toggleHamburger} ref={navBarRef} className="navbar-menu">
                <div className="navbar-start">
                    <Link to="/" className="navbar-item">Home</Link>
                    <Link to="/category" className="navbar-item">Create Entry</Link>
                </div>
            </div>
        </nav>
    )
}

export default NavBar