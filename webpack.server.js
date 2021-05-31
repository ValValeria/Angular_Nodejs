const path = require('path');
const externals = require('webpack-node-externals')

module.exports = {
  entry: './server/main.ts',
  output:{
   filename:"server.ts",
   path:path.resolve('dist')
  },
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [ '.ts', '.ts', '.js' ],
  },
  target:"node",
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  externals:[externals()]
};