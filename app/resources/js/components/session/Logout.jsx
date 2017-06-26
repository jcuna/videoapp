/**
 * Created by Jon on 6/22/17.
 */

import Spinner from '../utils/Spinner.jsx'
import api from '../utils/api';
import Event from '../utils/Event.jsx'

export default class Logout extends React.Component {

    componentWillMount() {
        api('api/v1/api-logout', 'put').then(resp => {
            Event.emit("userDidLogOut");
            this.props.history.push("/");
        }, err => {
            console.error(err);
        })
    }

    render() {
        return <Spinner/>
    }

}