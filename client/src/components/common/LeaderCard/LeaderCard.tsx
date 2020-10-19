import React from 'react';
import Avatars from '../../common/Avatars/Avatars';
import burgerIcon from '../../../assets/burger-icon.svg';
import gold from '../../../assets/gold.svg';
import './LeaderCard.css';

interface IProps {
  avatar: number;
  name: String;
  xp: number;
}

const LeaderCard = ({avatar, name, xp} : IProps) => {
  return (
    <>
      <div className='leader-card'>
        <div className='leader-card-square-bg' style={{backgroundColor: Avatars[avatar].color}}>
          <img className='avatar' src={Avatars[avatar].avatar} alt='avatar' />
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
