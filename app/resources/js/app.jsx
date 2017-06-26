/**
 * Created by Jon on 6/22/17.
 *
 * This file bootstraps react and all dependencies to the app tree
 */

import updateState from './components/stores/State';

const ReactDOM = require('react-dom');

window.updateState = global.updateState = updateState;

require('babel-polyfill');
require('whatwg-fetch');

import Layout from './components/Layout.jsx'

class Bootstrap {

    constructor() {
        ReactDOM.render(<Layout/>, document.querySelector('#app'));
    }
}

new Bootstrap();