'use strict'

const{ Input } = require('react-bootstrap');

module.exports = React.createClass({
  displayName: 'EditBookForm',

  getInitialState() {
    return {
      id:   this.props.book.id,
      name: this.props.book.name,
    }
  },

  render() {
    return (
      <tr>
        <td>
          <Input type='text' ref="bookName" value={this.state.name} onChange={this.onNameChange} />
          <span className="pull-right"><a href="#" onClick={this.update}>save</a></span>
        </td>
      </tr>
    );
  },

  onNameChange(event) {
    this.setState({name: event.target.value})
  },

  update(event) {
    event.preventDefault();

    this.props.onUpdate(this.state);
  }
});
