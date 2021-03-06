import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import TextField from '../common/TextField';
import { login, getCurrentUser } from '../../APIFetchers';
import SignInBackground from '../../assets/SignInBackground.svg';
import SignInTitle from '../../assets/SignInTitle.svg';
import EmailIcon from '../../assets/EmailIcon.svg';
import PasswordIcon from '../../assets/PasswordIcon.svg';
import Lottie from 'react-lottie';
import animationData from '../../assets/Login.json';
import Swal from 'sweetalert2'

import '../../App.css';
import './SignIn.css';

// Signup which checks for authenticated user credentials by
// retrieiving details of that user through API calls and then comparing it 
const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const handleLogin = async () => {
    const res = await login(email, password);

    if (res.success) {
      const user = await getCurrentUser();
      localStorage.setItem('user', user._id);
      history.push('/');
      window.location.reload();
    }
    else Swal.fire("Authentication Failed", "Email or password is incorrect.", "error");
  };

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return (
    <div className='signin-grid'>
      <div className='signin-img-text'>
        <h1 className='signin-desc-header'>Welcome back!</h1>
        <p className='signin-desc-body'>
          Let's quickly login so you can check the latest favours from your
          friends and also see who owes you debt.
        </p>
        <div className='slide'>
          <img
            className='signin-img'
            src={SignInBackground}
            alt='signin-background'
          ></img>
        </div>
      </div>
      <div className='slide-up'>
        <a href="/" className="close"></a>
        <img className='signin-title' src={SignInTitle} alt='Sign In to IOU' />
        <br />
        <div className='animation-login'>
          <Lottie options={defaultOptions} height={300} width={300} />
        </div>
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

        {/* <Link to='/'>
          <p className='cancel-button'>Cancel</p>
        </Link> */}
        <p className='signin-account-text'>
          Don't have an account?{' '}
          <Link className='link' to='/Register'>
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
