import React from 'react';
import { Route, Switch } from 'react-router-dom';
import styles from './App.module.css';
import Signup from '../Signup';
import Login from '../Login';
import Home from '../home/Home';
import PrivateRoute from '../../router/PrivateRoute';
import GuestRoute from '../../router/GuestRoute';
import HomeGuest from '../HomeGuest';

const App = () => (
  <Switch>
    <GuestRoute exact path='/' Component={HomeGuest} />
    <PrivateRoute exact path='/dashboard' Component={Home} redirectTo={'/'} />
    <GuestRoute exact path='/login' Component={Login} />
    <GuestRoute exact path='/signup' Component={Signup} />
    <Route exact path='/faq' Component={HomeGuest} />
  </Switch>
);

export default App;
