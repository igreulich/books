import { connect } from 'react-redux';

import { fetchBooks } from '../reducers/books';

import Body from '../components/Body';

const mapStateToProps = state => ({
  users: state.users,
});

const mapDispatchToProps = dispatch => ({
  fetchBooks: () => dispatch(fetchBooks()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Body);
