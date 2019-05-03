import { createAction, handleActions } from 'redux-actions';

import handleErrors from '../utils/handleFetchErrors';

export const setAuthors = createAction('SET_AUTHORS');
export const setAuthor = createAction('SET_AUTHOR');
export const updateAuthorsData = createAction('UPDATE_AUTHORS_DATA');

const API_URL = process.env.API_URL; // eslint-disable-line prefer-destructuring
const API_PORT = process.env.API_PORT; // eslint-disable-line prefer-destructuring
const initialState = {
  authors: [],
  author: {},
};

export const reducer = handleActions(
  {
    [setAuthors]: (state, action) => ({
      ...state,
      authors: action.payload,
    }),
  },
  initialState,
);

export const fetchAuthors = () => (dispatch) => {
  fetch(`//${API_URL}:${API_PORT}/graphql?query={authors{id title series number}}`)
    .then(handleErrors) // eslint-disable-line no-use-before-define
    .then(res => res.json())
    .then(json => dispatch(setAuthors(json.data.authors)));
};
