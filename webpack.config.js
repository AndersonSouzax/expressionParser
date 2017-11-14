const path = require('path');

module.exports = {
    entry: './src/javascript/terminal.js',
    output: {
        filename: './src/javascript/main.js',
    },
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            query:{
                presets : ['es2015']
            }
        }]
    }
}
