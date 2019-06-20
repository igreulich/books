import { connect } from 'react-redux';

import { deleteAuthor } from '../reducers/authors';

import Author from '../components/Author';

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
  deleteAuthor: id => dispatch(deleteAuthor(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Author);
