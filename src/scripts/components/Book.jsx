import React from 'react';
import PropTypes from 'prop-types';

import { Table } from 'semantic-ui-react';

const Book = (props) => {
  console.log(props);

  const { book } = props;

  return (
    <Table.Row>
      <Table.Cell>{book.title}</Table.Cell>
      <Table.Cell>{book.author}</Table.Cell>
      <Table.Cell>{!!book.series && book.series}</Table.Cell>
      <Table.Cell>{!!book.number && book.number}</Table.Cell>
    </Table.Row>
  );
};

Book.propTypes = {
  book: PropTypes.shape({
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    series: PropTypes.string,
    number: PropTypes.number,
  }).isRequired,
};

Book.defaultProps = {};

export default Book;
