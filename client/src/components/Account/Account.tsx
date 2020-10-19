import React, { useState, useEffect } from 'react';
import Navbar from '../common/Navbar/Navbar';
import CompletedCard from '../common/CompletedCard/CompletedCard';
import Friend from '../common/Friend/Friend';
import AccountBackground from '../../assets/AccountBackground.svg';
import manAvatar from '../../assets/first-man-avatar.svg';
import EditIcon from '../../assets/EditIcon.svg';
import Gold from '../../assets/gold.svg';
import ProgressBar from '../common/ProgressBar/ProgressBar';
import { getCurrentUser} from '../../APIFetchers';
import './Account.css';
import Avatars from '../common/Avatars/Avatars';

const Account = () => {
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState(0);
  const [experiencePoints, setExperiencePoints] = useState(0);
  const [numCompletedFavours, setNumCompletedFavours] = useState(0);
  const [level, setLevel] = useState(0);
  const [progress, setProgress] = useState(0);

  const getUserDetails = async () => {
    const result = await getCurrentUser();
    setName(result.fullname);
    setAvatar(result.avatar);
    setExperiencePoints(result.experiencePoints);
    setNumCompletedFavours(result.completedFavours.length);
    setLevel(Math.floor(experiencePoints/1000));
    setProgress(((level + 1) * 1000 - experiencePoints)/1000 * 100);
  }

  useEffect(() => {
    getUserDetails();
  });

  return (
    <div className='account'>
      <Navbar />
      <h1 className='account-header'>Your Personal Dashbaord</h1>
      <p className='account-subtext'>
        View your stats, recent favours, and friends
      </p>
      <div className='account-display'>
        <a href="/PersonalDetails"><img className='edit-icon' src={EditIcon} alt='edit icon' /></a>
        <div className='account-avatar' style={{backgroundColor: Avatars[avatar].color}}>
          <img src={Avatars[avatar].avatar} alt='Account avatar' />
        </div>
        <h1>{name}</h1>
        <div className='ranking-stat'>
          <p>#12 Most Favours</p>
        </div>
        <h2>Level: {level}</h2>
        <div className='progress-card'>
          <p>Number of Favours: {numCompletedFavours}</p>
          <img src={Gold} alt='trophy' />
          <div className='progress-bar'>
            <p className='left'>Total: {experiencePoints} XP</p>
            <p className='right'>Goal: {(level + 1) * 1000} XP</p>
            <ProgressBar bgcolor='#4D6BFF' completed={progress} />
          </div>
        </div>
      </div>
      <h1 className='account-header2'>Your Most Recent Favours</h1>
      <div className='recent-favours'>
        <CompletedCard />
        <CompletedCard />
        <CompletedCard />
      </div>
      <h1 className='account-header2'>Recently Added Friends</h1>
      <div className='friend-grid'>
        <Friend />
        <Friend />
        <Friend />
        <Friend />
      </div>
      <div className='account-bg'>
        <img src={AccountBackground} alt='Account background' />
      </div>
    </div>
  );
};

export default Account;
