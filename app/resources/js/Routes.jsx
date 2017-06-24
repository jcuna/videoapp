/**
 * Created by Jon on 6/22/17.
 */

import {Route, Switch} from 'react-router-dom'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import Home from './components/Home.jsx'
import ErrorPage from './components/ErrorPage.jsx';
import Login from './components/session/Login.jsx'
import Logout from './components/session/Logout.jsx'
import NewMovie from './components/movie/NewMovie.jsx';
import MovieEdit from './components/movie/MovieEdit.jsx';
import Movie from './components/movie/Movie.jsx';
import Catalog from './components/movie/Catalog.jsx';

export default class Routes extends React.Component {
    render() {
        return (
            <div>
                <Header/>
                <div className="content-area container">
                    <Switch>
                        <Route exact path="/" component={Home}/>
                        <Route path="/login" component={Login}/>
                        <Route path="/logout" component={Logout}/>
                        <Route path="/new-movie" component={NewMovie}/>
                        <Route exact path="/movie/:id" component={Movie}/>
                        <Route exact path="/movie/:id/edit" component={MovieEdit}/>
                        <Route path="/catalog/" component={Catalog}/>
                        <Route component={ErrorPage}/>
                    </Switch>
                </div>
                <Footer/>
            </div>
        )
    }
}