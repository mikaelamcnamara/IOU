import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { logout } from '../../../APIFetchers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import Heart from '../../../assets/heart.svg';
import './Navbar.css';

//Dummy Data
// import favoursList from '../../common/dummyData.json';

const Navbar = () => {
  const [search, setSearch] = useState('');
  const [loggedIn] = useState(localStorage.getItem('user') ? true : false);

  //Search functionality
  // const favours = useMemo(() => {
  //   if (!search) return favoursList;
  //   return favoursList.filter((favour) => {
  //     return favour.name.toLowerCase().includes(search.toLowerCase());
  //   });
  // }, [search]);
  const handleLogout = async () => {
    await logout();
    window.location.reload();
  }

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
              <Link style={{ textDecoration: 'none' }} to='/Leaderboard'>
                <p className='leaderboard-txt'>LeaderBoard</p>
              </Link>
              <Link to='/Favours' style={{ textDecoration: 'none', display: loggedIn ? 'inline-block' : 'none' }}>
              <p className='leaderboard-txt'>Your Favours</p>
              </Link>
              <Link to='/Account' style={{ textDecoration: 'none', display: loggedIn ? 'inline-block' : 'none' }}>
              <p className='leaderboard-txt'>Profile</p>
              </Link>
              <Link to='/' style={{ textDecoration: 'none', display: loggedIn ? 'inline-block' : 'none' }}>
                <button className='signout-btn' onClick={() => handleLogout()}>Logout</button>
              </Link>
              <Link to='/SignIn'>
                <button className='signin-btn' style={{display: loggedIn ? 'none' : 'inline-block'}}>Login</button>
              </Link>
            </div>
          </div>
        </header>
      </div>
    </>
  );
};

export default Navbar;
