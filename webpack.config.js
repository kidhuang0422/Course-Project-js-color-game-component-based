const path = require('path');
const webpack = require('webpack');
const { NoEmitOnErrorsPlugin } = require('webpack');

module.exports = {
    mode: "none",
    context: path.resolve(__dirname, './src'),
    entry: ['@babel/polyfill', './main.js'],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: [/node_modules/],
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                [
                                    '@babel/preset-env', {
                                        modules: false
                                    }
                                ]
                            ]
                        }
                    }
                ]
            }, {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    }
};
