import React from 'react';
import Navbar from '../common/Navbar/Navbar';
import CompletedCard from '../common/CompletedCard/CompletedCard';
import Friend from '../common/Friend/Friend';
import AccountBackground from '../../assets/AccountBackground.svg';
import manAvatar from '../../assets/first-man-avatar.svg';
import EditIcon from '../../assets/EditIcon.svg';
import Gold from '../../assets/gold.svg';
import ProgressBar from '../common/ProgressBar/ProgressBar';
import './Account.css';

const Account = () => {
  return (
    <div className='account'>
      <Navbar />
      <h1 className='account-header'>Your Personal Dashbaord</h1>
      <p className='account-subtext'>
        View your stats, recent favours, and friends
      </p>
      <div className='account-display'>
        <img className='edit-icon' src={EditIcon} alt='edit icon' />
        <div className='account-avatar'>
          <img src={manAvatar} alt='Account avatar' />
        </div>
        <h1>James Doe</h1>
        <div className='ranking-stat'>
          <p>#12 Most Favours</p>
        </div>
        <h2>Level: 20</h2>
        <div className='progress-card'>
          <p>Number of Favours: 200</p>
          <img src={Gold} alt='trophy' />
          <div className='progress-bar'>
            <p className='left'>Total: 2500 XP</p>
            <p className='right'>Goal: 3000 XP</p>
            <ProgressBar bgcolor='#4D6BFF' completed='60' />
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
