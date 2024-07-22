import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import { BiUser } from 'react-icons/bi';
import { AiOutlineEye, AiOutlineEyeInvisible, AiOutlineUnlock } from 'react-icons/ai';
import { useAuth } from '../AuthContext';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth();

    const API_URL = {
        frontend: 'http://localhost:5179',
        backend: 'http://localhost:8000'
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${API_URL.backend}/login`, { email, password }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log(res.data);
            login(res.data.token);
            navigate('/');
        } catch (err) {
            alert('User does not exist');
            console.error('Login error:', err);
        }
    };

    return (
        <div className="login-container">
            <div className="login-form">
                <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Login</h1>
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
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="input-field"
                            placeholder="Your Password"
                        />
                        <span
                            className="absolute top-1/2 transform -translate-y-1/2 right-4 text-gray-400 cursor-pointer"
                            onClick={() => setShowPassword((prev) => !prev)}
                        >
                            {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                        </span>
                    </div>
                    <div className="flex justify-between items-center mb-6">
                        <div className="flex items-center">
                            <input type="checkbox" id="rememberMe" className="mr-2" />
                            <label htmlFor="rememberMe" className="text-sm text-gray-600">Remember me</label>
                        </div>
                        <Link to='/forgot-pass' className="text-sm text-blue-600">Forgot Password?</Link>
                    </div>
                    <button type="submit" className="btn-primary">Sign In</button>
                    <p className="mt-4 text-sm text-gray-600 text-center">
                        New Here? <Link to="/register" className="text-blue-600">Create your Account</Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;