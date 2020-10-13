import React, { useState, useEffect } from 'react';
import './FriendsList.css';
import FriendBG from '../../assets/friendlist.svg';
import NavBar from '../common/Navbar/Navbar';
import Friend from '../common/Friend/Friend';

const FriendsList = () => {
  const [search, setSearch] = useState('');

  return (
    <>
      <div>
        <div className='content'>
          <NavBar />
          <img className='friend-img' src={FriendBG} alt='friend-img'></img>
          <h1 className='leader-title'>Friends List</h1>
          <h4 className='leader-subtitle'></h4>
          <div className='nav-middle'>
            <form className='search-form'>
              <input
                type='text'
                className='search-input'
                placeholder='Search for friends....'
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </form>
            <button className='button-all'>Friend List</button>
            <button className='button-all '>Friend Requests</button>
            <button className='button-all'>Pending Requests</button>

            <Friend />
            <Friend />
            <Friend />
          </div>
        </div>
      </div>
    </>
  );
};

export default FriendsList;
