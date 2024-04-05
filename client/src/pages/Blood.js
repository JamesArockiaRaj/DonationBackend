import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar'
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import './Blood.css';

function Blood() {
  const navigate = useNavigate();
  const cityName = localStorage.getItem('selectedCity');
  const [selects,setSelects] = useState();
  const [donors, setDonors] = useState([]);
  const [showReportDialog, setShowReportDialog] = useState(false);
  const [selectedReasons, setSelectedReasons] = useState([]);
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to store login status


  // const data = [
  //   { name: 'James', location: 'Chennai', bloodType: 'O+', phone: '+91 8220483764' },
  //   { name: 'James2', location: 'Chennai', bloodType: 'A+', phone: '+91 8220483764' },
  //   { name: 'James3', location: 'Kanyakumari', bloodType: 'A-', phone: '+91 8220483764' },
  //   { name: 'James4', location: 'Chennai', bloodType: 'O+', phone: '+91 8220483764' },

  //   // Add more objects representing additional entries
  // ];

      useEffect(() => {
        // Fetch donor data when component mounts
        fetchDonors();
        verifyLoginStatus(); 
    }, []);

    const fetchDonors = async () => {
      try {
          const response = await axios.get('http://localhost:3001/donors'); // Replace with your backend URL
          setDonors(response.data);
          console.log(response.data)
      } catch (error) {
          console.error('Error fetching donors:', error);
      }
    };

    const verifyLoginStatus = async () => {
      try {
          const userId = localStorage.getItem('userId');
          if (userId) {
              const response = await axios.get(`http://localhost:3001/verifylogin?userId=${userId}`);
              setIsLoggedIn(response.data.isLoggedIn);
          }
      } catch (error) {
          console.error(error);
      } 
    };


  // Filter donor data based on selected location and blood group
  const filteredData = cityName ? donors.filter(person => person.city === cityName && (!selects || "Blood Group: " + person.bloodGroup === selects)) : [];

  const handleCall = (phone) => {
    window.location.href = `tel:${phone}`;
  };

  const handleSMS = (phone) => {
    window.location.href = `sms:${phone}`;
  };

  const handleShare = async (details) => {
    try {
      await navigator.share({
        title: 'Donor Details',
        text: `Name: ${details.username}, Blood Type: ${details.bloodGroup}, Phone: ${details.phone}`,
      });
    } catch (error) {
      console.error('Sharing failed:', error);
    }
  };
  
  const handleReport = (person) => {
    setShowReportDialog(true);
    setSelectedPerson(person); // Set the selected person for reporting
  };

  const handleReportDialogClose = () => {
    setShowReportDialog(false);
  };

  const handleReportSuccess = () => {
    alert("Reported Successfully")
    setShowReportDialog(false);
  };
  
  const handleCheckboxChange = (reason) => {
    const isChecked = selectedReasons.includes(reason);
    setSelectedReasons(isChecked ? selectedReasons.filter(r => r !== reason) : [...selectedReasons, reason]);
  };

  return (
    <div>
        <Navbar></Navbar>
        {/* Topic */}
        {(cityName && cityName.length !== 0) ? 
        <div>
        <div className='row'>
        <h1>Showing Results for <span onClick={() => navigate('/')}>{cityName}</span></h1> 
        {isLoggedIn ? (
          <button onClick={() => navigate('/regdonor')}>Donate Blood</button>
        ) : (
          <button onClick={() => alert('Please Login')}>Donate Blood</button>
        )}

        {/* Filtering Blood Groups & Posting requirements */}
          {isLoggedIn ? (
              <button onClick={() => navigate('/reqblood')}>Post Blood Requirement</button>
            ) : (
            <button onClick={() => alert('Please Login')}>Post Blood Requirement</button>
          )}        <div>
          <select value={selects} onChange={e=>setSelects(e.target.value)}>
            <option>Blood Group: A+</option>
            <option>Blood Group: A-</option>
            <option>Blood Group: B+</option>
            <option>Blood Group: B-</option>
            <option>Blood Group: O+</option>
            <option>Blood Group: O-</option>
            <option>Blood Group: AB+</option>
            <option>Blood Group: AB-</option>
          </select>
          {/* <h1>{selects}</h1> */}
        </div>

      </div>
        {/* Mapping donors list */}
        {filteredData.length === 0 ? (
            <div id="aligncenter">
              <h2>No results found</h2>
            </div>
          ) : (
            // Mapping filtered donors list
            filteredData.map((person, index) => (
              <div className='row2' key={index}>
                <h3>{person.username}</h3>
                <h3>{person.bloodGroup}</h3>
                <h3>{person.phone}</h3>
                <h5 onClick={() => handleCall(person.phone)}>📞 Call</h5>
                <h5 onClick={() => handleSMS(person.phone)}>🗨️ SMS</h5>
                <h5 onClick={() => handleShare(person)}>🔗 Share</h5>
                <h5 onClick={() => handleReport(person)}>❗Report</h5>
              </div>
            ))
          )}
           {/* Report dialog */}
           {showReportDialog &&  selectedPerson &&
            <div className="report-dialog">
              <h2 className='colorblack'>Reporting {selectedPerson.name}</h2>
              <div className='reporting'>
                <input type="radio" id="fakeDetails"  className='inputt' name='report' value="Fake Details" onChange={() => handleCheckboxChange('Fake Details')} />
                <h3>Fake Details</h3>
                <input type="radio" id="unavailable"  className='inputt' name='report' value="Unavailable" onChange={() => handleCheckboxChange('Unavailable')} />
                <h3>Donor recently donated blood</h3>
              </div>
              <button onClick={handleReportDialogClose}>Cancel</button>
              <button onClick={handleReportSuccess}>Report</button>
            </div>
          }
        </div>
        
        :
        // If location is not selected
        <div id='aligncenter'>
          <h1>Please <span onClick={() => navigate('/')}>Choose City</span> to get list of Blood Donors</h1>
          <div>
          <h2>Are you ready to Donate Blood???</h2>
            {isLoggedIn ? (
            <button onClick={() => navigate('/regdonor')}>Donate Blood</button>
          ) : (
            <button onClick={() => alert('Please Login')}>Donate Blood</button>
          )}

          </div>
          <div>
          <h2>Having Blood Requirements???</h2>
            {isLoggedIn ? (
            <button onClick={() => navigate('/reqblood')}>Post Blood Requirement</button>
          ) : (
            <button onClick={() => alert('Please Login')}>Post Blood Requirement</button>
          )}
          </div>
          </div>}

    </div>
  )
}

export default Blood