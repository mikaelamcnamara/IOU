import React from 'react';
import Avatars from '../../common/Avatars/Avatars';
import gold from '../../../assets/gold.svg';
import silver from '../../../assets/silver.svg';
import bronze from '../../../assets/bronze.svg';
import './LeaderCard.css';

interface IProps {
  avatar: number;
  name: String;
  xp: number;
  place: number,
}

const LeaderCard = ({ avatar, name, xp, place }: IProps) => {

  const colors = ['#01C48A', '#A051FB', '#FF995A'];
  const trophys = [gold, silver, bronze]

  return (
    <>
      <div className='leader-card'>
        <div className="rank" style={{ backgroundColor: colors[place] }}><p>{place + 1}</p></div>
        <div className='leader-card-square-bg' style={{ backgroundColor: 'transparent' }}>
          <img className='avatar' src={Avatars[avatar].avatar} alt='avatar' />
        </div>
        <div className='right-details'>
          <h4 className='leader-title-txt'>{name}</h4>
          <div className='leader-card-trophy'>
            <img className='gold' src={trophys[place]} alt='gold' />
          </div>
          <p className='leader-points-text'>{`${xp}XP`}</p>
        </div>
      </div>
    </>
  );
};

export default LeaderCard;
