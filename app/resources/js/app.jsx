/**
 * Created by Jon on 6/22/17.
 *
 * This file bootstraps react and all dependencies to the app tree
 */

const ReactDOM = require('react-dom');

require('babel-polyfill');
require('whatwg-fetch');
require('./css/app.scss');

import { BrowserRouter } from 'react-router-dom';
import Routes from './Routes.jsx'

class Bootstrap {

    constructor() {
        ReactDOM.render(
            <BrowserRouter>
                <Routes/>
            </BrowserRouter>,
            document.querySelector('#app')
        );
    }
}

new Bootstrap();