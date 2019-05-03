import { connect } from 'react-redux';

import { createBook } from '../reducers/books';

import UpsertBookModalContainer from '../components/modals/UpsertBookModal';

const mapStateToProps = state => ({
  book: state.books.book,
});

const mapDispatchToProps = dispatch => ({
  handleUpsertBook: (_, title, series, number) => dispatch(createBook(title, series, number)), // eslint-disable-line object-curly-newline
});

export default connect(mapStateToProps, mapDispatchToProps)(UpsertBookModalContainer);
