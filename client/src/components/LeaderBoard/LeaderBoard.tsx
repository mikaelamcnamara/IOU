import React, { useState } from 'react';
import LeaderBoardHeader from '../../assets/LeaderBoardHeader.jpg';

import '../../App.css';
import './LeaderBoard.css';

const LeaderBoard = () => {
  return (
    <div className='leaderboard'>
      <img
        className='leaderboard-img'
        src={LeaderBoardHeader}
        alt='leaderboard-background'
      ></img>
      <h1 className='leader-title'>LeaderBoard</h1>
    </div>
  );
};

export default LeaderBoard;
