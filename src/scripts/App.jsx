import React from 'react';
import { hot } from 'react-hot-loader';

import '@babel/polyfill';
import 'airbnb-browser-shims';

import '../styles/app.less';

const App = () => <div>Hello World</div>;

export default hot(module)(App);
