import React, { useState } from 'react';
import axios from 'axios';
import './Register.css'; // Import the new CSS file
import { Link, useNavigate } from 'react-router-dom';
import { BiUser } from 'react-icons/bi';
import { AiOutlineUnlock } from 'react-icons/ai';

const Register = () => {
    const [fullname, setFullname] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const API_URL = 'http://localhost:8000';

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${API_URL}/register`, {
                fullname,
                username,
                email,
                password,
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log(res.data);
            navigate('/login');
        } catch (err) {
            console.error('Registration error:', err);
        }
    };

    return (
        <div className="register-container">
            <div className="register-form">
                <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Register</h1>
                <form onSubmit={handleSubmit}>
                    <div className="relative mb-6">
                        <input
                            type="text"
                            value={fullname}
                            onChange={(e) => setFullname(e.target.value)}
                            className="input-field"
                            placeholder="Full Name"
                        />
                        <BiUser className="absolute top-1/2 transform -translate-y-1/2 right-4 text-gray-400" />
                    </div>
                    <div className="relative mb-6">
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="input-field"
                            placeholder="Username"
                        />
                        <BiUser className="absolute top-1/2 transform -translate-y-1/2 right-4 text-gray-400" />
                    </div>
                    <div className="relative mb-6">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="input-field"
                            placeholder="Your Email"
                        />
                        <BiUser className="absolute top-1/2 transform -translate-y-1/2 right-4 text-gray-400" />
                    </div>
                    <div className="relative mb-6">
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="input-field"
                            placeholder="Your Password"
                        />
                        <AiOutlineUnlock className="absolute top-1/2 transform -translate-y-1/2 right-4 text-gray-400" />
                    </div>
                    <button type="submit" className="btn-primary">Register</button>
                    <p className="mt-4 text-sm text-gray-600">
                        Already have an account? <Link to="/login" className="text-blue-600">Login here</Link>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default Register;