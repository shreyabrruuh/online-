import React, { useState } from 'react';
import axios from 'axios';
import './Login.css'; // Ensure your CSS file is imported here
import { Link, useNavigate } from 'react-router-dom';
import { BiUser } from 'react-icons/bi';
import { AiOutlineUnlock } from 'react-icons/ai';
import { useAuth } from '../AuthContext';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth();

    const API_URL = 'http://localhost:8000';

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${API_URL}/login`, { email, password }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log(res.data);
            login(res.data.token);
            navigate('/');
        } catch (err) {
            console.error('Login error:', err);
            // Handle error gracefully (display error message, etc.)
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="max-w-md w-full bg-white p-8 rounded-md shadow-lg">
                <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Sign In</h1>
                <form onSubmit={handleSubmit}>
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
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center">
                            <input type="checkbox" className="mr-2" />
                            <label htmlFor="remember" className="text-sm text-gray-600">Remember me</label>
                        </div>
                        <Link to="#" className="text-sm text-blue-600">Forgot Password?</Link>
                    </div>
                    <button type="submit" className="btn-primary">Sign In</button>
                    <p className="mt-4 text-sm text-gray-600">
                        New Here? <Link to="/register" className="text-blue-600">Create your Account</Link>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default Login;
