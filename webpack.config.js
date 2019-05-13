const path = require('path');

module.exports = {
  entry: './groupby/viewLayer.js',
  output: {
    filename: 'viewLayer.js',
    path: path.resolve(__dirname, 'dist'),
  },
  watch: true,
};
