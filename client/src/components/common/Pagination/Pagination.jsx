import React from 'react';
import './Pagination.css'

const Pagination = ({ totalAvatarCards }) => {


  const pageNumbers = [];

  for (let count = 1; count <= Math.ceil(totalAvatarCards / 10); count++) {
    pageNumbers.push(count);
  }

  return (
    <ul className="pagination">
      <li className="avatar-item" >{"<"} </li>
      {pageNumbers.map(number => (
        <li key={number} className="avatar-item">
          <a href="#" className="page-link">
            {number}
          </a>
        </li>
      ))}
      <li className="avatar-item" >{">"} </li>
    </ul>
  )

}


export default Pagination;