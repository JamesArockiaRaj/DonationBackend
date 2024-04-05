import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";
import Navbar from '../components/Navbar';
import cities from '../components/cities';
import './DonorRegistration.css';
import axios from 'axios'; 

function DonorRegistration() {
  const [selectedState, setSelectedState] = useState(localStorage.getItem('selectedState') || '');
  const [selectedCity, setSelectedCity] = useState(localStorage.getItem('selectedCity') || '');
  const [selects, setSelects] = useState('');
  const [willingToDonate, setWillingToDonate] = useState(false);
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

  const handleWillingToDonateChange = (e) => {
    setWillingToDonate(e.target.checked);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Check if the checkbox is checked and all required fields are filled
    if (!willingToDonate || !selectedState || !selectedCity || !selects) {
      alert("Please check the checkbox and fill all required fields.");
      return; // Exit the function early if validation fails
    }
  
    // Prepare data to send to the backend
    const formData = {
      state: selectedState,
      city: selectedCity,
      bloodGroup: selects,
      bloodDonor: willingToDonate
    };
  
    // Fetch userId from localStorage
    const userId = localStorage.getItem('userId');
  
    // Send data to the backend
    axios.post(`http://localhost:3001/update-user/${userId}`, formData)
      .then(response => {
        // Handle success response if needed
        console.log('User data updated successfully:', response.data);
        navigate('/blood');
      })
      .catch(error => {
        // Handle error if needed
        console.error('Error updating user data:', error);
      });
  };
  
  return (
    <div>
      <Navbar></Navbar>

      <h1 className='centerr'>Thanks for Donating Life</h1>
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
        <h3>Are you willing to Donate Blood?</h3>
        <input className='inputt' type='checkbox' checked={willingToDonate} onChange={handleWillingToDonateChange}></input>
      </div>

      <div className='centerr'>
        <button className='willingbtn' onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  )
}

export default DonorRegistration;
