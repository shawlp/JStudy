/**
 * @file entry file
 * @author shaw
 */

import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Link, Switch} from 'react-router-dom';
import AppContainer from './app';
import createStore from './store';
import {Provider, connect} from 'react-redux';

// setTimeout(() => {
const store = createStore(window.initListData);
ReactDOM.hydrate(<BrowserRouter>
		<Provider store={store}>
			<AppContainer />
		</Provider>
	</BrowserRouter>,
	document.getElementById('app')
);
// }, 5000);