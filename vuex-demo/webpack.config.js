const webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const fs = require('fs');

module.exports = {
    mode: 'development',
    entry: __dirname + '/src/index.js',
    output: {
        path: __dirname + '/dist/',
        filename: 'index.js'
    },
    module: {  
        rules: [
            {
                test: /\.vue$/,
                use: 'vue-loader'
            },
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: [
                            ['@babel/plugin-proposal-decorators', {legacy: true}],
                            ['babel-plugin-transform-imports', {preventFullImport: false}]
                        ]
                    }
                }
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: 'vue-style-loader'
                    },
                    {
                        loader: 'css-loader'
                    }
                ]
            }
        ]
    },   
    plugins: [
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './template/index.html',
            hash: true,
            minify: {
                removeEmptyAttributes: true
            }
        })
    ],
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        host: 'localhost',
        port: 9000,
        disableHostCheck: true
    }
}