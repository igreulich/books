import React from 'react';
import { hot } from 'react-hot-loader';

import Header from './components/Header';

import '@babel/polyfill';
import 'airbnb-browser-shims';

import '../styles/app.less';

const App = () => <Header />;

export default hot(module)(App);
