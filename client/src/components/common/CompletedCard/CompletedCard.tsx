import React from 'react';
import Avatars from '../Avatars/Avatars';
import burgerIcon from '../../../assets/burger-icon.svg';
import './CompletedCard.css';

interface IProps {
  avatar: number,
  name: String,
  category: String,
  title: String,
  description: String, 
  xp: Number,
}

const CompletedCard = ({avatar, name, category, title, description, xp}: IProps) => {
  return (
    <>
      <div className='favours-card'>
        <div className='favours-card-square-bg' style={{backgroundColor: Avatars[avatar].color}}>
          <img className='avatar' src={Avatars[avatar].avatar} alt='avatar' />
        </div>
        <div className='right-details'>
          <h4 className='title-txt'>{name}</h4>
          <div className='tag-content'>
            <span className='tag'>
              <img src={burgerIcon} alt='' /> {category}
            </span>
          </div>
          <button className='complete-btn'>Completed</button>
          <p className='card-text'>
            {description}
          </p>
          <p className='points-text'>+ EARN {xp}XP</p>
        </div>
      </div>
    </>
  );
};

export default CompletedCard;
