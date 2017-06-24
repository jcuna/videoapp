/**
 * Created by Jon on 6/22/17.
 */

import api from './utils/api';
import Spinner from './utils/Spinner.jsx';
import ReactStars from 'react-stars';
import {Link} from 'react-router-dom';

export default class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {movies: []};
    }

    render() {
        return (
            <div className="home-movies">
                <h3>Recent Movies</h3>
                {this.state.movies.length === 0 && <Spinner/>}
                {this.state.movies.length > 0 && this.getMovies()}
            </div>
        )
    }

    getMovies() {
        return (
                this.state.movies.map((m, k) =>
                <div key={k} className="recent-movies">
                    <span>{m.title}</span>
                    <span><ReactStars value={m.rating} size={24} edit={false} count={5} /></span>
                    <Link to={`/movie/${m.mid}`} className="btn btn-info btn-sm">Read more</Link>
                </div>
            )
        )
    }

    componentWillMount() {
        api('/api/v1/all-movies?sortBy=created_at&limit=8', "get").then(resp => {
            this.setState({
                movies: resp.data
            });

        }, err => {
            console.error(err);
        });
    }
}