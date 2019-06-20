import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  Button,
  Icon,
  Table,
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';

export default class Author extends Component {
  static propTypes = {
    author: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string.isRequired,
    }).isRequired,
    deleteAuthor: PropTypes.func,
  };

  static defaultProps = {
    deleteAuthor: () => {},
  };

  handleDeleteAuthor = () => {
    const { author, deleteAuthor } = this.props;

    deleteAuthor(author.id);
  };

  render() {
    const { author } = this.props;

    return (
      <Table.Row>
        <Table.Cell><Link to={`/author/${author.id}`}>{author.name}</Link></Table.Cell>
        <Table.Cell>{' '}</Table.Cell>
        <Table.Cell>
          <Button.Group size="tiny">
            <Button basic icon color="red" onClick={this.handleDeleteAuthor}><Icon name="minus" /></Button>
          </Button.Group>
        </Table.Cell>
      </Table.Row>
    );
  }
}
