module.exports = {
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.scss']
  },
  module: {
    rules: require('./rules.webpack'),
  },
}