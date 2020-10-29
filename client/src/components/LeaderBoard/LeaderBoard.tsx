import React, { useState, useEffect } from 'react';
import { leaderboard } from '../../APIFetchers';
import LeaderBoardHeader from '../../assets/leaderboard.svg';

import '../../App.css';
import './LeaderBoard.css';

import NavBar from '../common/Navbar/Navbar';
import LeaderCard from '../common/LeaderCard/LeaderCard';
import SkeletonCard from '../common/SkeletonLoad/Skeleton';
import ConfettiGenerator from 'confetti-js';

const LeaderBoard = () => {
  const [loading, setLoading] = useState(false);
  const [topUsers, setTopUsers] = useState([]);

  const populateLeaderboard = async () => {
    setLoading(true);
    let leaders = await leaderboard();
    leaders = leaders.map((leader, i) => <LeaderCard key={leader.fullName} avatar={leader.avatar} name={leader.fullName} xp={leader.experiencePoints} place={i}/>);
    setTopUsers(leaders);
    setLoading(false);
  }

  useEffect(() => {
    populateLeaderboard();
    const confettiSettings = { target: 'my-canvas' };
    const confetti = new ConfettiGenerator(confettiSettings);
    confetti.render();
    return () => confetti.clear();
  }, []);

  return (
    <div className='leaderboard'>
      <NavBar />
      <img
        className='leaderboard-img'
        src={LeaderBoardHeader}
        alt='leaderboard-background'
      ></img>
     
      <canvas id='my-canvas'></canvas>
      <div className='leader-content'>
        <h1 className='leader-title'>LeaderBoard</h1>
        <h4 className='leader-subtitle'>
          These users have earned the most experience points! 
        </h4>
        {loading &&
          <div className="loading-card">
            <SkeletonCard />
          </div>
        }
        {!loading &&
          <div>
            {topUsers}
          </div>
        }
      </div>
    </div>
  );
        
};

export default LeaderBoard;
