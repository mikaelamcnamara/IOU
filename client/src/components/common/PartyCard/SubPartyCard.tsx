import React from 'react';
import Avatars from '../Avatars/Avatars';

interface IProps {
    avatar: number;
    name: String;
  }
const SubPartyCard = ({avatar, name} : IProps) => {
    return (
    <div className='friend-card'>
        <div className='friend-card-square-bg' style={{backgroundColor: Avatars[avatar].color}}>
          <img className='avatar' src={Avatars[avatar].avatar} alt='avatar' />
        </div>
        <div className='right-details'>
          <h4 className='friend-title-txt'>{name}</h4>
          </div>
      </div>);
}

export default SubPartyCard;