import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import LeaderBoardHeader from '../../assets/LeaderBoardHeader.jpg';

import '../../App.css';
import './LeaderBoard.css';
import NavBar from '../common/Navbar/Navbar';

const LeaderBoard = () => {
  return (
    <div className='leaderboard'>
      <NavBar />
      <img
        className='leaderboard-img'
        src={LeaderBoardHeader}
        alt='leaderboard-background'
      ></img>
      <div className='favdeb'>
        <h1 className='leader-title'>LeaderBoard</h1>
        <h1 className='title active'>Favours</h1>
        <h1 className='title'>Debt</h1>
      </div>
      <div className='content'></div>
    </div>
  );
};

export default LeaderBoard;
