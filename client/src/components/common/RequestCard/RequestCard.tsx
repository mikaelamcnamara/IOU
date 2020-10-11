import React from 'react';
import manAvatar from '../../../assets/first-man-avatar.svg';
import burgerIcon from '../../../assets/burger-icon.svg';
import trashIcon from '../../../assets/trash-icon.svg';
import './RequestCard.css';

const RequestCard = () => {
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
          <p className='card-text'>
            Can someone buy me coffee? So I can turn that coffee into code.
            Cheers!
          </p>
          <p className='points-text'>+ EARN 100XP</p>
        </div>
        <img className='trash' src={trashIcon} alt='trash' />
      </div>
    </>
  );
};

export default RequestCard;
