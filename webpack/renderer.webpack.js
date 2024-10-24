const Path = require('path');

module.exports = {
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.scss'],
    alias: {
      '@renderer': Path.resolve(__dirname, '../src/renderer'),
      '@components': Path.resolve(__dirname, '../src/renderer/components'),
      '@styles': Path.resolve(__dirname, '../src/renderer/styles'),
      '@ui': Path.resolve(__dirname, '../src/renderer/ui'),
      '@utils': Path.resolve(__dirname, '../src/renderer/utils')
    },
  },
  module: {
    rules: require('./rules.webpack'),
  },
}