import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  Container,
  Header,
  Table,
} from 'semantic-ui-react';
import InsertBookModalContainer from '../containers/InsertBookModalContainer';

import BookContainer from '../containers/BookContainer';

export default class Books extends Component {
  static propTypes = {
    books: PropTypes.arrayOf(PropTypes.object).isRequired,
    fetchBooks: PropTypes.func.isRequired,
  };

  static defaultProps = {};

  componentDidMount() {
    const { fetchBooks } = this.props;

    fetchBooks();
  }

  renderBooks = () => {
    const { books } = this.props;

    return books.map(book => <BookContainer key={book.id} book={book} />);
  };

  render() {
    return (
      <Container text className="book-list">
        <Header as="h1" floated="left">The Grey Library</Header>
        <Container textAlign="right" className="book-list-add">
          <InsertBookModalContainer color="grey" icon="plus" />
        </Container>
        <Table color="green">
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Title</Table.HeaderCell>
              <Table.HeaderCell>Author</Table.HeaderCell>
              <Table.HeaderCell>Series</Table.HeaderCell>
              <Table.HeaderCell>Number</Table.HeaderCell>
              <Table.HeaderCell>&nbsp;</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {this.renderBooks()}
          </Table.Body>
        </Table>
      </Container>
    );
  }
}
