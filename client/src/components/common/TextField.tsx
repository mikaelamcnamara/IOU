import React from 'react';

const TextField = ({ icon, label, type, value, setValue }) => {
  return (
    <div className='textfield'>
      <img className='textfield-icon' src={icon} alt='icon' />
      <p className='textfield-label' style={{fontSize:'15px'}}>{label}</p>
      <br />
      <input
        className='text-entry'
        type={type}
        value={value}
        onChange={(event) => setValue(event)}
      />
    </div>
  );
};

export default TextField;
