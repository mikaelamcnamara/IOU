import React from 'react';
import Avatars from '../../common/Avatars/Avatars';
import './Friend.css';

interface IProps {
  avatar: number;
  name: String;
  xp: number;
  id: string;
  addFriend: (id: string) => void;
  removeFriend: (id: string) => void;
  isFriend: Boolean
}

// Can add friends and also remove them too
// Has ternary operators to check the state of the friends
const Friend = ({ avatar, name, xp, id, addFriend, removeFriend, isFriend }: IProps) => {
  const method = isFriend ? removeFriend : addFriend;
  return (
    <>
      {id !== localStorage.getItem('user') && <div className='friend-card'>
        <div className='friend-card-square-bg' style={{ backgroundColor: Avatars[avatar].color }}>
          <img className='avatar' src={Avatars[avatar].avatar} alt='avatar' />
        </div>
        <div className='right-details'>
          <h4 className='friend-title-txt'>{name}</h4>
          <p className='friend-points-text'>{`${xp}XP`}</p>
          <button className='do-friend-btn' style={{ backgroundColor: isFriend ? '#ff6464' : '#01C48A' }} onClick={() => method(id)} >{isFriend ? "Remove Friend" : "+ Add Friend"}</button>
        </div>

      </div>}
    </>
  );
};

export default Friend;
