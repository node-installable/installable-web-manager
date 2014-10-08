// webpack.config.js
var path = require('path');

module.exports = {
    resolve: {
        modulesDirectories: ['bower_components', 'node_modules'],
        alias: {
            spin: path.join(__dirname, 'bower_components', 'spin.js', 'spin.js'),
            'spin.js': path.join(__dirname, 'bower_components', 'spin.js', 'spin.js'),
            ladda: path.join(__dirname, 'bower_components', 'ladda', 'js', 'ladda.js'),
            laddacss: path.join(__dirname, 'bower_components', 'ladda', 'dist', 'ladda.min.css')
        }
    },
    module: {
        loaders: [
          { test: /\.css$/, loader: 'style-loader!css-loader!autoprefixer-loader' },
          { test: /\.(jpg|png|gif)$/, loader: 'file-loader' },
          { test: /\.js$/, loader: 'jsx-loader' }
        ],
        postLoaders: [{
            test: /\.js$/,
            exclude: /(spec|node_modules|bower_components)\//,
            loader: 'istanbul-instrumenter'
        }]
    }
};
