import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './FriendsList.css';
import FriendBG from '../../assets/friendlist.svg';
import NavBar from '../common/Navbar/Navbar';
import Friend from '../common/Friend/Friend';
import friendsList from '../common/dummyData.json';
import Pagination from '../common/Pagination/Pagination';
import queryString from 'query-string';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import Lottie from 'react-lottie';
import searchAnimation from '../../assets/Searching.json';

const FriendsList = (props) => {

  //search functionality
  const [search, setSearchFriend] = useState('');
  const [favours, setFavours] = useState([]);
  const [filteredFriends, setFilteredFriends] = useState([]);

  console.log(search);


  //handle search results
  const handleOnSubmit = (e) => {
    e.preventDefault();
  };

  //retrieves search value from searchBar
  useEffect(() => {
    setFilteredFriends(
      friendsList.filter((favours) =>
        favours.name.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, favours]);

  const showAllUsers = () => {
    alert('show users');
  };

  const showFriends = () => {
    alert('show users');
    this.setState({active: true});
  };

  const showPendingRequests = () => {
    alert('show users');
    this.setState({active: true});
  };

  const showRequests = () => {
    alert('show users');
  };

  //display data
  const renderFriends = () => {
    // return (
    //   <div className='search-bg'>
    //     {currentPosts.map((favours, index) => {
    //       return <Friend key={index} {...favours} />;
    //     })}
    //     <Pagination
    //       postsPerPage={postsPerPage}
    //       totalAvatarCards={filteredFriends.length}
    //       paginate={paginate}
    //     />
    //   </div>
    // );
  };

  return (
    <>
      <div>
        <div className='content'>
          <NavBar />
          <img className='friend-img' src={FriendBG} alt='friend-img'></img>
          <h1 className='leader-title'>Friends List</h1>
          <br></br>
          <div className='nav-middle'>
            <form className='search-form' onSubmit={handleOnSubmit}>
              <input
                type='text'
                className='search-input'
                placeholder='Search for favours....'
                onChange={(e) => setSearchFriend(e.target.value)}
                value={search}
              />
              {/* <button className='search-btn' type='submit'>
                <FontAwesomeIcon
                  className='search-icon'
                  icon={faSearch}
                  color='#8A2980'
                />
              </button> */}
            </form>
          </div>
          <button className='button-all' onClick={showAllUsers} >
            Add Friends
          </button>
          <button className='button-all' onClick={showFriends}>
            Your Friends
          </button>
          <button className='button-all ' onClick={showRequests}>
            {' '}
            Your Friend Requests
          </button>
          <button className='button-all' onClick={showPendingRequests}>
            Pending Requests
          </button>
          <div className='friend-bg'>
            <h1 className='search-results'></h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default FriendsList;
