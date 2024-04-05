import './App.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import donationimg from '../images/donation_banner.png';
import blooddonation from '../images/blood_donation.png';
import fooddonation from '../images/food_donation.png';
import thingsdonation from '../images/things_donation.png';
import homes from '../images/homes.png';
import cities from '../components/cities';

const App = () => {
  const [selectedState, setSelectedState] = useState(localStorage.getItem('selectedState') || '');
  const [selectedCity, setSelectedCity] = useState(localStorage.getItem('selectedCity') || '');
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
  
  return (
    <div>
      <Navbar></Navbar>

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
      </div>

      {/* Donation Banner */}

      <img src={donationimg} className='imgbanner'></img>

      {/* <img src={donationimg} className='imgbanner'></img> */}
      <div>
        <h3 className='centerr'>"Here, we stand as a beacon of hope, offering assistance to those in need.<br/>
        Whether it's blood, food, clothing, or groceries, your contributions are invaluable.<br/>
        Together, let's make a difference and bring comfort to those facing challenges.<br/>
        Join us in spreading kindness and compassion.<br/>
        Thank you for your support."
        </h3>

      <div className='aligning'>
      {/* Blood Donation */}
      <div className='padbot'>
        {/* <h2 className='leftheading'>Blood Donation</h2> */}
        <h3 className='lefttxt'>"Give the gift of life. Donate blood today and make a difference in someone's life. Every donation counts. Join us in saving lives and spreading hope. Why are you still waiting? <span id='linkk' onClick={() => navigate('/blood')}>Start donating today!</span>"</h3> 
        <img src={blooddonation} className='rightimg'  onClick={() => navigate('/blood')}></img>

      </div>
      
      {/* Food Donation */}
      <div className='padbot'>
        {/* <h2 className='leftheading'>Food Donation</h2> */}
        <img src={fooddonation} className='leftimg'  onClick={() => navigate('/food')}></img>
        <h3 className='righttxt'>"Give the gift of nourishment. Donate food today and make a difference in someone's life. Every donation counts. Join us in alleviating hunger and spreading hope. Why wait?<br></br> <span id='linkk' onClick={() => navigate('/food')}>Start donating today!</span>"</h3>
      </div>

      
      {/* Things Donation */}
      <div className='padbot'>
        {/* <h2 className='leftheading'>Things Donation</h2> */}
        <h3 className='lefttxt'> "Give the gift of joy. Donate clothes, toys, and essentials today and make a difference in someone's life. Every donation counts. Join us in spreading happiness and warmth. Why wait?<span id='linkk' onClick={() => navigate('/things')}>Start donating today!</span>"</h3>
        <img src={thingsdonation} className='rightimg'  onClick={() => navigate('/things')}></img>

      </div>

      
      {/* Orphanages */}
      <div className='padbot'>
        {/* <h2 className='leftheading'>Orphanages</h2> */}
        <img src={homes} className='leftimg'  onClick={() => navigate('/lists')}></img>
        <h3 className='righttxt'>"Give the gift of care. Donate to orphanages, elderly homes, and centers for the physically challenged today and make a difference in someone's life. Every contribution counts. Join us in spreading love and support. Why wait? <br></br><span id='linkk' onClick={() => navigate('/lists')}>Start donating today!</span>"</h3>
      </div>
      </div>
      {/* Footer Section */}
      <Footer></Footer>
      </div>
    </div>
  );
};

export default App;