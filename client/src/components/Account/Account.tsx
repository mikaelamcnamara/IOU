import React, { useState, useEffect } from 'react';
import Navbar from '../common/Navbar/Navbar';
import CompletedCard from '../common/CompletedCard/CompletedCard';
import AccountBackground from '../../assets/AccountBackground.svg';
import EditIcon from '../../assets/EditIcon.svg';
import Gold from '../../assets/gold.svg';
import ProgressBar from '../common/ProgressBar/ProgressBar';
import PartyCard from '../common/PartyCard/PartyCard';
import { getCurrentUser, getParties, getMyCompletedFavours } from '../../APIFetchers';
import './Account.css';
import Avatars from '../common/Avatars/Avatars';

const Account = () => {
  //Initialised the states 
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState(0);
  const [experiencePoints, setExperiencePoints] = useState(0);
  const [completedFavours, setCompletedFavours] = useState([]);
  const [numCompletedFavours, setNumCompletedFavours] = useState(0);
  const [level, setLevel] = useState(0);
  const [progress, setProgress] = useState(0);
  const [parties, setParties] = useState([]);


  // Retrieve user details through API call and render details on the page
  const getUserDetails = async () => {
    const result = await getCurrentUser();
    let completed = await getMyCompletedFavours();
    completed = completed.completedFavours.map((i, num) => <CompletedCard key={num} avatar={i.creator.avatar} name={i.creator.fullName} category={i.category} title={i.title} description={i.description} xp={i.points} />);
    setCompletedFavours(completed);
    setName(result.fullName);
    setAvatar(result.avatar);
    setExperiencePoints(result.experiencePoints);
    setNumCompletedFavours(result.completedFavours.length);
    setLevel(Math.floor(result.experiencePoints / 1000));
    setProgress((result.experiencePoints % 1000) / 1000 * 100);
    let party = await getParties();
    party = party.map((i, num) => <PartyCard key={num} users={i} number={num + 1} />);
    setParties(party);
  }

  useEffect(() => {
    getUserDetails();
  }, []);

  return (
    <div className='account'>
      <Navbar />
      <h1 className='account-header'>Your Personal Dashbaord</h1>
      <p className='account-subtext'>
        View your stats, recent favours, and friends
      </p>
      <div className='account-display'>
        <a href="/PersonalDetails"><img className='edit-icon' src={EditIcon} alt='edit icon' /></a>
        <div className='account-avatar' style={{ backgroundColor: Avatars[avatar].color }}>
          <img src={Avatars[avatar].avatar} alt='Account avatar' />
        </div>
        <h1 className='account-name'>{name}</h1>
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
      <h1 className='account-header2'>Your Completed Favours</h1>
      <div className='recent-favours'>
        {completedFavours.length === 0 ? <p className='no-favours'>No completed favours!</p> : completedFavours}
      </div>
      <h1 className='account-header2'>Suggested Parties</h1>
      <p className="account-party-text">Meet up with the following groups to knock out multiple favours in a single hit!</p>
      <div className='recent-favours'>
        {parties.length !== 0 ? parties : <p className='no-favours'>No parties found!</p>}
      </div>
      <div className='account-bg'>
        <img src={AccountBackground} alt='Account background' />
      </div>
    </div>
  );
};

export default Account;
