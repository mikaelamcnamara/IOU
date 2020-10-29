import React from 'react';
import './Pagination.css'

const Pagination = ({ postsPerPage, totalAvatarCards, paginate }) => {


  const pageNumbers = [];

  for (let count = 1; count <= Math.ceil(totalAvatarCards / postsPerPage); count++) {
    pageNumbers.push(count);
  }

  return (
    <ul className="pagination">
      {pageNumbers.map(number => (
        <li key={number} className="avatar-item">
          <a href="#" onClick={() => paginate(number)} className="page-link">
            {number}
          </a>
        </li>
      ))}
    </ul>
  )

}


export default Pagination;