import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  Container,
  Icon,
  Item,
} from 'semantic-ui-react';
import UpdateBookModalContainer from '../containers/UpdateBookModalContainer';

export default class BookDetail extends Component {
  static propTypes = {
    book: PropTypes.object, // eslint-disable-line react/forbid-prop-types
    fetchBook: PropTypes.func,
    match: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  };

  static defaultProps = {
    book: {},
    fetchBook: () => {},
  };

  componentDidMount() {
    const { fetchBook, match } = this.props;

    fetchBook(match.params.id);
  }

  renderMetadata = () => {
    const { book } = this.props;

    return (
      <Item.Meta>
        <span>{book.series}</span>
        <span>{`#${book.number}`}</span>
      </Item.Meta>
    );
  }

  render() {
    const { book, match } = this.props;

    return (
      <Item.Group as={Container} className="book-detail-container" text>
        <Item>
          <Icon name="book" size="big" color="grey" bordered inverted />
          <Item.Content>
            <Item.Header>{book.title}</Item.Header>
            {(book.series || book.number) && this.renderMetadata()}
            <Item.Extra>
              <UpdateBookModalContainer bookId={match.params.id} />
            </Item.Extra>
          </Item.Content>
        </Item>
      </Item.Group>
    );
  }
}
