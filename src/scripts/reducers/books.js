import { createAction, handleActions } from 'redux-actions';

export const setBooks = createAction('SET_BOOKS');
export const setBook = createAction('SET_BOOK');

const initialState = {
  books: [],
  book: {},
};

export const reducer = handleActions(
  {
    [setBooks]: (state, action) => ({
      ...state,
      books: action.payload,
    }),
    [setBook]: (state, action) => ({
      ...state,
      book: action.payload,
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

export const fetchBook = id => (dispatch) => {
  fetch(`https://my-json-server.typicode.com/igreulich/mock/books/${id}`)
    .then(handleErrors) // eslint-disable-line no-use-before-define
    .then(res => res.json())
    .then(json => dispatch(setBook(json)));
};

// Apparently fetch doesn't handle errors?
function handleErrors(res) {
  if (!res.ok) {
    throw Error(res.statusText);
  }

  return res;
}
