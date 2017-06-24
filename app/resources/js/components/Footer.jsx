/**
 * Created by Jon on 6/22/17.
 */

require('../css/footer.scss');

export default class Footer extends React.Component {
    render () {
        return <section className="footer">
            <div className="inner container">
                <div className="container">
                    <p>Created by Jon Garcia</p>
                    <p><a href="mailto:garciajon@me.com">garciajon@me.com</a></p>
                </div>
            </div>
        </section>;
    }
}