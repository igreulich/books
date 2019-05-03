import { connect } from 'react-redux';

import { fetchBook } from '../reducers/books';

import BookDetail from '../components/BookDetail';

const mapStateToProps = state => ({
  book: state.books.book,
});

const mapDispatchToProps = dispatch => ({
  fetchBook: id => dispatch(fetchBook(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BookDetail);
