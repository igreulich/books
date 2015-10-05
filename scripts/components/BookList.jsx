'use strict';

var BookItem      = require('./BookItem');
var EditItem      = require('./EditItemForm');
const {
  Grid,
  Row
} = require('react-bootstrap');

module.exports = React.createClass({
  displayName: 'BookList',

  getInitialState() {
    return {
      selectedBook: ''
    };
  },

  render() {
    var bookAction = book => {
      if (book.isEditing) {
        return <EditItem key={book.id} book={book} onUpdate={this.props.onUpdate} />;
      } else {
        return <BookItem key={book.id} book={book} user={this.props.user} onEdit={() => this.props.onEdit(book)} onDestroy={() => this.props.onDestroy(book)} />;
      }
    };

    return (
      <section className='players'>
        <Grid>
          <div className='email-wrapper'>
            <h3 className='pull-left'>Greulich's Books</h3>
            <h4 className='pull-right'>Total: {this.props.books.length}</h4>
            <div className='clearfix'></div>
          </div>
          <Row className='table-wrapper'>
            <table className='table table-striped'>
              <thead>
                <tr>
                  <th className='table-name'>Book <span className='pull-right'><a href='#' onClick={this.props.onAsecSort}><span className='glyphicon glyphicon-chevron-up'></span></a><a href='#' onClick={this.props.onDescSort}><span className='glyphicon glyphicon-chevron-down' aria-hidden='true'></span></a></span></th>
                  <th className='table-position'>Author</th>
                </tr>
              </thead>
              <tbody>
                {this.props.books.map(bookAction)}
              </tbody>
            </table>
          </Row>
        </Grid>
      </section>
    );
  }
});
