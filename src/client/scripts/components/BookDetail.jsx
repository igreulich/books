import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  Container,
  Icon,
  Item,
  Label,
} from 'semantic-ui-react';

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
      <Item.Extra>
        <Label color="green" basic>{book.series}</Label>
        <Label color="green" basic>
          <Icon name="hashtag" fitted />
          {book.number}
        </Label>
      </Item.Extra>
    );
  }

  render() {
    const { book } = this.props;

    return (
      <Item.Group as={Container} text>
        <Item>
          <Icon name="book" size="big" color="green" bordered inverted />
          <Item.Content>
            <Item.Header>{book.title}</Item.Header>
            {(book.series || book.number) && this.renderMetadata()}
          </Item.Content>
        </Item>
      </Item.Group>
    );
  }
}
