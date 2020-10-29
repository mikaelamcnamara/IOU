import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import BackgroundNew from '../../assets/bg-new.svg';
import ChattyMessage from '../../assets/chatting_isometric.svg';
import NavBar from '../common/Navbar/Navbar';
import SkeletonCard from '../common/SkeletonLoad/Skeleton';
import FavourCard from '../common/FavourCard/FavourCard';
import { getAllFavours } from '../../APIFetchers';

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [publicFavours, setPublicFavours] = useState([]);

  const getFavours = async () => {
    let favs = await getAllFavours(1, "");
    favs = favs.favours.map(favour => <FavourCard key={favour._id} creatorId={favour.creator._id} avatar={favour.creator.avatar} name={favour.creator.fullName} category={favour.category} title={favour.title} description={favour.description} xp={favour.points} id={favour._id} isPending={favour.applicant_user}/>)
    setPublicFavours(favs);
  }

  useEffect(() => {
    getFavours();
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
        <Link to='/Register' style={{ display: localStorage.getItem('user') ? 'none' : 'inline-block' }}>
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
            {publicFavours}
          </div>
        }
      </div>
    </>
  );
};

export default Home;
