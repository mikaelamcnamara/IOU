import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import LeaderBoardHeader from '../../assets/leaderboard.svg';

import '../../App.css';
import './LeaderBoard.css';

import NavBar from '../common/Navbar/Navbar';
import LeaderCard from '../common/LeaderCard/LeaderCard';
import SkeletonCard from '../common/SkeletonLoad/Skeleton';
import ConfettiGenerator from "confetti-js";

const LeaderBoard = () => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(false);
    const timer = setTimeout(() => {
      setLoading(true);
    }, 1000)
    return () => clearTimeout(timer);
  }, [])

  useEffect(() => {
    const confettiSettings = { target: 'my-canvas' };
    const confetti = new ConfettiGenerator(confettiSettings);
    confetti.render();
    return () => confetti.clear();
  }, [])

  return (
    <div className='leaderboard'>
      <NavBar />


      <img
        className='leaderboard-img'
        src={LeaderBoardHeader}
        alt='leaderboard-background'
      ></img>
      <canvas id="my-canvas">
      </canvas>

      <div className='leader-content'>
        <h1 className='leader-title'>LeaderBoard</h1>
        <h4 className='leader-subtitle'>
          These users have the highest amount of favours blah
        </h4>

        {!loading &&
          <div className="loading-card">
            <SkeletonCard />
          </div>}

        {loading &&
          <div>
            <LeaderCard />
            <LeaderCard />
            <LeaderCard />
            <LeaderCard />
          </div>
        }
      </div>
    </div>

  );
};

export default LeaderBoard;
