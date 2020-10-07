import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import BackgroundNew from '../../assets/bg-new.svg';
import ChattyMessage from '../../assets/chatting_isometric.svg';
import NavBar from '../common/Navbar/Navbar';
import AvatarCard from '../common/AvatarCard/AvatarCard';
import SkeletonCard from '../common/SkeletonLoad/Skeleton';

const Home = () => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(false);
    const timer = setTimeout(() => {
      setLoading(true);
    }, 1000)
    return () => clearTimeout(timer);
  }, [])

  return (
    <>
      <div >
        <div className='main-content'>
          <div className='content'>
            <NavBar />

            <img className='isometric-img slide-img-right' src={ChattyMessage} alt='' />
            <img className='background-img slide-left' src={BackgroundNew} alt='' />
          </div>
        </div>
        <h1 className='content-txt'>
          Complete favours <br /> in a fun way
        </h1>
        <p className='content-txt-below'>
          Our platform is intuitive and entertaining to use.
        </p>
        <Link to='/Register'>
          <button className='register-btn'>Register Now</button>
        </Link>

        <h2 className='public-title'>Public Favours</h2>
        <p className='public-favour-text-below'>
          Our platform is intuitive and entertaining to use.</p>

        {!loading &&
          <div className="loading-card">
            <SkeletonCard />
          </div>}

        {loading &&
          <div>
            <AvatarCard />
            <AvatarCard />
            <AvatarCard />
            <AvatarCard />
            <AvatarCard />
          </div>
        }
      </div>
    </>
  );
};

export default Home;
