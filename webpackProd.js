const path = require('path');
const AssetsPlugin = require('assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const webpack = require('webpack');

const server = {
    mode: 'production',
    devtool: 'source-map',
    node: {
        __dirname: false,
    },
    target: 'node',
    entry: {
        server: './src/server/server.ts',
    },
    output: {
        path: path.resolve(__dirname, './build'),
        filename: 'server.js',
        libraryTarget: 'commonjs',
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: [
                    {
                        loader: 'ts-loader',
                        options: {
                            transpileOnly: true,
                        },
                    },
                ],
                include: [
                    path.resolve(__dirname, './src'),
                ],
            },
            {
                test: /\.(png|jpg|gif|svg|ico)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            publicPath: '/assets/images',
                            outputPath: './public/images',
                        },
                    },
                ],
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
    },
    externals: [
        /^\.\/assets\.json$/,
        nodeExternals({ whitelist: /\.(css|less|scss|sss)$/i }),
    ],
    plugins: [
        new webpack.BannerPlugin({
            banner: 'require("source-map-support").install();',
            raw: true,
            entryOnly: false,
        }),
    ],
};

const client = {
    mode: 'development',
    devtool: 'source-map',
    entry: {
        client: ['babel-polyfill', './src/client/index.tsx'],
    },
    output: {
        path: path.resolve(__dirname, './build/public/js'),
        filename: 'app.js',
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: [
                    'babel-loader',
                    {
                        loader: 'ts-loader',
                        options: {
                            transpileOnly: true,
                        },
                    },
                ],
                include: [
                    path.resolve(__dirname, './src'),
                ],
            },
            {
                test: /\.css$/,
                use: [
                    { loader: 'style-loader' },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                        },
                    },
                    'postcss-loader',
                ],
                include: [
                    path.resolve(__dirname, './src/client'),
                ],
            },
            {
                test: /\.css$/,
                use: [
                    { loader: 'style-loader' },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: false,
                        },
                    },
                    'postcss-loader',
                ],
                include: [
                    path.resolve(__dirname, './node_modules'),
                ],
            },
            {
                test: /\.(png|jpg|gif|svg|ico)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            publicPath: '/assets/images',
                            outputPath: '../images',
                        },
                    },
                ],
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production'),
        }),
    ],
    optimization: {
        minimizer: [new TerserPlugin()],
    }
};

module.exports = [
    server,
    client,
];
