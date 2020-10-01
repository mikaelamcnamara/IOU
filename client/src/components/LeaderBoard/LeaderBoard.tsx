import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import LeaderBoardHeader from '../../assets/leaderboard.svg';

import '../../App.css';
import './LeaderBoard.css';

import NavBar from '../common/Navbar/Navbar';
import LeaderCard from '../common/LeaderCard/LeaderCard';

const LeaderBoard = () => {
  return (
    <div className='leaderboard'>
      <NavBar />
      <img
        className='leaderboard-img'
        src={LeaderBoardHeader}
        alt='leaderboard-background'
      ></img>

      <div className='content'>
        <h1 className='leader-title'>LeaderBoard</h1>
        <h4 className='leader-subtitle'>
          These users have the highest amount of favours blah
        </h4>
      </div>
      <LeaderCard />
      <LeaderCard />
      <LeaderCard />
      <LeaderCard />
    </div>
  );
};

export default LeaderBoard;
