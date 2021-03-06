import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import TextField from '../common/TextField';
import { register } from '../../APIFetchers';
import HomeBackground from '../../assets/HomeBackground.png';
import HomeProfileIcon from '../../assets/HomeProfileIcon.svg';
import NameIcon from '../../assets/NameIcon.svg';
import EmailIcon from '../../assets/EmailIcon.svg';
import PasswordIcon from '../../assets/PasswordIcon.svg';
import ConfirmPasswordIcon from '../../assets/ConfirmPasswordIcon.svg';
import Swal from 'sweetalert2'

import '../../App.css';
import './Register.css';

// Registration which checks for valid names, emails and passwords
// Displays error message if incorrect values are entered
const Register = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const history = useHistory();

  const handleRegistration = async () => {
    const res = await register(fullName, email, password, confirmPassword);
    if (res.success) history.push('/SignIn');
    // else window.alert(res.message);
    else Swal.fire("Registration Failed", res.message, "error");
  };

  return (
    <>

      <div className='home-grid'>

        <div className='home-img-text'>
          <h1 className='home-desc-header'>Let's start with you</h1>
          <p className='home-desc-body'>
            View favours which you can request and complete. Earn points and add
            friends. What better way is there to enjoy your good deeds?
          </p>
          <div className="slide-bottom">
            <img
              className='home-img'
              src={HomeBackground}
              alt='home-background'
            ></img>
          </div>
        </div>
        <div className="slide-right">
          <h1 className='home-register-title'>Create an account</h1>
          <a href="/" className="close"></a>
          <img
            className='home-profile-icon'
            src={HomeProfileIcon}
            alt='profile icon'
          />
          <TextField
            icon={NameIcon}
            label='Full Name'
            type='text'
            value={fullName}
            setValue={(event) => setFullName(event.target.value)}
          />
          <TextField
            icon={EmailIcon}
            label='Email'
            type='text'
            value={email}
            setValue={(event) => setEmail(event.target.value)}
          />
          <TextField
            icon={PasswordIcon}
            label='Password'
            type='password'
            value={password}
            setValue={(event) => setPassword(event.target.value)}
          />
          <TextField
            icon={ConfirmPasswordIcon}
            label='Confirm Password'
            type='password'
            value={confirmPassword}
            setValue={(event) => setConfirmPassword(event.target.value)}
          />
          <p className='sign-up-button' onClick={() => handleRegistration()}>
            Sign Up
          </p>
          <br />

          <p className='home-account-text'>
            Already have an account?{' '}
            <Link className='link' to='/SignIn'>
              Login
            </Link>
          </p>
          {/* <Link to='/'>
            <p className='cancel-button'>Cancel</p>
          </Link> */}
        </div>
      </div>
    </>
  );
};

export default Register;
