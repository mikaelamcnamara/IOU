import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './FriendsList.css';
import FriendBG from '../../assets/friendlist.svg';
import NavBar from '../common/Navbar/Navbar';
import FriendCard from '../common/Friend/Friend';
import SkeletonCard from '../common/SkeletonLoad/Skeleton';
import ConfettiGenerator from 'confetti-js';


import { getAllUsers } from '../../APIFetchers';
import { addAFriend } from '../../APIFetchers';


const FriendsList = (props) => {

  const [loading, setLoading] = useState(false);
  const [search, setSearchFriend] = useState('');
  const [friendsList, setFriendsList] = useState([]);
  const [filteredFriends, setFilteredFriends] = useState([]);

  const populateFriendsList = async () => {
    //API call
    setLoading(true);
    let users = await getAllUsers();
 
    users = users.map((user) => {
      const key = user._id;
      return <div>
      <FriendCard  avatar={user.avatar} name={user.fullName} xp={user.experiencePoints} id={user._id}/>
      <button className='do-favour-btn' onClick={() => addFriends(key)} >+ Add Friend</button>
      </div>
     });
    setFriendsList(users);
    setLoading(false);
  }

  const addFriends = async (key) => {
    console.log(key)
    let addFriend = await addAFriend(key);

  }

 

  //handle search results
  const handleSearch = (e) => {
    e.preventDefault();
    console.log(search);
  };


  const showAllUsers = () => {
    alert('show users');
  };

  const showFriends = () => {
    alert('show users');

  };

  const showPendingRequests = () => {
    alert('show users');
 
  };

  const showRequests = () => {
    alert('show users');
  };

  useEffect(() => {
    populateFriendsList();
    return () => console.log('hi');
  }, []);

  return (
    <>
      <div>
        <div className='content'>
          <NavBar />
          <img className='friend-img' src={FriendBG} alt='friend-img'></img>
          <h1 className='leader-title'>Friends List</h1>
          <br></br>
          <div className='nav-middle'>
            <form className='search-form' onSubmit={handleSearch}>
              <input
                type='text'
                className='search-input'
                placeholder='Search for favours....'
                onChange={(e) => setSearchFriend(e.target.value)}
                value={search}
              />
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

        {loading &&
          <div className="loading-card">
            <SkeletonCard />
          </div>
        }
        {!loading &&
          <div>
            {friendsList}
          </div>
          
        }
          </div>
        </div>
      </div>
    </>
  );
};

export default FriendsList;
