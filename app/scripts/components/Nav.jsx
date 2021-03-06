import React from 'react';

import { Grid, Row, Col } from 'react-bootstrap';

export default React.createClass({
  displayName: 'Nav',

  render() {
    var authLink;
    var liStyles = {
      visibility: 'hidden'
    }

    if (this.props.user) {
      authLink = <li><a href="#" onClick={this.logout}>Sign Out</a></li>
    } else {
      authLink = <li><a href="#" onClick={this.login}>Sign In</a></li>
    }

    return (
      <header className="header">
        <Grid>
          <Row>
            <Col md={6}>
              <div className="logo-white">
                <img src="images/logo-white.png" />
                <h3>BOOKS</h3>
              </div>
            </Col>
            <Col md={6} className="nav-wrapper">
              <nav className="navbar navbar-inverse navbar-static-top" role="navigation">
                <div className="navbar-header">
                  <button type="button" className="navbar-toggle collapsed" onTouchStart={this.toggeNav} onClick={this.toggleNav}>
                    <span className="sr-only">Toggle navigation</span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                  </button>
                </div>
                <div className="collapse navbar-collapse" id="mobile-nav">
                  <ul className="nav navbar-nav">
                    <li style={liStyles}><a href="#">Profile</a></li>
                    {authLink}
                  </ul>
                  <form>
                    <input type="text" name="search" ref="search" placeholder="Search" value={this.props.query} onChange={this.search} />

                    <input type="image" src="images/icon-search.png" alt="Submit" />
                  </form>
                </div>
              </nav>
            </Col>
          </Row>
        </Grid>
      </header>
    );
  },

  login() {
    this.props.onLogin();
  },

  logout() {
    this.props.onLogout();
  },

  search() {
    var query = this.refs.search.getDOMNode().value;

    this.props.onSearch(query);
  },

  toggleNav() {
    const $el = document.getElementById('mobile-nav');

    $el.classList.toggle('in');
  }
});
