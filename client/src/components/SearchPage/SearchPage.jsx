import React, { useMemo, useState, useEffect } from 'react';
import NavBar from '../common/Navbar/Navbar';
import AvatarCard from '../common/AvatarCard/AvatarCard';
import './SearchPage.css';
import Pagination from '../common/Pagination/Pagination';
import queryString from 'query-string';

import favoursList from '../common/dummyData.json';

const SearchPage = props => {
  const searchValue = queryString.extract(props.location.search);
  const [filteredFavours, setFilteredFavours] = useState([]);
  const [favours, setFavours] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);


  useEffect(() => {
    setFilteredFavours(
      favoursList.filter((favours) =>
        favours.name.toLowerCase().includes(searchValue.toLowerCase())
      )
    );
  }, [searchValue, favours]);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = favoursList.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = pageNumbers => setCurrentPage(pageNumbers);

  return (
    <>
      <div>
        <NavBar />
        <h1 className="search-results" >{`Search Results: ${searchValue}`} </h1>
        <p className="search-number-results"> {`Showing ${filteredFavours.length} results for ${searchValue}`} </p>
        <div className="search-bg">
          {filteredFavours.map((favours, index) => {
            return <AvatarCard posts={currentPosts} key={index} {...favours} />
          })}
          <Pagination postsPerPage={postsPerPage} totalAvatarCards={filteredFavours.length} paginate={paginate} />
        </div>

      </div>
    </>
  );
};

export default SearchPage;
