'use strict'

module.exports = React.createClass({
  displayName: 'BookItem',

  render() {
    var spanStyles = {
      display: this.props.user ? '' : 'none'
    };

    return (
      <tr>
        <td>{this.props.book.name} <span className="pull-right" style={spanStyles}><a href='#' onClick={this.edit}>edit</a> | <a href='#' onClick={this.destroy}>delete</a></span></td>
        <td>{this.props.book.author}</td>
      </tr>
    );
  },

  edit(event) {
    event.preventDefault();

    this.props.onEdit();
  },

  destroy(event) {
    event.preventDefault();

    this.props.onDestroy();
  }
});
