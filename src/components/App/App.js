import React from 'react';
import {Route, Switch} from 'react-router-dom';
import styles from './App.module.css';
import Signup from '../Signup';
import Login from '../Login';
import Home from '../home/Home';
import PrivateRoute from '../../router/PrivateRoute';
import HomeGuest from '../HomeGuest';



const App = () => (
    <Switch>
      <Route exact path="/" component={HomeGuest} />
      <PrivateRoute exact path='/dashboard' Component={Home} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/signup" component={Signup} />
    </Switch>
  )

export default App;
