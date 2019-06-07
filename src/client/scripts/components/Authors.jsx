import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  Container,
  Header,
  Table,
} from 'semantic-ui-react';
import InsertAuthorModalContainer from '../containers/InsertAuthorModalContainer';

import AuthorContainer from '../containers/AuthorContainer';

export default class Authors extends Component {
  static propTypes = {
    authors: PropTypes.arrayOf(PropTypes.object).isRequired,
    fetchAuthors: PropTypes.func.isRequired,
  };

  static defaultProps = {};

  componentDidMount() {
    const { fetchAuthors } = this.props;

    fetchAuthors();
  }

  renderAuthors = () => {
    const { authors } = this.props;

    return authors.map(author => <AuthorContainer key={author.id} author={author} />);
  };

  render() {
    return (
      <Container text className="author-list">
        <Header as="h1" floated="left">The Grey Library</Header>
        <Container textAlign="right" className="author-list-add">
          <InsertAuthorModalContainer color="grey" icon="plus" />
        </Container>
        <Table color="green">
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Number of Books</Table.HeaderCell>
              <Table.HeaderCell>&nbsp;</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {this.renderAuthors()}
          </Table.Body>
        </Table>
      </Container>
    );
  }
}
