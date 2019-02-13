import { connect } from 'react-redux';

import { fetchBooks } from '../reducers/books';

import Books from '../components/Books';

const mapStateToProps = state => ({
  books: state.books.books,
});

const mapDispatchToProps = dispatch => ({
  fetchBooks: () => dispatch(fetchBooks()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Books);
