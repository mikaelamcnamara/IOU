import React from 'react';
import NavBar from '../common/Navbar/Navbar';
import AvatarCard from '../common/AvatarCard/AvatarCard';
import './SearchPage.css';
import Pagination from '../common/Pagination/Pagination';
import queryString from 'query-string';

import favoursList from '../common/dummyData.json';

const SearchPage = props => {
  const searchValue = queryString.extract(props.location.search);


  //Search functionality
  // const favours = useMemo(() => {
  //   if (!search) return favoursList;
  //   return favoursList.filter((favour) => {
  //     return favour.name.toLowerCase().includes(search.toLowerCase());
  //   });
  // }, [search]);
  return (
    <>
      <div>
        <NavBar />
        <h1 className="search-results" >{`Search Results: ${searchValue}`} </h1>
        <p className="search-number-results"> {`Showing results 1-10 of 30 for ${searchValue}`} </p>
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
