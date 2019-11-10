const path = require('path');
const ExtractTextPlugin  = require('extract-text-webpack-plugin');

const paths = {
    DIST: path.resolve(__dirname, 'dist'),
    SRC: path.resolve(__dirname, 'src'),
    JS: path.resolve(__dirname, 'src/js'),
    SVG: path.resolve(__dirname, 'src/')
};


module.exports = {
    entry: path.join(paths.JS, 'scripts.js'),
    output: {
        path: paths.DIST,
        filename: 'app.bundle.js'
    },
    plugins: [],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: [
                    'babel-loader'
                ]
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    'file-loader'
                ]
            },
            {
                test: /\.svg$/,
                use: [
                    {
                        loader: 'svg-sprite-loader',
                        options: { extract: true }
                    },
                    'svgo-loader'
                ]
            },
            {
                test: /\.styl$/,
                loader: ExtractTextPlugin.extract({
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                importLoaders: 1,
                            }
                        },
                        {
                            loader: 'postcss-loader'
                        },
                        {
                            loader: 'stylus-loader',
                            options: {
                                stylus: {
                                    preferPathResolver: 'webpack'
                                }
                            }
                        }
                    ]
                })
            },

        ]
    },
    resolve: {
        extensions: ['.js', '.jsx', '.styl']
    }

}
