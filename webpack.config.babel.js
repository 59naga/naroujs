import webpack from 'webpack';
import { name } from './package.json';

const config = {
  entry: './src',
  output: {
    path: `${__dirname}/lib/`,
    filename: 'index.browser.min.js',
    library: name,
    libraryTarget: 'umd',
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
      },
    ],
    postLoaders: [
      {
        test: /\.js$/,
        loader: 'buble',
      },
    ],
  },
  node: {
    net: 'empty',
    dns: 'empty',
  },
};

switch (process.env.NODE_ENV) {
  case 'production':
    config.plugins = [
      new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false } }),
    ];

    config.devtool = '#source-map';
    break;

  default:
    config.devtool = 'inline-source-map';
}

export default config;
