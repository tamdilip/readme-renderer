const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

const env = process.env.NODE_ENV;

module.exports = {
    entry: './index.js',

    mode: env,

    output: {
        path: path.resolve(__dirname, 'demo'),
        filename: '[name].bundle.js',
        publicPath: '/'
    },

    devServer: {
        contentBase: path.join(__dirname, 'public'),
        compress: true,
        port: 3500,
        hot: true,
    },

    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    env == 'development' ? 'style-loader' : MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    'sass-loader',
                ]
            }
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: 'index.html',
            favicon: 'favicon.png'
        }),
        new webpack.HotModuleReplacementPlugin(),
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css"
        }),
        new webpack.ProvidePlugin({
            $: 'jquery'
        })
    ]
};
