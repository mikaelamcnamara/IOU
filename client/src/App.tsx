import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { AnimatedRoute } from 'react-router-transition';
import './App.css';
import Register from './components/Register/Register';
import SignIn from './components/SignIn/SignIn';
import Home from './components/Home/Home';
import LeaderBoard from './components/LeaderBoard/LeaderBoard';
import CreateFavour from './components/CreateFavour/CreateFavour';
import FulfillFavour from './components/FulfillFavour/FulfillFavour';
import ReviewFavour from './components/ReviewFavour/ReviewFavour';
import PersonalDetails from './components/PersonalDetails/PersonalDetails';
import Favours from './components/Favours/Favours';
import Account from './components/Account/Account';

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
          <AnimatedRoute
            atEnter={{ opacity: 0 }}
            atLeave={{ opacity: 0 }}
            atActive={{ opacity: 1 }}
            timeout={500}
            path='/LeaderBoard'
            exact
            component={LeaderBoard}
          />
          <AnimatedRoute
            atEnter={{ opacity: 0 }}
            atLeave={{ opacity: 0 }}
            atActive={{ opacity: 1 }}
            timeout={500}
            path='/CreateFavour'
            exact
            component={CreateFavour}
          />
          <AnimatedRoute
            atEnter={{ opacity: 0 }}
            atLeave={{ opacity: 0 }}
            atActive={{ opacity: 1 }}
            timeout={500}
            path='/FulfillFavour'
            exact
            component={FulfillFavour}
          />
          <AnimatedRoute
            atEnter={{ opacity: 0 }}
            atLeave={{ opacity: 0 }}
            atActive={{ opacity: 1 }}
            timeout={500}
            path='/ReviewFavour'
            exact
            component={ReviewFavour}
          />
          <AnimatedRoute
            atEnter={{ opacity: 0 }}
            atLeave={{ opacity: 0 }}
            atActive={{ opacity: 1 }}
            timeout={500}
            path='/PersonalDetails'
            exact
            component={PersonalDetails}
          />
          <AnimatedRoute
            atEnter={{ opacity: 0 }}
            atLeave={{ opacity: 0 }}
            atActive={{ opacity: 1 }}
            timeout={500}
            path='/Favours'
            exact
            component={Favours}
          />
          <AnimatedRoute
            atEnter={{ opacity: 0 }}
            atLeave={{ opacity: 0 }}
            atActive={{ opacity: 1 }}
            timeout={500}
            path='/Account'
            exact
            component={Account}
          />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
