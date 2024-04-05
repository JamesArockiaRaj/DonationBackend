import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import cities from '../components/cities';
import './DonorRegistration.css';
import axios from 'axios'; 
import {useNavigate } from "react-router-dom";

function BloodRequirement() {
  const [selectedState, setSelectedState] = useState(localStorage.getItem('selectedState') || '');
  const [selectedCity, setSelectedCity] = useState(localStorage.getItem('selectedCity') || '');
  const [selects,setSelects] = useState();
  const [username,setUsername] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem('selectedState', selectedState);
  }, [selectedState]);

  
  const handleStateChange = (e) => {
    setSelectedState(e.target.value);
    setSelectedCity(''); // Reset city when state changes
  };

  const handleCityChange = (e) => {
    const selectedCityValue = e.target.value;
    setSelectedCity(selectedCityValue);
    localStorage.setItem('selectedCity', selectedCityValue); // Store only the city name
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Check if the checkbox is checked and all required fields are filled
    if (!selectedState || !selectedCity || !selects) {
      alert("Please fill all required fields.");
      return; // Exit the function early if validation fails
    }
  
    // Prepare data to send to the backend
    const formData = {
      state: selectedState,
      city: selectedCity,
      bloodGroup: selects,
      username: username
    };
  
    // Fetch userId from localStorage
    const userId = localStorage.getItem('userId');
  
    // Hv to write separate endpoint for handling blood requests
    // axios.post(`http://localhost:3001/update-user/${userId}`, formData)
    //   .then(response => {
    //     // Handle success response if needed
    //     console.log('User data updated successfully:', response.data);
    //     navigate('/');
    //   })
    //   .catch(error => {
    //     // Handle error if needed
    //     console.error('Error updating user data:', error);
    //   });
  };

  return (
    <div>
      <Navbar></Navbar>
         
      <h1 className='centerr'>Post Your Blood Request Below</h1>

      {/* Choose State and City */}

    <div className='statecity' id='statecity'>
        <div className='state'>
          <label>Select State:</label>
          <br />
          <select value={selectedState} onChange={handleStateChange}>
            <option value="">Select State</option>
            {cities.state_arr.map((state, index) => (
                <option key={index} value={state}>{state}</option>
            ))}
          </select>
        </div>
        <div className='city'>
          <label>Select City:</label>
          <br />
          <select value={selectedCity} onChange={handleCityChange} disabled={!selectedState}>
            <option value="">Select City</option>
            {selectedState && cities.citiesByState[cities.state_arr.indexOf(selectedState)].map((city, index) => (
            <option key={index} value={city.trim()}>{city.trim()}</option>
            ))}
          </select>
        </div>
        <div className='city'>
          <label>Select Blood Group:</label>
          <br />
          <select value={selects} onChange={e => setSelects(e.target.value)}>
            <option value="">Blood Group</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
          </select>
        </div>
    </div>
    <div className='willing'>
    <h3>Name</h3>
    <input maxLength={10} placeholder='Max 10 characters' value={username}></input>
    </div>

    <div className='centerr'>
    <button className='willingbtn' onClick={handleSubmit}>Submit</button>
    </div>
    </div>
  )
}

export default BloodRequirement