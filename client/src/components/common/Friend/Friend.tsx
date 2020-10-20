import React, { useState, useEffect } from 'react';
import Avatars from '../../common/Avatars/Avatars';
import './Friend.css';



interface IProps {
  avatar: number;
  name: String;
  xp: number;
  id: number;
  addFriend: (id: number) => void;
}

const Friend = ({avatar, name, xp, id, addFriend} : IProps) => {

  return (
    <>
      <div className='friend-card'>
        <div className='friend-card-square-bg' style={{backgroundColor: Avatars[avatar].color}}>
          <img className='avatar' src={Avatars[avatar].avatar} alt='avatar' />
        </div>
        <div className='right-details'>
          <h4 className='friend-title-txt'>{name}</h4>
          <p className='friend-points-text'>{`${xp}XP`}</p>
          <button className='do-friend-btn' onClick={() => addFriend(id)} >+ Add Friend</button>
        </div>
       
      </div>
    </>
  );
};

export default Friend;
