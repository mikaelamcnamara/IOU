import React from 'react';
import { BrowserRouter as Router, Switch, Redirect, Route } from 'react-router-dom';
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
import SearchPage from './components/SearchPage/SearchPage';

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
          <Route
            //atEnter={{ opacity: 0 }}
            //atLeave={{ opacity: 0 }}
            //atActive={{ opacity: 1 }}
            //timeout={500}
            path='/Register'
            exact
          >
            {localStorage.getItem('user') ? <Redirect to="/" /> : <Register />}
          </Route>
          <Route
            //atEnter={{ opacity: 0 }}
            //atLeave={{ opacity: 0 }}
            //atActive={{ opacity: 1 }}
            //timeout={500}
            path='/SignIn'
            exact
          >
            {localStorage.getItem('user') ? <Redirect to="/" /> : <SignIn />}
          </Route>
          <AnimatedRoute
            atEnter={{ opacity: 0 }}
            atLeave={{ opacity: 0 }}
            atActive={{ opacity: 1 }}
            timeout={500}
            path='/LeaderBoard'
            exact
            component={LeaderBoard}
          />
          <Route
            //atEnter={{ opacity: 0 }}
            //atLeave={{ opacity: 0 }}
            //atActive={{ opacity: 1 }}
            //timeout={500}
            path='/CreateFavour'
            exact
          >
            {localStorage.getItem('user') ? <CreateFavour /> : <Redirect to="/SignIn" />}
          </Route>
          <Route
            //atEnter={{ opacity: 0 }}
            //atLeave={{ opacity: 0 }}
            //atActive={{ opacity: 1 }}
            //timeout={500}
            path='/FulfillFavour'
            exact
          >
            {localStorage.getItem('user') ? <FulfillFavour /> : <Redirect to="/SignIn" />}
          </Route>
          <Route
            //atEnter={{ opacity: 0 }}
            //atLeave={{ opacity: 0 }}
            //atActive={{ opacity: 1 }}
            //timeout={500}
            path='/ReviewFavour'
            exact
          >
            {localStorage.getItem('user') ? <ReviewFavour /> : <Redirect to="/SignIn" />}
          </Route>
          <Route
            //atEnter={{ opacity: 0 }}
            //atLeave={{ opacity: 0 }}
            //atActive={{ opacity: 1 }}
            //timeout={500}
            path='/PersonalDetails'
            exact
          >
            {localStorage.getItem('user') ? <PersonalDetails /> : <Redirect to="/SignIn" />}
          </Route>
          <Route
            //atEnter={{ opacity: 0 }}
            //atLeave={{ opacity: 0 }}
            //atActive={{ opacity: 1 }}
            //timeout={500}
            path='/Favours'
            exact
          >
            {localStorage.getItem('user') ? <Favours /> : <Redirect to="/SignIn" />}
          </Route>
          <Route
            //atEnter={{ opacity: 0 }}
            //atLeave={{ opacity: 0 }}
            //atActive={{ opacity: 1 }}
            //timeout={500}
            path='/Account'
            exact
          >
            {localStorage.getItem('user') ? <Account /> : <Redirect to="/SignIn" />}
          </Route>
          <Route
            //atEnter={{ opacity: 0 }}
            //atLeave={{ opacity: 0 }}
            //atActive={{ opacity: 1 }}
            //timeout={500}
            path='/SearchPage'
            component={SearchPage}
          >
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
