const Path = require('path');

module.exports = {
  resolve: {
    extensions: ['.ts', '.js'],
    alias: {
      '@main': Path.resolve(__dirname, '../src/main')
    }
  },
  entry: './src/main/main.ts',
  module: {
    rules: require('./rules.webpack'),
  }
}