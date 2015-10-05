'use strict';

var Nav          = require('./Nav')
var BookList     = require('./BookList');
var NewBookForm  = require('./NewBookForm');

var BookApp = React.createClass({
  mixins: [ReactFireMixin],

  getInitialState() {
    return {
      uid:          '',
      ref:          new Firebase('https://gobooks.firebaseio.com/items/'),
      books:        [],
      query:        '',
      searchBooks:  [],
      errorMessage: ''
    }
  },

  componentWillMount() {
    this.bindAsArray(this.state.ref, 'books');
    this.bindAsArray(this.state.ref, 'searchBooks');
  },

  componentWillUnmount() {
    this.unbind('books');
  },

  render() {
    return (
      <div>
        <Nav user={this.state.uid} query={this.state.query} onLogin={this.login} onLogout={this.logout} onSearch={this.search} />
        <BookList user={this.state.uid} books={this.state.books} onEdit={this.edit} onUpdate={this.update} onDestroy={this.destroy} onAsecSort={this.asecSort} onDescSort={this.descSort} />
        <NewBookForm user={this.state.uid} onSubmit={this.submit} />
      </div>
    );
  },

  login() {
    var ref = this.state.ref;

    ref.authWithOAuthPopup('github', (error, authData) => {
      if (error) {
        console.log('Login Failed! ', error);
      } else {
        this.setState({
          uid: authData.uid
        });
      }
    });
  },

  logout() {
    var ref = this.state.ref;

    ref.unauth();

    this.setState({
      uid: ''
    });
  },

  search(query) {
    var books   = this.state.searchBooks;
    var results = [];

    books.forEach(book => {
      if (book.name.toLowerCase().indexOf(query.toLowerCase()) !== -1) {
        results.push(book);
      }
    });

    this.setState({
      query: query,
      books: results
    });
  },

  edit(book) {
    var books = this.state.books;

    var editIndex = book.indexOf(book);

    books[editIndex].isEditing = true;

    this._updateItems(books);
  },

  update(book) {
    var books = this.state.book;

    var originalBook = books.filter(element => {
      return element.id === book.id;
    });

    originalBook = originalBook[0];

    var editIndex = books.indexOf(originalBook);

    book.isEditing = false;

    books[editIndex] = book;

    this._updateItems(books);
  },

  destroy(book) {
    var books = this.state.books;

    var newBooks = books.filter(element => {
      return element.id !== book.id
    });

    this._updateItems(newBooks);
  },

  submit(book) {
    this.state.ref.push({
      id:        Date.now(),
      name:      book.name,
      coop:      book.coop,
      link:      book.link,
      players:   book.players,
      expansion: book.expansion
    });
  },

  asecSort() {
    var books = this.state.books;

    var comparator = (a, b) => {
      var sort = 0;

      if (a.name < b.name) {
        sort = -1;
      }
      if (a.name > b.name) {
        sort = 1;
      }

      return sort
    };

    this.setState({
      books: books.sort(comparator)
    });
  },

  descSort() {
    var books = this.state.books;

    var comparator = (a, b) => {
      var sort = 0;

      if (a.name < b.name) {
        sort = 1;
      }
      if (a.name > b.name) {
        sort = -1;
      }

      return sort
    };

    this.setState({
      books: books.sort(comparator)
    });
  },

  _updateItems(books) {
    var ref   = this.state.ref;

    ref.set(books);

    this.setState({
      searchItems: books
    });
  }
});

React.render(<App />, document.getElementById('app'));
