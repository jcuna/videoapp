/**
 * Created by Jon on 6/23/17.
 */

import api from '../utils/api';
import ReactStars from 'react-stars';
import Store from '../stores/store';
import {Link} from 'react-router-dom';


export default class Catalog extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            movies: [],
        };
        this.sortBy = this.sortBy.bind(this);
    }

    componentWillMount() {
        api('/api/v1/all-movies?sortBy=mid', "get").then(resp => {
            this.setState({
                movies: resp.data
            });

        }, err => {
            console.error(err);
        });
    }

    render() {
        return (
            <table className="table">
                <thead>
                <tr>
                    <th data="mid" onClick={this.sortBy} className="sortable">#</th>
                    <th data="title" onClick={this.sortBy} className="sortable">Title</th>
                    <th data="format" onClick={this.sortBy} className="sortable">Format</th>
                    <th data="length" onClick={this.sortBy} className="sortable">Length</th>
                    <th data="rating" onClick={this.sortBy} className="sortable">Rating</th>
                    {Store.isLoggedIn && <th>Edit</th>}
                </tr>
                </thead>
                <tbody>
                    {this.getTds()}
                </tbody>
            </table>
        );
    }

    sortBy(e) {
        let column = e.currentTarget.getAttribute("data");
        api(`/api/v1/all-movies?sortBy=${column}`, "get").then(resp => {
            this.setState({
                movies: resp.data
            });
        }, err => {
            console.error(err);
        });
    }

    getTds() {
        return this.state.movies.map((m, k) =>
            <tr key={k}>
                <th scope="row">{k+1}</th>
                <td><Link to={`/movie/${m.mid}`}>{m.title}</Link></td>
                <td>{m.format}</td>
                <td>{this.getFormattedTime(m.length)}</td>
                <td><ReactStars value={m.rating} size={24} edit={false} count={5} /></td>
                {Store.isLoggedIn && <th><Link to={`/movie/${m.mid}/edit`}><i className="fa fa-pencil"></i></Link></th>}
            </tr>
        );
    }

    getFormattedTime(time) {
        let hours = Math.floor( time / 60);
        let minutes = time % 60;
        let h = hours > 1 ? "hours" : "hour";
        let m = minutes > 1 ? ` & ${minutes} minutes` : minutes > 0 ? ` ${minutes} minute` : "";
        return hours < 1 ? `${minutes} minutes` : `${hours} ${h} ${m}`;
    }
}