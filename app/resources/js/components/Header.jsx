/**
 * Created by Jon on 6/22/17.
 */

import {Link} from 'react-router-dom';

require('../css/header.scss');

export default class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: this.props.isLoggedIn,
            user: this.props.user
        };
    }

    componentWillReceiveProps(next) {
        updateState({
            isLoggedIn: next.isLoggedIn,
            user: next.user
        }, this);
    }

    render () {
        let isLoggedIn = this.state.isLoggedIn;
        let name = this.state.user.fname;
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
                        <Link to={isLoggedIn ? "/logout": "/login"}>
                            <span>{isLoggedIn ? `${name}`: "login"}</span>
                            {isLoggedIn && <i className="user-logout fa fa-sign-out"></i>}
                        </Link>
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
}