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
        disableHostCheck: true,
        before: function (app, server) {
            app.get('/list', function (req, res) {
                const fileName = `./mock/list_${req.query.tab}.json`;
                const backupFileName = `./mock/list.json`;
                fs.exists(fileName, function (exists) {
                    fs.readFile(exists ? fileName : backupFileName, function (err, content) {
                        res.send(content);
                    });
                });
            });

            app.get('/price', function (req, res) {
                res.send(JSON.stringify({
                    infos: [
                        {
                            area: '北京',
                            price: 23 * Math.random()
                        },
                        {
                            area: '上海',
                            price: 23 * Math.random()
                        },
                        {
                            area: '深圳',
                            price: 23 * Math.random()
                        }
                    ]
                }));
            });

            app.post('/login', function (req, res) {
                // res.header('Set-Cookie', 'uid=yuanxin');
                res.setHeader('Set-Cookie', 'uid=yuanxin;');
                res.send(JSON.stringify({
                    res: 1
                }));
            });

            app.get('/log.gif', function (req, res) {
                res.setHeader('Content-Type', 'image/gif');
                res.send('');
            });

            app.get('/page/*', function (req, res) {
                res.setHeader('Content-Type', 'text/html;charset=utf-8');
                fs.readFile('./dist/index.html', function (err, content) {
                   res.send(content);
                });
            });            
        }
    }
}