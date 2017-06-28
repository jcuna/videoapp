/**
 * Created by Jon on 6/23/17.
 */

import Spinner from '../utils/Spinner.jsx';
import api from '../utils/api';
import ReactStars from 'react-stars'
import {Link} from 'react-router-dom';
import GoogleApi from '../utils/GoogleApi';

require("../../css/movie/movie.scss");

export default class Movie extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            component: <Spinner/>,
            isLoggedIn: this.props.isLoggedIn,
            data: {},
            trailers: []
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
                    {this.state.trailers.length > 0 && (
                        <div className="youtube-trailers">
                            <h3>Watch most popular trailers</h3>
                            <ul>{this.state.trailers.map((videoId, i) =>
                                <li className="youtube-video" key={i}>
                                    <iframe width="420" height="220" src={`https://www.youtube.com/embed/${videoId}`} frameBorder="0" allowFullScreen></iframe>
                                </li>
                            )}</ul>
                        </div>
                    )}
                </div>
            )
        }
    }

    componentWillMount() {
        api(`/api/v1/get-movie/${this.props.match.params.id}`, "get").then(resp => {
            updateState({data: resp.data}, this);
            this.searchMovieTrailer(resp.data.title);
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


    searchMovieTrailer(title) {
        GoogleApi.search(`${title} movie trailer`).then(resp => {
            let trailers = resp.items.map(item => item.id.videoId);
            this.setState({trailers: trailers})
        }, err => {
            console.erro(err);
        })
    }

}