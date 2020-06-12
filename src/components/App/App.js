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
    <GuestRoute exact path='/' component={HomeGuest} />
    <PrivateRoute exact path='/dashboard' component={Home} redirectTo={'/'} />
    <GuestRoute exact path='/login' component={Login} />
    <GuestRoute exact path='/signup' component={Signup} />
    <Route exact path='/faq' component={HomeGuest} />
  </Switch>
);

export default App;
