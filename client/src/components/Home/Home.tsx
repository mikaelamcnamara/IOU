import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import BackgroundNew from '../../assets/bg-new.svg';
import ChattyMessage from '../../assets/chatting_isometric.svg';
import NavBar from '../common/Navbar/Navbar';
import AvatarCard from '../common/AvatarCard/AvatarCard';

const Home = () => {
  return (
    <>
      <div>
        <div className='main-content'>
          <div className='content'>
            <NavBar />
            <img className='isometric-img' src={ChattyMessage} alt='' />
            <img className='background-img' src={BackgroundNew} alt='' />
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
          Our platform is intuitive and entertaining to use.
        </p>
        <AvatarCard />
        <AvatarCard />
        <AvatarCard />
        <AvatarCard />
        <AvatarCard />
      </div>
    </>
  );
};

export default Home;
