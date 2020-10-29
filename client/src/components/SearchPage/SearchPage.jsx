import React, { useState, useEffect } from 'react';
import NavBar from '../common/Navbar/Navbar';
import AvatarCard from '../common/AvatarCard/AvatarCard';
import './SearchPage.css';
import Pagination from '../common/Pagination/Pagination';
import queryString from 'query-string';
import Lottie from 'react-lottie';
import searchAnimation from '../../assets/Searching.json';

import { getAllFavours } from '../../APIFetchers';

const SearchPage = props => {
  // Configuring all the states and hooks
  const searchValue = queryString.extract(props.location.search);
  const [favoursList, setFavoursList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  const [numFound, setNumFound] = useState(0);

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
    let favours = await getAllFavours(currentPage, searchValue);
    setNumFound(favours.count);
    setFavoursList(favours.favours);
  }


  // If searchValue changes, reset the page number and get the new results
  useEffect(() => {
    setCurrentPage(1);
    populateFavoursList();
  }, [searchValue]);

  // If the page number changes, get the new results
  useEffect(() => {
    populateFavoursList();
  }, [currentPage])

  // Function which keeps track of the current page
  const paginate = pageNum => setCurrentPage(pageNum);

  // Renders the number of cards based on matching results from search on the dummydata.json
  const renderCards = () => {
    return (<div className="search-bg">
      {favoursList.map((favours, index) => {
        return <AvatarCard key={index} creatorId={favours.creator._id} avatar={favours.creator.avatar} name={favours.creator.fullName} title={favours.title} description={favours.description} points={favours.points} category={favours.category} id={favours._id} isPending={favours.applicant_user}/>
      })}
      <Pagination postsPerPage={postsPerPage} totalAvatarCards={numFound} paginate={paginate} />
    </div>)
  }

  return (
    <>
      <div>
        <NavBar value={props} />
        <h1 className="search-results" >{(searchValue === "") ? "All of the favours" : `Search Results: ${searchValue}`} </h1>
        <p className="search-number-results"> {(searchValue === "") ? `Showing all ${numFound} favours` : `Showing ${numFound} results for ${searchValue}`} </p>
        {
          (numFound === 0) ?
            <div className="failed-content">
              <div className='search-fail-animation'>
                <Lottie options={defaultOptions} height={700} width={700} />
              </div>
              <h1 className="failed-search">Oops...we could not find that favour. Try search again?</h1>
            </div> : renderCards()
        }
      </div>
    </>
  );
};

export default SearchPage;
