import React from 'react';
import NavBar from '../common/Navbar/Navbar';
import AvatarCard from '../common/AvatarCard/AvatarCard';
import './SearchPage.css';
import Pagination from '../common/Pagination/Pagination';

const SearchPage = () => {
  return (
    <>
      <div>
        <NavBar />
        <h1 className="search-results" >Search Results: Call Of Duty</h1>
        <p className="search-number-results"> Showing results 1-10 of 30 for Call of Duty </p>
        <div className="search-bg">
          <AvatarCard />
          <AvatarCard />
          <AvatarCard />
          <AvatarCard />
          <AvatarCard />
          <Pagination totalAvatarCards={100} />
        </div>

      </div>
    </>
  );
};

export default SearchPage;
