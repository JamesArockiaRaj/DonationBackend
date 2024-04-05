import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import { useNavigate } from "react-router-dom";
import './Food.css';

function Food() {
  const cityName = localStorage.getItem('selectedCity');
  const stateName = localStorage.getItem('selectedState');

  const navigate = useNavigate();

  const data = [
    { img: 'https://cdn.britannica.com/36/123536-050-95CB0C6E/Variety-fruits-vegetables.jpg', state: 'Tamil Nadu',  location: 'Chennai',  desc: 'Description1', count: '50', direction: 'https://www.google.com/maps/d/embed?mid=1FQyRsXK54gE_v85EUgFymzPj3sw&hl=en_US&ehbc=2E312F' },
    { img: 'https://cdn.britannica.com/36/123536-050-95CB0C6E/Variety-fruits-vegetables.jpg', state: 'Tamil Nadu', location: 'Chennai', desc: 'Description2', count: '30', direction: 'https://www.google.com/maps/d/embed?mid=1FQyRsXK54gE_v85EUgFymzPj3sw&hl=en_US&ehbc=2E312F' },
    { img: 'https://cdn.britannica.com/36/123536-050-95CB0C6E/Variety-fruits-vegetables.jpg', state: 'Tamil Nadu', location: 'Kanyakumari', desc: 'Description3', count: '60', direction: 'https://www.google.com/maps/d/embed?mid=1FQyRsXK54gE_v85EUgFymzPj3sw&hl=en_US&ehbc=2E312F' },
    { img: 'https://cdn.britannica.com/36/123536-050-95CB0C6E/Variety-fruits-vegetables.jpg', state: 'Tamil Nadu', location: 'Chennai', desc: 'Description4', count: '77', direction: 'https://www.google.com/maps/d/embed?mid=1FQyRsXK54gE_v85EUgFymzPj3sw&hl=en_US&ehbc=2E312F' },

  ];

  const filteredData = cityName ? data.filter(person => person.location === cityName ) : [];

  const filteredStateData = stateName ? data.filter(person => person.state === stateName ) : [];

  const ViewDirection = (direction) => {
    window.open(direction, '_blank');
  };
  

  return (
    <div>
         <Navbar></Navbar>
        {/* Topic */}
        {(cityName && cityName.length !== 0) ? 
        <div>
        <div className='row'>
        <h1>Showing Results for <span onClick={() => navigate('/')}>{cityName}</span></h1> 
        <button onClick={() => navigate('/regdonor')}>Having Food?</button>
        <button onClick={() => navigate('/reqblood')}>Post Food Requirement</button>
        </div>
        <div className='food-grid'> 
        {filteredData.length === 0 ? (
            <div id="aligncenter">
              <h2>No results found</h2>
            </div>
          ) : (
            // Mapping filtered donors list
            filteredData.map((food, index) => (
              <div className='img-grid'>
              <div key={index} className='rowflex'>
               <img className='imgsize' src={food.img}></img>
               <h2 className='colorblack'>{food.desc}</h2>
               <h3>Count: {food.count}</h3>
               <h3 onClick={() =>ViewDirection(food.direction)}>Direction</h3>
              </div>
              </div>
            ))
          )}
        </div>
        </div>:<>Location is not selected</>} 
    </div>
  )
}

export default Food