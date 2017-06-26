/**
 * Created by Jon on 6/24/17.
 */

import api from './utils/api'
import Event from './utils/Event.jsx'
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import Routes from './Routes.jsx';
import { BrowserRouter } from 'react-router-dom';

require('../css/app.scss');

export default class Layout extends React.Component {
    constructor() {
        super();
        this.state = {
            isLoggedIn: false,
            user: {}
        };
        this.userDidLogIn = this.userDidLogIn.bind(this);
        this.userDidLogOut = this.userDidLogOut.bind(this);
    }

    componentDidMount() {
        Event.addListener("userDidLogIn", this.userDidLogIn);
        Event.addListener("userDidLogOut", this.userDidLogOut);
    }

    componentWillMount() {
        const promises = [
            api("/api/v1/is-logged-in", "get"),
            api("/api/v1/movie-formats", "get")
        ];

        Promise.all(promises).then(resp => {
            this.setState({
                formats: resp[1].data,
                isLoggedIn: resp[0].data.email !== undefined,
                user: resp[0].data
            });
        }, err => {
            console.error(err);
        })
    }
    componentWillUnmount() {
        this.loginAction.removeListener("userDidLogIn", this.userDidLogIn);
        this.loginAction.removeListener("userDidLogOut", this.userDidLogOut);
    }


    userDidLogIn(user) {
        this.setState({
            isLoggedIn: true,
            user: user
        });
    }
    userDidLogOut() {
        this.setState({
            isLoggedIn: false,
            user: {}
        });
    }

    render() {
        return (
            <div>
                <BrowserRouter>
                    <div>
                        <Header {...this.state}/>
                        <Routes session={this.state}/>
                        <Footer/>
                    </div>
                </BrowserRouter>
            </div>
        )
    }
}