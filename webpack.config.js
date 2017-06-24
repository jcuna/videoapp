var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
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
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract('css-loader!sass-loader' )
            }
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            React: 'react'
        }),
        new ExtractTextPlugin({
            filename: '../css/style.css',
            disable: false,
            allChunks: true
        })
    ]
};

module.exports = config;