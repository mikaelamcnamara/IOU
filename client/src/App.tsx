import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { AnimatedRoute } from 'react-router-transition';

import './App.css';

import Home from './components/Home/Home';
import SignIn from './components/SignIn/SignIn';
import SearchPage from './components/SearchPage/SearchPage';
import Navbar from './components/common/Navbar/Navbar';

const App = () => {
  return (
    <div className='App'>
      <Router>
        <Switch>
          <AnimatedRoute
            atEnter={{ opacity: 0 }}
            atLeave={{ opacity: 0 }}
            atActive={{ opacity: 1 }}
            timeout={500}
            path='/'
            exact
            component={Navbar}
          />

          <AnimatedRoute
            atEnter={{ opacity: 0 }}
            atLeave={{ opacity: 0 }}
            atActive={{ opacity: 1 }}
            timeout={500}
            path='/Register'
            exact
            component={Home}
          />
          <AnimatedRoute
            atEnter={{ opacity: 0 }}
            atLeave={{ opacity: 0 }}
            atActive={{ opacity: 1 }}
            timeout={500}
            path='/SignIn'
            exact
            component={SignIn}
          />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
