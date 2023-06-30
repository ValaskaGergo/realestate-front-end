const path = require('path');
const {merge} = require('webpack-merge');
const common = require('./webpack.common.js');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = merge(common, {
    devtool: false,
    output: {
        path: path.resolve('./javascripts/bundle/'),
        filename: "bundle.js"
    },
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin({})],
    },
    plugins: []
});