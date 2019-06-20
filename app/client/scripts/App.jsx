import React, { Component, Fragment } from 'react';
import { hot } from 'react-hot-loader';

import {
  Icon,
  Menu,
  Segment,
  Sidebar,
} from 'semantic-ui-react';
import { Route, Link } from 'react-router-dom';

import Head from './components/Head';
import BooksContainer from './containers/BooksContainer';
import BookDetailContainer from './containers/BookDetailContainer';
import AuthorsContainer from './containers/AuthorsContainer';
import AuthorDetailContainer from './containers/AuthorDetailContainer';
import Foot from './components/Foot';

import '@babel/polyfill';
import 'airbnb-browser-shims';

import '../styles/app.less';

class App extends Component {
  state = { visible: false }

  handleToggleSidebar = () => {
    this.setState(state => ({ visible: !state.visible }));
  };

  render() {
    const { visible } = this.state;

    return (
      <Fragment>
        <Head handleToggleSidebar={this.handleToggleSidebar} />
        <Sidebar.Pushable as={Segment} className="app-container">
          <Sidebar
            as={Menu}
            animation="uncover"
            color="grey"
            direction="right"
            icon="labeled"
            inverted
            vertical
            visible={visible}
            width="thin"
          >
            <Menu.Item as={Link} to="/books">
              <Icon name="book" />
              Collection
            </Menu.Item>
            <Menu.Item as={Link} to="/authors">
              <Icon name="user" />
              Authors
            </Menu.Item>
            <Menu.Item as="a">
              <Icon name="ordered list" />
              Series
            </Menu.Item>
          </Sidebar>

          <Sidebar.Pusher>
            <Route path="/books" component={BooksContainer} />
            <Route path="/book/:id" component={BookDetailContainer} />
            <Route path="/authors" component={AuthorsContainer} />
            <Route path="/author/:id" component={AuthorDetailContainer} />
          </Sidebar.Pusher>
        </Sidebar.Pushable>
        <Foot />
      </Fragment>
    );
  }
}

export default hot(module)(App);
