const path = require('path')
const webpack = require('webpack')
const { VueLoaderPlugin } = require('vue-loader')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')
const WebpackPwaManifest = require('webpack-pwa-manifest')


module.exports = {
    mode: 'development',
    devServer: {
        hot: true,
        watchOptions: {
            poll: true
        }
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            },
            {
                test: /\.vue$/,
                use: 'vue-loader'
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                  MiniCssExtractPlugin.loader,
                  'css-loader',
                  'sass-loader',
                ],
            },
            {
                test: /\.(gif|png|jpe?g|svg)$/i,
                use: [
                    'file-loader',
                    {
                        loader: 'image-webpack-loader',
                        query: {
                            mozjpeg: {
                            progressive: true,
                            },
                            gifsicle: {
                            interlaced: false,
                            },
                            optipng: {
                            optimizationLevel: 4,
                            },
                            pngquant: {
                            quality: '75-90',
                            speed: 3,
                            }
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new FaviconsWebpackPlugin('./src/favicon.png'),
        new webpack.HotModuleReplacementPlugin(),
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css'
        }),
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            inject: true
        }),
        new WebpackPwaManifest({
            name: 'Pawel Czarniecki',
            short_name: 'pawcza',
            description: 'Front-end Developer',
            orientation: 'portrait',
            start_url: '.',
            display: 'fullscreen',
            background_color: '#ffffff',
            ios: true,
            theme_color: '#373737',
            crossorigin: 'use-credentials',
            icons: [
                {
                    src: path.resolve('src/favicon.png'),
                    sizes: [96, 128, 192, 256, 384, 512] // multiple sizes
                }
            ]
        })
    ]
};