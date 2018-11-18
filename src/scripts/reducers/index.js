import { combineReducers } from 'redux';

import { reducer as books } from './books';

export default combineReducers({
  books,
});
