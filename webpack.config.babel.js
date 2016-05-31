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
  },
  node: {
    net: 'empty',
    dns: 'empty',
  },
};

switch (process.env.NODE_ENV) {
  case 'production':
    // TODO:
    // ERROR in index.browser.min.js from UglifyJs
    // Unexpected token name «i», expected punc «;» [./~/.store/joi@8.4.0/_/lib/index.js:168,0]
    config.plugins = [
      new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false } }),
    ];

    config.devtool = '#source-map';
    break;

  default:
    config.devtool = 'inline-source-map';
}

export default config;
