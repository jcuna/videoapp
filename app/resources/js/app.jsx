import React from 'react';
import {render} from 'react-dom';

class App extends React.Component {
    render () {
        return <h1>Soon Video Manager App!</h1>;
    }
}

render(<App/>, document.querySelector('#app'));