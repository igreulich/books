import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import rootReducer from '../reducers/index';

const configureStore = (preloadedState) => {
  const middlewares = [thunk];
  const composedEnhancers = composeWithDevTools(applyMiddleware(...middlewares));
  const store = createStore(rootReducer, preloadedState, composedEnhancers);

  return store;
};

export default configureStore;
