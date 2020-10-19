import React from 'react';
import manAvatar from '../../../assets/first-man-avatar.svg';
import burgerIcon from '../../../assets/burger-icon.svg';
import gold from '../../../assets/gold.svg';
import './LeaderCard.css';

const IProps = {
  avatar: Number,
  name: String,
  xp: Number,
}

const LeaderCard = ({avatar, name, xp} : typeof IProps) => {
  return (
    <>
      <div className='leader-card'>
        <div className='leader-card-square-bg'>
          <img className='avatar' src={manAvatar} alt='avatar' />
        </div>
        <div className='right-details'>
          <h4 className='leader-title-txt'>{name}</h4>
          <div className='leader-card-trophy'>
            <img className='gold' src={gold} alt='gold' />
          </div>
          <p className='leader-points-text'>{`${xp}XP`}</p>
        </div>
      </div>
    </>
  );
};

export default LeaderCard;
