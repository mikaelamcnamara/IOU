import React, { useState, useEffect } from 'react';
import Avatars from '../../common/Avatars/Avatars';
// import './Friend.css';
import '../LeaderCard/LeaderCard.css';
import { getAllUsers, addFriend } from '../../../APIFetchers';

interface IProps {
  avatar: number;
  name: String;
  xp: number;
  _id: number;
  key: number;
}

const Friend = ({avatar, name, xp, _id, key} : IProps) => {

  return (
    <>
      <div className='leader-card'>
        <div className='leader-card-square-bg' style={{backgroundColor: Avatars[avatar].color}}>
          <img className='avatar' src={Avatars[avatar].avatar} alt='avatar' />
        </div>
        <div className='right-details'>
          <h4 className='leader-title-txt'>{name}</h4>
          <p className='leader-points-text'>{`${xp}XP`}</p>
          <button className='do-favour-btn'>+ Add Friend</button>
        </div>
       
      </div>
    </>
  );
};

export default Friend;
