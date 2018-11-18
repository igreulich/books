import { createAction, handleActions } from 'redux-actions';

export const getBooks = createAction('GET_BOOKS');
export const addBook = createAction('ADD_BOOK');
export const editBook = createAction('EDIT_BOOK');
export const removeBook = createAction('REMOVE_BOOK');

const initialState = {
  books: [],
};

export const reducer = handleActions(
  {
    [getBooks]: (state, action) => ({
      ...state,
      books: [...state.books, action.payload],
    }),
    [addBook]: (state, action) => ({
      ...state,
      books: [...state.books, action.payload],
    }),
  },
  initialState,
);
