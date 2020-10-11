import React from 'react';

const Pagination = ({ totalAvatarCards }) => {
  const pageNumbers = [];

  for (let count = 1; count <= Math.ceil(totalAvatarCards / 10); count++) {
    pageNumbers.push[count];
  }

  return (
    <ul className="pagination">
      {pageNumbers.map(number => (
        <li key={number} className="avatar-item">
          <a href="#" className="page-link">
            {number}
          </a>
        </li>
      ))}
    </ul>
  )

}


export default Pagination;