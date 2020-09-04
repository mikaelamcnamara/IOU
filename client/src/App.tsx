import React, { useState } from 'react';
import './App.css';
import { getCurrentUser, login, register, logout } from './APIFetchers';

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = () => {
    register('James Franco', email, password, password);
  };

  const handleLogin = () => {
    login(email, password);
  };

  const handleGetUser = () => {
    getCurrentUser();
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <div className='App'>
      <header className='App-header'>
        <h1>EXAMPLES</h1>
        <h1>Register</h1>
        <form>
          <p>Email Address:</p>
          <input
            type='text'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></input>
          <p>Password:</p>
          <input
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></input>
          <br />
          <input
            type='button'
            value='Register'
            onClick={() => handleRegister()}
          ></input>
        </form>
        <h1>Sign in</h1>
        <form>
          <p>Email Address:</p>
          <input
            type='text'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></input>
          <p>Password:</p>
          <input
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></input>
          <br />
          <input
            type='button'
            value='Sign In'
            onClick={() => handleLogin()}
          ></input>
        </form>

        <input
          type='button'
          value='Console log current user'
          onClick={() => handleGetUser()}
        ></input>

        <input
          type='button'
          value='Logout'
          onClick={() => handleLogout()}
        ></input>

        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className='App-link'
          href='https://reactjs.org'
          target='_blank'
          rel='noopener noreferrer'
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
