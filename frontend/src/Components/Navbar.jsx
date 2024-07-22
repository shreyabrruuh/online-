import React from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import logo2 from '../assets/logo2.png';

const Navbar = () => {
  const { isAuthenticated, logout, username } = useAuth();

  return (
    <div>
      <nav className='navbar'>
        <ul className='navbar-menu'>
          <li className='navbar-item'>
            <Link to='/'>
              <img src={logo2} alt="logo" className='logo' />
            </Link>
          </li>
          <li className='navbar-item'>
            <Link to='/problems'>Problems</Link>
          </li>
          <li className='navbar-item'>
            <Link to='/contest'>Contests</Link>
          </li>
        </ul>
        <div className='auth-section'>
          {isAuthenticated ? (
            <>
              <span className='username'>Hello, {username}</span>
              <button className='button-logout' onClick={logout}>Logout</button>
            </>
          ) : (
            <Link to='/login'>
              <button className='button-login'>Login</button>
            </Link>
          )}
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
