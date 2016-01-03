webpackJsonp([1],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };
	
	var React = _interopRequire(__webpack_require__(1));
	
	var render = __webpack_require__(168).render;
	
	var ReactFireMixin = _interopRequire(__webpack_require__(202));
	
	var Nav = _interopRequire(__webpack_require__(206));
	
	var BookList = _interopRequire(__webpack_require__(204));
	
	var NewBookForm = _interopRequire(__webpack_require__(207));
	
	var App = React.createClass({
	  displayName: "App",
	
	  mixins: [ReactFireMixin],
	
	  getInitialState: function getInitialState() {
	    return {
	      uid: "",
	      ref: new Firebase("https://gobooks.firebaseio.com/items/"),
	      books: [],
	      query: "",
	      searchBooks: [],
	      errorMessage: ""
	    };
	  },
	
	  componentWillMount: function componentWillMount() {
	    this.bindAsArray(this.state.ref, "books");
	    this.bindAsArray(this.state.ref, "searchBooks");
	  },
	
	  componentWillUnmount: function componentWillUnmount() {
	    this.unbind("books");
	  },
	
	  render: function render() {
	    return React.createElement(
	      "div",
	      null,
	      React.createElement(Nav, { user: this.state.uid, query: this.state.query, onLogin: this.login, onLogout: this.logout, onSearch: this.search }),
	      React.createElement(BookList, { user: this.state.uid, books: this.state.books, onEdit: this.edit, onUpdate: this.update, onDestroy: this.destroy, onAsecSort: this.asecSort, onDescSort: this.descSort }),
	      React.createElement(NewBookForm, { user: this.state.uid, onSubmit: this.submit })
	    );
	  },
	
	  login: function login() {
	    var _this = this;
	
	    var ref = this.state.ref;
	
	    ref.authWithOAuthPopup("github", function (error, authData) {
	      if (error) {
	        console.log("Login Failed! ", error);
	      } else {
	        _this.setState({
	          uid: authData.uid
	        });
	      }
	    });
	  },
	
	  logout: function logout() {
	    var ref = this.state.ref;
	
	    ref.unauth();
	
	    this.setState({
	      uid: ""
	    });
	  },
	
	  search: function search(query) {
	    var books = this.state.searchBooks;
	    var results = [];
	
	    books.forEach(function (book) {
	      if (book.name.toLowerCase().indexOf(query.toLowerCase()) !== -1) {
	        results.push(book);
	      }
	    });
	
	    this.setState({
	      query: query,
	      books: results
	    });
	  },
	
	  edit: function edit(book) {
	    var books = this.state.books;
	
	    var editIndex = books.indexOf(book);
	
	    books[editIndex].isEditing = true;
	
	    this._updateItems(books);
	  },
	
	  update: function update(book) {
	    var books = this.state.books;
	
	    var originalBook = books.filter(function (element) {
	      return element.id === book.id;
	    });
	
	    originalBook = originalBook[0];
	
	    var editIndex = books.indexOf(originalBook);
	
	    book.isEditing = false;
	
	    books[editIndex] = book;
	
	    this._updateItems(books);
	  },
	
	  destroy: function destroy(book) {
	    var books = this.state.books;
	
	    var newBooks = books.filter(function (element) {
	      return element.id !== book.id;
	    });
	
	    this._updateItems(newBooks);
	  },
	
	  submit: function submit(book) {
	    this.state.ref.push({
	      id: Date.now(),
	      name: book.name,
	      author: book.author
	    });
	  },
	
	  asecSort: function asecSort() {
	    var books = this.state.books;
	
	    var comparator = function (a, b) {
	      var sort = 0;
	
	      if (a.name < b.name) {
	        sort = -1;
	      }
	      if (a.name > b.name) {
	        sort = 1;
	      }
	
	      return sort;
	    };
	
	    this.setState({
	      books: books.sort(comparator)
	    });
	  },
	
	  descSort: function descSort() {
	    var books = this.state.books;
	
	    var comparator = function (a, b) {
	      var sort = 0;
	
	      if (a.name < b.name) {
	        sort = 1;
	      }
	      if (a.name > b.name) {
	        sort = -1;
	      }
	
	      return sort;
	    };
	
	    this.setState({
	      books: books.sort(comparator)
	    });
	  },
	
	  _updateItems: function _updateItems(books) {
	    var ref = this.state.ref;
	
	    ref.set(books);
	
	    this.setState({
	      searchItems: books
	    });
	  }
	});
	
	render(React.createElement(App, null), document.getElementById("app"));

/***/ },

/***/ 203:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };
	
	var React = _interopRequire(__webpack_require__(1));
	
	module.exports = React.createClass({
	  displayName: "BookItem",
	
	  render: function render() {
	    var spanStyles = {
	      display: this.props.user ? "" : "none"
	    };
	
	    return React.createElement(
	      "tr",
	      null,
	      React.createElement(
	        "td",
	        null,
	        this.props.book.name,
	        " ",
	        React.createElement(
	          "span",
	          { className: "pull-right", style: spanStyles },
	          React.createElement(
	            "a",
	            { href: "#", onClick: this.edit },
	            "edit"
	          ),
	          " | ",
	          React.createElement(
	            "a",
	            { href: "#", onClick: this.destroy },
	            "delete"
	          )
	        )
	      ),
	      React.createElement(
	        "td",
	        null,
	        this.props.book.author
	      )
	    );
	  },
	
	  edit: function edit(event) {
	    event.preventDefault();
	
	    this.props.onEdit();
	  },
	
	  destroy: function destroy(event) {
	    event.preventDefault();
	
	    this.props.onDestroy();
	  }
	});

/***/ },

/***/ 204:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };
	
	var React = _interopRequire(__webpack_require__(1));
	
	var BookItem = _interopRequire(__webpack_require__(203));
	
	var EditItem = _interopRequire(__webpack_require__(205));
	
	var _reactBootstrap = __webpack_require__(43);
	
	var Grid = _reactBootstrap.Grid;
	var Row = _reactBootstrap.Row;
	module.exports = React.createClass({
	  displayName: "BookList",
	
	  getInitialState: function getInitialState() {
	    return {
	      selectedBook: ""
	    };
	  },
	
	  render: function render() {
	    var _this = this;
	
	    var bookAction = function (book) {
	      if (book.isEditing) {
	        return React.createElement(EditItem, { key: book.id, book: book, onUpdate: _this.props.onUpdate });
	      } else {
	        return React.createElement(BookItem, { key: book.id, book: book, user: _this.props.user, onEdit: function () {
	            return _this.props.onEdit(book);
	          }, onDestroy: function () {
	            return _this.props.onDestroy(book);
	          } });
	      }
	    };
	
	    return React.createElement(
	      "section",
	      { className: "players" },
	      React.createElement(
	        Grid,
	        null,
	        React.createElement(
	          "div",
	          { className: "email-wrapper" },
	          React.createElement(
	            "h3",
	            { className: "pull-left" },
	            "Greulich's Books"
	          ),
	          React.createElement(
	            "h4",
	            { className: "pull-right" },
	            "Total: ",
	            this.props.books.length
	          ),
	          React.createElement("div", { className: "clearfix" })
	        ),
	        React.createElement(
	          Row,
	          { className: "table-wrapper" },
	          React.createElement(
	            "table",
	            { className: "table table-striped" },
	            React.createElement(
	              "thead",
	              null,
	              React.createElement(
	                "tr",
	                null,
	                React.createElement(
	                  "th",
	                  { className: "table-name" },
	                  "Book ",
	                  React.createElement(
	                    "span",
	                    { className: "pull-right" },
	                    React.createElement(
	                      "a",
	                      { href: "#", onClick: this.props.onAsecSort },
	                      React.createElement("span", { className: "glyphicon glyphicon-chevron-up" })
	                    ),
	                    React.createElement(
	                      "a",
	                      { href: "#", onClick: this.props.onDescSort },
	                      React.createElement("span", { className: "glyphicon glyphicon-chevron-down", "aria-hidden": "true" })
	                    )
	                  )
	                ),
	                React.createElement(
	                  "th",
	                  { className: "table-position" },
	                  "Author"
	                )
	              )
	            ),
	            React.createElement(
	              "tbody",
	              null,
	              this.props.books.map(bookAction)
	            )
	          )
	        )
	      )
	    );
	  }
	});

/***/ },

/***/ 205:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };
	
	var React = _interopRequire(__webpack_require__(1));
	
	var Input = __webpack_require__(43).Input;
	
	module.exports = React.createClass({
	  displayName: "EditBookForm",
	
	  getInitialState: function getInitialState() {
	    return {
	      id: this.props.book.id,
	      name: this.props.book.name,
	      author: this.props.book.author
	    };
	  },
	
	  render: function render() {
	    return React.createElement(
	      "tr",
	      null,
	      React.createElement(
	        "td",
	        null,
	        React.createElement(Input, { type: "text", ref: "bookName", value: this.state.name, onChange: this.onNameChange }),
	        React.createElement(
	          "span",
	          { className: "pull-right" },
	          React.createElement(
	            "a",
	            { href: "#", onClick: this.update },
	            "save"
	          )
	        )
	      ),
	      React.createElement(
	        "td",
	        null,
	        React.createElement(Input, { type: "text", ref: "bookAuthor", value: this.state.author, onChange: this.onAuthorChange })
	      )
	    );
	  },
	
	  onNameChange: function onNameChange(event) {
	    this.setState({ name: event.target.value });
	  },
	
	  onAuthorChange: function onAuthorChange(event) {
	    this.setState({ author: event.target.value });
	  },
	
	  update: function update(event) {
	    event.preventDefault();
	
	    this.props.onUpdate(this.state);
	  }
	});

/***/ },

/***/ 206:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };
	
	var React = _interopRequire(__webpack_require__(1));
	
	var _reactBootstrap = __webpack_require__(43);
	
	var Grid = _reactBootstrap.Grid;
	var Row = _reactBootstrap.Row;
	var Col = _reactBootstrap.Col;
	module.exports = React.createClass({
	  displayName: "Nav",
	
	  render: function render() {
	    var authLink;
	    var liStyles = {
	      visibility: "hidden"
	    };
	
	    if (this.props.user) {
	      authLink = React.createElement(
	        "li",
	        null,
	        React.createElement(
	          "a",
	          { href: "#", onClick: this.logout },
	          "Sign Out"
	        )
	      );
	    } else {
	      authLink = React.createElement(
	        "li",
	        null,
	        React.createElement(
	          "a",
	          { href: "#", onClick: this.login },
	          "Sign In"
	        )
	      );
	    }
	
	    return React.createElement(
	      "header",
	      { className: "header" },
	      React.createElement(
	        Grid,
	        null,
	        React.createElement(
	          Row,
	          null,
	          React.createElement(
	            Col,
	            { md: 6 },
	            React.createElement(
	              "div",
	              { className: "logo-white" },
	              React.createElement("img", { src: "images/logo-white.png" }),
	              React.createElement(
	                "h3",
	                null,
	                "BOOKS"
	              )
	            )
	          ),
	          React.createElement(
	            Col,
	            { md: 6, className: "nav-wrapper" },
	            React.createElement(
	              "nav",
	              { className: "navbar navbar-inverse navbar-static-top", role: "navigation" },
	              React.createElement(
	                "div",
	                { className: "navbar-header" },
	                React.createElement(
	                  "button",
	                  { type: "button", className: "navbar-toggle collapsed", "data-toggle": "collapse", "data-target": "#bs-example-navbar-collapse-1" },
	                  React.createElement(
	                    "span",
	                    { className: "sr-only" },
	                    "Toggle navigation"
	                  ),
	                  React.createElement("span", { className: "icon-bar" }),
	                  React.createElement("span", { className: "icon-bar" }),
	                  React.createElement("span", { className: "icon-bar" })
	                )
	              ),
	              React.createElement(
	                "div",
	                { className: "collapse navbar-collapse", id: "bs-example-navbar-collapse-1" },
	                React.createElement(
	                  "ul",
	                  { className: "nav navbar-nav" },
	                  React.createElement(
	                    "li",
	                    { style: liStyles },
	                    React.createElement(
	                      "a",
	                      { href: "#" },
	                      "Profile"
	                    )
	                  ),
	                  authLink
	                ),
	                React.createElement(
	                  "form",
	                  null,
	                  React.createElement("input", { type: "text", name: "search", ref: "search", placeholder: "Search", value: this.props.query, onChange: this.search }),
	                  React.createElement("input", { type: "image", src: "images/icon-search.png", alt: "Submit" })
	                )
	              )
	            )
	          )
	        )
	      )
	    );
	  },
	
	  login: function login() {
	    this.props.onLogin();
	  },
	
	  logout: function logout() {
	    this.props.onLogout();
	  },
	
	  search: function search() {
	    var query = this.refs.search.getDOMNode().value;
	
	    this.props.onSearch(query);
	  }
	});

/***/ },

/***/ 207:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };
	
	var React = _interopRequire(__webpack_require__(1));
	
	var _reactBootstrap = __webpack_require__(43);
	
	var Grid = _reactBootstrap.Grid;
	var Row = _reactBootstrap.Row;
	var Col = _reactBootstrap.Col;
	var Input = _reactBootstrap.Input;
	var Button = _reactBootstrap.Button;
	module.exports = React.createClass({
	  displayName: "NewBookForm",
	
	  getInitialState: function getInitialState() {
	    return {
	      name: "",
	      author: ""
	    };
	  },
	
	  render: function render() {
	    var showForm = this.props.user ? true : false;
	    var formStyles = {
	      display: showForm ? "" : "none"
	    };
	
	    return React.createElement(
	      "section",
	      { style: formStyles, className: "content" },
	      React.createElement(
	        Grid,
	        null,
	        React.createElement(
	          "form",
	          { onSubmit: this.submit },
	          React.createElement(
	            Input,
	            { label: "New Book", wrapperClassName: "wrapper" },
	            React.createElement(
	              Row,
	              null,
	              React.createElement(
	                Col,
	                { xs: 6 },
	                React.createElement(Input, { type: "text", ref: "bookName", placeholder: "Enter book", onChange: this.onNameChange, value: this.state.name })
	              ),
	              React.createElement(
	                Col,
	                { xs: 6 },
	                React.createElement(Input, { type: "text", ref: "bookAuthor", placeholder: "Enter author", onChange: this.onAuthorChange, value: this.state.author })
	              )
	            )
	          ),
	          React.createElement(
	            Button,
	            { className: "pull-right btn-link", type: "submit" },
	            "Save"
	          )
	        )
	      )
	    );
	  },
	
	  submit: function submit(event) {
	    event.preventDefault();
	
	    this.props.onSubmit(this.state);
	
	    this.setState({
	      name: "",
	      author: ""
	    });
	  },
	
	  onNameChange: function onNameChange(event) {
	    this.setState({ name: event.target.value });
	  },
	
	  onAuthorChange: function onAuthorChange(event) {
	    this.setState({ author: event.target.value });
	  }
	
	});

/***/ }

});
//# sourceMappingURL=app.js.map