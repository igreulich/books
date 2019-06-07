import { connect } from 'react-redux';

import { fetchAuthors } from '../reducers/authors';

import Authors from '../components/Authors';

const mapStateToProps = state => ({
  authors: state.authors.authors,
});

const mapDispatchToProps = dispatch => ({
  fetchAuthors: () => dispatch(fetchAuthors()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Authors);
