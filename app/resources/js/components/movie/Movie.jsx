/**
 * Created by Jon on 6/23/17.
 */

import Spinner from '../utils/Spinner.jsx';
import api from '../utils/api';
import ReactStars from 'react-stars'
import {Link} from 'react-router-dom';

require("../../css/movie/movie.scss");

export default class Movie extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            component: <Spinner/>,
            isLoggedIn: this.props.isLoggedIn,
            data: {}
        }
    }

    render() {
        if (this.state.data.title === undefined) {
            return this.state.component
        } else {
            let data = this.state.data;
            return (
                <div>
                    {this.state.isLoggedIn &&
                    <span style={{fontSize: "24px"}}><Link className="movie-edit-link" to={`/movie/${data.mid}/edit`}><i className="fa fa-pencil"></i></Link></span>}
                    <div style={{textAlign: "center"}}>
                        <h2>{data.title}</h2>
                    </div>
                    <div className="holding-spans">
                        <div><span className="movie-label">Format</span><span className="movie-value">{data.format}</span></div>
                        <div><span className="movie-label">Length</span><span className="movie-value">{this.getFormattedTime(data.length)}</span></div>
                        <div><span className="movie-label">Release Year</span><span className="movie-value">{data.release}</span></div>
                        <div><span className="movie-label">Rating</span><span className="movie-value">
                            <ReactStars value={data.rating} size={24} edit={false} count={5} />
                        </span></div>
                    </div>
                </div>
            )
        }
    }

    componentWillMount() {
        api(`/api/v1/get-movie/${this.props.match.params.id}`, "get").then(resp => {
            updateState({data: resp.data}, this);
        }, err => {
            updateState({component: <div>Movie not found</div>}, this);
        });
    }

    componentWillReceiveProps(next) {
        updateState({isLoggedIn: next.isLoggedIn}, this);
    }

    getFormattedTime(time) {
        let hours = Math.floor( time / 60);
        let minutes = time % 60;
        let h = hours > 1 ? "hours" : "hour";
        let m = minutes > 1 ? ` & ${minutes} minutes` : minutes > 0 ? `& ${minutes} minute` : "";
        return hours < 1 ? `${minutes} minutes` : `${hours} ${h} ${m}`;
    }

}