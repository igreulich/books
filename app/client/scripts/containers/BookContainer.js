import { connect } from 'react-redux';

import { deleteBook } from '../reducers/books';

import Book from '../components/Book';

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
  deleteBook: id => dispatch(deleteBook(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Book);
