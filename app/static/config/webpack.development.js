const path = require('path');
const {merge} = require('webpack-merge');
const common = require('./webpack.common.js');
const WebpackBuildNotifierPlugin = require('webpack-build-notifier');
const shell = require('shelljs');

module.exports = merge(common, {
    output: {
        path: path.resolve('./javascripts/bundle/'),
        filename: "bundle.js"
    },
    devtool: 'eval',
    plugins: [
        new WebpackBuildNotifierPlugin({
            title: "ANLI Breeders",
            onComplete: () => {
                shell.exec('play -n synth 0.1 sine 500 vol 0.1');
            }
        })
    ]
});