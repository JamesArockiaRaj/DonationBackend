import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Navbar.css";
import logoz from "./logo.png";
import axios from 'axios';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [clicked, setClicked] = useState(false);
  const cityName = localStorage.getItem('selectedCity');
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = () => {
    setClicked(!clicked);
  }

  useEffect(() => {
    // Function to check if the user is logged in
    const checkLoginStatus = async () => {
        try {
            const userId = localStorage.getItem('userId');
            if (userId) {
                const response = await axios.get(`http://localhost:3001/verifylogin?userId=${userId}`);
                setIsLoggedIn(response.data.isLoggedIn);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    checkLoginStatus();
}, []);

const handleLogout = () => {
  // Perform logout actions
  localStorage.removeItem('userId');
  setIsLoggedIn(false);
  // Optionally, redirect user to a different page after logout
  navigate('/');
}

  return (
    <>
      <nav>
        <Link to="/"><img src={logoz} alt='Logo' height={80} width={80}/></Link>

        <div>
          <ul id='navbar' className={clicked ? '#navbar active': '#navbar'}>
            <li><Link to="/" className={location.pathname === '/' ? 'active' : ''}>Home</Link></li>
            <li><Link to="/blood" className={location.pathname === '/blood' ? 'active' : ''}>Blood</Link></li>
            <li><Link to="/food" className={location.pathname === '/food' ? 'active' : ''}>Food</Link></li>
            <li><Link to="/things" className={location.pathname === '/things' ? 'active' : ''}>Things</Link></li>
            <li><Link to="/lists" className={location.pathname === '/lists' ? 'active' : ''}>List of Homes</Link></li>
            <li className='colred'> {isLoggedIn?<h4 onClick={handleLogout}>Logout</h4>:<Link to="/login" >Login</Link>}</li>
            {cityName ? <h4 className='mousepointer' onClick={() => navigate('/')}>📍{cityName}</h4> : <h4 className='mousepointer' onClick={() => navigate('/')}>📍Select Location</h4>}
          </ul>
        </div>
        {/* For mobile */}
        <div id="mobile" onClick={handleClick}>
          <i id='bar' className={clicked ? 'fas fa-times': 'fas fa-bars'}></i>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
