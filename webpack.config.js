// webpack.config.js
var webpack = require('webpack');
var path = require('path');

module.exports = {
    cache: true,
    entry: __dirname + '/src/main.js',
    resolve: {
        modulesDirectories: ['bower_components', 'node_modules'],
        alias: {
            spin: path.join(__dirname, 'bower_components', 'spin.js', 'spin.js'),
            ladda: path.join(__dirname, 'bower_components', 'ladda', 'js', 'ladda.js'),
            laddacss: path.join(__dirname, 'bower_components', 'ladda', 'dist', 'ladda.min.css')
        }
    },
    output: {
        filename: 'build.js',
        path: __dirname + '/dist',
    },
    module: {
        loaders: [
          { test: /\.css$/, loader: 'style-loader!css-loader!autoprefixer-loader' },
          { test: /\.(jpg|png|gif)$/, loader: 'file-loader' },
          { test: /\.js$/, loader: 'jsx-loader' }
        ],
    },
    plugins: [
        new webpack.ResolverPlugin(
            new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin('bower.json', ['main'])
        ),
        new webpack.optimize.DedupePlugin()
    ],
    devtool: 'source-map'
};
