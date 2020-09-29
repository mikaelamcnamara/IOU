import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import TextField from '../common/TextField';
import { login } from '../../APIFetchers';
import SignInBackground from '../../assets/SignInBackground.svg';
import SignInTitle from '../../assets/SignInTitle.svg';
import SignInPhone from '../../assets/SignInPhone.svg';
import EmailIcon from '../../assets/EmailIcon.svg';
import PasswordIcon from '../../assets/PasswordIcon.svg';

import '../../App.css';
import './SignIn.css';
//TODO: Add Forgot Password link to page!
const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    const res = await login(email, password);
    window.alert(res.message);
    //if res.success is true, redirect to dashboard, else alert (sweet alert time!)
  };

  return (
    <div className='signin-grid'>
      <div className='signin-img-text'>
        <h1 className='signin-desc-header'>Welcome back!</h1>
        <p className='signin-desc-body'>
          Let's quickly login so you can check the latest favours from your
          friends and also see who owes you debt.
        </p>
        <img
          className='signin-img'
          src={SignInBackground}
          alt='signin-background'
        ></img>
      </div>
      <div>
        <img className='signin-title' src={SignInTitle} alt='Sign In to IOU' />
        <br />
        <img src={SignInPhone} alt='Sign in image' />
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
        <p className='signin-button' onClick={() => handleLogin()}>
          Sign In
        </p>
        <br />
        <Link to='/'>
          <p className='cancel-button'>Cancel</p>
        </Link>
        <p className='signin-account-text'>
          Don't have an account?
          <Link className='link' to='/Register'>
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
