import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { AnimatedRoute } from 'react-router-transition';
import './App.css';
import Register from './components/Register/Register';
import SignIn from './components/SignIn/SignIn';
import Home from './components/Home/Home';

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
            component={Home}
          />

          <AnimatedRoute
            atEnter={{ opacity: 0 }}
            atLeave={{ opacity: 0 }}
            atActive={{ opacity: 1 }}
            timeout={500}
            path='/Register'
            exact
            component={Register}
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
