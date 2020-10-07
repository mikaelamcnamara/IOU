import React from 'react';
import ManAvatar from '../../../assets/first-man-avatar.svg';
import './Friend.css';

const Friend = () => {
  return (
    <div className='friend'>
      <div>
        <img src={ManAvatar} alt='avatar' />
      </div>
      <div className='friend-desc'>
        <p>James</p>
        <div className='view-profile'>
          <p>View Profile</p>
        </div>
      </div>
    </div>
  );
};

export default Friend;
