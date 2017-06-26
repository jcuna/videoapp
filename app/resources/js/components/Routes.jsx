/**
 * Created by Jon on 6/22/17.
 */

import { Route, Switch} from 'react-router-dom'
import Home from './Home.jsx'
import ErrorPage from './ErrorPage.jsx';
import Login from './session/Login.jsx'
import Logout from './session/Logout.jsx'
import NewMovie from './movie/NewMovie.jsx';
import MovieEdit from './movie/MovieEdit.jsx';
import Movie from './movie/Movie.jsx';
import Catalog from './movie/Catalog.jsx';
import RequiresLogin from './session/RequiresLogin.jsx';

export default class Routes extends React.Component {
    render() {
        return (
            <Route render={(props) => (
                <div className="content-area container">
                    <Switch>
                        <Route exact path="/" component={Home}/>
                        <Route path="/login" render={() => <Login session={this.props.session} history={props.history}/>}/>
                        <Route exact path="/movie/:id" render={(newProps)=><Movie {...this.props.session} {...newProps} />}/>
                        <Route path="/catalog" render={() => <Catalog session={this.props.session}/>}/>
                        <RequiresLogin {...this.props.session} {...props}>
                            <Route exact path="/logout" component={Logout}/>
                            <Route exact path="/new-movie" render={(newProps) => <NewMovie {...newProps} {...this.props.session} />}/>
                            <Route exact path="/movie/:id/edit" render={(newProps) => <MovieEdit {...newProps} {...this.props.session} />}/>
                        </RequiresLogin>
                        <Route component={ErrorPage}/>
                    </Switch>
                </div>
            )} />
        )
    }
}