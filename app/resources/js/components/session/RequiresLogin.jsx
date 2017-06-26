/**
 * Created by Jon on 6/25/17.
 */

export default class RequiresLogin extends React.Component {
    componentDidMount() {
        if (! this.props.isLoggedIn) {
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