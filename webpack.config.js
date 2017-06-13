// webpack.config.js
const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  name: 'SSR',
  entry: './app/SSR.js',
  output: {
    path: path.join(__dirname, '.', 'dist', 'assets'),
    filename: 'SSR.js',
    libraryTarget: 'commonjs2',
    publicPath: '/assets/',
  },
  target: 'node',
  externals: nodeExternals(),  
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        include: path.join(__dirname, '.', 'components'),
        exclude: path.join(__dirname, '.', 'node_modules'),
      },
    ],
  },
};


// var path = require('path');

// module.exports = {
//   entry: './components/app.jsx',
//   output: {
//     path: path.resolve(__dirname, 'client'),
//     filename: 'bundle.js'
//   },
//   module: {
//     loaders: [
//       { test: /\.jsx$/, 
//         exclude: /node_modules/, 
//         loader: "babel-loader",
//         query: {
//           presets: ['es2015', 'react']
//         } 
//       }
//     ]
//   }
// };