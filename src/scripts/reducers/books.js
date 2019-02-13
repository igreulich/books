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

export const fetchBooks = () => (dispatch) => {
  fetch('https://my-json-server.typicode.com/igreulich/mock/books')
    .then(handleErrors) // eslint-disable-line no-use-before-define
    .then(res => res.json())
    .then(json => dispatch(updateBooks(json)));
};

// Apparently fetch doesn't handle errors?
function handleErrors(res) {
  if (!res.ok) {
    throw Error(res.statusText);
  }

  return res;
}
