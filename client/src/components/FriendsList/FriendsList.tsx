import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './FriendsList.css';
import FriendBG from '../../assets/friendlist.svg';
import ChattyMessage from '../../assets/chatting_isometric.svg';
import NavBar from '../common/Navbar/Navbar';
import AvatarCard from '../common/AvatarCard/AvatarCard';
import SkeletonCard from '../common/SkeletonLoad/Skeleton';

const FriendsList = () => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(false);
    const timer = setTimeout(() => {
      setLoading(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <div>
        <div className='main-content'>
          {/* <div className='content'> */}
          <NavBar />
          <img className='friend-img' src={FriendBG} alt='friend-img'></img>
          {/* </div> */}
        </div>
      </div>
    </>
  );
};

export default FriendsList;
