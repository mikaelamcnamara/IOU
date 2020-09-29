import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import Heart from '../../../assets/heart.svg';
import favoursList from '../dummyData.json';
import './Navbar.css';
import Background from '../../../assets/background.svg';
import BackgroundNew from '../../../assets/bg-new.svg';
import ChattyMessage from '../../../assets/chatting_isometric.svg';
import manAvatar from '../../../assets/first-man-avatar.svg';
import burgerIcon from '../../../assets/burger-icon.svg';

const Navbar = () => {
  const [search, setSearch] = useState('');

  const favours = useMemo(() => {
    if (!search) return favoursList;
    return favoursList.filter((favour) => {
      return favour.name.toLowerCase().includes(search.toLowerCase());
    });
  }, [search, favoursList]);

  return (
    <>
      <div>
        <div className='main-content'>
          <div className='content'>
            <header>
              <div className='navbar-top'>
                <div className='nav-left'>
                  <div className='top-right'>
                    <img className='nav-logo' src={Heart} />
                  </div>
                </div>
                <div className='iou-logo'>
                  <h2 className='iou-logo-txt'>IOU</h2>
                </div>
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
                  <p id='home-txt'>Home</p>
                  <p id='leaderboard-txt'>LeaderBoard</p>

                  <Link to='/SignIn'>
                    <button className='signout-btn'>Login</button>
                  </Link>
                </div>
              </div>
            </header>

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
        <div className='favours-card'>
          <div className='favours-card-square-bg'>
            <img className='avatar' src={manAvatar} />
          </div>
          <div className='right-details'>
            <h4 className='title-txt'>Damien</h4>
            <div className='tag-content'>
              <span className='tag'>
                <img src={burgerIcon} alt='' /> Food
              </span>
            </div>
            <button className='do-favour-btn'> Do Favour</button>

            <p className='card-text'>
              Can someone buy me coffee? So I can turn that coffee into code.
              Cheers!
            </p>

            <p className='points-text'>+ EARN 100XP</p>
          </div>
        </div>
        <div className='favours-card'>
          <div className='favours-card-square-bg'>
            <img className='avatar' src={manAvatar} />
          </div>
          <div className='right-details'>
            <h4 className='title-txt'>Damien</h4>
            <div className='tag-content'>
              <span className='tag'>
                <img src={burgerIcon} alt='' /> Food
              </span>
            </div>
            <button className='do-favour-btn'> Do Favour</button>

            <p className='card-text'>
              Can someone buy me coffee? So I can turn that coffee into code.
              Cheers!
            </p>

            <p className='points-text'>+ EARN 100XP</p>
          </div>
        </div>
        <div className='favours-card'>
          <div className='favours-card-square-bg'>
            <img className='avatar' src={manAvatar} />
          </div>
          <div className='right-details'>
            <h4 className='title-txt'>Damien</h4>
            <div className='tag-content'>
              <span className='tag'>
                <img src={burgerIcon} alt='' /> Food
              </span>
            </div>
            <button className='do-favour-btn'> Do Favour</button>

            <p className='card-text'>
              Can someone buy me coffee? So I can turn that coffee into code.
              Cheers!
            </p>

            <p className='points-text'>+ EARN 100XP</p>
          </div>
        </div>
        <div className='favours-card'>
          <div className='favours-card-square-bg'>
            <img className='avatar' src={manAvatar} />
          </div>
          <div className='right-details'>
            <h4 className='title-txt'>Damien</h4>
            <div className='tag-content'>
              <span className='tag'>
                <img src={burgerIcon} alt='' /> Food
              </span>
            </div>
            <button className='do-favour-btn'> Do Favour</button>

            <p className='card-text'>
              Can someone buy me coffee? So I can turn that coffee into code.
              Cheers!
            </p>

            <p className='points-text'>+ EARN 100XP</p>
          </div>
        </div>
        <div className='favours-card'>
          <div className='favours-card-square-bg'>
            <img className='avatar' src={manAvatar} />
          </div>
          <div className='right-details'>
            <h4 className='title-txt'>Damien</h4>
            <div className='tag-content'>
              <span className='tag'>
                <img src={burgerIcon} alt='' /> Food
              </span>
            </div>
            <button className='do-favour-btn'> Do Favour</button>

            <p className='card-text'>
              Can someone buy me coffee? So I can turn that coffee into code.
              Cheers!
            </p>

            <p className='points-text'>+ EARN 100XP</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
