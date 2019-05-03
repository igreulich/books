import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  Button,
  Icon,
  Table,
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';

export default class Book extends Component {
  static propTypes = {
    book: PropTypes.shape({
      title: PropTypes.string.isRequired,
      author: PropTypes.string,
      series: PropTypes.string,
      number: PropTypes.number,
    }).isRequired,
    deleteBook: PropTypes.func,
  };

  static defaultProps = {
    deleteBook: () => {},
  };

  handleDeleteBook = () => {
    const { book, deleteBook } = this.props;

    deleteBook(book.id);
  };

  render() {
    const { book } = this.props;

    return (
      <Table.Row>
        <Table.Cell><Link to={`/book/${book.id}`}>{book.title}</Link></Table.Cell>
        <Table.Cell>{book.author}</Table.Cell>
        <Table.Cell>{!!book.series && book.series}</Table.Cell>
        <Table.Cell>{!!book.number && book.number}</Table.Cell>
        <Table.Cell>
          <Button.Group size="tiny">
            <Button basic icon color="red" onClick={this.handleDeleteBook}><Icon name="minus" /></Button>
          </Button.Group>
        </Table.Cell>
      </Table.Row>
    );
  }
}
