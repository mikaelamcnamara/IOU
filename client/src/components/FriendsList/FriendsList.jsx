import React, { useState, useEffect } from 'react';
import './FriendsList.css';
import FriendBG from '../../assets/friendlist.svg';
import NavBar from '../common/Navbar/Navbar';
import FriendCard from '../common/Friend/Friend';
import SkeletonCard from '../common/SkeletonLoad/Skeleton';
import Pagination from '../common/Pagination/Pagination';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";

import { getAllUsers, getFriendNames, addAFriend, removeFriend } from '../../APIFetchers';

// Loads friends and has three different categories
// Also utilises pagination to display 10 friends per page
const FriendsList = () => {
  const [loading, setLoading] = useState(false);
  const [friendsList, setFriendsList] = useState([]);
  const [yourFriends, setYourFriends] = useState([]);
  const [filter, setFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  const [friendCount, setFriendCount] = useState(0);
  const [isFriendsPage, setIsFriendsPage] = useState(false);
  const [isChanged, setIsChanged] = useState(false);
  
  const populateFriendsList = async () => {
    setLoading(true);
    let mates = await getFriendNames(currentPage, filter);
    setYourFriends(mates);
    let users = await getAllUsers(currentPage, filter);
    setFriendCount(users.count);
    users = users.users.map((user) => {
      const match = mates.users.find(i => i._id == user._id) !== undefined;
      return <div key={user._id}>
        <FriendCard avatar={user.avatar} name={user.fullName} xp={user.experiencePoints} id={user._id} addFriend={addFriends} removeFriend={removeFriends} isFriend={match}/>
      </div>
    });
    setFriendsList(users);
  }

  const populateYourFriends = async () => {
    setLoading(true);
    setFriendCount(yourFriends.count);
    let users = yourFriends.users.slice((currentPage-1)*10, (currentPage*10)).map(user => <div key={user._id}>
      <FriendCard avatar={user.avatar} name={user.fullName} xp={user.experiencePoints} id={user._id} addFriend={addFriends} removeFriend={removeFriends} isFriend={true}/>
    </div>);
    setFriendsList(users);
  }

  const addFriends = async (key) => {
    let addFriend = await addAFriend(key);

    if (addFriend.success) {
      Swal.fire(
        "Hit them up with a favour!",
        "success"
      );
      populateFriendsList();
    } else {
      Swal.fire(
        "Something went wrong...",
        addFriend.message,
        "error"
      );
    }
  }

  const removeFriends = async (key) => {
    let remFriend = await removeFriend(key);

    if (remFriend.success) {
      Swal.fire(
        "Success",
        "Friend removed",
        "success"
      );
      setTimeout(() => window.location.reload(), 1000);
    } else {
      Swal.fire(
        "Something went wrong...",
        remFriend.message,
        "error"
      );
    }
  }

  const handleFilter = () => {
    setCurrentPage(1);
    setIsFriendsPage(false);
    setIsChanged(prev => !prev);
  }

  const showFriends = () => {
    setCurrentPage(1);
    setIsFriendsPage(true);
  };

  const paginate = pageNumbers => {
    setCurrentPage(pageNumbers);
  }

  // Populate list on initial load
  useEffect(() => {
    populateFriendsList();
  },[])

  // If page number or filter changes, render the right friends list
  useEffect(() => {
    isFriendsPage ? populateYourFriends() : populateFriendsList();
  }, [currentPage, isFriendsPage, isChanged])

  // Set loading to false AFTER friends list is updated
  useEffect(() => {
    setLoading(false);
  }, [friendsList]);

  return (
    <>
      <div>
        <div className="content">
          <NavBar />
          <img className="friend-img" src={FriendBG} alt="friend-img"></img>
          <h1 className="friend-title">Friends List</h1>
          <br></br>
          <div className='nav-middle'>
            <div className='search-form friends-form'>
              <input
                type="text"
                className="search-input"
                placeholder="Search for friends...."
                onChange={(e) => setFilter(e.target.value)}
                value={filter}
              />
              <button 
                className="search-btn" 
                type="submit"
                onClick={() => handleFilter()}
              >
                <FontAwesomeIcon
                  className="search-icon"
                  icon={faSearch}
                  color="#8A2980"
                />
              </button>
            </div>
          </div>
          <button className="button-all" onClick={handleFilter}>
            Add Friends
          </button>
          <button className="button-all" onClick={showFriends}>
            Your Friends
          </button>
          <div className='friend-bg'>

        {loading &&
          <div className="loading-card">
            <SkeletonCard />
          </div>
        }
        {!loading &&
          <div>
            {
              friendCount !== 0 ? 
              <>
                {friendsList} 
                <Pagination postsPerPage={postsPerPage} totalAvatarCards={friendCount} paginate={paginate}/> 
              </> 
              : <h2 className="friends-placeholder-text">Go add some friends!</h2>
            }
          </div>
        }
          </div>
        </div>
      </div>
    </>
  );
};

export default FriendsList;
