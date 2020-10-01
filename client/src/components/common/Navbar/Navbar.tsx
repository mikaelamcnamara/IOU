import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import Heart from '../../../assets/heart.svg';
import './Navbar.css';

//Dummy Data
// import favoursList from '../../common/dummyData.json';

const Navbar = () => {
  const [search, setSearch] = useState('');

  //Search functionality
  // const favours = useMemo(() => {
  //   if (!search) return favoursList;
  //   return favoursList.filter((favour) => {
  //     return favour.name.toLowerCase().includes(search.toLowerCase());
  //   });
  // }, [search]);

  return (
    <>
      <div>
        <header>
          <div className='navbar-top'>
            <div className='nav-left'>
              <div className='top-right'>
                <img className='nav-logo' alt='heart' src={Heart} />
              </div>
            </div>
            <Link style={{ textDecoration: 'none' }} to='/'>
              <div className='iou-logo'>
                <h2 id='iou-logo-txt'>IOU</h2>
              </div>
            </Link>
            <div className='nav-middle'>
              <form className='search-form'>
                <input
                  type='text'
                  className='search-input'
                  placeholder='Search for favours....'
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <button type='submit' className='search-btn'>
                  <FontAwesomeIcon
                    className='search-icon'
                    icon={faSearch}
                    color='#8A2980'
                  />
                </button>
              </form>
            </div>
            <div className='nav-right'>
              <Link style={{ textDecoration: 'none' }} to='/'>
                <p id='home-txt'>Home</p>
              </Link>
              <Link style={{ textDecoration: 'none' }} to='/Leaderboard'>
                <p id='leaderboard-txt'>LeaderBoard</p>
              </Link>
              <Link to='/SignIn'>
                <button className='signout-btn'>Login</button>
              </Link>
            </div>
          </div>
        </header>
      </div>
    </>
  );
};

export default Navbar;
