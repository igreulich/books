import { createAction, handleActions } from 'redux-actions';

export const updateBooks = createAction('UPDATE_BOOKS');

const initialState = {
  books: [],
};

export const reducer = handleActions(
  {
    [updateBooks]: (state, action) => ({
      ...state,
      books: [...state.books, ...action.payload],
    }),
  },
  initialState,
);

export const fetchBooks = () => {
  return dispatch => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(handleErrors)
      .then(res => res.json())
      .then(json => dispatch(updateBooks(json)));
  }
}

// Apparently fetch doesn't handle errors?
function handleErrors(res) {
  if (!res.ok) {
    throw Error(res.statusText);
  }

  return res;
}
