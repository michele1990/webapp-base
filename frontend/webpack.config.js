const path = require('path');

module.exports = {
  entry: './src/index.js', // Entry point of your application, change this to your main file
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    fallback: { "buffer": require.resolve("buffer/") } // Polyfill for buffer
  },
  module: {
    rules: [
      // You can add loaders here, such as for processing JavaScript, CSS, etc.
    ],
  },
  // Other configuration options as needed
};
