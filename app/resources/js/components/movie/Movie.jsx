/**
 * Created by Jon on 6/23/17.
 */

import Spinner from '../utils/Spinner.jsx';
import api from '../utils/api';
import ReactStars from 'react-stars'
import Store from '../stores/store';
import {Link} from 'react-router-dom';

require("../../css/movie/movie.scss");

export default class Movie extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            component: <Spinner/>
        }
    }

    render() {
        return this.state.component
    }

    componentWillMount() {
        api(`/api/v1/get-movie/${this.props.match.params.id}`, "get").then(resp => {
            this.setState({
                component: (
                    <div className="holding-spans">
                        {Store.isLoggedIn && <span><Link className="movie-edit-link" to={`/movie/${resp.data.mid}/edit`}><i className="fa fa-pencil"></i></Link></span>}
                        <div><span className="movie-label">Title</span><span className="movie-value">{resp.data.title}</span></div>
                        <div><span className="movie-label">Format</span><span className="movie-value">{resp.data.format}</span></div>
                        <div><span className="movie-label">Length</span><span className="movie-value">{this.getFormattedTime(resp.data.length)}</span></div>
                        <div><span className="movie-label">Release Year</span><span className="movie-value">{resp.data.release}</span></div>
                        <div><span className="movie-label">Rating</span><span className="movie-value">
                            <ReactStars value={resp.data.rating} size={24} edit={false} count={5} />
                        </span></div>
                    </div>
                )
            })

        }, err => {
            this.setState({
                component: <div>Movie not found</div>
            })
        });
    }

    getFormattedTime(time) {
        let hours = Math.floor( time / 60);
        let minutes = time % 60;
        let h = hours > 1 ? "hours" : "hour";
        let m = minutes > 1 ? ` & ${minutes} minutes` : minutes > 0 ? `& ${minutes} minute` : "";
        return hours < 1 ? `${minutes} minutes` : `${hours} ${h} ${m}`;
    }

}