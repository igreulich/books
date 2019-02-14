import { connect } from 'react-redux';

import { setBookId } from '../reducers/books';

import BookDetail from '../components/BookDetail';

const chooseBook = (books, id) => books.find(book => book.id === id);

const mapStateToProps = state => ({
  selectedBook: chooseBook(state.books.books, state.books.bookId),
});

const mapDispatchToProps = dispatch => ({
  setBookId: id => dispatch(setBookId(id)),
});


export default connect(mapStateToProps, mapDispatchToProps)(BookDetail);
