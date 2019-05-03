import { connect } from 'react-redux';

import { fetchAuthors } from '../reducers/authors';

import Authors from '../components/Authors';

const mapStateToProps = state => ({
  books: state.authors.authorss,
});

const mapDispatchToProps = dispatch => ({
  fetchBooks: () => dispatch(fetchAuthors()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Authors);
