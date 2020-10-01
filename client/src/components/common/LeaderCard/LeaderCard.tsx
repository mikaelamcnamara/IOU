import React from 'react';
import manAvatar from '../../../assets/first-man-avatar.svg';
import burgerIcon from '../../../assets/burger-icon.svg';
import gold from '../../../assets/gold.svg';
import './LeaderCard.css';

const LeaderCard = () => {
  return (
    <>
      <div className='favours-card'>
        <div className='favours-card-square-bg'>
          <img className='avatar' src={manAvatar} alt='avatar' />
        </div>
        <div className='right-details'>
          <h4 className='title-txt'>Damien</h4>
          <div className='tag-content'>
            <span className='tag'>
              <img src={burgerIcon} alt='' /> Food
            </span>
          </div>
          <div className='favours-card-trophy'>
            <img className='gold' src={gold} alt='gold' />
          </div>
          <p className='card-text'>
            Can someone buy me coffee? So I can turn that coffee into code.
            Cheers!
          </p>
          <p className='points-text'>+ EARN 100XP</p>
        </div>
      </div>
    </>
  );
};

export default LeaderCard;
