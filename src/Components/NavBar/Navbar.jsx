import { useState, useRef, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { ReactComponent as Hamburger } from '../../assets/icons/Hamburger.svg'
import './Navbar.css';

const Navbar = () => {
  const [showNavbar, setShowNavbar] = useState(false);
  const navbarRef = useRef(null);
  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar)
  }
  const handleClickOutside = (event) => {
    if (navbarRef.current && !navbarRef.current.contains(event.target)) {
      setShowNavbar(false);
    }
  };

  useEffect(() => {
    if (showNavbar) {
      document.addEventListener('click', handleClickOutside);
    } else {
      document.removeEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [showNavbar]);

  return (
    <nav className="navbar" ref= {navbarRef}>
      <div className="container">
        <div className="menu-icon" onClick={handleShowNavbar}>
          <Hamburger />
        </div>
        <div className={`nav-elements  ${showNavbar && 'active'}`} style={{zIndex:"1"}}>
          <ul>
            <li>
              <NavLink to="/">Investments </NavLink>
            </li>
            <li>
              <NavLink to="/Travel_expense">Travel Expense</NavLink>
            </li>
            <li>
              <NavLink to="/Trip_expense">Trip Expense</NavLink>
            </li>
            <li>
              <NavLink to="/about">Daily Expense </NavLink>
            </li>
            <li>
              <NavLink to="/contact">Miscellenous</NavLink>
            </li>
            <li>
              <NavLink to="/TourExpense">Tour Expense </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar