import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  Container,
  Header,
  Table,
} from 'semantic-ui-react';

import Book from './Book';

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

    return books.map(book => <Book book={book} />);
  };

  render() {
    return (
      <Container text>
        <Header as="h1">The Grey Library</Header>
        <Table color="green">
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Title</Table.HeaderCell>
              <Table.HeaderCell>Author</Table.HeaderCell>
              <Table.HeaderCell>Series</Table.HeaderCell>
              <Table.HeaderCell>Number</Table.HeaderCell>
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
