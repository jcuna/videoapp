/**
 * Created by Jon on 6/25/17.
 */

export default class RequiresLogin extends React.Component {

    constructor(props) {
        super(props);

        this.currentPath = this.props.location.pathname

    }

    componentWillReceiveProps(next) {
        if (! next.isLoggedIn) {
            this.redirect();
        }
    }

    render() {
        let isLoggedIn = this.props.isLoggedIn;
        if (isLoggedIn) {
            return<div>{this.props.children}</div>
        } else {
            return null
        }
    }

    redirect() {
        this.props.history.push("/login");
    }
}

RequiresLogin.prototype.currentPath = "";