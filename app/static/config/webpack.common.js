const path = require('path');
const Dotenv = require('dotenv-webpack');
const MomentLocalesPlugin = require('moment-locales-webpack-plugin');

module.exports = {
    context: __dirname,
    entry: '../javascripts/main',
    resolve: {
        alias: {
            querystring: "querystring-es3",
            url: "url"
        }
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                }
            }
        ],
    },
    plugins: [
        new Dotenv({
            path: path.resolve('config/.env')
        }),
        new MomentLocalesPlugin({
            localesToKeep: ['hu', 'en', 'de', 'fr', 'es']
        }),
    ]
};