import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { createLogger } from 'redux-logger';
import reducer from '../reducers';
import rootSaga from '../sagas';

const configureStore = (preloadedState)=>{
  let store;
  
  const reduxVerbose = true;
  
  const sagaMiddleware = createSagaMiddleware();
  
  if (process.env.NODE_ENV === 'development' && reduxVerbose) {
    store = createStore(reducer, preloadedState, applyMiddleware(createLogger(), sagaMiddleware));
  } else {
    store = createStore(reducer,preloadedState, applyMiddleware(sagaMiddleware));
  }
  
  sagaMiddleware.run(rootSaga);
  
  if(module.hot){
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers').default;
      store.replaceReducer(nextReducer);
    });
  }
  return store;
}

export default configureStore;