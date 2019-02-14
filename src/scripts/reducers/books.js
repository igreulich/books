import { createAction, handleActions } from 'redux-actions';

export const updateBooks = createAction('UPDATE_BOOKS');
export const setBooks = createAction('SET_BOOKS');
export const setBookId = createAction('SET_BOOK_ID');

const initialState = {
  books: [],
  bookId: null,
};

export const reducer = handleActions(
  {
    [updateBooks]: (state, action) => ({
      ...state,
      books: [...state.books, ...action.payload],
    }),
    [setBooks]: (state, action) => ({
      ...state,
      books: action.payload,
    }),
    [setBookId]: (state, action) => ({
      ...state,
      bookId: action.payload,
    }),
  },
  initialState,
);

export const fetchBooks = () => (dispatch) => {
  fetch('https://my-json-server.typicode.com/igreulich/mock/books')
    .then(handleErrors) // eslint-disable-line no-use-before-define
    .then(res => res.json())
    .then(json => dispatch(setBooks(json)));
};

// Apparently fetch doesn't handle errors?
function handleErrors(res) {
  if (!res.ok) {
    throw Error(res.statusText);
  }

  return res;
}
