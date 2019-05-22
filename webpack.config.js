const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  entry: './src/index.ts',
  devtool: 'inline-source-map',
  module: {
    rules: [{
      test: /\.tsx?$/,
      use: 'ts-loader',
      exclude: /node_modules/,
    }],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Hello Tiny World'
    }),
    new BrowserSyncPlugin({
      host: 'localhost',
      port: 3000,
      server: { baseDir: ['build'] }
    }),
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  output: {
    filename: 'bundle.js', // 'bundle.[hash:5].js',
    path: path.resolve(__dirname, 'build'),
  }
};
