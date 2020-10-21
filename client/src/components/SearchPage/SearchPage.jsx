import React, { useMemo, useState, useEffect } from 'react';
import NavBar from '../common/Navbar/Navbar';
import AvatarCard from '../common/AvatarCard/AvatarCard';
import './SearchPage.css';
import Pagination from '../common/Pagination/Pagination';
import queryString from 'query-string';
import Cards from '../common/Cards/Cards';
import Lottie from 'react-lottie';
// import favoursList from '../common/dummyData.json';
import searchAnimation from '../../assets/Searching.json';


import { getAllFavours } from '../../APIFetchers';

const SearchPage = props => {
  // Configuring all the states and hooks
  const searchValue = queryString.extract(props.location.search);
  const [filteredFavours, setFilteredFavours] = useState([]);
  const [favoursList, setFavoursList] = useState([]);
  const [favours, setFavours] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);

  // Initialises the properties for lottie library 
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: searchAnimation,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  const populateFavoursList = async () => {
    let favours = await getAllFavours();
    setFavoursList(favours);
  }


  // The search functionality which receives a searchValue prop from the navbar input and performs function
  useEffect(() => {
    populateFavoursList();
    setFilteredFavours(
      favoursList.filter((favours) =>
        favours.title.toLowerCase().includes(searchValue.toLowerCase())
      )
    );
  }, [searchValue, favours]);


  // Responsible for pagination as the variable names suggest
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredFavours.slice(indexOfFirstPost, indexOfLastPost);

  // Function which keeps track of the current page
  const paginate = pageNumbers => setCurrentPage(pageNumbers);

  // Renders the number of cards based on matching results from search on the dummydata.json
  const renderCards = () => {
    return (<div className="search-bg">
      {currentPosts.map((favours, index) => {
        return <AvatarCard key={index} creatorId={favours.creator._id} avatar={favours.creator.avatar} name={favours.creator.fullName} title={favours.title} description={favours.description} points={favours.points} category={favours.category} id={favours._id} isPending={favours.applicant_user}/>
      })}
      <Pagination postsPerPage={postsPerPage} totalAvatarCards={filteredFavours.length} paginate={paginate} />
    </div>)
  }

  return (
    <>
      <div>
        <NavBar />
        <h1 className="search-results" >{(searchValue === "") ? "All of the favours" : `Search Results: ${searchValue}`} </h1>
        <p className="search-number-results"> {(searchValue === "") ? `Showing all ${filteredFavours.length} favours` : `Showing ${filteredFavours.length} results for ${searchValue}`} </p>
        {
          (filteredFavours.length === 0) ?
            <div className="failed-content">
              <div className='search-fail-animation'>
                <Lottie options={defaultOptions} height={700} width={700} />
              </div>
              <h1 className="failed-search">Oops...we could not find that favour.</h1>
            </div> : renderCards()
        }
      </div>
    </>
  );
};

export default SearchPage;
