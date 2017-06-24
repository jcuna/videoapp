/**
 * Created by Jon on 6/22/17.
 */

import {Link} from 'react-router-dom';
import api from './utils/api'
import Store from './stores/store';
import Event from './utils/Event.jsx'

require('../css/header.scss');

export default class Header extends React.Component {
    constructor(props) {
        super(props);
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
                isLoggedIn: resp[0].data === true,
                user: {}//TODO fetch user
            });
            Event.emit("gotFormats", resp[1].data);
            Store.isLoggedIn = resp[0].data === true;
            Store.movieFormats = resp[1].data;
        }, err => {
            console.error(err);
        })
    }
    componentWillUnmount() {
        this.loginAction.removeListener("userDidLogIn", this.userDidLogIn);
        this.loginAction.removeListener("userDidLogOut", this.userDidLogOut);
    }
    render () {
        let isLoggedIn = this.state.isLoggedIn;
        return (
            <header id="header" className="container">
                <div className="inner">
                    <Link to="/" className="logo">Home</Link>
                    <nav id="nav">
                        {isLoggedIn &&
                            <Link to="/new-movie">Add movie</Link>
                        }
                        <Link to="/find-movie">Find movies</Link>
                        <Link to="/catalog">Catalog</Link>
                        <span>|</span>
                        <Link to={isLoggedIn ? "/logout": "/login"}>{isLoggedIn ? "logout": "login"}</Link>
                    </nav>
                    <Link to="#navPanel" className="navPanelToggle"><span className="fa fa-bars"></span></Link>
                </div>
                <section id="banner">
                    <h1>Movie Manager by Jon Garcia</h1>
                    <p>A simple exercise for now...</p>
                </section>
            </header>
        );
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
}