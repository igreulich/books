import React, { Component } from 'react';
import { hot } from 'react-hot-loader';

import {
  Icon,
  Menu,
  Segment,
  Sidebar,
} from 'semantic-ui-react';

import BooksContainer from './containers/BooksContainer';

import Head from './components/Head';
import Foot from './components/Foot';

import '@babel/polyfill';
import 'airbnb-browser-shims';

import '../styles/app.less';

class App extends Component {
  state = { visible: false }

  handleHideClick = () => this.setState({ visible: false });

  render() {
    const { visible } = this.state;

    return (
      <>
        <Head handleOpen={this.handleShowClick} />
        <Sidebar.Pushable as={Segment} className="app-container">
          <Sidebar
            as={Menu}
            animation="overlay"
            icon="labeled"
            onHide={this.handleSidebarHide}
            vertical
            visible={visible}
            width="thin"
          >
            <Menu.Item as="a">
              <Icon name="book" />
              Collection
            </Menu.Item>
            <Menu.Item as="a">
              <Icon name="user" />
              Authors
            </Menu.Item>
            <Menu.Item as="a">
              <Icon name="ordered list" />
              Series
            </Menu.Item>
          </Sidebar>

          <Sidebar.Pusher>
            <BooksContainer />
          </Sidebar.Pusher>
        </Sidebar.Pushable>
        <Foot />
      </>
    );
  }
}

export default hot(module)(App);
