import { connect } from 'react-redux';

import { fetchAuthors } from '../reducers/authors';

import AuthorDetail from '../components/AuthorDetail';

const mapStateToProps = state => ({
  author: state.authors.author,
});

const mapDispatchToProps = dispatch => ({
  fetchAuthor: id => dispatch(fetchAuthors(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AuthorDetail);
