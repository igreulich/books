import React, { Component } from 'react';
import PropTypes from 'prop-types';
import isEqual from 'lodash.isequal';

import {
  Button,
  Form,
  Header,
  Icon,
  Modal,
} from 'semantic-ui-react';

export default class UpdateBookModal extends Component {
  static propTypes = {
    book: PropTypes.object, // eslint-disable-line react/forbid-prop-types
    bookId: PropTypes.string.isRequired, // eslint-disable-line react/forbid-prop-types
    handleUpdateBook: PropTypes.func.isRequired,
  };

  static defaultProps = {
    book: {},
  };

  state = {
    title: '',
    author: '',
    series: '',
    number: '',
    modalOpen: false,
  };

  componentDidUpdate(prevProps) {
    const prevBook = prevProps.book;
    const { book } = this.props;

    if (!isEqual(prevBook, book)) {
      this.setState({
        title: book.title,
        author: '',
        series: book.series,
        number: book.number,
      });
    }
  }

  handleOpen = () => this.setState({ modalOpen: true });

  handleClose = () => this.setState({ modalOpen: false });

  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  handleSubmit = () => {
    const { bookId, handleUpdateBook } = this.props;
    const { title, author, series, number } = this.state;

    handleUpdateBook(bookId, title, series, number);
    this.handleClose();
  };

  render() {
    const { title, author, series, modalOpen, number } = this.state;

    return (
      <Modal
        trigger={(
          <Button
            onClick={this.handleOpen}
            floated="right"
            primary
            icon
          >
            <Icon name="edit" />
          </Button>
        )}
        open={modalOpen}
        onClose={this.handleClose}
        centered={false}
        basic
        closeIcon
      >
        <Header content="Edit Book" />
        <Modal.Content>
          <Form inverted onSubmit={this.handleSubmit}>
            <Form.Group widths="equal">
              <Form.Input placeholder="Title" name="title" label="Title" value={title || ''} onChange={this.handleChange} />
              <Form.Input placeholder="Author" name="author" label="Author" value={author || ''} onChange={this.handleChange} />
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Input placeholder="Series" name="series" label="Series" value={series || ''} onChange={this.handleChange} />
              <Form.Input placeholder="Number" name="number" label="Number" value={number || ''} onChange={this.handleChange} />
            </Form.Group>
            <Form.Button basic color="green" content="Save" floated="right" />
          </Form>
        </Modal.Content>
      </Modal>
    );
  }
}
