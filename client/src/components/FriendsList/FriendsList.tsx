import React, { useState, useEffect } from 'react';
import './FriendsList.css';
import FriendBG from '../../assets/friendlist.svg';
import NavBar from '../common/Navbar/Navbar';
import Friend from '../common/Friend/Friend';
import favoursList from '../common/dummyData.json';
import Pagination from '../common/Pagination/Pagination';
import queryString from 'query-string';
import Lottie from 'react-lottie';
import searchAnimation from '../../assets/Searching.json';

const FriendsList = (props) => {
  const [search, setSearch] = useState('');
  const searchValue = queryString.extract(props.location.search);
  const [filteredFavours, setFilteredFavours] = useState([]);
  const [favours, setFavours] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: searchAnimation,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  // useEffect(() => {
  //   setFilteredFavours(
  //     favoursList.filter((favours) =>
  //       favours.name.toLowerCase().includes(searchValue.toLowerCase())
  //     )
  //   );
  // }, [searchValue, favours]);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredFavours.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumbers) => setCurrentPage(pageNumbers);

  const renderFriends = () => {
    return (
      <div className='search-bg'>
        {currentPosts.map((favours, index) => {
          return <Friend key={index} {...favours} />;
        })}
        <Pagination
          postsPerPage={postsPerPage}
          totalAvatarCards={filteredFavours.length}
          paginate={paginate}
        />
      </div>
    );
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
            {/* include a search form */}
            <button className='button-all'>Add Friends</button>
            <button className='button-all'>Your Friends</button>
            <button className='button-all '> Your Friend Requests</button>
            <button className='button-all'>Pending Requests</button>
            <div className='friend-bg'>
              <h1 className='search-results'></h1>
              {/* call APIs here */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FriendsList;
