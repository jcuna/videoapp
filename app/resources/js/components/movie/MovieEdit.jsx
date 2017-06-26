/**
 * Created by Jon on 6/22/17.
 */

import FormGenerator from '../utils/FormGenerator.jsx';
import api from '../utils/api';
import Notifications from '../utils/Notifications.jsx';
import ReactStars from 'react-stars'


export default class NewMovie extends React.Component {

    constructor(props) {
        super(props);

        let options = this.props.formats.map(val => val.name);
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
        this.ratingChanged = this.ratingChanged.bind(this);
        this.deleteComponent= this.deleteComponent.bind(this);
    }

    // componentWillReceiveProps(next) {
    //     let options = next.props.formats;
    //     options.push("Select Format");
    //     updateState({formats: options}, this);
    // }

    componentWillMount()
    {
        api(`/api/v1/get-movie/${this.props.match.params.id}`, "get").then(resp => {
            updateState({
                selected: resp.data.format,
                rating: resp.data.rating,
                title: resp.data.title,
                length: resp.data.length,
                release: resp.data.release

            }, this);
        }, err => {
            console.error(err);
        })
    }

    render() {
        if (this.state.notifications !== undefined) {
            return (
                <div>
                    <Notifications type="error" messages={this.state.notifications}/>
                    {this.getFormComponent()}
                </div>
            )
        } else {
            return this.getFormComponent()
        }
    }

    getFormComponent() {
        return (
            <div>
                <FormGenerator props={this.getFormProps()}/>
                <button style={{float: "right"}} className="btn, btn-danger btn-small" onClick={this.deleteComponent}>Delete movie</button>
            </div>
        )
    }

    getFormProps() {
        const options = this.state.formats;
        let vals = this.state;
        return {
            elements: [
                {name: "title", type: 'text', placeholder: 'Title', onChange: this.validate, value: vals.title},
                {name: "format", type: 'select', placeholder: 'Format', onChange: this.validate, formElement: "select", value: this.state.selected, options: options},
                {name: "length", type: 'number', placeholder: 'Length', onChange: this.validate, value: vals.length},
                {name: "release", type: 'number', placeholder: 'Release year', onChange: this.validate, value: vals.release},
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
            updateState({notifications: err.data}, this);
        });
    }

    validate(e) {
        const name = e.currentTarget.name;
        this.setState({
            [name]: e.currentTarget.value
        });
    }

    deleteComponent() {
        api(`/api/v1/delete-movie/${this.props.match.params.id}`, "post").then(resp => {
            this.props.history.push("/catalog");
        }, err => {
            updateState({notifications: err.data}, err);
        })
    }
}