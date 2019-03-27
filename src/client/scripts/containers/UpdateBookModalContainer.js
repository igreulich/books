import { connect } from 'react-redux';

import { updateBook } from '../reducers/books';

import UpdateBookModalContainer from '../components/modals/UpdateBookModal';

const mapStateToProps = state => ({
  book: state.books.book,
});

const mapDispatchToProps = dispatch => ({
  handleUpdateBook: (id, title, series, number) => dispatch(updateBook(id, title, series, number)), // eslint-disable-line object-curly-newline
});

export default connect(mapStateToProps, mapDispatchToProps)(UpdateBookModalContainer);
