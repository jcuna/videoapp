var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'public/js');
var APP_DIR = path.resolve(__dirname, 'app/resources');

var config = {
    entry: APP_DIR + '/js/app.jsx',
    output: {
        path: BUILD_DIR,
        filename: 'app.js'
    },

    module : {
        loaders : [
            {
                test : /\.jsx?/,
                include : APP_DIR + '/js',
                loader : 'babel-loader'
            }
        ]
    }
};

module.exports = config;