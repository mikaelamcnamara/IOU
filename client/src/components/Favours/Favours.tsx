import React, { useState } from 'react';
import AvatarCard from '../common/AvatarCard/AvatarCard';
import RequestCard from '../common/RequestCard/RequestCard';
import FavoursBackground from '../../assets/FavoursBackground.svg';
import RequestPlus from '../../assets/RequestPlus.svg';
import NavBar from '../common/Navbar/Navbar';
import './Favours.css';
const Favours = () => {
  return (
    <div className='favours'>
      <NavBar />
      <h1
        className='favours-header'
        style={{ color: 'white', marginTop: '150px' }}
      >
        Favours you owe
      </h1>
      <AvatarCard />
      <AvatarCard />
      <AvatarCard />
      <AvatarCard />

      <div className='create-request'>
        <img src={RequestPlus} alt='request plus' />
        <h1 className='create-request-header'>Create a request</h1>
      </div>
      <h1 className='favours-header' style={{ color: '#464646' }}>
        Your Active Requests
      </h1>
      <RequestCard />
      <RequestCard />
      <RequestCard />
      <RequestCard />

      <div className='favours-bg'>
        <img src={FavoursBackground} alt='Favours background' />
      </div>
    </div>
  );
};

export default Favours;
