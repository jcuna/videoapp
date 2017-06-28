/**
 * Created by Jon on 6/27/17.
 */

import api from '../utils/api';

class GApi {

    get url() {
        return "https://www.googleapis.com/youtube/v3"
    }

    get googleApiKey() {
        return "AIzaSyCfgEto6gVpQU4F9DrkaVf-5YjnvfpSPaA";
    }

    buildApiUrl(query, limit) {
        return `${this.url}/search?key=${this.googleApiKey}&part=snippet&q=${query}&maxResults=${limit}&order=relevance&category=trailers`
    }

    search(query, limit = 4) {
        return api(this.buildApiUrl(query, limit), "get");
    }

}
const GoogleApi = new GApi();
export default GoogleApi;