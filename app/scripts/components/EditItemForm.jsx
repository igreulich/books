import React     from 'react';
import { Input } from 'react-bootstrap';

export default React.createClass({
  displayName: 'EditBookForm',

  getInitialState() {
    return {
      id:     this.props.book.id,
      name:   this.props.book.name,
      author: this.props.book.author
    }
  },

  render() {
    return (
      <tr>
        <td>
          <Input type='text' ref="bookName" value={this.state.name} onChange={this.onNameChange} />
          <span className="pull-right"><a href="#" onClick={this.update}>save</a></span>
        </td>
        <td>
          <Input type='text' ref="bookAuthor" value={this.state.author} onChange={this.onAuthorChange} />
        </td>
      </tr>
    );
  },

  onNameChange(event) {
    this.setState({name: event.target.value})
  },

  onAuthorChange(event) {
    this.setState({author: event.target.value})
  },

  update(event) {
    event.preventDefault();

    this.props.onUpdate(this.state);
  }
});
