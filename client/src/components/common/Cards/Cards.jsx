import React from 'react';
import manAvatar from '../../../assets/first-man-avatar.svg';
import burgerIcon from '../../../assets/burger-icon.svg';
import './Cards.css';

const Cards = ({ posts }) => {
  return (
    <>
      { posts.map(post => (

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
            <button className='do-favour-btn'> Do Favour</button>
            <p className='card-text'>
              Can someone buy me coffee? So I can turn that coffee into code.
              Cheers!
          </p>
            <p className='points-text'>+ EARN 100XP</p>
          </div>
        </div>
      ))}
    </>
  );
};

export default Cards;
