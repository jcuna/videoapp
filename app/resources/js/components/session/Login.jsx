/**
 * Created by Jon on 6/22/17.
 */

import FormGenerator from '../utils/FormGenerator.jsx';
import Notifications from '../utils/Notifications.jsx'
import FacebookLogin from 'react-facebook-login'
import Spinner from '../utils/Spinner.jsx';
import api from '../utils/api';
import Event from '../utils/Event.jsx'

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: <div></div>,
            renderObject: this.getForm()
        };
    }

    getFormProps() {
        return {
            elements: [
                {type: 'text', placeholder: 'Username', onChange: this.validateUsername},
                {type: 'password', placeholder: 'Password', onChange: this.validatePassword}
            ],
            formName: 'login-form',
            buttonValue: 'Login',
            callback: this.handleClick.bind(this),
            object: this
        }
    }

    handleClick(e) {
        e.preventDefault();
        let key = Date.now() / 1000 | 0;
        if (this.refs.username.value === '' || this.refs.password.value === '') {
            this.setState({
                messages: <Notifications
                    type="error"
                    messages="Username name and password cannot be blank"
                    key={key}/>,
                renderObject: this.getForm()
            })
        } else {
            this.setState({
                renderObject: <Spinner/>
            });
            this.attemptLogin();
        }
    };

    attemptLogin() {
        const data = {
            username: this.refs.username.value,
            password: this.refs.password.value
        };
        api('/api/v1/api-login', "post", data).then(resp => {
            Event.emit("userDidLogIn", resp.data);
            this.props.history.push("/");
        }, err => {
            this.setState({
                messages: <Notifications
                    type="error"
                    messages={err.data}/>,
                renderObject: this.getForm()
            })
        })
    }

    getForm() {
        return (
            <div>
                <FormGenerator props={this.getFormProps()}/>
            </div>
        )
    }

    render() {
        return (
            <div className="container">
                <div style={this.getFacebookStyles()}>
                    <FacebookLogin
                        appId="1088597931155576"
                        autoLoad={true}
                        fields="name,email,picture"
                        onClick={this.facebookLogin}
                        callback={this.facebookResponse}
                        size="small"
                        icon="fa-facebook"
                    />
                </div>
                <div className="well"><h2>Login</h2></div>
                {this.state.messages}
                {this.state.renderObject}
            </div>
        )
    }

    facebookLogin() {

    }

    facebookResponse() {

    }

    getFacebookStyles() {
        return {
            marginBottom: "10px",
            textAlign: "center"
        }
    }
}