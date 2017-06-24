/**
 * Created by jgarcia on 10/7/16.
 */
// let fetchJsonp = require('fetch-jsonp');
// let urlEncode = require('query-string');
/**
 *
 * @param url
 * @param method
 * @param data
 * @param jsonp
 * @returns {Promise}
 */
const api = function(url, method, data, jsonp) {
    'use strict';

    let crossDomain = url.indexOf('http') === 0;
    method = method === undefined ? 'POST' : method;

    if (url.indexOf('/') !== 0 && !crossDomain) {
        url = '/'+url;
    }

    if (jsonp !== undefined && jsonp) {
        return jsonpFetch(url, data);
    } else {
        return normalFetch(url, method, data, crossDomain);
    }
};

/**
 *
 * @param url
 * @param method
 * @param data
 * @param crossDomain
 * @returns {Promise}
 */
const normalFetch = function(url, method, data, crossDomain) {
    'use strict';

    const request = {
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "same-origin",
        method: method,
        body: JSON.stringify(data),
    };

    return new Promise(function(resolve, reject) {
        return fetch(url, request).then(response => {
            const contentType = response.headers.get("content-type");
            if (contentType && contentType.indexOf("application/json") !== -1) {
                return response.json().then(data => {
                    if (data.redirect !== undefined) {
                        window.location = data.redirect;
                    } else if (data.status < 300 || crossDomain) {
                        resolve(data);
                    } else {
                        reject(data);
                    }
                }, (error) => {
                    reject(error);
                });
            }
        }, (error) => {
            reject(error);
        });
    });
};

/**
 *
 * @param url
 * @param data
 * @returns {*}
 */
const jsonpFetch = function (url, data) {
    let queryString = urlEncode.stringify(data);
    url = url+'?'+queryString;
    return fetchJsonp(url).then( response => {
        return response.json()
    });
};

module.exports = api;
