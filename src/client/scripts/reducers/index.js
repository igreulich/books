import { combineReducers } from 'redux';

import { reducer as books } from './books';
import { reducer as authors } from './authors';

export default combineReducers({
  authors,
  books,
});
