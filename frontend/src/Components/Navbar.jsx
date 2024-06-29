import React from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import { useAuth } from '../AuthContext';

const Navbar = () => {
    const { isAuthenticated, logout } = useAuth();

    return (
        <nav className="flex items-center justify-between bg-slate-900 px-8 py-4">
            <h2 className="text-2xl font-bold text-purple-500">
                <Link to='/'>CodeHub</Link>
            </h2>
            <ul className="flex space-x-7 text-white">
                <li className="hover:text-purple-300">
                    <Link to='/problems'>Problems</Link>
                </li>
                <li className="hover:text-purple-300">
                    <Link to='/contest'>Contests</Link>
                </li>
            </ul>
            {isAuthenticated ? (
                <button className="button-login" onClick={logout}>
                    Logout
                </button>
            ) : (
                <button className="button-login">
                    <Link to='/login'>Login</Link>
                </button>
            )}
        </nav>
    );
}

export default Navbar;
