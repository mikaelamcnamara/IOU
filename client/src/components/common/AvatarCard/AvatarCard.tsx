import React from 'react';
import Avatars from '../Avatars/Avatars';
import burgerIcon from '../../../assets/burger-icon.svg';
import './AvatarCard.css';

interface IProps {
  avatar: number,
  name: string,
  title: string,
  description: string,
  points: number,
  category: string,
  creatorId: string,
  id: string,
  isPending: Boolean,
}



const AvatarCard = ({ avatar, name, creatorId, title, description, points, category, id, isPending}: IProps) => {
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
          {!isPending && creatorId !== localStorage.getItem('user') && <button className='do-favour-btn'> Do Favour</button>}
          {isPending && <button className='do-favour-btn'>Pending Approval</button>}
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
