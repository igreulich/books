import { createAction, handleActions } from 'redux-actions';

export const setBooks = createAction('SET_BOOKS');
export const setBook = createAction('SET_BOOK');
export const updateBooksData = createAction('UPDATE_BOOKS_DATA');

const API_URL = process.env.API_URL; // eslint-disable-line prefer-destructuring
const API_PORT = process.env.API_PORT; // eslint-disable-line prefer-destructuring
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
    [updateBooksData]: (state, action) => {
      const idx = state.books.findIndex(book => book.id === action.payload.id);
      const books = state.books.splice();

      books.splice(idx, 1, action.payload);

      return {
        ...state,
        books,
      };
    },
  },
  initialState,
);

export const fetchBooks = () => (dispatch) => {
  fetch(`//${API_URL}:${API_PORT}/graphql?query={books{id title series number}}`)
    .then(handleErrors) // eslint-disable-line no-use-before-define
    .then(res => res.json())
    .then(json => dispatch(setBooks(json.data.books)));
};

export const fetchBook = id => (dispatch) => {
  fetch(`//${API_URL}:${API_PORT}/graphql?query={book(id: ${id}){title series number}}`)
    .then(handleErrors) // eslint-disable-line no-use-before-define
    .then(res => res.json())
    .then(json => dispatch(setBook(json.data.book)));
};

export const updateBook = (id, title, series, number) => (dispatch) => { // eslint-disable-line object-curly-newline
  fetch(`//${API_URL}:${API_PORT}/graphql`, {
    method: 'POST',
    body: JSON.stringify({
      query: `mutation { updateBook(id:"${id}", title:"${title}", series:"${series}", number:${number}) { id title series number }}`,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(handleErrors) // eslint-disable-line no-use-before-define
    .then(res => res.json())
    .then((json) => {
      dispatch(setBook(json.data.updateBook));
      dispatch(updateBooksData(json.data.updateBook));
    });
};

// Apparently fetch doesn't handle errors?
function handleErrors(res) {
  if (!res.ok) {
    throw Error(res.statusText);
  }

  return res;
}
