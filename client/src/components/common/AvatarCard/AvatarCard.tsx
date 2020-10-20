import React from 'react';
import manAvatar from '../../../assets/first-man-avatar.svg';
import burgerIcon from '../../../assets/burger-icon.svg';
import './AvatarCard.css';

interface IProps {
  title: string,
  description: string,
  points: number,
  category: string,
}



const AvatarCard = ({ title, description, points, category }) => {
  return (
    <>
      <div className='favours-card'>
        <div className='favours-card-square-bg'>
          <img className='avatar' src={manAvatar} alt='avatar' />
        </div>
        <div className='right-details'>
          <h4 className='title-txt'>{title}</h4>
          <div className='tag-content'>
            <span className='tag'>
              <img src={burgerIcon} alt='' /> {category}
            </span>
          </div>
          <button className='do-favour-btn'> Do Favour</button>
          <p className='card-text'>
            {description}
          </p>
          <p className='points-text'>{`+EARN ${points} XP`}</p>
        </div>
      </div>
    </>
  );
};

export default AvatarCard;
