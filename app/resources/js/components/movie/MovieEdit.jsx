/**
 * Created by Jon on 6/22/17.
 */

import FormGenerator from '../utils/FormGenerator.jsx';
import Store from '../stores/store';
import Event from '../utils/Event.jsx';
import api from '../utils/api';
import Notifications from '../utils/Notifications.jsx';
import ReactStars from 'react-stars'


export default class NewMovie extends React.Component {

    constructor(props) {
        super(props);
        let options = Store.movieFormats.map(obj => obj.name);
        options.push("Select Format");

        this.state = {
            formats: options,
            selected: "Select Format",
            rating: 0,
            title: "",
            length: 0,
            release: 1999

        };

        this.validate = this.validate.bind(this);
        this.gotFormats = this.gotFormats.bind(this);
        this.ratingChanged = this.ratingChanged.bind(this);
    }

    gotFormats(formats) {
        let options = formats.map(obj => obj.name);
        options.push("Select Format");
        this.setState({formats: options});
    }

    componentWillMount()
    {
        api(`/api/v1/get-movie/${this.props.match.params.id}`, "get").then(resp => {
            this.setState({
                formats: this.state.formats,
                selected: resp.data.format,
                rating: resp.data.rating,
                title: resp.data.title,
                length: resp.data.length,
                release: resp.data.release

            });
        }, err => {
            console.error(err);
        })
    }

    componentDidMount() {
        Event.addListener("gotFormats", this.gotFormats)
    }

    componentWillUnmount() {
        Event.removeListener("gotFormats", this.gotFormats)
    }

    render() {
        if (this.state.notifications !== undefined) {
            return (
                <div>
                    <Notifications type="error" messages={this.state.notifications}/>
                    <FormGenerator props={this.getFormProps()}/>
                </div>
            )
        } else {
            return <FormGenerator props={this.getFormProps()}/>
        }
    }

    getFormProps() {
        const options = this.state.formats;
        let vals = this.state;
        return {
            elements: [
                {type: 'text', placeholder: 'Title', onChange: this.validate, value: vals.title},
                {type: 'select', placeholder: 'Format', onChange: this.validate, formElement: "select", value: this.state.selected, options: options},
                {type: 'number', placeholder: 'Length', onChange: this.validate, value: vals.length},
                {type: 'number', placeholder: 'Release year', onChange: this.validate, value: vals.release},
                <ReactStars value={this.state.rating} key={100} size={24} onChange={this.ratingChanged} count={5} />
            ],
            formName: 'edit-movie',
            buttonValue: 'Update',
            callback: this.handleClick.bind(this),
            object: this
        }
    }

    ratingChanged(val) {
        this.setState({
            formats: this.state.formats,
            selected: this.state.selected,
            rating: val,
            notifications: this.state.notifications,
            title: this.state.title,
            length: this.state.length,
            release: this.state.release
        });
    }

    handleClick(e) {
        e.preventDefault();
        let format = this.refs.format.value;
        if (format === "Select Format") {
            format = ""
        }

        const data = {
            mid: this.props.match.params.id,
            title: this.refs.title.value,
            format: format,
            length: this.refs.length.value,
            release_year: this.refs.release_year.value,
            rating: this.state.rating
        };

        api(`api/v1/update-movie/${this.props.match.params.id}`, "post", data).then(resp => {
            this.props.history.push(`/movie/${resp.data.mid}`);
        }, err => {
            this.setState({
                formats: this.state.formats,
                selected: this.state.selected,
                rating: this.state.selected.rating,
                notifications: err.data,
                title: this.state.title,
                length: this.state.length,
                release: this.state.release
            });
        });
    }

    validate(e) {
        if (e.currentTarget.type === "select-one") {
            this.setState({
                formats: this.state.formats,
                notifications: this.state.notifications,
                selected: e.currentTarget.value,
                rating: this.state.rating
            });
        }
    }
}