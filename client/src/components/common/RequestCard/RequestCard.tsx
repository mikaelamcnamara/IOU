import React from 'react';
import manAvatar from '../../../assets/first-man-avatar.svg';
import burgerIcon from '../../../assets/burger-icon.svg';
import trashIcon from '../../../assets/trash-icon.svg';
import './RequestCard.css';
import Avatars from "../Avatars/Avatars";
import { removeFavour } from '../../../APIFetchers';

interface IProps {
  avatar: number,
  name: String,
  category: String,
  title: String,
  description: String,
  xp: Number,
  id: String,
}

const RequestCard = ({avatar, name, category, title, description, xp, id}: IProps) => {

  const handleRemove = async () => {
    await removeFavour(id);
    window.location.reload();
  }
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
          <p className='card-text'>
            {description}
          </p>
          <p className='points-text'>+ EARN {xp}XP</p>
        </div>
        <img className='trash' src={trashIcon} alt='trash' onClick={() => handleRemove()}/>
      </div>
    </>
  );
};

export default RequestCard;
