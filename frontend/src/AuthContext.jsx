import React, { createContext , useState , useContext} from 'react'
import axios from 'axios';

const AuthContext = createContext();

export const Authprovider = ({children})=>{
    const [isAuthenticated, setIsAuthenticated] = useState(
        !!localStorage.getItem('token')
    );

    const login = (token)=>{
        localStorage.setItem('token', token);
        setIsAuthenticated(true);
    };
    const API_URL= 'http://localhost:8000';
    const logout = async ()=>{
        
        try {
            await axios.post(`${API_URL}/logout`,{},{
                withCredentials: true,
            }); // Adjust the URL as needed
            localStorage.removeItem('token');
            setIsAuthenticated(false);
    
          } catch (err) {
            console.error('Logout failed', err);
          }
    };

    return (
        <AuthContext.Provider value={{isAuthenticated,login,logout}}>
            {children}
        </AuthContext.Provider>
    )
    
};


export const useAuth = () => useContext(AuthContext);
