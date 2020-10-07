import React from 'react';
import './ProgressBar.css';

const ProgressBar = (props) => {
  const { bgcolor, completed } = props;

  const fillerStyles = {
    width: `${completed}%`,
    backgroundColor: bgcolor,
  };

  return (
    <div className='progressbar-container'>
      <div className='progressbar-filler' style={fillerStyles}>
        <span className='progressbar-label'></span>
      </div>
    </div>
  );
};

export default ProgressBar;
