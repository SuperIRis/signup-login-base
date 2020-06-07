import React from 'react';
import {Route, Switch} from 'react-router-dom';
import {createStore, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';
import {Provider} from 'react-redux';
import {createLogger} from 'redux-logger';
import reducer from '../../reducers';
import rootSaga from '../../sagas';
import styles from './App.module.css';
import Signup from '../Signup';
import Login from '../Login';
import Home from '../home/Home';
import PrivateRoute from '../../router/PrivateRoute';
import HomeGuest from '../HomeGuest';
import { sessionRequest, loginRequest } from '../../actions/actions';

const sagaMiddleware = createSagaMiddleware();

let store;
const reduxVerbose = true;
if(process.env.NODE_ENV === 'development' && reduxVerbose){
  store = createStore(reducer, applyMiddleware(createLogger(), sagaMiddleware));
}
else{
  store = createStore(reducer, applyMiddleware(sagaMiddleware));
}

sagaMiddleware.run(rootSaga);

const checkUserAuth = () =>{
  const { loggedIn } = store.getState();
  console.log('-------------', store.getState())
  console.log(loggedIn)
  //store.dispatch(sessionRequest());
  store.dispatch(loginRequest({ fbid: '122' }, true));


  return loggedIn;
}

const App = () => (
  <Provider store={store}>
    <Switch>
      <Route exact path="/" component={HomeGuest} />
      <PrivateRoute exact path='/dashboard' Component={Home} loggedState={checkUserAuth}/>
      <Route exact path="/login" component={Login} />
      <Route exact path="/signup" component={Signup} />
    </Switch>
  </Provider>
);

export default App;
